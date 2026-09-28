import { createFileRoute } from "@tanstack/react-router";
import { PermissionsScreen } from "@/components/launch/system-screens";

export const Route = createFileRoute("/app/permissions")({ component: PermissionsScreen });
