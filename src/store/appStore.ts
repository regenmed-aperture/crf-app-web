import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reportStateSlice } from './slices/reportStateSlice';
import { uiStateSlice } from './slices/uiStateSlice';

const combined = combineReducers({
  [reportStateSlice.name]: reportStateSlice.reducer,
  [uiStateSlice.name]: uiStateSlice.reducer,
});

const store = configureStore({
  reducer: (state, action) => {
    return combined(state, action);
  },
});

export default store;

