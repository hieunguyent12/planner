import TablerPlus from "~icons/tabler/plus";

type SearchResultProps = {
  result: any;
  onAddCourse?: (courseCode: string) => void;
};

const SearchResult = ({ result, onAddCourse }: SearchResultProps) => {
  return (
    <div className="flex justify-between items-center relative border border-primary-border rounded-md mb-2">
      <div className="p-2">
        <div className="flex justify-between gap-2 mb-1 items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm bg-orange-100 rounded-md px-1 font-medium">
              {result.code}
            </p>
            <p className="text-sm">3 Credits</p>
            <p className="text-sm opacity-50 select-none">|</p>
            <p className="text-xs">Last offered in Fall 2025</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <button className="text-xs rounded-md p1">Visit UF Catalog</button>
            {/* <span>
              <ExternalLink width={"13px"} />
            </span> */}
          </div>
        </div>
        <p className="my-1">{result.name}</p>
        <p className="text-sm mb-5 w-[80%]">
          Prereqs: (ACG 3101 and ACG 3401 with minimum grades of C) and QMB 3250
          and (MAC 2234 or MAC 2312).
        </p>
      </div>
      <div className="absolute bottom-1 right-1 flex gap-2 items-center">
        <button
          onClick={() => onAddCourse?.(result.code)}
          className="px-2 py-1 bg-primary text-sky-600 hover:bg-sky-50 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-2 focus:outline-none focus:ring-sky-100 font-medium rounded-md text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:text-blue-300 cursor-pointer"
        >
          <TablerPlus className="text-sm" /> Add
        </button>
      </div>
    </div>
  );
};

export { SearchResult };
