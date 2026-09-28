import { createFileRoute } from "@tanstack/react-router";
import { AudienceScreen } from "@/components/launch/business-screens";

export const Route = createFileRoute("/app/audience")({ component: AudienceScreen });
