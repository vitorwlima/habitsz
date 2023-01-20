import { Dialog, Transition } from "@headlessui/react";
import type { Habit } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Input } from "../Input";
import { Select } from "../Select";

const frequencyOptions = [
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
  { value: "Sun", label: "Sunday" },
];

export const AddNewHabit: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habit, setHabit] = useState<
    Pick<Habit, "title" | "frequency" | "description" | "points">
  >({
    title: "",
    frequency: "",
    description: "",
    points: 0,
  });
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.habit.create.useMutation({
    onSuccess: () => {
      trpcUtils.habit.getAll.invalidate();
      setIsOpen(false);
      console.log("Successfully created");
    },
    onError: (err) => {
      console.log("An error happened: ", err);
    },
  });

  const onChange =
    (name: keyof Habit) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = name === "points" ? Number(e.target.value) : e.target.value;
      setHabit({ ...habit, [name]: value });
    };

  const onFrequencyChange = (options: typeof frequencyOptions) => {
    setHabit({ ...habit, frequency: options.map((o) => o.value).join(",") });
  };

  const handleCreateHabit = () => {
    mutate({ ...habit, userId });
  };

  return (
    <>
      <button
        className="w-fit justify-center rounded-md border-2 border-blue-900 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2"
        onClick={() => setIsOpen(true)}
      >
        + Add new habit
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new habit
                  </Dialog.Title>

                  <div className="mt-4 flex flex-col gap-4">
                    <Input
                      label="Title"
                      name="title"
                      placeholder="My habit"
                      onChange={onChange("title")}
                      value={habit.title}
                    />
                    <Input
                      label="Description"
                      name="description"
                      placeholder="My habit description"
                      onChange={onChange("description")}
                      value={habit.description}
                    />
                    <Select
                      options={frequencyOptions}
                      label="Frequency"
                      isMulti
                      onChange={(values) =>
                        onFrequencyChange(values as typeof frequencyOptions)
                      }
                    />
                    <Input
                      label="Points on completion"
                      name="points"
                      type="number"
                      onChange={onChange("points")}
                      value={habit.points}
                      min={0}
                    />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500  focus-visible:ring-offset-2"
                      onClick={() => handleCreateHabit()}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
