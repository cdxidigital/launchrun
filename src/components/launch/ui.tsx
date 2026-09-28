import * as Dialog from "@radix-ui/react-dialog";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { statusLabel, type ModuleStatus } from "@/lib/launch/domain";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-tight text-fg", className)}>
      launch<span className="text-action">/</span>run
    </span>
  );
}

const buttonStyles = {
  primary: "bg-action text-action-ink hover:brightness-105",
  quiet: "border border-line bg-transparent text-fg hover:bg-raised",
  danger: "bg-danger text-on-danger hover:brightness-110",
  ghost: "bg-transparent text-muted hover:bg-raised hover:text-fg",
} as const;

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof buttonStyles }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-fg">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export const fieldClass =
  "w-full rounded-md border border-line bg-ink px-3 py-3 text-base text-fg outline-none placeholder:text-muted";

export function PageHeader({
  title,
  detail,
  action,
}: {
  title: string;
  detail?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight" suppressHydrationWarning>{title}</h1>
        {detail ? <p className="mt-1 max-w-2xl text-sm text-muted">{detail}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

export function Block({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-xs font-semibold tracking-wide text-muted uppercase">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-line bg-panel p-4", className)}>{children}</div>
  );
}

const dots: Record<ModuleStatus, string> = {
  not_started: "bg-muted",
  needs_setup: "bg-signal",
  ready: "bg-info",
  running: "bg-action",
  needs_attention: "bg-danger",
  complete: "bg-action",
};

export function StatusBadge({ status }: { status: ModuleStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-2.5 py-1 text-xs text-fg">
      <span className={cn("size-1.5 rounded-full", dots[status])} aria-hidden />
      {statusLabel(status)}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-line px-4 py-8">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Estimate({ units, cost = "A$0" }: { units: number; cost?: string }) {
  return (
    <dl className="grid grid-cols-2 gap-3 rounded-md border border-line bg-ink p-3 text-sm">
      <div>
        <dt className="text-muted">Estimated work</dt>
        <dd className="font-medium tabular-nums">
          {units} {units === 1 ? "execution" : "executions"}
        </dd>
      </div>
      <div>
        <dt className="text-muted">External cost</dt>
        <dd className="font-medium tabular-nums">{cost}</dd>
      </div>
    </dl>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  body,
  confirm,
  onConfirm,
  busy,
  danger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  confirm: string;
  onConfirm: () => void;
  busy?: boolean;
  danger?: boolean;
  children?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-panel p-5 shadow-none">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted">{body}</Dialog.Description>
          {children ? <div className="mt-4">{children}</div> : null}
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="quiet" type="button">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="button" variant={danger ? "danger" : "primary"} disabled={busy} onClick={onConfirm}>
              {busy ? "Working…" : confirm}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Meter({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-raised" role="presentation">
      <div className="h-full rounded-full bg-action" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
