import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import {
  answersSchema,
  applyCopyPatch,
  asPayload,
  asRecord,
  asSections,
  buildInitial,
  canAddBusiness,
  CONCEPT_ONLY,
  clampPolicies,
  clampWorkflowMode,
  COSTS,
  defaultPolicies,
  draftSchema,
  followUpDraft,
  localBrief,
  parseProfile,
  PLANS,
  policiesSchema,
  roleAllows,
  slugify,
  TOPUPS,
  WORKFLOW_TEMPLATES,
  type AutonomyId,
  type BusinessProfile,
  type Direction,
  type MutationResult,
  type PageRecord,
  type PathId,
  type PlanId,
  type Role,
  type Section,
  type SetupAnswers,
  type SetupDraft,
  type WorkMode,
  type Workspace,
} from "./domain";

function newId(): string {
  return crypto.randomUUID();
}

function stamp(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

function json(value: unknown): string {
  return JSON.stringify(value);
}

function asStrings(value: unknown): string[] {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  return Array.isArray(raw) ? raw.map((item) => String(item)) : [];
}

function asMeta(value: unknown): PageRecord["meta"] {
  const record = asRecord(value);
  const tool = record.tool === "calculator" || record.tool === "enquiry" ? record.tool : null;
  const packages = Array.isArray(record.packages) ? record.packages : [];
  return {
    tool,
    packages: packages as BusinessProfile["offer"]["packages"],
  };
}

const hits = new Map<string, number[]>();

function withinLimit(key: string, max: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

async function writeActivity(sql: Sql, businessId: string, message: string, detail = ""): Promise<void> {
  await sql`insert into activity (id, business_id, message, detail) values (${newId()}, ${businessId}, ${message}, ${detail})`;
}

async function charge(
  sql: Sql,
  businessId: string,
  units: number,
  label: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (units <= 0) return { ok: true };
  const rows = await sql<{ business_id: string }>`
    update balances
    set used = used + ${units}
    where business_id = ${businessId}
      and (included + topup - used) >= ${units}
    returning business_id
  `;
  if (!rows[0]) {
    return {
      ok: false,
      message: `This needs ${units} executions. You don't have enough left. Add a top-up, or change plan, before continuing.`,
    };
  }
  await sql`insert into executions (id, business_id, label, units, status) values (${newId()}, ${businessId}, ${label}, ${units}, 'complete')`;
  await sql`insert into usage_transactions (id, business_id, kind, label, units) values (${newId()}, ${businessId}, 'use', ${label}, ${units})`;
  return { ok: true };
}

async function saveProfile(
  sql: Sql,
  businessId: string,
  profile: BusinessProfile,
  name?: string,
): Promise<void> {
  const readinessValues = Object.values(profile.modules).map((item) => item.percent);
  const readiness = Math.round(
    readinessValues.reduce((sum, value) => sum + value, 0) / readinessValues.length,
  );
  if (name) {
    await sql`update businesses set name = ${name}, profile = ${json(profile)}::jsonb, readiness = ${readiness}, updated_at = now() where id = ${businessId}`;
    return;
  }
  await sql`update businesses set profile = ${json(profile)}::jsonb, readiness = ${readiness}, updated_at = now() where id = ${businessId}`;
}

type Gate =
  | { ok: false; message: string }
  | {
      ok: true;
      id: string;
      name: string;
      slug: string;
      path: PathId;
      autonomy: AutonomyId;
      role: Role;
      profile: BusinessProfile;
    };

async function loadGate(sql: Sql, userId: string, businessId: string, min: Role): Promise<Gate> {
  const rows = await sql<{
    id: string;
    name: string;
    slug: string;
    path: PathId;
    autonomy: AutonomyId;
    role: Role;
    profile: unknown;
  }>`
    select b.id, b.name, b.slug, b.path, b.autonomy, b.profile, m.role
    from businesses b
    join business_members m on m.business_id = b.id
    where b.id = ${businessId} and m.user_id = ${userId}
  `;
  const row = rows[0];
  if (!row) return { ok: false, message: "That business is not on this account." };
  if (!roleAllows(row.role, min)) {
    return { ok: false, message: "Your role can view this, but not change it." };
  }
  const profile = parseProfile(row.profile);
  if (!profile) return { ok: false, message: "This business record needs a refresh. Try again." };
  return { ok: true, ...row, profile };
}

async function loadWorkspace(sql: Sql, userId: string): Promise<Workspace> {
  const businesses = await sql<{
    id: string;
    name: string;
    role: Role;
    readiness: number;
    plan: PlanId | null;
  }>`
    select b.id, b.name, b.readiness, m.role, bal.plan
    from businesses b
    join business_members m on m.business_id = b.id
    left join balances bal on bal.business_id = b.id
    where m.user_id = ${userId}
    order by b.created_at asc
  `;
  const prefs = await sql<{ active_business_id: string | null }>`
    select active_business_id from user_prefs where user_id = ${userId}
  `;
  const draftRows = await sql<{ data: unknown }>`
    select data from setup_drafts where user_id = ${userId}
  `;
  const draftParsed = draftSchema.safeParse(
    typeof draftRows[0]?.data === "string" ? JSON.parse(draftRows[0].data) : draftRows[0]?.data,
  );
  const draft: SetupDraft | null = draftParsed.success ? draftParsed.data : null;
  const preferred = prefs[0]?.active_business_id;
  const activeId =
    businesses.find((item) => item.id === preferred)?.id ?? businesses[0]?.id ?? null;
  if (!activeId) {
    return {
      businesses: [],
      activeId: null,
      draft,
      active: null,
    };
  }
  const gate = await loadGate(sql, userId, activeId, "viewer");
  if (!gate.ok) {
    return { businesses: [], activeId: null, draft, active: null };
  }
  const pages = await sql<{
    id: string;
    kind: "site" | "tool";
    title: string;
    slug: string;
    status: "draft" | "published";
    direction: Direction;
    sections: unknown;
    meta: unknown;
    updated_at: unknown;
  }>`select id, kind, title, slug, status, direction, sections, meta, updated_at from pages where business_id = ${activeId} order by created_at asc`;
  const leads = await sql<{
    id: string;
    name: string;
    email: string;
    source: string;
    status: string;
    note: string;
    summary: string;
    created_at: unknown;
  }>`select id, name, email, source, status, note, summary, created_at from leads where business_id = ${activeId} order by created_at desc`;
  const workflows = await sql<{
    id: string;
    template_id: string;
    name: string;
    summary: string;
    trigger_label: string;
    mode: WorkMode;
    status: string;
    steps: unknown;
    estimate: number;
  }>`select id, template_id, name, summary, trigger_label, mode, status, steps, estimate from workflows where business_id = ${activeId} order by created_at asc`;
  const approvals = await sql<{
    id: string;
    title: string;
    summary: string;
    why: string;
    risk: string;
    estimate: number;
    external_cost: string;
    status: string;
    kind: string;
    payload: unknown;
    created_at: unknown;
  }>`select id, title, summary, why, risk, estimate, external_cost, status, kind, payload, created_at from approvals where business_id = ${activeId} order by created_at desc`;
  const activity = await sql<{ id: string; message: string; detail: string; created_at: unknown }>`
    select id, message, detail, created_at from activity where business_id = ${activeId} order by created_at desc limit 40
  `;
  const campaigns = await sql<{
    id: string;
    name: string;
    goal: string;
    audience: string;
    offer: string;
    channels: string;
    budget: string;
    status: string;
    created_at: unknown;
  }>`select id, name, goal, audience, offer, channels, budget, status, created_at from campaigns where business_id = ${activeId} order by created_at desc`;
  const content = await sql<{
    id: string;
    title: string;
    body: string;
    channel: string;
    status: string;
    created_at: unknown;
  }>`select id, title, body, channel, status, created_at from content_items where business_id = ${activeId} order by created_at desc`;
  const tasks = await sql<{
    id: string;
    title: string;
    detail: string;
    status: string;
    created_at: unknown;
  }>`select id, title, detail, status, created_at from tasks where business_id = ${activeId} order by created_at desc`;
  const payments = await sql<{
    id: string;
    label: string;
    amount_cents: number;
    status: string;
    created_at: unknown;
  }>`select id, label, amount_cents, status, created_at from payments where business_id = ${activeId} order by created_at desc`;
  const integrations = await sql<{ id: string; name: string; status: string; note: string }>`
    select id, name, status, note from integrations where business_id = ${activeId} order by name asc
  `;
  const experiments = await sql<{
    id: string;
    hypothesis: string;
    status: string;
    result: string;
    created_at: unknown;
  }>`select id, hypothesis, status, result, created_at from experiments where business_id = ${activeId} order by created_at desc`;
  const briefs = await sql<{ id: string; body: string; created_at: unknown }>`
    select id, body, created_at from briefs where business_id = ${activeId} order by created_at desc limit 6
  `;
  const conversations = await sql<{
    id: string;
    subject: string;
    body: string;
    status: string;
    created_at: unknown;
  }>`select id, subject, body, status, created_at from conversations where business_id = ${activeId} order by created_at desc`;
  const executions = await sql<{
    id: string;
    label: string;
    units: number;
    status: string;
    created_at: unknown;
  }>`select id, label, units, status, created_at from executions where business_id = ${activeId} order by created_at desc limit 30`;
  const balances = await sql<{ plan: PlanId; included: number; used: number; topup: number }>`
    select plan, included, used, topup from balances where business_id = ${activeId}
  `;
  const balance = balances[0] ?? { plan: "start" as PlanId, included: 10, used: 0, topup: 0 };
  return {
    businesses: businesses.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      readiness: Number(item.readiness) || 0,
      plan: item.plan ?? "start",
    })),
    activeId,
    draft,
    active: {
      id: gate.id,
      name: gate.name,
      slug: gate.slug,
      path: gate.path,
      autonomy: gate.autonomy,
      readiness: Math.round(
        Object.values(gate.profile.modules).reduce((sum, item) => sum + item.percent, 0) /
          Object.values(gate.profile.modules).length,
      ),
      role: gate.role,
      profile: gate.profile,
      pages: pages.map((page) => ({
        id: page.id,
        kind: page.kind,
        title: page.title,
        slug: page.slug,
        status: page.status,
        direction: page.direction,
        sections: asSections(page.sections),
        meta: asMeta(page.meta),
        updatedAt: stamp(page.updated_at),
      })),
      leads: leads.map((lead) => ({ ...lead, createdAt: stamp(lead.created_at) })),
      workflows: workflows.map((item) => ({
        id: item.id,
        templateId: item.template_id,
        name: item.name,
        summary: item.summary,
        trigger: item.trigger_label,
        mode: item.mode,
        status: item.status,
        steps: asStrings(item.steps),
        estimate: Number(item.estimate) || 0,
      })),
      approvals: approvals.map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        why: item.why,
        risk: item.risk,
        estimate: Number(item.estimate) || 0,
        externalCost: item.external_cost,
        status: item.status,
        kind: item.kind,
        payload: asPayload(item.payload),
        createdAt: stamp(item.created_at),
      })),
      activity: activity.map((item) => ({
        id: item.id,
        message: item.message,
        detail: item.detail,
        createdAt: stamp(item.created_at),
      })),
      campaigns: campaigns.map((item) => ({ ...item, createdAt: stamp(item.created_at) })),
      content: content.map((item) => ({ ...item, createdAt: stamp(item.created_at) })),
      tasks: tasks.map((item) => ({ ...item, createdAt: stamp(item.created_at) })),
      payments: payments.map((item) => ({
        id: item.id,
        label: item.label,
        amountCents: Number(item.amount_cents) || 0,
        status: item.status,
        createdAt: stamp(item.created_at),
      })),
      integrations,
      experiments: experiments.map((item) => ({ ...item, createdAt: stamp(item.created_at) })),
      briefs: briefs.map((item) => ({ id: item.id, body: item.body, createdAt: stamp(item.created_at) })),
      conversations: conversations.map((item) => ({ ...item, createdAt: stamp(item.created_at) })),
      balance: {
        plan: balance.plan,
        included: Number(balance.included) || 0,
        used: Number(balance.used) || 0,
        topup: Number(balance.topup) || 0,
      },
      executions: executions.map((item) => ({
        ...item,
        units: Number(item.units) || 0,
        createdAt: stamp(item.created_at),
      })),
    },
  };
}

