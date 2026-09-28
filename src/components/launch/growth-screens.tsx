import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { COSTS } from "@/lib/launch/domain";
import { addLead, draftContent, saveCampaign, setContentStatus, updateLead } from "@/lib/launch/server";
import { Button, ConfirmDialog, EmptyState, Estimate, Field, PageHeader, fieldClass } from "./ui";
import { canEdit, useActive, useMutate } from "./workspace";

const STATUSES = ["new", "qualified", "contacted", "won", "lost"] as const;

export function GrowthHub() {
  const active = useActive();
  if (!active) return null;
  return (
    <div>
      <PageHeader
        title="Growth"
        detail="Leads, campaigns and content. One job at a time."
        action={
          <Link to="/app/campaigns" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
            Create a campaign
          </Link>
        }
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line text-sm">
        <li className="flex items-center justify-between px-4 py-4">
          <span>Leads · {active.leads.length}</span>
          <Link to="/app/leads" className="text-signal">Open</Link>
        </li>
        <li className="flex items-center justify-between px-4 py-4">
          <span>Contacts</span>
          <Link to="/app/crm" className="text-signal">Open</Link>
        </li>
        <li className="flex items-center justify-between px-4 py-4">
          <span>Campaigns · {active.campaigns.length}</span>
          <Link to="/app/campaigns" className="text-signal">Open</Link>
        </li>
        <li className="flex items-center justify-between px-4 py-4">
          <span>Content queue · {active.content.length}</span>
          <Link to="/app/content" className="text-signal">Open</Link>
        </li>
      </ul>
    </div>
  );
}

