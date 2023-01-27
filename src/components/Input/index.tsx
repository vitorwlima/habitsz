import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef, type ComponentProps } from "react";

type Props = ComponentProps<"input"> & { error?: boolean };

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={clsx(
            "w-full appearance-none rounded-xl  bg-zinc-800 p-4  placeholder:text-neutral-300 focus:outline-none focus-visible:ring-2",
            {
              "pr-10 text-red-300 focus-visible:ring-red-400": error,
              "pr-0 text-neutral-100 focus-visible:ring-white focus-visible:ring-opacity-75":
                !error,
            }
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