async function ok(sql: Sql, userId: string, note?: string): Promise<MutationResult> {
  return { ok: true, workspace: await loadWorkspace(sql, userId), note };
}

async function onNewLead(
  sql: Sql,
  businessId: string,
  profile: BusinessProfile,
  businessName: string,
  lead: { id: string; name: string; note: string },
): Promise<void> {
  const workflow = (
    await sql<{ id: string; mode: WorkMode; status: string }>`
      select id, mode, status from workflows where business_id = ${businessId} and template_id = 'lead-follow-up'
    `
  )[0];
  if (!workflow || workflow.status !== "running") return;
  const draft = followUpDraft({
    businessName,
    leadName: lead.name,
    offer: profile.offer.summary,
    note: lead.note,
  });
  if (workflow.mode === "suggest") {
    await sql`insert into tasks (id, business_id, title, detail, status) values (${newId()}, ${businessId}, ${`Reply to ${lead.name}`}, ${draft}, 'open')`;
    await writeActivity(sql, businessId, `A reply for ${lead.name} is ready for you to send yourself.`, draft);
    return;
  }
  await sql`
    insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
    values (
      ${newId()},
      ${businessId},
      ${`Approve reply to ${lead.name}`},
      ${draft},
      ${"A new lead arrived and the follow-up workflow is on. Email is not connected, so approving saves the reply on the contact. It does not send anything."},
      ${"Low. Nothing leaves the workspace."},
      ${COSTS.followUp},
      ${"A$0"},
      ${"waiting"},
      ${"followup"},
      ${json({ type: "followup", leadId: lead.id, draft })}::jsonb
    )
  `;
  await writeActivity(
    sql,
    businessId,
    `Drafted a reply for ${lead.name}. It is waiting for your approval.`,
  );
}

