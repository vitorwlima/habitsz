type Props = {
  login: () => void;
};

export const GetStartedBanner: React.FC<Props> = ({ login }) => {
  return (
    <div className="flex w-full flex-col justify-between rounded-3xl bg-gradient-to-r from-blue-900 to-blue-500 p-4 xxs:p-8 xs:rounded-[40px] xs:p-14 sm:flex-row sm:items-center sm:py-20 md:rounded-[80px] md:py-28">
      <div className="mb-8 flex flex-col gap-2 text-lg font-bold xxs:text-xl xs:text-2xl sm:mb-0 md:text-3xl lg:text-4xl xl:text-5xl">
        <p>Ready to get started?</p>
        <p>Create an account for free!</p>
      </div>
      <button
        onClick={login}
        className="flex justify-center gap-2 rounded-3xl bg-neutral-100 px-8 py-4 font-extrabold text-blue-600 transition-colors hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:px-12 md:text-lg lg:px-20 lg:text-xl"
      >
        Get Started
      </button>
    </div>
  );
};
