import { trpc } from "../../utils/trpc";
import { AddNewHabit } from "../AddNewHabit";

export const Habits: React.FC = () => {
  const { data: habits = [] } = trpc.habit.getAll.useQuery();

  return (
    <section>
      <header className="flex items-center justify-between">
        <span className="font-bold text-neutral-100 sm:text-xl">
          Showing {habits?.length} habits
        </span>

        <AddNewHabit />
      </header>
    </section>
  );
};
