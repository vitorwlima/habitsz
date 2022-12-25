import type { Habit } from "@prisma/client";
import { useState } from "react";

type Props = {
  habit: Habit;
};

export const HabitItem: React.FC<Props> = ({ habit }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <button
      className="flex w-fit items-center gap-2"
      onClick={() => setCompleted((c) => !c)}
    >
      <div
        className={`h-5 w-5 rounded-full border-2 border-blue-500 bg-transparent ${
          completed && "bg-blue-500"
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
