import type { IncytesBilateralQuestionCollectionResponseModel, IncytesPatientSurveyNavigationModel } from "@/models/dto/incytes";

// rn in dev env this is handled by the vite proxy config
// const BASE_URL = "demo-patient.incytesapp.co";

export const observationalProtocolService = {
  async getSurvey(observationProtocolSurveyId: string, caseId: string, surveyId: string, languageId: string): Promise<IncytesBilateralQuestionCollectionResponseModel> {
    const response = await fetch(`/api/observationalProtocol/ops/${observationProtocolSurveyId}/case/${caseId}/survey/${surveyId}/language/${languageId}/questions`);
    const data: IncytesBilateralQuestionCollectionResponseModel = await response.json();

    if (data.answeredQuestions.length === 0) {
      // error
      throw new Error("no data");
    }

    return data;
  },

  async getSurveyNavigation(observationProtocolSurveyId: string, caseId: string, surveyId: string, languageId: string): Promise<IncytesPatientSurveyNavigationModel> {
    const response = await fetch(`/api/observationalProtocol/ops/${observationProtocolSurveyId}/case/${caseId}/survey/${surveyId}/language/${languageId}/surveyNavigation`);
    const data: IncytesPatientSurveyNavigationModel = await response.json();

    return data;
  },
}
