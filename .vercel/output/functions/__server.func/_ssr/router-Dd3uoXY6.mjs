import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as useRouter, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { F as object, M as literal, P as number, R as string, z as union } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-C6dyoQy0.mjs";
import { n as auth } from "./server-DY6amCW5.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-D13IDgYp.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ece14037ac8b911c68f75e1378ea7e414da9e263641867bceac03ac8e1d3b56c"));
var saveDraft = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fc63eb289a45dd8ab3b21d9f6148541c5743d74d63156b15f4cc4c97e820eaf1"));
var createFromSetup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a1f8f5bb5008ef8ef09c21e6c6a73921da6e5aabb15f62a4131de7f7d1dfe26c"));
var dismissWelcome = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("9c20604e3992f4b57042c13878e6511d60c7cb938d3798368c334fe50eeaa156"));
var updateOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("c6a297b5699420554b492b9b22b5a386960a58de99a8cba6bf0dd473d8f6ef2e"));
var updateAudience = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("10749297baf159c4750c3dbc59fc9f960e7e4cb6a853a10314b9f2414818266f"));
var updateBrand = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6fc04560af7517dc3cc4c09d1eea3e46b22a0aaa430bc57256802ad4808149bb"));
var updateMemory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("c55ba37bcff6b15b5bb51c2bea5fe068a63354ced32d828b517847f410b34b54"));
var updateAutonomy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fb1f4c73c7b3c2ca7eb41608c2d034df392896616718441a85a97b994298d0a0"));
var updatePolicies = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7b8c7a4ef4e2f63774ca42e8c5350a3ac86dd881b77c0cd9ed7b50c5668363fa"));
var saveWebsite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e1f3c616aab6914284602fa0850b44b36dda478285d5bb2a4150fae058103039"));
var requestPublish = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("5620c446b13196060aaa6469a99367a34d079f1093faaa5c2d68c7319dc7189f"));
var saveApprovalDraft = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("8012d79566eb91eaa6541c8bd1bbdce90b01e81bb0d1220570102a4d7a0b4d08"));
var decideApproval = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7b4da126ccd4f1c71d78af44318584d687f31a0548607ae71c73faf966bdf1bd"));
var setWorkflow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("79ec3e7b3d681781a977682ec24cbc70c258bbe85e5af75fa4980d8d34814126"));
var addLead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e2de97bfa19258a4a6784922c9a4ff10cdf273889b147ba78039bf649f34446c"));
var updateLead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("79d450c2f5ec3468d00ddfad373c0d3f0ff73c875de3ab45684cbe8bb8852cc3"));
var saveCampaign = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("0868c39ac50d50b970e13633e9c38b3ebfad2bdf4a735885025947f9d1c20f56"));
var draftContent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d3baf4dfd6b6de261064f76b8fda67f265c85988d5799c1f87bb9342990384bb"));
var setContentStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("8c51ae86258d8d43f81e43bbb3eb540a2bd4f4a76895ba868f872675bb34256c"));
var saveTask = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d648b8aef3a7b79d9fc1e6e50fb695185a74031d8218277b7ab47d3059663d79"));
var setTaskStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("cb415715de81f9bb7a00fd423603c31d357ff9ff065050ab50783e94d404a48e"));
var recordPayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6b12667a3a8f9c10bf41fd5308cf98d2fe55b3703dcee33599baf56fde158e16"));
var setPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("9aa572bcd3277f3e8631925af961aa2180f01252ea72d76d005b409de98590ae"));
var addTopup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d93d868db1122b5d09d24fcbbf26557ec09c8c907a6d5246d8022b589c7355e4"));
var switchBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("37fb5ba47b13688402cd8ff946eeb12d992bbc854046cfc285f16fc37b2078f2"));
var inviteMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("9564d7d94357242864fe8bf671920d4a5e2e18beefbfa0af96f96080d461c15e"));
var saveIntegrationNote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a0b93366242b380f4bef45c9bfe828da69241ebdbe6eaaac1976ab95510d408a"));
var saveExperiment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("ad74440bc20e80bc7cf4c6499221ff2dac7e2b173078dc33f25c3e9b526c2e6d"));
var requestService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("70eceb2bcb1b82204cdad2e06ca11864aaeb6521814fb0174fc6948ca5396f5f"));
var improveCopy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("f09d45c56ae088e58c841f16ec3c17a6cef926c0bbe8f6ba247e2b2010dff690"));
var createTool = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("14d35683673872f89648745bd8420e0ddb3413cf7581755fec834a2fcf415bc4"));
var getPublished = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("25c6e70dc9d211a045e137eff5ea0a0fd685fa546bdcb60d90a4817d8dc746d8"));
var captureLead = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("52e132b72a99003e89ac69f1f4313b5075573a53cb4690dbb73a95848345b328"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dd3uoXY6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-ink px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DBsQ1F21.css";
var APP_NAME = "launch/run";
var Route$33 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Build the business. Run the business. Stay in control."
			},
			{
				name: "theme-color",
				content: "#0B0D10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		retry: 1,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$31 = () => import("./routes-BHgolZ5H.mjs");
var Route$32 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./app-Dz60VM52.mjs");
var Route$31 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
var $$splitComponentImporter$29 = () => import("./login-0Mm_MHaU.mjs");
var Route$30 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./setup-COwgtNUz.mjs");
var Route$29 = createFileRoute("/setup")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./signup-DyUjyCFP.mjs");
var Route$28 = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./start-CjSQMaEP.mjs");
var Route$27 = createFileRoute("/start")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./app-t4j0X6fr.mjs");
var Route$26 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./activity-Cfk0DKvv.mjs");
var Route$25 = createFileRoute("/app/activity")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./approvals-BEOUbGmG.mjs");
var Route$24 = createFileRoute("/app/approvals")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./audience-DuTzTcGl.mjs");
var Route$23 = createFileRoute("/app/audience")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./automations-DxwxbFc9.mjs");
var Route$22 = createFileRoute("/app/automations")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./billing-CUZBD82n.mjs");
var Route$21 = createFileRoute("/app/billing")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./brand-DlNe135Y.mjs");
var Route$20 = createFileRoute("/app/brand")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./build-6RIHLawp.mjs");
var Route$19 = createFileRoute("/app/build")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./business-8hyarxwP.mjs");
var Route$18 = createFileRoute("/app/business")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./campaigns-egFf7zz7.mjs");
var Route$17 = createFileRoute("/app/campaigns")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./content-BzQPT1q6.mjs");
var Route$16 = createFileRoute("/app/content")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./crew-CYiWF6kQ.mjs");
var Route$15 = createFileRoute("/app/crew")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./crm-CoiJDYJu.mjs");
var Route$14 = createFileRoute("/app/crm")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./growth-BnE6YXlL.mjs");
var Route$13 = createFileRoute("/app/growth")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./inbox-Dxs0kCNG.mjs");
var Route$12 = createFileRoute("/app/inbox")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./leads-BYnByhlO.mjs");
var Route$11 = createFileRoute("/app/leads")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./memory-Crl-02yQ.mjs");
var Route$10 = createFileRoute("/app/memory")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./offer-CKhEEE9x.mjs");
var Route$9 = createFileRoute("/app/offer")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./operations-DnRdvrVl.mjs");
var Route$8 = createFileRoute("/app/operations")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./payments-D5kF4jWj.mjs");
var Route$7 = createFileRoute("/app/payments")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./permissions-DtXh6lLf.mjs");
var Route$6 = createFileRoute("/app/permissions")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./reports-g9rUofmF.mjs");
var Route$5 = createFileRoute("/app/reports")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./settings-BFGkQ6Ev.mjs");
var Route$4 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./tasks-Vq-RBvL2.mjs");
var Route$3 = createFileRoute("/app/tasks")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./website-D2583p8L.mjs");
var Route$2 = createFileRoute("/app/website")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_slug-CsdHoSnG.mjs");
var Route$1 = createFileRoute("/p/$slug")({
	loader: ({ params }) => getPublished({ data: { slug: params.slug } }),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData?.found ? loaderData.businessName : "Page not found" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$32.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$33
});
var AppRoute = Route$31.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$33
});
var LoginRoute = Route$30.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$33
});
var SetupRoute = Route$29.update({
	id: "/setup",
	path: "/setup",
	getParentRoute: () => Route$33
});
var SignupRoute = Route$28.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$33
});
var StartRoute = Route$27.update({
	id: "/start",
	path: "/start",
	getParentRoute: () => Route$33
});
var AppIndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppActivityRoute = Route$25.update({
	id: "/activity",
	path: "/activity",
	getParentRoute: () => AppRoute
});
var AppApprovalsRoute = Route$24.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => AppRoute
});
var AppAudienceRoute = Route$23.update({
	id: "/audience",
	path: "/audience",
	getParentRoute: () => AppRoute
});
var AppAutomationsRoute = Route$22.update({
	id: "/automations",
	path: "/automations",
	getParentRoute: () => AppRoute
});
var AppBillingRoute = Route$21.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => AppRoute
});
var AppBrandRoute = Route$20.update({
	id: "/brand",
	path: "/brand",
	getParentRoute: () => AppRoute
});
var AppBuildRoute = Route$19.update({
	id: "/build",
	path: "/build",
	getParentRoute: () => AppRoute
});
var AppBusinessRoute = Route$18.update({
	id: "/business",
	path: "/business",
	getParentRoute: () => AppRoute
});
var AppCampaignsRoute = Route$17.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => AppRoute
});
var AppContentRoute = Route$16.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => AppRoute
});
var AppCrewRoute = Route$15.update({
	id: "/crew",
	path: "/crew",
	getParentRoute: () => AppRoute
});
var AppCrmRoute = Route$14.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => AppRoute
});
var AppGrowthRoute = Route$13.update({
	id: "/growth",
	path: "/growth",
	getParentRoute: () => AppRoute
});
var AppInboxRoute = Route$12.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => AppRoute
});
var AppLeadsRoute = Route$11.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => AppRoute
});
var AppMemoryRoute = Route$10.update({
	id: "/memory",
	path: "/memory",
	getParentRoute: () => AppRoute
});
var AppOfferRoute = Route$9.update({
	id: "/offer",
	path: "/offer",
	getParentRoute: () => AppRoute
});
var AppOperationsRoute = Route$8.update({
	id: "/operations",
	path: "/operations",
	getParentRoute: () => AppRoute
});
var AppPaymentsRoute = Route$7.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AppRoute
});
var AppPermissionsRoute = Route$6.update({
	id: "/permissions",
	path: "/permissions",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$5.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppTasksRoute = Route$3.update({
	id: "/tasks",
	path: "/tasks",
	getParentRoute: () => AppRoute
});
var AppWebsiteRoute = Route$2.update({
	id: "/website",
	path: "/website",
	getParentRoute: () => AppRoute
});
var PSlugRoute = Route$1.update({
	id: "/p/$slug",
	path: "/p/$slug",
	getParentRoute: () => Route$33
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$33
});
var AppRouteChildren = {
	AppActivityRoute,
	AppApprovalsRoute,
	AppAudienceRoute,
	AppAutomationsRoute,
	AppBillingRoute,
	AppBrandRoute,
	AppBuildRoute,
	AppBusinessRoute,
	AppCampaignsRoute,
	AppContentRoute,
	AppCrewRoute,
	AppCrmRoute,
	AppGrowthRoute,
	AppInboxRoute,
	AppLeadsRoute,
	AppMemoryRoute,
	AppOfferRoute,
	AppOperationsRoute,
	AppPaymentsRoute,
	AppPermissionsRoute,
	AppReportsRoute,
	AppSettingsRoute,
	AppTasksRoute,
	AppWebsiteRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	SetupRoute,
	SignupRoute,
	StartRoute,
	PSlugRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$33._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { updateAutonomy as A, saveWebsite as C, setWorkflow as D, setTaskStatus as E, updatePolicies as F, updateLead as M, updateMemory as N, switchBusiness as O, updateOffer as P, saveTask as S, setPlan as T, saveApprovalDraft as _, captureLead as a, saveExperiment as b, decideApproval as c, getWorkspace as d, improveCopy as f, requestService as g, requestPublish as h, addTopup as i, updateBrand as j, updateAudience as k, dismissWelcome as l, recordPayment as m, Route$1 as n, createFromSetup as o, inviteMember as p, addLead as r, createTool as s, router_exports as t, draftContent as u, saveCampaign as v, setContentStatus as w, saveIntegrationNote as x, saveDraft as y };
