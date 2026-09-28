import { createFileRoute } from "@tanstack/react-router";
import { OfferScreen } from "@/components/launch/business-screens";

export const Route = createFileRoute("/app/offer")({ component: OfferScreen });
