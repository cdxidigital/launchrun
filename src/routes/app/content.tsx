import { createFileRoute } from "@tanstack/react-router";
import { ContentScreen } from "@/components/launch/growth-screens";

export const Route = createFileRoute("/app/content")({ component: ContentScreen });
