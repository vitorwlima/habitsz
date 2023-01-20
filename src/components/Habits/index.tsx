import type { Habit, HabitCompletion } from "@prisma/client";
import { AddNewHabit } from "../AddNewHabit";
import { DaySquares } from "../DaySquares";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
};

export const Habits: React.FC<Props> = ({ habits, habitCompletions }) => {
  return (
    <section className="flex h-full w-full flex-col justify-center">
      <header className="flex items-center justify-between">
        <span className="font-bold">Last 70 days</span>

        <AddNewHabit />
      </header>

      <div className="mx-auto mt-16">
        <DaySquares habits={habits} habitCompletions={habitCompletions} />
      </div>
    </section>
  );
};
