import type { IncytesAddBilateralAnswerModel } from "@/models/dto/incytes";

export const surveyService = {
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
