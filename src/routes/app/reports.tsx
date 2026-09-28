import { createFileRoute } from "@tanstack/react-router";
import { ReportsScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/reports")({ component: ReportsScreen });
