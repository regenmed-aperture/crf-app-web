import { createSlice } from "@reduxjs/toolkit";
import type { ReportQuestion, ReportQuestionResponse, ReportSection } from "../../models/report";

const SLICE_NAME = 'reportState';

export interface ReportState {
  sections: ReportSection[],
  questions: Map<string, ReportQuestion>,
  responses: Map<string, ReportQuestionResponse>,
}

export interface ReportStateAware {
  [SLICE_NAME]: ReportState;
}

const initialState: ReportState = {
  sections: [],
  questions: new Map(),
  responses: new Map(),
};

export const reportStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
  },
});
