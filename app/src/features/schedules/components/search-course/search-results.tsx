import TablerMapPin from "~icons/tabler/map-pin";
import TablerPlus from "~icons/tabler/plus";
import { Accordion } from "@/components/accordion";
import {
  DetailedCourseSectionSchema,
  type CourseSchemaType,
  type CourseSectionSchemaType,
  type CoursesSchemaType,
} from "@/features/schedules/schema";
import { useContext } from "react";
import { ScheduleContext } from "@/features/schedules/context";

function CourseSection({
  section,
  onAddSection,
}: {
  section: CourseSectionSchemaType;
  onAddSection: (section: CourseSectionSchemaType) => void;
}) {
  return (
    <div className="rounded-md p-3 pb-1 border border-primary-border bg-primary">
      <div className="relative flex gap-5 border-b-1 border-primary-border pb-3">
        <p>#{section.course_number}</p>
        <p>Credits: {section.credits}</p>
        <button
          onClick={() => {
            onAddSection(section);
          }}
          className="absolute right-0 -top-1 px-2 py-1 bg-primary text-sky-600 hover:bg-sky-50 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-2 focus:outline-none focus:ring-sky-100 font-medium rounded-md text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:text-blue-300"
        >
          <TablerPlus className="text-sm" /> Add
        </button>
      </div>

      <div className="mt-2">
        {section.online ? (
          <p>Online</p>
        ) : (
          section.meetings.map((meeting, i) => (
            <div className="space-y-1" key={i}>
              <div className="text-[15px] rounded-md">
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <p>
                      {/* how do i disable prettier for this line? */}
                      {`${meeting.time.days.join(
                        ", "
                      )}: ${meeting.time.start.toFormat(
                        "h:mm a"
                      )} - ${meeting.time.end.toFormat("h:mm a")}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TablerMapPin />
                    <span>
                      {meeting.location.building} {meeting.location.room}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="py-1 mt-2">
        <p>Instructor(s): {section.instructors.join(", ")}</p>
      </div>
    </div>
  );
}

function SearchResults({ results }: { results: CoursesSchemaType }) {
  const scheduleContext = useContext(ScheduleContext);

  const onAddSection = (
    section: CourseSectionSchemaType,
    course: CourseSchemaType
  ) => {
    // merge section with course information
    const { error, data } = DetailedCourseSectionSchema.safeParse({
      ...section,
      code: course.code,
      id: course.id,
      description: course.description,
      name: course.name,
      prerequisites: course.prerequisites,
    });

    if (error) {
      throw error;
    }

    scheduleContext.onAddSection(data);
  };

  return (
    <div className="h-full space-y-1">
      {results.map((result) => (
        <Accordion
          key={result.id}
          items={[
            {
              trigger: (
                <>
                  <div className="text-primary-foreground relative">
                    <div className="flex items-center">
                      <p className="text-primary-foreground text-sm bg-container-content-bg/25 border-1 border-primary-border rounded-md px-1 font-medium">
                        {result.code}
                      </p>
                    </div>
                    {result.name}
                  </div>
                  <TablerPlus className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
                </>
              ),
              content: (
                <div className="px-3 py-2 space-y-2">
                  {result.sections.map((section, i) => (
                    <CourseSection
                      key={i}
                      section={section}
                      onAddSection={(section) => onAddSection(section, result)}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />
      ))}
    </div>
  );
}

export { SearchResults };
