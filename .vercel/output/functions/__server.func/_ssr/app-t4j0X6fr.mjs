import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as dismissWelcome } from "./router-Dd3uoXY6.mjs";
import { F as statusSentence, T as inboxItems, a as MODULES, j as remaining, w as greeting } from "./domain-DOC0tJs4.mjs";
import { c as PageHeader, i as EmptyState, l as Panel, n as Button, s as Meter, t as Block, u as StatusBadge } from "./ui-BVcXVmeN.mjs";
import { n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-t4j0X6fr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomeScreen() {
	const active = useActive();
	const dismiss = useMutate(dismissWelcome);
	if (!active) return null;
	const waiting = active.approvals.filter((item) => item.status === "waiting");
	const running = active.workflows.filter((item) => item.status === "running");
	const nextTask = active.tasks.filter((item) => item.status === "open")[0];
	const allowed = canEdit(active.role);
	const [hello, setHello] = (0, import_react.useState)(active.name);
	(0, import_react.useEffect)(() => {
		setHello(greeting(/* @__PURE__ */ new Date(), active.name));
	}, [active.name]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: hello,
			detail: statusSentence({
				readiness: active.readiness,
				waiting: waiting.length,
				running: running.length
			}),
			action: waiting.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/approvals",
				className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
				children: [
					"Review ",
					waiting.length,
					" ",
					waiting.length === 1 ? "item" : "items"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/website",
				className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
				children: "Review launch page"
			})
		}),
		!active.profile.welcomed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Your business map is ready"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: MODULES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: active.profile.modules[item.key].status })]
					}, item.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Recommended next step: review the launch page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: !allowed || dismiss.isPending,
						onClick: () => dismiss.mutate({ businessId: active.id }),
						children: "Start building"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/business",
						className: "inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold",
						children: "Review my business map"
					})]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
			title: "Today",
			children: nextTask ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-semibold",
					children: nextTask.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: nextTask.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/website",
					className: "mt-3 inline-flex text-sm text-signal",
					children: "Open it"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Nothing is queued for today",
				body: "When a task needs you, it will show up here as the one next action."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
			title: "Waiting on you",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/approvals",
				className: "text-sm text-signal",
				children: "Open all"
			}),
			children: waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Nothing is waiting",
				body: "Approvals show up here before anything customer-facing changes."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line rounded-lg border border-line",
				children: waiting.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-muted",
						children: item.summary
					})]
				}, item.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
			title: "Running",
			children: running.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Nothing is running",
				body: "Workflows stay off until you turn one on. Publishing and email still wait for you.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/automations",
					className: "text-sm font-semibold text-signal",
					children: "Review automations"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: running.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-line px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-muted",
						children: item.trigger
					})]
				}, item.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
			title: "Opportunities",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: active.profile.opportunities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-line px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: "mt-2 inline-flex text-sm text-signal",
							children: "Open"
						})
					]
				}, item.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
			title: "Results",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Readiness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1 text-xl font-semibold tabular-nums",
								children: [active.readiness, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: active.readiness })
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Leads"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-xl font-semibold tabular-nums",
							children: active.leads.length
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Live pages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-xl font-semibold tabular-nums",
							children: active.pages.filter((page) => page.status === "published").length
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Executions left"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-xl font-semibold tabular-nums",
							children: remaining(active.balance)
						})] })
					]
				}),
				active.activity[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Latest: ",
						active.activity[0].message,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whitespace-nowrap",
							children: formatDistanceToNow(new Date(active.activity[0].createdAt), { addSuffix: true })
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						"Inbox has ",
						inboxItems(active).length,
						" open ",
						inboxItems(active).length === 1 ? "item" : "items",
						"."
					]
				})
			]
		})
	] });
}
var SplitComponent = HomeScreen;
//#endregion
export { SplitComponent as component };
