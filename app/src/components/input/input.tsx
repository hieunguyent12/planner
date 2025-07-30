import { tv, type VariantProps } from "tailwind-variants";
import "./styles.css";
import { useId, useRef, type ComponentType, type SVGProps } from "react";
import { cn } from "@/utils/cn";

const input = tv({
  base: "input",
  variants: {
    size: {
      base: "",
      sm: "py-1.5",
      md: "py-2 px-2",
      lg: "py-3",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// https://www.material-tailwind.com/docs/html/input V2.3.2
function Input({ className, size, leftIcon, rightIcon, ...props }: InputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative flex items-center w-full">
      {leftIcon && (
        <div
          onClick={() => inputRef.current?.focus()}
          className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-400 dark:text-gray-400"
        >
          {leftIcon}
        </div>
      )}

      <input
        id={inputId}
        className={cn(
          "peer",
          input({
            size,
            className: cn(className, leftIcon && "pl-9", rightIcon && "pr-9"),
          })
        )}
        {...props}
        ref={inputRef}
      />

      {rightIcon && (
        <div className="absolute right-1.5 text-slate-400 dark:text-gray-400">
          {rightIcon}
        </div>
      )}

      {/* <label
          htmlFor={inputId}
          className={cn(
            "bg-white dark:bg-menu left-2.5 top-2.5 px-1 text-sm text-slate-400 dark:text-gray-400 cursor-text absolute transition-[top,left,scale] transform origin-left peer-focus:text-sky-600 select-none",
            value === "" &&
              "peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-88",
            value !== "" && "-top-2 left-2.5 text-xs text-slate-400 scale-88"
          )}
        >
          Type Here...
        </label> */}
    </div>
  );
}

export { Input };
