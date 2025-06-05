import type { Task } from "../../types/general.types.ts";

export interface TaskProps {
  task: Task;
  openTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}
