import { cn } from "@/lib/utils";
import type { IncytesQuestionAnswerModel, IncytesSingleValueQuestionModel } from "@/models/incytes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setQuestionResponse, type QuestionResponse } from "@/store/slices/uiStateSlice";
import { Circle, CircleCheck } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
  question: IncytesSingleValueQuestionModel;
  onAnswerChange?: (answerId: number) => void;
}

export const MultipleChoiceSingleValueQuestionBody: React.FC<Props> = ({
  question,
  onAnswerChange,
}) => {
  const uiState = useAppSelector(state => state.uiState);
  const dispatch = useAppDispatch();

  // Find initially checked answer or null
  const currentAnswerId: number | null = uiState.currentResponses?.[question.id]?.answer ?? null;
  const handleSelect = (answerId: number) => {
    if (!question.id){
      return;
    }
    const questionResponse: QuestionResponse = {
      questionId: question.id,
      questionType: question.questionType,
      answer: answerId
    };
    dispatch(setQuestionResponse([question.id, questionResponse]));

    onAnswerChange?.(answerId);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {[...question.answers]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((answer) => {
          const isSelected = currentAnswerId === answer.id;

          return (
            <button
              key={answer.id}
              type="button"
              onClick={() => handleSelect(answer.id)}
              className={cn(
                "group relative flex items-center gap-3.5 px-4 py-3.5 rounded-lg",
                "text-left transition-all duration-150 outline-none",
                "border-2",
                "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/5 shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40 hover:bg-accent/50 hover:shadow-md"
              )}
            >
              {/* Radio circle indicator */}
              {isSelected ? (
                <CircleCheck className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
              )}

              {/* Answer label */}
              <span
                className={cn(
                  "flex-1 text-[15px] leading-snug",
                  isSelected
                    ? "font-medium text-foreground"
                    : "text-foreground/90 group-hover:text-foreground"
                )}
              >
                {answer.label}
              </span>
            </button>
          );
        })}
    </div>
  );
};