export const getWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Workspace> => {
    const sql = await getSql();
    return loadWorkspace(sql, context.userId);
  });

export const saveDraft = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: SetupDraft) => input)
  .handler(async ({ context, data }): Promise<MutationResult> => {
    const parsed = draftSchema.safeParse(data);
    if (!parsed.success) return { ok: false, message: "We couldn't save that step." };
    const sql = await getSql();
    await sql`
      insert into setup_drafts (user_id, data)
      values (${context.userId}, ${json(parsed.data)}::jsonb)
      on conflict (user_id) do update set data = excluded.data, updated_at = now()
    `;
    return ok(sql, context.userId);
  });

export const createFromSetup = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: SetupAnswers) => input)
  .handler(async ({ context, data }): Promise<MutationResult> => {
    const parsed = answersSchema.safeParse(data);
    if (!parsed.success) return { ok: false, message: "Finish each question before creating the map." };
    const sql = await getSql();
    const existing = await sql<{ id: string; plan: PlanId | null }>`
      select b.id, bal.plan
      from businesses b
      join business_members m on m.business_id = b.id
      left join balances bal on bal.business_id = b.id
      where m.user_id = ${context.userId}
    `;
    const plans = existing.map((item) => item.plan ?? "start");
    const gatePlan: PlanId = plans.includes("scale") ? "scale" : "start";
    if (!canAddBusiness(gatePlan, existing.length)) {
      return {
        ok: false,
        message:
          gatePlan === "scale"
            ? "Scale includes up to 3 businesses."
            : "This plan includes 1 business. Move to Scale before adding another.",
      };
    }
    let built = buildInitial(parsed.data);
    if (withinLimit(`map:${context.userId}`, 12)) {
      const { shapeMap } = await import("./ai.server");
      const patch = await shapeMap(parsed.data);
      if (patch) built = { ...built, profile: applyCopyPatch(built.profile, patch) };
    }
    const businessId = newId();
    const suffix = Math.random().toString(36).slice(2, 6);
    const slug = `${slugify(parsed.data.businessName)}-${suffix}`;
    const pageSlug = `${slug}-launch`;
    await sql`
      insert into businesses (id, owner_user_id, name, slug, path, autonomy, readiness, profile)
      values (
        ${businessId},
        ${context.userId},
        ${parsed.data.businessName},
        ${slug},
        ${parsed.data.path},
        ${parsed.data.autonomy},
        ${built.readiness},
        ${json(built.profile)}::jsonb
      )
    `;
    await sql`
      insert into business_members (business_id, user_id, role)
      values (${businessId}, ${context.userId}, 'owner')
    `;
    await sql`
      insert into balances (business_id, plan, included, used, topup)
      values (${businessId}, 'start', ${PLANS.start.included}, 0, 0)
    `;
    await sql`
      insert into user_prefs (user_id, active_business_id)
      values (${context.userId}, ${businessId})
      on conflict (user_id) do update set active_business_id = ${businessId}
    `;
    const spent = await charge(sql, businessId, COSTS.map, "Created the business map");
    if (!spent.ok) return spent;
    const pageId = newId();
    await sql`
      insert into pages (id, business_id, kind, title, slug, status, direction, sections, meta)
      values (
        ${pageId},
        ${businessId},
        'site',
        ${built.page.title},
        ${pageSlug},
        'draft',
        ${built.page.direction},
        ${json(built.page.sections)}::jsonb,
        ${json(built.page.meta)}::jsonb
      )
    `;
    for (const approval of built.approvals) {
      await sql`
        insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
        values (
          ${newId()},
          ${businessId},
          ${approval.title},
          ${approval.summary},
          ${approval.why},
          ${approval.risk},
          ${approval.estimate},
          ${"A$0"},
          ${"waiting"},
          ${approval.kind},
          ${json(approval.payload)}::jsonb
        )
      `;
    }
    for (const task of built.tasks) {
      await sql`insert into tasks (id, business_id, title, detail, status) values (${newId()}, ${businessId}, ${task.title}, ${task.detail}, 'open')`;
    }
    for (const integration of built.integrations) {
      await sql`insert into integrations (id, business_id, name, status, note) values (${newId()}, ${businessId}, ${integration.name}, 'not_connected', '')`;
    }
    await writeActivity(
      sql,
      businessId,
      parsed.data.have === CONCEPT_ONLY
        ? "Created your business map from the idea you wrote."
        : "Created your business map from the answers you gave.",
      "Nothing has been published. Two items are waiting for you.",
    );
    return ok(sql, context.userId, "Your business map is ready.");
  });

async function mutate(
  userId: string,
  businessId: string,
  min: Role,
  run: (sql: Sql, gate: Extract<Gate, { ok: true }>) => Promise<MutationResult | void>,
): Promise<MutationResult> {
  const sql = await getSql();
  const gate = await loadGate(sql, userId, businessId, min);
  if (!gate.ok) return gate;
  const result = await run(sql, gate);
  if (result) return result;
  return ok(sql, userId);
}

export const dismissWelcome = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const profile = { ...gate.profile, welcomed: true };
      await saveProfile(sql, gate.id, profile);
    }),
  );

