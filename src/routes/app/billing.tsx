import { createFileRoute } from "@tanstack/react-router";
import { BillingScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/billing")({ component: BillingScreen });
