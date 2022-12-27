import { Menu, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

type Props = {
  userName: string;
};

export const UserMenu: React.FC<Props> = ({ userName }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Menu
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-blue-200 hover:text-blue-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item as="div" className="border-b-2 border-blue-400 py-2">
                <span className="p-2 text-sm text-gray-800">
                  Hi, <strong>{userName}</strong>!
                </span>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-blue-200" : ""
                    } group mt-2 flex w-full items-center rounded-md p-2 text-sm text-gray-900`}
                  >
                    <ArrowRightOnRectangleIcon
                      className="mr-2 h-5 w-5 text-blue-400 hover:text-blue-300"
                      aria-hidden="true"
                    />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
