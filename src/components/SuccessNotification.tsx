import React from "react";
import { CheckCircle } from "lucide-react";
import { useSimplification } from "@/hooks/useSimplification";

const SuccessNotification: React.FC = () => {
  const { successMessage } = useSimplification();

  return (
    <div className="fixed bottom-6 left-6 bg-green-500 dark:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        <div>
          <h4 className="font-medium">성공!</h4>
          <p className="text-sm">{successMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;
