import type { IncytesAnsweredQuestionsModel } from "../incytes";

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
