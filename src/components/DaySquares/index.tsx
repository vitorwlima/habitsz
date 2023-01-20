import type { Habit, HabitCompletion } from "@prisma/client";
import { addDays, format } from "date-fns";
import { DaySingleSquare } from "../DaySingleSquare";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
};

const days = ["S", "M", "T", "W", "T", "F", "S"];

const closestDaysDisplayed = 70;

export const DaySquares: React.FC<Props> = ({ habits, habitCompletions }) => {
  const today = new Date();
  const weekDay = today.getDay();
  const daysDisplayed = Math.floor(closestDaysDisplayed / 7) * 7 + 1 + weekDay;
  const allDays = Array.from({ length: daysDisplayed }, (_, i) =>
    addDays(today, i - daysDisplayed + 1)
  );

  return (
    <section className="grid-rows-7 grid grid-flow-col grid-cols-11 items-center gap-2">
      {days.map((day, i) => (
        <div
          key={day + i}
          className="grid h-12 w-12 place-items-center font-bold text-blue-200"
        >
          <span>{day}</span>
        </div>
      ))}
      {allDays.map((day) => {
        const currDayHabits = habits.filter((habit) =>
          habit.frequency.split(";").includes(format(day, "eee"))
        );
        const currDayCompletions = habitCompletions.filter(
          (habitCompletion) =>
            habitCompletion.date === format(day, "yyyy-MM-dd")
        );
        return (
          <DaySingleSquare
            key={day.toString()}
            date={day}
            habits={currDayHabits}
            habitCompletions={currDayCompletions}
          />
        );
      })}
    </section>
  );
};
