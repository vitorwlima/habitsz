import { Popover, Transition } from "@headlessui/react";
import type { Habit, HabitCompletion } from "@prisma/client";
import { Fragment } from "react";

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
  const completedHabitsAmount = habitCompletions.length;
  const percentageDone = completedHabitsAmount / habitsAmount;

  const squareColor =
    percentageDone === 0 ||
    !Number.isFinite(percentageDone) ||
    Number.isNaN(percentageDone)
      ? "bg-neutral-800"
      : percentageDone <= 0.33
      ? "bg-blue-200"
      : percentageDone <= 0.66
      ? "bg-blue-400"
      : percentageDone < 1
      ? "bg-blue-600"
      : "bg-blue-900";

  return (
    <Popover className="relative">
      <Popover.Button className="grid place-items-center">
        <div
          className={`${squareColor} h-12 w-12 rounded-md border-2 border-blue-900`}
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
        <Popover.Panel className="absolute z-10 w-96 rounded-lg bg-gray-900 p-8">
          <strong>{date.toLocaleDateString()}</strong>
          {habits.map((habit) => (
            <div key={habit.id}>{habit.title}</div>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
