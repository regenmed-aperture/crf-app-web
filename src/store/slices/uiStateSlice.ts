import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPatientReportData, initializePatientReportSession } from "./reportStateSlice";
import { act } from "react";

const SLICE_NAME = 'uiState';

export enum UIView {
  VIEW_AUTH,
  VIEW_START,
  VIEW_CONSENT,
  VIEW_QUESTIONS,
  VIEW_RESULTS,
  
  VIEW_NOT_FOUND,
}

export interface UIState {
  currentView: UIView,
  currentSectionId: string | null,
  currentQuestionId?: string | null,
}

const initialState: UIState = {
  currentView: UIView.VIEW_AUTH,
  currentSectionId: null,
  currentQuestionId: null,
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
    setCurrentSectionId(state, action: PayloadAction<string|null>) {
      return {
        ...state,
        currentSectionId: action.payload
      }
    },
    setCurrentQuestionId(state, action: PayloadAction<string|null>) {
      return {
        ...state,
        currentQuestionId: action.payload
      }
    },
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
 } = uiStateSlice.actions;
