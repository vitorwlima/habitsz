import { Popover, Transition } from "@headlessui/react";
import type { Habit, HabitCompletion } from "@prisma/client";
import { format } from "date-fns";
import { Fragment } from "react";
import { HabitItem } from "../HabitItem";

type Props = {
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  date: Date;
  squareSize: string;
  quadrant: {
    x: "left" | "right";
    y: "top" | "bottom";
  };
};

export const DaySingleSquare: React.FC<Props> = ({
  habits,
  habitCompletions,
  date,
  squareSize,
  quadrant,
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
  const topBottom = quadrant.y === "top" ? "top-4" : "bottom-4";
  const leftRight = quadrant.x === "left" ? "left-4" : "right-4";

  return (
    <Popover className="relative">
      <Popover.Button className="grid place-items-center">
        <div
          className={`${squareColor} ${squareSize} rounded-md border border-blue-900`}
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
        <Popover.Panel
          className={`${topBottom} ${leftRight} absolute z-10 w-48 rounded-lg bg-zinc-800 p-4 lg:right-4 lg:w-96`}
        >
          <p className="font-semibold text-zinc-200">{dayName}</p>
          <strong className="mt-2 mb-4 block text-xl">
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
