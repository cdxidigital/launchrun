import { z } from "zod";

export const PATHS = [
  {
    id: "new",
    title: "Start something new",
    body: "I have an idea and want to turn it into a business.",
  },
  {
    id: "improve",
    title: "Improve a business",
    body: "I already have a business and want to make it run better.",
  },
  {
    id: "digital",
    title: "Build a digital product",
    body: "I want to create a website, app, portal or digital service.",
  },
] as const;

export const AUTONOMY = [
  {
    id: "guide",
    title: "Guide me",
    body: "Recommend the next step. I will do the work.",
  },
  {
    id: "collaborate",
    title: "Work with me",
    body: "Draft the work. I approve before anything goes out.",
  },
  {
    id: "routine",
    title: "Handle the routine",
    body: "Run the repetitive work I have already approved. I keep the decisions.",
  },
] as const;

export const PLANS = {
  start: {
    id: "start",
    name: "Start",
    price: 0,
    included: 10,
    blurb: "Map the business and preview a launch page.",
    points: [
      "1 business",
      "Business map",
      "Plan builder",
      "Website preview",
      "10 executions / month",
      "No card required",
    ],
  },
  build: {
    id: "build",
    name: "Build",
    price: 49,
    included: 150,
    blurb: "Build the first version and keep leads in one place.",
    points: [
      "1 business",
      "Full business map",
      "Website and simple tools",
      "Brand studio",
      "Leads and contacts",
      "150 executions / month",
      "Weekly business brief",
    ],
  },
  run: {
    id: "run",
    name: "Run",
    price: 119,
    included: 500,
    blurb: "Let approved routine work keep moving.",
    points: [
      "Everything in Build",
      "Workflows",
      "Inbox",
      "Lead follow-up",
      "500 executions / month",
      "Approval rules",
    ],
  },
  scale: {
    id: "scale",
    name: "Scale",
    price: 249,
    included: 1500,
    blurb: "More than one business, with room to grow.",
    points: [
      "Everything in Run",
      "Up to 3 businesses",
      "1,500 executions / month",
      "Team seats",
      "Richer reports",
    ],
  },
} as const;

export const TOPUPS = [
  { units: 100, price: 15 },
  { units: 500, price: 55 },
  { units: 1500, price: 145 },
] as const;

export const SERVICES = [
  {
    id: "launch-assist",
    name: "Launch Assist",
    price: "A$299",
    detail: "A guided week to sharpen the offer and publish the first page.",
  },
  {
    id: "brand-pack",
    name: "Brand Pack",
    price: "A$495",
    detail: "Name, tone, messaging and visual rules, ready to reuse.",
  },
  {
    id: "custom-build",
    name: "Custom Build",
    price: "From A$995",
    detail: "A specific page, tool or workflow built with you.",
  },
  {
    id: "migration",
    name: "Migration",
    price: "From A$395",
    detail: "Bring an existing site, list or offer across.",
  },
] as const;

export const COSTS = {
  map: 5,
  publish: 4,
  followUp: 5,
  rewriteOffer: 1,
  rewritePage: 5,
  draftPost: 1,
  campaign: 10,
  brief: 1,
} as const;

export type PlanId = keyof typeof PLANS;
export type PathId = (typeof PATHS)[number]["id"];
export type AutonomyId = (typeof AUTONOMY)[number]["id"];
export type Role = "owner" | "admin" | "operator" | "viewer";
export type ModuleKey =
  | "offer"
  | "audience"
  | "brand"
  | "product"
  | "marketing"
  | "operations";
export type ModuleStatus =
  | "not_started"
  | "needs_setup"
  | "ready"
  | "running"
  | "needs_attention"
  | "complete";
export type WorkMode = "suggest" | "approve" | "auto" | "manual";
export type Direction = "paper" | "night" | "signal";

export const MODULES: { key: ModuleKey; label: string; about: string }[] = [
  { key: "offer", label: "Offer", about: "What you sell, the price and the promise." },
  { key: "audience", label: "Audience", about: "Who it is for, and why they care." },
  { key: "brand", label: "Brand", about: "Name, tone and the words you repeat." },
  { key: "product", label: "Product", about: "The page or tool customers actually use." },
  { key: "marketing", label: "Marketing", about: "How people hear about you." },
  { key: "operations", label: "Operations", about: "The work that keeps the business moving." },
];

