import { cn } from "@/lib";
import type { ButtonProps } from "./types";

export const Button = ({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "shrink-0 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-[13px] font-bold hover:bg-orange-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed ",
        className,
      )}
    >
      {children}
    </button>
  );
};
