import type { InPersonCourseSection } from "@/features/schedules/schedule";
import { useState } from "react";
import TablerAlertCircleFilled from "~icons/tabler/alert-circle-filled";

export function useAddCourseError() {
  const [errorAddingSection, setErrorAddingSection] = useState<{
    reason: "duplicate" | "conflict";
    conflicts?: InPersonCourseSection[];
  } | null>(null);

  return { errorAddingSection, setErrorAddingSection };
}

export function AddCourseError({
  reason,
  conflicts,
}: {
  reason?: "duplicate" | "conflict";
  conflicts?: InPersonCourseSection[] | undefined;
}) {
  if (!reason) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 text-red-500">
        <TablerAlertCircleFilled />
        <p className="text-lg font-medium">Unable to add course</p>
      </div>
      <p>
        Reason:{" "}
        {reason === "duplicate"
          ? `Duplicate course section found in schedule.`
          : `Time conflicts with other sections.`}
      </p>

      {reason === "conflict" && (
        <div>
          <p>Conflicting sections: </p>
          {conflicts?.map((section) => (
            <div key={section.id}>
              <p className="underline">{section.code}:</p>
              {section.meetings.map((meeting, i) => (
                <p key={i}>
                  {/* how do i disable prettier for this line? */}
                  {`${meeting.time.days.join(
                    ", "
                  )}: ${meeting.time.start.toFormat(
                    "h:mm a"
                  )} - ${meeting.time.end.toFormat("h:mm a")}`}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
