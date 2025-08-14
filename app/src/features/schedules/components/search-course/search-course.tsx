import TablerSearch from "~icons/tabler/search";
import { Input } from "@/components/input";
import { SemesterSelect } from "../semester-select";
import { SearchResults } from "./search-results";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Spinner } from "@/components/spinner";
import { FilterMenu } from "./filter-menu";
import TablerX from "~icons/tabler/x";
import { ScheduleContext } from "@/features/schedules/context";
import { Button } from "@/components/button";
import TablerPlus from "~icons/tabler/plus";
import { useQuery } from "@tanstack/react-query";
import TablerAlertCircleFilled from "~icons/tabler/alert-circle-filled";
import { AddCourseDialog } from "@/features/schedules/components/add-course-dialog";

function SearchCourse() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { schedule } = useContext(ScheduleContext);

  // https://github.com/TanStack/query/discussions/2141
  const searchQuery = useQuery({
    queryKey: ["searchResults", debouncedSearchValue],
    queryFn: () => schedule.fetchCourseSections(debouncedSearchValue),
    enabled: !!debouncedSearchValue,
    staleTime: Infinity, // prevents refetching
    retry: 1,
  });

  const [filter, setFilter] = useState({
    fitsSchedule: {
      label: "Fits Schedule",
      state: false,
    },
  });

  // reset search state when switching between different schedules
  useEffect(() => {
    setSearchValue("");
  }, [schedule]);

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

  const renderResultContainer = () => {
    if (searchValue == "") return null;

    if (searchQuery.error || searchQuery.isLoadingError || searchQuery.isError)
      return (
        <div className="mt-2 space-y-2 flex flex-col items-center">
          <div className="flex items-center gap-1 text-red-500">
            <TablerAlertCircleFilled />
            <p className="font-medium">There was an error fetching courses.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-primary-foreground">
              In the meantime, you can add courses manually.
            </span>
            <div className="flex justify-center">
              <AddCourseDialog label="Add course" />
            </div>
          </div>
        </div>
      );

    if (searchQuery.isLoading) {
      return (
        <div className="flex items-center gap-2 text-primary-foreground opacity-85 mt-3">
          <Spinner size={17} />
          <span>Searching...</span>
        </div>
      );
    }

    if (!searchQuery.data) return null;

    if (searchQuery.data && searchQuery.data.length === 0) {
      return (
        <div className="mt-2 space-y-2 flex flex-col items-center">
          <p>No courses found matching your search.</p>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-primary-foreground">
              Can't find your course?
            </span>
            <Button variant="outline" size="sm" className="px-2 gap-1">
              <TablerPlus className="size-4" />
              Add it manually
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between text-primary-foreground">
          <p className="my-1">{searchQuery.data.length} results</p>
          <button
            onClick={() => {
              setSearchValue("");
            }}
            className="mr-2"
          >
            Clear
          </button>
        </div>
        <div className="mt-2 max-h-[calc(100vh-278px)] overflow-y-auto scrollbar">
          <SearchResults results={searchQuery.data} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between w-full h-[92%]">
      <div>
        <div className="flex items-center justify-between pb-1">
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
            value={searchValue}
            className="w-full"
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
        {renderResultContainer()}
      </div>
    </div>
  );
}

export { SearchCourse };
