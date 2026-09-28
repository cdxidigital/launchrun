import { createFileRoute } from "@tanstack/react-router";
import { AutomationScreen } from "@/components/launch/build-screens";

export const Route = createFileRoute("/app/automations")({ component: AutomationScreen });
