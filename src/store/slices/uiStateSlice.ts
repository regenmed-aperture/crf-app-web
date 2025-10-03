import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchReportData } from "./reportStateSlice";

const SLICE_NAME = 'uiState';

export enum UIView {
  VIEW_LANDING,
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
  currentView: UIView.VIEW_LANDING,
  currentSectionId: null,
  currentQuestionId: null,
};

export const uiStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentView(state, action: PayloadAction<UIView>) {
      state.currentView = action.payload;
    },
    setCurrentSectionId(state, action: PayloadAction<string>) {
      state.currentSectionId = action.payload;
    },
    setCurrentQuestionId(state, action: PayloadAction<string>) {
      state.currentQuestionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.fulfilled, (state) => {
        state.currentView = UIView.VIEW_LANDING;
        state.currentSectionId = null;
        state.currentQuestionId = null;
      })
      .addCase(fetchReportData.rejected, (state) => {
        state.currentView = UIView.VIEW_NOT_FOUND;
      });
  },
});

export const { 
  setCurrentView,
  setCurrentSectionId,
  setCurrentQuestionId,
 } = uiStateSlice.actions;
