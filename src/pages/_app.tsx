import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<SessionProviderProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>habitsz - Track your habits</title>
        <meta
          name="description"
          content="Track your habits to build an awesome life."
        />
        <meta property="og:title" content="habitsz - Track your habits" />
        <meta
          property="og:description"
          content="Track your habits to build an awesome life."
        />
        <meta property="og:url" content="https://habitsz.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
