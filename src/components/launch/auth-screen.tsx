import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, signIn } from "@/lib/auth/client";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button, Field, Wordmark, fieldClass } from "./ui";
import { LoadingScreen } from "./shell";

export function AuthScreen({ mode }: { mode: "signin" | "signup" }) {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";

  if (isPending) return <LoadingScreen label="Checking your session" />;
  if (user) return <RedirectToSignIn to="/app" />;

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-10 text-fg">
      <div className="w-full max-w-sm">
        <Link to="/">
          <Wordmark className="text-lg" />
        </Link>
        <h1 className="mt-6 text-xl font-semibold">{signup ? "Create your account" : "Sign in"}</h1>
        <p className="mt-1 text-sm text-muted">
          {signup
            ? "Then tell us what you want to build. No card."
            : "Use the same email you signed up with, or continue with Google or X."}
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy(true);
            setError("");
            const run = signup
              ? authClient.signUp.email({
                  name: name.trim(),
                  email: email.trim(),
                  password,
                  callbackURL: "/start",
                })
              : authClient.signIn.email({
                  email: email.trim(),
                  password,
                  callbackURL: "/app",
                });
            void run
              .then((result) => {
                if (result.error) {
                  setError(result.error.message ?? "That didn't work. Check the details and try again.");
                  setBusy(false);
                  return;
                }
                void navigate({ to: signup ? "/start" : "/app" });
              })
              .catch(() => {
                setError("That didn't work. Check the details and try again.");
                setBusy(false);
              });
          }}
        >
          {signup ? (
            <Field label="Your name">
              <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" />
            </Field>
          ) : null}
          <Field label="Email">
            <input className={fieldClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </Field>
          <Field label="Password" hint={signup ? "At least 8 characters." : undefined}>
            <input className={fieldClass} type="password" value={password} minLength={8} onChange={(event) => setPassword(event.target.value)} required autoComplete={signup ? "new-password" : "current-password"} />
          </Field>
          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Working…" : signup ? "Create account" : "Sign in"}
          </Button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-line" />
          or
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="space-y-2">
          {GROK_PROVIDERS.map((provider) => (
            <Button
              key={provider.providerId}
              type="button"
              variant="quiet"
              className="w-full"
              onClick={() => signIn(provider.providerId, { callbackURL: "/app" })}
            >
              Continue with {provider.label}
            </Button>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          {signup ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-fg underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link to="/signup" className="text-fg underline-offset-4 hover:underline">
                Create an account
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
