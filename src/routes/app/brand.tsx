import { createFileRoute } from "@tanstack/react-router";
import { BrandScreen } from "@/components/launch/business-screens";

export const Route = createFileRoute("/app/brand")({ component: BrandScreen });
