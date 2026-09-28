import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useNavigate, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-DY6amCW5.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { d as Wordmark, h as useCurrentUserState, n as Button, o as Field, p as fieldClass } from "./ui-BVcXVmeN.mjs";
import { t as RedirectToSignIn } from "./gates-DcqIjAwS.mjs";
import { t as LoadingScreen } from "./shell-ol0ix04Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-screen-DSSW4K3C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthScreen({ mode }) {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const signup = mode === "signup";
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { label: "Checking your session" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/app" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ink px-4 py-10 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { className: "text-lg" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-xl font-semibold",
					children: signup ? "Create your account" : "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: signup ? "Then tell us what you want to build. No card." : "Use the same email you signed up with, or continue with Google or X."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit: (event) => {
						event.preventDefault();
						setBusy(true);
						setError("");
						(signup ? authClient.signUp.email({
							name: name.trim(),
							email: email.trim(),
							password,
							callbackURL: "/start"
						}) : authClient.signIn.email({
							email: email.trim(),
							password,
							callbackURL: "/app"
						})).then((result) => {
							if (result.error) {
								setError(result.error.message ?? "That didn't work. Check the details and try again.");
								setBusy(false);
								return;
							}
							navigate({ to: signup ? "/start" : "/app" });
						}).catch(() => {
							setError("That didn't work. Check the details and try again.");
							setBusy(false);
						});
					},
					children: [
						signup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Your name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: name,
								onChange: (event) => setName(event.target.value),
								required: true,
								autoComplete: "name"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true,
								autoComplete: "email"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							hint: signup ? "At least 8 characters." : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								type: "password",
								value: password,
								minLength: 8,
								onChange: (event) => setPassword(event.target.value),
								required: true,
								autoComplete: signup ? "new-password" : "current-password"
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: busy,
							children: busy ? "Working…" : signup ? "Create account" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
						"or",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "quiet",
						className: "w-full",
						onClick: () => signIn(provider.providerId, { callbackURL: "/app" }),
						children: ["Continue with ", provider.label]
					}, provider.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: signup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-fg underline-offset-4 hover:underline",
							children: "Sign in"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"New here?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							className: "text-fg underline-offset-4 hover:underline",
							children: "Create an account"
						})
					] })
				})
			]
		})
	});
}
//#endregion
export { AuthScreen as t };
