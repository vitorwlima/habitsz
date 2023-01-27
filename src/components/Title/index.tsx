type Props = {
  className?: string;
};

export const Title: React.FC<Props> = ({ className = "" }) => {
  return (
    <h1
      className={`font-nunito text-3xl tracking-wide sm:text-4xl ${className}`}
    >
      <div className="relative mb-1 h-2 bg-transparent">
        <div className="absolute left-0 h-2 w-full rounded-full bg-blue-600 transition-all" />
        <div className="absolute left-0 h-2 w-3/4 rounded-l-full bg-blue-500 transition-all" />
        <div className="absolute left-0 h-2 w-2/4 rounded-l-full bg-blue-400 transition-all" />
        <div className="absolute left-0 h-2 w-1/4 rounded-l-full bg-blue-300 transition-all" />
      </div>
      <strong className={`font-extrabold ${className}`}>habitsz</strong>
    </h1>
  );
};
