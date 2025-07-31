import { tv } from "tailwind-variants";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "icon"
    | "skeleton"
    | "outline";
  size?: "sm" | "md" | "lg" | "auto";
  className?: string;
}

export const button = tv({
  base: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium focus:outline-none disabled:cursor-not-allowed",
  variants: {
    variant: {
      skeleton: "",
      primary:
        "bg-blue-400 hover:bg-button-primary-hover pressed:bg-button-primary-pressed text-white",
      secondary:
        "bg-gray-200 hover:bg-button-secondary-hover pressed:bg-button-secondary-pressed text-gray-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 dark:text-zinc-100",
      danger:
        "bg-red-400 hover:bg-button-danger-hover pressed:bg-button-danger-pressed text-white",
      outline: "border-1 border-primary-border text-primary-foreground",
      icon: "border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent",
    },
    isDisabled: {
      true: "cursor-not-allowed bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5",
    },
    size: {
      auto: "",
      sm: "p-1 text-sm",
      md: "p-1 text-sm",
      lg: "p-2 text-base",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={button({
        variant: props.variant,
        size: props.size,
        className: props.className,
      })}
    />
  );
}
