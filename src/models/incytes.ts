/** Common models */
export enum ErrorCode {
  NoError = 0,
  UserNotConfirmed = 1,
  General = 2,
  SignOutException = 3,
  FailedToConfirmChangePasswordCode = 4,
  InvalidCode = 5,
  DuplicateUser = 6,
  UserDoesNotExist = 7,
  InvalidModel = 8,
  UserCannotBeAddedToTeam = 9,
  PasswordChangeRequired = 10,
  CannotDeactivate = 11,
  UserDoesNotHaveAccessToCircleOrCircleDoesNotExist = 12,
  CasesLimitReached = 13,
  CodeMismatchException = 14,
  UserIsNotTeamOwner = 15,
  WrongPassword = 16,
  SurveyAlreadyCompleted = 17,
  CircleUserLimitReached = 18,
  GeneralNotFound = 19,
  DeleteTranslationsFirst = 20,
  PhoneNotVerified = 21,
  PhoneVerificationRequired = 22,
  InvalidVerificationCode = 23,
  MFAAttemptLimitExceeded = 24,
  PhoneIsAlreadyInUse = 25,
  NeedToSetupMFA = 26,
  TermsAcceptingRequired = 27,
  AlreadyHasSubscription = 28,
  SubscriptionExpired = 29,
  DifferentPiRegionRequired = 30,
  SponsorIsInUse = 31,
  StripeSubscriptionDoesNotExist = 32,
  StripeSubscriptionDoesNotBelongToUser = 33,
  StripeCustomerDoesNotExist = 34,
  DuplicateSponsor = 35,
  SponsorAlreadyHasSubscription = 36,
  CustomerIdIsEmpty = 37,
  RemindersLimitExceeded = 38,
  PushNotificationGeneralError = 39,
  QuestionUsedInTheCases = 40,
  QuestionUsedInTheScoringGroups = 41,
  UserIsMemberOfAnotherTeam = 42,
  CircleAccessDenied = 43,
  ReportIsAlreadyBeingExported = 44,
  ReportExportFailed = 45,
  WrongProtocolVersion = 46,
  StripeSubscriptionIsCanceled = 47,
  InvalidPhoneNumber = 48,
  InvalidJurisdiction = 49,
  CleanUpFormulaError = 50,
  BenchmarkClinicianViewOtherPatient = 51,
  BenchmarkExpiredSession = 52,
  BenchmarkPatientViewOtherPatient = 53,
  InvalidCountry = 54,
  InvalidPatient = 55,
  SystemAdministratorNotAvailable = 56,
  ActiveImportExists = 57,
  ImportDataFileCorrupted = 58,
  ImportDataFileHeaderCorrupted = 59,
  ImportDataFileFirstHeaderCellIsEmpty = 60,
  ImportDataFileFirstDataCellIsEmpty = 61,
  ImportDoesNotExist = 62,
  ImportInProcessingStatus = 63,
  ImportInCompletedStatus = 64,
  ImportInCanceledStatus = 65,
  ImportInErrorStatus = 66,
  ImportInConfirmedStatus = 67,
  SurveyDoesNotExist = 68
}

export interface IncytesResponseModel {
  hasDataOrDataNotAvailable: boolean,
  isSuccessful: boolean,
  errorMessage: string,
  errorCode: ErrorCode,
  redirectTo: string,
}

/** Question models */
export enum IncytesQuestionType {
  Invalid = 0,
  SingleValue = 1,
  MultipleValue = 2,
  Grouped = 3,
  TrueFalse = 4,
  Text = 5,
  Number = 6,
  Date = 7,
  Copy = 8,
  Analog = 9,
  Image = 10,
  PDF = 11
}

export interface IncytesAnsweredQuestionsModel {
  revisions: IncytesSurveyAnswerRevisionModel[];
  questions: IncytesQuestionBase[];
  patientCaseSurveyInstanceId: number;
  bilateralAreaId: number | null;
  patientCaseSurveyInstanceVersion: number;
}

export interface IncytesSurveyAnswerRevisionModel {
  revisionId: number;
  id: number;
  createDate: string;
  createdBy: number;
  createdByName: string;
  differences: IncytesSurveyAnswerChangesModel[];
}

export interface IncytesSurveyAnswerChangesModel {
  id: number;
  uniqueId: number;
  questionType: IncytesQuestionType;
  oldValue: string[];
  newValue: string[];
}

export interface IncytesQuestionBase {
  id: number | null;
  instanceId: number;
  title: string;
  tag: string;
  isLocked: boolean;
  instructions: string;
  sortOrder: number;
  questionType: IncytesQuestionType;
  isBundle: boolean;
  bundleName: string;
  hasFormula: boolean;
  score: number;
  bundleId: number;
  bundleEntityId: number;
  languageId: number;
  lowerFence: number;
  upperFence: number;
  isUpperBreach: boolean;
  isLowerBreach: boolean;
  isBreach: boolean;
  uniqueId: number;
  isOptional: boolean;
  isPiData: boolean;
  displayInstructionAsIcon: boolean;
  answerDate: string | null;
  isConditionalVisibility: boolean;
  visibilityRule: string;
  optionalRule: string;
  isBilateral: boolean;
  context: string;
}

