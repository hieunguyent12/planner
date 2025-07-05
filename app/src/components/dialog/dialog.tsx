import { cn } from "@/utilts/cn";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  className?: string;
};

// https://base-ui.com/react/components/dialog
const Dialog = ({ isOpen, toggle, children, className }: ModalProps) => {
  return (
    <BaseDialog.Root open={isOpen} onOpenChange={toggle}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
        <BaseDialog.Popup
          initialFocus={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 -mt-8 max-w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary text-primary-foreground outline-1 outline-primary-border transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            className
          )}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};

export { Dialog };
