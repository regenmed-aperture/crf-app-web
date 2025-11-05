import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentView, setCurrentSectionId, setCurrentQuestionId, UIView } from "@/store/slices/uiStateSlice";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { MultipleChoiceSingleValueQuestionBody } from "@/components/questions/MultipleChoiceSingleValueQuestionBody";
import { IncytesQuestionType, type IncytesAnalogQuestionModel, type IncytesDateQuestionModel, type IncytesMultipleValueQuestionModel, type IncytesSingleValueQuestionModel, type IncytesSingleValueAnswer, type IncytesMultipleValueAnswer} from "@/models/incytes";
import { Kbd } from "@/components/ui/kbd";
import { SliderQuestionBody } from "@/components/questions/SliderQuestionBody";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { DateQuestionBody } from "@/components/questions/DateQuestionBody";
import { MultipleChoiceMultipleValueQuestionBody } from "@/components/questions/MultipleChoiceMultipleValueQuestionBody";
import { Separator } from "@/components/ui/separator";
import { QuestionsTopIsland } from "@/components/QuestionsTopIsland";
import { getGlowShadowStyle } from "@/util/colors";

const answers: any[] = [];

export const ReportQuestionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const reportState = useAppSelector(state => state.reportState);
  const uiState = useAppSelector(state => state.uiState);

  // Build flat list of all question IDs in order
  const allQuestionIds = useMemo(
    () => reportState.sections.flatMap(s => s.questionIds),
    [reportState.sections]
  );

  useEffect(() => {
    // Only set initial question if there isn't already one stored (e.g., from persistence)
    if (!uiState.currentQuestionId) {
      const questionId = allQuestionIds[0];
      const sectionId = reportState.sections.find(s => s.questionIds.includes(questionId))?.id;
      dispatch(setCurrentQuestionId(questionId));
      dispatch(setCurrentSectionId(sectionId ?? null));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showCelebration, setShowCelebration] = useState(false);

  // Find which section we're in (for display only)
  const currentSection = reportState.sections.find(s => s.id === uiState.currentSectionId);

  // Track section transitions for celebration
  const currentSectionIndex = reportState.sections.findIndex(s => s === currentSection);
  const previousSection = currentSectionIndex > 0 ? reportState.sections[currentSectionIndex - 1] : null;
  const previousSectionId = previousSection ? previousSection.id : null;

  // Simple index state - just track position in the flat list
  const currentIndex = allQuestionIds.findIndex(questionId => {
    return questionId === uiState.currentQuestionId;
  });

  // Get current question
  const currentQuestionId = allQuestionIds[currentIndex];
  const currentQuestion = currentQuestionId ? reportState.questions[currentQuestionId] : null;

  // Separate effect for section transition detection (only when section changes)
  useEffect(() => {
    if (currentSection) {
      // Detect section transition (but not on first load)
      var prevSectComplete = true;
      previousSection?.questionIds.forEach(x => prevSectComplete = prevSectComplete && answers?.find(y => y.id === x))
      if (previousSectionId !== null && previousSectionId < currentSection.id && prevSectComplete) {
        setShowCelebration(true);
        // Auto-dismiss after 1.5 seconds
        const timer = setTimeout(() => {
          setShowCelebration(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection?.id]); // Only depend on section ID, not the whole object

  // Navigation handlers
  const onNextClicked = () => {
    if (currentIndex < allQuestionIds.length - 1) {
      const nextQuestionId = allQuestionIds[currentIndex + 1];
      const nextSectionId = reportState.sections.find(s => s.questionIds.includes(nextQuestionId))?.id;

      dispatch(setCurrentQuestionId(nextQuestionId));
      dispatch(setCurrentSectionId(nextSectionId ? nextSectionId : null));
    }
  };

  const onPrevClicked = () => {
    if (currentIndex > 0) {
      const previousQuestionId = allQuestionIds[currentIndex - 1];
      const previousSectionId = reportState.sections.find(s => s.questionIds.includes(previousQuestionId))?.id;

      dispatch(setCurrentQuestionId(previousQuestionId));
      dispatch(setCurrentSectionId(previousSectionId ? previousSectionId : null));
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
        {/* Celebration Animation Overlay - Minimal & Sleek */}
        <AnimatePresence>
          {showCelebration && currentSection && (
            <>
              {/* Subtle radial pulse - no backdrop blur */}
              <motion.div
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Multiple expanding rings for depth */}
                {[0, 0.15, 0.3].map((delay) => (
                  <motion.div
                    key={delay}
                    className="absolute w-32 h-32 border-4 rounded-full"
                    style={{ borderColor: `${currentSection.color}40` }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
              
              {/* Minimal emoji particles - fewer, more subtle */}
              {['✨', '⭐', '✨', '⭐'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl z-40 pointer-events-none"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0.8],
                    x: Math.cos((i / 4) * Math.PI * 2) * 150,
                    y: Math.sin((i / 4) * Math.PI * 2) * 150 - 50,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                >
                  {emoji}
                </motion.div>
              ))}
              
              {/* Sleek minimal toast notification */}
              <motion.div
                className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div 
                  className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border flex items-center gap-3"
                  style={{ borderColor: currentSection.color }}
                >
                  <motion.span
                    className="text-xl"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.4, repeat: 1 }}
                  >
                    🎉
                  </motion.span>
                  <span className="font-medium text-sm text-gray-700">
                    Section Complete
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentSection.color }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
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
              className="min-h-[300px] py-4 flex flex-col gap-4 rounded-lg border-2 overflow-hidden relative"
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
                      onAnswerChange={(response) => answers.push({id:currentQuestion.id,answer:response})}
                    />
                  ) : currentQuestion.questionType === IncytesQuestionType.Analog ? (
                    <SliderQuestionBody
                      question={currentQuestion as IncytesAnalogQuestionModel}
                      onAnswerChange={(response) => answers.push({id:currentQuestion.id,answer:response})}
                    />
                  ) : currentQuestion.questionType === IncytesQuestionType.Date ? (
                    <DateQuestionBody
                      question={currentQuestion as IncytesDateQuestionModel}
                      onAnswerChange={(response) => answers.push({id:currentQuestion.id,answer:response})}
                    />
                  ) : currentQuestion.questionType === IncytesQuestionType.MultipleValue ? (
                    <MultipleChoiceMultipleValueQuestionBody
                      question={currentQuestion as IncytesMultipleValueQuestionModel}
                      onAnswerChange={(response) => answers.push({id:currentQuestion.id,answer:response})}
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

