import { Button } from "@/components/button";
import { Input, inputStyles } from "@/components/input";
import { useState } from "react";
import TablerSearch from "~icons/tabler/search";
import TablerPlus from "~icons/tabler/plus";

export function GuestView({
  toggle,
  onAddCourse,
}: {
  toggle: () => void;
  onAddCourse?: (courseCode: string) => void;
}) {
  return (
    <>
      <div className="p-2 space-y-3 min-w-120">
        <p>Spring 2025</p>
        <div className="flex space-y-1">
          <div className="flex flex-col items-end gap-2">
            <label className="tex-sm text-nowrap mt-1">Course Name</label>
            <label className="tex-sm text-nowrap mt-2.5">Course Code</label>
            <label className="tex-sm text-nowrap mt-2.5">Credits</label>
            <label className="tex-sm text-nowrap mt-2.5">Description</label>
            <label className="tex-sm text-nowrap mt-13">Prequisites</label>
          </div>
          <div className="flex flex-col items-start gap-2 w-full pl-2">
            <Input
              size="base"
              placeholder="Enter name..."
              className="w-full px-2 py-1"
              //   onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="base"
              placeholder="Enter code..."
              className="w-full px-2 py-1"
              //   onChange={(e) => setCode(e.target.value)}
            />
            <Input
              size="base"
              placeholder="0, 1, 2, ... 10, or VAR (vary)"
              className="w-full px-2 py-1"
            />
            <textarea className={`${inputStyles()} w-full mt-2`} />
            <textarea className={`${inputStyles()} w-full mt-2`} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 p-2">
        <Button
          onClick={toggle}
          variant="secondary"
          className="flex-1 py-2 px-3"
        >
          Cancel
        </Button>
        <Button onClick={() => {}} className="flex-1 py-2 px-3 gap-1">
          <TablerPlus className="size-4" />
          Create
        </Button>
      </div>
      {/* <div className="flex gap-4 justify-between p-2">
        <button
          className="p-2 cursor-pointer text-red-400 hover:bg-slate-100 rounded-md"
          onClick={toggle}
        >
          Cancel
        </button>
      </div> */}
    </>
  );
}