const ROLE_RANK: Record<Role, number> = {
  viewer: 0,
  operator: 1,
  admin: 2,
  owner: 3,
};

export function roleAllows(role: Role, min: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

export const answersSchema = z.object({
  path: z.enum(["new", "improve", "digital"]),
  businessName: z.string().min(2).max(80),
  goal: z.string().min(2).max(500),
  sell: z.string().min(2).max(500),
  audience: z.string().min(2).max(500),
  useful: z.string().min(2).max(500),
  findBuy: z.string().min(2).max(500),
  have: z.string().min(2).max(500),
  autonomy: z.enum(["guide", "collaborate", "routine"]),
  imports: z
    .array(
      z.object({
        kind: z.enum([
          "website",
          "domain",
          "documents",
          "social",
          "customers",
          "brand",
          "product",
          "knowledge",
        ]),
        value: z.string().max(400),
      }),
    )
    .max(8),
});

export type SetupAnswers = z.infer<typeof answersSchema>;

export const draftSchema = z.object({
  step: z.number().int().min(0).max(8),
  answers: answersSchema.partial(),
});

export type SetupDraft = z.infer<typeof draftSchema>;

const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  includes: z.string(),
});

const moduleSchema = z.object({
  status: z.enum([
    "not_started",
    "needs_setup",
    "ready",
    "running",
    "needs_attention",
    "complete",
  ]),
  percent: z.number().int().min(0).max(100),
  next: z.string(),
  owner: z.string(),
  automation: z.enum(["off", "suggest", "approve", "auto"]),
});

export const policiesSchema = z.object({
  websiteCopy: z.enum(["suggest", "approve", "auto", "manual"]),
  websitePublish: z.enum(["suggest", "approve", "auto", "manual"]),
  customerEmail: z.enum(["suggest", "approve", "auto", "manual"]),
  adSpend: z.enum(["suggest", "approve", "auto", "manual"]),
  refund: z.enum(["suggest", "approve", "auto", "manual"]),
  bank: z.enum(["suggest", "approve", "auto", "manual"]),
  irreversible: z.enum(["suggest", "approve", "auto", "manual"]),
});

export type Policies = z.infer<typeof policiesSchema>;

export const profileSchema = z.object({
  welcomed: z.boolean().default(false),
  goal: z.string(),
  sell: z.string(),
  useful: z.string(),
  findBuy: z.string(),
  have: z.string(),
  imports: answersSchema.shape.imports,
  offer: z.object({
    summary: z.string(),
    positioning: z.string(),
    guarantee: z.string(),
    messaging: z.string(),
    packages: z.array(packageSchema),
  }),
  audienceProfile: z.object({
    summary: z.string(),
    segments: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        needs: z.string(),
        objections: z.string(),
        sources: z.string(),
      }),
    ),
  }),
  brand: z.object({
    positioning: z.string(),
    tone: z.string(),
    messaging: z.string(),
    rules: z.string(),
    direction: z.enum(["paper", "night", "signal"]),
  }),
  memory: z.array(z.object({ id: z.string(), label: z.string(), value: z.string() })),
  modules: z.object({
    offer: moduleSchema,
    audience: moduleSchema,
    brand: moduleSchema,
    product: moduleSchema,
    marketing: moduleSchema,
    operations: moduleSchema,
  }),
  opportunities: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      detail: z.string(),
      href: z.enum([
        "/app",
        "/app/approvals",
        "/app/leads",
        "/app/inbox",
        "/app/website",
        "/app/automations",
        "/app/campaigns",
        "/app/offer",
        "/app/audience",
        "/app/brand",
      ]),
    }),
  ),
  policies: policiesSchema,
  pendingInvites: z
    .array(z.object({ email: z.string(), role: z.enum(["admin", "operator", "viewer"]) }))
    .default([]),
});

export type BusinessProfile = z.infer<typeof profileSchema>;
export type Section = {
  id: string;
  kind: "hero" | "offer" | "proof" | "faq" | "capture";
  heading: string;
  body: string;
  items: { q: string; a: string }[];
};

