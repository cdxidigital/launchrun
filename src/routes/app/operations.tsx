import { createFileRoute } from "@tanstack/react-router";
import { OperationsHub } from "@/components/launch/ops-screens";

export const Route = createFileRoute("/app/operations")({ component: OperationsHub });
