import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { type Habit } from "@prisma/client";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../../utils/trpc";

type Props = {
  habit: Habit;
};

export const DeleteHabit: React.FC<Props> = ({ habit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.habit.delete.useMutation({
    onSuccess: () => {
      trpcUtils.habit.getAll.setData(undefined, (habits) =>
        (habits ?? []).filter((h) => h.id !== habit.id)
      );
      trpcUtils.habit.getAllCompletions.setData(undefined, (completions) =>
        (completions ?? []).filter((c) => c.habitId !== habit.id)
      );

      setIsOpen(false);
      toast.success("Habit deleted successfully!");
    },
    onError: (err) => {
      toast.error("Habit deletion failed!");
      console.log("An error happened: ", err);
    },
  });

  const handleConfirmDeleteHabit = () => {
    mutate({
      habitId: habit.id,
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <TrashIcon className="h-6 w-6 text-red-400" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-8 text-left align-middle shadow-xl transition-all">
                  <header className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-extrabold text-white"
                    >
                      Delete habit
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <XMarkIcon className="h-8 w-8 text-neutral-300" />
                    </button>
                  </header>

                  <div className="mt-4">
                    <p className="text-neutral-300">
                      Are you sure you want to delete the habit{" "}
                      <strong>&quot;{habit.title}&quot;</strong>?
                    </p>
                    <p className="mt-2 text-xs text-red-400">
                      All of its completions will be deleted.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-zinc-400 py-3 px-6 text-sm text-white transition-colors hover:bg-zinc-300 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDeleteHabit}
                      className="rounded-lg bg-red-400 py-3 px-6 text-sm text-white transition-colors  hover:bg-red-300 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Delete
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
