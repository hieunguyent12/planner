import { Dialog } from "@/components/dialog";
import { useContext } from "react";
import { AppContext } from "@/appContext";
import { UFView } from "./uf-view";
import { GuestView } from "./guest-view";

type AddCourseDialogProps = {
  isOpen: boolean;
  toggle: () => void;
  onAddCourse?: (courseCode: string) => void;
};

function AddCourseDialog({
  isOpen,
  toggle,
  onAddCourse,
}: AddCourseDialogProps) {
  const appContext = useContext(AppContext);

  return (
    <Dialog className="-translate-y-1/2" isOpen={isOpen} toggle={toggle}>
      {appContext.isUFView ? (
        <UFView toggle={toggle} onAddCourse={onAddCourse} />
      ) : (
        <GuestView toggle={toggle} onAddCourse={onAddCourse} />
      )}
    </Dialog>
  );
}

export { AddCourseDialog };
