type Props = {
  className?: string;
};

export const Title: React.FC<Props> = ({ className = "" }) => {
  return (
    <h1
      className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${className}`}
    >
      Habit <span className="text-blue-400">Tracker</span>
    </h1>
  );
};
