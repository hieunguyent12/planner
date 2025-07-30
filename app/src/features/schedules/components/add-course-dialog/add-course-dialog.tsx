import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { useState } from "react";
import TablerPlus from "~icons/tabler/plus";
import TablerX from "~icons/tabler/x";

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

export function AddCourseContainer({ toggle }: { toggle: () => void }) {
  const [meetings, setMeetings] = useState([]);

  return (
    <div className="overflow-y-auto max-h-150">
      <div className="mb-2">
        <p className="font-medium">Add a custom course</p>
      </div>

      <div className="space-y-2">
        <div className="flex">
          <div className="flex flex-col items-end gap-2">
            <label className="tex-sm text-nowrap mt-1">Course Name</label>
            <label className="tex-sm text-nowrap mt-2.5">Course Code</label>
          </div>
          <div className="flex flex-col items-start gap-2 w-full pl-2">
            <Input
              size="base"
              placeholder="Enter name..."
              className="w-full px-2 py-1"
            />
            <Input
              size="base"
              placeholder="Enter code..."
              className="w-full px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <span>Meetings:</span>

          <div className="border border-primary-border rounded-md">
            <div className="flex items-center justify-between px-2 py-1 rounded-t-md bg-blue-50">
              <span>Meeting #1</span>
              <TablerX className="size-4" />
            </div>

            <div className="p-2">
              <CheckboxGroup>
                {days.map((day) => (
                  <label
                    key={day}
                    className="flex flex-col items-center gap-1 text-sm"
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
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="12"
                    />
                    <span className="mx-1">:</span>
                    <Input
                      size="base"
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="00"
                    />
                    <div className="flex items-center">
                      <span className="ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm">
                        AM
                      </span>
                      <span className="rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none">
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
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="12"
                    />
                    <span className="mx-1">:</span>
                    <Input
                      size="base"
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="00"
                    />
                    <div className="flex items-center">
                      <span className="ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm">
                        AM
                      </span>
                      <span className="rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none">
                        PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-2 gap-2 w-full pl-10">
                {/* <span className="text-nowrap">Course Type</span> */}
                <label className="flex items-center gap-2">
                  Online
                  <Checkbox value={"Online"} name="day" />
                </label>
              </div>

              <div className="flex items-center my-2 gap-2 w-full pl-6.5">
                <span>Location</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex items-center my-2 gap-2 w-full pl-4.5">
                <span>Instructor</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex items-center mt-2 gap-2 w-full">
                <span className="text-nowrap">Course Type</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-primary-border rounded-md mt-1">
            <div className="flex items-center justify-between px-2 py-1 rounded-t-md bg-blue-50">
              <span>Meeting #2</span>
              <TablerX className="size-4" />
            </div>

            <div className="p-2">
              <CheckboxGroup>
                {days.map((day) => (
                  <label
                    key={day}
                    className="flex flex-col items-center gap-1 text-sm"
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
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="12"
                    />
                    <span className="mx-1">:</span>
                    <Input
                      size="base"
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="00"
                    />
                    <div className="flex items-center">
                      <span className="ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm">
                        AM
                      </span>
                      <span className="rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none">
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
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="12"
                    />
                    <span className="mx-1">:</span>
                    <Input
                      size="base"
                      className="py-0.5 pl-1.5 w-8"
                      placeholder="00"
                    />
                    <div className="flex items-center">
                      <span className="ml-2 rounded-md border border-primary-border rounded-r-none py-1 px-2 text-sm">
                        AM
                      </span>
                      <span className="rounded-md border border-primary-border border-l-0 py-1 px-2 text-sm rounded-l-none">
                        PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-2 gap-2 w-full pl-10">
                {/* <span className="text-nowrap">Course Type</span> */}
                <label className="flex items-center gap-2">
                  Online
                  <Checkbox value={"Online"} name="day" />
                </label>
              </div>

              <div className="flex items-center my-2 gap-2 w-full pl-6.5">
                <span>Location</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex items-center my-2 gap-2 w-full pl-4.5">
                <span>Instructor</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex items-center mt-2 gap-2 w-full">
                <span className="text-nowrap">Course Type</span>
                <div className="flex items-center w-full">
                  <Input
                    size="base"
                    className="py-0.5 pl-1.5 w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="flex-1 gap-1 py-2 mt-2">
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
          <Button className="flex-1 py-2 px-3 gap-1">
            <TablerPlus className="size-4" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
