import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
    setSections(state, action) {
      state.sections = action.payload;
    },
    setQuestions(state, action) {
      state.questions = new Map(action.payload);
    },
    addOrUpdateResponse(state, action: PayloadAction<{questionId: string, response: ReportQuestionResponse}>) {
      const payload = action.payload;
      state.responses.set(payload.questionId, payload.response);
    },
  },
});
