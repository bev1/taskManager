import { render, screen, fireEvent } from "@testing-library/react";
import { Task } from "./index";
import {
  TaskPriority,
  TaskStatus,
  TaskType,
  type Task as TaskTypeDef,
} from "../../types/general.types";

describe("Task component", () => {
  const mockTask: TaskTypeDef = {
    id: "1",
    title: "Test Task",
    description: "Some description",
    type: TaskType.bug,
    priority: TaskPriority.critical,
    status: TaskStatus.open,
    dueDate: "2024-10-10",
  };

  const mockOpenTask = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(
      <Task task={mockTask} openTask={mockOpenTask} deleteTask={mockDeleteTask} />,
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/Priority: critical/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: open/i)).toBeInTheDocument();
  });

  it("should call openTask with correct task on Open click", () => {
    render(
      <Task task={mockTask} openTask={mockOpenTask} deleteTask={mockDeleteTask} />,
    );

    fireEvent.click(screen.getByText("Open"));
    expect(mockOpenTask).toHaveBeenCalledTimes(1);
    expect(mockOpenTask).toHaveBeenCalledWith(mockTask);
  });

  it("should call deleteTask with correct task id on Delete click", () => {
    render(
      <Task task={mockTask} openTask={mockOpenTask} deleteTask={mockDeleteTask} />,
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);
  });
});
