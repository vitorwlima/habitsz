import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { Habit, HabitCompletion } from "@prisma/client";
import { trpc } from "../../utils/trpc";

type Props = {
  habit: Habit;
  habitCompletion?: HabitCompletion;
  date: string;
};

export const HabitItem: React.FC<Props> = ({
  habit,
  habitCompletion,
  date,
}) => {
  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.habit.updateHabitCompletion.useMutation({
    onSuccess: () => {
      trpcUtils.habit.getAllCompletions.invalidate();
    },
  });
  const completed = habitCompletion?.completed || false;

  const updateHabitCompletion = () => {
    mutate({
      habitId: habit.id,
      completed: !completed,
      date,
    });
  };

  return (
    <button
      className="flex w-fit items-center gap-2"
      onClick={updateHabitCompletion}
    >
      <Switch
        checked={completed}
        className={`${completed ? "bg-blue-500" : "bg-transparent"}
          grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 border-gray-600 transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <CheckIcon
          className={`h-4 w-4 text-white transition-all ${
            !completed && "opacity-0"
          }`}
        />
      </Switch>
      <h4 className={`text-lg ${completed && "opacity-50"}`}>{habit.title}</h4>
    </button>
  );
};
