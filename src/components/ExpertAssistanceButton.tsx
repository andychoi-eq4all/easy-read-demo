import React from "react";
import { Button } from "@/components/ui/button";
import { useSimplification } from "@/hooks/useSimplification";
import { HeadphonesIcon } from "lucide-react";

const ExpertAssistanceButton: React.FC = () => {
  const { openExpertModal } = useSimplification();

  return (
    <div className="fixed bottom-6 right-6">
      <Button 
        onClick={openExpertModal}
        variant="outline"
        className="px-5 py-3 bg-white text-primary shadow-lg rounded-full hover:bg-gray-50 transition-colors"
      >
        <HeadphonesIcon className="h-4 w-4 mr-1" /> Expert Help
      </Button>
    </div>
  );
};

export default ExpertAssistanceButton;
