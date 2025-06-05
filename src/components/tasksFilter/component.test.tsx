import { render, screen, fireEvent } from "@testing-library/react";
import { TasksFilter } from "./index";
import { TaskPriority, TaskStatus } from "../../types/general.types";
import userEvent from "@testing-library/user-event";

describe("TasksFilter", () => {
  const mockCreateTask = jest.fn();
  const mockChangePriorityFilter = jest.fn();
  const mockChangeStatusFilter = jest.fn();
  const mockSortDropdownChange = jest.fn();

  const defaultProps = {
    createTask: mockCreateTask,
    changePriorityFilter: mockChangePriorityFilter,
    changeStatusFilter: mockChangeStatusFilter,
    sortDropdownChange: mockSortDropdownChange,
    selectedPriorities: [TaskPriority.critical],
    selectedStatuses: [TaskStatus.open],
    sortBy: "priority",
  };

  it("should render", () => {
    render(<TasksFilter {...defaultProps} />);

    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
  });

  it("should ender all priority and status checkboxes", () => {
    render(<TasksFilter {...defaultProps} />);

    Object.values(TaskPriority).forEach((priority) => {
      expect(screen.getByLabelText(new RegExp(priority, "i"))).toBeInTheDocument();
    });

    Object.values(TaskStatus).forEach((status) => {
      const elements = screen.getAllByLabelText(new RegExp(status, "i"));
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("should call changePriorityFilter when a priority checkbox is clicked", () => {
    render(<TasksFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText(/blocker/i);
    fireEvent.click(checkbox);
    expect(mockChangePriorityFilter).toHaveBeenCalledWith(TaskPriority.blocker);
  });

  it("should call changeStatusFilter when a status checkbox is clicked", () => {
    render(<TasksFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText(/in dev/i);
    fireEvent.click(checkbox);
    expect(mockChangeStatusFilter).toHaveBeenCalledWith(TaskStatus.inDev);
  });

  it("should call createTask when Create Task button is clicked", () => {
    render(<TasksFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    expect(mockCreateTask).toHaveBeenCalled();
  });
});
