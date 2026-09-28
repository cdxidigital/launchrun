import { createFileRoute } from "@tanstack/react-router";
import { MapScreen } from "@/components/launch/business-screens";

export const Route = createFileRoute("/app/business")({ component: MapScreen });
