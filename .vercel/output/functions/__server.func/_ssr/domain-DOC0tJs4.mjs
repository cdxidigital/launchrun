import { A as boolean, D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/domain-DOC0tJs4.js
var PATHS = [
	{
		id: "new",
		title: "Start something new",
		body: "I have an idea and want to turn it into a business."
	},
	{
		id: "improve",
		title: "Improve a business",
		body: "I already have a business and want to make it run better."
	},
	{
		id: "digital",
		title: "Build a digital product",
		body: "I want to create a website, app, portal or digital service."
	}
];
var AUTONOMY = [
	{
		id: "guide",
		title: "Guide me",
		body: "Recommend the next step. I will do the work."
	},
	{
		id: "collaborate",
		title: "Work with me",
		body: "Draft the work. I approve before anything goes out."
	},
	{
		id: "routine",
		title: "Handle the routine",
		body: "Run the repetitive work I have already approved. I keep the decisions."
	}
];
var PLANS = {
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
			"No card required"
		]
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
			"Weekly business brief"
		]
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
			"Approval rules"
		]
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
			"Richer reports"
		]
	}
};
var TOPUPS = [
	{
		units: 100,
		price: 15
	},
	{
		units: 500,
		price: 55
	},
	{
		units: 1500,
		price: 145
	}
];
var SERVICES = [
	{
		id: "launch-assist",
		name: "Launch Assist",
		price: "A$299",
		detail: "A guided week to sharpen the offer and publish the first page."
	},
	{
		id: "brand-pack",
		name: "Brand Pack",
		price: "A$495",
		detail: "Name, tone, messaging and visual rules, ready to reuse."
	},
	{
		id: "custom-build",
		name: "Custom Build",
		price: "From A$995",
		detail: "A specific page, tool or workflow built with you."
	},
	{
		id: "migration",
		name: "Migration",
		price: "From A$395",
		detail: "Bring an existing site, list or offer across."
	}
];
var COSTS = {
	map: 5,
	publish: 4,
	followUp: 5,
	rewriteOffer: 1,
	rewritePage: 5,
	draftPost: 1,
	campaign: 10,
	brief: 1
};
var MODULES = [
	{
		key: "offer",
		label: "Offer",
		about: "What you sell, the price and the promise."
	},
	{
		key: "audience",
		label: "Audience",
		about: "Who it is for, and why they care."
	},
	{
		key: "brand",
		label: "Brand",
		about: "Name, tone and the words you repeat."
	},
	{
		key: "product",
		label: "Product",
		about: "The page or tool customers actually use."
	},
	{
		key: "marketing",
		label: "Marketing",
		about: "How people hear about you."
	},
	{
		key: "operations",
		label: "Operations",
		about: "The work that keeps the business moving."
	}
];
var ROLE_RANK = {
	viewer: 0,
	operator: 1,
	admin: 2,
	owner: 3
};
function roleAllows(role, min) {
	return ROLE_RANK[role] >= ROLE_RANK[min];
}
var answersSchema = object({
	path: _enum([
		"new",
		"improve",
		"digital"
	]),
	businessName: string().min(2).max(80),
	goal: string().min(2).max(500),
	sell: string().min(2).max(500),
	audience: string().min(2).max(500),
	useful: string().min(2).max(500),
	findBuy: string().min(2).max(500),
	have: string().min(2).max(500),
	autonomy: _enum([
		"guide",
		"collaborate",
		"routine"
	]),
	imports: array(object({
		kind: _enum([
			"website",
			"domain",
			"documents",
			"social",
			"customers",
			"brand",
			"product",
			"knowledge"
		]),
		value: string().max(400)
	})).max(8)
});
var draftSchema = object({
	step: number().int().min(0).max(8),
	answers: answersSchema.partial()
});
var packageSchema = object({
	id: string(),
	name: string(),
	price: string(),
	includes: string()
});
var moduleSchema = object({
	status: _enum([
		"not_started",
		"needs_setup",
		"ready",
		"running",
		"needs_attention",
		"complete"
	]),
	percent: number().int().min(0).max(100),
	next: string(),
	owner: string(),
	automation: _enum([
		"off",
		"suggest",
		"approve",
		"auto"
	])
});
var policiesSchema = object({
	websiteCopy: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	websitePublish: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	customerEmail: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	adSpend: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	refund: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	bank: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	]),
	irreversible: _enum([
		"suggest",
		"approve",
		"auto",
		"manual"
	])
});
var profileSchema = object({
	welcomed: boolean().default(false),
	goal: string(),
	sell: string(),
	useful: string(),
	findBuy: string(),
	have: string(),
	imports: answersSchema.shape.imports,
	offer: object({
		summary: string(),
		positioning: string(),
		guarantee: string(),
		messaging: string(),
		packages: array(packageSchema)
	}),
	audienceProfile: object({
		summary: string(),
		segments: array(object({
			id: string(),
			name: string(),
			needs: string(),
			objections: string(),
			sources: string()
		}))
	}),
	brand: object({
		positioning: string(),
		tone: string(),
		messaging: string(),
		rules: string(),
		direction: _enum([
			"paper",
			"night",
			"signal"
		])
	}),
	memory: array(object({
		id: string(),
		label: string(),
		value: string()
	})),
	modules: object({
		offer: moduleSchema,
		audience: moduleSchema,
		brand: moduleSchema,
		product: moduleSchema,
		marketing: moduleSchema,
		operations: moduleSchema
	}),
	opportunities: array(object({
		id: string(),
		title: string(),
		detail: string(),
		href: _enum([
			"/app",
			"/app/approvals",
			"/app/leads",
			"/app/inbox",
			"/app/website",
			"/app/automations",
			"/app/campaigns",
			"/app/offer",
			"/app/audience",
			"/app/brand"
		])
	})),
	policies: policiesSchema,
	pendingInvites: array(object({
		email: string(),
		role: _enum([
			"admin",
			"operator",
			"viewer"
		])
	})).default([])
});
var IMPORT_KINDS = [
	{
		kind: "website",
		label: "Website"
	},
	{
		kind: "domain",
		label: "Domain"
	},
	{
		kind: "documents",
		label: "Documents"
	},
	{
		kind: "social",
		label: "Social profiles"
	},
	{
		kind: "customers",
		label: "Customer list"
	},
	{
		kind: "brand",
		label: "Brand assets"
	},
	{
		kind: "product",
		label: "Product notes"
	},
	{
		kind: "knowledge",
		label: "Knowledge"
	}
];
var WORKFLOW_TEMPLATES = [
	{
		id: "lead-follow-up",
		name: "Lead follow-up",
		summary: "When a new lead arrives, summarise them, draft a reply, and wait for approval before anything is saved as sent.",
		trigger: "A new lead arrives",
		estimate: COSTS.followUp,
		maxMode: "approve",
		steps: [
			"Summarise the lead",
			"Draft a reply",
			"Ask for approval",
			"Save the reply on the contact",
			"Update the contact"
		]
	},
	{
		id: "content",
		name: "Content publishing",
		summary: "Turn a topic into a draft, then wait for you before it is marked ready.",
		trigger: "You add a topic to the queue",
		estimate: COSTS.draftPost,
		maxMode: "approve",
		steps: [
			"Take the topic",
			"Draft the post",
			"Ask for approval",
			"Mark it ready"
		]
	},
	{
		id: "website",
		name: "Website update",
		summary: "A page change is previewed and published only after you approve it.",
		trigger: "You ask to publish a page",
		estimate: COSTS.publish,
		maxMode: "approve",
		steps: [
			"Read the change",
			"Show the preview",
			"Ask for approval",
			"Publish"
		]
	}
];
var CONCEPT_ONLY = "Just the concept.";
var NAME_STOP = /* @__PURE__ */ new Set([
	"a",
	"an",
	"the",
	"for",
	"and",
	"with",
	"that",
	"this",
	"from",
	"into",
	"your",
	"their",
	"who",
	"to",
	"of",
	"on",
	"in",
	"is",
	"it",
	"my",
	"our",
	"we",
	"i",
	"want",
	"wants",
	"need",
	"needs",
	"just",
	"like",
	"some",
	"people",
	"sell",
	"selling",
	"start",
	"build",
	"make",
	"create",
	"launch",
	"help",
	"helps",
	"would",
	"could",
	"should",
	"about",
	"when",
	"where",
	"what",
	"how",
	"can",
	"will",
	"are",
	"was",
	"be",
	"as",
	"or",
	"but",
	"not",
	"get",
	"got",
	"have",
	"has",
	"had",
	"also",
	"very",
	"really",
	"something",
	"idea",
	"ideas"
]);
function workingName(concept) {
	const called = concept.match(/\b(?:called|named)\s+["“']?([A-Za-z0-9][\w&'’-]*[A-Za-z0-9])/);
	if (called?.[1] && called[1].trim().length >= 2) return called[1].trim().slice(0, 80);
	const picked = (concept.split(/\bfor\b/i)[0] ?? concept).replace(/[^a-zA-Z0-9&'’-]+/g, " ").split(/\s+/).map((word) => word.replace(/^['’-]+|['’-]+$/g, "")).filter((word) => word.length > 1 && !NAME_STOP.has(word.toLowerCase())).slice(0, 3);
	if (picked.length === 0) return "New idea";
	return picked.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").slice(0, 80);
}
function answersFromConcept(raw, name) {
	const concept = raw.replace(/\s+/g, " ").trim().slice(0, 500);
	const sentences = concept.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter((item) => item.length > 1);
	const first = sentences[0] ?? concept;
	const rest = sentences.slice(1).join(" ").trim();
	const forMatch = concept.match(/\bfor\s+([^.]{3,80})/i);
	const audienceRaw = forMatch ? forMatch[1].replace(/[,;].*$/, "").trim() : "People who want this";
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
		imports: []
	};
}
function exampleAnswers() {
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
		imports: []
	};
}
function remaining(balance) {
	return Math.max(0, balance.included + balance.topup - balance.used);
}
function canAddBusiness(plan, count) {
	if (plan === "scale") return count < 3;
	return count < 1;
}
function readinessOf(modules) {
	const values = MODULES.map((m) => modules[m.key].percent);
	return Math.round(values.reduce((sum, n) => sum + n, 0) / values.length);
}
function statusSentence(input) {
	const need = input.waiting === 0 ? "Nothing is waiting on you." : input.waiting === 1 ? "One thing needs you." : `${input.waiting} things need you.`;
	const run = input.running === 0 ? "Nothing else is running yet." : input.running === 1 ? "One workflow is running." : `${input.running} workflows are running.`;
	return `Your business is ${input.readiness}% ready. ${need} ${run}`;
}
function greeting(date, name) {
	const hour = date.getHours();
	return `${hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"}, ${name}`;
}
function statusLabel(status) {
	switch (status) {
		case "not_started": return "Not started";
		case "needs_setup": return "Needs setup";
		case "ready": return "Ready";
		case "running": return "Running";
		case "needs_attention": return "Needs you";
		case "complete": return "Complete";
	}
}
function clampPolicies(input) {
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
		irreversible: "manual"
	};
}
function clampWorkflowMode(templateId, mode) {
	const template = WORKFLOW_TEMPLATES.find((item) => item.id === templateId);
	if (!template) return "approve";
	if (mode === "manual") return "suggest";
	const rank = {
		manual: 0,
		suggest: 1,
		approve: 2,
		auto: 3
	};
	if (rank[mode] > rank[template.maxMode]) return template.maxMode;
	return mode;
}
function defaultPolicies() {
	return clampPolicies({
		websiteCopy: "auto",
		websitePublish: "approve",
		customerEmail: "approve",
		adSpend: "approve",
		refund: "manual",
		bank: "manual",
		irreversible: "manual"
	});
}
function packagesFor(path) {
	if (path === "digital") return [
		{
			id: "p1",
			name: "Preview",
			price: "A$0",
			includes: "A first look at the page or tool."
		},
		{
			id: "p2",
			name: "Launch",
			price: "A$490",
			includes: "The working version, with one round of changes."
		},
		{
			id: "p3",
			name: "Care",
			price: "A$90 / month",
			includes: "Small updates and a monthly check."
		}
	];
	return [
		{
			id: "p1",
			name: "Starter",
			price: "A$29",
			includes: "The essential version of the offer."
		},
		{
			id: "p2",
			name: "Core",
			price: "A$59",
			includes: "The version most people should buy."
		},
		{
			id: "p3",
			name: "Plus",
			price: "A$99",
			includes: "More access, or a team-sized option."
		}
	];
}
function localSuggestion(step, answers) {
	if (step === 3 && answers.audience && answers.sell) return `It gives ${answers.audience.toLowerCase()} a simpler way to get ${answers.sell.charAt(0).toLowerCase()}${answers.sell.slice(1)}`;
	if (step === 1 && answers.goal) return answers.goal;
	return null;
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "business";
}
function buildInitial(answers) {
	const fromConcept = answers.have === CONCEPT_ONLY;
	const packages = packagesFor(answers.path);
	const offerSummary = fromConcept ? answers.goal : `${answers.businessName} helps ${answers.audience.charAt(0).toLowerCase()}${answers.audience.slice(1)} ${answers.goal.charAt(0).toLowerCase()}${answers.goal.slice(1)}`;
	const positioning = answers.useful;
	const modules = {
		offer: {
			status: "needs_attention",
			percent: fromConcept ? 40 : 70,
			next: fromConcept ? "Say what you actually sell" : "Approve the offer summary",
			owner: "You",
			automation: "suggest"
		},
		audience: {
			status: fromConcept ? "needs_setup" : "ready",
			percent: fromConcept ? 20 : 80,
			next: fromConcept ? "Name who it is for" : "Check the customer profile",
			owner: "You",
			automation: "off"
		},
		brand: {
			status: "needs_attention",
			percent: fromConcept ? 35 : 45,
			next: fromConcept ? "Confirm the working name" : "Confirm the name and tone",
			owner: "You",
			automation: "off"
		},
		product: {
			status: "needs_setup",
			percent: fromConcept ? 25 : 30,
			next: "Review the launch page",
			owner: "You",
			automation: "off"
		},
		marketing: {
			status: "not_started",
			percent: 10,
			next: fromConcept ? "Pick one way people will hear about it" : "Create the first campaign",
			owner: "You",
			automation: "off"
		},
		operations: {
			status: "needs_setup",
			percent: fromConcept ? 15 : 20,
			next: fromConcept ? "Decide what you will approve" : "Choose what can run on its own",
			owner: "You",
			automation: "off"
		}
	};
	const profile = {
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
			packages
		},
		audienceProfile: {
			summary: answers.audience,
			segments: [{
				id: "seg-1",
				name: "Primary customer",
				needs: answers.useful,
				objections: "They may not trust a new offer until they can see it clearly.",
				sources: answers.findBuy
			}]
		},
		brand: {
			positioning,
			tone: "Clear, warm, and specific. No hype.",
			messaging: answers.useful,
			rules: "Use plain words. Say what happens next. Do not invent reviews or results.",
			direction: "paper"
		},
		memory: [
			{
				id: "mem-name",
				label: "Business name",
				value: answers.businessName
			},
			{
				id: "mem-goal",
				label: "Goal",
				value: answers.goal
			},
			{
				id: "mem-offer",
				label: "Offer",
				value: answers.sell
			},
			{
				id: "mem-audience",
				label: "Audience",
				value: answers.audience
			},
			{
				id: "mem-voice",
				label: "Voice",
				value: "Clear, warm, and specific."
			},
			{
				id: "mem-have",
				label: "Already in place",
				value: answers.have
			},
			{
				id: "mem-find",
				label: "How people buy today",
				value: answers.findBuy
			}
		],
		modules,
		opportunities: [
			{
				id: "opp-page",
				title: "Publish a launch page",
				detail: "People can only buy what they can find. The draft page is ready to review.",
				href: "/app/website"
			},
			{
				id: "opp-follow",
				title: "Prepare lead follow-up",
				detail: "Decide what happens when someone asks about the offer, before the first enquiry arrives.",
				href: "/app/automations"
			},
			{
				id: "opp-channel",
				title: "Pick one acquisition channel",
				detail: answers.findBuy,
				href: "/app/campaigns"
			}
		],
		policies: defaultPolicies(),
		pendingInvites: []
	};
	const readiness = readinessOf(modules);
	const sections = [
		{
			id: "hero",
			kind: "hero",
			heading: answers.businessName,
			body: answers.useful,
			items: []
		},
		{
			id: "offer",
			kind: "offer",
			heading: "The offer",
			body: `${answers.sell} ${packages.map((item) => `${item.name} · ${item.price}`).join(". ")}.`,
			items: []
		},
		{
			id: "proof",
			kind: "proof",
			heading: "Who it is for",
			body: answers.audience,
			items: []
		},
		{
			id: "faq",
			kind: "faq",
			heading: "Questions",
			body: "",
			items: [{
				q: "How do I start?",
				a: "Leave your details. You will get a reply with the next step. Nothing is charged from this form."
			}, {
				q: "What does it cost?",
				a: packages.map((item) => `${item.name} is ${item.price}. ${item.includes}`).join(" ")
			}]
		},
		{
			id: "capture",
			kind: "capture",
			heading: "Ask for the next step",
			body: "Leave your name and email. The note stays with this business.",
			items: []
		}
	];
	return {
		profile,
		readiness,
		page: {
			title: `${answers.businessName} launch page`,
			slugBase: slugify(answers.businessName),
			direction: "paper",
			sections,
			meta: {
				tool: null,
				packages
			}
		},
		approvals: [{
			title: "Approve your offer",
			summary: offerSummary,
			why: "The rest of the business map uses this description. Confirm it before anything customer-facing is published.",
			risk: "Low. Nothing is published or sent.",
			estimate: 0,
			kind: "offer",
			payload: { type: "offer" }
		}, {
			title: "Confirm brand basics",
			summary: `${answers.businessName} · ${profile.brand.tone}`,
			why: "Pages and drafts will reuse this name and tone.",
			risk: "Low. You can edit it later.",
			estimate: 0,
			kind: "brand",
			payload: { type: "brand" }
		}],
		tasks: fromConcept ? [{
			title: "Name who this is for",
			detail: "The idea is in. The next useful detail is the person it is for."
		}, {
			title: "Review the launch page",
			detail: "A first draft is ready from the concept. The words are a starting point, not a promise."
		}] : [{
			title: "Review the launch page",
			detail: "The first draft is ready. Check the words, then ask to publish when it is right."
		}],
		integrations: [
			{ name: "Email" },
			{ name: "Payments" },
			{ name: "Analytics" },
			{ name: "Social" },
			{ name: "Domain" }
		]
	};
}
function applyCopyPatch(profile, patch) {
	const next = {
		...profile,
		offer: { ...profile.offer },
		brand: { ...profile.brand },
		opportunities: profile.opportunities.map((item) => ({ ...item }))
	};
	if (patch.offerSummary?.trim()) next.offer.summary = patch.offerSummary.trim().slice(0, 500);
	if (patch.positioning?.trim()) next.offer.positioning = patch.positioning.trim().slice(0, 400);
	if (patch.guarantee?.trim()) next.offer.guarantee = patch.guarantee.trim().slice(0, 400);
	if (patch.messaging?.trim()) {
		next.offer.messaging = patch.messaging.trim().slice(0, 400);
		next.brand.messaging = patch.messaging.trim().slice(0, 400);
	}
	if (patch.tone?.trim()) next.brand.tone = patch.tone.trim().slice(0, 240);
	if (patch.opportunities?.length) next.opportunities = patch.opportunities.slice(0, 3).map((item, index) => ({
		id: next.opportunities[index]?.id ?? `opp-${index + 1}`,
		title: item.title.slice(0, 120),
		detail: item.detail.slice(0, 300),
		href: next.opportunities[index]?.href ?? "/app"
	}));
	return next;
}
function followUpDraft(input) {
	const detail = input.note.trim() ? ` You mentioned: ${input.note.trim()}` : "";
	return `Hi ${input.leadName.split(" ")[0]},\n\nThanks for getting in touch with ${input.businessName}.${detail}\n\n${input.offer}\n\nIf you want, reply with the best time for a short conversation.\n\n— ${input.businessName}`;
}
function localBrief(input) {
	const leadLine = input.leads === 0 ? "No leads are recorded yet." : input.leads === 1 ? "1 lead is recorded." : `${input.leads} leads are recorded.`;
	const pageLine = input.published === 0 ? "No page is live yet." : `${input.published} page is live.`;
	return `${input.name}: ${leadLine} ${pageLine} ${input.running} workflow${input.running === 1 ? "" : "s"} running. ${input.waiting} waiting on you. ${input.remaining} executions left. Next: ${input.next}`;
}
function money(cents) {
	return `${cents < 0 ? "-" : ""}A$${(Math.abs(cents) / 100).toFixed(2)}`;
}
function inboxItems(input) {
	const items = [];
	for (const approval of input.approvals) {
		if (approval.status !== "waiting") continue;
		items.push({
			id: `approval-${approval.id}`,
			title: approval.title,
			detail: approval.summary,
			href: "/app/approvals",
			at: approval.createdAt
		});
	}
	for (const lead of input.leads) {
		if (lead.status !== "new") continue;
		items.push({
			id: `lead-${lead.id}`,
			title: `New lead · ${lead.name}`,
			detail: lead.email,
			href: "/app/leads",
			at: lead.createdAt
		});
	}
	for (const conversation of input.conversations) {
		if (conversation.status !== "open") continue;
		items.push({
			id: `conversation-${conversation.id}`,
			title: conversation.subject,
			detail: conversation.body,
			href: "/app/inbox",
			at: conversation.createdAt
		});
	}
	return items.sort((a, b) => a.at < b.at ? 1 : -1);
}
var CREW = [
	{
		role: "Business strategist",
		does: "Keeps the offer, audience and map coherent.",
		watches: "offer"
	},
	{
		role: "Brand strategist",
		does: "Holds the name, tone and messaging.",
		watches: "brand"
	},
	{
		role: "Product builder",
		does: "Drafts pages and simple tools.",
		watches: "product"
	},
	{
		role: "Marketing operator",
		does: "Prepares campaigns and content for your approval.",
		watches: "marketing"
	},
	{
		role: "Customer operator",
		does: "Drafts replies. Does not send them on its own.",
		watches: "operations"
	}
];
function parseProfile(value) {
	const raw = typeof value === "string" ? safeJson(value) : value;
	const parsed = profileSchema.safeParse(raw);
	return parsed.success ? parsed.data : null;
}
function safeJson(value) {
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
}
function asRecord(value) {
	if (typeof value === "string") {
		const parsed = safeJson(value);
		return parsed && typeof parsed === "object" ? parsed : {};
	}
	if (value && typeof value === "object") return value;
	return {};
}
function asPayload(value) {
	const record = asRecord(value);
	const text = (key) => typeof record[key] === "string" ? String(record[key]) : "";
	return {
		type: text("type"),
		leadId: text("leadId"),
		pageId: text("pageId"),
		campaignId: text("campaignId"),
		contentId: text("contentId"),
		draft: text("draft"),
		direction: text("direction"),
		sections: asSections(record.sections)
	};
}
function asSections(value) {
	const raw = typeof value === "string" ? safeJson(value) : value;
	if (!Array.isArray(raw)) return [];
	return raw.filter((item) => item && typeof item === "object" && "heading" in item).map((item) => {
		const section = item;
		return {
			id: String(section.id ?? ""),
			kind: section.kind,
			heading: String(section.heading ?? ""),
			body: String(section.body ?? ""),
			items: Array.isArray(section.items) ? section.items.map((entry) => ({
				q: String(entry.q ?? ""),
				a: String(entry.a ?? "")
			})) : []
		};
	});
}
//#endregion
export { policiesSchema as A, followUpDraft as C, localSuggestion as D, localBrief as E, statusSentence as F, workingName as I, roleAllows as M, slugify as N, money as O, statusLabel as P, exampleAnswers as S, inboxItems as T, buildInitial as _, MODULES as a, clampWorkflowMode as b, SERVICES as c, answersFromConcept as d, answersSchema as f, asSections as g, asRecord as h, IMPORT_KINDS as i, remaining as j, parseProfile as k, TOPUPS as l, asPayload as m, COSTS as n, PATHS as o, applyCopyPatch as p, CREW as r, PLANS as s, AUTONOMY as t, WORKFLOW_TEMPLATES as u, canAddBusiness as v, greeting as w, draftSchema as x, clampPolicies as y };
