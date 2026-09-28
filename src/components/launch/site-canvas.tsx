import { useState } from "react";
import type { Direction, Section } from "@/lib/launch/domain";
import { captureLead } from "@/lib/launch/server";

export function SiteCanvas({
  name,
  direction,
  sections,
  slug,
  interactive = false,
}: {
  name: string;
  direction: Direction;
  sections: Section[];
  slug?: string;
  interactive?: boolean;
}) {
  return (
    <article className="site overflow-hidden rounded-lg border border-line" data-direction={direction}>
      <div className="mx-auto max-w-xl px-5 py-10">
        {sections.map((section) => (
          <section key={section.id} className="mt-8 first:mt-0">
            {section.kind === "hero" ? (
              <>
                <p className="text-sm" style={{ color: "var(--site-muted)" }}>
                  {name}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{section.heading}</h2>
                <p className="mt-3 text-base" style={{ color: "var(--site-muted)" }}>
                  {section.body}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{section.heading}</h3>
                {section.body ? (
                  <p className="mt-2 text-sm" style={{ color: "var(--site-muted)" }}>
                    {section.body}
                  </p>
                ) : null}
              </>
            )}
            {section.items?.length ? (
              <dl className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <div key={item.q} className="rounded-md p-3" style={{ background: "var(--site-card)" }}>
                    <dt className="text-sm font-medium">{item.q}</dt>
                    <dd className="mt-1 text-sm" style={{ color: "var(--site-muted)" }}>
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {section.kind === "capture" && interactive && slug ? <LeadForm slug={slug} /> : null}
            {section.kind === "capture" && !interactive ? (
              <p className="mt-4 text-sm" style={{ color: "var(--site-muted)" }}>
                The enquiry form appears on the live page.
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

function LeadForm({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  if (done) {
    return (
      <p className="mt-4 text-sm" role="status">
        Thanks. Your note is with the business. Nothing else was sent.
      </p>
    );
  }
  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        setError("");
        void captureLead({
          data: {
            slug,
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            note: String(form.get("note") ?? ""),
            company: String(form.get("company") ?? ""),
          },
        }).then((result) => {
          setPending(false);
          if (!result.ok) setError(result.message);
          else setDone(true);
        });
      }}
    >
      <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden />
      <label className="block text-sm">
        Name
        <input name="name" required className="mt-1 w-full rounded-md border px-3 py-3" style={{ background: "var(--site-card)", borderColor: "transparent" }} />
      </label>
      <label className="block text-sm">
        Email
        <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-md border px-3 py-3" style={{ background: "var(--site-card)", borderColor: "transparent" }} />
      </label>
      <label className="block text-sm">
        Note
        <textarea name="note" rows={3} className="mt-1 w-full rounded-md border px-3 py-3" style={{ background: "var(--site-card)", borderColor: "transparent" }} />
      </label>
      {error ? <p className="text-sm">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--site-accent)", color: "var(--site-accent-ink)" }}
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

export function ToolCanvas({
  name,
  tool,
  packages,
  slug,
}: {
  name: string;
  tool: "calculator" | "enquiry";
  packages: { id: string; name: string; price: string; includes: string }[];
  slug?: string;
}) {
  const [index, setIndex] = useState(0);
  const current = packages[index] ?? packages[0];
  if (tool === "enquiry") {
    return (
      <article className="site rounded-lg border border-line p-6" data-direction="paper">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--site-muted)" }}>
          Ask a question. It is saved as a lead.
        </p>
        {slug ? <LeadForm slug={slug} /> : <p className="mt-4 text-sm">Publish this tool to accept enquiries.</p>}
      </article>
    );
  }
  return (
    <article className="site rounded-lg border border-line p-6" data-direction="paper">
      <h2 className="text-2xl font-semibold">Estimate</h2>
      <p className="mt-2 text-sm" style={{ color: "var(--site-muted)" }}>
        {name} · choose a package. This does not take payment.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {packages.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className="min-h-11 rounded-md px-3 py-2 text-sm"
            style={{
              background: itemIndex === index ? "var(--site-accent)" : "var(--site-card)",
              color: itemIndex === index ? "var(--site-accent-ink)" : "var(--site-fg)",
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      {current ? (
        <p className="mt-4 text-lg font-semibold tabular-nums">
          {current.price}
          <span className="mt-1 block text-sm font-normal" style={{ color: "var(--site-muted)" }}>
            {current.includes}
          </span>
        </p>
      ) : (
        <p className="mt-4 text-sm">Add packages on the offer page first.</p>
      )}
    </article>
  );
}
