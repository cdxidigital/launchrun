import { createFileRoute } from "@tanstack/react-router";
import { CrmScreen } from "@/components/launch/growth-screens";

export const Route = createFileRoute("/app/crm")({ component: CrmScreen });