export interface IncytesSingleValueAnswer {
  id: number;
  label: string;
  value: string;
  sortOrder: number;
  tag: string;
  languageId: number;
  checked: boolean;
}

export interface IncytesSingleValueQuestionModel extends IncytesQuestionBase {
  answers: IncytesSingleValueAnswer[];
  isDropdown: boolean;
}

export interface IncytesMultipleValueAnswer {
  id: number;
  label: string;
  value: string;
  sortOrder: number;
  tag: string;
  languageId: number;
  checked: boolean;
}

export interface IncytesMultipleValueQuestionModel extends IncytesQuestionBase {
  answers: IncytesMultipleValueAnswer[];
  isDropdown: boolean;
}

export interface IncytesGroupedQuestionCategory {
  id: number;
  label: string;
  sortOrder: number;
  tag: string;
  languageId: number;
  value: number | null;
}

export interface IncytesGroupedQuestionModel extends IncytesQuestionBase {
  minimumValue: number;
  range: number;
  categories: IncytesGroupedQuestionCategory[];
  isDropdown: boolean;
}

export interface IncytesTFQuestionModel extends IncytesQuestionBase {
  value: number;
}

export interface IncytesTextQuestionModel extends IncytesQuestionBase {
  value: string;
  isRegularExpressionEnabled: boolean;
  regularExpression: string;
  regularExpressionValidation: string;
  isConsentRequired: boolean;
}

export interface IncytesNumberQuestionModel extends IncytesQuestionBase {
  unitId: number;
  digits: number;
  value: number | null;
  measurementTypeId: number;
  maximum: number | null;
  minimum: number | null;
  isRegularExpressionEnabled: boolean;
  regularExpression: string;
  regularExpressionValidation: string;
}

export interface IncytesDateQuestionModel extends IncytesQuestionBase {
  value: string;
  isRegularExpressionEnabled: boolean;
  regularExpression: string;
  regularExpressionValidation: string;
}

export interface IncytesAnalogQuestionModel extends IncytesQuestionBase {
  canonicalId: number | null;
  startText: string;
  endText: string;
  startValue: number;
  endValue: number;
  stepValue: number;
  startImagePath: string;
  endImagePath: string;
  value: string;
}

export interface IncytesFileQuestionModel extends IncytesQuestionBase {
  url: string;
  value: string;
  smallThumbnailValue: string;
  mediumThumbnailValue: string;
  tempBucketUrl: string;
  smallThumbnailUrl: string;
  mediumThumbnailUrl: string;
}

/** User models  */

export enum QuestionType {
  Invalid = 0,
  SingleValue = 1,
  MultipleValue = 2,
  Grouped = 3,
  TrueFalse = 4,
  Text = 5,
  Number = 6,
  Date = 7,
  Copy = 8,
  Analog = 9,
  Image = 10,
  PDF = 11
}

export interface IncytesCognitoSurveyData {
  pcsi: number;                     // PatientCaseSurveyInstanceId,
  v: IncytesCognitoSurveyAnswer[];  // Values
}

export interface IncytesCognitoSurveyAnswer {
  qi: number;                       // QuestionId
  qt: QuestionType;                 // QuestionType
  a: string;                        // Answer
  d: Date | null;                   // AnswerDate                  
}

export interface IncytesSurveyAnswerChanges {
  id: number;
  uniqueId: number;
  questionType: QuestionType;
  oldValue: string[];
  newValue: string[];
}

export interface IncytesCognitoSurveyAnswerChangeLog {
  cl: number;                       // ChangeLogId
  d: IncytesSurveyAnswerChanges[];  // Differences
}


export interface IncytesUserModel extends IncytesResponseModel {
  id: number;
  id36: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date | null;
  dateJoined: Date | null;
  countryName: string;
  countryId: number | null;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  languageId: number;
  protocolName: string;
  circleId: number;
  caseId: number;
  protocolId: number;
  surveyId: number;
  surveyInstanceId: number;
  referenceDescription: string;
  pathologyDescription: string;
  jurisdictionId: number;
  termsAccepted: boolean;
  lastCircleTermsAccepted: boolean;
  languageName: string;
  languageAbbreviation: string;
  isVerified: boolean;
  teamPatient2FAEnabled: boolean;
  patient2FAEnabled: boolean;
  surveyAnswers: IncytesCognitoSurveyData[];
  surveyChangeLogs: IncytesCognitoSurveyAnswerChangeLog[];
  sendRegistrationSms: boolean;
  ownerId: number;
  hasIssuesWithEmail: boolean;
  isNotificationsDisabled: boolean;
  isSelfOnboarding: boolean; 
}

export interface IncytesVerifyPhoneModel {
  phoneNumber: string;
  mask: string;
  rawData: string;
  sentUtc: Date;
}

export enum IncytesUserRegistrationStatus {
  UserNotFound = 0,
  RegistrationNotStarted = 1,
  ConfirmationCodeSent = 2,
  ConfirmationCodeAccepted = 3,
  PasswordSettedUp = 4,
  Registered = 5,
  ChangePassword = 6
}
