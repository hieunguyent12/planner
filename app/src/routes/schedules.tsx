import { createFileRoute } from "@tanstack/react-router";
import { AddCourse } from "@/features/schedules/add-course/add-course";

export const Route = createFileRoute("/schedules")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <AddCourse />
      <div className="w-full bg-menu col-span-2"></div>
    </div>
  );
}
