import { Command } from "cmdk";
import {
  Bell,
  Building2,
  Hammer,
  Home,
  LineChart,
  Menu,
  Search,
  Settings,
  Sprout,
  Workflow,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import * as Popover from "@radix-ui/react-popover";
import { UserButton } from "@/lib/auth/gates";
import { greeting, remaining, statusSentence } from "@/lib/launch/domain";
import { cn } from "@/lib/cn";
import { useWorkspace } from "./workspace";
import { Wordmark } from "./ui";

const NAV = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/business", label: "Business", icon: Building2 },
  { to: "/app/build", label: "Build", icon: Hammer },
  { to: "/app/growth", label: "Growth", icon: Sprout },
  { to: "/app/operations", label: "Operations", icon: Workflow },
  { to: "/app/reports", label: "Reports", icon: LineChart },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

const JUMPS = [
  { to: "/app", label: "Home" },
  { to: "/app/business", label: "Business map" },
  { to: "/app/offer", label: "Offer" },
  { to: "/app/audience", label: "Audience" },
  { to: "/app/brand", label: "Brand" },
  { to: "/app/memory", label: "Business memory" },
  { to: "/app/build", label: "Build" },
  { to: "/app/website", label: "Launch page" },
  { to: "/app/automations", label: "Automations" },
  { to: "/app/growth", label: "Growth" },
  { to: "/app/leads", label: "Leads" },
  { to: "/app/crm", label: "Contacts" },
  { to: "/app/campaigns", label: "Campaigns" },
  { to: "/app/content", label: "Content queue" },
  { to: "/app/operations", label: "Operations" },
  { to: "/app/inbox", label: "Inbox" },
  { to: "/app/payments", label: "Payments" },
  { to: "/app/tasks", label: "Tasks" },
  { to: "/app/reports", label: "Reports" },
  { to: "/app/activity", label: "Activity" },
  { to: "/app/approvals", label: "Approvals" },
  { to: "/app/settings", label: "Settings" },
  { to: "/app/billing", label: "Billing" },
  { to: "/app/permissions", label: "Permissions" },
  { to: "/app/crew", label: "AI crew" },
] as const;

function usePath() {
  return useRouterState({ select: (state) => state.location.pathname });
}

function activeNav(path: string, to: string, exact?: boolean) {
  if (exact) return path === to;
  if (to === "/app/business") {
    return ["/app/business", "/app/offer", "/app/audience", "/app/brand", "/app/memory"].some(
      (item) => path === item || path.startsWith(item),
    );
  }
  if (to === "/app/build") return ["/app/build", "/app/website", "/app/automations"].includes(path);
  if (to === "/app/growth") return ["/app/growth", "/app/leads", "/app/crm", "/app/campaigns", "/app/content"].includes(path);
  if (to === "/app/operations") return ["/app/operations", "/app/inbox", "/app/payments", "/app/tasks"].includes(path);
  if (to === "/app/settings") {
    return ["/app/settings", "/app/billing", "/app/permissions", "/app/crew", "/app/activity"].includes(path);
  }
  return path === to;
}

export function Shell({ children }: { children: ReactNode }) {
  const path = usePath();
  const navigate = useNavigate();
  const query = useWorkspace();
  const active = query.data?.active;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hello, setHello] = useState("Welcome");

  useEffect(() => {
    if (active) setHello(greeting(new Date(), active.name));
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const waiting = active?.approvals.filter((item) => item.status === "waiting").length ?? 0;
  const running = active?.workflows.filter((item) => item.status === "running").length ?? 0;
  const left = active ? remaining(active.balance) : 0;

  return (
    <div className="min-h-screen bg-ink text-fg lg:grid lg:grid-cols-[15rem_1fr]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-panel focus:px-3 focus:py-2">
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-panel lg:flex">
        <div className="px-4 py-5">
          <Link to="/app" className="text-base">
            <Wordmark />
          </Link>
          {active ? (
            <p className="mt-3 truncate text-sm text-muted" title={active.name}>
              {active.name}
            </p>
          ) : null}
        </div>
        <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = activeNav(path, item.to, "exact" in item ? item.exact : false);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm",
                  on ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-3 text-sm">
          <p className="mb-2 text-xs text-muted tabular-nums">{left} executions left</p>
          <div className="account-slot">
            <UserButton />
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-line glass px-4 py-3">
          <Link to="/app" className="lg:hidden">
            <Wordmark />
          </Link>
          <p className="hidden min-w-0 flex-1 truncate text-sm text-muted lg:block" suppressHydrationWarning>
            {active
              ? statusSentence({ readiness: active.readiness, waiting, running })
              : hello}
          </p>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg"
              aria-label="Search the workspace"
              onClick={() => setOpen(true)}
            >
              <Search className="size-4" aria-hidden />
            </button>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  type="button"
                  className="relative inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg"
                  aria-label={waiting ? `${waiting} waiting on you` : "Notifications"}
                >
                  <Bell className="size-4" aria-hidden />
                  {waiting > 0 ? (
                    <span className="absolute top-2 right-2 grid min-w-4 place-items-center rounded-full bg-danger px-1 text-xs text-on-danger">
                      {waiting}
                    </span>
                  ) : null}
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  className="z-40 w-80 rounded-lg border border-line bg-panel p-3"
                >
                  <p className="text-sm font-semibold">Waiting on you</p>
                  {waiting === 0 ? (
                    <p className="mt-2 text-sm text-muted">Nothing needs a decision.</p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {active?.approvals
                        .filter((item) => item.status === "waiting")
                        .slice(0, 4)
                        .map((item) => (
                          <li key={item.id} className="text-sm">
                            <Link to="/app/approvals" className="hover:underline">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                  <Link to="/app/activity" className="mt-3 inline-block text-sm text-signal">
                    View activity
                  </Link>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised lg:hidden"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu((value) => !value)}
            >
              <Menu className="size-4" aria-hidden />
            </button>
          </div>
        </header>
        {menu ? (
          <nav aria-label="More" className="border-b border-line bg-panel px-3 py-2 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenu(false)}
                className="flex min-h-11 items-center rounded-md px-2 text-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="account-slot px-2 py-2">
              <UserButton />
            </div>
          </nav>
        ) : null}
        <main id="main" className="mx-auto w-full max-w-3xl px-4 pt-6 pb-28 lg:pb-12">
          {children}
        </main>
      </div>
      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-panel lg:hidden"
      >
        {NAV.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const on = activeNav(path, item.to, "exact" in item ? item.exact : false);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-xs",
                on ? "text-action" : "text-muted",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {item.label === "Operations" ? "Ops" : item.label}
            </Link>
          );
        })}
      </nav>
      {open ? (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Jump to"
          className="fixed top-[15%] left-1/2 z-50 w-[min(100%-2rem,32rem)] -translate-x-1/2 rounded-lg border border-line bg-panel p-2"
        >
          <Command.Input
            placeholder="Jump to…"
            className="w-full border-b border-line bg-transparent px-3 py-3 text-base outline-none"
          />
          <Command.List className="max-h-80 overflow-auto py-2">
            <Command.Empty className="px-3 py-4 text-sm text-muted">No matching place.</Command.Empty>
            {JUMPS.map((item) => (
              <Command.Item
                key={item.to}
                value={item.label}
                onSelect={() => {
                  setOpen(false);
                  void navigate({ to: item.to });
                }}
                className="cursor-pointer rounded-md px-3 py-3 text-sm aria-selected:bg-raised"
              >
                {item.label}
              </Command.Item>
            ))}
          </Command.List>
        </Command.Dialog>
      ) : null}
      {open ? <button type="button" aria-label="Close search" className="fixed inset-0 z-40 bg-ink/70" onClick={() => setOpen(false)} /> : null}
    </div>
  );
}

export function LoadingScreen({ label = "Loading your business" }: { label?: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-6 text-fg">
      <div className="w-full max-w-sm">
        <Wordmark />
        <p className="mt-4 text-sm text-muted">{label}</p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-action" />
        </div>
      </div>
    </div>
  );
}
