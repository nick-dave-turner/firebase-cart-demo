import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "./Button";

const mockOnClick = jest.fn();

test("should not have any accessibility violations", async () => {
  const { container } = render(<Button onClick={mockOnClick}>Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should fire a callback when clicked", () => {
  render(<Button onClick={mockOnClick}>Button</Button>);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockOnClick).toHaveBeenCalled();
});
