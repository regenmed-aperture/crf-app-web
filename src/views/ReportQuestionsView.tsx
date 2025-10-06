import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentView, UIView } from "@/store/slices/uiStateSlice";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useState } from "react";
import type React from "react";

const questions = [
  { id: 1, title: "Pain Level", content: "How would you rate your pain today?" },
  { id: 2, title: "Mobility", content: "Can you walk without assistance?" },
  { id: 3, title: "Sleep Quality", content: "How well did you sleep last night?" },
  { id: 4, title: "Medication", content: "Are you taking your prescribed medication?" },
];

export const ReportQuestionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNextClicked = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= questions.length) return questions.length - 1;
      return next;
    });
  }

  const onPrevClicked = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) return 0;
      return next;
    });
  }

  const onFinishClicked = () => {
    dispatch(setCurrentView(UIView.VIEW_RESULTS));
  }

  const transition: Transition = {
    type: "tween",
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      <div className="absolute w-full top-[40px] flex flex-row justify-center">
        <Progress className="h-4 max-w-[500px] rounded-md!" value={(currentIndex/(questions.length-1) * 100)} />
      </div>
      <div className="w-full max-w-[1500px]">
        {/* Previous card */}
        <AnimatePresence mode="popLayout">
          {currentIndex > 0 && (
            <motion.div
              key={`prev-${questions[currentIndex - 1].id}`}
              layoutId={`card-${questions[currentIndex - 1].id}`}
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
          key={`current-${questions[currentIndex].id}`}
          layoutId={`card-${questions[currentIndex].id}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <Card className="min-h-[450px] p-8">
            <h2 className="text-2xl font-bold mb-6">
              {questions[currentIndex].title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {questions[currentIndex].content}
            </p>
          </Card>
        </motion.div>

        {/* Next card */}
        <AnimatePresence mode="popLayout">
          {currentIndex < questions.length - 1 && (
            <motion.div
              key={`next-${questions[currentIndex + 1].id}`}
              layoutId={`card-${questions[currentIndex + 1].id}`}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-64 bg-muted rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={transition}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="absolute w-full max-w-xl left-1/2 -translate-x-1/2 bottom-[160px] flex flex-row justify-between items-center">
        <Button
          onClick={onPrevClicked}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button onClick={onFinishClicked}>
            Finish
          </Button>
        ) : (
          <Button onClick={onNextClicked}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
