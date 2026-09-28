import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as updateMemory, P as updateOffer, f as improveCopy, j as updateBrand, k as updateAudience } from "./router-Dd3uoXY6.mjs";
import { a as MODULES, n as COSTS } from "./domain-DOC0tJs4.mjs";
import { a as Estimate, c as PageHeader, l as Panel, n as Button, o as Field, p as fieldClass, r as ConfirmDialog, s as Meter, t as Block, u as StatusBadge } from "./ui-BVcXVmeN.mjs";
import { n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business-screens-9hN1TVzt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MapScreen() {
	const active = useActive();
	if (!active) return null;
	const next = MODULES.map((item) => active.profile.modules[item.key]).find((item) => item.status === "needs_attention" || item.status === "needs_setup");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Business map",
		detail: "Six parts of the business. One next action, not a pile of features.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/website",
			className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
			children: next?.next ?? "Review launch page"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line",
		children: MODULES.map((item) => {
			const module = active.profile.modules[item.key];
			const href = item.key === "offer" ? "/app/offer" : item.key === "audience" ? "/app/audience" : item.key === "brand" ? "/app/brand" : item.key === "product" ? "/app/website" : item.key === "marketing" ? "/app/campaigns" : "/app/automations";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: module.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: item.about
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: module.percent })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							"Next: ",
							module.next,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", module.owner]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: href,
						className: "mt-2 inline-flex min-h-11 items-center text-sm text-signal",
						children: ["Open ", item.label.toLowerCase()]
					})
				]
			}, item.key);
		})
	})] });
}
function OfferScreen() {
	const active = useActive();
	const save = useMutate(updateOffer);
	const improve = useMutate(improveCopy);
	const [offer, setOffer] = (0, import_react.useState)(null);
	const [ask, setAsk] = (0, import_react.useState)(false);
	if (!active) return null;
	const value = offer ?? active.profile.offer;
	const allowed = canEdit(active.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Offer",
			detail: "This is what you sell. Approving it is separate from editing it.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !allowed || save.isPending,
				onClick: () => save.mutate({
					businessId: active.id,
					offer: value
				}),
				children: "Save offer"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Summary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 4,
						value: value.summary,
						onChange: (event) => setOffer({
							...value,
							summary: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Positioning",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: value.positioning,
						onChange: (event) => setOffer({
							...value,
							positioning: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Guarantee",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 3,
						value: value.guarantee,
						onChange: (event) => setOffer({
							...value,
							guarantee: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Sales line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 2,
						value: value.messaging,
						onChange: (event) => setOffer({
							...value,
							messaging: event.target.value
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
			title: "Packages",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: value.packages.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							"aria-label": "Package name",
							value: item.name,
							onChange: (event) => {
								const packages = value.packages.slice();
								packages[index] = {
									...item,
									name: event.target.value
								};
								setOffer({
									...value,
									packages
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							"aria-label": "Price",
							value: item.price,
							onChange: (event) => {
								const packages = value.packages.slice();
								packages[index] = {
									...item,
									price: event.target.value
								};
								setOffer({
									...value,
									packages
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							"aria-label": "Includes",
							value: item.includes,
							onChange: (event) => {
								const packages = value.packages.slice();
								packages[index] = {
									...item,
									includes: event.target.value
								};
								setOffer({
									...value,
									packages
								});
							}
						})
					]
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				className: "mt-3",
				onClick: () => setOffer({
					...value,
					packages: [...value.packages, {
						id: crypto.randomUUID(),
						name: "New",
						price: "A$0",
						includes: "Describe what is included."
					}]
				}),
				children: "Add package"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				disabled: !allowed,
				onClick: () => setAsk(true),
				children: "Improve the wording"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: ask,
			onOpenChange: setAsk,
			title: "Improve the offer wording",
			body: "This rewrites the summary and the sales line. You still review it. Nothing is published.",
			confirm: "Rewrite offer",
			busy: improve.isPending,
			onConfirm: () => {
				improve.mutate({
					businessId: active.id,
					target: "offer"
				}, { onSuccess: () => {
					setOffer(null);
					setAsk(false);
				} });
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.rewriteOffer })
		})
	] });
}
function AudienceScreen() {
	const active = useActive();
	const save = useMutate(updateAudience);
	const [audience, setAudience] = (0, import_react.useState)(null);
	if (!active) return null;
	const value = audience ?? active.profile.audienceProfile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Audience",
			detail: "Who buys, what they need, and what might stop them.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role) || save.isPending,
				onClick: () => save.mutate({
					businessId: active.id,
					audience: value
				}),
				children: "Save audience"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "In one line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					rows: 3,
					value: value.summary,
					onChange: (event) => setAudience({
						...value,
						summary: event.target.value
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-4",
			children: value.segments.map((segment, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Segment",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: segment.name,
							onChange: (event) => {
								const segments = value.segments.slice();
								segments[index] = {
									...segment,
									name: event.target.value
								};
								setAudience({
									...value,
									segments
								});
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Needs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: fieldClass,
							rows: 2,
							value: segment.needs,
							onChange: (event) => {
								const segments = value.segments.slice();
								segments[index] = {
									...segment,
									needs: event.target.value
								};
								setAudience({
									...value,
									segments
								});
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Objections",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: fieldClass,
							rows: 2,
							value: segment.objections,
							onChange: (event) => {
								const segments = value.segments.slice();
								segments[index] = {
									...segment,
									objections: event.target.value
								};
								setAudience({
									...value,
									segments
								});
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Where they come from",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: fieldClass,
							rows: 2,
							value: segment.sources,
							onChange: (event) => {
								const segments = value.segments.slice();
								segments[index] = {
									...segment,
									sources: event.target.value
								};
								setAudience({
									...value,
									segments
								});
							}
						})
					})
				]
			}) }, segment.id))
		})
	] });
}
function BrandScreen() {
	const active = useActive();
	const save = useMutate(updateBrand);
	const [name, setName] = (0, import_react.useState)(null);
	const [brand, setBrand] = (0, import_react.useState)(null);
	if (!active) return null;
	const value = brand ?? active.profile.brand;
	const businessName = name ?? active.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Brand",
		detail: "The name, tone and rules other drafts should follow.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			disabled: !canEdit(active.role) || save.isPending,
			onClick: () => save.mutate({
				businessId: active.id,
				name: businessName,
				brand: value
			}),
			children: "Save brand"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: businessName,
					onChange: (event) => setName(event.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Positioning",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					rows: 3,
					value: value.positioning,
					onChange: (event) => setBrand({
						...value,
						positioning: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					rows: 2,
					value: value.tone,
					onChange: (event) => setBrand({
						...value,
						tone: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Message",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					rows: 2,
					value: value.messaging,
					onChange: (event) => setBrand({
						...value,
						messaging: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Rules",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					rows: 3,
					value: value.rules,
					onChange: (event) => setBrand({
						...value,
						rules: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Visual direction for pages",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: fieldClass,
					value: value.direction,
					onChange: (event) => setBrand({
						...value,
						direction: event.target.value
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "paper",
							children: "Paper — light page, quiet type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "night",
							children: "Night — dark page, lime action"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "signal",
							children: "Signal — light page, blue action"
						})
					]
				})
			})
		]
	})] });
}
function MemoryScreen() {
	const active = useActive();
	const save = useMutate(updateMemory);
	const [memory, setMemory] = (0, import_react.useState)(null);
	if (!active) return null;
	const value = memory ?? active.profile.memory;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Business memory",
			detail: "Facts the rest of the workspace should reuse. You can edit every line.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role) || save.isPending,
				onClick: () => save.mutate({
					businessId: active.id,
					memory: value
				}),
				children: "Save memory"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: value.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 sm:grid-cols-[10rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					"aria-label": "Memory label",
					value: item.label,
					onChange: (event) => {
						const next = value.slice();
						next[index] = {
							...item,
							label: event.target.value
						};
						setMemory(next);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					"aria-label": "Memory value",
					rows: 2,
					value: item.value,
					onChange: (event) => {
						const next = value.slice();
						next[index] = {
							...item,
							value: event.target.value
						};
						setMemory(next);
					}
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "quiet",
			className: "mt-4",
			onClick: () => setMemory([...value, {
				id: crypto.randomUUID(),
				label: "",
				value: ""
			}]),
			children: "Add a fact"
		})
	] });
}
//#endregion
export { OfferScreen as a, MemoryScreen as i, BrandScreen as n, MapScreen as r, AudienceScreen as t };
