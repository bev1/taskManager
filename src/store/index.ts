import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice"; // Наш slice для проектов

const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
