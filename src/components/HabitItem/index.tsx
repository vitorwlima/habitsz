import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { Habit, HabitCompletion } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
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
  const { mutate } = trpc.habit.updateHabitCompletion.useMutation({
    onSuccess: (habitCompletionCreated) => {
      trpcUtils.habit.getAllCompletions.setData(
        { userId },
        (allCompletions) =>
          allCompletions?.map((hC) =>
            hC.habitId === habit.id && hC.date === date
              ? habitCompletionCreated
              : hC
          ) ?? []
      );
    },
    onError: () => {
      trpcUtils.habit.getAllCompletions.invalidate({ userId });
      toast.error("Habit completion update failed!");
    },
  });
  const completed = habitCompletion?.completed || false;

  const updateHabitCompletion = () => {
    trpcUtils.habit.getAllCompletions.setData({ userId }, (allCompletions) =>
      habitCompletion
        ? allCompletions?.map((c) =>
            c.id === habitCompletion.id ? { ...c, completed: !c.completed } : c
          ) ?? []
        : [
            ...(allCompletions ?? []),
            {
              createdAt: new Date(),
              updatedAt: new Date(),
              habitId: habit.id,
              completed: !completed,
              date,
              id: "",
            },
          ]
    );

    mutate({
      habitId: habit.id,
      completed: !completed,
      date,
    });
  };

  return (
    <div className="flex gap-2">
      <Switch
        onChange={updateHabitCompletion}
        checked={completed}
        className={clsx(
          "grid h-6 w-6 place-items-center rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
          {
            "border-blue-600 bg-blue-600": completed,
            "border-zinc-700 bg-transparent": !completed,
          }
        )}
      >
        <CheckIcon
          className={clsx("h-4 w-4 text-white transition-all", {
            "opacity-0": !completed,
          })}
        />
      </Switch>

      <span
        className={clsx("text-left text-lg leading-6 text-neutral-100", {
          "opacity-50": completed,
        })}
      >
        {habit.title}
      </span>
    </div>
  );
};
