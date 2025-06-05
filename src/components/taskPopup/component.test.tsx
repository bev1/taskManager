import { fireEvent, screen } from "@testing-library/react";
import { TaskPopup } from "./index";
import {
  type Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/general.types";
import { renderWithProviders } from "../../testUtils";

const mockOnClose = jest.fn();

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "This is a test description",
  type: TaskType.userStory,
  priority: TaskPriority.minor,
  status: TaskStatus.open,
  dueDate: "2023-09-10",
};

describe("TaskPopup", () => {
  it("should render", () => {
    renderWithProviders(
      <TaskPopup task={mockTask} isOpen={true} onClose={mockOnClose} />,
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should call onClose when Cancel is clicked", () => {
    renderWithProviders(
      <TaskPopup task={mockTask} isOpen={true} onClose={mockOnClose} />,
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should update Title input field correctly", () => {
    renderWithProviders(
      <TaskPopup task={mockTask} isOpen={true} onClose={mockOnClose} />,
    );

    const titleInput = screen.getByLabelText("title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(titleInput).toHaveValue("Updated Title");
  });
});
