import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionedProgressBar } from "@/components/SectionedProgressBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentView, setCurrentSectionId, setCurrentQuestionId, UIView } from "@/store/slices/uiStateSlice";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useEffect, useState } from "react";
import type React from "react";
import { MultipleChoiceSingleValueQuestionBody } from "@/components/questions/MultipleChoiceSingleValueQuestionBody";
import { IncytesQuestionType, type IncytesSingleValueQuestionModel } from "@/models/incytes";
import { Kbd } from "@/components/ui/kbd";

export const ReportQuestionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const reportState = useAppSelector(state => state.reportState);

  // Initialize to first section and first question if not set
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndexInSection, setCurrentQuestionIndexInSection] = useState(0);

  // Get current section and question
  const currentSection = reportState.sections[currentSectionIndex];
  const currentQuestionId = currentSection?.questionIds[currentQuestionIndexInSection];
  const currentQuestion = currentQuestionId ? reportState.questions[currentQuestionId] : null;

  // Calculate total question index for progress bar
  const currentQuestionGlobalIndex = reportState.sections
    .slice(0, currentSectionIndex)
    .reduce((sum, section) => sum + section.questionIds.length, 0) + currentQuestionIndexInSection;

  const totalQuestions = reportState.sections.reduce((sum, section) => sum + section.questionIds.length, 0);

  // Update uiStore whenever current question changes
  useEffect(() => {
    if (currentSection && currentQuestionId) {
      dispatch(setCurrentSectionId(String(currentSection.id)));
      dispatch(setCurrentQuestionId(String(currentQuestionId)));
    }
  }, [currentSectionIndex, currentQuestionIndexInSection, currentSection, currentQuestionId, dispatch]);

  const onNextClicked = () => {
    if (!currentSection) return;

    // Check if there's a next question in current section
    if (currentQuestionIndexInSection < currentSection.questionIds.length - 1) {
      setCurrentQuestionIndexInSection(prev => prev + 1);
    }
    // Move to next section
    else if (currentSectionIndex < reportState.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndexInSection(0);
    }
  };

  const onPrevClicked = () => {
    // Check if there's a previous question in current section
    if (currentQuestionIndexInSection > 0) {
      setCurrentQuestionIndexInSection(prev => prev - 1);
    }
    // Move to previous section
    else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = reportState.sections[currentSectionIndex - 1];
      setCurrentQuestionIndexInSection(prevSection.questionIds.length - 1);
    }
  };

  const onFinishClicked = () => {
    dispatch(setCurrentView(UIView.VIEW_RESULTS));
  }

  const transition: Transition = {
    type: "tween",
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  };

  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndexInSection === 0;
  const isLastQuestion =
    currentSectionIndex === reportState.sections.length - 1 &&
    currentQuestionIndexInSection === currentSection?.questionIds.length - 1;

  if (totalQuestions === 0 || !currentQuestion) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-muted-foreground">No questions available</p>
      </div>
    );
  }

  // Get previous and next question IDs for preview cards
  const getPrevQuestionId = (): number | null => {
    if (currentQuestionIndexInSection > 0) {
      return currentSection.questionIds[currentQuestionIndexInSection - 1];
    } else if (currentSectionIndex > 0) {
      const prevSection = reportState.sections[currentSectionIndex - 1];
      return prevSection.questionIds[prevSection.questionIds.length - 1];
    }
    return null;
  };

  const getNextQuestionId = (): number | null => {
    if (currentQuestionIndexInSection < currentSection.questionIds.length - 1) {
      return currentSection.questionIds[currentQuestionIndexInSection + 1];
    } else if (currentSectionIndex < reportState.sections.length - 1) {
      const nextSection = reportState.sections[currentSectionIndex + 1];
      return nextSection.questionIds[0];
    }
    return null;
  };

  const prevQuestionId = getPrevQuestionId();
  const nextQuestionId = getNextQuestionId();
  const prevQuestion = prevQuestionId ? reportState.questions[prevQuestionId] : null;
  const nextQuestion = nextQuestionId ? reportState.questions[nextQuestionId] : null;

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      <div className="absolute w-full top-[40px] flex flex-col items-center px-8 gap-6">
        <SectionedProgressBar
          sections={reportState.sections}
          currentQuestionIndex={currentQuestionGlobalIndex}
          totalQuestions={totalQuestions}
          className="max-w-[800px]"
        />
        <h3 className="text-lg font-semibold">
          {currentSection?.name}
        </h3>
      </div>
      <div className="w-full max-w-[1500px]">
        {/* Previous card */}
        <AnimatePresence mode="popLayout">
          {prevQuestion && (
            <motion.div
              key={`prev-${prevQuestionId}`}
              layoutId={`card-${prevQuestionId}`}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-64 bg-muted rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={transition}
            />
          )}
        </AnimatePresence>

        {/* Current card */}
        <motion.div
          key={`current-${currentQuestionId}`}
          layoutId={`card-${currentQuestionId}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <Card className="min-h-[300px] p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {currentQuestion.title}
            </h2>
            {currentQuestion.instructions && (
              <p className="text-sm text-muted-foreground">{currentQuestion.instructions}</p>
            )}
            <div className="flex-1 flex flex-col justify-center">
              {currentQuestion.questionType === IncytesQuestionType.SingleValue && (
                <MultipleChoiceSingleValueQuestionBody
                  question={currentQuestion as IncytesSingleValueQuestionModel}
                />
              )}
            </div>
          </Card>
        </motion.div>

        {/* Next card */}
        <AnimatePresence mode="popLayout">
          {nextQuestion && (
            <motion.div
              key={`next-${nextQuestionId}`}
              layoutId={`card-${nextQuestionId}`}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-64 bg-muted rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={transition}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="absolute w-full max-w-xl left-1/2 -translate-x-1/2 bottom-[100px] flex flex-row justify-between items-center gap-1">
        <Button
          variant={"outline"}
          className="h-14 w-36 flex flex-row justify-between items-center"
          onClick={onPrevClicked}
          disabled={isFirstQuestion}
        >
          <Kbd>←</Kbd>
          <span>Previous</span>
        </Button>

        <Button
          className="h-14 w-36 flex flex-row justify-between items-center"
          onClick={isLastQuestion ? onFinishClicked : onNextClicked}
        >
          <span>{isLastQuestion ? "Finish" : "Next"}</span>
          <Kbd className="bg-muted/40 text-primary">→</Kbd>
        </Button>
      </div>
    </div>
  );
};
