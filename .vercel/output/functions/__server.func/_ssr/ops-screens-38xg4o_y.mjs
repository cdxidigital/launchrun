import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as setTaskStatus, S as saveTask, m as recordPayment } from "./router-Dd3uoXY6.mjs";
import { O as money, T as inboxItems } from "./domain-DOC0tJs4.mjs";
import { c as PageHeader, i as EmptyState, n as Button, o as Field, p as fieldClass, r as ConfirmDialog } from "./ui-BVcXVmeN.mjs";
import { n as useActive, r as useMutate, t as canEdit } from "./workspace-aavTzbjY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops-screens-38xg4o_y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OperationsHub() {
	const active = useActive();
	if (!active) return null;
	const inbox = inboxItems(active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Operations",
		detail: "The work of running the business, in plain language.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/inbox",
			className: "inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink",
			children: inbox.length ? `Open inbox (${inbox.length})` : "Open inbox"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inbox" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/inbox",
					className: "text-signal",
					children: "Open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Tasks · ",
					active.tasks.filter((task) => task.status === "open").length,
					" open"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/tasks",
					className: "text-signal",
					children: "Open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/payments",
					className: "text-signal",
					children: "Open"
				})]
			})
		]
	})] });
}
function InboxScreen() {
	const active = useActive();
	if (!active) return null;
	const items = inboxItems(active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Inbox",
		detail: "New leads, saved replies, and decisions that need you."
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Inbox is clear",
			body: "New leads and replies that need a decision will land here. Nothing is hiding in a bot list."
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 divide-y divide-line rounded-lg border border-line",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.href,
				className: "text-sm font-medium hover:underline",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-3 text-sm text-muted",
				children: item.detail
			})]
		}, item.id))
	})] });
}
function TasksScreen() {
	const active = useActive();
	const save = useMutate(saveTask);
	const set = useMutate(setTaskStatus);
	const [title, setTitle] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)("");
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Tasks",
			detail: "Work you, or a workflow, still need to finish."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6 space-y-3",
			onSubmit: (event) => {
				event.preventDefault();
				save.mutate({
					businessId: active.id,
					title,
					detail
				}, { onSuccess: () => {
					setTitle("");
					setDetail("");
				} });
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Task",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: title,
						onChange: (event) => setTitle(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Detail",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: detail,
						onChange: (event) => setDetail(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !canEdit(active.role) || save.isPending,
					children: "Add task"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-2",
			children: active.tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-3 rounded-lg border border-line px-3 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-4",
					checked: task.status === "done",
					"aria-label": `Mark ${task.title} done`,
					disabled: !canEdit(active.role),
					onChange: () => set.mutate({
						businessId: active.id,
						taskId: task.id,
						status: task.status === "done" ? "open" : "done"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: task.status === "done" ? "text-muted line-through" : "font-medium",
					children: task.title
				}), task.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: task.detail
				}) : null] })]
			}, task.id))
		})
	] });
}
function PaymentsScreen() {
	const active = useActive();
	const save = useMutate(recordPayment);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	if (!active) return null;
	const total = active.payments.reduce((sum, item) => sum + item.amountCents, 0);
	const payments = active.integrations.find((item) => item.name === "Payments");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Payments",
			detail: "Money you record yourself. Card charging and payouts are not connected.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canEdit(active.role, "admin"),
				onClick: () => setOpen(true),
				children: "Record a payment"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-2xl font-semibold tabular-nums",
			children: money(total)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Recorded on this business. Not a bank balance."
		}),
		payments ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Payments integration: ",
				payments.status === "details_saved" ? "A note is saved. Still not connected." : "Not connected.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/settings",
					className: "text-signal",
					children: "Add a note in settings"
				})
			]
		}) : null,
		active.payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No payments recorded",
				body: "When a customer pays you outside this app, you can note it here. Nothing is charged from launch/run."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line rounded-lg border border-line text-sm",
			children: active.payments.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: money(item.amountCents)
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open,
			onOpenChange: setOpen,
			title: "Record a payment",
			body: "This is a note for your records. It does not charge a card or move money.",
			confirm: "Record",
			busy: save.isPending,
			onConfirm: () => save.mutate({
				businessId: active.id,
				label,
				amount
			}, { onSuccess: () => {
				setOpen(false);
				setLabel("");
				setAmount("");
			} }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What was it",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: label,
						onChange: (event) => setLabel(event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Amount in AUD",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						inputMode: "decimal",
						value: amount,
						onChange: (event) => setAmount(event.target.value)
					})
				})]
			})
		})
	] });
}
//#endregion
export { TasksScreen as i, OperationsHub as n, PaymentsScreen as r, InboxScreen as t };