export const updateOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; offer: BusinessProfile["offer"] }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const offer = data.offer;
      if (!offer.summary.trim()) return { ok: false, message: "The offer needs a summary." };
      const profile: BusinessProfile = {
        ...gate.profile,
        offer: {
          summary: offer.summary.slice(0, 500),
          positioning: offer.positioning.slice(0, 400),
          guarantee: offer.guarantee.slice(0, 400),
          messaging: offer.messaging.slice(0, 400),
          packages: offer.packages.slice(0, 6).map((item) => ({
            id: item.id || newId(),
            name: item.name.slice(0, 60),
            price: item.price.slice(0, 40),
            includes: item.includes.slice(0, 180),
          })),
        },
      };
      profile.modules.offer.status = "needs_attention";
      profile.modules.offer.next = "Approve the updated offer";
      await saveProfile(sql, gate.id, profile);
      await writeActivity(sql, gate.id, "Updated the offer. It still needs your approval before it is treated as final.");
    }),
  );

export const updateAudience = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; audience: BusinessProfile["audienceProfile"] }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const profile = { ...gate.profile, audienceProfile: data.audience };
      profile.modules.audience.status = "ready";
      profile.modules.audience.percent = 90;
      profile.modules.audience.next = "Audience saved";
      await saveProfile(sql, gate.id, profile);
      await writeActivity(sql, gate.id, "Updated who the offer is for.");
    }),
  );

export const updateBrand = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { businessId: string; name: string; brand: BusinessProfile["brand"] }) => input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const name = data.name.trim().slice(0, 80);
      if (name.length < 2) return { ok: false, message: "The business needs a name." };
      const profile: BusinessProfile = { ...gate.profile, brand: data.brand };
      const memory = profile.memory.map((item) =>
        item.id === "mem-name" ? { ...item, value: name } : item,
      );
      profile.memory = memory;
      profile.modules.brand.status = "needs_attention";
      profile.modules.brand.next = "Confirm the updated brand";
      await saveProfile(sql, gate.id, profile, name);
      await writeActivity(sql, gate.id, `Saved brand details for ${name}.`);
    }),
  );

export const updateMemory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { businessId: string; memory: BusinessProfile["memory"] }) => input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const memory = data.memory.slice(0, 40).map((item) => ({
        id: item.id || newId(),
        label: item.label.trim().slice(0, 80),
        value: item.value.trim().slice(0, 800),
      }));
      if (memory.some((item) => !item.label || !item.value)) {
        return { ok: false, message: "Each memory needs a label and a value." };
      }
      await saveProfile(sql, gate.id, { ...gate.profile, memory });
      await writeActivity(sql, gate.id, "Updated business memory.");
    }),
  );

export const updateAutonomy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; autonomy: AutonomyId }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "admin", async (sql, gate) => {
      if (!["guide", "collaborate", "routine"].includes(data.autonomy)) {
        return { ok: false, message: "Choose how much help you want." };
      }
      await sql`update businesses set autonomy = ${data.autonomy}, updated_at = now() where id = ${gate.id}`;
      await writeActivity(sql, gate.id, "Changed how much launch/run should take on.");
    }),
  );

export const updatePolicies = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; policies: BusinessProfile["policies"] }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "admin", async (sql, gate) => {
      const parsed = policiesSchema.safeParse(data.policies);
      if (!parsed.success) return { ok: false, message: "Those permission choices are not valid." };
      const policies = clampPolicies(parsed.data);
      const profile = { ...gate.profile, policies };
      profile.modules.operations.percent = Math.max(profile.modules.operations.percent, 40);
      profile.modules.operations.next = "Permissions saved";
      await saveProfile(sql, gate.id, profile);
      await writeActivity(
        sql,
        gate.id,
        "Updated what can run on its own. Refunds, bank movement and irreversible actions stay manual.",
      );
    }),
  );

export const saveWebsite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { businessId: string; pageId: string; direction: Direction; sections: Section[] }) =>
      input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const pages = await sql<{ id: string; status: string }>`
        select id, status from pages where id = ${data.pageId} and business_id = ${gate.id}
      `;
      const page = pages[0];
      if (!page) return { ok: false, message: "That page is not on this business." };
      const sections = data.sections.slice(0, 12);
      if (page.status === "published") {
        await sql`
          insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
          values (
            ${newId()},
            ${gate.id},
            ${"Approve website update"},
            ${"The new copy will replace the live page after you approve it."},
            ${"You edited a page that is already public. The live version stays as it is until you approve."},
            ${"Medium. Customers will see the new copy after approval."},
            ${COSTS.publish},
            ${"A$0"},
            ${"waiting"},
            ${"publish"},
            ${json({ type: "publish", pageId: page.id, sections, direction: data.direction })}::jsonb
          )
        `;
        await writeActivity(sql, gate.id, "Saved a website update and asked you to approve it before it goes live.");
        return ok(sql, context.userId, "The live page is unchanged until you approve the update.");
      }
      await sql`
        update pages
        set sections = ${json(sections)}::jsonb, direction = ${data.direction}, updated_at = now()
        where id = ${page.id}
      `;
      await writeActivity(sql, gate.id, "Saved the launch page draft.");
    }),
  );

export const requestPublish = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; pageId: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const pages = await sql<{ id: string; status: string; title: string }>`
        select id, status, title from pages where id = ${data.pageId} and business_id = ${gate.id}
      `;
      const page = pages[0];
      if (!page) return { ok: false, message: "That page is not on this business." };
      if (page.status === "published") return { ok: false, message: "This page is already live." };
      const waiting = await sql<{ id: string }>`
        select id from approvals
        where business_id = ${gate.id} and kind = 'publish' and status = 'waiting'
          and payload->>'pageId' = ${page.id}
      `;
      if (waiting[0]) return { ok: false, message: "A publish request is already waiting for you." };
      await sql`
        insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
        values (
          ${newId()},
          ${gate.id},
          ${"Approve website update"},
          ${`${page.title} will become public on its launch/run link.`},
          ${"Publishing makes this page visible to anyone with the link."},
          ${"Medium. It is customer-facing."},
          ${COSTS.publish},
          ${"A$0"},
          ${"waiting"},
          ${"publish"},
          ${json({ type: "publish", pageId: page.id })}::jsonb
        )
      `;
      await writeActivity(sql, gate.id, "Asked you to approve publishing the page.");
      return ok(sql, context.userId, "Publish is waiting for your approval.");
    }),
  );

