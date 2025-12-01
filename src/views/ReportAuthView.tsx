import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializePatientReportSession, setIsFetchingData } from "@/store/slices/reportStateSlice";
import { isAuthenticated } from "@/util/auth";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

// TODO: absolutely horrendous but fine for demo
const EMAIL = "s96067052@gmail.com"
const PWD = "RSM_agnum2016"

export const ReportAuthView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isFetchingData, user } = useAppSelector(state => state.reportState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isFetchingData) {
      setIsFetchingData(true);
      dispatch(initializePatientReportSession({email: EMAIL, password: PWD}));
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //dispatch(initializePatientReportSession({ email, password }))
  };

  if (isFetchingData) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <Spinner className="size-6" />
        <p className="text-sm text-muted-foreground">authenticating...</p>
      </div>
    );
  } else if (!!user && isAuthenticated()) {
    // this is mainly to help with the slide-out animation. without this we'd have a flicker
    // of the sign in form for a brief moment which doesnt look good
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <Check className="size-6" />
        <p className="text-sm text-muted-foreground">authenticated</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-row justify-center items-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card className="gap-4">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-center">Sign In</h2>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};
