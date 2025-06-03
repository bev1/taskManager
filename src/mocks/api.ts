import type { Project } from "../types/general.types.ts";
import { generateProjects } from "./helpers.ts";

let projects: Project[];

export const generateSomeProjects = (): Promise<Project[]> => {
  projects = generateProjects(5);

  return new Promise((resolve) => {
    setTimeout(() => resolve([...projects]), 500);
  });
};
