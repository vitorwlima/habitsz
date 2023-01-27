import { trpc } from "../../utils/trpc";
import { AddNewHabit } from "../AddNewHabit";
import { DeleteHabit } from "../DeleteHabit";
import { Weekdays } from "../Weekdays";

export const Habits: React.FC = () => {
  const { data: habits = [] } = trpc.habit.getAll.useQuery();

  return (
    <section className="flex w-full flex-col">
      <header className="flex items-center justify-between">
        <span className="font-bold text-neutral-100 sm:text-xl">
          Showing {habits.length} habits
        </span>

        <AddNewHabit />
      </header>

      {habits.length > 0 ? (
        <div className="mt-4">
          <header className="grid grid-cols-[1fr_56px] rounded-lg bg-blue-900 p-4 text-lg sm:grid-cols-[1fr_1fr_56px]">
            <h4 className="font-semibold text-neutral-300">Habit</h4>
            <h4 className="hidden font-semibold text-neutral-300 sm:block">
              Frequency
            </h4>
          </header>
          <ul>
            {habits.map((habit) => (
              <li
                key={habit.id}
                className="grid grid-cols-[1fr_56px] place-content-center items-center border-b-2 border-blue-900 p-4 sm:grid-cols-[1fr_1fr_56px]"
              >
                <span className="text-neutral-300">{habit.title}</span>
                <span className="hidden text-neutral-300 sm:block">
                  <Weekdays weekdays={habit.frequency} />
                </span>
                <div className="flex items-center gap-2">
                  <AddNewHabit habit={habit} />
                  <DeleteHabit habit={habit} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="mt-8 text-center text-2xl font-semibold">
          No habits created. Start <span className="text-blue-500">now</span> by
          clicking the button above.
        </h3>
      )}
    </section>
  );
};
