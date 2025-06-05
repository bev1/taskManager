import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteTaskFromProjects,
  generateSomeProjects,
  updateOrAddTaskInProject,
} from "../mocks/api.ts";
import type { Project, Task } from "../types/general.types.ts";

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
  async ({
    projectId,
    taskId,
  }: {
    projectId: string | undefined;
    taskId: string;
  }) => {
    if (!projectId) {
      return;
    }
    const updatedProject = await deleteTaskFromProjects(projectId, taskId);
    return updatedProject;
  },
);

export const updateOrCreateTask = createAsyncThunk(
  "projects/updateOrCreateTask",
  async ({ projectId, updatedTask }: { projectId: string; updatedTask: Task }) => {
    const updatedProject = await updateOrAddTaskInProject(projectId, updatedTask);
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
    builder
      .addCase(updateOrCreateTask.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(updateOrCreateTask.fulfilled, (state, action) => {
        const updatedProject = action.payload;

        state.projects = state.projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project,
        );
        state.status = Status.Idle;
      })
      .addCase(updateOrCreateTask.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || "Failed to update task in project.";
      });
  },
});

export default projectSlice.reducer;
