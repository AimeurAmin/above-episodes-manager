import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { graphqlApi, omdbApi } from "../api";

const rootReducer = combineReducers({
  [graphqlApi.reducerPath]: graphqlApi.reducer,
  [omdbApi.reducerPath]: omdbApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat([
      graphqlApi.middleware,
      omdbApi.middleware
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;