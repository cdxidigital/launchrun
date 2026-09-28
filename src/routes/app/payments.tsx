import { createFileRoute } from "@tanstack/react-router";
import { PaymentsScreen } from "@/components/launch/ops-screens";

export const Route = createFileRoute("/app/payments")({ component: PaymentsScreen });
