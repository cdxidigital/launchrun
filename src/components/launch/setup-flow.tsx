import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AUTONOMY, COSTS, CONCEPT_ONLY, IMPORT_KINDS, PATHS, PLANS, answersFromConcept, exampleAnswers, localSuggestion, workingName, type PathId, type SetupAnswers, type SetupDraft } from "@/lib/launch/domain";
import { createFromSetup, saveDraft } from "@/lib/launch/server";
import { Button, Estimate, Field, Meter, Wordmark, fieldClass } from "./ui";
import { useMutate, useWorkspace } from "./workspace";
import { LoadingScreen } from "./shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";

const QUESTIONS: {
  key: keyof SetupAnswers;
  title: string;
  help: string;
}[] = [
  { key: "goal", title: "What are you trying to achieve?", help: "Say the outcome you want, in one or two sentences." },
  { key: "sell", title: "What do you sell, or want to sell?", help: "A product, a service, or a subscription. Be concrete." },
  { key: "audience", title: "Who is it for?", help: "Name the person, not a market category." },
  { key: "useful", title: "What makes the offer useful?", help: "The practical difference for that person." },
  { key: "findBuy", title: "How do customers find or buy from you today?", help: "A channel, a habit, or “nowhere yet”." },
  { key: "have", title: "What do you already have?", help: "A name, a site, a list, photos, nothing. All of those are fine." },
];

const EXAMPLE_IDEA =
  "A weekly coffee subscription for people working from home, with a short brew note in every bag.";

