import { createFileRoute } from "@tanstack/react-router";
import { SetupScreen } from "@/components/launch/setup-flow";

export const Route = createFileRoute("/setup")({ component: SetupScreen });
