import type { Habit, HabitCompletion } from "@prisma/client";
import { addDays, format, startOfDay } from "date-fns";
import { useWindowSize } from "usehooks-ts";
import { DaySingleSquare } from "../DaySingleSquare";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
};

const days = ["S", "M", "T", "W", "T", "F", "S"];

export const DaySquares: React.FC<Props> = ({ habits, habitCompletions }) => {
  const { width } = useWindowSize();
  const closestDaysDisplayed =
    width < 440 ? 40 : width < 520 ? 60 : width < 860 ? 70 : 100;
  const squareSize =
    width < 660 ? "w-8 h-8" : width < 1200 ? "w-10 h-10" : "w-12 h-12";

  const today = startOfDay(new Date());
  const weekDay = today.getDay();
  const daysDisplayed = Math.floor(closestDaysDisplayed / 7) * 7 + 1 + weekDay;
  const allDays = Array.from({ length: daysDisplayed }, (_, i) =>
    addDays(today, i - daysDisplayed + 1)
  );

  return (
    <section className="grid-rows-7 grid grid-flow-col items-center gap-2">
      {days.map((day, i) => (
        <div
          key={day + i}
          className={`grid ${squareSize} place-items-center font-bold text-white`}
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
