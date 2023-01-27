type Props = {
  benefits: string[];
};

export const Benefits: React.FC<Props> = ({ benefits }) => {
  return (
    <ul className="min-w-[40%]">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-baseline gap-2">
          <div className="aspect-square h-3 w-3 rounded bg-blue-500" />
          <h3 className="text-lg font-semibold xs:text-xl md:text-2xl">
            {benefit}
          </h3>
        </li>
      ))}
    </ul>
  );
};
