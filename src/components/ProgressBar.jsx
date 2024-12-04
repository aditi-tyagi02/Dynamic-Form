const ProgressBar = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-indigo-700">Progress</span>
        <span className="text-sm font-medium text-indigo-700">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="w-full h-full opacity-30 bg-stripe animate-[move 3s linear infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;