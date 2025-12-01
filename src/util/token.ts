export interface ReportTokenData {
  autoSignInEncodedPatientData: string;
  autoSignInToken: string;
  observationProtocolSurveyId: string;
  caseId: string;
  surveyId: string;
  languageId: string;
}

export const encodeReportToken = (data: ReportTokenData): string => {
  return btoa(JSON.stringify(data))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const decodeReportToken = (token: string): ReportTokenData => {
  try {
    const base64 = token
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    return JSON.parse(atob(base64));
  } catch (error) {
    throw new Error('Invalid report token format: ' + error);
  }
};
