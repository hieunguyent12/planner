import { cn } from "@/utilts/cn";

function ActionItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-1 hover:text-gray-500 dark:hover:text-menu-foreground-hover hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export { ActionItem };
