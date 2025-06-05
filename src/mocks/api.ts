import type { Project, Task } from "../types/general.types.ts";

import { generateProjects } from "./helpers.ts";

let projects: Project[] = [];

export const generateSomeProjects = (): Promise<Project[]> => {
  projects = [...projects, ...generateProjects(projects.length, 5)];

  return new Promise((resolve) => {
    setTimeout(() => resolve([...projects]), 500);
  });
};

export const deleteTaskFromProjects = (
  projectId: string,
  taskId: string,
): Promise<Project> => {
  const project = projects.find((project) => project.id === projectId);

  if (project) {
    const updatedProject = {
      ...project,
      tasks: project.tasks.filter((task) => task.id !== taskId),
    };

    projects = projects.map((proj) =>
      proj.id === projectId ? updatedProject : proj,
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(updatedProject), 500);
    });
  }
  return Promise.reject(new Error(`Project ${projectId} not found.`));
};

export const updateTaskInProject = (
  projectId: string,
  updatedTask: Task,
): Promise<Project> => {
  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return Promise.reject(new Error(`Project ${projectId} not found.`));
  }

  const updatedProject = {
    ...project,
    tasks: project.tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
    ),
  };

  projects = projects.map((proj) => (proj.id === projectId ? updatedProject : proj));

  return new Promise((resolve) => {
    setTimeout(() => resolve(updatedProject), 500);
  });
};
