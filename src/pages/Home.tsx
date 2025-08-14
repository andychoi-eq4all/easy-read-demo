import React from "react";
import Header from "@/components/Header";
import OriginalTextPanel from "@/components/OriginalTextPanel";
import SimplifiedTextPanel from "@/components/SimplifiedTextPanel";
import PromptInputPanel from "@/components/PromptInputPanel";
import PresetsBar from "@/components/PresetsBar";
import ExpertAssistanceModal from "@/components/ExpertAssistanceModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorNotification from "../components/ErrorNotification";
import Footer from "@/components/Footer";
import { useSimplification } from "@/hooks/useSimplification";

const Home: React.FC = () => {
  const {
    isLoading,
    isExpertModalOpen,
    isSuccessVisible,
    isErrorVisible,
    simplifiedText,
  } = useSimplification();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main className="mb-8">
          <PresetsBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OriginalTextPanel />
            <SimplifiedTextPanel />
          </div>

          <PromptInputPanel />
        </main>

        <Footer />
      </div>

      {isExpertModalOpen && <ExpertAssistanceModal />}
      {isLoading && (!simplifiedText || simplifiedText.text.length === 0) && (
        <LoadingOverlay />
      )}
      {/* 토스트로 대체: SuccessNotification / ErrorNotification 제거 */}
    </div>
  );
};

export default Home;