export const saveApprovalDraft = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; approvalId: string; draft: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const rows = await sql<{ payload: unknown }>`
        select payload from approvals where id = ${data.approvalId} and business_id = ${gate.id} and status = 'waiting'
      `;
      if (!rows[0]) return { ok: false, message: "That approval is no longer waiting." };
      const payload = { ...asRecord(rows[0].payload), draft: data.draft.slice(0, 2000) };
      await sql`
        update approvals
        set payload = ${json(payload)}::jsonb, summary = ${data.draft.slice(0, 500)}
        where id = ${data.approvalId}
      `;
    }),
  );

export const decideApproval = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; approvalId: string; decision: "approve" | "reject" }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const rows = await sql<{
        id: string;
        title: string;
        kind: string;
        estimate: number;
        payload: unknown;
        status: string;
      }>`
        select id, title, kind, estimate, payload, status
        from approvals
        where id = ${data.approvalId} and business_id = ${gate.id}
      `;
      const approval = rows[0];
      if (!approval || approval.status !== "waiting") {
        return { ok: false, message: "That item is no longer waiting." };
      }
      if (data.decision === "reject") {
        await sql`update approvals set status = 'rejected', decided_at = now() where id = ${approval.id}`;
        await writeActivity(sql, gate.id, `Rejected “${approval.title}”. Nothing was changed.`);
        return;
      }
      const payload = asRecord(approval.payload);
      const units = Number(approval.estimate) || 0;
      const spent = await charge(sql, gate.id, units, approval.title);
      if (!spent.ok) return spent;
      const profile = gate.profile;
      if (approval.kind === "offer") {
        profile.modules.offer = {
          ...profile.modules.offer,
          status: "ready",
          percent: 100,
          next: "Offer confirmed",
        };
        await saveProfile(sql, gate.id, profile);
        await writeActivity(sql, gate.id, "Confirmed the offer.");
      } else if (approval.kind === "brand") {
        profile.modules.brand = {
          ...profile.modules.brand,
          status: "ready",
          percent: 80,
          next: "Brand basics confirmed",
        };
        await saveProfile(sql, gate.id, profile);
        await writeActivity(sql, gate.id, "Confirmed the brand basics.");
      } else if (approval.kind === "publish") {
        const pageId = String(payload.pageId ?? "");
        const sections = payload.sections ? asSections(payload.sections) : null;
        const direction = payload.direction === "night" || payload.direction === "signal" || payload.direction === "paper"
          ? payload.direction
          : null;
        if (sections && direction) {
          await sql`
            update pages
            set sections = ${json(sections)}::jsonb, direction = ${direction}, status = 'published', updated_at = now()
            where id = ${pageId} and business_id = ${gate.id}
          `;
        } else {
          await sql`
            update pages set status = 'published', updated_at = now()
            where id = ${pageId} and business_id = ${gate.id}
          `;
        }
        profile.modules.product = {
          ...profile.modules.product,
          status: "ready",
          percent: 100,
          next: "Page is live",
          automation: "approve",
        };
        await saveProfile(sql, gate.id, profile);
        await writeActivity(sql, gate.id, "Published the page after your approval.");
      } else if (approval.kind === "followup") {
        const leadId = String(payload.leadId ?? "");
        const draft = String(payload.draft ?? approval.title);
        await sql`
          update leads set status = 'contacted', summary = ${draft}
          where id = ${leadId} and business_id = ${gate.id}
        `;
        await sql`
          insert into conversations (id, business_id, lead_id, subject, body, status)
          values (${newId()}, ${gate.id}, ${leadId}, ${"Saved reply"}, ${draft}, 'open')
        `;
        await writeActivity(
          sql,
          gate.id,
          "Saved a follow-up after your approval. Email is not connected, so it was not sent.",
          draft,
        );
      } else if (approval.kind === "campaign") {
        await sql`
          update campaigns set status = 'scheduled'
          where id = ${String(payload.campaignId ?? "")} and business_id = ${gate.id}
        `;
        profile.modules.marketing = {
          ...profile.modules.marketing,
          status: "ready",
          percent: Math.max(profile.modules.marketing.percent, 60),
          next: "Campaign saved. No money will be spent.",
        };
        await saveProfile(sql, gate.id, profile);
        await writeActivity(
          sql,
          gate.id,
          "Scheduled the campaign plan after your approval. No ad account is connected, so nothing was spent.",
        );
      } else if (approval.kind === "content") {
        await sql`
          update content_items set status = 'ready'
          where id = ${String(payload.contentId ?? "")} and business_id = ${gate.id}
        `;
        await writeActivity(sql, gate.id, "Marked the draft ready after your approval. It was not posted anywhere.");
      }
      await sql`update approvals set status = 'approved', decided_at = now() where id = ${approval.id}`;
    }),
  );

export const setWorkflow = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      businessId: string;
      templateId: string;
      mode: WorkMode;
      action: "start" | "pause";
    }) => input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const template = WORKFLOW_TEMPLATES.find((item) => item.id === data.templateId);
      if (!template) return { ok: false, message: "That workflow is not available." };
      const mode = clampWorkflowMode(template.id, data.mode);
      const existing = await sql<{ id: string }>`
        select id from workflows where business_id = ${gate.id} and template_id = ${template.id}
      `;
      const status = data.action === "pause" ? "paused" : "running";
      if (!existing[0]) {
        await sql`
          insert into workflows (id, business_id, template_id, name, summary, trigger_label, mode, status, steps, estimate)
          values (
            ${newId()},
            ${gate.id},
            ${template.id},
            ${template.name},
            ${template.summary},
            ${template.trigger},
            ${mode},
            ${status},
            ${json(template.steps)}::jsonb,
            ${template.estimate}
          )
        `;
      } else {
        await sql`
          update workflows set mode = ${mode}, status = ${status}
          where id = ${existing[0].id}
        `;
      }
      const profile = gate.profile;
      profile.modules.operations.status = status === "running" ? "running" : "needs_setup";
      profile.modules.operations.automation = mode === "suggest" ? "suggest" : "approve";
      profile.modules.operations.percent = status === "running" ? 70 : profile.modules.operations.percent;
      profile.modules.operations.next =
        status === "running" ? `${template.name} is on` : "Workflow paused";
      await saveProfile(sql, gate.id, profile);
      await writeActivity(
        sql,
        gate.id,
        status === "running"
          ? `Turned on ${template.name}. It will stop for approval before anything customer-facing happens.`
          : `Paused ${template.name}.`,
      );
      if (mode !== data.mode) {
        return ok(
          sql,
          context.userId,
          "This workflow can change what people see, so it stays on approval. It will not run past you.",
        );
      }
    }),
  );

