import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPatientReportData, initializePatientReportSession } from "./reportStateSlice";
import type { IncytesQuestionAnswerModel } from "@/models/incytes";

const SLICE_NAME = 'uiState';

export enum UIView {
  VIEW_AUTH,
  VIEW_START,
  VIEW_CONSENT,
  VIEW_QUESTIONS,
  VIEW_RESULTS,
  
  VIEW_NOT_FOUND,
}


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
  },
});

export const { 
  setCurrentView,
  setCurrentSectionId,
  setCurrentQuestionId,
  setQuestionResponse,
  setError
 } = uiStateSlice.actions;
