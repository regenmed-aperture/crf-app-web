import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reportStateSlice } from './slices/reportStateSlice';

const combined = combineReducers({
  [reportStateSlice.name]: reportStateSlice.reducer,
});

const store = configureStore({
  reducer: (state, action) => {
    return combined(state, action);
  },
});

export default store;

