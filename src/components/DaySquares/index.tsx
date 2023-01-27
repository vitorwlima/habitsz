import type { Habit, HabitCompletion } from "@prisma/client";
import { format } from "date-fns";
import { DaySingleSquare } from "../DaySingleSquare";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  allDays: Date[];
  squareSize: string;
};

const days = ["S", "M", "T", "W", "T", "F", "S"];

export const DaySquares: React.FC<Props> = ({
  habits,
  habitCompletions,
  allDays,
  squareSize,
}) => {
  return (
    <section className="grid-rows-7 grid grid-flow-col items-center gap-2">
      {days.map((day, i) => (
        <div
          key={day + i}
          className={`grid ${squareSize} place-items-center text-xl font-bold text-neutral-100`}
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
        return (
          <DaySingleSquare
            key={day.toString()}
            date={day}
            habits={currDayHabits}
            habitCompletions={currDayCompletions}
            squareSize={squareSize}
            quadrant={quadrant}
          />
        );
      })}
    </section>
  );
};
