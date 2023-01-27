import { Bars3Icon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import { Title } from "../components/Title";
import { usePage } from "../hooks/usePage";

const Analytics: NextPage = () => {
  const { authStatus, isSidebarOpen, switchIsSidebarOpen, userName } = usePage({
    authLevel: "hasToBeAuthed",
  });

  const isLoading = authStatus === "loading";

  return (
    <main className="flex min-h-screen flex-col bg-neutral-900 text-white lg:flex-row">
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
        {isLoading ? <Loading /> : <div>Em breve</div>}
      </div>
    </main>
  );
};

export default Analytics;
