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
      <div
        className={`h-5 w-5 rounded-full border-2 border-blue-500 bg-transparent ${
          completed && "border-blue-800 bg-blue-500"
        }`}
      ></div>
      <h4
        className={`text-lg font-semibold ${
          completed && "line-through opacity-50"
        }`}
      >
        {habit.title}
      </h4>
    </button>
  );
};
