import type { Project } from "../types/general.types.ts";
import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { generateSomeProjects } from "../mocks/api.ts";
import { Status } from "./types.ts";

interface ProjectState {
  projects: Project[];
  status: Status;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: Status.Idle,
  error: null,
};

export const generateProjects = createAsyncThunk(
  "projects/generateProjects",
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
    getProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.id === action.payload,
      );
      if (!project) {
        state.error = `Project with ID ${action.payload} not found!`;
      } else {
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateProjects.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(generateProjects.fulfilled, (state, action) => {
        state.status = Status.Idle;
        state.projects = action.payload;
      })
      .addCase(generateProjects.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || "Failed to load projects";
      });
  },
});

export const { addProject, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
