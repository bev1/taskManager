import type { Task } from "../../types/general.types";

interface FilterAndSortParams {
  priorities?: string[];
  statuses?: string[];
  sortBy?: "priority" | "status";
}

export const getFilteredAndSortedTasks = (
  tasks: Task[],
  { priorities, statuses, sortBy }: FilterAndSortParams,
): Task[] => {
  let filteredTasks = tasks;

  if (priorities && priorities.length > 0) {
    filteredTasks = filteredTasks.filter((task) =>
      priorities.includes(task.priority),
    );
  }

  if (statuses && statuses.length > 0) {
    filteredTasks = filteredTasks.filter((task) => statuses.includes(task.status));
  }

  if (sortBy) {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (sortBy === "priority") {
        return a.priority.localeCompare(b.priority);
      }
      if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  }

  return filteredTasks;
};
