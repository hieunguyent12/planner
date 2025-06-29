import { cn } from "@/utilts/cn";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-menu inline-block rounded-md shadow shadow-gray-200 dark:shadow-none p-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Container };
