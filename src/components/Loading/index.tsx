export const Loading: React.FC = () => {
  return (
    <div className="flex w-fit items-center gap-2">
      <div className="h-5 w-5 animate-bounce rounded-full bg-blue-600" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-blue-600 animation-delay-200" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-blue-600 animation-delay-400" />
    </div>
  );
};
