import type { Project } from "../types/general.types.ts";
import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { generateSomeProjects } from "../mocks/api.ts";

interface ProjectState {
  projects: Project[];
  status: "loading" | "failed" | "idle";
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: "idle",
  error: null,
};

export const fetchGeneratedProjects = createAsyncThunk(
  "projects/fetchGeneratedProjects",
  async () => {
    const response = await generateSomeProjects();
    return response;
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneratedProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGeneratedProjects.fulfilled, (state, action) => {
        state.status = "idle";
        state.projects = [...state.projects, ...action.payload];
      })
      .addCase(fetchGeneratedProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load projects";
      });
  },
});

export const { addProject, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
