import type { IncytesAnsweredQuestionsModel, IncytesQuestionAnswerModel, IncytesUserModel } from "../incytes";

export interface IncytesResponseModel {
  isSuccessful: boolean;
  errorMessage: string;
  errorCode: number;
  redirectTo: string;
  hasDataOrDataNotAvailable: boolean;
}

export interface IncytesBilateralQuestionCollectionResponseModel extends IncytesResponseModel {
  answeredQuestions: IncytesAnsweredQuestionsModel[];
}

/** User-related endpoint response data */
export interface IncytesPatientGenerateAutoSignInLinkResponseModel {
  patient: string;
  token: string;
}

export interface IncytesPatientAuthenticationResponseModel extends IncytesResponseModel {
  isUserConfirmed: boolean;
  user: IncytesUserModel;
  redirectTo: string;
  linkExpired: boolean;
}

export interface IncytesPatientSurveyNavigationModel extends IncytesResponseModel {
  caseId: number;
  circleName: string;
  surveyId: number;
  surveyInstanceId: number;
  protocolId: number;
  protocolName: string;
  surveyTitle: string;
  dueUnit: number;
  dueValue: number;
  expiresUtc: string;
  dueDate: string;
  surveyIsCompleted: boolean;

  nextCaseId: number;
  nextCircleName: string;
  nextSurveyId: number;
  nextSurveyInstanceId: number;
  nextProtocolId: number;
  nextProtocolName: string;
  nextSurveyTitle: string;
  nextDueUnit: number;
  nextDueValue: number;
  nextExpiresUtc: string;
  nextDueDate: string;
}

export interface IncytesAddBilateralAnswerModel {
  questionAnswerSides: IncytesPatientCaseSurveySide[]
}

export interface IncytesPatientCaseSurveySide {
  patientCaseSurveyInstanceId: number,
  patientCaseSurveyInstanceVersion: number,
  bilateralAreaId: number,
  questionAnswers: IncytesQuestionAnswerModel[]
}
