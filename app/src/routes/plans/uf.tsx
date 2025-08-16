import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plans/uf")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/plans/uf"!</div>;
}
