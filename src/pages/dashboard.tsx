import { Bars3Icon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Habits } from "../components/Habits";
import { Sidebar } from "../components/Sidebar";
import { Title } from "../components/Title";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const userStatus = useAuthRoute(true);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = session?.user?.id ?? "";
  const userName = session?.user?.name?.split(" ")[0] ?? "User";

  const { data: habits, isLoading: isHabitsLoading } =
    trpc.habit.getAll.useQuery({ userId });
  const { data: completions, isLoading: isCompletionsLoading } =
    trpc.habit.getAllCompletions.useQuery({ userId });

  const isLoading = isHabitsLoading || isCompletionsLoading;

  const switchIsOpen = () => {
    setIsSidebarOpen((o) => !o);
  };

  if (userStatus === "loading") return null;

  return (
    <>
      <Head>
        <title>testando legal kkk</title>
        <meta
          name="description"
          content="Track your habits to build an awesome life."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col bg-neutral-900 text-white lg:flex-row">
        <header className="mb-8 flex items-center justify-between p-8 lg:hidden">
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
        <div className="container mx-auto flex max-w-[1000px] flex-col p-8">
          {isLoading || habits === undefined || completions === undefined ? (
            <div>Loading...</div>
          ) : (
            <Habits habits={habits} habitCompletions={completions} />
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
