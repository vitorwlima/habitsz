import { Bars3Icon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import { HabitHeatMap } from "../components/HabitHeatMap";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import { Title } from "../components/Title";
import { usePage } from "../hooks/usePage";

const Dashboard: NextPage = () => {
  const {
    isSidebarOpen,
    switchIsSidebarOpen,
    userName,
    authStatus,
    isCompletionsLoading,
    isHabitsLoading,
  } = usePage({ authLevel: "hasToBeAuthed" });

  const isLoading =
    isHabitsLoading || isCompletionsLoading || authStatus === "loading";

  return (
    <main className="flex min-h-screen flex-col bg-zinc-900 text-white lg:flex-row">
      <header className="mb-8 flex items-center justify-between py-8 px-4 lg:hidden">
        <button onClick={() => switchIsSidebarOpen()}>
          <Bars3Icon className="flex h-8 w-8" />
        </button>

        <Title />
      </header>

      <Sidebar
        userName={userName}
        isOpen={isSidebarOpen}
        switchIsOpen={switchIsSidebarOpen}
      />
      <div className="mx-auto flex max-w-[1000px] items-center justify-center py-8 px-4">
        {isLoading ? <Loading /> : <HabitHeatMap />}
      </div>
    </main>
  );
};

export default Dashboard;
