import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-800 to-gray-900">
        <div className="container flex max-w-[1200px] flex-col py-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Habit <span className="text-blue-400">Tracker</span>
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
