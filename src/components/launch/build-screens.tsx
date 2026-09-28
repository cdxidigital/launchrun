import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { COSTS, WORKFLOW_TEMPLATES, type Direction, type Section, type WorkMode } from "@/lib/launch/domain";
import { createTool, improveCopy, requestPublish, saveWebsite, setWorkflow } from "@/lib/launch/server";
import { SiteCanvas, ToolCanvas } from "./site-canvas";
import { Button, ConfirmDialog, EmptyState, Estimate, Field, PageHeader, Panel, fieldClass } from "./ui";
import { canEdit, useActive, useMutate } from "./workspace";

export function BuildHub() {
  const active = useActive();
  if (!active) return null;
  const page = active.pages.find((item) => item.kind === "site");
  return (
    <div>
      <PageHeader
        title="Build"
        detail="Make the thing customers use. Start with the page, not a blank editor."
        action={
          <Link to="/app/website" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
            {page?.status === "published" ? "View launch page" : "Review launch page"}
          </Link>
        }
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        <li className="px-4 py-4">
          <h2 className="text-base font-semibold">Launch page</h2>
          <p className="mt-1 text-sm text-muted">
            {page ? `${page.status === "published" ? "Live" : "Draft"} · ${page.title}` : "No page yet."}
          </p>
        </li>
        <li className="px-4 py-4">
          <h2 className="text-base font-semibold">Automations</h2>
          <p className="mt-1 text-sm text-muted">When this happens, do this, then stop for you.</p>
          <Link to="/app/automations" className="mt-2 inline-flex min-h-11 items-center text-sm text-signal">Open automations</Link>
        </li>
        <li className="px-4 py-4">
          <h2 className="text-base font-semibold">Simple tools</h2>
          <p className="mt-1 text-sm text-muted">A pricing calculator or an enquiry form. Not a code editor.</p>
          <Tools />
        </li>
      </ul>
    </div>
  );
}

function Tools() {
  const active = useActive();
  const make = useMutate(createTool);
  if (!active) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Button type="button" variant="quiet" disabled={!canEdit(active.role) || make.isPending} onClick={() => make.mutate({ businessId: active.id, tool: "calculator" })}>
        Add calculator
      </Button>
      <Button type="button" variant="quiet" disabled={!canEdit(active.role) || make.isPending} onClick={() => make.mutate({ businessId: active.id, tool: "enquiry" })}>
        Add enquiry form
      </Button>
      <Link to="/app/website" className="inline-flex min-h-11 items-center text-sm text-signal">Preview tools on the page screen</Link>
    </div>
  );
}

