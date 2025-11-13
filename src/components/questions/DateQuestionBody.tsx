import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { IncytesDateQuestionModel } from "@/models/incytes";
import type React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setError, setQuestionResponse, type QuestionResponse } from "@/store/slices/uiStateSlice";

interface Props {
  question: IncytesDateQuestionModel;
  onAnswerChange?: (value: string) => void;
}

export const DateQuestionBody: React.FC<Props> = ({
  question,
  onAnswerChange,
}) => {
  const uiState = useAppSelector(state => state.uiState);
  const dispatch = useAppDispatch();

  const dateValue: string = uiState.currentResponses?.[question.id]?.answer ?? question.value;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const questionRespose: QuestionResponse = {
      questionId: question.id,
      questionType: question.questionType,
      answer: value
    };

    dispatch(setError(false));
    dispatch(setQuestionResponse([question.id, questionRespose]));
    onAnswerChange?.(value);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <Input
          type="date"
          value={dateValue}
          onChange={handleChange}
          className={cn(
            "w-full h-14 px-4 text-base",
            "border-2 rounded-lg",
            "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
            dateValue
              ? "border-primary bg-primary/5"
              : "border-border bg-card"
          )}
        />
      </div>
    </div>
  );
};
