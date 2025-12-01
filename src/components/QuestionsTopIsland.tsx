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
    <div className={`w-full max-w-[800px] flex flex-col ${!isMobile ? "bg-white rounded-lg shadow-sm border border-t-0" : ""}`}>
      {!isMobile && (
        <QuestionsSectionedProgressBar
          sections={reportState.sections}
          currentQuestionIndex={currentQuetionIndex}
          totalQuestions={totalQuestionsNum}
          className="w-[calc(100%+1.25rem)] -mt-1 -mx-2.5"
        />
      )}
      {isMobile ? (
        <div className="flex flex-col gap-2 py-1">
          <div className="relative flex flex-row justify-between items-center">
            <QuestionsViewAllDialogue>
              <Button
                variant="secondary"
                size="sm"
                className="hover:cursor-pointer"
              >
                <LayoutGrid className="size-3.5" />
                View All
              </Button>
            </QuestionsViewAllDialogue>
            <div className="absolute left-1/2 -translate-x-1/2">
              <QuestionsMobileProgress
                sections={reportState.sections}
                currentQuestionIndex={currentQuetionIndex}
                totalQuestions={totalQuestionsNum}
                showBigCircle={false}
              />
            </div>
            <QuestionsMobileProgress
              sections={reportState.sections}
              currentQuestionIndex={currentQuetionIndex}
              totalQuestions={totalQuestionsNum}
              showSmallDots={false}
            />
          </div>
          <h3 className="tracking-wide text-center text-md">
            {currentSection?.name}
          </h3>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center gap-3 px-3 py-2">
          <QuestionsViewAllDialogue>
            <Button
              variant="secondary"
              size="default"
              className="hover:cursor-pointer"
            >
              <LayoutGrid />
              View All
            </Button>
          </QuestionsViewAllDialogue>
          <h3 className="tracking-wide text-center text-lg">
            {currentSection?.name}
          </h3>
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
      )}
    </div>
  )
}
