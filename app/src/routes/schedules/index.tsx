import { createFileRoute, useLocation } from "@tanstack/react-router";
import { SchedulesPage } from "@/features/schedules/components/schedules-page";

export const Route = createFileRoute("/schedules/")({
  validateSearch: (
    search: Record<string, unknown>
  ): { fullscreen?: number } => {
    return {
      fullscreen: Number.isInteger(search?.fullscreen)
        ? Number(search.fullscreen)
        : undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { fullscreen } = Route.useSearch();

  return <SchedulesPage fullscreen={fullscreen} />;
}
