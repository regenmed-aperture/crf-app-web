import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { reportStateSlice } from './slices/reportStateSlice';
import { uiStateSlice } from './slices/uiStateSlice';

// Configure persistence for reportState (only user field)
const reportPersistConfig = {
  key: 'reportState',
  storage,
  whitelist: ['user'], // only persist user field
};

// Configure persistence for uiState (only section and question IDs)
const uiPersistConfig = {
  key: 'uiState',
  storage,
  whitelist: ['currentSectionId', 'currentQuestionId'], // only persist these fields
};

const combined = combineReducers({
  reportState: persistReducer(reportPersistConfig, reportStateSlice.reducer),
  uiState: persistReducer(uiPersistConfig, uiStateSlice.reducer),
});

const store = configureStore({
  reducer: combined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
