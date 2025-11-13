import { cn } from "@/lib/utils";
import type { IncytesAnalogQuestionModel } from "@/models/incytes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setError, setQuestionResponse, type QuestionResponse } from "@/store/slices/uiStateSlice";
import type React from "react";
import { useState } from "react";

interface Props {
  question: IncytesAnalogQuestionModel;
  onAnswerChange?: (value: number) => void;
}

export const SliderQuestionBody: React.FC<Props> = ({
  question,
  onAnswerChange,
}) => {
  const uiState = useAppSelector(state => state.uiState);
  const dispatch = useAppDispatch();

  // Initialize with existing value or middle of range
  const currentValue: number = uiState.currentResponses?.[question.id]?.answer ?? question.startValue;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    const questionResponse: QuestionResponse = {
      questionId: question.id,
      questionType: question.questionType,
      answer: value
    };

    dispatch(setError(false));
    dispatch(setQuestionResponse([question.id, questionResponse]));
    onAnswerChange?.(value);
  };

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      {/* Current value display */}
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center px-6 py-2 bg-primary/10 border-2 border-primary/20 rounded-full">
          <span className="text-2xl font-semibold text-primary flex flex-row items-center justify-center w-5">
            {currentValue}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative px-2">
        <input
          type="range"
          min={question.startValue}
          max={question.endValue}
          step={question.stepValue}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "w-full h-1 rounded-full appearance-none cursor-pointer",
            "bg-muted",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-6",
            "[&::-webkit-slider-thumb]:h-6",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:border-4",
            "[&::-webkit-slider-thumb]:border-background",
            "[&::-webkit-slider-thumb]:shadow-lg",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:w-6",
            "[&::-moz-range-thumb]:h-6",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary",
            "[&::-moz-range-thumb]:border-4",
            "[&::-moz-range-thumb]:border-background",
            "[&::-moz-range-thumb]:shadow-lg",
            "[&::-moz-range-thumb]:transition-transform",
            "[&::-moz-range-thumb]:hover:scale-110",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary/20",
            "focus-visible:ring-offset-2",
            "bg-primary/10"
          )}
          style={{
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between items-start gap-4 px-2">
        <div className="flex flex-col items-start gap-1 flex-1">
          <span className="text-sm font-medium text-muted-foreground">
            {question.startValue}
          </span>
          {question.startText && (
            <span className="text-sm text-foreground/80">
              {question.startText}
            </span>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 flex-1">
          <span className="text-sm font-medium text-muted-foreground">
            {question.endValue}
          </span>
          {question.endText && (
            <span className="text-sm text-foreground/80 text-right">
              {question.endText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
