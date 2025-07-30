import TablerExternalLink from "~icons/tabler/external-link";
import { Select, SelectItem } from "@/components/select";
import TablerCheck from "~icons/tabler/check";

const CourseDetails = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="p-2 rounded-md flex flex-col space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="">MAC2313</p>
        <div className="flex items-center gap-2">
          <p className="">3 credits</p>
          <p className="opacity-50 select-none">|</p>
          <div className="flex items-center gap-1">
            <p>
              Last offered in <span className="underline">Fall 2025</span>
            </p>
            <TablerExternalLink />
          </div>
        </div>
      </div>
      <p className="text-lg my-1 font-semibold">Calculus 3</p>
      <p>
        Examination of the accounting information systems in a business
        organization. Coverage extends over topics such as business processes,
        internal controls, and the fundamentals of accounting information
        systems analysis, design, implementation and control.
      </p>
      <p>
        <span className="underline">Prereqs:</span> (ACG 3101 and ACG 3401 with
        minimum grades of C) and QMB 3250 and (MAC 2234 or MAC 2312).
      </p>

      <div className="flex justify-between items-center gap-4 py-2">
        <Select
          placeholder={"aa"}
          defaultValue={"test"}
          className="h-8 w-40 text-base"
          popUpClassname="shadow-none"
        >
          <SelectItem
            value="dark"
            text="Dark"
            indicator={<TablerCheck className="size-3" />}
          />
          <SelectItem
            value="light"
            text="Light"
            indicator={<TablerCheck className="size-3" />}
          />
          <SelectItem
            value="system"
            text="System"
            indicator={<TablerCheck className="size-3" />}
          />
        </Select>
        <div className="flex justify-end gap-2">
          <button className="inline-flex items-center gap-2 p-2 cursor-pointer text-primary-foreground hover:bg-primary-hover rounded-md">
            <TablerExternalLink /> Visit on UF catalog
          </button>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer text-red-400 hover:bg-primary-hover rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { CourseDetails };
