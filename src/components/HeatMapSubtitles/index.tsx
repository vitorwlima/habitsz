export const HeatMapSubtitles: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold">Less</span>
      <div className="h-5 w-5 rounded-md border-2 border-zinc-700 bg-transparent sm:h-6 sm:w-6" />
      <div className="h-5 w-5 rounded-md border-2 border-blue-700 bg-blue-900 sm:h-6 sm:w-6" />
      <div className="h-5 w-5 rounded-md border-2 border-blue-600 bg-blue-800 sm:h-6 sm:w-6" />
      <div className="h-5 w-5 rounded-md border-2 border-blue-500 bg-blue-700 sm:h-6 sm:w-6" />
      <div className="h-5 w-5 rounded-md border-2 border-blue-400 bg-blue-600 sm:h-6 sm:w-6" />
      <span className="text-sm font-bold">More</span>
    </div>
  );
};
