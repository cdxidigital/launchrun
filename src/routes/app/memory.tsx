import { createFileRoute } from "@tanstack/react-router";
import { MemoryScreen } from "@/components/launch/business-screens";

export const Route = createFileRoute("/app/memory")({ component: MemoryScreen });
