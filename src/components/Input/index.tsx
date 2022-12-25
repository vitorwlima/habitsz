import type { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
};

export const Input: React.FC<Props> = ({ name, label, ...rest }) => {
  return (
    <div>
      <label
        className="mb-1 block pr-4 font-semibold text-gray-500"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        id={name}
        type="text"
        {...rest}
      />
    </div>
  );
};
