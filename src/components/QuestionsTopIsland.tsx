import type React from "react";
import { QuestionsSectionedProgressBar } from "./QuestionsSectionedProgressBar";
import { QuestionsMobileProgress } from "./QuestionsMobileProgress";
import { useAppSelector } from "@/store/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ReportSection } from "@/models/report";
import { Button } from "./ui/button";
import { LayoutGrid, ListOrdered } from "lucide-react";
import { Badge } from "./ui/badge";
import { QuestionsViewAllDialogue } from "./QuestionsViewAllDialogue";

interface Props {
  currentQuetionIndex: number,
  totalQuestionsNum: number,
  currentSection?: ReportSection,
}

export const QuestionsTopIsland: React.FC<Props> = ({
  currentQuetionIndex,
  totalQuestionsNum,
  currentSection,
}) => {
  const reportState = useAppSelector(state => state.reportState);
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-[800px] bg-white flex flex-col rounded-lg shadow-sm border">
      {!isMobile && (
        <QuestionsSectionedProgressBar
          sections={reportState.sections}
          currentQuestionIndex={currentQuetionIndex}
          totalQuestions={totalQuestionsNum}
          className="w-full rounded-t-lg"
        />
      )}
      {isMobile && (
        <div className="pt-3 pb-1">
          <QuestionsMobileProgress
            sections={reportState.sections}
            currentQuestionIndex={currentQuetionIndex}
            totalQuestions={totalQuestionsNum}
          />
        </div>
      )}
      
      <div className="flex flex-row items-center justify-between gap-3 px-3 py-2">
        <QuestionsViewAllDialogue>
          <Button
            variant={isMobile ? "ghost" : "secondary"}
            size={isMobile ? "sm" : "default"}
            className="hover:cursor-pointer"
          >
            <LayoutGrid className={isMobile ? "size-3.5" : ""} />
            View All
          </Button>
        </QuestionsViewAllDialogue>
        {!isMobile && (
          <h3 className="text-lg tracking-wide text-center">
            {currentSection?.name}
          </h3>
        )}
        <Badge 
          variant="secondary" 
          className="flex flex-row items-center gap-1 rounded-full text-sm"
        >
          <ListOrdered className="size-3.5!" />
          <div className="flex flex-row items-center gap-0.5">
            <span className="w-5 text-center">
              {currentQuetionIndex + 1}
            </span>
            <span>/</span>
            <span className="w-5 text-center">
              {totalQuestionsNum}
            </span>
          </div>
        </Badge>
      </div>
    </div>
  )
}
