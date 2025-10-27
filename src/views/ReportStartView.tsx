import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPatientReportData } from "@/store/slices/reportStateSlice";
import { setCurrentView, UIView } from "@/store/slices/uiStateSlice";
import { getSectionBorderTWClass } from "@/util/colors";
import { CheckCircle2, ChevronRight, Circle, CircleQuestionMark, Clock, ListOrdered, TrendingUp } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const REPORT_ID_URL_KEY_NAME = "id"

export const ReportStartView: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ params ] = useSearchParams();
  const reportState = useAppSelector(state => state.reportState);

  const onBeginPressed = () => {
    dispatch(setCurrentView(UIView.VIEW_CONSENT));
  }

  useEffect(() => {
    const reportId = params.get(REPORT_ID_URL_KEY_NAME);
    const isValidId = params.has(REPORT_ID_URL_KEY_NAME) && reportId?.trim() !== "";

    if (isValidId) {
      // TODO: prompt user before deleting all data from previous report?
      dispatch(fetchPatientReportData(reportId as string));
    } else {
      dispatch(setCurrentView(UIView.VIEW_NOT_FOUND));
    }
  }, [params])

  // display a simple skeleton while loading survey
  if (reportState.isFetchingData) {
    return (
      <div className="w-full h-full flex flex-row justify-center items-center">
        <div className="w-full max-w-5xl flex flex-col gap-10">
          <Skeleton className="h-8 w-64" />
          <div className="flex flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <Skeleton className="h-[442px] w-full rounded-lg" />
            </div>
            <div className="w-80 flex flex-col gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-14 w-full rounded-lg" />
              <Skeleton className="h-14 w-full rounded-lg" />
              <Skeleton className="h-14 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl">Welcome, <b>{reportState.user?.firstName}</b></h1>
          <Button variant="secondary">
            <CircleQuestionMark /> Help
          </Button>
        </div>
        <div className="flex flex-row gap-8 items-start min-h-0">
          <Card className="flex-1 py-4 gap-4 min-h-0">
            <CardHeader className="px-4 flex flex-col gap-4">
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-sm/4">Let's complete your</p>
                  <h2 className="text-xl font-bold">{reportState.displayTitle}</h2>
                </div>
                <Badge variant="secondary" className="flex flex-row items-center gap-2 h-6">
                  <div className="flex flex-row items-center gap-1">
                    <ListOrdered size={16} />
                    <p>{Object.keys(reportState.questions).length} questions</p>
                  </div>
                  <Separator orientation="vertical" className="h-4!" />
                  <div className="flex flex-row items-center gap-1">
                    <Clock size={16} />
                    <p>{Math.floor(reportState.remainingSecondsToCompleteEstimate / 60)} min</p>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="px-4 flex flex-row gap-3">
              <div className="flex flex-col flex-1 gap-2">
                <p>Your Timeline</p>
                <div className="bg-muted/50 rounded-lg h-[230px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                  <div className="flex flex-col p-2 pl-1 gap-3 relative">
                    {/* vertical line */}
                    <div className="absolute left-[13px] top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <CheckCircle2 size={20} className="text-green-600 z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-border rounded-lg p-3 opacity-60">
                        <p className="text-sm font-medium">Visit Dr. Doe</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <CheckCircle2 size={20} className="text-green-600 z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-border rounded-lg p-3 opacity-60">
                        <p className="text-sm font-medium">30 day check-in</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={20} className="text-primary fill-primary z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border-1 border-primary rounded-lg p-3 bg-primary/5">
                        <p className="text-sm font-bold">60 day check-in</p>
                        <p className="text-xs text-primary font-medium">Current</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={20} className="text-muted-foreground z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-dashed border-border rounded-lg p-3">
                        <p className="text-sm font-medium text-muted-foreground">90 day check-in</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={20} className="text-muted-foreground z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-dashed border-border rounded-lg p-3">
                        <p className="text-sm font-medium text-muted-foreground">180 day check-in</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <p>Your Impact</p>
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-600" />
                    <span className="text-2xl font-bold">2,847</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    patients helped by your data contributions
                  </p>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="px-4 justify-between">
              <Button variant="link">Cancel & Withdraw Consent</Button>
              <Button onClick={onBeginPressed}>Begin <ChevronRight /></Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-4 w-80">
            <h2 className="font-semibold">Sections</h2>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
              {reportState.sections.map((section) => (
                <div key={section.id} className={`border-l-3 border-1 ${getSectionBorderTWClass(section.color)} rounded-lg rounded-tl-none rounded-bl-none bg-white p-4 flex flex-row items-center justify-between`}>
                  <h3 className="text-lg font-semibold">{section.name}</h3>
                  <Badge variant="secondary">{section.questionIds.length} questions</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
