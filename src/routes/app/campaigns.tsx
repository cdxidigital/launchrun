import { createFileRoute } from "@tanstack/react-router";
import { CampaignScreen } from "@/components/launch/growth-screens";

export const Route = createFileRoute("/app/campaigns")({ component: CampaignScreen });
