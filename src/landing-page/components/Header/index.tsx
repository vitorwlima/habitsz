import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Title } from "../../../components/Title";

type Props = {
  login: () => void;
};

export const Header: React.FC<Props> = ({ login }) => {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-900 py-8 px-4 sm:px-8">
      <Title className="text-2xl xs:text-3xl lg:text-5xl" />
      <button
        onClick={login}
        className="flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-4 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  xs:px-12 sm:px-20"
      >
        <p className="min-w-fit font-extrabold xs:text-lg lg:text-xl">
          Get Started
        </p>
        <ArrowRightIcon className="h-6 w-6" />
      </button>
    </header>
  );
};
