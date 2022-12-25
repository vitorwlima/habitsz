import { type NextPage } from "next";
import Head from "next/head";
import { Habits } from "../components/Habits";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: habits, isLoading } = trpc.habit.getAll.useQuery();

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
        <div className="container flex max-w-[1200px] flex-col py-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Habit <span className="text-blue-400">Tracker</span>
          </h1>

          {isLoading || habits === undefined ? (
            <div>Loading...</div>
          ) : (
            <Habits habits={habits} />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
