import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Btn } from "../button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly with children", () => {
    render(<Btn>Click Me</Btn>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Btn onClick={handleClick}>Submit</Btn>);
    
    const button = screen.getByText("Submit");
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Btn disabled>Disabled Btn</Btn>);
    const button = screen.getByText("Disabled Btn");
    expect(button).toBeDisabled();
  });
});
