import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentView, setCurrentSectionId, setCurrentQuestionId, UIView } from "@/store/slices/uiStateSlice";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { MultipleChoiceSingleValueQuestionBody } from "@/components/questions/MultipleChoiceSingleValueQuestionBody";
import { IncytesQuestionType, type IncytesAnalogQuestionModel, type IncytesDateQuestionModel, type IncytesMultipleValueQuestionModel, type IncytesSingleValueQuestionModel } from "@/models/incytes";
import { Kbd } from "@/components/ui/kbd";
import { SliderQuestionBody } from "@/components/questions/SliderQuestionBody";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { DateQuestionBody } from "@/components/questions/DateQuestionBody";
import { MultipleChoiceMultipleValueQuestionBody } from "@/components/questions/MultipleChoiceMultipleValueQuestionBody";
import { Separator } from "@/components/ui/separator";
import { QuestionsTopIsland } from "@/components/QuestionsTopIsland";
import { getGlowShadowStyle } from "@/util/colors";

export const ReportQuestionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const reportState = useAppSelector(state => state.reportState);
  const uiState = useAppSelector(state => state.uiState);

  // Build flat list of all question IDs in order
  const allQuestionIds = useMemo(
    () => reportState.sections.flatMap(s => s.questionIds),
    [reportState.sections]
  );

  // Simple index state - just track position in the flat list
  const [currentIndex, setCurrentIndex] = useState(0);

  // Restore position on mount
  useEffect(() => {
    if (uiState.currentQuestionId && allQuestionIds.length > 0) {
      const questionId = Number(uiState.currentQuestionId);
      const index = allQuestionIds.indexOf(questionId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, []);

  // Get current question
  const currentQuestionId = allQuestionIds[currentIndex];
  const currentQuestion = currentQuestionId ? reportState.questions[currentQuestionId] : null;

  // Find which section we're in (for display only)
  const currentSection = useMemo(() => {
    return reportState.sections.find(s => s.questionIds.includes(currentQuestionId));
  }, [reportState.sections, currentQuestionId]);

  // Save to Redux whenever position changes
  useEffect(() => {
    if (currentSection && currentQuestionId) {
      dispatch(setCurrentSectionId(String(currentSection.id)));
      dispatch(setCurrentQuestionId(String(currentQuestionId)));
    }
  }, [currentQuestionId, currentSection, dispatch]);

  // Navigation handlers
  const onNextClicked = () => {
    if (currentIndex < allQuestionIds.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const onPrevClicked = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const onFinishClicked = () => {
    dispatch(setCurrentView(UIView.VIEW_RESULTS));
    dispatch(setCurrentQuestionId(null));
    dispatch(setCurrentSectionId(null));
  };

  const transition: Transition = {
    type: "tween",
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  };

  // Simple boundary checks
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === allQuestionIds.length - 1;

  // Get adjacent questions for preview
  const prevQuestionId = currentIndex > 0 ? allQuestionIds[currentIndex - 1] : null;
  const nextQuestionId = currentIndex < allQuestionIds.length - 1 ? allQuestionIds[currentIndex + 1] : null;
  const prevQuestion = prevQuestionId ? reportState.questions[prevQuestionId] : null;
  const nextQuestion = nextQuestionId ? reportState.questions[nextQuestionId] : null;

  if (allQuestionIds.length === 0 || !currentQuestion) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-muted-foreground">No questions available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      <div className="absolute w-full top-[40px] px-8 flex justify-center">
        <QuestionsTopIsland
          currentQuetionIndex={currentIndex}
          totalQuestionsNum={allQuestionIds.length}
          currentSection={currentSection}
        />
      </div>
      <div className="w-full max-w-[1500px]">
        {/* Previous card */}
        <AnimatePresence mode="popLayout">
          {prevQuestion && (
            <motion.div
              key={`prev-${prevQuestionId}`}
              layoutId={`card-${prevQuestionId}`}
              className="z-0 absolute left-0 top-1/2 -translate-y-1/2 w-80 h-64 rounded-lg rounded-l-none overflow-hidden border-2 border-l-0 bg-white flex flex-col justify-center items-center p-2 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={transition}
            >
              {prevQuestion.title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current card */}
        <motion.div
          key={`current-${currentQuestionId}`}
          layoutId={`card-${currentQuestionId}`}
          className="z-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <Card 
            className="min-h-[300px] py-4 flex flex-col gap-4 rounded-lg border-2"
            style={{
              boxShadow: currentSection ? getGlowShadowStyle(currentSection.color) : undefined,
            }}
          >
            <CardHeader className="px-4 flex flex-col gap-4">
              <h2 className="text-xl">
                {currentQuestion.title}
              </h2>
            </CardHeader>
            <Separator />
            <CardContent className="px-4 flex flex-col gap-3 flex-1">
              {currentQuestion.instructions && (
                <Alert>
                  <Info />
                  <AlertDescription>
                    {currentQuestion.instructions}
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex-1 flex flex-col justify-center">
                {currentQuestion.questionType === IncytesQuestionType.SingleValue ? (
                  <MultipleChoiceSingleValueQuestionBody
                    question={currentQuestion as IncytesSingleValueQuestionModel}
                  />
                ) : currentQuestion.questionType === IncytesQuestionType.Analog ? (
                  <SliderQuestionBody
                    question={currentQuestion as IncytesAnalogQuestionModel}
                  />
                ) : currentQuestion.questionType === IncytesQuestionType.Date ? (
                  <DateQuestionBody
                    question={currentQuestion as IncytesDateQuestionModel}
                  />
                ) : currentQuestion.questionType === IncytesQuestionType.MultipleValue ? (
                  <MultipleChoiceMultipleValueQuestionBody
                    question={currentQuestion as IncytesMultipleValueQuestionModel}
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next card */}
        <AnimatePresence mode="popLayout">
          {nextQuestion && (
            <motion.div
              key={`next-${nextQuestionId}`}
              layoutId={`card-${nextQuestionId}`}
              className="z-0 absolute right-0 top-1/2 -translate-y-1/2 w-80 h-64 rounded-lg rounded-r-none overflow-hidden border-2 border-r-0 bg-white flex flex-col justify-center items-center p-2 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={transition}
            >
              {nextQuestion.title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute w-full max-w-xl left-1/2 -translate-x-1/2 bottom-[100px] flex flex-row justify-between items-center gap-1">
        <Button
          variant={"outline"}
          className="h-12 w-36 flex flex-row justify-between items-center"
          onClick={onPrevClicked}
          disabled={isFirstQuestion}
        >
          <Kbd>←</Kbd>
          <span>Previous</span>
        </Button>

        <Button
          className="h-12 w-36 flex flex-row justify-between items-center"
          onClick={isLastQuestion ? onFinishClicked : onNextClicked}
        >
          <span>{isLastQuestion ? "Finish" : "Next"}</span>
          <Kbd className="bg-muted/40 text-primary">→</Kbd>
        </Button>
      </div>
    </div>
  );
};
