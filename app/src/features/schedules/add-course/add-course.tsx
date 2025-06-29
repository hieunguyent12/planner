import TablerSearch from "~icons/tabler/search";

import { Input } from "@/components/input";

function AddCourse() {
  return (
    <div className="bg-menu inline-block rounded-md shadow shadow-gray-200 p-2">
      <p className="text-md pb-2 font-medium text-primary-foreground">
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
    </div>
  );
}

export { AddCourse };
