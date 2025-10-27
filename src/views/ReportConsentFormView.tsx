import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentView, UIView } from "@/store/slices/uiStateSlice";
import { FileText } from "lucide-react";
import React from "react";

export const ReportConsentFormView: React.FC = () => {
  const dispatch = useAppDispatch();

  const onConsentGranted = () => {
    dispatch(setCurrentView(UIView.VIEW_QUESTIONS));
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center p-4">
      <div className="w-full max-w-2xl flex flex-col justify-center gap-6">
        <h2 className="text-xl font-semibold text-center">Before we continue...</h2>

        <Card className="py-4 gap-4">
          <CardHeader className="px-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Data Usage Agreement</h3>
                <p className="text-sm text-muted-foreground">
                  We take your privacy seriously. Your responses will be used solely for medical research purposes and will be anonymized.
                </p>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="px-4">
            <div className="rounded-lg border bg-muted/30 max-h-[300px] overflow-auto">
              <div className="p-4 prose prose-sm max-w-none text-sm space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Purpose of Data Collection</h4>
                  <p className="text-muted-foreground">
                    Your survey responses will be used to improve patient outcomes and advance medical research in orthopedic surgery recovery. This data helps healthcare providers better understand recovery patterns and optimize treatment protocols.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. How Your Data Will Be Used</h4>
                  <p className="text-muted-foreground">
                    Your anonymized responses may be analyzed alongside other patient data to identify trends, measure treatment effectiveness, and contribute to peer-reviewed research publications. Individual responses will never be identifiable.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Data Privacy & Security</h4>
                  <p className="text-muted-foreground">
                    All data is encrypted and stored securely. Personal identifying information is separated from your responses. Only authorized researchers will have access to the anonymized dataset.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">4. Your Rights</h4>
                  <p className="text-muted-foreground">
                    You may withdraw your consent at any time. Withdrawing will not affect your medical care. Previously collected data may still be used in ongoing research if it has already been anonymized and included in datasets.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">5. Contact Information</h4>
                  <p className="text-muted-foreground">
                    If you have questions about this research or your data rights, please contact our research coordinator at research@example.com or call (555) 123-4567.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="px-4">
            <div className="w-full flex flex-row justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1 flex flex-row justify-center items-center gap-2"
                onClick={onConsentGranted}
              >
                <span>I do not consent</span>
                <Kbd className="bg-muted/40 text-primary">Esc</Kbd>
              </Button>
              <Button
                className="flex-1 flex flex-row justify-center items-center gap-2"
                onClick={onConsentGranted}
              >
                <span>I consent to participate</span>
                <Kbd className="bg-muted/40 text-primary">⏎</Kbd>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          By clicking "I consent to participate", you agree to the terms outlined above
        </p>
      </div>
    </div>
  )
};
