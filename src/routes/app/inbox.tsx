import { createFileRoute } from "@tanstack/react-router";
import { InboxScreen } from "@/components/launch/ops-screens";

export const Route = createFileRoute("/app/inbox")({ component: InboxScreen });
