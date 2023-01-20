import { Popover, Transition } from "@headlessui/react";
import type { Habit, HabitCompletion } from "@prisma/client";
import { format } from "date-fns";
import { Fragment } from "react";
import { HabitItem } from "../HabitItem";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  date: Date;
};

export const DaySingleSquare: React.FC<Props> = ({
  habits,
  habitCompletions,
  date,
}) => {
  const habitsAmount = habits.length;
  const completedHabitsAmount = habitCompletions.filter(
    (hC) => hC.completed
  ).length;
  const percentageDone = completedHabitsAmount / habitsAmount;

  const dayName = format(date, "EEEE");
  const formattedDate = format(date, "yyyy-MM-dd");
  const squareColor =
    percentageDone === 0 ||
    !Number.isFinite(percentageDone) ||
    Number.isNaN(percentageDone)
      ? "bg-neutral-800"
      : percentageDone <= 0.33
      ? "bg-blue-300"
      : percentageDone <= 0.66
      ? "bg-blue-400"
      : percentageDone < 1
      ? "bg-blue-500"
      : "bg-blue-600";

  return (
    <Popover className="relative">
      <Popover.Button className="grid place-items-center">
        <div
          className={`${squareColor} h-12 w-12 rounded-md border border-blue-900`}
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-4 z-10 w-96 rounded-lg bg-zinc-800 p-4">
          <p className="font-semibold text-zinc-200">{dayName}</p>
          <strong className="my-2 block text-lg">
            {date.toLocaleDateString()}
          </strong>
          <div className="relative h-2 rounded-full bg-gray-500">
            <div
              className="absolute left-0 h-2 rounded-full bg-blue-600"
              style={{ width: `${percentageDone * 100}%` }}
            />
          </div>
          <div className="mt-4 text-lg font-bold">
            {habits.length
              ? habits.map((habit) => (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    date={formattedDate}
                    habitCompletion={habitCompletions.find(
                      (h) => h.habitId === habit.id && h.date === formattedDate
                    )}
                  />
                ))
              : "No habits for this day :("}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
