import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { Habit, HabitCompletion } from "@prisma/client";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.habit.updateHabitCompletion.useMutation();
  const completed = habitCompletion?.completed || false;

  const updateHabitCompletion = () => {
    trpcUtils.habit.getAllCompletions.setData(
      { userId },
      (allCompletions) =>
        allCompletions?.map((c) =>
          c.habitId === habit.id && c.date === date
            ? { ...c, completed: !c.completed }
            : c
        ) ?? []
    );

    mutate({
      habitId: habit.id,
      completed: !completed,
      date,
    });
  };

  return (
    <button className="flex gap-2" onClick={updateHabitCompletion}>
      <Switch
        checked={completed}
        className={`${
          completed
            ? "border-blue-500 bg-blue-500"
            : "border-neutral-600 bg-transparent"
        }
          grid h-6 w-6 place-items-center rounded-lg border-2  transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <CheckIcon
          className={`h-4 w-4 text-white transition-all ${
            !completed && "opacity-0"
          }`}
        />
      </Switch>
      <span
        className={`text-left text-lg leading-6 ${completed && "opacity-50"}`}
      >
        {habit.title}
      </span>
    </button>
  );
};
