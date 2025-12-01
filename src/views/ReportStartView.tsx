import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPatientReportData } from "@/store/slices/reportStateSlice";
import { setCurrentView, UIView } from "@/store/slices/uiStateSlice";
import { getSectionBorderTWClass } from "@/util/colors";
import { CheckCircle2, Circle, CircleQuestionMark, Clock, ListOrdered, TrendingUp } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const REPORT_ID_URL_KEY_NAME = "id"

export const ReportStartView: React.FC = () => {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onBeginPressed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBeginPressed])

  // display a simple skeleton while loading survey
  if (reportState.isFetchingData) {
    return (
      <div className="w-full h-full overflow-y-auto">
        <div className="min-h-full flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 sm:gap-10">
            <Skeleton className="h-8 w-48 sm:w-64" />
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
              <div className="flex-1 flex flex-col gap-4">
                <Skeleton className="h-[300px] sm:h-[442px] w-full rounded-lg" />
              </div>
              <div className="w-full lg:w-80 flex flex-col gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center flex-shrink-0">
            <h1 className="text-xl sm:text-2xl">Welcome, <b>{reportState.user?.firstName}</b></h1>
            <Button variant="secondary" className="w-full sm:w-auto">
              <CircleQuestionMark /> Help
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <Card className="flex-1 py-4 gap-4 w-full overflow-hidden">
            <CardHeader className="px-4 sm:px-6 flex flex-col gap-4">
              <div className="flex w-full flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm/4">Let's complete your</p>
                  <h2 className="text-lg sm:text-xl font-bold">{reportState.displayTitle}</h2>
                </div>
                <Badge variant="secondary" className="flex flex-row items-center gap-2 h-6 w-fit">
                  <div className="flex flex-row items-center gap-1">
                    <ListOrdered size={14} className="sm:w-4 sm:h-4" />
                    <p className="text-xs sm:text-sm">{Object.keys(reportState.questions).length} questions</p>
                  </div>
                  <Separator orientation="vertical" className="h-4!" />
                  <div className="flex flex-row items-center gap-1">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <p className="text-xs sm:text-sm">{Math.floor(reportState.remainingSecondsToCompleteEstimate / 60)} min</p>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="px-4 sm:px-6 flex flex-col md:flex-row gap-4 md:gap-3 overflow-hidden">
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <p className="text-sm sm:text-base font-medium">Your Timeline</p>
                <div className="bg-muted/50 rounded-lg h-[180px] sm:h-[200px] md:h-[230px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                  <div className="flex flex-col p-2 pl-1 gap-3 relative min-h-full">
                    {/* vertical line */}
                    <div className="absolute left-[13px] top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <CheckCircle2 size={18} className="sm:w-5 sm:h-5 text-green-600 z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-border rounded-lg p-2.5 sm:p-3 opacity-60">
                        <p className="text-xs sm:text-sm font-medium">Visit Dr. Doe</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <CheckCircle2 size={18} className="sm:w-5 sm:h-5 text-green-600 z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-border rounded-lg p-2.5 sm:p-3 opacity-60">
                        <p className="text-xs sm:text-sm font-medium">30 day check-in</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={18} className="sm:w-5 sm:h-5 text-primary fill-primary z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border-1 border-primary rounded-lg p-2.5 sm:p-3 bg-primary/5">
                        <p className="text-xs sm:text-sm font-bold">60 day check-in</p>
                        <p className="text-xs text-primary font-medium">Current</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={18} className="sm:w-5 sm:h-5 text-muted-foreground z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-dashed border-border rounded-lg p-2.5 sm:p-3">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">90 day check-in</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 relative">
                      <Circle size={18} className="sm:w-5 sm:h-5 text-muted-foreground z-1 bg-muted flex-shrink-0" />
                      <div className="flex-1 border border-dashed border-border rounded-lg p-2.5 sm:p-3">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">180 day check-in</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <p className="text-sm sm:text-base font-medium">Your Impact</p>
                <div className="bg-muted/50 rounded-lg p-3 sm:p-4 flex flex-col gap-2 h-[180px] sm:h-[200px] md:h-[230px] justify-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-xl sm:text-2xl font-bold">2,847</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    patients helped by your data contributions
                  </p>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="px-4 sm:px-6 flex-col sm:flex-row gap-3 sm:justify-between items-stretch sm:items-center flex-shrink-0">
              <Button variant="link" className="w-full sm:w-auto text-sm sm:text-base px-0 sm:px-4">Cancel & Withdraw Consent</Button>
              <Button
                className="flex flex-row justify-center items-center gap-2 w-full sm:w-auto min-h-[44px]"
                onClick={onBeginPressed}
              >
                <span>Begin</span>
                <Kbd className="bg-muted/40 text-primary hidden sm:inline-flex">⏎</Kbd>
              </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-4 w-full lg:w-80 flex-shrink-0">
          <h2 className="font-semibold text-base sm:text-lg">Sections</h2>
          <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent max-h-[250px] sm:max-h-[350px] lg:max-h-[420px] pr-2">
            {reportState.sections.map((section) => (
              <div key={section.id} className={`border-l-3 border-1 ${getSectionBorderTWClass(section.color)} rounded-lg rounded-tl-none rounded-bl-none bg-white p-3 sm:p-4 flex flex-row items-center justify-between flex-shrink-0`}>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold">{section.name}</h3>
                <Badge variant="secondary" className="text-xs sm:text-sm">{section.questionIds.length} questions</Badge>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
};
