import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as updateAutonomy, F as updatePolicies, O as switchBusiness, T as setPlan, _ as saveApprovalDraft, b as saveExperiment, c as decideApproval, f as improveCopy, g as requestService, i as addTopup, p as inviteMember, x as saveIntegrationNote } from "./router-Dd3uoXY6.mjs";
import { E as localBrief, O as money, c as SERVICES, j as remaining, l as TOPUPS, n as COSTS, r as CREW, s as PLANS, t as AUTONOMY, y as clampPolicies } from "./domain-DOC0tJs4.mjs";
import { a as Estimate, c as PageHeader, i as EmptyState, l as Panel, n as Button, o as Field, p as fieldClass, r as ConfirmDialog } from "./ui-BVcXVmeN.mjs";
import { i as useWorkspace, n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-screens-DGIZjpc-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApprovalsScreen() {
	const active = useActive();
	const decide = useMutate(decideApproval);
	const saveDraft = useMutate(saveApprovalDraft);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	if (!active) return null;
	const waiting = active.approvals.filter((item) => item.status === "waiting");
	const allowed = canEdit(active.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Approvals",
		detail: "What will happen, why, and what it costs. Then you decide."
	}), waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Nothing to approve",
			body: "When a page, reply or campaign is ready, it waits here. Rejected and finished items stay in activity."
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 space-y-4",
		children: waiting.map((item) => {
			const draft = drafts[item.id] ?? String(item.payload.draft ?? item.summary);
			const editable = item.kind === "followup";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: item.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.why
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: ["Risk: ", item.risk]
					}),
					editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: ["Reply", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: `${fieldClass} mt-1`,
							rows: 6,
							value: draft,
							onChange: (event) => setDrafts({
								...drafts,
								[item.id]: event.target.value
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, {
							units: item.estimate,
							cost: item.externalCost
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "quiet",
								disabled: !allowed || saveDraft.isPending,
								onClick: () => saveDraft.mutate({
									businessId: active.id,
									approvalId: item.id,
									draft
								}),
								children: "Save edit"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.kind === "publish" ? "/app/website" : item.kind === "offer" ? "/app/offer" : item.kind === "brand" ? "/app/brand" : "/app/campaigns",
								className: "inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold",
								children: "Edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: !allowed || decide.isPending,
								onClick: () => decide.mutate({
									businessId: active.id,
									approvalId: item.id,
									decision: "approve"
								}),
								children: "Approve"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "danger",
								disabled: !allowed || decide.isPending,
								onClick: () => decide.mutate({
									businessId: active.id,
									approvalId: item.id,
									decision: "reject"
								}),
								children: "Reject"
							})
						]
					})
				]
			}, item.id);
		})
	})] });
}
function ActivityScreen() {
	const active = useActive();
	const [open, setOpen] = (0, import_react.useState)(null);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Activity",
			detail: "What happened, in plain language."
		}),
		active.activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No activity yet",
				body: "Decisions and finished work will be listed here."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 space-y-4 border-l border-line pl-4",
			children: active.activity.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: item.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: item.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : ""
				}),
				item.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-1 text-sm text-signal",
					onClick: () => setOpen(open === item.id ? null : item.id),
					children: open === item.id ? "Hide details" : "View details"
				}) : null,
				open === item.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm text-muted",
					children: item.detail
				}) : null
			] }, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockLink, {})
	] });
}
function BlockLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/approvals",
			className: "text-signal",
			children: "Go to approvals"
		})
	});
}
function ReportsScreen() {
	const active = useActive();
	const write = useMutate(improveCopy);
	const save = useMutate(saveExperiment);
	const [hypothesis, setHypothesis] = (0, import_react.useState)("");
	const [ask, setAsk] = (0, import_react.useState)(false);
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
		next: active.profile.modules.product.next
	});
	const recorded = active.payments.reduce((sum, item) => sum + item.amountCents, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Reports",
			detail: "What changed, in sentences. Not a wall of charts.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role),
				onClick: () => setAsk(true),
				children: "Write weekly brief"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: active.briefs[0]?.body ?? brief
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4 grid grid-cols-2 gap-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Leads"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-xl font-semibold tabular-nums",
					children: active.leads.length
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Recorded payments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-xl font-semibold tabular-nums",
					children: money(recorded)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Live pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-xl font-semibold tabular-nums",
					children: published
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Executions used"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-xl font-semibold tabular-nums",
					children: active.balance.used
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Experiments"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-3 flex flex-col gap-2 sm:flex-row",
			onSubmit: (event) => {
				event.preventDefault();
				save.mutate({
					businessId: active.id,
					hypothesis
				}, { onSuccess: () => setHypothesis("") });
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: fieldClass,
				value: hypothesis,
				placeholder: "Test the pricing headline",
				onChange: (event) => setHypothesis(event.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: !canEdit(active.role),
				children: "Add"
			})]
		}),
		active.experiments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "No experiments yet. A useful one is a single change you can judge."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2 text-sm",
			children: active.experiments.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-line px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.hypothesis }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block text-xs text-muted",
					children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 block min-h-11 rounded-md border border-line bg-ink px-2 text-sm text-fg",
						value: item.status,
						onChange: (event) => save.mutate({
							businessId: active.id,
							id: item.id,
							hypothesis: item.hypothesis,
							status: event.target.value,
							result: item.result
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "planned",
								children: "Planned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "running",
								children: "Running"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "done",
								children: "Done"
							})
						]
					})]
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask,
			onOpenChange: setAsk,
			title: "Write the weekly brief",
			body: "Uses your current numbers. If wording help is unavailable, the factual brief above is kept and no execution is used.",
			confirm: "Write brief",
			busy: write.isPending,
			onConfirm: () => write.mutate({
				businessId: active.id,
				target: "brief"
			}, { onSuccess: () => setAsk(false) }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.brief })
		})
	] });
}
var POLICY_ROWS = [
	{
		key: "websiteCopy",
		label: "Website copy",
		help: "Drafting words can run once you allow it."
	},
	{
		key: "websitePublish",
		label: "Website publishing",
		help: "Going live always stops for you, or stays manual."
	},
	{
		key: "customerEmail",
		label: "Customer email",
		help: "Replies are prepared. They are not sent on their own."
	},
	{
		key: "adSpend",
		label: "Ad spend",
		help: "Plans can be saved. Money is never spent from here."
	},
	{
		key: "refund",
		label: "Refund",
		locked: true,
		help: "You do this. It cannot be automated."
	},
	{
		key: "bank",
		label: "Bank movement",
		locked: true,
		help: "You do this. It cannot be automated."
	},
	{
		key: "irreversible",
		label: "Irreversible action",
		locked: true,
		help: "You do this. It cannot be automated."
	}
];
function PermissionsScreen() {
	const active = useActive();
	const save = useMutate(updatePolicies);
	const [policies, setPolicies] = (0, import_react.useState)(null);
	if (!active) return null;
	const value = policies ?? active.profile.policies;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Permissions",
		detail: "What launch/run may prepare, and what only you can do.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			disabled: !canEdit(active.role, "admin") || save.isPending,
			onClick: () => save.mutate({
				businessId: active.id,
				policies: clampPolicies(value)
			}),
			children: "Save permissions"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line",
		children: POLICY_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid gap-2 px-4 py-4 sm:grid-cols-[1fr_10rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: row.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: row.help
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-xs text-muted",
				children: ["Mode", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mt-1 block min-h-11 w-full rounded-md border border-line bg-ink px-2 text-sm text-fg",
					disabled: row.locked || !canEdit(active.role, "admin"),
					value: row.locked ? "manual" : value[row.key],
					onChange: (event) => setPolicies({
						...value,
						[row.key]: event.target.value
					}),
					children: [
						!row.locked && row.key === "websiteCopy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "auto",
							children: "Auto"
						}) : null,
						!row.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "approve",
							children: "Approve"
						}) : null,
						!row.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "suggest",
							children: "Suggest"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "manual",
							children: "Manual"
						})
					]
				})]
			})]
		}, row.key))
	})] });
}
function BillingScreen() {
	const active = useActive();
	const plan = useMutate(setPlan);
	const topup = useMutate(addTopup);
	const service = useMutate(requestService);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [pack, setPack] = (0, import_react.useState)(null);
	if (!active) return null;
	const left = remaining(active.balance);
	const owner = canEdit(active.role, "owner");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Billing",
			detail: "Plans and top-ups are recorded here. Card billing is not connected, so nothing on this page charges a card."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Current plan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-semibold",
					children: PLANS[active.balance.plan].name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm tabular-nums",
					children: [
						active.balance.used,
						" used · ",
						left,
						" left · ",
						active.balance.included,
						" included · ",
						active.balance.topup,
						" from top-ups"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2",
			children: Object.keys(PLANS).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-lg border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: PLANS[id].name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm tabular-nums",
						children: [
							"A$",
							PLANS[id].price,
							" / month · ",
							PLANS[id].included,
							" executions"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: active.balance.plan === id ? "quiet" : "primary",
						className: "mt-3",
						disabled: !owner || active.balance.plan === id,
						onClick: () => setChoice(id),
						children: active.balance.plan === id ? "Current" : `Use ${PLANS[id].name}`
					})
				]
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Top-ups"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "You confirm each one. They are never bought in the background."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: TOPUPS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !owner,
				onClick: () => setPack(item.units),
				children: [
					"+",
					item.units,
					" · A$",
					item.price
				]
			}, item.units))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Optional services"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: SERVICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-line p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: [
							item.name,
							" · ",
							item.price
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: item.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "quiet",
						className: "mt-3",
						disabled: !owner,
						onClick: () => service.mutate({
							businessId: active.id,
							name: item.name
						}),
						children: "Record a request"
					})
				]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!choice,
			onOpenChange: (open) => {
				if (!open) setChoice(null);
			},
			title: choice ? `Use ${PLANS[choice].name}` : "Change plan",
			body: "This updates the allowance on the workspace. No card is charged. Allowances do not reset on their own in this version.",
			confirm: "Set plan",
			busy: plan.isPending,
			onConfirm: () => {
				if (choice) plan.mutate({
					businessId: active.id,
					plan: choice
				}, { onSuccess: () => setChoice(null) });
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: pack !== null,
			onOpenChange: (open) => {
				if (!open) setPack(null);
			},
			title: "Add executions",
			body: "You are confirming this top-up. The listed price is not collected, because card billing is not connected.",
			confirm: "Add executions",
			busy: topup.isPending,
			onConfirm: () => {
				if (pack) topup.mutate({
					businessId: active.id,
					units: pack
				}, { onSuccess: () => setPack(null) });
			}
		})
	] });
}
function SettingsScreen() {
	const query = useWorkspace();
	const active = query.data?.active;
	const autonomy = useMutate(updateAutonomy);
	const invite = useMutate(inviteMember);
	const note = useMutate(saveIntegrationNote);
	const swap = useMutate(switchBusiness);
	const [email, setEmail] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("operator");
	if (!active || !query.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Settings",
			detail: `${active.name} · you are the ${active.role}.`
		}),
		query.data.businesses.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-6 block text-sm",
			children: ["Open business", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: `${fieldClass} mt-1`,
				value: active.id,
				onChange: (event) => swap.mutate({ businessId: event.target.value }),
				children: query.data.businesses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: item.id,
					children: item.name
				}, item.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "How much help"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-2",
			children: AUTONOMY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: !canEdit(active.role, "admin"),
				"aria-pressed": active.autonomy === item.id,
				className: active.autonomy === item.id ? "block w-full rounded-lg border border-action p-3 text-left" : "block w-full rounded-lg border border-line p-3 text-left",
				onClick: () => autonomy.mutate({
					businessId: active.id,
					autonomy: item.id
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: item.body
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "People"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Invite someone who already has an account. Otherwise the email is saved until they sign up."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-3 space-y-3",
			onSubmit: (event) => {
				event.preventDefault();
				invite.mutate({
					businessId: active.id,
					email,
					role
				}, { onSuccess: () => setEmail("") });
			},
			children: [
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
					label: "Role",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: fieldClass,
						value: role,
						onChange: (event) => setRole(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "admin",
								children: "Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "operator",
								children: "Operator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "viewer",
								children: "Viewer"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !canEdit(active.role, "owner"),
					children: "Save invite"
				})
			]
		}),
		active.profile.pendingInvites.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 text-sm text-muted",
			children: active.profile.pendingInvites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				item.email,
				" · ",
				item.role,
				" · waiting for an account"
			] }, item.email))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Connections"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Nothing here is live-connected. A note is only a note."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: active.integrations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `${item.name} · ${item.status === "details_saved" ? "Note saved" : "Not connected"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					defaultValue: item.note,
					placeholder: "Paste a link or a reminder",
					onBlur: (event) => {
						if (event.target.value !== item.note) note.mutate({
							businessId: active.id,
							integrationId: item.id,
							note: event.target.value
						});
					}
				})
			}) }, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-8 space-y-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/billing",
					className: "text-signal",
					children: "Billing"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/permissions",
					className: "text-signal",
					children: "Permissions"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/activity",
					className: "text-signal",
					children: "Activity"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/crew",
					className: "text-signal",
					children: "AI crew"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/memory",
					className: "text-signal",
					children: "Business memory"
				}) })
			]
		})
	] });
}
function CrewScreen() {
	const active = useActive();
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "AI crew",
		detail: "A secondary view of responsibility. You still work with tasks and approvals, not a directory of bots."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line",
		children: CREW.map((member) => {
			const module = active.profile.modules[member.watches];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: member.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: member.does
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: ["Current work: ", module.next]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Permission follows the rules on the permissions page."
					})
				]
			}, member.role);
		})
	})] });
}
//#endregion
export { PermissionsScreen as a, CrewScreen as i, ApprovalsScreen as n, ReportsScreen as o, BillingScreen as r, SettingsScreen as s, ActivityScreen as t };
