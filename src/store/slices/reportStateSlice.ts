import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReportQuestion, ReportQuestionResponse, ReportSection } from "../../models/report";
import { observationalProtocolService } from "../../services/observationalProtocolService";
import { authorizationService } from "@/services/authorizationService";
import { decodeReportToken } from "@/util/token";
import { randomIntFromInterval } from "@/util/math";
import { getSectionColor } from "@/util/colors";
import { IncytesQuestionType, type IncytesQuestionAnswerModel, type IncytesUserModel } from "@/models/incytes";
import type { IncytesPatientCaseSurveySide, IncytesPatientSurveyNavigationModel, SurveyTimelineItem } from "@/models/dto/incytes";
import type { QuestionResponse } from "./uiStateSlice";
import { surveyService } from "@/services/surveyService";

const SLICE_NAME = 'reportState';

export interface ReportState {
  isSubmittingData: boolean,
  submitError: string | null,
  isFetchingData: boolean,
  fetchError: string | null,

  user: IncytesUserModel | null,

  encodedReportId: string | null,
  instanceId: string | null,
  instanceVersionId: string | null,
  sections: ReportSection[],
  questions: Record<string, ReportQuestion>,
  responses: Record<string, ReportQuestionResponse>,
  navigation: IncytesPatientSurveyNavigationModel | null,
  displayTitle: string,

  remainingSecondsToCompleteEstimate: number,

  timeline: SurveyTimelineItem[],
  isTimelineLoading: boolean,
  timelineError: string | null,
}

const initialState: ReportState = {
  isSubmittingData: false,
  submitError: null,
  isFetchingData: true,
  fetchError: null,

  user: null,

  encodedReportId: null,
  instanceId: null,
  instanceVersionId: null,
  sections: [],
  questions: {},
  responses: {},
  navigation: null,
  displayTitle: "",

  remainingSecondsToCompleteEstimate: 0,

  timeline: [],
  isTimelineLoading: false,
  timelineError: null,
};

export const initializePatientReportSession = createAsyncThunk(
  `${SLICE_NAME}/initializePatientReportSession`,
  async ({ email, password }: { email: string, password: string, }) => {
    const data = await authorizationService.signInEmailPwd(email, password);
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
    data.answeredQuestions.forEach(bilateralArea => bilateralArea.questions.forEach(q => {
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
    }));

    return {
      instanceId: data.answeredQuestions[0].patientCaseSurveyInstanceId.toString(),
      instanceVersionId: data.answeredQuestions[0].patientCaseSurveyInstanceVersion.toString(),
      encodedReportId,
      sections: sections,
      questions: questionsObj,
      navigation: navigationData,
    };
  }
);

export const fetchSurveyTimeline = createAsyncThunk(
  `${SLICE_NAME}/fetchSurveyTimeline`,
  async (caseId: string) => {
    const data = await surveyService.getTimeline(caseId);
    return data;
  }
);

export const submitPatientReport = createAsyncThunk(
  `${SLICE_NAME}/submitPatientReport`,
  async ({ patient, encodedReportId, questionResponses }: { patient: IncytesUserModel, encodedReportId: string, questionResponses: Record<string, QuestionResponse> }) => {
    const dtoQuestions: IncytesQuestionAnswerModel[] = [];
    for (const response of Object.values(questionResponses)) {
      switch (response.questionType) {  
        // If multiple value question, create separate DTO entries for each answer
        case IncytesQuestionType.MultipleValue: {
          const multipleAnswers: number[] = response.answer as number[];
          for (const answer of multipleAnswers){
            const dtoQuestion: IncytesQuestionAnswerModel = {
              questionId: response.questionId,
              questionType: response.questionType,
              answer: answer.toString()
            }
            dtoQuestions.push(dtoQuestion);
          }
          break;
        }
        default: {
          const dtoQuestion: IncytesQuestionAnswerModel = {
            questionId: response.questionId,
            questionType: response.questionType,
            answer: response.answer?.toString() ?? ""
          }
          dtoQuestions.push(dtoQuestion);
          break;
        }
      }
    }

    const tokenData = decodeReportToken(encodedReportId); 
    const singleSide: IncytesPatientCaseSurveySide = {
      patientCaseSurveyInstanceId: 0,
      patientCaseSurveyInstanceVersion: 0,            // Not really sure how to find instance version
      bilateralAreaId: 0,                             // We ignore bilateral area here and mix all areas in one
      questionAnswers: dtoQuestions
    };
    const payload = {
      questionAnswerSides: [singleSide]
    };

    const response: boolean = await surveyService.submitSurvey(
      tokenData.caseId,
      tokenData.observationProtocolSurveyId,
      patient.surveyInstanceId.toString(),
      tokenData.surveyId,
      payload
    );
    return response;
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
        state.displayTitle = (action.payload.navigation.surveyTitle ?? "Patient 3 Months Post-Operative Follow-Up").replace("Survey", "");
        state.responses = {};
        state.instanceId = action.payload.instanceId;
        state.instanceVersionId = action.payload.instanceVersionId;

        state.remainingSecondsToCompleteEstimate = Object.keys(state.questions).length * 20;
      })
      .addCase(submitPatientReport.pending, (state) => {
        state.isSubmittingData = true;
      })
      .addCase(submitPatientReport.fulfilled, (state, action) => {
        state.isSubmittingData = false;
        state.submitError = action.payload.toString();
      })
      .addCase(fetchSurveyTimeline.pending, (state) => {
        state.isTimelineLoading = true;
        state.timelineError = null;
      })
      .addCase(fetchSurveyTimeline.fulfilled, (state, action) => {
        state.isTimelineLoading = false;
        if (action.payload.isSuccessful) {
          state.timeline = action.payload.surveys;
        } else {
          state.timelineError = action.payload.errorMessage;
        }
      })
      .addCase(fetchSurveyTimeline.rejected, (state, action) => {
        state.isTimelineLoading = false;
        state.timelineError = action.error.message ?? "Failed to fetch timeline";
      })
  },
});

export const {
  setIsFetchingData,
} = reportStateSlice.actions;
