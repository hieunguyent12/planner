import TablerSearch from "~icons/tabler/search";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { ActionsBar } from "../actions-bar";

function AddCourse() {
  return (
    <Container>
      <div className="border-b-1 border-gray-100 dark:border-neutral-700 pb-2">
        <ActionsBar />
      </div>

      <p className="text-md pb-2 font-medium text-primary-foreground mt-2">
        Search Courses
      </p>

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

export { AddCourse };