export function LeadsScreen() {
  const active = useActive();
  const add = useMutate(addLead);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  if (!active) return null;
  return (
    <div>
      <PageHeader
        title="Leads"
        detail="People who have asked about the offer."
        action={<Button type="button" disabled={!canEdit(active.role)} onClick={() => setOpen(true)}>Add a lead</Button>}
      />
      {active.leads.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No leads yet" body="Publish the launch page, or add someone you already spoke to. Follow-up only starts if that workflow is on." action={<Button type="button" onClick={() => setOpen(true)}>Add a lead</Button>} />
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
          {active.leads.map((lead) => (
            <li key={lead.id} className="px-4 py-3 text-sm">
              <p className="font-medium">{lead.name}</p>
              <p className="text-muted">{lead.email} · {lead.source} · {lead.status}</p>
              {lead.note ? <p className="mt-1">{lead.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Add a lead"
        body="This stores the person on this business. If lead follow-up is running, a reply will wait for your approval."
        confirm="Add lead"
        busy={add.isPending}
        onConfirm={() => add.mutate({ businessId: active.id, name, email, source: "Manual", note }, { onSuccess: () => { setOpen(false); setName(""); setEmail(""); setNote(""); } })}
      >
        <div className="space-y-3">
          <Field label="Name"><input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} /></Field>
          <Field label="Email"><input className={fieldClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
          <Field label="Note"><textarea className={fieldClass} rows={3} value={note} onChange={(event) => setNote(event.target.value)} /></Field>
        </div>
      </ConfirmDialog>
    </div>
  );
}

export function CrmScreen() {
  const active = useActive();
  const update = useMutate(updateLead);
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Contacts" detail="The same people as leads, grouped by where they are." />
      {active.leads.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No contacts yet" body="Contacts appear when a lead arrives. You can move them as the conversation changes." action={<Link to="/app/leads" className="text-sm font-semibold text-signal">Go to leads</Link>} />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {STATUSES.map((status) => {
            const rows = active.leads.filter((lead) => lead.status === status);
            if (!rows.length) return null;
            return (
              <section key={status}>
                <h2 className="text-xs font-semibold tracking-wide text-muted uppercase">{status}</h2>
                <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
                  {rows.map((lead) => (
                    <li key={lead.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-muted">{lead.email}</p>
                      </div>
                      <label className="text-xs text-muted">
                        Status
                        <select
                          className="mt-1 block min-h-11 rounded-md border border-line bg-ink px-2 text-sm text-fg"
                          value={lead.status}
                          disabled={!canEdit(active.role)}
                          onChange={(event) => update.mutate({ businessId: active.id, leadId: lead.id, status: event.target.value })}
                        >
                          {STATUSES.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

const CAMPAIGN_STEPS = ["Goal", "Audience", "Offer", "Channels", "Budget", "Review"] as const;

export function CampaignScreen() {
  const active = useActive();
  const save = useMutate(saveCampaign);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", goal: "", audience: "", offer: "", channels: "Email", budget: "A$0" });
  const [ask, setAsk] = useState(false);
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Create a campaign" detail={`Step ${step + 1} of ${CAMPAIGN_STEPS.length}: ${CAMPAIGN_STEPS[step]}`} />
      <div className="mt-6 space-y-4">
        {step === 0 ? (
          <>
            <Field label="Name"><input className={fieldClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></Field>
            <Field label="Goal"><textarea className={fieldClass} rows={3} value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} /></Field>
          </>
        ) : null}
        {step === 1 ? <Field label="Audience"><textarea className={fieldClass} rows={3} value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} /></Field> : null}
        {step === 2 ? <Field label="Offer"><textarea className={fieldClass} rows={3} value={form.offer} onChange={(event) => setForm({ ...form, offer: event.target.value })} /></Field> : null}
        {step === 3 ? (
          <Field label="Channel">
            <select className={fieldClass} value={form.channels} onChange={(event) => setForm({ ...form, channels: event.target.value })}>
              <option>Email</option>
              <option>Social</option>
              <option>Launch page</option>
            </select>
          </Field>
        ) : null}
        {step === 4 ? (
          <Field label="Budget you are willing to consider" hint="Nothing is spent. No ad account is connected.">
            <input className={fieldClass} value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} />
          </Field>
        ) : null}
        {step === 5 ? (
          <div className="space-y-2 text-sm">
            <p><span className="text-muted">Name. </span>{form.name}</p>
            <p><span className="text-muted">Goal. </span>{form.goal}</p>
            <p><span className="text-muted">Audience. </span>{form.audience}</p>
            <p><span className="text-muted">Offer. </span>{form.offer}</p>
            <p><span className="text-muted">Channel. </span>{form.channels}</p>
            <p><span className="text-muted">Budget noted. </span>{form.budget}</p>
            <Estimate units={COSTS.campaign} />
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-between gap-2">
        <Button type="button" variant="quiet" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>Back</Button>
        {step < 5 ? (
          <Button type="button" onClick={() => setStep((value) => value + 1)}>Continue</Button>
        ) : (
          <Button type="button" disabled={!canEdit(active.role)} onClick={() => setAsk(true)}>Ask to schedule</Button>
        )}
      </div>
      {active.campaigns.length ? (
        <ul className="mt-8 divide-y divide-line rounded-lg border border-line text-sm">
          {active.campaigns.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <span className="font-medium">{item.name}</span>
              <span className="mt-1 block text-muted">{item.status} · {item.channels} · {item.budget}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <ConfirmDialog
        open={ask}
        onOpenChange={setAsk}
        title="Schedule this campaign"
        body="Approving saves the plan and uses 10 executions. No ad account is connected, so the budget is a note. Nothing is spent."
        confirm="Send for approval"
        busy={save.isPending}
        onConfirm={() => save.mutate({ businessId: active.id, ...form, schedule: true }, { onSuccess: () => setAsk(false) })}
      >
        <Estimate units={COSTS.campaign} />
      </ConfirmDialog>
    </div>
  );
}

export function ContentScreen() {
  const active = useActive();
  const draft = useMutate(draftContent);
  const mark = useMutate(setContentStatus);
  const [topic, setTopic] = useState("");
  const [channel, setChannel] = useState("Social");
  const [ask, setAsk] = useState(false);
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Content queue" detail="Drafts stay here until you approve them. Nothing is posted to a social account." />
      <div className="mt-6 space-y-3">
        <Field label="Topic">
          <input className={fieldClass} value={topic} onChange={(event) => setTopic(event.target.value)} />
        </Field>
        <Field label="Channel">
          <select className={fieldClass} value={channel} onChange={(event) => setChannel(event.target.value)}>
            <option>Social</option>
            <option>Email</option>
            <option>Page</option>
          </select>
        </Field>
        <Button type="button" disabled={!canEdit(active.role)} onClick={() => setAsk(true)}>Draft a post</Button>
      </div>
      {active.content.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No drafts yet" body="Turn a topic into a draft, then decide if it is ready. It will not be published outside this workspace." />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {active.content.map((item) => (
            <li key={item.id} className="rounded-lg border border-line p-4 text-sm">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 whitespace-pre-wrap text-muted">{item.body}</p>
              <p className="mt-2 text-xs text-muted">{item.channel} · {item.status}</p>
              {item.status === "draft" ? (
                <Button type="button" variant="quiet" className="mt-3" disabled={!canEdit(active.role)} onClick={() => mark.mutate({ businessId: active.id, contentId: item.id, ready: true })}>
                  Ask to mark ready
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={ask}
        onOpenChange={setAsk}
        title="Draft a post"
        body="If wording help is available, this uses 1 execution. If it is not, a plain draft is saved and nothing is used."
        confirm="Create draft"
        busy={draft.isPending}
        onConfirm={() => draft.mutate({ businessId: active.id, topic, channel }, { onSuccess: () => { setAsk(false); setTopic(""); } })}
      >
        <Estimate units={COSTS.draftPost} />
      </ConfirmDialog>
    </div>
  );
}
