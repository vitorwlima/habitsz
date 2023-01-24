import type { Habit, HabitCompletion } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";
import { useWindowSize } from "usehooks-ts";
import { AddNewHabit } from "../AddNewHabit";
import { DaySquares } from "../DaySquares";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
};

export const Habits: React.FC<Props> = ({ habits, habitCompletions }) => {
  const { width } = useWindowSize();
  const closestDaysDisplayed =
    width < 440 ? 40 : width < 520 ? 60 : width < 860 ? 70 : 100;
  const squareSize =
    width < 660 ? "w-8 h-8" : width < 1200 ? "w-10 h-10" : "w-12 h-12";

  const today = startOfDay(new Date());
  const weekDay = today.getDay();
  const daysDisplayed = Math.floor(closestDaysDisplayed / 7) * 7 + 1 + weekDay;
  const weeksDisplayed = Math.ceil(daysDisplayed / 7);
  const allDays = Array.from({ length: daysDisplayed }, (_, i) =>
    addDays(today, i - daysDisplayed + 1)
  );

  return (
    <section className="flex h-full w-full flex-col justify-center">
      <header className="flex items-center justify-between">
        <span className="font-bold">Last {weeksDisplayed} weeks</span>

        <AddNewHabit />
      </header>

      <div className="mx-auto mt-16">
        <DaySquares
          habits={habits}
          habitCompletions={habitCompletions}
          allDays={allDays}
          squareSize={squareSize}
        />
      </div>
    </section>
  );
};
