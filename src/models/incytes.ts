export enum IncytesReportQuestionType {
  TYPE_MULTIPLE_CHOICE,
  TYPE_SLIDER,
}

export interface IncytesReportQuestion {
  prompt: string,
  type: IncytesReportQuestionType,
  options?: string[],
}
