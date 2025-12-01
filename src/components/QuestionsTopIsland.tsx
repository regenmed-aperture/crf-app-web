import type React from "react";
import { QuestionsSectionedProgressBar } from "./QuestionsSectionedProgressBar";
import { useAppSelector } from "@/store/hooks";
import type { ReportSection } from "@/models/report";
import { Button } from "./ui/button";
import { LayoutGrid, ListOrdered } from "lucide-react";
import { Badge } from "./ui/badge";
import { QuestionsViewAllDialogue } from "./QuestionsViewAllDialogue";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="w-full max-w-[800px] bg-white flex flex-col gap-2 md:gap-4 rounded-lg shadow-sm border border-t-0">
      <QuestionsSectionedProgressBar
        sections={reportState.sections}
        currentQuestionIndex={currentQuetionIndex}
        totalQuestions={totalQuestionsNum}
        className="w-[calc(100%+1.25rem)] -mt-1 -mx-2.5"
      />
      <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4 px-2 pb-2">
        {/* Mobile: Section name at top */}
        {isMobile && (
          <h3 className="text-base font-medium tracking-wide text-center order-1">
            {currentSection?.name}
          </h3>
        )}
        
        {/* Desktop: View All button on left */}
        {!isMobile && (
          <div className="justify-self-start flex items-center gap-2">
            <QuestionsViewAllDialogue>
              <Button
                variant="secondary"
                className="hover:cursor-pointer"
              >
                <LayoutGrid />
                View All
              </Button>
            </QuestionsViewAllDialogue>
          </div>
        )}
        
        {/* Desktop: Section name in center */}
        {!isMobile && (
          <h3 className="text-lg tracking-wide text-center">
            {currentSection?.name}
          </h3>
        )}
        
        {/* Mobile and Desktop: Counter badge (on right for desktop, centered for mobile) */}
        <Badge 
          variant="secondary" 
          className={`flex flex-row items-center gap-1 rounded-full text-sm ${isMobile ? 'order-2' : 'justify-self-end'}`}
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
        
        {/* Mobile: Compact View All button at bottom */}
        {isMobile && (
          <div className="flex items-center justify-center order-3">
            <QuestionsViewAllDialogue>
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer text-xs h-8"
              >
                <LayoutGrid className="size-3.5" />
                View All
              </Button>
            </QuestionsViewAllDialogue>
          </div>
        )}
      </div>
    </div>
  )
}