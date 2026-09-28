import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  AUTONOMY,
  COSTS,
  CREW,
  PLANS,
  SERVICES,
  TOPUPS,
  clampPolicies,
  localBrief,
  money,
  remaining,
  type AutonomyId,
  type PlanId,
  type Policies,
  type WorkMode,
} from "@/lib/launch/domain";
import {
  addTopup,
  decideApproval,
  improveCopy,
  inviteMember,
  requestService,
  saveApprovalDraft,
  saveExperiment,
  saveIntegrationNote,
  setPlan,
  switchBusiness,
  updateAutonomy,
  updatePolicies,
} from "@/lib/launch/server";
import {
  Button,
  ConfirmDialog,
  EmptyState,
  Estimate,
  Field,
  PageHeader,
  Panel,
  fieldClass,
} from "./ui";
import { canEdit, useActive, useMutate, useWorkspace } from "./workspace";

export function ApprovalsScreen() {
  const active = useActive();
  const decide = useMutate(decideApproval);
  const saveDraft = useMutate(saveApprovalDraft);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  if (!active) return null;
  const waiting = active.approvals.filter((item) => item.status === "waiting");
  const allowed = canEdit(active.role);
  return (
    <div>
      <PageHeader title="Approvals" detail="What will happen, why, and what it costs. Then you decide." />
      {waiting.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="Nothing to approve" body="When a page, reply or campaign is ready, it waits here. Rejected and finished items stay in activity." />
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {waiting.map((item) => {
            const draft = drafts[item.id] ?? String(item.payload.draft ?? item.summary);
            const editable = item.kind === "followup";
            return (
              <li key={item.id} className="rounded-lg border border-line p-4">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm">{item.summary}</p>
                <p className="mt-2 text-sm text-muted">{item.why}</p>
                <p className="mt-1 text-sm text-muted">Risk: {item.risk}</p>
                {editable ? (
                  <label className="mt-3 block text-sm">
                    Reply
                    <textarea
                      className={`${fieldClass} mt-1`}
                      rows={6}
                      value={draft}
                      onChange={(event) => setDrafts({ ...drafts, [item.id]: event.target.value })}
                    />
                  </label>
                ) : null}
                <div className="mt-3">
                  <Estimate units={item.estimate} cost={item.externalCost} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {editable ? (
                    <Button type="button" variant="quiet" disabled={!allowed || saveDraft.isPending} onClick={() => saveDraft.mutate({ businessId: active.id, approvalId: item.id, draft })}>
                      Save edit
                    </Button>
                  ) : (
                    <Link to={item.kind === "publish" ? "/app/website" : item.kind === "offer" ? "/app/offer" : item.kind === "brand" ? "/app/brand" : "/app/campaigns"} className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold">
                      Edit
                    </Link>
                  )}
                  <Button type="button" disabled={!allowed || decide.isPending} onClick={() => decide.mutate({ businessId: active.id, approvalId: item.id, decision: "approve" })}>
                    Approve
                  </Button>
                  <Button type="button" variant="danger" disabled={!allowed || decide.isPending} onClick={() => decide.mutate({ businessId: active.id, approvalId: item.id, decision: "reject" })}>
                    Reject
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function ActivityScreen() {
  const active = useActive();
  const [open, setOpen] = useState<string | null>(null);
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Activity" detail="What happened, in plain language." />
      {active.activity.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No activity yet" body="Decisions and finished work will be listed here." />
        </div>
      ) : (
        <ol className="mt-6 space-y-4 border-l border-line pl-4">
          {active.activity.map((item) => (
            <li key={item.id}>
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-muted">
                {item.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : ""}
              </p>
              {item.detail ? (
                <button type="button" className="mt-1 text-sm text-signal" onClick={() => setOpen(open === item.id ? null : item.id)}>
                  {open === item.id ? "Hide details" : "View details"}
                </button>
              ) : null}
              {open === item.id ? <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{item.detail}</p> : null}
            </li>
          ))}
        </ol>
      )}
      <BlockLink />
    </div>
  );
}

function BlockLink() {
  return (
    <p className="mt-6 text-sm">
      <Link to="/app/approvals" className="text-signal">Go to approvals</Link>
    </p>
  );
}

export function ReportsScreen() {
  const active = useActive();
  const write = useMutate(improveCopy);
  const save = useMutate(saveExperiment);
  const [hypothesis, setHypothesis] = useState("");
  const [ask, setAsk] = useState(false);
  if (!active) return null;
  const published = active.pages.filter((page) => page.status === "published").length;
  const waiting = active.approvals.filter((item) => item.status === "waiting").length;
  const running = active.workflows.filter((item) => item.status === "running").length;
  const brief = localBrief({
    name: active.name,
    leads: active.leads.length,
    published,
    running,
    waiting,
    remaining: remaining(active.balance),
    next: active.profile.modules.product.next,
  });
  const recorded = active.payments.reduce((sum, item) => sum + item.amountCents, 0);
  return (
    <div>
      <PageHeader
        title="Reports"
        detail="What changed, in sentences. Not a wall of charts."
        action={<Button type="button" disabled={!canEdit(active.role)} onClick={() => setAsk(true)}>Write weekly brief</Button>}
      />
      <Panel className="mt-6">
        <p className="text-sm">{active.briefs[0]?.body ?? brief}</p>
      </Panel>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Panel><dt className="text-muted">Leads</dt><dd className="text-xl font-semibold tabular-nums">{active.leads.length}</dd></Panel>
        <Panel><dt className="text-muted">Recorded payments</dt><dd className="text-xl font-semibold tabular-nums">{money(recorded)}</dd></Panel>
        <Panel><dt className="text-muted">Live pages</dt><dd className="text-xl font-semibold tabular-nums">{published}</dd></Panel>
        <Panel><dt className="text-muted">Executions used</dt><dd className="text-xl font-semibold tabular-nums">{active.balance.used}</dd></Panel>
      </dl>
      <h2 className="mt-8 text-base font-semibold">Experiments</h2>
      <form
        className="mt-3 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          save.mutate({ businessId: active.id, hypothesis }, { onSuccess: () => setHypothesis("") });
        }}
      >
        <input className={fieldClass} value={hypothesis} placeholder="Test the pricing headline" onChange={(event) => setHypothesis(event.target.value)} />
        <Button type="submit" disabled={!canEdit(active.role)}>Add</Button>
      </form>
      {active.experiments.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No experiments yet. A useful one is a single change you can judge.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {active.experiments.map((item) => (
            <li key={item.id} className="rounded-lg border border-line px-3 py-3">
              <p>{item.hypothesis}</p>
              <label className="mt-2 block text-xs text-muted">
                Status
                <select
                  className="mt-1 block min-h-11 rounded-md border border-line bg-ink px-2 text-sm text-fg"
                  value={item.status}
                  onChange={(event) => save.mutate({ businessId: active.id, id: item.id, hypothesis: item.hypothesis, status: event.target.value, result: item.result })}
                >
                  <option value="planned">Planned</option>
                  <option value="running">Running</option>
                  <option value="done">Done</option>
                </select>
              </label>
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={ask}
        onOpenChange={setAsk}
        title="Write the weekly brief"
        body="Uses your current numbers. If wording help is unavailable, the factual brief above is kept and no execution is used."
        confirm="Write brief"
        busy={write.isPending}
        onConfirm={() => write.mutate({ businessId: active.id, target: "brief" }, { onSuccess: () => setAsk(false) })}
      >
        <Estimate units={COSTS.brief} />
      </ConfirmDialog>
    </div>
  );
}

const POLICY_ROWS: { key: keyof Policies; label: string; locked?: boolean; help: string }[] = [
  { key: "websiteCopy", label: "Website copy", help: "Drafting words can run once you allow it." },
  { key: "websitePublish", label: "Website publishing", help: "Going live always stops for you, or stays manual." },
  { key: "customerEmail", label: "Customer email", help: "Replies are prepared. They are not sent on their own." },
  { key: "adSpend", label: "Ad spend", help: "Plans can be saved. Money is never spent from here." },
  { key: "refund", label: "Refund", locked: true, help: "You do this. It cannot be automated." },
  { key: "bank", label: "Bank movement", locked: true, help: "You do this. It cannot be automated." },
  { key: "irreversible", label: "Irreversible action", locked: true, help: "You do this. It cannot be automated." },
];

export function PermissionsScreen() {
  const active = useActive();
  const save = useMutate(updatePolicies);
  const [policies, setPolicies] = useState<Policies | null>(null);
  if (!active) return null;
  const value = policies ?? active.profile.policies;
  return (
    <div>
      <PageHeader
        title="Permissions"
        detail="What launch/run may prepare, and what only you can do."
        action={
          <Button type="button" disabled={!canEdit(active.role, "admin") || save.isPending} onClick={() => save.mutate({ businessId: active.id, policies: clampPolicies(value) })}>
            Save permissions
          </Button>
        }
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        {POLICY_ROWS.map((row) => (
          <li key={row.key} className="grid gap-2 px-4 py-4 sm:grid-cols-[1fr_10rem]">
            <div>
              <p className="text-sm font-medium">{row.label}</p>
              <p className="text-sm text-muted">{row.help}</p>
            </div>
            <label className="text-xs text-muted">
              Mode
              <select
                className="mt-1 block min-h-11 w-full rounded-md border border-line bg-ink px-2 text-sm text-fg"
                disabled={row.locked || !canEdit(active.role, "admin")}
                value={row.locked ? "manual" : value[row.key]}
                onChange={(event) => setPolicies({ ...value, [row.key]: event.target.value as WorkMode })}
              >
                {!row.locked && row.key === "websiteCopy" ? <option value="auto">Auto</option> : null}
                {!row.locked ? <option value="approve">Approve</option> : null}
                {!row.locked ? <option value="suggest">Suggest</option> : null}
                <option value="manual">Manual</option>
              </select>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BillingScreen() {
  const active = useActive();
  const plan = useMutate(setPlan);
  const topup = useMutate(addTopup);
  const service = useMutate(requestService);
  const [choice, setChoice] = useState<PlanId | null>(null);
  const [pack, setPack] = useState<number | null>(null);
  if (!active) return null;
  const left = remaining(active.balance);
  const owner = canEdit(active.role, "owner");
  return (
    <div>
      <PageHeader title="Billing" detail="Plans and top-ups are recorded here. Card billing is not connected, so nothing on this page charges a card." />
      <Panel className="mt-6">
        <p className="text-sm text-muted">Current plan</p>
        <p className="text-xl font-semibold">{PLANS[active.balance.plan].name}</p>
        <p className="mt-1 text-sm tabular-nums">
          {active.balance.used} used · {left} left · {active.balance.included} included · {active.balance.topup} from top-ups
        </p>
      </Panel>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(Object.keys(PLANS) as PlanId[]).map((id) => (
          <article key={id} className="rounded-lg border border-line p-4">
            <h2 className="font-semibold">{PLANS[id].name}</h2>
            <p className="mt-1 text-sm tabular-nums">A${PLANS[id].price} / month · {PLANS[id].included} executions</p>
            <Button type="button" variant={active.balance.plan === id ? "quiet" : "primary"} className="mt-3" disabled={!owner || active.balance.plan === id} onClick={() => setChoice(id)}>
              {active.balance.plan === id ? "Current" : `Use ${PLANS[id].name}`}
            </Button>
          </article>
        ))}
      </div>
      <h2 className="mt-8 text-base font-semibold">Top-ups</h2>
      <p className="mt-1 text-sm text-muted">You confirm each one. They are never bought in the background.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {TOPUPS.map((item) => (
          <Button key={item.units} type="button" variant="quiet" disabled={!owner} onClick={() => setPack(item.units)}>
            +{item.units} · A${item.price}
          </Button>
        ))}
      </div>
      <h2 className="mt-8 text-base font-semibold">Optional services</h2>
      <ul className="mt-3 space-y-3">
        {SERVICES.map((item) => (
          <li key={item.id} className="rounded-lg border border-line p-4 text-sm">
            <p className="font-medium">{item.name} · {item.price}</p>
            <p className="mt-1 text-muted">{item.detail}</p>
            <Button type="button" variant="quiet" className="mt-3" disabled={!owner} onClick={() => service.mutate({ businessId: active.id, name: item.name })}>
              Record a request
            </Button>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        open={!!choice}
        onOpenChange={(open) => { if (!open) setChoice(null); }}
        title={choice ? `Use ${PLANS[choice].name}` : "Change plan"}
        body="This updates the allowance on the workspace. No card is charged. Allowances do not reset on their own in this version."
        confirm="Set plan"
        busy={plan.isPending}
        onConfirm={() => { if (choice) plan.mutate({ businessId: active.id, plan: choice }, { onSuccess: () => setChoice(null) }); }}
      />
      <ConfirmDialog
        open={pack !== null}
        onOpenChange={(open) => { if (!open) setPack(null); }}
        title="Add executions"
        body="You are confirming this top-up. The listed price is not collected, because card billing is not connected."
        confirm="Add executions"
        busy={topup.isPending}
        onConfirm={() => { if (pack) topup.mutate({ businessId: active.id, units: pack }, { onSuccess: () => setPack(null) }); }}
      />
    </div>
  );
}

export function SettingsScreen() {
  const query = useWorkspace();
  const active = query.data?.active;
  const autonomy = useMutate(updateAutonomy);
  const invite = useMutate(inviteMember);
  const note = useMutate(saveIntegrationNote);
  const swap = useMutate(switchBusiness);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "operator" | "viewer">("operator");
  if (!active || !query.data) return null;
  return (
    <div>
      <PageHeader title="Settings" detail={`${active.name} · you are the ${active.role}.`} />
      {query.data.businesses.length > 1 ? (
        <label className="mt-6 block text-sm">
          Open business
          <select className={`${fieldClass} mt-1`} value={active.id} onChange={(event) => swap.mutate({ businessId: event.target.value })}>
            {query.data.businesses.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      ) : null}
      <h2 className="mt-8 text-base font-semibold">How much help</h2>
      <div className="mt-3 space-y-2">
        {AUTONOMY.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!canEdit(active.role, "admin")}
            aria-pressed={active.autonomy === item.id}
            className={active.autonomy === item.id ? "block w-full rounded-lg border border-action p-3 text-left" : "block w-full rounded-lg border border-line p-3 text-left"}
            onClick={() => autonomy.mutate({ businessId: active.id, autonomy: item.id as AutonomyId })}
          >
            <span className="block text-sm font-medium">{item.title}</span>
            <span className="text-sm text-muted">{item.body}</span>
          </button>
        ))}
      </div>
      <h2 className="mt-8 text-base font-semibold">People</h2>
      <p className="mt-1 text-sm text-muted">Invite someone who already has an account. Otherwise the email is saved until they sign up.</p>
      <form
        className="mt-3 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          invite.mutate({ businessId: active.id, email, role }, { onSuccess: () => setEmail("") });
        }}
      >
        <Field label="Email"><input className={fieldClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
        <Field label="Role">
          <select className={fieldClass} value={role} onChange={(event) => setRole(event.target.value as typeof role)}>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="viewer">Viewer</option>
          </select>
        </Field>
        <Button type="submit" disabled={!canEdit(active.role, "owner")}>Save invite</Button>
      </form>
      {active.profile.pendingInvites.length ? (
        <ul className="mt-3 text-sm text-muted">
          {active.profile.pendingInvites.map((item) => (
            <li key={item.email}>{item.email} · {item.role} · waiting for an account</li>
          ))}
        </ul>
      ) : null}
      <h2 className="mt-8 text-base font-semibold">Connections</h2>
      <p className="mt-1 text-sm text-muted">Nothing here is live-connected. A note is only a note.</p>
      <ul className="mt-3 space-y-3">
        {active.integrations.map((item) => (
          <li key={item.id}>
            <Field label={`${item.name} · ${item.status === "details_saved" ? "Note saved" : "Not connected"}`}>
              <input
                className={fieldClass}
                defaultValue={item.note}
                placeholder="Paste a link or a reminder"
                onBlur={(event) => {
                  if (event.target.value !== item.note) {
                    note.mutate({ businessId: active.id, integrationId: item.id, note: event.target.value });
                  }
                }}
              />
            </Field>
          </li>
        ))}
      </ul>
      <ul className="mt-8 space-y-2 text-sm">
        <li><Link to="/app/billing" className="text-signal">Billing</Link></li>
        <li><Link to="/app/permissions" className="text-signal">Permissions</Link></li>
        <li><Link to="/app/activity" className="text-signal">Activity</Link></li>
        <li><Link to="/app/crew" className="text-signal">AI crew</Link></li>
        <li><Link to="/app/memory" className="text-signal">Business memory</Link></li>
      </ul>
    </div>
  );
}

export function CrewScreen() {
  const active = useActive();
  if (!active) return null;
  return (
    <div>
      <PageHeader
        title="AI crew"
        detail="A secondary view of responsibility. You still work with tasks and approvals, not a directory of bots."
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        {CREW.map((member) => {
          const module = active.profile.modules[member.watches as keyof typeof active.profile.modules];
          return (
            <li key={member.role} className="px-4 py-4 text-sm">
              <p className="font-medium">{member.role}</p>
              <p className="mt-1 text-muted">{member.does}</p>
              <p className="mt-2">Current work: {module.next}</p>
              <p className="text-muted">Permission follows the rules on the permissions page.</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
