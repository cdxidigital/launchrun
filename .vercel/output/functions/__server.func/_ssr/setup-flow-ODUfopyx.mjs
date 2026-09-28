import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useNavigate, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as createFromSetup, y as saveDraft } from "./router-Dd3uoXY6.mjs";
import { D as localSuggestion, I as workingName, S as exampleAnswers, d as answersFromConcept, i as IMPORT_KINDS, n as COSTS, o as PATHS, s as PLANS, t as AUTONOMY } from "./domain-DOC0tJs4.mjs";
import { a as Estimate, d as Wordmark, h as useCurrentUserState, n as Button, o as Field, p as fieldClass, s as Meter } from "./ui-BVcXVmeN.mjs";
import { i as useWorkspace, r as useMutate } from "./workspace-aavTzbjY.mjs";
import { t as RedirectToSignIn } from "./gates-DcqIjAwS.mjs";
import { t as LoadingScreen } from "./shell-ol0ix04Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setup-flow-ODUfopyx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUESTIONS = [
	{
		key: "goal",
		title: "What are you trying to achieve?",
		help: "Say the outcome you want, in one or two sentences."
	},
	{
		key: "sell",
		title: "What do you sell, or want to sell?",
		help: "A product, a service, or a subscription. Be concrete."
	},
	{
		key: "audience",
		title: "Who is it for?",
		help: "Name the person, not a market category."
	},
	{
		key: "useful",
		title: "What makes the offer useful?",
		help: "The practical difference for that person."
	},
	{
		key: "findBuy",
		title: "How do customers find or buy from you today?",
		help: "A channel, a habit, or “nowhere yet”."
	},
	{
		key: "have",
		title: "What do you already have?",
		help: "A name, a site, a list, photos, nothing. All of those are fine."
	}
];
var EXAMPLE_IDEA = "A weekly coffee subscription for people working from home, with a short brew note in every bag.";
function PathScreen() {
	const { user, isPending } = useCurrentUserState();
	const query = useWorkspace();
	const save = useMutate(saveDraft);
	const create = useMutate(createFromSetup);
	const navigate = useNavigate();
	const draftRef = (0, import_react.useRef)(null);
	const [concept, setConcept] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [nameTouched, setNameTouched] = (0, import_react.useState)(false);
	const [editingName, setEditingName] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [problem, setProblem] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (query.data?.draft) draftRef.current = query.data.draft;
	}, [query.data]);
	(0, import_react.useEffect)(() => {
		if (!query.data || ready) return;
		const answers = query.data.draft?.answers;
		if (answers?.goal && !answers.sell) setConcept(answers.goal);
		if (answers?.businessName && answers.goal && !answers.sell) {
			setName(answers.businessName);
			setNameTouched(true);
			setEditingName(true);
		}
		setReady(true);
	}, [query.data, ready]);
	const guessed = workingName(concept);
	const displayName = nameTouched ? name : guessed;
	const enough = concept.trim().length >= 8;
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const text = concept.trim();
		if (text.length < 2) return;
		const previous = draftRef.current?.answers ?? {};
		const next = {
			step: 0,
			answers: {
				...previous,
				path: previous.path ?? "new",
				imports: previous.imports ?? [],
				goal: text.slice(0, 500),
				...displayName.trim().length >= 2 ? { businessName: displayName.trim().slice(0, 80) } : {}
			}
		};
		const timer = window.setTimeout(() => {
			draftRef.current = next;
			save.mutate(next);
		}, 700);
		return () => window.clearTimeout(timer);
	}, [
		concept,
		displayName,
		ready
	]);
	if (isPending || user && query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { label: "Opening your idea" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	function start() {
		const text = concept.trim();
		if (text.length < 8) {
			setProblem("Add a little more. A sentence is enough.");
			return;
		}
		setProblem(null);
		const chosen = displayName.trim().length >= 2 ? displayName.trim() : void 0;
		create.mutate(answersFromConcept(text, chosen), { onSuccess: () => void navigate({ to: "/app" }) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "What's the idea?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "A concept is enough. One or two sentences. You do not need a name, a price, or a plan yet."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6",
			onSubmit: (event) => {
				event.preventDefault();
				start();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "The concept",
					hint: "Write it the way you would tell a friend.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						rows: 6,
						maxLength: 500,
						value: concept,
						placeholder: "A weekly meal kit for night-shift nurses who do not want to cook when they get home.",
						onChange: (event) => {
							setConcept(event.target.value);
							setProblem(null);
						}
					})
				}),
				enough ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: editingName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Working name",
						hint: "Only if the suggestion is wrong.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: displayName,
							maxLength: 80,
							onChange: (event) => {
								setNameTouched(true);
								setName(event.target.value);
							}
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Working name: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: guessed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ml-3 min-h-11 text-signal",
								onClick: () => setEditingName(true),
								children: "Change"
							})
						]
					})
				}) : null,
				problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-danger",
					role: "alert",
					children: problem
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-5 w-full",
					disabled: create.isPending || !enough,
					children: create.isPending ? "Creating the map…" : "Start from this idea"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"This uses ",
						COSTS.map,
						" of the ",
						PLANS.start.included,
						" included executions. Nothing is published. You still approve anything a customer could see."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-left text-sm text-signal",
				onClick: () => {
					setConcept(EXAMPLE_IDEA);
					setNameTouched(false);
					setEditingName(false);
					setProblem(null);
				},
				children: "Try an example idea"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-left text-sm text-muted underline-offset-4 hover:underline",
				onClick: () => {
					const text = concept.trim();
					const previous = draftRef.current?.answers ?? {};
					const chosen = displayName.trim().length >= 2 ? displayName.trim() : void 0;
					let answers;
					if (text.length >= 8) {
						const inferred = answersFromConcept(text, chosen);
						answers = {
							...inferred,
							...previous,
							path: previous.path ?? inferred.path,
							goal: text.slice(0, 500),
							businessName: chosen ?? previous.businessName ?? inferred.businessName,
							imports: previous.imports ?? []
						};
						if (!previous.have || previous.have === "Just the concept.") delete answers.have;
					} else answers = {
						path: "new",
						imports: [],
						...previous
					};
					save.mutate({
						step: 0,
						answers
					}, { onSuccess: () => void navigate({ to: "/setup" }) });
				},
				children: "Answer it question by question"
			})]
		})
	] });
}
function SetupScreen() {
	const { user, isPending } = useCurrentUserState();
	const query = useWorkspace();
	const save = useMutate(saveDraft);
	const create = useMutate(createFromSetup);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!query.data || ready) return;
		setDraft(query.data.draft ?? {
			step: 0,
			answers: { imports: [] }
		});
		setReady(true);
	}, [query.data, ready]);
	(0, import_react.useEffect)(() => {
		if (!draft || !ready) return;
		const timer = window.setTimeout(() => save.mutate(draft), 600);
		return () => window.clearTimeout(timer);
	}, [draft, ready]);
	if (isPending || user && query.isLoading || !draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { label: "Loading your answers" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const step = draft.step;
	const answers = draft.answers;
	const total = QUESTIONS.length + 2;
	const suggestion = localSuggestion(step, answers);
	function patch(partial, nextStep = step) {
		setDraft({
			step: nextStep,
			answers: {
				...answers,
				...partial,
				imports: partial.imports ?? answers.imports ?? []
			}
		});
	}
	function missing() {
		if (step === 0 && (!answers.businessName || answers.businessName.trim().length < 2 || !answers.goal || answers.goal.trim().length < 2)) return "Add a business name and what you want to achieve.";
		if (step > 0 && step < QUESTIONS.length) {
			const key = QUESTIONS[step].key;
			const value = answers[key];
			if (typeof value !== "string" || value.trim().length < 2) return "Add an answer to continue.";
		}
		if (step === QUESTIONS.length && !answers.autonomy) return "Choose how much help you want.";
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs font-semibold tracking-wide text-muted uppercase",
			children: [
				"Step ",
				Math.min(step + 1, total),
				" of ",
				total
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: (step + 1) / total * 100 })
		}),
		step < QUESTIONS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: QUESTIONS[step].title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: QUESTIONS[step].help
				}),
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Business name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: answers.businessName ?? "",
							onChange: (event) => patch({ businessName: event.target.value })
						})
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Your answer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: fieldClass,
							rows: 4,
							value: String(answers[QUESTIONS[step].key] ?? ""),
							onChange: (event) => patch({ [QUESTIONS[step].key]: event.target.value })
						})
					})
				}),
				suggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 text-left text-sm text-signal",
					onClick: () => patch({ [QUESTIONS[step].key]: suggestion }),
					children: "Use a starting line from your earlier answers"
				}) : null,
				step === QUESTIONS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Imports, {
					draft,
					onChange: patch
				}) : null
			]
		}) : null,
		step === QUESTIONS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "How much should launch/run do?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "You can change this later. Nothing customer-facing runs without a rule."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: AUTONOMY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": answers.autonomy === item.id,
						className: answers.autonomy === item.id ? "block w-full rounded-lg border border-action bg-panel p-4 text-left" : "block w-full rounded-lg border border-line bg-panel p-4 text-left",
						onClick: () => patch({ autonomy: item.id }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: item.body
						})]
					}, item.id))
				})
			]
		}) : null,
		step > QUESTIONS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Review, {
			answers,
			busy: create.isPending,
			onCreate: () => {
				const parsed = {
					...answers,
					imports: (answers.imports ?? []).filter((item) => item.value.trim())
				};
				create.mutate(parsed, { onSuccess: () => void navigate({ to: "/app" }) });
			}
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "quiet",
				onClick: () => setDraft({
					...draft,
					step: Math.max(0, step - 1)
				}),
				disabled: step === 0,
				children: "Back"
			}), step <= QUESTIONS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: () => {
					if (missing()) return;
					setDraft({
						...draft,
						step: step + 1
					});
				},
				children: "Continue"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-6 text-sm text-muted underline-offset-4 hover:underline",
			onClick: () => setDraft({
				step: QUESTIONS.length + 1,
				answers: exampleAnswers()
			}),
			children: "Fill an example and review it"
		})
	] });
}
function Imports({ draft, onChange }) {
	const imports = draft.answers.imports ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Bring something with you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Paste a link or a note. Live connections are not switched on yet, so nothing is fetched in the background."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: IMPORT_KINDS.map((item) => {
					const current = imports.find((entry) => entry.kind === item.kind)?.value ?? "";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: item.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: current,
							placeholder: "Optional",
							onChange: (event) => {
								onChange({ imports: IMPORT_KINDS.map((kind) => ({
									kind: kind.kind,
									value: kind.kind === item.kind ? event.target.value : imports.find((entry) => entry.kind === kind.kind)?.value ?? ""
								})).filter((entry) => entry.value.trim()) });
							}
						})
					}) }, item.kind);
				})
			})
		]
	});
}
function Review({ answers, onCreate, busy }) {
	const path = PATHS.find((item) => item.id === answers.path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "Review the path"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Creating the map uses ",
					COSTS.map,
					" executions. ",
					PLANS.start.name,
					" includes ",
					PLANS.start.included,
					", so you will have ",
					PLANS.start.included - COSTS.map,
					" left. Nothing else is charged."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Path"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: path?.title ?? "Not chosen" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Business"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: answers.businessName })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Goal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: answers.goal })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Offer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: answers.sell })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "For"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: answers.audience })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimate, { units: COSTS.map })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "mt-4",
				disabled: busy,
				onClick: onCreate,
				children: busy ? "Creating the map…" : "Create my business map"
			})
		]
	});
}
function Frame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-ink px-4 py-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			})]
		})
	});
}
//#endregion
export { SetupScreen as n, PathScreen as t };
