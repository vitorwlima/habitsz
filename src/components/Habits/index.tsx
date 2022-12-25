import type { Habit, HabitCompletion } from "@prisma/client";
import { useState } from "react";
import { format, addDays } from "date-fns";

import { Arrow } from "../../assets/icons/Arrow";
import { AddNewHabit } from "../AddNewHabit";
import { HabitItem } from "../HabitItem";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
};

export const Habits: React.FC<Props> = ({ habits, habitCompletions }) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const weekDay = format(selectedDay, "eee");
  const formattedDay = format(selectedDay, "MM-dd - EEEE");
  const habitDate = format(selectedDay, "yyyy-MM-dd");

  const habitsForDay = habits.filter((habit) =>
    habit.frequency.split(",").includes(weekDay)
  );

  const updateDay = (diff: number) => {
    setSelectedDay((prev) => addDays(prev, diff));
  };

  return (
    <section className="mt-12 flex w-full flex-col">
      <header className="flex justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => updateDay(-1)}>
            <Arrow className="h-6 w-6 rotate-180 fill-blue-500" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-100">
            {formattedDay}
          </h2>
          <button onClick={() => updateDay(1)}>
            <Arrow className="h-6 w-6 fill-blue-500" />
          </button>
        </div>

        <AddNewHabit />
      </header>

      <div className="mt-16 flex flex-col gap-4">
        {habitsForDay.length > 0 ? (
          habitsForDay.map((habit) => (
            <HabitItem
              key={`${habit.id}-${formattedDay}`}
              habit={habit}
              habitCompletion={habitCompletions.find(
                (hc) => hc.habitId === habit.id && hc.date === habitDate
              )}
              date={habitDate}
            />
          ))
        ) : (
          <h3 className="text-center text-xl font-bold">
            No habits set for this day :(
          </h3>
        )}
      </div>
    </section>
  );
};
