import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, g as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as ChevronDown } from "../_libs/lucide-react.mjs";
import { s as PLANS } from "./domain-DOC0tJs4.mjs";
import { d as Wordmark, h as useCurrentUserState, n as Button } from "./ui-BVcXVmeN.mjs";
import { n as SignedIn, r as SignedOut } from "./gates-DcqIjAwS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BHgolZ5H.js
var import_jsx_runtime = require_jsx_runtime();
var FAQ = [
	{
		q: "Is this an AI chatbot?",
		a: "No. You describe the idea. launch/run turns that into a map, a first page, and a short list of decisions. Chat is not the product."
	},
	{
		q: "Will it publish or spend money on its own?",
		a: "No. Publishing, customer emails, ad spend, refunds and bank movement stay behind an approval, or stay manual. You see the work and the cost before you agree."
	},
	{
		q: "What is an execution?",
		a: "A unit of business work, such as creating your map, publishing a page, or drafting a follow-up. It is not a technical meter. You see the number before anything runs."
	},
	{
		q: "Do I need a card for Start?",
		a: "No. Start is A$0. Card billing is not connected in this version, so changing plan or adding executions never charges a card from this app."
	}
];
function Marketing() {
	const { user, isPending } = useCurrentUserState();
	const startTo = user ? "/app" : "/signup";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-panel focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { className: "text-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Marketing",
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "hidden min-h-11 items-center px-3 text-muted sm:flex",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "inline-flex min-h-11 items-center px-3 text-muted",
							children: "Sign in"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							className: "inline-flex min-h-11 items-center px-3 text-muted",
							children: "Control room"
						}) }),
						isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
							children: "Start free"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: startTo,
							className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
							children: "Start free"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				className: "mx-auto w-full max-w-5xl px-4 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), " for founders"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl",
								children: [
									"Build the business.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block",
										children: "Run the business."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-action",
										children: "Stay in control."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base text-muted",
								children: "launch/run turns an idea into a clear path of work, then helps with the repetitive parts. You approve anything a customer can see."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									disabled: true,
									children: "Start free"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: startTo,
									className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
									children: "Start free"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold",
									children: "See how it works"
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-line bg-panel p-4",
							"aria-hidden": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Home · example"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-lg font-semibold",
									children: "Good evening, Harbor & Rye"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Your business is 48% ready. Two things need you. Nothing else is running yet."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-md border border-line bg-ink p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Next"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-medium",
										children: "Review the launch page"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-3 space-y-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-3 border-t border-line pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approve your offer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Needs you"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-3 border-t border-line pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm brand basics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Needs you"
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "how",
						className: "border-t border-line py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-6 space-y-6",
							children: [
								["Start", "Write the idea. A concept is enough — we turn it into a map you can edit."],
								["Build", "You get a business map, an offer, and a launch page draft. Not a blank screen."],
								["Launch", "You approve the page. Then it has a public link. Nothing goes live quietly."],
								["Run", "Leads, follow-ups and campaigns wait for you when they matter. Routine work can stay on."]
							].map(([title, body], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[2rem_1fr] gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-semibold text-action tabular-nums",
									children: ["0", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: body
								})] })]
							}, title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-line py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Control"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted",
								children: "Three ways to work. Autonomy is a setting, not a surrender."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 divide-y divide-line border-y border-line",
								children: [
									["Suggest", "We recommend the next step. You do it."],
									["Approve", "We prepare the work. You approve, edit, or reject it."],
									["Auto", "Only for repetitive work you have already allowed, such as draft copy. Publishing stays on approval."]
								].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid gap-1 py-4 sm:grid-cols-[8rem_1fr]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold",
										children: title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: body
									})]
								}, title))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "pricing",
						className: "border-t border-line py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted",
								children: "Prices in Australian dollars. Third-party costs, such as ads or email tools, stay separate and visible."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-3 md:grid-cols-2",
								children: Object.keys(PLANS).map((id) => {
									const plan = PLANS[id];
									const recommended = id === "build";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: recommended ? "rounded-lg border border-action bg-panel p-4" : "rounded-lg border border-line bg-panel p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-semibold",
													children: plan.name
												}), recommended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-action",
													children: "Recommended"
												}) : null]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 text-2xl font-semibold tabular-nums",
												children: [
													"A$",
													plan.price,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-normal text-muted",
														children: " / month"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: plan.blurb
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-3 space-y-1 text-sm",
												children: plan.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
											})
										]
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "Top-ups, only after you confirm: 100 for A$15, 500 for A$55, 1,500 for A$145. Launch Assist A$299. Brand Pack A$495. Custom Build from A$995. Migration from A$395."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-line py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Examples"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "A freelancer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: " maps an offer, publishes one page, and approves each reply."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "A local roaster"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: " turns a subscription idea into packages, a page, and a follow-up rule."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "A consultant"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: " keeps the audience, prices and voice in one memory, then reuses them."
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-line py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
							type: "single",
							collapsible: true,
							className: "mt-4 divide-y divide-line border-y border-line",
							children: FAQ.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								value: item.q,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
									className: "flex w-full min-h-12 items-center justify-between gap-3 py-3 text-left text-sm font-medium",
									children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										className: "size-4 shrink-0 text-muted",
										"aria-hidden": true
									})]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
									className: "pb-3 text-sm text-muted",
									children: item.a
								})]
							}, item.q))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-line py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Start with the business, not a feature list."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Tell us what you want to build. Leave with a map and a page to review."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5",
								children: isPending ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: startTo,
									className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
									children: "Start free"
								})
							})
						]
					})
				]
			})
		]
	});
}
var SplitComponent = Marketing;
//#endregion
export { SplitComponent as component };
