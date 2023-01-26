import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

export type InputProps = ComponentProps<"input"> & { error?: boolean };
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={clsx(
            error
              ? "border-red-300 pr-10 text-red-300 focus:border-red-400"
              : "border-transparent pr-0 text-neutral-100 focus:border-neutral-800",
            "w-full appearance-none rounded border-2  bg-neutral-600 py-2 px-4 leading-tight  placeholder:text-neutral-300  focus:outline-none"
          )}
          id={id}
          ref={ref}
          {...props}
        />
        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-200"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
