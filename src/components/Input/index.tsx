import type { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
};

export const Input: React.FC<Props> = ({ name, label, ...rest }) => {
  return (
    <div>
      <label
        className="mb-2 block pr-4 font-semibold text-neutral-100"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="w-full appearance-none rounded border-2 border-transparent bg-neutral-600 py-2 px-4 leading-tight text-neutral-100 placeholder:text-neutral-300 focus:border-neutral-800 focus:outline-none"
        id={name}
        type="text"
        {...rest}
      />
    </div>
  );
};
