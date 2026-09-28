import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { P as statusLabel } from "./domain-DOC0tJs4.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BVcXVmeN.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function cn(...values) {
	return twMerge(clsx(values));
}
function Wordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("font-semibold tracking-tight text-fg", className),
		children: [
			"launch",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-action",
				children: "/"
			}),
			"run"
		]
	});
}
var buttonStyles = {
	primary: "bg-action text-action-ink hover:brightness-105",
	quiet: "border border-line bg-transparent text-fg hover:bg-raised",
	danger: "bg-danger text-on-danger hover:brightness-110",
	ghost: "bg-transparent text-muted hover:bg-raised hover:text-fg"
};
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50", buttonStyles[variant], className),
		...props
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block",
				children
			})
		]
	});
}
var fieldClass = "w-full rounded-md border border-line bg-ink px-3 py-3 text-base text-fg outline-none placeholder:text-muted";
function PageHeader({ title, detail, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				suppressHydrationWarning: true,
				children: title
			}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: detail
			}) : null]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
function Block({ title, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-semibold tracking-wide text-muted uppercase",
				children: title
			}), action]
		}), children]
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-lg border border-line bg-panel p-4", className),
		children
	});
}
var dots = {
	not_started: "bg-muted",
	needs_setup: "bg-signal",
	ready: "bg-info",
	running: "bg-action",
	needs_attention: "bg-danger",
	complete: "bg-action"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 rounded-full border border-line bg-raised px-2.5 py-1 text-xs text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-1.5 rounded-full", dots[status]),
			"aria-hidden": true
		}), statusLabel(status)]
	});
}
function EmptyState({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-line px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-md text-sm text-muted",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
			}) : null
		]
	});
}
function Estimate({ units, cost = "A$0" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "grid grid-cols-2 gap-3 rounded-md border border-line bg-ink p-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: "Estimated work"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "font-medium tabular-nums",
			children: [
				units,
				" ",
				units === 1 ? "execution" : "executions"
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: "External cost"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium tabular-nums",
			children: cost
		})] })]
	});
}
function ConfirmDialog({ open, onOpenChange, title, body, confirm, onConfirm, busy, danger, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-panel p-5 shadow-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-sm text-muted",
					children: body
				}),
				children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							type: "button",
							children: "Cancel"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: danger ? "danger" : "primary",
						disabled: busy,
						onClick: onConfirm,
						children: busy ? "Working…" : confirm
					})]
				})
			]
		})] })
	});
}
function Meter({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-raised",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-action",
			style: { width: `${Math.max(0, Math.min(100, value))}%` }
		})
	});
}
//#endregion
export { Estimate as a, PageHeader as c, Wordmark as d, cn as f, useCurrentUserState as h, EmptyState as i, Panel as l, useCurrentUser as m, Button as n, Field as o, fieldClass as p, ConfirmDialog as r, Meter as s, Block as t, StatusBadge as u };
