import { type NextPage } from "next";
import Link from "next/link";

const Page404: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="font-nunito text-5xl font-bold text-blue-600 sm:text-6xl lg:text-7xl">
        404
      </h1>
      <h3 className="mt-4 text-lg font-semibold">
        We could not find the page you are looking for :(
      </h3>
      <Link
        href="/"
        className="mt-16 rounded-lg bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-500"
      >
        Go back to the start
      </Link>
    </main>
  );
};

export default Page404;
