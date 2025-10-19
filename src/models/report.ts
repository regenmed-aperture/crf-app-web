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
  id: number,
  name: string,
  color: string,
  questionIds: number[],
}

export interface ReportQuestionResponse {
  choice?: string,
  numericValue?: number,
}
