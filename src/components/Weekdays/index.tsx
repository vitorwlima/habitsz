import clsx from "clsx";

type Props = {
  weekdays: string;
};

const allWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Weekdays: React.FC<Props> = ({ weekdays }) => {
  return (
    <div className="flex items-center gap-2">
      {allWeekdays.map((weekday) => {
        const isActive = weekdays.includes(weekday);

        return (
          <div
            key={weekday}
            className="flex flex-col items-center justify-center"
          >
            <div
              className={clsx("h-4 w-4 rounded-md border", {
                "border-green-500 bg-green-500": isActive,
                "border-zinc-700": !isActive,
              })}
            />
            <span>{weekday}</span>
          </div>
        );
      })}
    </div>
  );
};
