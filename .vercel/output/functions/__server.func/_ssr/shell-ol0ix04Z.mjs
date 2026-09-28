import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useNavigate, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Search, c as Hammer, d as Building2, f as Bell, i as Settings, o as Menu, r as Sprout, s as House, t as Workflow, u as ChartLine } from "../_libs/lucide-react.mjs";
import { F as statusSentence, j as remaining, w as greeting } from "./domain-DOC0tJs4.mjs";
import { d as Wordmark, f as cn } from "./ui-BVcXVmeN.mjs";
import { i as useWorkspace } from "./workspace-aavTzbjY.mjs";
import { i as UserButton } from "./gates-DcqIjAwS.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-ol0ix04Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/app",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/app/business",
		label: "Business",
		icon: Building2
	},
	{
		to: "/app/build",
		label: "Build",
		icon: Hammer
	},
	{
		to: "/app/growth",
		label: "Growth",
		icon: Sprout
	},
	{
		to: "/app/operations",
		label: "Operations",
		icon: Workflow
	},
	{
		to: "/app/reports",
		label: "Reports",
		icon: ChartLine
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
var JUMPS = [
	{
		to: "/app",
		label: "Home"
	},
	{
		to: "/app/business",
		label: "Business map"
	},
	{
		to: "/app/offer",
		label: "Offer"
	},
	{
		to: "/app/audience",
		label: "Audience"
	},
	{
		to: "/app/brand",
		label: "Brand"
	},
	{
		to: "/app/memory",
		label: "Business memory"
	},
	{
		to: "/app/build",
		label: "Build"
	},
	{
		to: "/app/website",
		label: "Launch page"
	},
	{
		to: "/app/automations",
		label: "Automations"
	},
	{
		to: "/app/growth",
		label: "Growth"
	},
	{
		to: "/app/leads",
		label: "Leads"
	},
	{
		to: "/app/crm",
		label: "Contacts"
	},
	{
		to: "/app/campaigns",
		label: "Campaigns"
	},
	{
		to: "/app/content",
		label: "Content queue"
	},
	{
		to: "/app/operations",
		label: "Operations"
	},
	{
		to: "/app/inbox",
		label: "Inbox"
	},
	{
		to: "/app/payments",
		label: "Payments"
	},
	{
		to: "/app/tasks",
		label: "Tasks"
	},
	{
		to: "/app/reports",
		label: "Reports"
	},
	{
		to: "/app/activity",
		label: "Activity"
	},
	{
		to: "/app/approvals",
		label: "Approvals"
	},
	{
		to: "/app/settings",
		label: "Settings"
	},
	{
		to: "/app/billing",
		label: "Billing"
	},
	{
		to: "/app/permissions",
		label: "Permissions"
	},
	{
		to: "/app/crew",
		label: "AI crew"
	}
];
function usePath() {
	return useRouterState({ select: (state) => state.location.pathname });
}
function activeNav(path, to, exact) {
	if (exact) return path === to;
	if (to === "/app/business") return [
		"/app/business",
		"/app/offer",
		"/app/audience",
		"/app/brand",
		"/app/memory"
	].some((item) => path === item || path.startsWith(item));
	if (to === "/app/build") return [
		"/app/build",
		"/app/website",
		"/app/automations"
	].includes(path);
	if (to === "/app/growth") return [
		"/app/growth",
		"/app/leads",
		"/app/crm",
		"/app/campaigns",
		"/app/content"
	].includes(path);
	if (to === "/app/operations") return [
		"/app/operations",
		"/app/inbox",
		"/app/payments",
		"/app/tasks"
	].includes(path);
	if (to === "/app/settings") return [
		"/app/settings",
		"/app/billing",
		"/app/permissions",
		"/app/crew",
		"/app/activity"
	].includes(path);
	return path === to;
}
function Shell({ children }) {
	const path = usePath();
	const navigate = useNavigate();
	const active = useWorkspace().data?.active;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [hello, setHello] = (0, import_react.useState)("Welcome");
	(0, import_react.useEffect)(() => {
		if (active) setHello(greeting(/* @__PURE__ */ new Date(), active.name));
	}, [active]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const waiting = active?.approvals.filter((item) => item.status === "waiting").length ?? 0;
	const running = active?.workflows.filter((item) => item.status === "running").length ?? 0;
	const left = active ? remaining(active.balance) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-fg lg:grid lg:grid-cols-[15rem_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-panel focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen flex-col border-r border-line bg-panel lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							className: "text-base",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
						}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 truncate text-sm text-muted",
							title: active.name,
							children: active.name
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Primary",
						className: "flex flex-1 flex-col gap-1 px-2",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const on = activeNav(path, item.to, "exact" in item ? item.exact : false);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								"aria-current": on ? "page" : void 0,
								className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm", on ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									"aria-hidden": true
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-xs text-muted tabular-nums",
							children: [left, " executions left"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "account-slot",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex items-center gap-2 border-b border-line glass px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app",
								className: "lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden min-w-0 flex-1 truncate text-sm text-muted lg:block",
								suppressHydrationWarning: true,
								children: active ? statusSentence({
									readiness: active.readiness,
									waiting,
									running
								}) : hello
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg",
										"aria-label": "Search the workspace",
										onClick: () => setOpen(true),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											className: "size-4",
											"aria-hidden": true
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "relative inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg",
											"aria-label": waiting ? `${waiting} waiting on you` : "Notifications",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
												className: "size-4",
												"aria-hidden": true
											}), waiting > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute top-2 right-2 grid min-w-4 place-items-center rounded-full bg-danger px-1 text-xs text-on-danger",
												children: waiting
											}) : null]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
										align: "end",
										className: "z-40 w-80 rounded-lg border border-line bg-panel p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold",
												children: "Waiting on you"
											}),
											waiting === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: "Nothing needs a decision."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-2 space-y-2",
												children: active?.approvals.filter((item) => item.status === "waiting").slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													className: "text-sm",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/app/approvals",
														className: "hover:underline",
														children: item.title
													})
												}, item.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/app/activity",
												className: "mt-3 inline-block text-sm text-signal",
												children: "View activity"
											})
										]
									}) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised lg:hidden",
										"aria-label": "Open menu",
										"aria-expanded": menu,
										onClick: () => setMenu((value) => !value),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
											className: "size-4",
											"aria-hidden": true
										})
									})
								]
							})
						]
					}),
					menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "More",
						className: "border-b border-line bg-panel px-3 py-2 lg:hidden",
						children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setMenu(false),
							className: "flex min-h-11 items-center rounded-md px-2 text-sm",
							children: item.label
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "account-slot px-2 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						id: "main",
						className: "mx-auto w-full max-w-3xl px-4 pt-6 pb-28 lg:pb-12",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Mobile",
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-panel lg:hidden",
				children: NAV.slice(0, 5).map((item) => {
					const Icon = item.icon;
					const on = activeNav(path, item.to, "exact" in item ? item.exact : false);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						"aria-current": on ? "page" : void 0,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs", on ? "text-action" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							"aria-hidden": true
						}), item.label === "Operations" ? "Ops" : item.label]
					}, item.to);
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Dialog, {
				open,
				onOpenChange: setOpen,
				label: "Jump to",
				className: "fixed top-[15%] left-1/2 z-50 w-[min(100%-2rem,32rem)] -translate-x-1/2 rounded-lg border border-line bg-panel p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					placeholder: "Jump to…",
					className: "w-full border-b border-line bg-transparent px-3 py-3 text-base outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-80 overflow-auto py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-4 text-sm text-muted",
						children: "No matching place."
					}), JUMPS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
						value: item.label,
						onSelect: () => {
							setOpen(false);
							navigate({ to: item.to });
						},
						className: "cursor-pointer rounded-md px-3 py-3 text-sm aria-selected:bg-raised",
						children: item.label
					}, item.to))]
				})]
			}) : null,
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close search",
				className: "fixed inset-0 z-40 bg-ink/70",
				onClick: () => setOpen(false)
			}) : null
		]
	});
}
function LoadingScreen({ label = "Loading your business" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-ink px-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-1 overflow-hidden rounded-full bg-raised",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/3 animate-pulse rounded-full bg-action" })
				})
			]
		})
	});
}
//#endregion
export { Shell as n, LoadingScreen as t };
