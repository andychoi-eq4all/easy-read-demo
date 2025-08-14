import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSimplification } from "@/hooks/useSimplification";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  History as HistoryIcon,
  Trash2 as Trash2Icon,
  Eye,
} from "lucide-react";

const PromptInputPanel: React.FC = () => {
  const { history, currentIndex, selectHistory, clearHistory } =
    useSimplification();
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  const hasHistory = history.length > 0;

  const rows = useMemo(
    () =>
      history.map((h, index) => ({
        index,
        createdAt: new Date(h.createdAt),
        original: h.originalText,
        result: h.result.text,
        stats: h.result.stats,
      })),
    [history]
  );

  return (
    <div className="mt-8 mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
        <HistoryIcon className="h-5 w-5 mr-2" /> 변환 기록
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        최근 변환 결과를 시간순으로 확인하고 선택할 수 있습니다.
      </p>

      <div className="h-px bg-gray-600 dark:bg-gray-600 mb-4"></div>

      {!hasHistory ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
          아직 변환 기록이 없습니다.
        </div>
      ) : (
        <div className="max-h-72 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">일자</TableHead>
                <TableHead>원문</TableHead>
                <TableHead>변환문</TableHead>
                {/* <TableHead>검수상태</TableHead>
                <TableHead>Preset</TableHead> */}
                <TableHead className="w-[120px] text-center">
                  전체보기
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const isActive = r.index === currentIndex;
                const dateStr = `${r.createdAt.getFullYear()}. ${
                  r.createdAt.getMonth() + 1
                }. ${r.createdAt.getDate()}.`;
                const timeStr = r.createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                const originalPreview =
                  r.original.length > 80
                    ? r.original.slice(0, 80) + "…"
                    : r.original;
                const resultPreview =
                  r.result.length > 80 ? r.result.slice(0, 80) + "…" : r.result;
                return (
                  <TableRow
                    key={r.index}
                    className={
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : "cursor-pointer"
                    }
                    onClick={() => selectHistory(r.index)}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {dateStr}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          {timeStr}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top text-gray-700 dark:text-gray-200">
                      {originalPreview}
                    </TableCell>
                    <TableCell className="align-top text-gray-800 dark:text-gray-100">
                      {resultPreview}
                      {r.stats && (
                        <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                          {r.stats.percentSimpler}% 더 간단함 • 학습 수준:{" "}
                          {r.stats.gradeLevel}
                        </div>
                      )}
                    </TableCell>
                    {/* <TableCell>상태 뱃지 예정</TableCell>
                    <TableCell>Preset 표시 예정</TableCell> */}
                    <TableCell className="text-center">
                      <Dialog
                        open={viewIndex === r.index}
                        onOpenChange={(open) =>
                          setViewIndex(open ? r.index : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" /> 전체보기
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              변환 기록 상세 #{r.index + 1}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">원문</h4>
                              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800/60 text-sm whitespace-pre-wrap break-words">
                                {r.original}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">변환문</h4>
                              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800/60 text-sm whitespace-pre-wrap break-words">
                                {r.result}
                              </div>
                            </div>
                          </div>
                          {/* <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">검수상태, Preset 정보 표시 예정</div> */}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button
          onClick={clearHistory}
          variant="outline"
          disabled={!hasHistory}
          className="flex items-center text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50"
        >
          <Trash2Icon className="h-4 w-4 mr-2" /> 기록 비우기
        </Button>
      </div>
    </div>
  );
};

export default PromptInputPanel;
