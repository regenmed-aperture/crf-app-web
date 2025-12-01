import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";
import { CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import type React from "react";
import CountUp from "react-countup";
import { motion } from "motion/react";

export const ReportResultsView: React.FC = () => {
  const reportState = useAppSelector(state => state.reportState);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-10">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Thank you, {reportState.user?.firstName}!</h1>
            <p className="text-muted-foreground">Your responses have been recorded</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
        </div>

        <div className="flex flex-row gap-8">
          <Card className="flex-1 py-4 gap-4">
            <CardHeader className="px-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Report Completed</h2>
                <p className="text-sm text-muted-foreground">
                  {reportState.displayTitle}
                </p>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="px-6 flex flex-col gap-6">
              {/* Progress indicator */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Survey Completion Progress</p>
                  <span className="text-2xl font-bold text-green-600"><CountUp start={0} end={60} duration={2} delay={0.5} />%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div className="bg-green-600 h-3 rounded-full" initial={{width:'0%'}} animate={{width:'60%'}} transition={{ ease:"easeOut", duration: 2}}></motion.div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're now among the 96 of participants that answered!
                </p>
              </div>

              <Separator />

              {/* Key information */}
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">What happens next?</h3>
                <div className="flex flex-col gap-2">
                  <motion.div className="flex items-start gap-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.5, delay:2}}>
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm">Your responses will be analyzed alongside other participant data</p>
                  </motion.div>
                  <motion.div className="flex items-start gap-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.5, delay:2.5}}>
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm">Results may be used to improve treatment protocols and patient outcomes</p>
                  </motion.div>
                  <motion.div className="flex items-start gap-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.5, delay:3}}>
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm">You'll be notified when your next report is due</p>
                  </motion.div>
                </div>
              </div>

              <Separator />

              {/* Your Impact */}
              <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <p className="font-semibold">Your Impact</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold"><CountUp start={0} end={2847} separator="," duration={1} delay={0.5} /></span>
                  <p className="text-sm text-muted-foreground">patients helped by your data contributions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 w-80">
            <h2 className="font-semibold">Your Timeline</h2>
            <div className="flex flex-col gap-3">
              <motion.div className="border rounded-lg bg-white p-4" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1, delay:4}}>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="text-green-600" size={20} />
                  <div>
                    <h3 className="font-semibold text-sm">60 day check-in</h3>
                    <p className="text-xs text-muted-foreground">Completed today</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="border rounded-lg bg-white p-4" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1, delay:5}}>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <h3 className="font-semibold text-sm">90 day check-in</h3>
                    <p className="text-xs text-muted-foreground">Due Nov 5, 2025</p>
                  </div>
                </div>
                <Badge variant="secondary">In 30 days</Badge>
              </motion.div>

              <motion.div className="border rounded-lg bg-muted/30 p-4" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1, delay:6}}>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-muted-foreground" size={20} />
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">180 day check-in</h3>
                    <p className="text-xs text-muted-foreground">Due Feb 3, 2026</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <Separator />

            <div className="border rounded-lg bg-white p-4">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you have questions about this report or the research study, contact us.
              </p>
              <Button variant="outline" size="sm" className="w-full">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
