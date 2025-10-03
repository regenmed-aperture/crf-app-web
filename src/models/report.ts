import type { IncytesReportQuestion } from "./incytes";

export interface ReportQuestion extends IncytesReportQuestion {
  id: string,
}

export interface ReportSection {
  id: string,
  name: string,
  color: string,
  questions: string[],
}

export interface ReportQuestionResponse {
  choice?: string,
  numericValue?: number,
}
