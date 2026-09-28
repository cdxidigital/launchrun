import { createFileRoute } from "@tanstack/react-router";
import { LeadsScreen } from "@/components/launch/growth-screens";

export const Route = createFileRoute("/app/leads")({ component: LeadsScreen });
