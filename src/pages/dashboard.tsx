import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Habits } from "../components/Habits";
import { Sidebar } from "../components/Sidebar";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const userStatus = useAuthRoute(true);
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const userName = session?.user?.name?.split(" ")[0] ?? "User";

  const { data: habits, isLoading: isHabitsLoading } =
    trpc.habit.getAll.useQuery({ userId });
  const { data: completions, isLoading: isCompletionsLoading } =
    trpc.habit.getAllCompletions.useQuery({ userId });

  const isLoading = isHabitsLoading || isCompletionsLoading;

  if (userStatus === "loading") return null;

  return (
    <>
      <Head>
        <title>Habit Tracker</title>
        <meta
          name="description"
          content="Track your habits to build an awesome life."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen bg-gradient-to-b from-blue-800 to-gray-900 text-white">
        <Sidebar userName={userName} />
        <div className="container flex max-w-[1200px] flex-col py-8 px-4">
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
