import React, { useEffect, useState } from "react";
import { useSimplification } from "@/hooks/useSimplification";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// 상단 프리셋 바: 디자인 시안과 유사한 탭형 버튼 UI
const PresetsBar: React.FC = () => {
  const {
    presets,
    selectedPresetId,
    selectPreset,
    applyOrganizationData,
    setApplyOrganizationData,
  } = useSimplification() as any;

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center overflow-x-auto">
          <button
            className="px-6 py-2 mr-3 rounded-full text-md whitespace-nowrap border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            disabled
          >
            프리셋
          </button>
          <div className="inline-flex">
            {presets.map((p: any, index: number) => {
              const isActive = selectedPresetId === p.id;
              const isFirst = index === 0;
              const isLast = index === presets.length - 1;
              return (
                <button
                  key={p.id}
                  onClick={() => selectPreset(p.id)}
                  className={`px-6 py-2 text-md whitespace-nowrap border transition-colors ${
                    isFirst ? "rounded-l-full" : "rounded-none -ml-px"
                  } ${isLast ? "rounded-r-full" : ""} ${
                    isActive
                      ? "bg-blue-500 text-white border-blue-500 z-10"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Label
            htmlFor="apply-organization-data"
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            기관 정보 반영
          </Label> */}
          {/* <Switch
            id="apply-organization-data"
            checked={applyOrganizationData}
            onCheckedChange={setApplyOrganizationData}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PresetsBar;
