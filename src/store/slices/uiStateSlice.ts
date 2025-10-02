import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const SLICE_NAME = 'uiState';

export interface UIState {
  currentSectionId?: string,
  currentQuestionId?: string,
}

export interface UIStateAware {
  [SLICE_NAME]: UIState;
}

const initialState: UIState = {};

export const uiStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentSectionId(state, action: PayloadAction<string>) {
      state.currentSectionId = action.payload;
    },
    setCurrentQuestionId(state, action: PayloadAction<string>) {
      state.currentQuestionId = action.payload;
    },
  },
});
