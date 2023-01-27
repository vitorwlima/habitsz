import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { HabitForm } from "../HabitForm";

export const AddNewHabit: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="flex w-fit items-center justify-center rounded-lg border-2 border-blue-600 px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-75 sm:px-4"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircleIcon className="mr-2 h-6 w-6 text-blue-600" />
        <span className="text-neutral-100">Add new habit</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseForm}>
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
                      Add new habit
                    </Dialog.Title>
                    <button
                      onClick={() => handleCloseForm()}
                      className="rounded-lg focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <XMarkIcon className="h-8 w-8 text-neutral-300" />
                    </button>
                  </header>

                  <HabitForm userId={userId} handleClose={handleCloseForm} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
