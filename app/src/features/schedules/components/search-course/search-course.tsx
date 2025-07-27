import TablerSearch from "~icons/tabler/search";
import { Input } from "@/components/input";
import { SemesterSelect } from "../semester-select";
import { SearchResults } from "./search-results";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  CoursesSchema,
  type CoursesSchemaType,
} from "@/features/schedules/schema";
import { Spinner } from "@/components/spinner";
import { FilterMenu } from "./filter-menu";
import TablerX from "~icons/tabler/x";

function SearchCourse() {
  const [results, setResults] = useState<CoursesSchemaType>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [filter, setFilter] = useState({
    fitsSchedule: {
      label: "Fits Schedule",
      state: false,
    },
  });

  useEffect(() => {
    async function searchCatalogCourse() {
      if (debouncedSearchValue !== "") {
        setIsSearching(true);

        const res = await fetch(
          `http://localhost:8080/soc/searchByCode?code=${debouncedSearchValue}`
        );

        const courses = (await res.json()).courses.map((course: any) => ({
          ...course,
          sections: JSON.parse(course.sections),
        }));

        const { error, data } = CoursesSchema.safeParse(courses);

        if (error) {
          console.log(error);
        } else {
          setResults(data);
          setIsSearching(false);
        }
      }
    }

    searchCatalogCourse();
  }, [debouncedSearchValue]);

  const filterTags = useMemo(
    () =>
      Object.keys(filter)
        .filter((filterKey) => filter[filterKey as keyof typeof filter].state)
        .map((filterKey) => (
          <div
            className="transition cursor-default m-0 text-xs rounded-sm border border-primary-border px-1 py-0.5 flex items-center opacity-85 max-w-fit gap-1"
            key={filterKey}
          >
            {filter[filterKey as keyof typeof filter].label}
            <button
              onClick={() => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  [filterKey]: {
                    ...prevFilter[filterKey as keyof typeof filter],
                    state: false,
                  },
                }));
              }}
              className="m-0 cursor-default rounded-full transition-[background-color] p-0.5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 pressed:bg-black/20 dark:pressed:bg-white/20"
            >
              <TablerX className="size-3" />
            </button>
          </div>
        )),
    [filter]
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-3 pb-1">
        <p className="text-md font-medium text-primary-foreground">
          Search Courses
        </p>
        <div className="flex items-center">
          <SemesterSelect />
        </div>
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Example: MAC2302, ACG2010"
          leftIcon={<TablerSearch />}
          rightIcon={
            <FilterMenu
              className="size-7 rounded-md hover:bg-menu-indicator"
              setFilter={setFilter}
              filter={filter}
            />
          }
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {filterTags.length > 0 && (
          <div className="flex items-start gap-2 mt-2">
            <span className="text-sm">Filters: </span>
            <div className="flex items-center flex-wrap gap-1">
              {filterTags}
            </div>
          </div>
        )}
      </div>

      {isSearching && (
        <div className="flex items-center gap-2 text-primary-foreground opacity-85 mt-3">
          <Spinner size={17} />
          <span>Searching</span>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className="my-1">{results.length} results</p>
          <div className="mt-2 max-h-[calc(100vh-278px)] overflow-y-auto ">
            <SearchResults results={results} />
          </div>
        </>
      )}
    </div>
  );
}

export { SearchCourse };
