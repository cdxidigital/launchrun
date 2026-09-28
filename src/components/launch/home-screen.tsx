import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { MODULES, greeting, inboxItems, remaining, statusSentence } from "@/lib/launch/domain";
import { dismissWelcome } from "@/lib/launch/server";
import { Block, Button, EmptyState, Meter, PageHeader, Panel, StatusBadge } from "./ui";
import { canEdit, useActive, useMutate } from "./workspace";

export function HomeScreen() {
  const active = useActive();
  const dismiss = useMutate(dismissWelcome);
  if (!active) return null;
  const waiting = active.approvals.filter((item) => item.status === "waiting");
  const running = active.workflows.filter((item) => item.status === "running");
  const openTasks = active.tasks.filter((item) => item.status === "open");
  const nextTask = openTasks[0];
  const allowed = canEdit(active.role);
  const [hello, setHello] = useState(active.name);
  useEffect(() => {
    setHello(greeting(new Date(), active.name));
  }, [active.name]);
  return (
    <div>
      <PageHeader
        title={hello}
        detail={statusSentence({
          readiness: active.readiness,
          waiting: waiting.length,
          running: running.length,
        })}
        action={
          waiting.length > 0 ? (
            <Link to="/app/approvals" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
              Review {waiting.length} {waiting.length === 1 ? "item" : "items"}
            </Link>
          ) : (
            <Link to="/app/website" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
              Review launch page
            </Link>
          )
        }
      />
      {!active.profile.welcomed ? (
        <Panel className="mt-6">
          <h2 className="text-base font-semibold">Your business map is ready</h2>
          <ul className="mt-3 space-y-2">
            {MODULES.map((item) => (
              <li key={item.key} className="flex items-center justify-between gap-3 text-sm">
                <span>{item.label}</span>
                <StatusBadge status={active.profile.modules[item.key].status} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Recommended next step: review the launch page.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              disabled={!allowed || dismiss.isPending}
              onClick={() => dismiss.mutate({ businessId: active.id })}
            >
              Start building
            </Button>
            <Link to="/app/business" className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold">
              Review my business map
            </Link>
          </div>
        </Panel>
      ) : null}
      <Block title="Today">
        {nextTask ? (
          <Panel>
            <p className="text-base font-semibold">{nextTask.title}</p>
            <p className="mt-1 text-sm text-muted">{nextTask.detail}</p>
            <Link to="/app/website" className="mt-3 inline-flex text-sm text-signal">
              Open it
            </Link>
          </Panel>
        ) : (
          <EmptyState title="Nothing is queued for today" body="When a task needs you, it will show up here as the one next action." />
        )}
      </Block>
      <Block title="Waiting on you" action={<Link to="/app/approvals" className="text-sm text-signal">Open all</Link>}>
        {waiting.length === 0 ? (
          <EmptyState title="Nothing is waiting" body="Approvals show up here before anything customer-facing changes." />
        ) : (
          <ul className="divide-y divide-line rounded-lg border border-line">
            {waiting.slice(0, 3).map((item) => (
              <li key={item.id} className="px-4 py-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{item.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </Block>
      <Block title="Running">
        {running.length === 0 ? (
          <EmptyState
            title="Nothing is running"
            body="Workflows stay off until you turn one on. Publishing and email still wait for you."
            action={<Link to="/app/automations" className="text-sm font-semibold text-signal">Review automations</Link>}
          />
        ) : (
          <ul className="space-y-2">
            {running.map((item) => (
              <li key={item.id} className="rounded-lg border border-line px-4 py-3 text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="mt-1 block text-muted">{item.trigger}</span>
              </li>
            ))}
          </ul>
        )}
      </Block>
      <Block title="Opportunities">
        <ul className="space-y-2">
          {active.profile.opportunities.map((item) => (
            <li key={item.id} className="rounded-lg border border-line px-4 py-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
              <Link to={item.href} className="mt-2 inline-flex text-sm text-signal">
                Open
              </Link>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Results">
        <dl className="grid grid-cols-2 gap-3">
          <Panel>
            <dt className="text-xs text-muted">Readiness</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{active.readiness}%</dd>
            <div className="mt-2"><Meter value={active.readiness} /></div>
          </Panel>
          <Panel>
            <dt className="text-xs text-muted">Leads</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{active.leads.length}</dd>
          </Panel>
          <Panel>
            <dt className="text-xs text-muted">Live pages</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {active.pages.filter((page) => page.status === "published").length}
            </dd>
          </Panel>
          <Panel>
            <dt className="text-xs text-muted">Executions left</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{remaining(active.balance)}</dd>
          </Panel>
        </dl>
        {active.activity[0] ? (
          <p className="mt-3 text-sm text-muted">
            Latest: {active.activity[0].message}{" "}
            <span className="whitespace-nowrap">
              {formatDistanceToNow(new Date(active.activity[0].createdAt), { addSuffix: true })}
            </span>
          </p>
        ) : null}
        <p className="mt-3 text-sm">
          Inbox has {inboxItems(active).length} open {inboxItems(active).length === 1 ? "item" : "items"}.
        </p>
      </Block>
    </div>
  );
}
