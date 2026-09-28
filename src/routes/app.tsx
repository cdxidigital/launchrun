import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { LoadingScreen, Shell } from "@/components/launch/shell";
import { Button } from "@/components/launch/ui";
import { useWorkspace } from "@/components/launch/workspace";

export const Route = createFileRoute("/app")({ component: AppLayout });

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  const workspace = useWorkspace();
  if (isPending || (user && workspace.isLoading)) return <LoadingScreen />;
  if (!user) return <RedirectToSignIn />;
  if (workspace.error) {
    const message = workspace.error instanceof Error ? workspace.error.message : "";
    if (message === "Unauthorized") return <RedirectToSignIn />;
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-6 text-center text-fg">
        <div>
          <h1 className="text-xl font-semibold">We couldn't load your business</h1>
          <p className="mt-2 text-sm text-muted">Check the connection and try again.</p>
          <Button type="button" className="mt-4" onClick={() => void workspace.refetch()}>
            Try again
          </Button>
        </div>
      </main>
    );
  }
  if (!workspace.data?.active) return <Navigate to="/start" />;
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
