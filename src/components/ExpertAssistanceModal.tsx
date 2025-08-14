import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSimplification } from "@/hooks/useSimplification";
import { X, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ExpertRequest } from "@/lib/types";

const expertRequestSchema = z.object({
  description: z.string().min(10, "요구사항에 대해 더 자세히 설명해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  urgency: z.enum(["standard", "urgent", "express"]),
});

const ExpertAssistanceModal: React.FC = () => {
  const { closeExpertModal, submitExpertRequest } = useSimplification();

  const form = useForm<ExpertRequest>({
    resolver: zodResolver(expertRequestSchema),
    defaultValues: {
      description: "",
      email: "",
      urgency: "standard",
    },
  });

  const onSubmit = (data: ExpertRequest) => {
    submitExpertRequest(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">전문가 도움 요청</h3>
          <Button
            variant="ghost"
            onClick={closeExpertModal}
            className="text-white rounded-full hover:bg-blue-600 focus:outline-none p-1 h-auto"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            텍스트 간소화에 대한 구체적인 요구사항을 설명해주시면, 전문가가
            최적화된 결과를 제공해드립니다:
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      요구사항
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full h-32 resize-none p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-inner bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="구체적인 요구사항을 설명해주세요 (예: '초등학교 5학년 과학 수업용으로 이 텍스트를 간소화해주세요')"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      이메일 주소
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-inner bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="결과를 받을 이메일 주소를 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      긴급도
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                          <SelectValue placeholder="긴급도를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">
                          일반 (24-48시간)
                        </SelectItem>
                        <SelectItem value="urgent">긴급 (4-8시간)</SelectItem>
                        <SelectItem value="express">특급 (1-2시간)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeExpertModal}
                  className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Send className="h-4 w-4 mr-1" /> 요청 보내기
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ExpertAssistanceModal;
