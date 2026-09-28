import { createFileRoute } from "@tanstack/react-router";
import { TasksScreen } from "@/components/launch/ops-screens";

export const Route = createFileRoute("/app/tasks")({ component: TasksScreen });
