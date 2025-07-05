import { tv, type VariantProps } from "tailwind-variants";
import "./styles.css";
import {
  useId,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { cn } from "@/utilts/cn";

const input = tv({
  base: "input",
  variants: {
    size: {
      sm: "py-1.5 px-3",
      md: "py-2 pr-3 pl-9",
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
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

// https://www.material-tailwind.com/docs/html/input V2.3.2
function Input({ className, size, icon, ...props }: InputProps) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const Icon = icon;

  return (
    <div className="w-full min-w-[200px]">
      <div className="relative">
        {Icon && (
          <Icon
            onClick={() => inputRef.current?.focus()}
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-400 dark:text-gray-400"
          />
        )}

        <input
          id={inputId}
          className={cn("peer input", input({ className, size }))}
          {...props}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
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
    </div>
  );
}

export { Input };
