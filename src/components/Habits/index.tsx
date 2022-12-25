import type { Habit } from "@prisma/client";

import { AddNewHabit } from "../AddNewHabit";

type Props = {
  habits: Habit[];
};

export const Habits: React.FC<Props> = ({ habits }) => {
  console.log(habits);
  return (
    <section className="mt-8 flex w-full flex-col">
      <AddNewHabit />
    </section>
  );
};
