import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reportStateSlice } from './slices/reportStateSlice';
import { uiStateSlice } from './slices/uiStateSlice';

const combined = combineReducers({
  [reportStateSlice.name]: reportStateSlice.reducer,
  [uiStateSlice.name]: uiStateSlice.reducer,
});

const store = configureStore({
  reducer: combined,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
