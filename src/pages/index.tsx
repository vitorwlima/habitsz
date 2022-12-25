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

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex max-w-[1200px] flex-col py-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Habit <span className="text-[hsl(280,100%,70%)]">Tracker</span>
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
