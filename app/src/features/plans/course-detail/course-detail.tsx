import TablerExternalLink from "~icons/tabler/external-link";
import { Select, SelectItem } from "@/components/select";

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
            indicator={<CheckIcon className="size-3" />}
          />
          <SelectItem
            value="light"
            text="Light"
            indicator={<CheckIcon className="size-3" />}
          />
          <SelectItem
            value="system"
            text="System"
            indicator={<CheckIcon className="size-3" />}
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

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

export { CourseDetails };
