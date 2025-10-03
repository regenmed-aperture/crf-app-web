import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReportQuestion, ReportQuestionResponse, ReportSection } from "../../models/report";
import { patientService } from "../../services/patientService";

const SLICE_NAME = 'reportState';

export interface ReportState {
  isFetchingReport: boolean,
  fetchError: string | null,

  reportId: string | null,
  sections: ReportSection[],
  questions: Record<string, ReportQuestion>,
  responses: Record<string, ReportQuestionResponse>,
}

const initialState: ReportState = {
  isFetchingReport: false,
  fetchError: null,

  reportId: null,
  sections: [],
  questions: {},
  responses: {},
};

export const fetchReportData = createAsyncThunk(
  `${SLICE_NAME}/fetchReportData`,
  async (reportId: string) => {
    const data = await patientService.getReportById(reportId);
    return {
      reportId,
      sections: data.sections,
      questions: data.questions,
    };
  }
);

export const reportStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSections(state, action: PayloadAction<ReportSection[]>) {
      state.sections = action.payload;
    },
    setQuestions(state, action: PayloadAction<Record<string, ReportQuestion>>) {
      state.questions = action.payload;
    },
    addOrUpdateResponse(state, action: PayloadAction<{questionId: string, response: ReportQuestionResponse}>) {
      const payload = action.payload;
      state.responses[payload.questionId] = payload.response;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.isFetchingReport = true;
        state.fetchError = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.isFetchingReport = false;
        state.fetchError = null;
        
        state.reportId = action.payload.reportId;
        state.sections = action.payload.sections;
        state.questions = action.payload.questions;
        state.responses = {};
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.isFetchingReport = false;
        state.fetchError = action.error.message || 'Failed to load report';
      });
  },
});
