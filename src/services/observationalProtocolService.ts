import type { IncytesAddBilateralAnswerModel, IncytesBilateralQuestionCollectionResponseModel, IncytesPatientSurveyNavigationModel } from "@/models/dto/incytes";

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

  /**
   * Submit survey answers
   *
   * @param caseId - case ID
   * @param protocolId - observational protocol ID
   * @param instanceId - protocol instance ID
   * @param surveyId - survey ID
   * @param questionAnswerSides - AddBilateralAnswerModel model containing answers
   * @returns  response containing next survey data if any
  */
  async submitSurvey(caseId: string, protocolId: string, instanceId: string, surveyId: string, payload: IncytesAddBilateralAnswerModel): Promise<boolean> {
    console.log("Submitting response back");
    const response = await fetch(`/api/survey/${caseId}/${protocolId}/${instanceId}/${surveyId}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const obj = await response.json();
    console.log("Finished the response and received status code: " + response.status);
    console.log(obj);


    return response.status === 200;
  }
}
