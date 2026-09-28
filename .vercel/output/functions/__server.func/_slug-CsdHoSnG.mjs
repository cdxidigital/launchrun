import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Route$1 } from "./_ssr/router-Dd3uoXY6.mjs";
import { n as ToolCanvas, t as SiteCanvas } from "./_ssr/site-canvas-DSaCnQ5k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CsdHoSnG.js
var import_jsx_runtime = require_jsx_runtime();
function PublicPage() {
	const data = Route$1.useLoaderData();
	if (!data.found) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ink px-6 text-center text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "This page is not live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "It may still be a draft, or the link is wrong."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-flex text-sm text-signal",
				children: "launch/run"
			})
		] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen",
		style: { background: "transparent" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site min-h-screen",
			"data-direction": data.direction,
			children: [data.kind === "tool" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-xl px-4 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCanvas, {
					name: data.businessName,
					tool: data.meta.tool === "enquiry" ? "enquiry" : "calculator",
					packages: data.meta.packages ?? [],
					slug: data.slug
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteCanvas, {
				name: data.businessName,
				direction: data.direction,
				sections: data.sections,
				slug: data.slug,
				interactive: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "px-4 py-6 text-center text-xs",
				style: { color: "var(--site-muted)" },
				children: "launch/run"
			})]
		})
	});
}
//#endregion
export { PublicPage as component };
