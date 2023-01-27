import { Bars3Icon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import { Title } from "../components/Title";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { trpc } from "../utils/trpc";

const Habits: NextPage = () => {
  const userStatus = useAuthRoute(true);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = session?.user?.id ?? "";
  const userName = session?.user?.name?.split(" ")[0] ?? "User";

  const { data: habits, isLoading: isHabitsLoading } =
    trpc.habit.getAll.useQuery({ userId });
  const { data: completions, isLoading: isCompletionsLoading } =
    trpc.habit.getAllCompletions.useQuery({ userId });

  const isLoading =
    isHabitsLoading ||
    isCompletionsLoading ||
    habits === undefined ||
    completions === undefined;

  const switchIsOpen = () => {
    setIsSidebarOpen((o) => !o);
  };

  if (userStatus === "loading") return null;

  return (
    <main className="flex min-h-screen flex-col bg-neutral-900 text-white lg:flex-row">
      <header className="mb-8 flex items-center justify-between py-8 px-4 lg:hidden">
        <button onClick={() => switchIsOpen()}>
          <Bars3Icon className="flex h-8 w-8" />
        </button>

        <Title />
      </header>

      <Sidebar
        userName={userName}
        isOpen={isSidebarOpen}
        switchIsOpen={switchIsOpen}
      />
      <div className="mx-auto flex max-w-[1000px] items-center justify-center py-8 px-4">
        {isLoading ? <Loading /> : <div>Em breve</div>}
      </div>
    </main>
  );
};

export default Habits;
