import {
  type Project,
  type Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../types/general.types.ts";

const generateRandomDate = (daysAhead: number): string => {
  const today = new Date();
  const futureDate = new Date(
    today.setDate(today.getDate() + Math.floor(Math.random() * daysAhead)),
  );
  return futureDate.toISOString().split("T")[0];
};

const generateTasks = (count: number): Task[] => {
  const priorities = Object.values(TaskPriority);
  const statuses = Object.values(TaskStatus);

  return Array.from({ length: count }).map((_, index) => ({
    id: String(Date.now() + index),
    type: Math.random() > 0.5 ? TaskType.userStory : TaskType.bug,
    title: `Task ${index + 1}`,
    description: `Description for Task ${index + 1}`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: generateRandomDate(30),
  }));
};

export const generateProjects = (
  existingProjectsCount: number,
  count: number,
): Project[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: String(Date.now() + i),
    name: `Project ${i + existingProjectsCount}`,
    dueDate: generateRandomDate(90),
    tasks: generateTasks(Math.floor(Math.random() * 5)),
  }));
};
