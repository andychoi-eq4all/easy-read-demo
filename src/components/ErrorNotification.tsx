import React from "react";
import { AlertTriangle } from "lucide-react";
import { useSimplification } from "@/hooks/useSimplification";

const ErrorNotification: React.FC = () => {
  const { errorMessage } = useSimplification();

  return (
    <div className="fixed bottom-6 left-6 bg-red-500 dark:bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <div>
          <h4 className="font-medium">오류</h4>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
