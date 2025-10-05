import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ChevronRight, Circle, CircleQuestionMark, Clock, ListOrdered, TrendingUp } from "lucide-react";
import type React from "react";

export const ReportLandingPageView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl">Welcome, <b>Gleb</b></h1>
          <Button variant="secondary">
            <CircleQuestionMark /> Help
          </Button>
        </div>
        <div className="flex flex-row gap-8">
          <Card className="flex-1 py-4 gap-4">
            <CardHeader className="px-4 flex flex-col gap-4">
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-sm/4">Let's complete your</p>
                  <h2 className="text-xl font-bold">Knee surgery - 60 day check-in</h2>
                </div>
                <Badge variant="secondary" className="flex flex-row items-center gap-2 h-6">
                  <div className="flex flex-row items-center gap-1">
                    <ListOrdered size={16} />
                    <p>23 questions</p>
                  </div>
                  <Separator orientation="vertical" className="h-4!" />
                  <div className="flex flex-row items-center gap-1">
                    <Clock size={16} />
                    <p>10 min</p>
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
              <Button>Begin <ChevronRight /></Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-4 w-80">
            <h2 className="font-semibold">Sections</h2>
            <div className="flex flex-col gap-3">
              <div className="border-l-3 border-1 border-l-red-400 rounded-lg rounded-tl-none rounded-bl-none bg-white p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Pain & Mobility</h3>
                  <Badge variant="secondary">8 questions</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Daily activities, pain levels, range of motion</p>
              </div>

              <div className="border-l-3 border-1 border-l-green-400 rounded-lg rounded-tl-none rounded-bl-none bg-white p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Recovery Progress</h3>
                  <Badge variant="secondary">7 questions</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Physical therapy, healing timeline, milestones</p>
              </div>

              <div className="border-l-3 border-1 border-l-blue-400 rounded-lg rounded-tl-none rounded-bl-none bg-white p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Quality of Life</h3>
                  <Badge variant="secondary">8 questions</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Sleep quality, mental health, daily routines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
