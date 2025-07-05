import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import type { Course } from "@/types";
import { useState } from "react";
import { SearchResult } from "./search-result";
import TablerSearch from "~icons/tabler/search";

type SearchProps = {
  isOpen: boolean;
  toggle: () => void;
  onAddCourse?: (courseCode: string) => void;
};

function AddCourseDialog({ isOpen, toggle, onAddCourse }: SearchProps) {
  const [searchResults] = useState<Course[]>([
    {
      id: "1",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "2",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "3",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "5",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "4",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "8",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
    {
      id: "7",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
  ]);

  return (
    <Dialog isOpen={isOpen} toggle={toggle}>
      <>
        <div className="p-2 space-y-3">
          <p>Spring 2025</p>
          <div className="space-y-1">
            <Input
              className="w-full"
              placeholder="Search"
              icon={TablerSearch}
            />
            <p className="text-xs text-gray-400">Example: MAC2302, ACG2010</p>
          </div>
        </div>
        <div className="max-h-106 overflow-y-auto overflow-x-hidden">
          <div className="pl-2">
            <p className="text-sm">3 Results</p>
          </div>
          <div className="p-2">
            {searchResults.map((result) => (
              <SearchResult
                key={result.id}
                result={result}
                onAddCourse={onAddCourse}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-between p-2">
          <p className="text-sm w-[80%]">
            NOTE: Not all courses will be offered for the semester you have
            chosen. Make sure you check its availability on ONE.UF before your
            registration time!
          </p>
          <button
            className="p-2 cursor-pointer text-red-400 hover:bg-slate-100 rounded-md"
            onClick={toggle}
          >
            Cancel
          </button>
        </div>
      </>
    </Dialog>
  );
}

export { AddCourseDialog };
