import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/assets/asset-index";
import { useSimplification } from "@/hooks/useSimplification";

const OriginalTextPanel: React.FC = () => {
  const { originalText, setOriginalText, simplifyText } = useSimplification();
  const [characterCount, setCharacterCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    setCharacterCount(originalText.length);
  }, [originalText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 1000) {
      setOriginalText(newText);
      setIsOverLimit(newText.length > 1000);
    } else {
      setIsOverLimit(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-6 bg-gray-100 dark:bg-gray-800 bg-white">
        <h2 className="mt-6 ml-1 font-semibold text-2xl text-gray-800 dark:text-white">
          원문
        </h2>
        <div className="h-px bg-gray-600 dark:bg-gray-600 mt-4"></div>
      </div>
      <div className="px-5 py-3">
        <Textarea
          className="w-full px-3 py-2 resize-none border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[250px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-md"
          placeholder="텍스트를 입력해주세요."
          value={originalText}
          onChange={handleTextChange}
        />
        <div className="mt-4 flex items-center justify-between">
          <div>
            {characterCount > 0 && (
              <span className="ml-3 text-md text-gray-500 dark:text-gray-400">
                입력 글자 수: {characterCount} / 1000
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isOverLimit && (
              <span className="text-red-500 text-md mr-2">
                최대 1000자까지 입력할 수 있습니다.
              </span>
            )}
            <Button
              onClick={simplifyText}
              className="px-6 py-2 mb-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-[#5D87FF] dark:hover:bg-[#4A75E0] dark:text-white"
            >
              <img src={shuffle} alt="shuffle" className="h-4 w-4 mr-1" /> 변환
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalTextPanel;
