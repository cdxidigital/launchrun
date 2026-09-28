import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PLANS, type PlanId } from "@/lib/launch/domain";
import { Button, Wordmark } from "./ui";

const FAQ = [
  {
    q: "Is this an AI chatbot?",
    a: "No. You describe the idea. launch/run turns that into a map, a first page, and a short list of decisions. Chat is not the product.",
  },
  {
    q: "Will it publish or spend money on its own?",
    a: "No. Publishing, customer emails, ad spend, refunds and bank movement stay behind an approval, or stay manual. You see the work and the cost before you agree.",
  },
  {
    q: "What is an execution?",
    a: "A unit of business work, such as creating your map, publishing a page, or drafting a follow-up. It is not a technical meter. You see the number before anything runs.",
  },
  {
    q: "Do I need a card for Start?",
    a: "No. Start is A$0. Card billing is not connected in this version, so changing plan or adding executions never charges a card from this app.",
  },
];

export function Marketing() {
  const { user, isPending } = useCurrentUserState();
  const startTo = user ? "/app" : "/signup";
  return (
    <div className="min-h-screen bg-ink text-fg">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-panel focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4">
        <Wordmark className="text-lg" />
        <nav aria-label="Marketing" className="flex items-center gap-2 text-sm">
          <a href="#pricing" className="hidden min-h-11 items-center px-3 text-muted sm:flex">
            Pricing
          </a>
          <SignedOut>
            <Link to="/login" className="inline-flex min-h-11 items-center px-3 text-muted">
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/app" className="inline-flex min-h-11 items-center px-3 text-muted">
              Control room
            </Link>
          </SignedIn>
          {isPending ? (
            <span className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
              Start free
            </span>
          ) : (
            <Link
              to={startTo}
              className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink"
            >
              Start free
            </Link>
          )}
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-20">
        <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <p className="text-sm text-muted">
              <Wordmark /> for founders
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Build the business.
              <span className="mt-1 block">Run the business.</span>
              <span className="mt-1 block text-action">Stay in control.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted">
              launch/run turns an idea into a clear path of work, then helps with the repetitive parts.
              You approve anything a customer can see.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {isPending ? (
                <Button type="button" disabled>
                  Start free
                </Button>
              ) : (
                <Link to={startTo} className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
                  Start free
                </Link>
              )}
              <a href="#how" className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold">
                See how it works
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-panel p-4" aria-hidden>
            <p className="text-xs text-muted">Home · example</p>
            <p className="mt-3 text-lg font-semibold">Good evening, Harbor & Rye</p>
            <p className="mt-2 text-sm text-muted">
              Your business is 48% ready. Two things need you. Nothing else is running yet.
            </p>
            <div className="mt-4 rounded-md border border-line bg-ink p-3">
              <p className="text-xs text-muted">Next</p>
              <p className="mt-1 text-sm font-medium">Review the launch page</p>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-3 border-t border-line pt-2">
                <span>Approve your offer</span>
                <span className="text-muted">Needs you</span>
              </li>
              <li className="flex justify-between gap-3 border-t border-line pt-2">
                <span>Confirm brand basics</span>
                <span className="text-muted">Needs you</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="how" className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-6 space-y-6">
            {[
              ["Start", "Write the idea. A concept is enough — we turn it into a map you can edit."],
              ["Build", "You get a business map, an offer, and a launch page draft. Not a blank screen."],
              ["Launch", "You approve the page. Then it has a public link. Nothing goes live quietly."],
              ["Run", "Leads, follow-ups and campaigns wait for you when they matter. Routine work can stay on."],
            ].map(([title, body], index) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="text-sm font-semibold text-action tabular-nums">0{index + 1}</span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">Control</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Three ways to work. Autonomy is a setting, not a surrender.
          </p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {[
              ["Suggest", "We recommend the next step. You do it."],
              ["Approve", "We prepare the work. You approve, edit, or reject it."],
              ["Auto", "Only for repetitive work you have already allowed, such as draft copy. Publishing stays on approval."],
            ].map(([title, body]) => (
              <li key={title} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-sm text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="pricing" className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">Pricing</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Prices in Australian dollars. Third-party costs, such as ads or email tools, stay separate and visible.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {(Object.keys(PLANS) as PlanId[]).map((id) => {
              const plan = PLANS[id];
              const recommended = id === "build";
              return (
                <article key={id} className={recommended ? "rounded-lg border border-action bg-panel p-4" : "rounded-lg border border-line bg-panel p-4"}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-semibold">{plan.name}</h3>
                    {recommended ? <span className="text-xs text-action">Recommended</span> : null}
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums">
                    A${plan.price}
                    <span className="text-sm font-normal text-muted"> / month</span>
                  </p>
                  <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {plan.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-muted">
            Top-ups, only after you confirm: 100 for A$15, 500 for A$55, 1,500 for A$145. Launch Assist A$299. Brand Pack A$495. Custom Build from A$995. Migration from A$395.
          </p>
        </section>

        <section className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">Examples</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <span className="font-medium">A freelancer</span>
              <span className="text-muted"> maps an offer, publishes one page, and approves each reply.</span>
            </li>
            <li>
              <span className="font-medium">A local roaster</span>
              <span className="text-muted"> turns a subscription idea into packages, a page, and a follow-up rule.</span>
            </li>
            <li>
              <span className="font-medium">A consultant</span>
              <span className="text-muted"> keeps the audience, prices and voice in one memory, then reuses them.</span>
            </li>
          </ul>
        </section>

        <section className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">Questions</h2>
          <Accordion.Root type="single" collapsible className="mt-4 divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <Accordion.Item key={item.q} value={item.q}>
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full min-h-12 items-center justify-between gap-3 py-3 text-left text-sm font-medium">
                    {item.q}
                    <ChevronDown className="size-4 shrink-0 text-muted" aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-3 text-sm text-muted">{item.a}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </section>

        <section className="border-t border-line py-12">
          <h2 className="text-xl font-semibold">Start with the business, not a feature list.</h2>
          <p className="mt-2 text-sm text-muted">Tell us what you want to build. Leave with a map and a page to review.</p>
          <div className="mt-5">
            {isPending ? null : (
              <Link to={startTo} className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
                Start free
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
