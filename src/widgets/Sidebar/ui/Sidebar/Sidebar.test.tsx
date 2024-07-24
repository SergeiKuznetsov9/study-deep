import { fireEvent, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe("Sidebar", () => {
  test("Sidebar render", () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("Sidebar toggle", () => {
    renderWithTranslation(<Sidebar />);
    const toggleButton = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});