export function PathScreen() {
  const { user, isPending } = useCurrentUserState();
  const query = useWorkspace();
  const save = useMutate(saveDraft);
  const create = useMutate(createFromSetup);
  const navigate = useNavigate();
  const draftRef = useRef<SetupDraft | null>(null);
  const [concept, setConcept] = useState("");
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [ready, setReady] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    if (query.data?.draft) draftRef.current = query.data.draft;
  }, [query.data]);

  useEffect(() => {
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

  useEffect(() => {
    if (!ready) return;
    const text = concept.trim();
    if (text.length < 2) return;
    const previous = draftRef.current?.answers ?? {};
    const next: SetupDraft = {
      step: 0,
      answers: {
        ...previous,
        path: previous.path ?? "new",
        imports: previous.imports ?? [],
        goal: text.slice(0, 500),
        ...(displayName.trim().length >= 2 ? { businessName: displayName.trim().slice(0, 80) } : {}),
      },
    };
    const timer = window.setTimeout(() => {
      draftRef.current = next;
      save.mutate(next);
    }, 700);
    return () => window.clearTimeout(timer);
    // save identity changes every render; the draft ref is the source of truth.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concept, displayName, ready]);

  if (isPending || (user && query.isLoading)) return <LoadingScreen label="Opening your idea" />;
  if (!user) return <RedirectToSignIn />;

  function start() {
    const text = concept.trim();
    if (text.length < 8) {
      setProblem("Add a little more. A sentence is enough.");
      return;
    }
    setProblem(null);
    const chosen = displayName.trim().length >= 2 ? displayName.trim() : undefined;
    create.mutate(answersFromConcept(text, chosen), {
      onSuccess: () => void navigate({ to: "/app" }),
    });
  }

  return (
    <Frame>
      <h1 className="text-xl font-semibold">What's the idea?</h1>
      <p className="mt-2 text-sm text-muted">
        A concept is enough. One or two sentences. You do not need a name, a price, or a plan yet.
      </p>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          start();
        }}
      >
        <Field label="The concept" hint="Write it the way you would tell a friend.">
          <textarea
            className={fieldClass}
            rows={6}
            maxLength={500}
            value={concept}
            placeholder="A weekly meal kit for night-shift nurses who do not want to cook when they get home."
            onChange={(event) => {
              setConcept(event.target.value);
              setProblem(null);
            }}
          />
        </Field>
        {enough ? (
          <div className="mt-4">
            {editingName ? (
              <Field label="Working name" hint="Only if the suggestion is wrong.">
                <input
                  className={fieldClass}
                  value={displayName}
                  maxLength={80}
                  onChange={(event) => {
                    setNameTouched(true);
                    setName(event.target.value);
                  }}
                />
              </Field>
            ) : (
              <p className="text-sm text-muted">
                Working name: <span className="font-medium text-fg">{guessed}</span>
                <button
                  type="button"
                  className="ml-3 min-h-11 text-signal"
                  onClick={() => setEditingName(true)}
                >
                  Change
                </button>
              </p>
            )}
          </div>
        ) : null}
        {problem ? (
          <p className="mt-3 text-sm text-danger" role="alert">
            {problem}
          </p>
        ) : null}
        <Button type="submit" className="mt-5 w-full" disabled={create.isPending || !enough}>
          {create.isPending ? "Creating the map…" : "Start from this idea"}
        </Button>
        <p className="mt-3 text-sm text-muted">
          This uses {COSTS.map} of the {PLANS.start.included} included executions. Nothing is published. You still approve anything a customer could see.
        </p>
      </form>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="min-h-11 text-left text-sm text-signal"
          onClick={() => {
            setConcept(EXAMPLE_IDEA);
            setNameTouched(false);
            setEditingName(false);
            setProblem(null);
          }}
        >
          Try an example idea
        </button>
        <button
          type="button"
          className="min-h-11 text-left text-sm text-muted underline-offset-4 hover:underline"
          onClick={() => {
            const text = concept.trim();
            const previous = draftRef.current?.answers ?? {};
            const chosen = displayName.trim().length >= 2 ? displayName.trim() : undefined;
            let answers: SetupDraft["answers"];
            if (text.length >= 8) {
              const inferred = answersFromConcept(text, chosen);
              answers = {
                ...inferred,
                ...previous,
                path: previous.path ?? inferred.path,
                goal: text.slice(0, 500),
                businessName: chosen ?? previous.businessName ?? inferred.businessName,
                imports: previous.imports ?? [],
              };
              if (!previous.have || previous.have === CONCEPT_ONLY) delete answers.have;
            } else {
              answers = { path: "new", imports: [], ...previous };
            }
            save.mutate({ step: 0, answers }, { onSuccess: () => void navigate({ to: "/setup" }) });
          }}
        >
          Answer it question by question
        </button>
      </div>
    </Frame>
  );
}

export function SetupScreen() {
  const { user, isPending } = useCurrentUserState();
  const query = useWorkspace();
  const save = useMutate(saveDraft);
  const create = useMutate(createFromSetup);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SetupDraft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!query.data || ready) return;
    setDraft(query.data.draft ?? { step: 0, answers: { imports: [] } });
    setReady(true);
  }, [query.data, ready]);

  useEffect(() => {
    if (!draft || !ready) return;
    const timer = window.setTimeout(() => save.mutate(draft), 600);
    return () => window.clearTimeout(timer);
    // save identity changes every render; draft is the source of truth.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, ready]);

  if (isPending || (user && query.isLoading) || !draft) return <LoadingScreen label="Loading your answers" />;
  if (!user) return <RedirectToSignIn />;

  const step = draft.step;
  const answers = draft.answers;
  const total = QUESTIONS.length + 2;
  const suggestion = localSuggestion(step, answers);

  function patch(partial: Partial<SetupAnswers>, nextStep = step) {
    setDraft({ step: nextStep, answers: { ...answers, ...partial, imports: partial.imports ?? answers.imports ?? [] } });
  }

  function missing(): string | null {
    if (step === 0 && (!answers.businessName || answers.businessName.trim().length < 2 || !answers.goal || answers.goal.trim().length < 2)) {
      return "Add a business name and what you want to achieve.";
    }
    if (step > 0 && step < QUESTIONS.length) {
      const key = QUESTIONS[step].key;
      const value = answers[key];
      if (typeof value !== "string" || value.trim().length < 2) return "Add an answer to continue.";
    }
    if (step === QUESTIONS.length && !answers.autonomy) return "Choose how much help you want.";
    return null;
  }

  return (
    <Frame>
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Step {Math.min(step + 1, total)} of {total}
      </p>
      <div className="mt-2">
        <Meter value={((step + 1) / total) * 100} />
      </div>
      {step < QUESTIONS.length ? (
        <div className="mt-6">
          <h1 className="text-xl font-semibold">{QUESTIONS[step].title}</h1>
          <p className="mt-2 text-sm text-muted">{QUESTIONS[step].help}</p>
          {step === 0 ? (
            <div className="mt-5">
              <Field label="Business name">
                <input
                  className={fieldClass}
                  value={answers.businessName ?? ""}
                  onChange={(event) => patch({ businessName: event.target.value })}
                />
              </Field>
            </div>
          ) : null}
          <div className="mt-4">
            <Field label="Your answer">
              <textarea
                className={fieldClass}
                rows={4}
                value={String(answers[QUESTIONS[step].key] ?? "")}
                onChange={(event) => patch({ [QUESTIONS[step].key]: event.target.value } as Partial<SetupAnswers>)}
              />
            </Field>
          </div>
          {suggestion ? (
            <button
              type="button"
              className="mt-3 text-left text-sm text-signal"
              onClick={() => patch({ [QUESTIONS[step].key]: suggestion } as Partial<SetupAnswers>)}
            >
              Use a starting line from your earlier answers
            </button>
          ) : null}
          {step === QUESTIONS.length - 1 ? <Imports draft={draft} onChange={patch} /> : null}
        </div>
      ) : null}
      {step === QUESTIONS.length ? (
        <div className="mt-6">
          <h1 className="text-xl font-semibold">How much should launch/run do?</h1>
          <p className="mt-2 text-sm text-muted">You can change this later. Nothing customer-facing runs without a rule.</p>
          <div className="mt-4 space-y-3">
            {AUTONOMY.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={answers.autonomy === item.id}
                className={answers.autonomy === item.id ? "block w-full rounded-lg border border-action bg-panel p-4 text-left" : "block w-full rounded-lg border border-line bg-panel p-4 text-left"}
                onClick={() => patch({ autonomy: item.id })}
              >
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm text-muted">{item.body}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step > QUESTIONS.length ? (
        <Review
          answers={answers}
          busy={create.isPending}
          onCreate={() => {
            const parsed = {
              ...answers,
              imports: (answers.imports ?? []).filter((item) => item.value.trim()),
            };
            create.mutate(parsed as SetupAnswers, {
              onSuccess: () => void navigate({ to: "/app" }),
            });
          }}
        />
      ) : null}
      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="quiet"
          onClick={() => setDraft({ ...draft, step: Math.max(0, step - 1) })}
          disabled={step === 0}
        >
          Back
        </Button>
        {step <= QUESTIONS.length ? (
          <Button
            type="button"
            onClick={() => {
              const problem = missing();
              if (problem) return;
              setDraft({ ...draft, step: step + 1 });
            }}
          >
            Continue
          </Button>
        ) : null}
      </div>
      <button
        type="button"
        className="mt-6 text-sm text-muted underline-offset-4 hover:underline"
        onClick={() => setDraft({ step: QUESTIONS.length + 1, answers: exampleAnswers() })}
      >
        Fill an example and review it
      </button>
    </Frame>
  );
}

function Imports({
  draft,
  onChange,
}: {
  draft: SetupDraft;
  onChange: (partial: Partial<SetupAnswers>) => void;
}) {
  const imports = draft.answers.imports ?? [];
  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold">Bring something with you</h2>
      <p className="mt-1 text-sm text-muted">Paste a link or a note. Live connections are not switched on yet, so nothing is fetched in the background.</p>
      <ul className="mt-3 space-y-3">
        {IMPORT_KINDS.map((item) => {
          const current = imports.find((entry) => entry.kind === item.kind)?.value ?? "";
          return (
            <li key={item.kind}>
              <Field label={item.label}>
                <input
                  className={fieldClass}
                  value={current}
                  placeholder="Optional"
                  onChange={(event) => {
                    const next = IMPORT_KINDS.map((kind) => ({
                      kind: kind.kind,
                      value: kind.kind === item.kind ? event.target.value : imports.find((entry) => entry.kind === kind.kind)?.value ?? "",
                    })).filter((entry) => entry.value.trim());
                    onChange({ imports: next });
                  }}
                />
              </Field>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Review({
  answers,
  onCreate,
  busy,
}: {
  answers: SetupDraft["answers"];
  onCreate: () => void;
  busy: boolean;
}) {
  const path = PATHS.find((item) => item.id === (answers.path as PathId | undefined));
  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold">Review the path</h1>
      <p className="mt-2 text-sm text-muted">
        Creating the map uses {COSTS.map} executions. {PLANS.start.name} includes {PLANS.start.included}, so you will have {PLANS.start.included - COSTS.map} left. Nothing else is charged.
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-muted">Path</dt>
          <dd>{path?.title ?? "Not chosen"}</dd>
        </div>
        <div>
          <dt className="text-muted">Business</dt>
          <dd>{answers.businessName}</dd>
        </div>
        <div>
          <dt className="text-muted">Goal</dt>
          <dd>{answers.goal}</dd>
        </div>
        <div>
          <dt className="text-muted">Offer</dt>
          <dd>{answers.sell}</dd>
        </div>
        <div>
          <dt className="text-muted">For</dt>
          <dd>{answers.audience}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <Estimate units={COSTS.map} />
      </div>
      <Button type="button" className="mt-4" disabled={busy} onClick={onCreate}>
        {busy ? "Creating the map…" : "Create my business map"}
      </Button>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ink px-4 py-6 text-fg">
      <div className="mx-auto w-full max-w-xl">
        <Link to="/">
          <Wordmark />
        </Link>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
