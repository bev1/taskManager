import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectTile } from "./index";

describe("ProjectTile", () => {
  const mockProject = {
    id: "000",
    name: "Test Project",
    dueDate: "2050-12-31",
    tasks: [],
  };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ProjectTile {...mockProject} />
      </MemoryRouter>,
    );

  it("should render project name", () => {
    renderComponent();
    expect(screen.getByText(/Test Project/i)).toBeInTheDocument();
  });

  it("should render View Details button with correct link", () => {
    renderComponent();
    const button = screen.getByRole("button", { name: /View Details/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", `/projects/${mockProject.id}`);
  });
});
