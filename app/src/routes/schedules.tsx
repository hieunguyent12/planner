import { createFileRoute } from "@tanstack/react-router";
import { SearchCourse } from "@/features/schedules/search-course/search-course";
import { Container } from "@/components/container";

export const Route = createFileRoute("/schedules")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      <SearchCourse />
      <Container className="col-span-2 h-[500px]">{null}</Container>
    </div>
  );
}
