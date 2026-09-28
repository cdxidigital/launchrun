import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as captureLead } from "./router-Dd3uoXY6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-canvas-DSaCnQ5k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteCanvas({ name, direction, sections, slug, interactive = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "site overflow-hidden rounded-lg border border-line",
		"data-direction": direction,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-xl px-5 py-10",
			children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 first:mt-0",
				children: [
					section.kind === "hero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							style: { color: "var(--site-muted)" },
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold tracking-tight",
							children: section.heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base",
							style: { color: "var(--site-muted)" },
							children: section.body
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: section.heading
					}), section.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						style: { color: "var(--site-muted)" },
						children: section.body
					}) : null] }),
					section.items?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-4 space-y-3",
						children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md p-3",
							style: { background: "var(--site-card)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-sm font-medium",
								children: item.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm",
								style: { color: "var(--site-muted)" },
								children: item.a
							})]
						}, item.q))
					}) : null,
					section.kind === "capture" && interactive && slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, { slug }) : null,
					section.kind === "capture" && !interactive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						style: { color: "var(--site-muted)" },
						children: "The enquiry form appears on the live page."
					}) : null
				]
			}, section.id))
		})
	});
}
function LeadForm({ slug }) {
	const [done, setDone] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm",
		role: "status",
		children: "Thanks. Your note is with the business. Nothing else was sent."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3",
		onSubmit: (event) => {
			event.preventDefault();
			const form = new FormData(event.currentTarget);
			setPending(true);
			setError("");
			captureLead({ data: {
				slug,
				name: String(form.get("name") ?? ""),
				email: String(form.get("email") ?? ""),
				note: String(form.get("note") ?? ""),
				company: String(form.get("company") ?? "")
			} }).then((result) => {
				setPending(false);
				if (!result.ok) setError(result.message);
				else setDone(true);
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "hidden",
				tabIndex: -1,
				autoComplete: "off",
				name: "company",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "name",
					required: true,
					className: "mt-1 w-full rounded-md border px-3 py-3",
					style: {
						background: "var(--site-card)",
						borderColor: "transparent"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "email",
					type: "email",
					required: true,
					autoComplete: "email",
					className: "mt-1 w-full rounded-md border px-3 py-3",
					style: {
						background: "var(--site-card)",
						borderColor: "transparent"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "note",
					rows: 3,
					className: "mt-1 w-full rounded-md border px-3 py-3",
					style: {
						background: "var(--site-card)",
						borderColor: "transparent"
					}
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: pending,
				className: "min-h-11 rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-60",
				style: {
					background: "var(--site-accent)",
					color: "var(--site-accent-ink)"
				},
				children: pending ? "Sending…" : "Send"
			})
		]
	});
}
function ToolCanvas({ name, tool, packages, slug }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const current = packages[index] ?? packages[0];
	if (tool === "enquiry") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "site rounded-lg border border-line p-6",
		"data-direction": "paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				style: { color: "var(--site-muted)" },
				children: "Ask a question. It is saved as a lead."
			}),
			slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, { slug }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: "Publish this tool to accept enquiries."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "site rounded-lg border border-line p-6",
		"data-direction": "paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold",
				children: "Estimate"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				style: { color: "var(--site-muted)" },
				children: [name, " · choose a package. This does not take payment."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: packages.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setIndex(itemIndex),
					className: "min-h-11 rounded-md px-3 py-2 text-sm",
					style: {
						background: itemIndex === index ? "var(--site-accent)" : "var(--site-card)",
						color: itemIndex === index ? "var(--site-accent-ink)" : "var(--site-fg)"
					},
					children: item.name
				}, item.id))
			}),
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-lg font-semibold tabular-nums",
				children: [current.price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm font-normal",
					style: { color: "var(--site-muted)" },
					children: current.includes
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: "Add packages on the offer page first."
			})
		]
	});
}
//#endregion
export { ToolCanvas as n, SiteCanvas as t };
