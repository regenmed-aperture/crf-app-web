import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPatientReportData, initializePatientReportSession, submitPatientReport } from "./reportStateSlice";

const SLICE_NAME = 'uiState';

export enum UIView {
  VIEW_AUTH,
  VIEW_START,
  VIEW_CONSENT,
  VIEW_QUESTIONS,
  VIEW_RESULTS,
  VIEW_LOADING,

  VIEW_NOT_FOUND,
}

/**
 * Represents a model of question answer. For different types of questions, 
 * answer has different values
 * 
 * 1. Multi choice question - array of choice id
 * 2. Single choice question - single choice id
 * 3. Date question - date object
 * 4. Slider question - value of the slider (int)
 */
export interface QuestionResponse {
  questionId: number,
  questionType: number,
  answer: unknown
};

export interface UIState {
  currentView: UIView,
  currentSectionId: number | null,
  currentQuestionId?: number | null,
  currentResponses: Record<number, QuestionResponse> | null,
  error: boolean
}

const initialState: UIState = {
  currentView: UIView.VIEW_AUTH,
  currentSectionId: null,
  currentQuestionId: null,
  currentResponses: null,
  error: false
};

export const uiStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentView(state, action: PayloadAction<UIView>) {
      return {
        ...state,
        currentView: action.payload
      };
    },
    setCurrentSectionId(state, action: PayloadAction<number|null>) {
      return {
        ...state,
        currentSectionId: action.payload
      }
    },
    setCurrentQuestionId(state, action: PayloadAction<number|null>) {
      return {
        ...state,
        currentQuestionId: action.payload
      };
    },
    setQuestionResponse(state, action: PayloadAction<[number, QuestionResponse]>) {
      const [questionId, response] = action.payload;
      if (!state.currentResponses){
        return {
          ...state,
          currentResponses: {
            [questionId]: response
          }
        }
      }
      else {
        return {
          ...state,
          currentResponses: {
            ...state.currentResponses,
            [questionId]: response
          }
        }
      }
    },
    setError(state, action: PayloadAction<boolean>){
      return {
        ...state,
        error: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePatientReportSession.fulfilled, (state) => {
        state.currentView = UIView.VIEW_START;
      })
      .addCase(fetchPatientReportData.fulfilled, (state) => {
        if (state.currentQuestionId) {
          state.currentView = UIView.VIEW_QUESTIONS;
        }
      })
      .addCase(submitPatientReport.pending, (state) => {
        state.currentView = UIView.VIEW_LOADING;
      })
      .addCase(submitPatientReport.fulfilled, (state) => {
        return {
          ...state,
          currentView: UIView.VIEW_RESULTS,
          currentResponses: null,
          currentQuestionId: null,
          currentSectionId: null,
          error: false
        };
      })
  },
});

export const { 
  setCurrentView,
  setCurrentSectionId,
  setCurrentQuestionId,
  setQuestionResponse,
  setError
 } = uiStateSlice.actions;
