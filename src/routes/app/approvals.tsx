import { createFileRoute } from "@tanstack/react-router";
import { ApprovalsScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/approvals")({ component: ApprovalsScreen });
