import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { inboxItems, money } from "@/lib/launch/domain";
import { recordPayment, saveTask, setTaskStatus } from "@/lib/launch/server";
import { Button, ConfirmDialog, EmptyState, Field, PageHeader, fieldClass } from "./ui";
import { canEdit, useActive, useMutate } from "./workspace";

export function OperationsHub() {
  const active = useActive();
  if (!active) return null;
  const inbox = inboxItems(active);
  return (
    <div>
      <PageHeader
        title="Operations"
        detail="The work of running the business, in plain language."
        action={
          <Link to="/app/inbox" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
            {inbox.length ? `Open inbox (${inbox.length})` : "Open inbox"}
          </Link>
        }
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line text-sm">
        <li className="flex items-center justify-between px-4 py-4"><span>Inbox</span><Link to="/app/inbox" className="text-signal">Open</Link></li>
        <li className="flex items-center justify-between px-4 py-4"><span>Tasks · {active.tasks.filter((task) => task.status === "open").length} open</span><Link to="/app/tasks" className="text-signal">Open</Link></li>
        <li className="flex items-center justify-between px-4 py-4"><span>Payments</span><Link to="/app/payments" className="text-signal">Open</Link></li>
      </ul>
    </div>
  );
}

export function InboxScreen() {
  const active = useActive();
  if (!active) return null;
  const items = inboxItems(active);
  return (
    <div>
      <PageHeader title="Inbox" detail="New leads, saved replies, and decisions that need you." />
      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="Inbox is clear" body="New leads and replies that need a decision will land here. Nothing is hiding in a bot list." />
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
          {items.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <Link to={item.href} className="text-sm font-medium hover:underline">{item.title}</Link>
              <p className="mt-1 line-clamp-3 text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TasksScreen() {
  const active = useActive();
  const save = useMutate(saveTask);
  const set = useMutate(setTaskStatus);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  if (!active) return null;
  return (
    <div>
      <PageHeader title="Tasks" detail="Work you, or a workflow, still need to finish." />
      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          save.mutate({ businessId: active.id, title, detail }, { onSuccess: () => { setTitle(""); setDetail(""); } });
        }}
      >
        <Field label="Task">
          <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} />
        </Field>
        <Field label="Detail">
          <input className={fieldClass} value={detail} onChange={(event) => setDetail(event.target.value)} />
        </Field>
        <Button type="submit" disabled={!canEdit(active.role) || save.isPending}>Add task</Button>
      </form>
      <ul className="mt-6 space-y-2">
        {active.tasks.map((task) => (
          <li key={task.id} className="flex items-start gap-3 rounded-lg border border-line px-3 py-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4"
              checked={task.status === "done"}
              aria-label={`Mark ${task.title} done`}
              disabled={!canEdit(active.role)}
              onChange={() => set.mutate({ businessId: active.id, taskId: task.id, status: task.status === "done" ? "open" : "done" })}
            />
            <div>
              <p className={task.status === "done" ? "text-muted line-through" : "font-medium"}>{task.title}</p>
              {task.detail ? <p className="text-muted">{task.detail}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PaymentsScreen() {
  const active = useActive();
  const save = useMutate(recordPayment);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  if (!active) return null;
  const total = active.payments.reduce((sum, item) => sum + item.amountCents, 0);
  const payments = active.integrations.find((item) => item.name === "Payments");
  return (
    <div>
      <PageHeader
        title="Payments"
        detail="Money you record yourself. Card charging and payouts are not connected."
        action={<Button type="button" disabled={!canEdit(active.role, "admin")} onClick={() => setOpen(true)}>Record a payment</Button>}
      />
      <p className="mt-4 text-2xl font-semibold tabular-nums">{money(total)}</p>
      <p className="text-sm text-muted">Recorded on this business. Not a bank balance.</p>
      {payments ? (
        <p className="mt-4 text-sm text-muted">
          Payments integration: {payments.status === "details_saved" ? "A note is saved. Still not connected." : "Not connected."}{" "}
          <Link to="/app/settings" className="text-signal">Add a note in settings</Link>
        </p>
      ) : null}
      {active.payments.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No payments recorded" body="When a customer pays you outside this app, you can note it here. Nothing is charged from launch/run." />
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-lg border border-line text-sm">
          {active.payments.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 px-4 py-3">
              <span>{item.label}</span>
              <span className="tabular-nums">{money(item.amountCents)}</span>
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Record a payment"
        body="This is a note for your records. It does not charge a card or move money."
        confirm="Record"
        busy={save.isPending}
        onConfirm={() => save.mutate({ businessId: active.id, label, amount }, { onSuccess: () => { setOpen(false); setLabel(""); setAmount(""); } })}
      >
        <div className="space-y-3">
          <Field label="What was it"><input className={fieldClass} value={label} onChange={(event) => setLabel(event.target.value)} /></Field>
          <Field label="Amount in AUD"><input className={fieldClass} inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} /></Field>
        </div>
      </ConfirmDialog>
    </div>
  );
}
