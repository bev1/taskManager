import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