export function WebsiteScreen() {
  const active = useActive();
  const save = useMutate(saveWebsite);
  const publish = useMutate(requestPublish);
  const improve = useMutate(improveCopy);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [ask, setAsk] = useState<"publish" | "rewrite" | null>(null);
  if (!active) return null;
  const page = active.pages.find((item) => item.kind === "site") ?? active.pages[0];
  if (!page) {
    return <EmptyState title="No page yet" body="Create the business map first. A draft page is part of that step." />;
  }
  const value = sections ?? page.sections;
  const look = direction ?? page.direction;
  const tools = active.pages.filter((item) => item.kind === "tool");
  return (
    <div>
      <PageHeader
        title="Launch page"
        detail={page.status === "published" ? "This page is live. Edits wait for approval before they replace it." : "Review the words, pick a look, then ask to publish."}
        action={
          <Button type="button" disabled={!canEdit(active.role)} onClick={() => setAsk("publish")}>
            {page.status === "published" ? "Page is live" : "Ask to publish"}
          </Button>
        }
      />
      {page.status === "published" ? (
        <p className="mt-3 text-sm">
          Live link:{" "}
          <Link to="/p/$slug" params={{ slug: page.slug }} className="text-signal">
            Open public page
          </Link>
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {(["paper", "night", "signal"] as Direction[]).map((item) => (
          <Button key={item} type="button" variant={look === item ? "primary" : "quiet"} onClick={() => setDirection(item)}>
            {item === "paper" ? "Paper" : item === "night" ? "Night" : "Signal"}
          </Button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {value.map((section, index) => (
          <Panel key={section.id} className="space-y-2">
            <Field label={section.kind === "hero" ? "Hero heading" : "Heading"}>
              <input className={fieldClass} value={section.heading} onChange={(event) => {
                const next = value.slice();
                next[index] = { ...section, heading: event.target.value };
                setSections(next);
              }} />
            </Field>
            <Field label="Body">
              <textarea className={fieldClass} rows={3} value={section.body} onChange={(event) => {
                const next = value.slice();
                next[index] = { ...section, body: event.target.value };
                setSections(next);
              }} />
            </Field>
          </Panel>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="quiet"
          disabled={!canEdit(active.role) || save.isPending}
          onClick={() => save.mutate({ businessId: active.id, pageId: page.id, direction: look, sections: value })}
        >
          Save draft
        </Button>
        <Button type="button" variant="quiet" disabled={!canEdit(active.role)} onClick={() => setAsk("rewrite")}>
          Improve page copy
        </Button>
      </div>
      <div className="mt-6">
        <SiteCanvas name={active.name} direction={look} sections={value} />
      </div>
      {tools.length ? (
        <div className="mt-6 space-y-4">
          {tools.map((tool) => (
            <div key={tool.id}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">{tool.title}</h2>
                {tool.status === "published" ? (
                  <Link to="/p/$slug" params={{ slug: tool.slug }} className="text-sm text-signal">Open</Link>
                ) : (
                  <Button type="button" variant="quiet" onClick={() => publish.mutate({ businessId: active.id, pageId: tool.id })}>
                    Ask to publish
                  </Button>
                )}
              </div>
              <ToolCanvas
                name={active.name}
                tool={tool.meta.tool === "enquiry" ? "enquiry" : "calculator"}
                packages={tool.meta.packages?.length ? tool.meta.packages : active.profile.offer.packages}
              />
            </div>
          ))}
        </div>
      ) : null}
      <ConfirmDialog
        open={ask === "publish"}
        onOpenChange={(open) => setAsk(open ? "publish" : null)}
        title="Approve website update"
        body="The page will become public on its launch/run link after you approve it in Approvals. External cost is A$0."
        confirm="Ask for approval"
        busy={publish.isPending || save.isPending}
        onConfirm={() => {
          save.mutate(
            { businessId: active.id, pageId: page.id, direction: look, sections: value },
            {
              onSuccess: () => {
                if (page.status !== "published") {
                  publish.mutate({ businessId: active.id, pageId: page.id }, { onSuccess: () => setAsk(null) });
                } else setAsk(null);
              },
            },
          );
        }}
      >
        <Estimate units={COSTS.publish} />
      </ConfirmDialog>
      <ConfirmDialog
        open={ask === "rewrite"}
        onOpenChange={(open) => setAsk(open ? "rewrite" : null)}
        title="Improve the page copy"
        body="The draft is rewritten in plain language. A live page will not change until you approve it."
        confirm="Rewrite page"
        busy={improve.isPending}
        onConfirm={() => improve.mutate({ businessId: active.id, target: "page", pageId: page.id }, { onSuccess: () => { setSections(null); setAsk(null); } })}
      >
        <Estimate units={COSTS.rewritePage} />
      </ConfirmDialog>
    </div>
  );
}

export function AutomationScreen() {
  const active = useActive();
  const set = useMutate(setWorkflow);
  const [pick, setPick] = useState<{ id: string; mode: WorkMode } | null>(null);
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Automations" detail="When this happens, do this, then do this. You see the cost before it is turned on." />
      <ul className="mt-6 space-y-4">
        {WORKFLOW_TEMPLATES.map((template) => {
          const current = active.workflows.find((item) => item.templateId === template.id);
          return (
            <li key={template.id} className="rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-base font-semibold">{template.name}</h2>
                <span className="text-xs text-muted">{current?.status === "running" ? "Running" : "Off"}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{template.summary}</p>
              <p className="mt-3 text-sm">When {template.trigger.toLowerCase()}:</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                {template.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-muted">Mode: {current?.mode === "suggest" ? "Suggest" : "Approve"}</p>
              <div className="mt-3">
                <Estimate units={template.estimate} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {current?.status === "running" ? (
                  <Button type="button" variant="quiet" disabled={!canEdit(active.role) || set.isPending} onClick={() => set.mutate({ businessId: active.id, templateId: template.id, mode: current.mode, action: "pause" })}>
                    Pause workflow
                  </Button>
                ) : (
                  <>
                    <Button type="button" disabled={!canEdit(active.role)} onClick={() => setPick({ id: template.id, mode: "approve" })}>
                      Turn on
                    </Button>
                    <Button type="button" variant="quiet" disabled={!canEdit(active.role)} onClick={() => setPick({ id: template.id, mode: "suggest" })}>
                      Suggest only
                    </Button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmDialog
        open={!!pick}
        onOpenChange={(open) => { if (!open) setPick(null); }}
        title="Turn on this workflow"
        body="Each run stops for you before a customer would see or receive anything. Turning it on does not spend executions. A run does, and you will see that cost on the approval."
        confirm="Turn on"
        busy={set.isPending}
        onConfirm={() => {
          if (!pick || !active) return;
          set.mutate(
            { businessId: active.id, templateId: pick.id, mode: pick.mode, action: "start" },
            { onSuccess: () => setPick(null) },
          );
        }}
      />
    </div>
  );
}
