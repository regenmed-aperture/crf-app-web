import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReportQuestion, ReportQuestionResponse, ReportSection } from "../../models/report";
import { observationalProtocolService } from "../../services/observationalProtocolService";
import { userService } from "@/services/userService";
import { decodeReportToken, type ReportTokenData } from "@/util/token";
import { randomIntFromInterval } from "@/util/math";
import { getSectionColor } from "@/util/colors";
import { IncytesQuestionType, type IncytesAnsweredQuestionsModel, type IncytesQuestionAnswerModel, type IncytesUserModel } from "@/models/incytes";
import type { IncytesAddBilateralAnswerModel, IncytesPatientCaseSurveySide, IncytesPatientSurveyNavigationModel } from "@/models/dto/incytes";
import type { QuestionResponse } from "./uiStateSlice";
import { act } from "react";

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

export const submitPatientReport = createAsyncThunk(
  `${SLICE_NAME}/submitPatientReport`,
  async ({ patient, instanceId, instanceVersionId, encodedReportId, questionResponses }: { patient: IncytesUserModel, instanceId: string, instanceVersionId: string, encodedReportId: string, questionResponses: Record<string, QuestionResponse> }) => {
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
    console.log("Question Responses I collected ");
    console.log(dtoQuestions);

    console.log("Before preparing the payload");
    console.log(instanceVersionId);
    const tokenData = decodeReportToken(encodedReportId); 
    const singleSide: IncytesPatientCaseSurveySide = {
      patientCaseSurveyInstanceId: patient.surveyInstanceId,
      patientCaseSurveyInstanceVersion: parseInt(instanceVersionId),            // Not really sure how to find instance version
      bilateralAreaId: 0,                             // We ignore bilateral area here and mix all areas in one
      questionAnswers: dtoQuestions
    };
    const payload: IncytesAddBilateralAnswerModel = {
      patientId: patient.id,
      caseId: patient.caseId,
      surveyId: patient.surveyId,
      surveyInstanceId: patient.surveyInstanceId,
      reOpened: false,
      questionAnswerSides: [singleSide]
    };
    console.log(payload);

    const response: boolean = await observationalProtocolService.submitSurvey(
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
        state.displayTitle = (action.payload.navigation.surveyTitle ?? "Patient 2-Week Post Operative").replace("Survey", "");
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
  },
});

export const {
  setIsFetchingData,
} = reportStateSlice.actions;
