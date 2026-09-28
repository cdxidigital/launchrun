import { createFileRoute } from "@tanstack/react-router";
import { GrowthHub } from "@/components/launch/growth-screens";

export const Route = createFileRoute("/app/growth")({ component: GrowthHub });
