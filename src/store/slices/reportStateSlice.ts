import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReportQuestion, ReportQuestionResponse, ReportSection } from "../../models/report";
import { observationalProtocolService } from "../../services/observationalProtocolService";
import { userService } from "@/services/userService";
import { decodeReportToken } from "@/util/token";
import { randomIntFromInterval } from "@/util/math";
import { getSectionColor } from "@/util/colors";
import type { IncytesUserModel } from "@/models/incytes";
import type { IncytesPatientSurveyNavigationModel } from "@/models/dto/incytes";

const SLICE_NAME = 'reportState';

export interface ReportState {
  isFetchingData: boolean,
  fetchError: string | null,

  user: IncytesUserModel | null,

  encodedReportId: string | null,
  sections: ReportSection[],
  questions: Record<string, ReportQuestion>,
  responses: Record<string, ReportQuestionResponse>,
  navigation: IncytesPatientSurveyNavigationModel | null,
  displayTitle: string,

  remainingSecondsToCompleteEstimate: number,
}

const initialState: ReportState = {
  isFetchingData: true,
  fetchError: null,

  user: null,

  encodedReportId: null,
  sections: [],
  questions: {},
  responses: {},
  navigation: null,
  displayTitle: "",

  remainingSecondsToCompleteEstimate: 0,
};

export const initializePatientReportSession = createAsyncThunk(
  `${SLICE_NAME}/initializePatientReportSession`,
  async ({ email, password }: { email: string, password: string, }) => {
    const data = await userService.signIn(email, password);
    return data;
  }
);

export const fetchPatientReportData = createAsyncThunk(
  `${SLICE_NAME}/fetchPatientReportData`,
  async (encodedReportId: string) => {
    const tokenData = decodeReportToken(encodedReportId);

    const [data, navigationData] = await Promise.all([
      observationalProtocolService.getSurvey(tokenData.observationProtocolSurveyId, tokenData.caseId, tokenData.surveyId, tokenData.languageId),
      observationalProtocolService.getSurveyNavigation(tokenData.observationProtocolSurveyId, tokenData.caseId, tokenData.surveyId, tokenData.languageId)
    ]);

    const sections: ReportSection[] = [];
    const questionsObj: Record<string, ReportQuestion> = {};
    data.answeredQuestions[0].questions.forEach(q => {
      if (!q.title) return;

      const questionId = q.id ?? randomIntFromInterval(10000, 99999);

      const sectionName = q.isBundle ? q.bundleName : "Preliminary";
      let existingIdx = sections.findIndex(v => v.name === sectionName);
      if (existingIdx === -1) {
        const sectionIndex = sections.length;
        sections.push({
          name: sectionName,
          id: q.bundleId,
          color: getSectionColor(sectionIndex),
          questionIds: []
        })
        existingIdx = sections.length - 1;
      }
      sections[existingIdx].questionIds.push(questionId);

      questionsObj[questionId] = q;
    });

    return {
      encodedReportId,
      sections: sections,
      questions: questionsObj,
      navigation: navigationData,
    };
  }
);

export const reportStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsFetchingData(state, action: PayloadAction<boolean>) {
      state.isFetchingData = action.payload;
    },
    setSections(state, action: PayloadAction<ReportSection[]>) {
      state.sections = action.payload;
    },
    setQuestions(state, action: PayloadAction<Record<string, ReportQuestion>>) {
      state.questions = action.payload;
    },
    addOrUpdateResponse(state, action: PayloadAction<{ questionId: string, response: ReportQuestionResponse }>) {
      const payload = action.payload;
      state.responses[payload.questionId] = payload.response;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initializePatientReportSession.pending, (state) => {
        state.isFetchingData = true;
      })
      .addCase(initializePatientReportSession.fulfilled, (state, action) => {
        state.isFetchingData = false;
        state.fetchError = null;

        state.user = action.payload.user;
      })
      .addCase(fetchPatientReportData.pending, (state) => {
        state.isFetchingData = true;
      })
      .addCase(fetchPatientReportData.fulfilled, (state, action) => {
        state.isFetchingData = false;

        state.encodedReportId = action.payload.encodedReportId;
        state.sections = action.payload.sections;
        state.questions = action.payload.questions;
        state.navigation = action.payload.navigation;
        state.displayTitle = (action.payload.navigation.surveyTitle ?? "Patient 2-Week Post Operative").replace("Survey", "");
        state.responses = {};

        state.remainingSecondsToCompleteEstimate = Object.keys(state.questions).length * 20;
      })
  },
});

export const {
  setIsFetchingData,
} = reportStateSlice.actions;