export const addLead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { businessId: string; name: string; email: string; source: string; note: string }) =>
      input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const name = data.name.trim().slice(0, 80);
      const email = data.email.trim().toLowerCase().slice(0, 160);
      if (name.length < 2 || !email.includes("@")) {
        return { ok: false, message: "Add a name and a real email." };
      }
      const leadId = newId();
      await sql`
        insert into leads (id, business_id, name, email, source, status, note)
        values (${leadId}, ${gate.id}, ${name}, ${email}, ${data.source.slice(0, 80) || "Manual"}, 'new', ${data.note.slice(0, 800)})
      `;
      await onNewLead(sql, gate.id, gate.profile, gate.name, { id: leadId, name, note: data.note });
      await writeActivity(sql, gate.id, `Added ${name} as a lead.`);
    }),
  );

export const updateLead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; leadId: string; status: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const status = ["new", "qualified", "contacted", "won", "lost"].includes(data.status)
        ? data.status
        : "new";
      await sql`update leads set status = ${status} where id = ${data.leadId} and business_id = ${gate.id}`;
      await writeActivity(sql, gate.id, `Moved a contact to ${status}.`);
    }),
  );

export const saveCampaign = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      businessId: string;
      name: string;
      goal: string;
      audience: string;
      offer: string;
      channels: string;
      budget: string;
      schedule: boolean;
    }) => input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      if (!data.name.trim() || !data.goal.trim()) {
        return { ok: false, message: "A campaign needs a name and a goal." };
      }
      const campaignId = newId();
      await sql`
        insert into campaigns (id, business_id, name, goal, audience, offer, channels, budget, status)
        values (
          ${campaignId},
          ${gate.id},
          ${data.name.slice(0, 80)},
          ${data.goal.slice(0, 300)},
          ${data.audience.slice(0, 300)},
          ${data.offer.slice(0, 300)},
          ${data.channels.slice(0, 200)},
          ${data.budget.slice(0, 80)},
          ${"draft"}
        )
      `;
      if (!data.schedule) {
        await writeActivity(sql, gate.id, `Saved the campaign “${data.name.trim()}” as a draft.`);
        return;
      }
      await sql`
        insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
        values (
          ${newId()},
          ${gate.id},
          ${`Schedule ${data.name.trim()}`},
          ${`Goal: ${data.goal.trim()}. Budget noted: ${data.budget.trim() || "A$0"}.`},
          ${"No ad account is connected. Approving saves the plan and uses executions. It does not spend money."},
          ${"Low. Nothing is purchased."},
          ${COSTS.campaign},
          ${"A$0"},
          ${"waiting"},
          ${"campaign"},
          ${json({ type: "campaign", campaignId })}::jsonb
        )
      `;
      await writeActivity(sql, gate.id, `Asked you to approve the campaign “${data.name.trim()}”.`);
      return ok(sql, context.userId, "The campaign is waiting for approval. Nothing will be spent.");
    }),
  );

export const draftContent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; topic: string; channel: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const topic = data.topic.trim().slice(0, 200);
      if (topic.length < 2) return { ok: false, message: "Add a topic first." };
      if (!withinLimit(`post:${context.userId}`, 20)) {
        return { ok: false, message: "Too many drafts in a short time. Try again later." };
      }
      let title = topic;
      let body = `${gate.name}: ${topic}\n\nIf this is useful, the next step is on the launch page.`;
      let charged = false;
      const { draftPost } = await import("./ai.server");
      const patch = await draftPost(topic, gate.profile.brand.tone, gate.name);
      if (patch?.post?.body) {
        const spent = await charge(sql, gate.id, COSTS.draftPost, "Drafted a post");
        if (!spent.ok) return spent;
        charged = true;
        title = (patch.post.title || topic).slice(0, 120);
        body = patch.post.body.slice(0, 1200);
      }
      await sql`
        insert into content_items (id, business_id, title, body, channel, status)
        values (${newId()}, ${gate.id}, ${title}, ${body}, ${data.channel.slice(0, 40) || "Social"}, 'draft')
      `;
      await writeActivity(
        sql,
        gate.id,
        charged ? "Drafted a post and added it to the queue." : "Added a plain draft to the queue. Wording help was unavailable, so nothing was used from your execution balance.",
      );
    }),
  );

export const setContentStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; contentId: string; ready: boolean }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      if (!data.ready) {
        await sql`update content_items set status = 'draft' where id = ${data.contentId} and business_id = ${gate.id}`;
        return;
      }
      const rows = await sql<{ id: string; title: string }>`
        select id, title from content_items where id = ${data.contentId} and business_id = ${gate.id}
      `;
      if (!rows[0]) return { ok: false, message: "That draft is gone." };
      await sql`
        insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
        values (
          ${newId()},
          ${gate.id},
          ${`Approve “${rows[0].title}”`},
          ${"Mark this draft ready. Social accounts are not connected, so it will not be posted."},
          ${"You asked to move this out of draft."},
          ${"Low. It stays inside launch/run."},
          ${0},
          ${"A$0"},
          ${"waiting"},
          ${"content"},
          ${json({ type: "content", contentId: rows[0].id })}::jsonb
        )
      `;
      await writeActivity(sql, gate.id, "Asked you to approve a content draft before it is marked ready.");
    }),
  );

export const saveTask = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; title: string; detail: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const title = data.title.trim().slice(0, 140);
      if (title.length < 2) return { ok: false, message: "Add a task title." };
      await sql`
        insert into tasks (id, business_id, title, detail, status)
        values (${newId()}, ${gate.id}, ${title}, ${data.detail.slice(0, 500)}, 'open')
      `;
    }),
  );

export const setTaskStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; taskId: string; status: "open" | "done" }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      await sql`
        update tasks set status = ${data.status}
        where id = ${data.taskId} and business_id = ${gate.id}
      `;
    }),
  );

export const recordPayment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; label: string; amount: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "admin", async (sql, gate) => {
      const amount = Number(data.amount);
      if (!data.label.trim() || !Number.isFinite(amount) || amount <= 0) {
        return { ok: false, message: "Add a label and an amount greater than zero." };
      }
      const cents = Math.round(amount * 100);
      await sql`
        insert into payments (id, business_id, label, amount_cents, status)
        values (${newId()}, ${gate.id}, ${data.label.trim().slice(0, 120)}, ${cents}, 'recorded')
      `;
      await writeActivity(sql, gate.id, `Recorded a payment of A$${(cents / 100).toFixed(2)}. This does not charge a card.`);
    }),
  );

