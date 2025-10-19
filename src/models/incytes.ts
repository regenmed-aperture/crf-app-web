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
