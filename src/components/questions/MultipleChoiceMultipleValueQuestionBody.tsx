import { cn } from "@/lib/utils";
import type { IncytesMultipleValueQuestionModel } from "@/models/incytes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setError, setQuestionResponse, type QuestionResponse } from "@/store/slices/uiStateSlice";
import { Check } from "lucide-react";
import type React from "react";

interface Props {
  question: IncytesMultipleValueQuestionModel;
  onAnswerChange?: (answerIds: number[]) => void;
}

export const MultipleChoiceMultipleValueQuestionBody: React.FC<Props> = ({
  question,
  onAnswerChange,
}) => {
  const uiState = useAppSelector(state => state.uiState);
  const dispatch = useAppDispatch();

  // Initialize with checked answers
  const answerIds: number[] = (question.id !== null ? (uiState.currentResponses?.[question.id]?.answer as number[] | undefined) : undefined) ?? [];
  const handleToggle = (answerId: number) => {
    if (question.id === null) return;

    const newSelection = answerIds.includes(answerId)
        ? answerIds.filter((id) => id !== answerId)
        : [...answerIds, answerId];

      console.log(newSelection.length > 0 ? newSelection : null);

      // Update changes back to the ui state
      const questionResponse: QuestionResponse = {
        questionId: question.id,
        questionType: question.questionType,
        answer: newSelection.length > 0 ? newSelection : null
      };
      dispatch(setError(false));
      dispatch(setQuestionResponse([question.id, questionResponse]));

      onAnswerChange?.(newSelection);
  };

  const sortedAnswers = [...question.answers].sort((a, b) => a.sortOrder - b.sortOrder);

  // Determine if we should use two columns (if 4+ answers and space allows)
  const useColumns = sortedAnswers.length >= 4;

  return (
    <div
      className={cn(
        "grid gap-2.5 w-full",
        useColumns ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      )}
    >
      {sortedAnswers.map((answer) => {
        const isSelected = answerIds.includes(answer.id);

        return (
          <button
            key={answer.id}
            type="button"
            onClick={() => handleToggle(answer.id)}
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
            {/* Checkbox indicator */}
            <div
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded border-2",
                "flex items-center justify-center",
                "transition-all duration-150",
                isSelected
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/60 group-hover:border-muted-foreground"
              )}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />}
            </div>

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
