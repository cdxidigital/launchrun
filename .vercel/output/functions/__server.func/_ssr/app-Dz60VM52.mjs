import { g as Outlet, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as useCurrentUserState, n as Button } from "./ui-BVcXVmeN.mjs";
import { i as useWorkspace } from "./workspace-aavTzbjY.mjs";
import { t as RedirectToSignIn } from "./gates-DcqIjAwS.mjs";
import { n as Shell, t as LoadingScreen } from "./shell-ol0ix04Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-Dz60VM52.js
var import_jsx_runtime = require_jsx_runtime();
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	const workspace = useWorkspace();
	if (isPending || user && workspace.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (workspace.error) {
		if ((workspace.error instanceof Error ? workspace.error.message : "") === "Unauthorized") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "grid min-h-screen place-items-center bg-ink px-6 text-center text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "We couldn't load your business"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Check the connection and try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-4",
					onClick: () => void workspace.refetch(),
					children: "Try again"
				})
			] })
		});
	}
	if (!workspace.data?.active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/start" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
