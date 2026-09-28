import { createFileRoute } from "@tanstack/react-router";
import { ActivityScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/activity")({ component: ActivityScreen });
