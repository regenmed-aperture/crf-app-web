import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { IncytesDateQuestionModel } from "@/models/incytes";
import type React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setError, setQuestionResponse, type QuestionResponse } from "@/store/slices/uiStateSlice";

interface Props {
  question: IncytesDateQuestionModel;
  onAnswerChange?: (value: string) => void;
}

// convert from YYYY-MM-DD → MM/DD/YYYY
function toMMDDYYYY(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";

  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

// convert from MM/DD/YYYY → YYYY-MM-DD (for <input type="date">)
function toISO(mmddyyyy: string): string {
  const [month, day, year] = mmddyyyy.split("/");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}


export const DateQuestionBody: React.FC<Props> = ({ question, onAnswerChange }) => {
  const uiState = useAppSelector(state => state.uiState);
  const dispatch = useAppDispatch();

  // read state (MM/DD/YYYY) → convert to YYYY-MM-DD for input
  const stored = (question.id !== null
    ? (uiState.currentResponses?.[question.id]?.answer as string | undefined)
    : undefined) ?? question.value;

  const dateValue = stored ? toISO(stored) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (question.id === null) return;

    const iso = e.target.value;          // YYYY-MM-DD from input
    const formatted = toMMDDYYYY(iso);   // convert to MM/DD/YYYY

    const questionResponse: QuestionResponse = {
      questionId: question.id,
      questionType: question.questionType,
      answer: formatted
    };

    dispatch(setError(false));
    dispatch(setQuestionResponse([question.id, questionResponse]));
    onAnswerChange?.(formatted);
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

