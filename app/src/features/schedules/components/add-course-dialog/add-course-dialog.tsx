import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import {
  dayMap,
  DetailedCourseSectionSchema,
} from "@/features/schedules/schema";
import { cn } from "@/utils/cn";
import { useContext, useEffect, useState } from "react";
import TablerPlus from "~icons/tabler/plus";
import TablerX from "~icons/tabler/x";
import { nanoid } from "nanoid";
import { ScheduleContext } from "@/features/schedules/context";

export function AddCourseDialog({ label = "Add course" }: { label?: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div>
        <Button
          variant="outline"
          size="sm"
          className="px-2 gap-1"
          onClick={() => setIsDialogOpen(true)}
        >
          <TablerPlus className="size-4" />
          {label}
        </Button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        toggle={() => setIsDialogOpen((prev) => !prev)}
        className="p-2 min-w-[20rem] -translate-y-1/2"
      >
        <AddCourseContainer toggle={() => setIsDialogOpen((prev) => !prev)} />
      </Dialog>
    </>
  );
}

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const isDigitRegex = /^\d$/;

export function AddCourseContainer({ toggle }: { toggle: () => void }) {
  const { schedule } = useContext(ScheduleContext);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const [meetings, setMeetings] = useState<any[]>([]);

  const onCreateCourse = () => {
    const { error, data } = DetailedCourseSectionSchema.safeParse({
      id: nanoid(),
      code,
      name,
      online: isOnline,
      meetings,
      course_number: nanoid(),
      credits: credits === "VAR" ? credits : parseInt(credits),
      instructors: [],
    });

    if (error) {
      throw error;
    }

    schedule.addCourseSection(data);
    toggle();
  };

  const onCreateMeeting = () => {
    setMeetings((prevMeetings) => [
      ...prevMeetings,
      {
        id: nanoid(),
      },
    ]);
  };

  const onRemoveMeeting = (idx: number) => {
    setMeetings((prev) => prev.filter((_, i) => i !== idx));
  };

  const onUpdateMeeting = (updatedMeeting: any, idx: number) => {
    setMeetings((prev) => prev.map((m, i) => (i === idx ? updatedMeeting : m)));
  };

  return (
    <div className="overflow-y-auto max-h-150 w-80">
      <div className="mb-2">
        <p className="font-medium">Add a custom course</p>
      </div>

      <div className="space-y-2">
        <div className="flex">
          <div className="flex flex-col items-end gap-2">
            <label className="tex-sm text-nowrap mt-1">Course Name</label>
            <label className="tex-sm text-nowrap mt-2.5">Course Code</label>
            <label className="tex-sm text-nowrap mt-2.5">Credits</label>
          </div>
          <div className="flex flex-col items-start gap-2 w-full pl-2">
            <Input
              size="base"
              placeholder="Enter name..."
              className="w-full px-2 py-1"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="base"
              placeholder="Enter code..."
              className="w-full px-2 py-1"
              onChange={(e) => setCode(e.target.value)}
            />
            <Input
              size="base"
              placeholder="0, 1, 2, ... 10, or VAR (vary)"
              className="w-full px-2 py-1"
              value={credits}
              onBlur={() => {
                if (
                  credits !== "" &&
                  !isDigitRegex.test(credits) &&
                  credits !== "VAR"
                ) {
                  setCredits("VAR");
                }
              }}
              onChange={(e) => setCredits(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center mt-2 gap-2 w-full pl-12.5">
          <label className="flex items-center gap-2">
            <span>Online</span>
            <Checkbox
              value={"Online"}
              name="day"
              checked={isOnline}
              onCheckedChange={(val) => {
                setIsOnline(val);
              }}
            />
          </label>
        </div>

        <div
          className={cn("flex flex-col space-y-1", isOnline && "opacity-50")}
        >
          {meetings.length > 0 && <span>Meetings:</span>}

          <div className="space-y-2">
            {meetings.map((meeting, i) => (
              <CustomMeeting
                key={meeting.id}
                idx={i}
                meeting={meeting}
                onUpdateMeeting={(updated) => onUpdateMeeting(updated, i)}
                onRemoveMeeting={() => onRemoveMeeting(i)}
              />
            ))}
          </div>

          <Button
            onClick={onCreateMeeting}
            variant="outline"
            className="flex-1 gap-1 py-2 mt-2"
            disabled={isOnline}
          >
            <TablerPlus className="size-4" />
            Add meeting
          </Button>
        </div>

        <div className="flex items-center gap-1 mt-3">
          <Button
            onClick={toggle}
            variant="secondary"
            className="flex-1 py-2 px-3"
          >
            Cancel
          </Button>
          <Button onClick={onCreateCourse} className="flex-1 py-2 px-3 gap-1">
            <TablerPlus className="size-4" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CustomMeeting({
  idx,
  meeting,
  onUpdateMeeting,
  onRemoveMeeting,
}: {
  idx: number;
  onRemoveMeeting: () => void;
  onUpdateMeeting?: (meeting: any) => void;
  meeting: any;
}) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [startTime, setStartTime] = useState({
    hour: "",
    minute: "",
    meridiem: "AM",
  });

  const [endTime, setEndTime] = useState({
    hour: "",
    minute: "",
    meridiem: "AM",
  });

  const [location, setLocation] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    onUpdateMeeting?.({
      ...meeting,
      location: {
        building: "",
        room: "",
        display: `${location}`,
      },
      time: {
        days: selectedDays.map((day) => dayMap[day as keyof typeof dayMap]),
        start: `${startTime.hour === "" ? "8" : startTime.hour}:${
          startTime.minute === "" ? "00" : startTime.minute
        } ${startTime.meridiem}`,
        end: `${endTime.hour === "" ? "9" : endTime.hour}:${
          endTime.minute === "" ? "00" : endTime.minute
        } ${endTime.meridiem}`,
      },
    });
  }, [selectedDays, startTime, endTime, location, instructor]);

  const meridiemStyle = "bg-gray-200";

  return (
    <div className="border border-primary-border rounded-md">
      <div className="flex items-center justify-between px-2 py-1 rounded-t-md bg-blue-50">
        <span>Meeting #{idx + 1}</span>
        <Button variant="icon" onClick={onRemoveMeeting}>
          <TablerX className="size-4" />
        </Button>
      </div>

      <div className="p-2">
        <CheckboxGroup
          value={selectedDays}
          onValueChange={(val) => setSelectedDays(val)}
          className="flex-nowrap"
        >
          {days.map((day) => (
            <label
              key={day}
              className="flex flex-col items-center gap-1 text-sm flex-1"
            >
              {day}
              <Checkbox value={day} name="day" />
            </label>
          ))}
        </CheckboxGroup>

        <div className="my-3">
          <div className="flex items-center my-2 gap-2 ml-4">
            <span>Start time</span>
            <div className="flex items-center">
              <Input
                size="base"
                className="py-0.5 text-center w-8"
                placeholder="12"
                value={startTime.hour}
                onChange={(e) => {
                  if (e.target.value.length > 2) return;

                  let val = e.target.value.replace(/\D/, "");

                  if (val !== "") {
                    val = clamp(parseInt(val), 0, 12).toString();
                  }

                  setStartTime({
                    ...startTime,
                    hour: val.length <= 2 ? val : startTime.hour,
                  });
                }}
              />
              <span className="mx-1">:</span>
              <Input
                size="base"
                className="py-0.5 w-8 text-center"
                placeholder="00"
                value={startTime.minute}
                onBlur={() => {
                  if (startTime.minute.length === 1) {
                    setStartTime({
                      ...startTime,
                      minute: `0${startTime.minute}`,
                    });
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.length > 2) return;

                  let val = e.target.value.replace(/\D/, "");

                  if (val !== "") {
                    val = clamp(parseInt(val), 0, 59).toString();
                  }

                  setStartTime({
                    ...startTime,
                    minute: val.length <= 2 ? val : startTime.minute,
                  });
                }}
              />
              <div className="flex items-center cursor-pointer">
                <span
                  className={cn(
                    "ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm",
                    startTime.meridiem === "AM" && meridiemStyle
                  )}
                  onClick={() =>
                    setStartTime({
                      ...startTime,
                      meridiem: "AM",
                    })
                  }
                >
                  AM
                </span>
                <span
                  className={cn(
                    "rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none",
                    startTime.meridiem === "PM" && meridiemStyle
                  )}
                  onClick={() =>
                    setStartTime({
                      ...startTime,
                      meridiem: "PM",
                    })
                  }
                >
                  PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center my-2 gap-2 ml-5.5">
            <span>End time</span>
            <div className="flex items-center">
              <Input
                size="base"
                className="py-0.5 text-center w-8"
                placeholder="12"
                value={endTime.hour}
                onChange={(e) => {
                  if (e.target.value.length > 2) return;

                  let val = e.target.value.replace(/\D/, "");

                  if (val !== "") {
                    val = clamp(parseInt(val), 0, 12).toString();
                  }

                  setEndTime({
                    ...endTime,
                    hour: val.length <= 2 ? val : endTime.hour,
                  });
                }}
              />
              <span className="mx-1">:</span>
              <Input
                size="base"
                className="py-0.5 w-8 text-center"
                placeholder="00"
                value={endTime.minute}
                onBlur={() => {
                  if (endTime.minute.length === 1) {
                    setEndTime({
                      ...endTime,
                      minute: `0${endTime.minute}`,
                    });
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.length > 2) return;

                  let val = e.target.value.replace(/\D/, "");

                  if (val !== "") {
                    val = clamp(parseInt(val), 0, 59).toString();
                  }

                  setEndTime({
                    ...endTime,
                    minute: val.length <= 2 ? val : endTime.minute,
                  });
                }}
              />
              <div className="flex items-center cursor-pointer">
                <span
                  className={cn(
                    "ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm",
                    endTime.meridiem === "AM" && meridiemStyle
                  )}
                  onClick={() =>
                    setEndTime({
                      ...startTime,
                      meridiem: "AM",
                    })
                  }
                >
                  AM
                </span>
                <span
                  className={cn(
                    "rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none",
                    endTime.meridiem === "PM" && meridiemStyle
                  )}
                  onClick={() =>
                    setEndTime({
                      ...endTime,
                      meridiem: "PM",
                    })
                  }
                >
                  PM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center my-2 gap-2 w-full pl-6.5">
          <span>Location</span>
          <div className="flex items-center w-full">
            <Input
              size="base"
              className="py-0.5 px-1.5 w-full"
              placeholder="Optional"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center my-2 gap-2 w-full pl-4.5">
          <span>Instructor</span>
          <div className="flex items-center w-full">
            <Input
              size="base"
              className="py-0.5 px-1.5 w-full"
              placeholder="Optional"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const clamp = (val: number, min: number, max: number) => {
  if (val < min) return min;
  if (val > max) return max;

  return val;
};
