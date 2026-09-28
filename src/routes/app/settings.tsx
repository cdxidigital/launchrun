import { createFileRoute } from "@tanstack/react-router";
import { SettingsScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/settings")({ component: SettingsScreen });
