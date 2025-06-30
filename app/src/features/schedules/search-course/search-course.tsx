import TablerSearch from "~icons/tabler/search";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { ActionsBar } from "../actions-bar";
import { SemesterSelect } from "../semester-select";
import { SearchResult } from "./search-result";

function SearchCourse() {
  return (
    <Container className="w-[400px]">
      <div className="border-b-1 border-gray-100 dark:border-neutral-700 pb-2">
        <ActionsBar />
      </div>

      <div className="flex items-center justify-between mt-3 pb-1">
        <p className="text-md font-medium text-primary-foreground">
          Search Courses
        </p>
        <div className="flex items-center">
          <SemesterSelect />
        </div>
      </div>

      <div className="space-y-1">
        <Input placeholder="Search" icon={TablerSearch} />
        <p className="text-xs text-slate-400 dark:text-gray-400">
          Example: MAC2302, ACG2010
        </p>
      </div>

      <div className="mt-5">
        <SearchResult />
      </div>
    </Container>
  );
}

export { SearchCourse };
