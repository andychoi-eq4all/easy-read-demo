import React from "react";
import { Button } from "@/components/ui/button";
import { useSimplification } from "@/hooks/useSimplification";
import {
  copy as copyIcon,
  undo as undoIcon,
  redo as redoIcon,
} from "@/assets/asset-index";

const SimplifiedTextPanel: React.FC = () => {
  const {
    simplifiedText,
    copyToClipboard,
    undo,
    redo,
    canUndo,
    canRedo,
    originalText,
  } = useSimplification();

  const simplifiedCount = simplifiedText?.text.length ?? 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-6 bg-gray-100 dark:bg-gray-800 bg-white">
        <h2 className="mt-6 ml-1 font-semibold text-2xl text-gray-800 dark:text-white">
          쉬운정보 변환문
        </h2>
        <div className="h-px bg-gray-600 dark:bg-gray-600 mt-4"></div>
      </div>
      <div className="px-5 py-3">
        <div className="w-full max-h-[250px] overflow-y-auto text-panel resize-none px-3 py-1 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white whitespace-pre-wrap break-words">
          {simplifiedText ? (
            <div className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
              {simplifiedText.text}
            </div>
          ) : (
            <p className="text-gray-400 dark:text-gray-500">
              쉬운 문장이 여기에 나타납니다.
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            {simplifiedCount > 0 && (
              <span className="ml-3 text-md text-gray-500 dark:text-gray-400">
                출력 글자 수: {simplifiedCount} / 2000
              </span>
            )}
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button
              onClick={undo}
              disabled={!canUndo}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <img src={undoIcon} alt="undo" className="h-4 w-4" />
            </Button>
            <Button
              onClick={redo}
              disabled={!canRedo}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <img src={redoIcon} alt="redo" className="h-4 w-4" />
            </Button>
          </div> */}
          <Button
            variant="secondary"
            onClick={copyToClipboard}
            disabled={!simplifiedText}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            <img src={copyIcon} alt="copy" className="h-4 w-4 mr-1" /> 복사
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedTextPanel;
