import type { Project } from "../types/general.types.ts";
import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTaskFromProjects, generateSomeProjects } from "../mocks/api.ts";
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

export const removeTaskFromProject = createAsyncThunk(
  "projects/removeTaskFromProject",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    if (!projectId) {
      return;
    }
    const updatedProject = await deleteTaskFromProjects(projectId, taskId);
    return updatedProject;
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
    builder
      .addCase(removeTaskFromProject.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(removeTaskFromProject.fulfilled, (state, action) => {
        console.log("==============");
        const updatedProject = action.payload;
        if (!updatedProject) {
          state.status = Status.Failed;
          return;
        }
        state.projects = state.projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project,
        );
        state.status = Status.Idle;
      })
      .addCase(removeTaskFromProject.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { addProject, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
