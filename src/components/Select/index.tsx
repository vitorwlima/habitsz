import ReactSelect from "react-select";
import type { Props as ReactSelectProps } from "react-select";

type Props = ReactSelectProps & {
  label: string;
};

export const Select: React.FC<Props> = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-1 block pr-4 font-semibold text-gray-500">
        {label}
      </label>
      <ReactSelect
        maxMenuHeight={120}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral0: "#E5E7EB",
            neutral20: "#E5E7EB",
          },
        })}
        {...props}
      />
    </div>
  );
};
