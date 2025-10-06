export enum IncytesReportQuestionType {
  TYPE_MULTIPLE_CHOICE,
  TYPE_SLIDER,
}

export interface IncytesReportQuestion {
  section: string,
  prompt: string,
  type: IncytesReportQuestionType,
  options?: string[],
}

export interface IncytesPatientGetByIdResponse {
  questions: IncytesReportQuestion[],
}
