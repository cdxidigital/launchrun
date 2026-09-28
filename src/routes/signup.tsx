import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/components/launch/auth-screen";

export const Route = createFileRoute("/signup")({
  component: () => <AuthScreen mode="signup" />,
});
