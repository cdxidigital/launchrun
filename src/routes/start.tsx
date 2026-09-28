import { createFileRoute } from "@tanstack/react-router";
import { PathScreen } from "@/components/launch/setup-flow";

export const Route = createFileRoute("/start")({ component: PathScreen });
