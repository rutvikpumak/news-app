import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./slices/articlesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
