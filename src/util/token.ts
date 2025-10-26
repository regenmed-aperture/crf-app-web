export interface ReportTokenData {
  observationProtocolSurveyId: string;
  caseId: string;
  surveyId: string;
  languageId: string;
}

export const decodeReportToken = (token: string): ReportTokenData => {
  try {
    const base64 = token
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    return JSON.parse(atob(base64));
  } catch (error) {
    throw new Error('Invalid report token format');
  }
};