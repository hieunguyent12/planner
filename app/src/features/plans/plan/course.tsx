import type { Course as TCourse } from "@/types";
import TablerTrash from "~icons/tabler/trash";

type CourseProps = {
  course: TCourse;
  selectCourse: () => void;
};

const Course = ({ course, selectCourse }: CourseProps) => {
  return (
    <div
      className="group bg-primary border border-primary-border px-2 py-2 rounded-md cursor-pointer hover:bg-primary-hover text-primary-foreground"
      onClick={selectCourse}
    >
      <div className="relative flex items-center justify-between">
        <p className="text-sm">{course.code}</p>
        <div className="absolute -right-1 p-1 invisible text-primary-foreground opacity-55 group-hover:visible hover:bg-gray-300 rounded-md">
          <TablerTrash />
        </div>
      </div>

      <p>{course.name}</p>
    </div>
  );
};

export { Course };