export type ApprovalPayload = {
  type: string;
  leadId: string;
  pageId: string;
  campaignId: string;
  contentId: string;
  draft: string;
  direction: string;
  sections: Section[];
};

export type AppHref =
  | "/app"
  | "/app/approvals"
  | "/app/leads"
  | "/app/inbox"
  | "/app/website"
  | "/app/automations"
  | "/app/campaigns"
  | "/app/offer"
  | "/app/audience"
  | "/app/brand";

export type PageRecord = {
  id: string;
  kind: "site" | "tool";
  title: string;
  slug: string;
  status: "draft" | "published";
  direction: Direction;
  sections: Section[];
  meta: { tool?: "calculator" | "enquiry" | null; packages?: BusinessProfile["offer"]["packages"] };
  updatedAt: string;
};

export const IMPORT_KINDS: { kind: SetupAnswers["imports"][number]["kind"]; label: string }[] = [
  { kind: "website", label: "Website" },
  { kind: "domain", label: "Domain" },
  { kind: "documents", label: "Documents" },
  { kind: "social", label: "Social profiles" },
  { kind: "customers", label: "Customer list" },
  { kind: "brand", label: "Brand assets" },
  { kind: "product", label: "Product notes" },
  { kind: "knowledge", label: "Knowledge" },
];

export const WORKFLOW_TEMPLATES = [
  {
    id: "lead-follow-up",
    name: "Lead follow-up",
    summary:
      "When a new lead arrives, summarise them, draft a reply, and wait for approval before anything is saved as sent.",
    trigger: "A new lead arrives",
    estimate: COSTS.followUp,
    maxMode: "approve" as WorkMode,
    steps: [
      "Summarise the lead",
      "Draft a reply",
      "Ask for approval",
      "Save the reply on the contact",
      "Update the contact",
    ],
  },
  {
    id: "content",
    name: "Content publishing",
    summary: "Turn a topic into a draft, then wait for you before it is marked ready.",
    trigger: "You add a topic to the queue",
    estimate: COSTS.draftPost,
    maxMode: "approve" as WorkMode,
    steps: ["Take the topic", "Draft the post", "Ask for approval", "Mark it ready"],
  },
  {
    id: "website",
    name: "Website update",
    summary: "A page change is previewed and published only after you approve it.",
    trigger: "You ask to publish a page",
    estimate: COSTS.publish,
    maxMode: "approve" as WorkMode,
    steps: ["Read the change", "Show the preview", "Ask for approval", "Publish"],
  },
] as const;

export const CONCEPT_ONLY = "Just the concept.";

const NAME_STOP = new Set([
  "a", "an", "the", "for", "and", "with", "that", "this", "from", "into", "your", "their",
  "who", "to", "of", "on", "in", "is", "it", "my", "our", "we", "i", "want", "wants", "need",
  "needs", "just", "like", "some", "people", "sell", "selling", "start", "build", "make",
  "create", "launch", "help", "helps", "would", "could", "should", "about", "when", "where",
  "what", "how", "can", "will", "are", "was", "be", "as", "or", "but", "not", "get", "got",
  "have", "has", "had", "also", "very", "really", "something", "idea", "ideas",
]);