export const setPlan = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; plan: PlanId }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "owner", async (sql, gate) => {
      const plan = PLANS[data.plan];
      if (!plan) return { ok: false, message: "Choose a plan." };
      await sql`
        update balances set plan = ${plan.id}, included = ${plan.included}
        where business_id = ${gate.id}
      `;
      await sql`
        insert into usage_transactions (id, business_id, kind, label, units)
        values (${newId()}, ${gate.id}, 'plan', ${`Plan set to ${plan.name}`}, 0)
      `;
      await writeActivity(
        sql,
        gate.id,
        `Set the plan to ${plan.name}. Nothing was charged — card billing is not connected.`,
      );
      return ok(sql, context.userId, `Plan set to ${plan.name}. No card was charged.`);
    }),
  );

export const addTopup = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; units: number }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "owner", async (sql, gate) => {
      const pack = TOPUPS.find((item) => item.units === data.units);
      if (!pack) return { ok: false, message: "Choose a top-up." };
      await sql`update balances set topup = topup + ${pack.units} where business_id = ${gate.id}`;
      await sql`
        insert into usage_transactions (id, business_id, kind, label, units)
        values (${newId()}, ${gate.id}, 'topup', ${`Top-up of ${pack.units} executions`}, ${pack.units})
      `;
      await writeActivity(
        sql,
        gate.id,
        `Added ${pack.units} executions after you confirmed. Listed price A$${pack.price}. Nothing was charged — card billing is not connected.`,
      );
      return ok(sql, context.userId, "Executions added. No card was charged.");
    }),
  );

export const switchBusiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const gate = await loadGate(sql, context.userId, data.businessId, "viewer");
    if (!gate.ok) return gate;
    await sql`
      insert into user_prefs (user_id, active_business_id)
      values (${context.userId}, ${data.businessId})
      on conflict (user_id) do update set active_business_id = ${data.businessId}
    `;
    return ok(sql, context.userId);
  });

export const inviteMember = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; email: string; role: "admin" | "operator" | "viewer" }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "owner", async (sql, gate) => {
      const email = data.email.trim().toLowerCase();
      if (!email.includes("@")) return { ok: false, message: "Enter an email address." };
      const users = await sql<{ id: string; email: string }>`
        select id, email from "user" where lower(email) = ${email}
      `;
      if (users[0]) {
        if (users[0].id === context.userId) return { ok: false, message: "You are already on this business." };
        await sql`
          insert into business_members (business_id, user_id, role)
          values (${gate.id}, ${users[0].id}, ${data.role})
          on conflict (business_id, user_id) do update set role = ${data.role}
        `;
        await writeActivity(sql, gate.id, `Gave ${email} the ${data.role} role.`);
        return;
      }
      const pending = gate.profile.pendingInvites.filter((item) => item.email !== email);
      pending.push({ email, role: data.role });
      await saveProfile(sql, gate.id, { ...gate.profile, pendingInvites: pending });
      await writeActivity(
        sql,
        gate.id,
        `Saved an invite for ${email}. They will need an account before they can open this business.`,
      );
      return ok(sql, context.userId, "Invite saved. They need an account on this email before access works.");
    }),
  );

export const saveIntegrationNote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; integrationId: string; note: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const note = data.note.trim().slice(0, 400);
      await sql`
        update integrations
        set note = ${note}, status = ${note ? "details_saved" : "not_connected"}
        where id = ${data.integrationId} and business_id = ${gate.id}
      `;
      await writeActivity(
        sql,
        gate.id,
        note
          ? "Saved a note on an integration. It is not connected."
          : "Cleared an integration note.",
      );
    }),
  );

export const saveExperiment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { businessId: string; hypothesis: string; status?: string; result?: string; id?: string }) =>
      input,
  )
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const hypothesis = data.hypothesis.trim().slice(0, 300);
      if (hypothesis.length < 4) return { ok: false, message: "Describe the experiment." };
      const status = data.status === "running" || data.status === "done" ? data.status : "planned";
      if (data.id) {
        await sql`
          update experiments
          set hypothesis = ${hypothesis}, status = ${status}, result = ${data.result?.slice(0, 400) ?? ""}
          where id = ${data.id} and business_id = ${gate.id}
        `;
        return;
      }
      await sql`
        insert into experiments (id, business_id, hypothesis, status, result)
        values (${newId()}, ${gate.id}, ${hypothesis}, ${status}, ${data.result?.slice(0, 400) ?? ""})
      `;
    }),
  );

export const requestService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; name: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "owner", async (sql, gate) => {
      const name = data.name.trim().slice(0, 80);
      await sql`
        insert into tasks (id, business_id, title, detail, status)
        values (${newId()}, ${gate.id}, ${`Requested ${name}`}, ${"Recorded only. Nothing is purchased from this screen."}, 'open')
      `;
      await writeActivity(sql, gate.id, `Recorded a request for ${name}. Nothing was purchased.`);
      return ok(sql, context.userId, "Request recorded. Nothing was purchased.");
    }),
  );

