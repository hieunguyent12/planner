import TablerSearch from "~icons/tabler/search";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { ActionsBar } from "../actions-bar";
import { SemesterSelect } from "../semester-select";

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

      <Input placeholder="Search" icon={TablerSearch} />
      <div className="max-h-106 overflow-y-auto overflow-x-hidden">
        <div className="p-2">
          {/* {searchResults.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              onAddCourse={onAddCourse}
            />
          ))} */}
        </div>
      </div>
    </Container>
  );
}

export { SearchCourse };
