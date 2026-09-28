import { createFileRoute } from "@tanstack/react-router";
import { BuildHub } from "@/components/launch/build-screens";

export const Route = createFileRoute("/app/build")({ component: BuildHub });
