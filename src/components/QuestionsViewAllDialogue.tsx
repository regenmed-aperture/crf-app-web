import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type React from "react";
import { DialogHeader } from "./ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import { Item, ItemContent, ItemMedia } from "./ui/item";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { recordStats } from "framer-motion";
import { act, useEffect, useMemo, useRef, useState } from "react";
import { setCurrentQuestionId, setCurrentSectionId } from "@/store/slices/uiStateSlice";
import { cn } from "@/lib/utils";


const questions = [
    { 
      id: 'rightKnee', 
      label: 'Right Knee', 
      number: 1,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT knee.'
    },
    { 
      id: 'leftKnee', 
      label: 'Left Knee', 
      number: 2,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT knee.'
    },
    { 
      id: 'rightAnkle', 
      label: 'Right Ankle', 
      number: 3,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT ankle.'
    },
    { 
      id: 'leftAnkle', 
      label: 'Left Ankle', 
      number: 4,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT ankle.'
    },
    { 
      id: 'rightHip', 
      label: 'Right Hip', 
      number: 5,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT hip.'
    },
    { 
      id: 'leftHip', 
      label: 'Left Hip', 
      number: 6,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT hip.'
    },
    { 
      id: 'lowerBack', 
      label: 'Lower Back', 
      number: 7,
      question: 'Please indicate the level of pain that you feel on average during the day at your LOWER BACK.'
    },
    { 
      id: 'upperBack', 
      label: 'Upper Back', 
      number: 8,
      question: 'Please indicate the level of pain that you feel on average during the day at your UPPER BACK.'
    },
    { 
      id: 'neck', 
      label: 'Neck', 
      number: 9,
      question: 'Please indicate the level of pain that you feel on average during the day at your NECK.'
    },
    { 
      id: 'rightShoulder', 
      label: 'Right Shoulder', 
      number: 10,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT shoulder.'
    },
    { 
      id: 'leftShoulder', 
      label: 'Left Shoulder', 
      number: 11,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT shoulder.'
    },
    { 
      id: 'rightElbow', 
      label: 'Right Elbow', 
      number: 12,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT elbow.'
    },
    { 
      id: 'leftElbow', 
      label: 'Left Elbow', 
      number: 13,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT elbow.'
    },
    { 
      id: 'rightWrist', 
      label: 'Right Wrist', 
      number: 14,
      question: 'Please indicate the level of pain that you feel on average during the day at your RIGHT wrist.'
    },
    { 
      id: 'leftWrist', 
      label: 'Left Wrist', 
      number: 15,
      question: 'Please indicate the level of pain that you feel on average during the day at your LEFT wrist.'
    },
    { 
      id: 'headache', 
      label: 'Headache', 
      number: 16,
      question: 'Please indicate the level of HEADACHE pain that you experience on average during the day.'
    },
    { 
      id: 'morningStiffness', 
      label: 'Morning Stiffness', 
      number: 17,
      question: 'Please indicate the level of pain and stiffness you experience when you wake up in the MORNING.'
    },
    { 
      id: 'eveningPain', 
      label: 'Evening Pain', 
      number: 18,
      question: 'Please indicate the level of pain you typically experience in the EVENING after a full day of activities.'
    },
    { 
      id: 'sleepDisturbance', 
      label: 'Sleep-Related Pain', 
      number: 19,
      question: 'Please indicate how much pain disturbs your SLEEP or wakes you up during the night.'
    },
    { 
      id: 'walkingPain', 
      label: 'Walking Pain', 
      number: 20,
      question: 'Please indicate the level of pain you experience while WALKING on flat ground.'
    },
    { 
      id: 'stairsPain', 
      label: 'Stairs Pain', 
      number: 21,
      question: 'Please indicate the level of pain you experience when going UP or DOWN stairs.'
    },
    { 
      id: 'sittingPain', 
      label: 'Sitting Pain', 
      number: 22,
      question: 'Please indicate the level of pain you experience while SITTING for extended periods.'
    },
    { 
      id: 'standingPain', 
      label: 'Standing Pain', 
      number: 23,
      question: 'Please indicate the level of pain you experience while STANDING for extended periods.'
    },
    { 
      id: 'bendingPain', 
      label: 'Bending Pain', 
      number: 24,
      question: 'Please indicate the level of pain you experience when BENDING forward or to the side.'
    },
    { 
      id: 'reachingPain', 
      label: 'Reaching Pain', 
      number: 25,
      question: 'Please indicate the level of pain you experience when REACHING overhead or to the side.'
    },
    { 
      id: 'grippingPain', 
      label: 'Gripping Pain', 
      number: 26,
      question: 'Please indicate the level of pain you experience when GRIPPING or holding objects.'
    },
    { 
      id: 'restPain', 
      label: 'Pain at Rest', 
      number: 27,
      question: 'Please indicate the level of pain you experience when you are at REST and not moving.'
    },
    { 
      id: 'activityPain', 
      label: 'Pain During Activity', 
      number: 28,
      question: 'Please indicate the level of pain you experience during PHYSICAL ACTIVITY or exercise.'
    },
    { 
      id: 'weatherPain', 
      label: 'Weather-Related Pain', 
      number: 29,
      question: 'Please indicate how much WEATHER CHANGES (cold, humidity, pressure) affect your pain level.'
    },
    { 
      id: 'stressPain', 
      label: 'Stress-Related Pain', 
      number: 30,
      question: 'Please indicate how much STRESS or ANXIETY increases your pain level.'
    },
    { 
      id: 'fatiguePain', 
      label: 'Fatigue-Related Pain', 
      number: 31,
      question: 'Please indicate how much FATIGUE or tiredness affects your pain level.'
    },
    { 
      id: 'mobilityLimitation', 
      label: 'Mobility Limitation', 
      number: 32,
      question: 'Please indicate how much pain LIMITS YOUR MOBILITY and ability to move freely.'
    },
    { 
      id: 'functionalImpact', 
      label: 'Daily Function Impact', 
      number: 33,
      question: 'Please indicate how much pain affects your ability to perform DAILY ACTIVITIES (dressing, bathing, cooking).'
    },
    { 
      id: 'qualityOfLifeImpact', 
      label: 'Quality of Life Impact', 
      number: 34,
      question: 'Please indicate how much pain affects your overall QUALITY OF LIFE and well-being.'
    },
    { 
      id: 'emotionalImpact', 
      label: 'Emotional Impact', 
      number: 35,
      question: 'Please indicate how much pain affects your EMOTIONAL STATE (mood, happiness, frustration).'
    },
    { 
      id: 'overallPain', 
      label: 'Overall Pain', 
      number: 36,
      question: 'Please indicate your OVERALL AVERAGE pain level considering all areas and situations.'
    }
];

export function QuestionsViewAllDialogue({ children }){
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
                                    onClick={(e) => {
                                        if (index > currentIndex){
                                            return;
                                        }

                                        const sectionId = reportState.sections.find(s => s.questionIds.includes(questionId))?.id;
                                        dispatch(setCurrentQuestionId(questionId));
                                        dispatch(setCurrentSectionId(sectionId));
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
