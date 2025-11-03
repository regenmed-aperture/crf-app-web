import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo, useState } from "react";
import { setCurrentQuestionId, setCurrentSectionId } from "@/store/slices/uiStateSlice";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
}

export const QuestionsViewAllDialogue: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const reportState = useAppSelector(state => state.reportState);
  const uiState = useAppSelector(state => state.uiState);

  const allQuestionIds = useMemo(() => reportState.sections.flatMap(s => s.questionIds), [reportState.sections]);
  const [open, setOpen] = useState(false);

  const currentIndex = allQuestionIds.findIndex(questionId => questionId === uiState.currentQuestionId);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="pt-10">
        <Card
          className="relative border-t-0 border-l-0 border-r-0 border-b-2 border-b-gray-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-none rounded-none"
        >
          <CardHeader >
            <CardTitle>All Questions</CardTitle>
            <CardDescription>Click any question to navigate</CardDescription>
          </CardHeader>
        </Card>
        <div className="max-h-80 overflow-y-scroll">
          <div className="space-y-2">
            {allQuestionIds.map((questionId, index) => {
              const question = reportState.questions[questionId];
              return (
                <Button
                  key={question.id}
                  variant="outline"
                  className={cn([
                    "w-full h-16 gap-0",
                    index > currentIndex ? "opacity-20" : "hover: cursor-pointer"
                  ])}
                  onClick={() => {
                    if (index > currentIndex) {
                      return;
                    }

                    const sectionId = reportState.sections.find(s => s.questionIds.includes(questionId))?.id;
                    dispatch(setCurrentQuestionId(questionId));
                    dispatch(setCurrentSectionId(sectionId ?? null));
                    setOpen(false);
                  }}
                >
                  <div className="size-6 mr-2 rounded-xl bg-gray-200 text-xs text-center flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="whitespace-normal text-left flex-1 overflow-hidden">
                    {question.title}
                  </p>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="w-full py-4 border-y-2 border-y-gray-200 text-sm text-muted-foreground">
          <div className="px-4">
            <div className="flex justify-between items-center w-full mb-2">
              <p>Progress</p>
              <p>{currentIndex + 1}/{allQuestionIds.length}</p>
            </div>
            <Progress value={(currentIndex + 1) / allQuestionIds.length * 100} className="[&>div]:bg-orange-500" />
          </div>
        </div>
        <DialogClose asChild>
          <Button>Continue Assessment</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
