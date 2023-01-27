import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { SidebarLink } from "../SidebarLink";
import { Title } from "../Title";

type Props = {
  userName: string;
  isOpen: boolean;
  switchIsOpen: () => void;
};

export const Sidebar: React.FC<Props> = ({
  userName,
  isOpen,
  switchIsOpen,
}) => {
  return (
    <>
      <div
        className={clsx(
          "absolute z-10 flex h-screen w-screen flex-col justify-between bg-gradient-to-b from-blue-800 to-gray-900 py-8 pb-28 transition-all lg:static lg:w-[300px] lg:translate-x-0 lg:pb-8",
          {
            "translate-x-0": isOpen,
            "translate-x-[-100vw]": !isOpen,
          }
        )}
      >
        <div className="flex flex-col">
          <header className="flex items-center justify-between px-4 lg:justify-center">
            <button onClick={() => switchIsOpen()} className="lg:hidden">
              <XMarkIcon className="flex h-8 w-8" />
            </button>
            <Title className="text-center" />
          </header>

          <nav className="mt-16">
            <SidebarLink path="dashboard" />
            <SidebarLink path="habits" />
            <SidebarLink path="analytics" />
          </nav>
        </div>

        <div className="flex flex-col px-4">
          <div className="mb-2 h-1 w-full rounded-full bg-blue-600" />
          <span>
            Hi, <strong>{userName}</strong>!
          </span>

          <button
            onClick={() => signOut()}
            className="mt-4 flex items-center justify-center rounded-lg bg-red-400 p-2 py-3 text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
