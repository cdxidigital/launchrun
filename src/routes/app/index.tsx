import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "@/components/launch/home-screen";

export const Route = createFileRoute("/app/")({ component: HomeScreen });
