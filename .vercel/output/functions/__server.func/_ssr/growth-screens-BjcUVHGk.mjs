import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as updateLead, r as addLead, u as draftContent, v as saveCampaign, w as setContentStatus } from "./router-Dd3uoXY6.mjs";
import { n as COSTS } from "./domain-DOC0tJs4.mjs";
import { a as Estimate, c as PageHeader, i as EmptyState, n as Button, o as Field, p as fieldClass, r as ConfirmDialog } from "./ui-BVcXVmeN.mjs";
import { n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/growth-screens-BjcUVHGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"qualified",
	"contacted",
	"won",
	"lost"
];
function GrowthHub() {
	const active = useActive();
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Growth",
		detail: "Leads, campaigns and content. One job at a time.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/campaigns",
			className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
			children: "Create a campaign"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Leads · ", active.leads.length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/leads",
					className: "text-signal",
					children: "Open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contacts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/crm",
					className: "text-signal",
					children: "Open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Campaigns · ", active.campaigns.length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/campaigns",
					className: "text-signal",
					children: "Open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Content queue · ", active.content.length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/content",
					className: "text-signal",
					children: "Open"
				})]
			})
		]
	})] });
}
function LeadsScreen() {
	const active = useActive();
	const add = useMutate(addLead);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Leads",
			detail: "People who have asked about the offer.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role),
				onClick: () => setOpen(true),
				children: "Add a lead"
			})
		}),
		active.leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No leads yet",
				body: "Publish the launch page, or add someone you already spoke to. Follow-up only starts if that workflow is on.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setOpen(true),
					children: "Add a lead"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line rounded-lg border border-line",
			children: active.leads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: lead.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							lead.email,
							" · ",
							lead.source,
							" · ",
							lead.status
						]
					}),
					lead.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: lead.note
					}) : null
				]
			}, lead.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open,
			onOpenChange: setOpen,
			title: "Add a lead",
			body: "This stores the person on this business. If lead follow-up is running, a reply will wait for your approval.",
			confirm: "Add lead",
			busy: add.isPending,
			onConfirm: () => add.mutate({
				businessId: active.id,
				name,
				email,
				source: "Manual",
				note
			}, { onSuccess: () => {
				setOpen(false);
				setName("");
				setEmail("");
				setNote("");
			} }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: name,
							onChange: (event) => setName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Note",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: fieldClass,
							rows: 3,
							value: note,
							onChange: (event) => setNote(event.target.value)
						})
					})
				]
			})
		})
	] });
}
function CrmScreen() {
	const active = useActive();
	const update = useMutate(updateLead);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Contacts",
		detail: "The same people as leads, grouped by where they are."
	}), active.leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No contacts yet",
			body: "Contacts appear when a lead arrives. You can move them as the conversation changes.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/leads",
				className: "text-sm font-semibold text-signal",
				children: "Go to leads"
			})
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 space-y-6",
		children: STATUSES.map((status) => {
			const rows = active.leads.filter((lead) => lead.status === status);
			if (!rows.length) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-semibold tracking-wide text-muted uppercase",
				children: status
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-line rounded-lg border border-line",
				children: rows.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: lead.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: lead.email
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 block min-h-11 rounded-md border border-line bg-ink px-2 text-sm text-fg",
							value: lead.status,
							disabled: !canEdit(active.role),
							onChange: (event) => update.mutate({
								businessId: active.id,
								leadId: lead.id,
								status: event.target.value
							}),
							children: STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})]
					})]
				}, lead.id))
			})] }, status);
		})
	})] });
}
var CAMPAIGN_STEPS = [
	"Goal",
	"Audience",
	"Offer",
	"Channels",
	"Budget",
	"Review"
];
function CampaignScreen() {
	const active = useActive();
	const save = useMutate(saveCampaign);
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		goal: "",
		audience: "",
		offer: "",
		channels: "Email",
		budget: "A$0"
	});
	const [ask, setAsk] = (0, import_react.useState)(false);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Create a campaign",
			detail: `Step ${step + 1} of ${CAMPAIGN_STEPS.length}: ${CAMPAIGN_STEPS[step]}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: form.name,
						onChange: (event) => setForm({
							...form,
							name: event.target.value
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Goal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: form.goal,
						onChange: (event) => setForm({
							...form,
							goal: event.target.value
						})
					})
				})] }) : null,
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Audience",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: form.audience,
						onChange: (event) => setForm({
							...form,
							audience: event.target.value
						})
					})
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Offer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: form.offer,
						onChange: (event) => setForm({
							...form,
							offer: event.target.value
						})
					})
				}) : null,
				step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Channel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: fieldClass,
						value: form.channels,
						onChange: (event) => setForm({
							...form,
							channels: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Social" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Launch page" })
						]
					})
				}) : null,
				step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Budget you are willing to consider",
					hint: "Nothing is spent. No ad account is connected.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: form.budget,
						onChange: (event) => setForm({
							...form,
							budget: event.target.value
						})
					})
				}) : null,
				step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Name. "
						}), form.name] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Goal. "
						}), form.goal] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Audience. "
						}), form.audience] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Offer. "
						}), form.offer] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Channel. "
						}), form.channels] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Budget noted. "
						}), form.budget] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.campaign })
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: step === 0,
				onClick: () => setStep((value) => value - 1),
				children: "Back"
			}), step < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: () => setStep((value) => value + 1),
				children: "Continue"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role),
				onClick: () => setAsk(true),
				children: "Ask to schedule"
			})]
		}),
		active.campaigns.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-line rounded-lg border border-line text-sm",
			children: active.campaigns.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-muted",
					children: [
						item.status,
						" · ",
						item.channels,
						" · ",
						item.budget
					]
				})]
			}, item.id))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask,
			onOpenChange: setAsk,
			title: "Schedule this campaign",
			body: "Approving saves the plan and uses 10 executions. No ad account is connected, so the budget is a note. Nothing is spent.",
			confirm: "Send for approval",
			busy: save.isPending,
			onConfirm: () => save.mutate({
				businessId: active.id,
				...form,
				schedule: true
			}, { onSuccess: () => setAsk(false) }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.campaign })
		})
	] });
}
function ContentScreen() {
	const active = useActive();
	const draft = useMutate(draftContent);
	const mark = useMutate(setContentStatus);
	const [topic, setTopic] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("Social");
	const [ask, setAsk] = (0, import_react.useState)(false);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Content queue",
			detail: "Drafts stay here until you approve them. Nothing is posted to a social account."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Topic",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: topic,
						onChange: (event) => setTopic(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Channel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: fieldClass,
						value: channel,
						onChange: (event) => setChannel(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Social" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Page" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: !canEdit(active.role),
					onClick: () => setAsk(true),
					children: "Draft a post"
				})
			]
		}),
		active.content.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No drafts yet",
				body: "Turn a topic into a draft, then decide if it is ready. It will not be published outside this workspace."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: active.content.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-line p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 whitespace-pre-wrap text-muted",
						children: item.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							item.channel,
							" · ",
							item.status
						]
					}),
					item.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "quiet",
						className: "mt-3",
						disabled: !canEdit(active.role),
						onClick: () => mark.mutate({
							businessId: active.id,
							contentId: item.id,
							ready: true
						}),
						children: "Ask to mark ready"
					}) : null
				]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask,
			onOpenChange: setAsk,
			title: "Draft a post",
			body: "If wording help is available, this uses 1 execution. If it is not, a plain draft is saved and nothing is used.",
			confirm: "Create draft",
			busy: draft.isPending,
			onConfirm: () => draft.mutate({
				businessId: active.id,
				topic,
				channel
			}, { onSuccess: () => {
				setAsk(false);
				setTopic("");
			} }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.draftPost })
		})
	] });
}
//#endregion
export { LeadsScreen as a, GrowthHub as i, ContentScreen as n, CrmScreen as r, CampaignScreen as t };
