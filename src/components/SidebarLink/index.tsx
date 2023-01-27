import {
  ArrowPathIcon,
  ChartPieIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  path: "dashboard" | "habits" | "analytics";
};

const icons = {
  dashboard: HomeIcon,
  habits: ArrowPathIcon,
  analytics: ChartPieIcon,
};

export const SidebarLink = ({ path }: Props) => {
  const { asPath } = useRouter();
  const Icon = icons[path];

  return (
    <Link
      href={path}
      className={clsx(
        "flex items-center p-4 text-neutral-100 transition-colors hover:bg-blue-200 hover:bg-opacity-25 hover:text-blue-200",
        {
          "bg-blue-200 bg-opacity-25 text-blue-200": asPath === `/${path}`,
        }
      )}
    >
      <>
        <Icon className="mr-4 h-6 w-6" />
        <span className="capitalize">{path}</span>
      </>
    </Link>
  );
};
