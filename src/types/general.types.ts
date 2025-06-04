export enum TaskType {
  userStory = "user story",
  bug = "bug",
}

export enum TaskPriority {
  minor = "minor",
  medium = "medium",
  critical = "critical",
  blocker = "blocker",
}

export enum TaskStatus {
  open = "open",
  inDev = "in dev",
  inTesting = "in testing",
  reOpen = "re-open",
  closed = "closed",
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
