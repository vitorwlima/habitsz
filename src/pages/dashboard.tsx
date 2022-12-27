import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Habits } from "../components/Habits";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const userStatus = useAuthRoute(true);
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

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

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-800 to-gray-900 text-white">
        <div className="container flex max-w-[1200px] flex-col py-8 px-4">
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Habit <span className="text-blue-400">Tracker</span>
            </h1>

            <button
              className="rounded-sm bg-gray-800 px-4 py-2"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </header>

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
