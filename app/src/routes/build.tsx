import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/build")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/build"!</div>;
}
