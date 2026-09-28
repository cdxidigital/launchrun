import { createFileRoute } from "@tanstack/react-router";
import { CrewScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/crew")({ component: CrewScreen });