export function workingName(concept: string): string {
  const called = concept.match(/\b(?:called|named)\s+["“']?([A-Za-z0-9][\w&'’-]*[A-Za-z0-9])/);
  if (called?.[1] && called[1].trim().length >= 2) return called[1].trim().slice(0, 80);
  const beforeFor = concept.split(/\bfor\b/i)[0] ?? concept;
  const words = beforeFor
    .replace(/[^a-zA-Z0-9&'’-]+/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^['’-]+|['’-]+$/g, ""))
    .filter((word) => word.length > 1 && !NAME_STOP.has(word.toLowerCase()));
  const picked = words.slice(0, 3);
  if (picked.length === 0) return "New idea";
  return picked
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .slice(0, 80);
}

export function answersFromConcept(raw: string, name?: string): SetupAnswers {
  const concept = raw.replace(/\s+/g, " ").trim().slice(0, 500);
  const sentences = concept
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 1);
  const first = sentences[0] ?? concept;
  const rest = sentences.slice(1).join(" ").trim();
  const forMatch = concept.match(/\bfor\s+([^.]{3,80})/i);
  const audienceRaw = forMatch
    ? forMatch[1].replace(/[,;].*$/, "").trim()
    : "People who want this";
  const audience = (audienceRaw.charAt(0).toUpperCase() + audienceRaw.slice(1)).slice(0, 500);
  const given = name?.trim() ?? "";
  const businessName = (given.length >= 2 ? given : workingName(concept)).slice(0, 80);
  const goal = (first.length >= 2 ? first : "Turn this concept into a business.").slice(0, 500);
  return {
    path: "new",
    businessName: businessName.length >= 2 ? businessName : "New idea",
    goal,
    sell: goal,
    audience: audience.length >= 2 ? audience : "People who want this",
    useful: rest.length >= 2 ? rest.slice(0, 500) : "A first version of the idea, clear enough to show someone.",
    findBuy: "Not chosen yet.",
    have: CONCEPT_ONLY,
    autonomy: "collaborate",
    imports: [],
  };
}

export function exampleAnswers(): SetupAnswers {
  return {
    path: "new",
    businessName: "Harbor & Rye",
    goal: "Launch a coffee subscription people keep past the first month.",
    sell: "A monthly delivery of small-batch coffee, with a short brew note for each bag.",
    audience: "People working from home, and office managers who buy for a small team.",
    useful: "Fresh beans arrive on a set day, without a confusing order page.",
    findBuy: "Word of mouth and Instagram. There is no website yet.",
    have: "A name, a roaster, and photos of three blends.",
    autonomy: "collaborate",
    imports: [],
  };
}

export function emptyDraft(path?: PathId): SetupDraft {
  return { step: 0, answers: path ? { path, imports: [] } : { imports: [] } };
}

export function remaining(balance: { included: number; topup: number; used: number }): number {
  return Math.max(0, balance.included + balance.topup - balance.used);
}

export function canAfford(
  balance: { included: number; topup: number; used: number },
  units: number,
): boolean {
  return remaining(balance) >= units;
}

export function canAddBusiness(plan: PlanId, count: number): boolean {
  if (plan === "scale") return count < 3;
  return count < 1;
}

export function readinessOf(modules: BusinessProfile["modules"]): number {
  const values = MODULES.map((m) => modules[m.key].percent);
  return Math.round(values.reduce((sum, n) => sum + n, 0) / values.length);
}

export function statusSentence(input: {
  readiness: number;
  waiting: number;
  running: number;
}): string {
  const need =
    input.waiting === 0
      ? "Nothing is waiting on you."
      : input.waiting === 1
        ? "One thing needs you."
        : `${input.waiting} things need you.`;
  const run =
    input.running === 0
      ? "Nothing else is running yet."
      : input.running === 1
        ? "One workflow is running."
        : `${input.running} workflows are running.`;
  return `Your business is ${input.readiness}% ready. ${need} ${run}`;
}

export function greeting(date: Date, name: string): string {
  const hour = date.getHours();
  const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return `${hello}, ${name}`;
}

export function statusLabel(status: ModuleStatus): string {
  switch (status) {
    case "not_started":
      return "Not started";
    case "needs_setup":
      return "Needs setup";
    case "ready":
      return "Ready";
    case "running":
      return "Running";
    case "needs_attention":
      return "Needs you";
    case "complete":
      return "Complete";
  }
}

export function clampPolicies(input: Policies): Policies {
  const publish = input.websitePublish === "auto" ? "approve" : input.websitePublish;
  const email = input.customerEmail === "auto" ? "approve" : input.customerEmail;
  const ads = input.adSpend === "auto" ? "approve" : input.adSpend;
  return {
    websiteCopy: input.websiteCopy,
    websitePublish: publish === "manual" ? "manual" : publish === "suggest" ? "suggest" : "approve",
    customerEmail: email === "manual" ? "manual" : email === "suggest" ? "suggest" : "approve",
    adSpend: ads === "manual" ? "manual" : ads === "suggest" ? "suggest" : "approve",
    refund: "manual",
    bank: "manual",
    irreversible: "manual",
  };
}

export function clampWorkflowMode(templateId: string, mode: WorkMode): WorkMode {
  const template = WORKFLOW_TEMPLATES.find((item) => item.id === templateId);
  if (!template) return "approve";
  if (mode === "manual") return "suggest";
  const rank: Record<WorkMode, number> = { manual: 0, suggest: 1, approve: 2, auto: 3 };
  if (rank[mode] > rank[template.maxMode]) return template.maxMode;
  return mode;
}

export function defaultPolicies(): Policies {
  return clampPolicies({
    websiteCopy: "auto",
    websitePublish: "approve",
    customerEmail: "approve",
    adSpend: "approve",
    refund: "manual",
    bank: "manual",
    irreversible: "manual",
  });
}

function packagesFor(path: PathId): BusinessProfile["offer"]["packages"] {
  if (path === "digital") {
    return [
      { id: "p1", name: "Preview", price: "A$0", includes: "A first look at the page or tool." },
      { id: "p2", name: "Launch", price: "A$490", includes: "The working version, with one round of changes." },
      { id: "p3", name: "Care", price: "A$90 / month", includes: "Small updates and a monthly check." },
    ];
  }
  return [
    { id: "p1", name: "Starter", price: "A$29", includes: "The essential version of the offer." },
    { id: "p2", name: "Core", price: "A$59", includes: "The version most people should buy." },
    { id: "p3", name: "Plus", price: "A$99", includes: "More access, or a team-sized option." },
  ];
}

export function localSuggestion(step: number, answers: Partial<SetupAnswers>): string | null {
  if (step === 3 && answers.audience && answers.sell) {
    return `It gives ${answers.audience.toLowerCase()} a simpler way to get ${answers.sell.charAt(0).toLowerCase()}${answers.sell.slice(1)}`;
  }
  if (step === 1 && answers.goal) {
    return answers.goal;
  }
  return null;
}

export type BuiltBusiness = {
  profile: BusinessProfile;
  readiness: number;
  page: {
    title: string;
    slugBase: string;
    direction: Direction;
    sections: Section[];
    meta: PageRecord["meta"];
  };
  approvals: {
    title: string;
    summary: string;
    why: string;
    risk: string;
    estimate: number;
    kind: string;
    payload: Record<string, unknown>;
  }[];
  tasks: { title: string; detail: string }[];
  integrations: { name: string }[];
};

export function slugify(value: string): string {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return base || "business";
}

export function buildInitial(answers: SetupAnswers): BuiltBusiness {
  const fromConcept = answers.have === CONCEPT_ONLY;
  const packages = packagesFor(answers.path);
  const offerSummary = fromConcept
    ? answers.goal
    : `${answers.businessName} helps ${answers.audience.charAt(0).toLowerCase()}${answers.audience.slice(1)} ${answers.goal.charAt(0).toLowerCase()}${answers.goal.slice(1)}`;
  const positioning = answers.useful;
  const modules: BusinessProfile["modules"] = {
    offer: {
      status: "needs_attention",
      percent: fromConcept ? 40 : 70,
      next: fromConcept ? "Say what you actually sell" : "Approve the offer summary",
      owner: "You",
      automation: "suggest",
    },
    audience: {
      status: fromConcept ? "needs_setup" : "ready",
      percent: fromConcept ? 20 : 80,
      next: fromConcept ? "Name who it is for" : "Check the customer profile",
      owner: "You",
      automation: "off",
    },
    brand: {
      status: "needs_attention",
      percent: fromConcept ? 35 : 45,
      next: fromConcept ? "Confirm the working name" : "Confirm the name and tone",
      owner: "You",
      automation: "off",
    },
    product: {
      status: "needs_setup",
      percent: fromConcept ? 25 : 30,
      next: "Review the launch page",
      owner: "You",
      automation: "off",
    },
    marketing: {
      status: "not_started",
      percent: 10,
      next: fromConcept ? "Pick one way people will hear about it" : "Create the first campaign",
      owner: "You",
      automation: "off",
    },
    operations: {
      status: "needs_setup",
      percent: fromConcept ? 15 : 20,
      next: fromConcept ? "Decide what you will approve" : "Choose what can run on its own",
      owner: "You",
      automation: "off",
    },
  };
  const profile: BusinessProfile = {
    welcomed: false,
    goal: answers.goal,
    sell: answers.sell,
    useful: answers.useful,
    findBuy: answers.findBuy,
    have: answers.have,
    imports: answers.imports,
    offer: {
      summary: offerSummary,
      positioning,
      guarantee: "If the first version is not what we described, we fix it before you pay the next invoice.",
      messaging: `${answers.businessName}. ${answers.useful}`,
      packages,
    },
    audienceProfile: {
      summary: answers.audience,
      segments: [
        {
          id: "seg-1",
          name: "Primary customer",
          needs: answers.useful,
          objections: "They may not trust a new offer until they can see it clearly.",
          sources: answers.findBuy,
        },
      ],
    },
    brand: {
      positioning,
      tone: "Clear, warm, and specific. No hype.",
      messaging: answers.useful,
      rules: "Use plain words. Say what happens next. Do not invent reviews or results.",
      direction: "paper",
    },
    memory: [
      { id: "mem-name", label: "Business name", value: answers.businessName },
      { id: "mem-goal", label: "Goal", value: answers.goal },
      { id: "mem-offer", label: "Offer", value: answers.sell },
      { id: "mem-audience", label: "Audience", value: answers.audience },
      { id: "mem-voice", label: "Voice", value: "Clear, warm, and specific." },
      { id: "mem-have", label: "Already in place", value: answers.have },
      { id: "mem-find", label: "How people buy today", value: answers.findBuy },
    ],
    modules,
    opportunities: [
      {
        id: "opp-page",
        title: "Publish a launch page",
        detail: "People can only buy what they can find. The draft page is ready to review.",
        href: "/app/website",
      },
      {
        id: "opp-follow",
        title: "Prepare lead follow-up",
        detail: "Decide what happens when someone asks about the offer, before the first enquiry arrives.",
        href: "/app/automations",
      },
      {
        id: "opp-channel",
        title: "Pick one acquisition channel",
        detail: answers.findBuy,
        href: "/app/campaigns",
      },
    ],
    policies: defaultPolicies(),
    pendingInvites: [],
  };
  const readiness = readinessOf(modules);
  const sections: Section[] = [
    {
      id: "hero",
      kind: "hero",
      heading: answers.businessName,
      body: answers.useful,
      items: [],
    },
    {
      id: "offer",
      kind: "offer",
      heading: "The offer",
      body: `${answers.sell} ${packages.map((item) => `${item.name} · ${item.price}`).join(". ")}.`,
      items: [],
    },
    {
      id: "proof",
      kind: "proof",
      heading: "Who it is for",
      body: answers.audience,
      items: [],
    },
    {
      id: "faq",
      kind: "faq",
      heading: "Questions",
      body: "",
      items: [
        {
          q: "How do I start?",
          a: "Leave your details. You will get a reply with the next step. Nothing is charged from this form.",
        },
        {
          q: "What does it cost?",
          a: packages.map((item) => `${item.name} is ${item.price}. ${item.includes}`).join(" "),
        },
      ],
    },
    {
      id: "capture",
      kind: "capture",
      heading: "Ask for the next step",
      body: "Leave your name and email. The note stays with this business.",
      items: [],
    },
  ];
  return {
    profile,
    readiness,
    page: {
      title: `${answers.businessName} launch page`,
      slugBase: slugify(answers.businessName),
      direction: "paper",
      sections,
      meta: { tool: null, packages },
    },
    approvals: [
      {
        title: "Approve your offer",
        summary: offerSummary,
        why: "The rest of the business map uses this description. Confirm it before anything customer-facing is published.",
        risk: "Low. Nothing is published or sent.",
        estimate: 0,
        kind: "offer",
        payload: { type: "offer" },
      },
      {
        title: "Confirm brand basics",
        summary: `${answers.businessName} · ${profile.brand.tone}`,
        why: "Pages and drafts will reuse this name and tone.",
        risk: "Low. You can edit it later.",
        estimate: 0,
        kind: "brand",
        payload: { type: "brand" },
      },
    ],
    tasks: fromConcept
      ? [
          {
            title: "Name who this is for",
            detail: "The idea is in. The next useful detail is the person it is for.",
          },
          {
            title: "Review the launch page",
            detail: "A first draft is ready from the concept. The words are a starting point, not a promise.",
          },
        ]
      : [
          {
            title: "Review the launch page",
            detail: "The first draft is ready. Check the words, then ask to publish when it is right.",
          },
        ],
    integrations: [
      { name: "Email" },
      { name: "Payments" },
      { name: "Analytics" },
      { name: "Social" },
      { name: "Domain" },
    ],
  };
}

export function applyCopyPatch(
  profile: BusinessProfile,
  patch: {
    offerSummary?: string;
    positioning?: string;
    guarantee?: string;
    messaging?: string;
    tone?: string;
    opportunities?: { title: string; detail: string }[];
  },
): BusinessProfile {
  const next: BusinessProfile = {
    ...profile,
    offer: { ...profile.offer },
    brand: { ...profile.brand },
    opportunities: profile.opportunities.map((item) => ({ ...item })),
  };
  if (patch.offerSummary?.trim()) next.offer.summary = patch.offerSummary.trim().slice(0, 500);
  if (patch.positioning?.trim()) next.offer.positioning = patch.positioning.trim().slice(0, 400);
  if (patch.guarantee?.trim()) next.offer.guarantee = patch.guarantee.trim().slice(0, 400);
  if (patch.messaging?.trim()) {
    next.offer.messaging = patch.messaging.trim().slice(0, 400);
    next.brand.messaging = patch.messaging.trim().slice(0, 400);
  }
  if (patch.tone?.trim()) next.brand.tone = patch.tone.trim().slice(0, 240);
  if (patch.opportunities?.length) {
    next.opportunities = patch.opportunities.slice(0, 3).map((item, index) => ({
      id: next.opportunities[index]?.id ?? `opp-${index + 1}`,
      title: item.title.slice(0, 120),
      detail: item.detail.slice(0, 300),
      href: next.opportunities[index]?.href ?? "/app",
    }));
  }
  return next;
}

export function followUpDraft(input: {
  businessName: string;
  leadName: string;
  offer: string;
  note: string;
}): string {
  const detail = input.note.trim()
    ? ` You mentioned: ${input.note.trim()}`
    : "";
  return `Hi ${input.leadName.split(" ")[0]},\n\nThanks for getting in touch with ${input.businessName}.${detail}\n\n${input.offer}\n\nIf you want, reply with the best time for a short conversation.\n\n— ${input.businessName}`;
}

export function localBrief(input: {
  name: string;
  leads: number;
  published: number;
  running: number;
  waiting: number;
  remaining: number;
  next: string;
}): string {
  const leadLine =
    input.leads === 0
      ? "No leads are recorded yet."
      : input.leads === 1
        ? "1 lead is recorded."
        : `${input.leads} leads are recorded.`;
  const pageLine =
    input.published === 0 ? "No page is live yet." : `${input.published} page is live.`;
  return `${input.name}: ${leadLine} ${pageLine} ${input.running} workflow${input.running === 1 ? "" : "s"} running. ${input.waiting} waiting on you. ${input.remaining} executions left. Next: ${input.next}`;
}

export function money(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}A$${(abs / 100).toFixed(2)}`;
}

export type InboxItem = {
  id: string;
  title: string;
  detail: string;
  href: AppHref;
  at: string;
};

export function inboxItems(input: {
  approvals: { id: string; title: string; summary: string; status: string; createdAt: string }[];
  leads: { id: string; name: string; email: string; status: string; createdAt: string }[];
  conversations: { id: string; subject: string; body: string; status: string; createdAt: string }[];
}): InboxItem[] {
  const items: InboxItem[] = [];
  for (const approval of input.approvals) {
    if (approval.status !== "waiting") continue;
    items.push({
      id: `approval-${approval.id}`,
      title: approval.title,
      detail: approval.summary,
      href: "/app/approvals",
      at: approval.createdAt,
    });
  }
  for (const lead of input.leads) {
    if (lead.status !== "new") continue;
    items.push({
      id: `lead-${lead.id}`,
      title: `New lead · ${lead.name}`,
      detail: lead.email,
      href: "/app/leads",
      at: lead.createdAt,
    });
  }
  for (const conversation of input.conversations) {
    if (conversation.status !== "open") continue;
    items.push({
      id: `conversation-${conversation.id}`,
      title: conversation.subject,
      detail: conversation.body,
      href: "/app/inbox",
      at: conversation.createdAt,
    });
  }
  return items.sort((a, b) => (a.at < b.at ? 1 : -1));
}

export const CREW = [
  {
    role: "Business strategist",
    does: "Keeps the offer, audience and map coherent.",
    watches: "offer",
  },
  {
    role: "Brand strategist",
    does: "Holds the name, tone and messaging.",
    watches: "brand",
  },
  {
    role: "Product builder",
    does: "Drafts pages and simple tools.",
    watches: "product",
  },
  {
    role: "Marketing operator",
    does: "Prepares campaigns and content for your approval.",
    watches: "marketing",
  },
  {
    role: "Customer operator",
    does: "Drafts replies. Does not send them on its own.",
    watches: "operations",
  },
] as const;

export function parseProfile(value: unknown): BusinessProfile | null {
  const raw = typeof value === "string" ? safeJson(value) : value;
  const parsed = profileSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

function safeJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    const parsed = safeJson(value);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  }
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return {};
}

export function asPayload(value: unknown): ApprovalPayload {
  const record = asRecord(value);
  const text = (key: string) => (typeof record[key] === "string" ? String(record[key]) : "");
  return {
    type: text("type"),
    leadId: text("leadId"),
    pageId: text("pageId"),
    campaignId: text("campaignId"),
    contentId: text("contentId"),
    draft: text("draft"),
    direction: text("direction"),
    sections: asSections(record.sections),
  };
}

export function asSections(value: unknown): Section[] {
  const raw = typeof value === "string" ? safeJson(value) : value;
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item === "object" && "heading" in item)
    .map((item) => {
      const section = item as Section;
      return {
        id: String(section.id ?? ""),
        kind: section.kind,
        heading: String(section.heading ?? ""),
        body: String(section.body ?? ""),
        items: Array.isArray(section.items)
          ? section.items.map((entry) => ({ q: String(entry.q ?? ""), a: String(entry.a ?? "") }))
          : [],
      };
    });
}

export type Balance = { plan: PlanId; included: number; used: number; topup: number };

export type Workspace = {
  businesses: { id: string; name: string; role: Role; readiness: number; plan: PlanId }[];
  activeId: string | null;
  draft: SetupDraft | null;
  active: null | {
    id: string;
    name: string;
    slug: string;
    path: PathId;
    autonomy: AutonomyId;
    readiness: number;
    role: Role;
    profile: BusinessProfile;
    pages: PageRecord[];
    leads: {
      id: string;
      name: string;
      email: string;
      source: string;
      status: string;
      note: string;
      summary: string;
      createdAt: string;
    }[];
    workflows: {
      id: string;
      templateId: string;
      name: string;
      summary: string;
      trigger: string;
      mode: WorkMode;
      status: string;
      steps: string[];
      estimate: number;
    }[];
    approvals: {
      id: string;
      title: string;
      summary: string;
      why: string;
      risk: string;
      estimate: number;
      externalCost: string;
      status: string;
      kind: string;
      payload: ApprovalPayload;
      createdAt: string;
    }[];
    activity: { id: string; message: string; detail: string; createdAt: string }[];
    campaigns: {
      id: string;
      name: string;
      goal: string;
      audience: string;
      offer: string;
      channels: string;
      budget: string;
      status: string;
      createdAt: string;
    }[];
    content: {
      id: string;
      title: string;
      body: string;
      channel: string;
      status: string;
      createdAt: string;
    }[];
    tasks: { id: string; title: string; detail: string; status: string; createdAt: string }[];
    payments: { id: string; label: string; amountCents: number; status: string; createdAt: string }[];
    integrations: { id: string; name: string; status: string; note: string }[];
    experiments: { id: string; hypothesis: string; status: string; result: string; createdAt: string }[];
    briefs: { id: string; body: string; createdAt: string }[];
    conversations: {
      id: string;
      subject: string;
      body: string;
      status: string;
      createdAt: string;
    }[];
    balance: Balance;
    executions: { id: string; label: string; units: number; status: string; createdAt: string }[];
  };
};

export type MutationResult =
  | { ok: true; workspace: Workspace; note?: string }
  | { ok: false; message: string };
