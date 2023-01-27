import { Popover, Transition } from "@headlessui/react";
import type { Habit, HabitCompletion } from "@prisma/client";
import clsx from "clsx";
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
  isToday: boolean;
};

export const DaySingleSquare: React.FC<Props> = ({
  habits,
  habitCompletions,
  date,
  squareSize,
  quadrant,
  isToday,
}) => {
  const habitsAmount = habits.length;
  const completedHabitsAmount = habitCompletions.filter(
    (hC) => hC.completed
  ).length;
  const percentageDone = completedHabitsAmount / habitsAmount;

  const dayName = format(date, "EEEE");
  const displayDate = format(date, "MM/dd");
  const formattedDate = format(date, "yyyy-MM-dd");
  const squareColor =
    percentageDone === 0 ||
    !Number.isFinite(percentageDone) ||
    Number.isNaN(percentageDone)
      ? "bg-transparent border-zinc-700"
      : percentageDone <= 0.33
      ? "bg-blue-900 border-blue-700"
      : percentageDone <= 0.66
      ? "bg-blue-800 border-blue-600"
      : percentageDone < 1
      ? "bg-blue-700 border-blue-500"
      : "bg-blue-600 border-blue-400";
  const topBottom = quadrant.y === "top" ? "top-4" : "bottom-4";
  const leftRight = quadrant.x === "left" ? "left-4" : "right-4";

  return (
    <Popover className="relative">
      <Popover.Button className="grid place-items-center rounded-lg focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75">
        <div
          className={clsx(
            `${squareColor} ${squareSize} rounded-lg border-2 transition-colors`,
            {
              "border-neutral-100": isToday,
            }
          )}
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
          className={`${topBottom} ${leftRight} absolute z-10 w-48 rounded-lg bg-zinc-900 p-4 drop-shadow-md lg:w-96`}
        >
          <p className="text-sm text-zinc-400">{dayName}</p>
          <strong className="mt-1 mb-4 block text-xl font-extrabold lg:text-2xl">
            {displayDate}
          </strong>
          <div className="relative h-2 rounded-full bg-zinc-700">
            <div
              className="absolute left-0 h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${percentageDone * 100}%` }}
            />
          </div>
          <div className="mt-6 flex flex-col gap-2 text-lg">
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
