import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { type AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<SessionProviderProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
