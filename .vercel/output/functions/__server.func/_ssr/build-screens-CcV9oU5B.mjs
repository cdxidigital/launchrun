import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as saveWebsite, D as setWorkflow, f as improveCopy, h as requestPublish, s as createTool } from "./router-Dd3uoXY6.mjs";
import { n as ToolCanvas, t as SiteCanvas } from "./site-canvas-DSaCnQ5k.mjs";
import { n as COSTS, u as WORKFLOW_TEMPLATES } from "./domain-DOC0tJs4.mjs";
import { a as Estimate, c as PageHeader, i as EmptyState, l as Panel, n as Button, o as Field, p as fieldClass, r as ConfirmDialog } from "./ui-BVcXVmeN.mjs";
import { n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/build-screens-CcV9oU5B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuildHub() {
	const active = useActive();
	if (!active) return null;
	const page = active.pages.find((item) => item.kind === "site");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Build",
		detail: "Make the thing customers use. Start with the page, not a blank editor.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/website",
			className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
			children: page?.status === "published" ? "View launch page" : "Review launch page"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Launch page"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: page ? `${page.status === "published" ? "Live" : "Draft"} · ${page.title}` : "No page yet."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Automations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "When this happens, do this, then stop for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/automations",
						className: "mt-2 inline-flex min-h-11 items-center text-sm text-signal",
						children: "Open automations"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Simple tools"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "A pricing calculator or an enquiry form. Not a code editor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tools, {})
				]
			})
		]
	})] });
}
function Tools() {
	const active = useActive();
	const make = useMutate(createTool);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !canEdit(active.role) || make.isPending,
				onClick: () => make.mutate({
					businessId: active.id,
					tool: "calculator"
				}),
				children: "Add calculator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !canEdit(active.role) || make.isPending,
				onClick: () => make.mutate({
					businessId: active.id,
					tool: "enquiry"
				}),
				children: "Add enquiry form"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/website",
				className: "inline-flex min-h-11 items-center text-sm text-signal",
				children: "Preview tools on the page screen"
			})
		]
	});
}
function WebsiteScreen() {
	const active = useActive();
	const save = useMutate(saveWebsite);
	const publish = useMutate(requestPublish);
	const improve = useMutate(improveCopy);
	const [sections, setSections] = (0, import_react.useState)(null);
	const [direction, setDirection] = (0, import_react.useState)(null);
	const [ask, setAsk] = (0, import_react.useState)(null);
	if (!active) return null;
	const page = active.pages.find((item) => item.kind === "site") ?? active.pages[0];
	if (!page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No page yet",
		body: "Create the business map first. A draft page is part of that step."
	});
	const value = sections ?? page.sections;
	const look = direction ?? page.direction;
	const tools = active.pages.filter((item) => item.kind === "tool");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Launch page",
			detail: page.status === "published" ? "This page is live. Edits wait for approval before they replace it." : "Review the words, pick a look, then ask to publish.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role),
				onClick: () => setAsk("publish"),
				children: page.status === "published" ? "Page is live" : "Ask to publish"
			})
		}),
		page.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm",
			children: [
				"Live link:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$slug",
					params: { slug: page.slug },
					className: "text-signal",
					children: "Open public page"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				"paper",
				"night",
				"signal"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: look === item ? "primary" : "quiet",
				onClick: () => setDirection(item),
				children: item === "paper" ? "Paper" : item === "night" ? "Night" : "Signal"
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: value.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: section.kind === "hero" ? "Hero heading" : "Heading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: section.heading,
						onChange: (event) => {
							const next = value.slice();
							next[index] = {
								...section,
								heading: event.target.value
							};
							setSections(next);
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: section.body,
						onChange: (event) => {
							const next = value.slice();
							next[index] = {
								...section,
								body: event.target.value
							};
							setSections(next);
						}
					})
				})]
			}, section.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !canEdit(active.role) || save.isPending,
				onClick: () => save.mutate({
					businessId: active.id,
					pageId: page.id,
					direction: look,
					sections: value
				}),
				children: "Save draft"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !canEdit(active.role),
				onClick: () => setAsk("rewrite"),
				children: "Improve page copy"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteCanvas, {
				name: active.name,
				direction: look,
				sections: value
			})
		}),
		tools.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-4",
			children: tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: tool.title
				}), tool.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$slug",
					params: { slug: tool.slug },
					className: "text-sm text-signal",
					children: "Open"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "quiet",
					onClick: () => publish.mutate({
						businessId: active.id,
						pageId: tool.id
					}),
					children: "Ask to publish"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCanvas, {
				name: active.name,
				tool: tool.meta.tool === "enquiry" ? "enquiry" : "calculator",
				packages: tool.meta.packages?.length ? tool.meta.packages : active.profile.offer.packages
			})] }, tool.id))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask === "publish",
			onOpenChange: (open) => setAsk(open ? "publish" : null),
			title: "Approve website update",
			body: "The page will become public on its launch/run link after you approve it in Approvals. External cost is A$0.",
			confirm: "Ask for approval",
			busy: publish.isPending || save.isPending,
			onConfirm: () => {
				save.mutate({
					businessId: active.id,
					pageId: page.id,
					direction: look,
					sections: value
				}, { onSuccess: () => {
					if (page.status !== "published") publish.mutate({
						businessId: active.id,
						pageId: page.id
					}, { onSuccess: () => setAsk(null) });
					else setAsk(null);
				} });
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.publish })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask === "rewrite",
			onOpenChange: (open) => setAsk(open ? "rewrite" : null),
			title: "Improve the page copy",
			body: "The draft is rewritten in plain language. A live page will not change until you approve it.",
			confirm: "Rewrite page",
			busy: improve.isPending,
			onConfirm: () => improve.mutate({
				businessId: active.id,
				target: "page",
				pageId: page.id
			}, { onSuccess: () => {
				setSections(null);
				setAsk(null);
			} }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.rewritePage })
		})
	] });
}
function AutomationScreen() {
	const active = useActive();
	const set = useMutate(setWorkflow);
	const [pick, setPick] = (0, import_react.useState)(null);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Automations",
			detail: "When this happens, do this, then do this. You see the cost before it is turned on."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-4",
			children: WORKFLOW_TEMPLATES.map((template) => {
				const current = active.workflows.find((item) => item.templateId === template.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-line p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold",
								children: template.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: current?.status === "running" ? "Running" : "Off"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: template.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								"When ",
								template.trigger.toLowerCase(),
								":"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-2 list-decimal space-y-1 pl-5 text-sm",
							children: template.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: ["Mode: ", current?.mode === "suggest" ? "Suggest" : "Approve"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: template.estimate })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: current?.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "quiet",
								disabled: !canEdit(active.role) || set.isPending,
								onClick: () => set.mutate({
									businessId: active.id,
									templateId: template.id,
									mode: current.mode,
									action: "pause"
								}),
								children: "Pause workflow"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: !canEdit(active.role),
								onClick: () => setPick({
									id: template.id,
									mode: "approve"
								}),
								children: "Turn on"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "quiet",
								disabled: !canEdit(active.role),
								onClick: () => setPick({
									id: template.id,
									mode: "suggest"
								}),
								children: "Suggest only"
							})] })
						})
					]
				}, template.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!pick,
			onOpenChange: (open) => {
				if (!open) setPick(null);
			},
			title: "Turn on this workflow",
			body: "Each run stops for you before a customer would see or receive anything. Turning it on does not spend executions. A run does, and you will see that cost on the approval.",
			confirm: "Turn on",
			busy: set.isPending,
			onConfirm: () => {
				if (!pick || !active) return;
				set.mutate({
					businessId: active.id,
					templateId: pick.id,
					mode: pick.mode,
					action: "start"
				}, { onSuccess: () => setPick(null) });
			}
		})
	] });
}
//#endregion
export { BuildHub as n, WebsiteScreen as r, AutomationScreen as t };
