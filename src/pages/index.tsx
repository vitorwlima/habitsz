import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { Google } from "../assets/icons/Google";
import { useAuthRoute } from "../hooks/useAuthRoute";

const Home: NextPage = () => {
  useAuthRoute(false);

  const handleLogin = () => {
    signIn("google");
  };

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

      <main className="flex h-screen flex-col items-center justify-between bg-gradient-to-b from-blue-800 to-gray-900 py-16 text-white">
        <div className="container flex max-w-[1200px] flex-col items-center px-2">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-8xl">
            Habit <span className="text-blue-400">Tracker</span>
          </h1>

          <p className="mt-20 text-center font-semibold sm:text-xl">
            Track your habits and start building your dream life{" "}
            <strong>step by step</strong>.
          </p>

          <button
            className="mt-40 flex w-fit items-center justify-between gap-2 rounded-sm bg-white px-4 py-2"
            onClick={handleLogin}
          >
            <Google />
            <span className="text-gray-600 sm:text-lg">
              Start now with Google
            </span>
          </button>
        </div>

        <footer className="">
          <span>Made by </span>
          <a
            href="https://github.com/vitorwlima"
            target="_blank"
            rel="noreferrer"
          >
            <strong>vitorwlima</strong>
          </a>
        </footer>
      </main>
    </>
  );
};

export default Home;
