import type { IncytesAnsweredQuestionsModel, IncytesUserModel, IncytesVerifyPhoneModel, IncytesUserRegistrationStatus } from "../incytes";

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

/** User registration response data */
export interface IncytesPatientAuthenticationResponseModel extends IncytesResponseModel {
  isUserConfirmed: boolean;
  user: IncytesUserModel;
  redirectTo: string;
  verifyPhone: IncytesVerifyPhoneModel;
  linkExpired: boolean;
}

export interface IncytesUserRegistrationStatusResponseModel extends IncytesResponseModel {
  registrationStatus: IncytesUserRegistrationStatus
}

export interface IncytesConfirmUserRegistrationResponseModel extends IncytesResponseModel {}

