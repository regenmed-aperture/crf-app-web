import type { IncytesAnalogQuestionModel, IncytesDateQuestionModel, IncytesFileQuestionModel, IncytesGroupedQuestionModel, IncytesMultipleValueQuestionModel, IncytesNumberQuestionModel, IncytesQuestionBase, IncytesSingleValueQuestionModel, IncytesTextQuestionModel, IncytesTFQuestionModel } from "./incytes";

export type ReportQuestion =
  | IncytesSingleValueQuestionModel
  | IncytesMultipleValueQuestionModel
  | IncytesGroupedQuestionModel
  | IncytesTFQuestionModel
  | IncytesTextQuestionModel
  | IncytesNumberQuestionModel
  | IncytesDateQuestionModel
  | IncytesAnalogQuestionModel
  | IncytesFileQuestionModel
  | IncytesQuestionBase;

export interface ReportSection {
  id: string,
  name: string,
  color: string,
  questionIds: string[],
}

export interface ReportQuestionResponse {
  choice?: string,
  numericValue?: number,
}
