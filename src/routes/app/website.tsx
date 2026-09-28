import { createFileRoute } from "@tanstack/react-router";
import { WebsiteScreen } from "@/components/launch/build-screens";

export const Route = createFileRoute("/app/website")({ component: WebsiteScreen });
