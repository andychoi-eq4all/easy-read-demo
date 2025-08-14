import React from "react";
import { useSimplification } from "@/hooks/useSimplification";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Header: React.FC = () => {
  const { applyOrganizationData, setApplyOrganizationData } =
    useSimplification();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="mb-8 text-center md:text-left">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            쉬운 정보 변환 서비스
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            어려운 문장을 쉬운 문장으로 변환하세요.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="organization-data"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              기관 정보 반영
            </Label>
            <Switch
              id="organization-data"
              checked={applyOrganizationData}
              onCheckedChange={setApplyOrganizationData}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="flex items-center gap-2"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">라이트 모드</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">다크 모드</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
