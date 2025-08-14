import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  SimplificationOptions,
  SimplificationResult,
  ExpertRequest,
  SimplificationHistoryItem,
} from "@/lib/types";
import demoText from "@/demo_text.json";

// 데모용 프리셋 데이터 (API 연동 없이 사용)
type DemoPreset = {
  id: string;
  name: string;
  original: string;
  simplified: string;
};

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "preset01",
    name: "사회/안전",
    original: (demoText as any)["원문"]["사회/안전"],
    simplified: (demoText as any)["쉬운글"]["사회/안전"],
  },
  {
    id: "preset02",
    name: "의료",
    original: (demoText as any)["원문"]["의료"],
    simplified: (demoText as any)["쉬운글"]["의료"],
  },
  {
    id: "preset03",
    name: "일상생활",
    original: (demoText as any)["원문"]["일상생활"],
    simplified: (demoText as any)["쉬운글"]["일상생활"],
  },
  {
    id: "preset04",
    name: "교통",
    original: (demoText as any)["원문"]["교통"],
    simplified: (demoText as any)["쉬운글"]["교통"],
  },
];

const mockSubmitExpertRequest = async (
  _request: ExpertRequest
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

interface SimplificationContextType {
  originalText: string;
  simplifiedText: SimplificationResult | null;
  isLoading: boolean;
  isExpertModalOpen: boolean;
  // Notifications
  isSuccessVisible: boolean;
  successMessage: string;
  isErrorVisible: boolean;
  errorMessage: string;
  options: SimplificationOptions;
  customPrompt: string;
  applyOrganizationData: boolean;
  canUndo: boolean;
  canRedo: boolean;
  // History state exposure
  history: SimplificationHistoryItem[];
  currentIndex: number;
  // Demo presets
  presets: DemoPreset[];
  selectedPresetId: string | null;
  selectPreset: (id: string) => void;
  setOriginalText: (text: string) => void;
  simplifyText: () => Promise<void>;
  updateOptions: (newOptions: Partial<SimplificationOptions>) => void;
  applyAdjustments: () => Promise<void>;
  setCustomPrompt: (prompt: string) => void;
  applyCustomPrompt: () => Promise<void>;
  setApplyOrganizationData: (apply: boolean) => void;
  undo: () => void;
  redo: () => void;
  selectHistory: (index: number) => void;
  clearHistory: () => void;
  openExpertModal: () => void;
  closeExpertModal: () => void;
  submitExpertRequest: (request: ExpertRequest) => Promise<void>;
  copyToClipboard: () => void;
}

const SimplificationContext = createContext<
  SimplificationContextType | undefined
>(undefined);

export function SimplificationProvider({ children }: { children: ReactNode }) {
  const [originalText, setOriginalText] = useState<string>("");
  const [simplifiedText, setSimplifiedText] =
    useState<SimplificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState<boolean>(false);
  // Notification states
  const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [applyOrganizationData, setApplyOrganizationData] =
    useState<boolean>(false);

  // Undo/Redo state management
  const [history, setHistory] = useState<SimplificationHistoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const [options, setOptions] = useState<SimplificationOptions>({
    model: "gpt-4o",
    simplicity: 5,
    readingLevel: "middle",
    tone: "neutral",
  });

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const presetMap = useMemo(() => {
    const map: Record<string, DemoPreset> = {};
    DEMO_PRESETS.forEach((p) => (map[p.id] = p));
    return map;
  }, []);

  const selectPreset = (id: string) => {
    setSelectedPresetId(id);
    const preset = presetMap[id];
    if (preset) {
      setOriginalText(preset.original);
    }
  };

  const simplifyText = async () => {
    if (!selectedPresetId) {
      showError("프리셋을 먼저 선택해주세요");
      return;
    }

    const preset = presetMap[selectedPresetId];
    if (!preset) {
      showError("유효하지 않은 프리셋입니다");
      return;
    }

    setIsLoading(true);
    // 변환 시작 시 기존 결과 초기화로 오버레이가 항상 보이도록 함
    setSimplifiedText(null);

    try {
      // 1초 지연으로 로딩 효과 제공
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const finalResult = { text: preset.simplified } as SimplificationResult;
      setSimplifiedText(finalResult);

      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push({
        originalText: preset.original,
        result: finalResult,
        createdAt: new Date().toISOString(),
      });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      showSuccess("데모 변환이 완료되었습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOptions = (newOptions: Partial<SimplificationOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const applyAdjustments = async () => {
    if (!simplifiedText) {
      showError("먼저 텍스트를 변환해주세요");
      return;
    }
    // 데모에서는 별도 조정 로직 없이 성공 메시지만 표시
    showSuccess("데모 모드에서는 조정 기능이 비활성화되어 있습니다");
  };

  const openExpertModal = () => {
    setIsExpertModalOpen(true);
  };

  const closeExpertModal = () => {
    setIsExpertModalOpen(false);
  };

  const submitExpertRequest = async (request: ExpertRequest) => {
    setIsLoading(true);
    try {
      await mockSubmitExpertRequest(request);
      closeExpertModal();
      showSuccess("전문가 지원 요청이 제출되었습니다!");
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "요청 제출에 실패했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const applyCustomPrompt = async () => {
    if (!customPrompt.trim()) {
      showError("사용자 지정 프롬프트를 입력해주세요");
      return;
    }
    // 데모에서는 프롬프트를 별도로 반영하지 않고 안내만 표시
    showSuccess("데모 모드에서는 사용자 프롬프트가 표시만 됩니다");
  };

  const undo = () => {
    if (canUndo) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSimplifiedText(history[newIndex].result);
    }
  };

  const redo = () => {
    if (canRedo) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSimplifiedText(history[newIndex].result);
    }
  };

  const copyToClipboard = () => {
    if (!simplifiedText) return;

    navigator.clipboard
      .writeText(simplifiedText.text)
      .then(() => {
        showSuccess("클립보드에 복사되었습니다!");
      })
      .catch(() => {
        showError("클립보드 복사에 실패했습니다");
      });
  };

  const selectHistory = (index: number) => {
    if (index < 0 || index >= history.length) return;
    setCurrentIndex(index);
    setSimplifiedText(history[index].result);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentIndex(-1);
    setSimplifiedText(null);
  };

  // 토스트 기반 알림으로 동작하게 변경 (Shadcn Toaster 사용)
  const showSuccess = (message: string) => {
    try {
      const { toast } = require("@/hooks/use-toast");
      toast({ title: "성공", description: message });
    } catch {
      // Fallback (개발 중 오류 방지)
      setSuccessMessage(message);
      setIsSuccessVisible(true);
      setTimeout(() => setIsSuccessVisible(false), 2500);
    }
  };

  const showError = (message: string) => {
    try {
      const { toast } = require("@/hooks/use-toast");
      toast({
        title: "오류",
        description: message,
        variant: "destructive",
      } as any);
    } catch {
      setErrorMessage(message);
      setIsErrorVisible(true);
      setTimeout(() => setIsErrorVisible(false), 2500);
    }
  };

  const value = {
    originalText,
    simplifiedText,
    isLoading,
    isExpertModalOpen,
    isSuccessVisible,
    successMessage,
    isErrorVisible,
    errorMessage,
    options,
    customPrompt,
    applyOrganizationData,
    canUndo,
    canRedo,
    history,
    currentIndex,
    presets: DEMO_PRESETS,
    selectedPresetId,
    selectPreset,
    setOriginalText,
    simplifyText,
    updateOptions,
    applyAdjustments,
    setCustomPrompt,
    applyCustomPrompt,
    setApplyOrganizationData,
    undo,
    redo,
    selectHistory,
    clearHistory,
    openExpertModal,
    closeExpertModal,
    submitExpertRequest,
    copyToClipboard,
  };

  return (
    <SimplificationContext.Provider value={value}>
      {children}
    </SimplificationContext.Provider>
  );
}

export function useSimplificationContext() {
  const context = useContext(SimplificationContext);
  if (context === undefined) {
    throw new Error(
      "useSimplificationContext must be used within a SimplificationProvider"
    );
  }
  return context;
}
