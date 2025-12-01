import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authorizationService } from "@/services/authorizationService";
import { encodeReportToken } from "@/util/token";
import { useState } from "react";
import type React from "react";

export const DevBuildLinkView: React.FC = () => {
  const [patientId, setPatientId] = useState("");
  const [observationProtocolSurveyId, setObservationProtocolSurveyId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const buildLink = async () => {
    const autoSignInComponents = await authorizationService.generateAutoSignInLinkComponents(patientId);

    const tokenData = {
      autoSignInEncodedPatientData: autoSignInComponents.patient,
      autoSignInToken: autoSignInComponents.token,
      observationProtocolSurveyId,
      caseId,
      surveyId,
      languageId,
    };

    const base64 = encodeReportToken(tokenData);

    const link = `${window.location.origin}${import.meta.env.BASE_URL}?id=${base64}`;
    setGeneratedLink(link);
  };

  return (
    <div className="w-full h-full flex p-8 bg-muted/30">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <div>
          <h1 className="text-lg text-muted-foreground">/dbg/build-link</h1>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <Input
            placeholder="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <Input
            placeholder="observationProtocolSurveyId"
            value={observationProtocolSurveyId}
            onChange={(e) => setObservationProtocolSurveyId(e.target.value)}
          />
          <Input
            placeholder="caseId"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
          <Input
            placeholder="surveyId"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
          />
          <Input
            placeholder="languageId"
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
          />
        </div>

        <Button
          onClick={buildLink}
          disabled={!observationProtocolSurveyId || !caseId || !surveyId || !languageId}
          variant="outline"
        >
          build
        </Button>

        {generatedLink && (
          <div className="flex flex-col gap-2 p-4 bg-background border rounded-lg">
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline break-all"
            >
              {generatedLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
