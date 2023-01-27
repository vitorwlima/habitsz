import { format } from "date-fns";
import { trpc } from "../../utils/trpc";
import { DaySingleSquare } from "../DaySingleSquare";

type Props = {
  allDays: Date[];
  squareSize: string;
};

const days = ["S", "M", "T", "W", "T", "F", "S"];

export const DaySquares: React.FC<Props> = ({ allDays, squareSize }) => {
  const { data: habits = [] } = trpc.habit.getAll.useQuery();
  const { data: habitCompletions = [] } =
    trpc.habit.getAllCompletions.useQuery();

  return (
    <section className="grid-rows-7 grid grid-flow-col items-center gap-2">
      {days.map((day, i) => (
        <div
          key={day + i}
          className={`${squareSize} grid place-items-center text-xl font-bold text-neutral-100`}
        >
          <span>{day}</span>
        </div>
      ))}
      {allDays.map((day, index) => {
        const currDayHabits = habits.filter((habit) =>
          habit.frequency.split(",").includes(format(day, "eee"))
        );
        const currDayCompletions = habitCompletions.filter(
          (habitCompletion) =>
            habitCompletion.date === format(day, "yyyy-MM-dd")
        );
        const quadrant: {
          x: "left" | "right";
          y: "top" | "bottom";
        } = {
          x: index < allDays.length / 2 ? "left" : "right",
          y: index % 7 < 3 ? "top" : "bottom",
        };
        const isToday =
          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
        return (
          <DaySingleSquare
            key={day.toString()}
            date={day}
            habits={currDayHabits}
            habitCompletions={currDayCompletions}
            squareSize={squareSize}
            quadrant={quadrant}
            isToday={isToday}
          />
        );
      })}
    </section>
  );
};
