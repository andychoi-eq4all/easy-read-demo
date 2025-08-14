import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-800 dark:text-white after:content-['.'] after:animate-[dots_1.5s_steps(5,end)_infinite]">
          변환 중
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