export const improveCopy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; target: "offer" | "page" | "brief"; pageId?: string }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      if (!withinLimit(`ai:${context.userId}`, 20)) {
        return { ok: false, message: "Too many wording requests in a short time. Try again later." };
      }
      if (data.target === "offer") {
        const { rewriteOffer } = await import("./ai.server");
        const patch = await rewriteOffer(gate.profile, gate.name);
        if (!patch) return { ok: false, message: "Wording help is unavailable right now. Your offer is unchanged." };
        const spent = await charge(sql, gate.id, COSTS.rewriteOffer, "Rewrote the offer");
        if (!spent.ok) return spent;
        const profile = applyCopyPatch(gate.profile, patch);
        profile.modules.offer.status = "needs_attention";
        profile.modules.offer.next = "Review the rewritten offer";
        await saveProfile(sql, gate.id, profile);
        await writeActivity(sql, gate.id, "Rewrote the offer. Review it before you treat it as final.");
        return;
      }
      if (data.target === "page") {
        const pages = await sql<{ id: string; sections: unknown; status: string }>`
          select id, sections, status from pages where id = ${data.pageId ?? ""} and business_id = ${gate.id}
        `;
        const page = pages[0];
        if (!page) return { ok: false, message: "Open a page first." };
        const sections = asSections(page.sections);
        const { rewriteSections } = await import("./ai.server");
        const patch = await rewriteSections(
          gate.name,
          sections.map((section) => ({ id: section.id, heading: section.heading, body: section.body })),
        );
        if (!patch?.pageSections?.length) {
          return { ok: false, message: "Wording help is unavailable right now. The page is unchanged." };
        }
        const spent = await charge(sql, gate.id, COSTS.rewritePage, "Rewrote the page");
        if (!spent.ok) return spent;
        const nextSections = sections.map((section) => {
          const match = patch.pageSections?.find((item) => item.id === section.id);
          if (!match) return section;
          return {
            ...section,
            heading: String(match.heading || section.heading).slice(0, 140),
            body: String(match.body || section.body).slice(0, 800),
          };
        });
        if (page.status === "published") {
          await sql`
            insert into approvals (id, business_id, title, summary, why, risk, estimate, external_cost, status, kind, payload)
            values (
              ${newId()}, ${gate.id}, ${"Approve rewritten page"},
              ${"New wording is ready. The live page stays as it is until you approve."},
              ${"You asked for a rewrite of a live page."},
              ${"Medium. Customers will see it after approval."},
              ${0}, ${"A$0"}, ${"waiting"}, ${"publish"},
              ${json({ type: "publish", pageId: page.id, sections: nextSections })}::jsonb
            )
          `;
          await writeActivity(sql, gate.id, "Rewrote the live page and waited for your approval.");
          return;
        }
        await sql`update pages set sections = ${json(nextSections)}::jsonb, updated_at = now() where id = ${page.id}`;
        await writeActivity(sql, gate.id, "Rewrote the launch page draft.");
        return;
      }
      const published = await sql<{ count: string }>`
        select count(*)::text as count from pages where business_id = ${gate.id} and status = 'published'
      `;
      const facts = localBrief({
        name: gate.name,
        leads: 0,
        published: Number(published[0]?.count ?? 0),
        running: 0,
        waiting: 0,
        remaining: 0,
        next: gate.profile.modules.product.next,
      });
      const { writeBrief } = await import("./ai.server");
      const patch = await writeBrief(
        `${gate.name}. Goal: ${gate.profile.goal}. Offer: ${gate.profile.offer.summary}. Next: ${gate.profile.modules.product.next}`,
      );
      const body = patch?.brief?.trim() || facts;
      if (patch?.brief) {
        const spent = await charge(sql, gate.id, COSTS.brief, "Wrote the weekly brief");
        if (!spent.ok) return spent;
      }
      await sql`insert into briefs (id, business_id, body) values (${newId()}, ${gate.id}, ${body.slice(0, 1200)})`;
      await writeActivity(
        sql,
        gate.id,
        patch?.brief
          ? "Wrote this week's brief."
          : "Saved a brief from your business facts. Wording help was unavailable, so no execution was used.",
      );
    }),
  );

export const createTool = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { businessId: string; tool: "calculator" | "enquiry" }) => input)
  .handler(async ({ context, data }) =>
    mutate(context.userId, data.businessId, "operator", async (sql, gate) => {
      const existing = await sql<{ id: string }>`
        select id from pages where business_id = ${gate.id} and kind = 'tool' and meta->>'tool' = ${data.tool}
      `;
      if (existing[0]) return { ok: false, message: "That tool already exists." };
      const slug = `${gate.slug}-${data.tool}`;
      const title = data.tool === "calculator" ? "Pricing calculator" : "Enquiry form";
      await sql`
        insert into pages (id, business_id, kind, title, slug, status, direction, sections, meta)
        values (
          ${newId()},
          ${gate.id},
          'tool',
          ${title},
          ${slug},
          'draft',
          ${gate.profile.brand.direction},
          ${json([
            {
              id: "tool",
              kind: "offer",
              heading: title,
              body: data.tool === "calculator"
                ? "Estimate a starting price from the packages you already defined."
                : "Ask a question. It arrives as a lead.",
            },
          ])}::jsonb,
          ${json({ tool: data.tool, packages: gate.profile.offer.packages })}::jsonb
        )
      `;
      await writeActivity(sql, gate.id, `Created a draft ${title.toLowerCase()}. It is not public yet.`);
    }),
  );

export const getPublished = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{
      title: string;
      slug: string;
      kind: "site" | "tool";
      direction: Direction;
      sections: unknown;
      meta: unknown;
      business_name: string;
    }>`
      select p.title, p.slug, p.kind, p.direction, p.sections, p.meta, b.name as business_name
      from pages p
      join businesses b on b.id = p.business_id
      where p.slug = ${data.slug} and p.status = 'published'
    `;
    const row = rows[0];
    if (!row) return { found: false as const };
    return {
      found: true as const,
      businessName: row.business_name,
      title: row.title,
      slug: row.slug,
      kind: row.kind,
      direction: row.direction,
      sections: asSections(row.sections),
      meta: asMeta(row.meta),
    };
  });

export const captureLead = createServerFn({ method: "POST" })
  .validator(
    (input: { slug: string; name: string; email: string; note: string; company?: string }) => input,
  )
  .handler(async ({ data }) => {
    if (data.company) return { ok: true as const };
    const name = data.name.trim().slice(0, 80);
    const email = data.email.trim().toLowerCase().slice(0, 160);
    if (name.length < 2 || !email.includes("@") || email.includes(" ")) {
      return { ok: false as const, message: "Add your name and email." };
    }
    if (!withinLimit(`lead:${data.slug}`, 40)) {
      return { ok: false as const, message: "Too many notes just now. Try again shortly." };
    }
    const sql = await getSql();
    const pages = await sql<{ business_id: string; business_name: string; profile: unknown }>`
      select p.business_id, b.name as business_name, b.profile
      from pages p
      join businesses b on b.id = p.business_id
      where p.slug = ${data.slug} and p.status = 'published'
    `;
    const page = pages[0];
    if (!page) return { ok: false as const, message: "This page is not accepting notes." };
    const profile = parseProfile(page.profile) ?? null;
    const leadId = newId();
    await sql`
      insert into leads (id, business_id, name, email, source, status, note)
      values (${leadId}, ${page.business_id}, ${name}, ${email}, 'Launch page', 'new', ${data.note.slice(0, 800)})
    `;
    if (profile) {
      await onNewLead(sql, page.business_id, profile, page.business_name, {
        id: leadId,
        name,
        note: data.note,
      });
    }
    await writeActivity(sql, page.business_id, `${name} asked about the offer from the launch page.`);
    return { ok: true as const };
  });
