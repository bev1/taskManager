export enum TaskType {
  USER_STORY = "user story",
  BUG = "bug",
}

export enum TaskPriority {
  MINOR = "minor",
  MEDIUM = "medium",
  CRITICAL = "critical",
  BLOCKER = "blocker",
}

export enum TaskStatus {
  OPEN = "open",
  IN_DEV = "in dev",
  IN_TESTING = "in testing",
  RE_OPEN = "re-open",
  CLOSED = "closed",
}

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  dueDate: string;
  tasks: Task[];
}
