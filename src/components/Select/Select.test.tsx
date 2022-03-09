import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Select } from "./Select";

const options = [
  {
    label: "Alphabetical",
    value: "title",
  },
  {
    label: "Price: Low - High",
    value: "price-asc",
  },
];

const mockChange = jest.fn();

test("should not have any accessibility violations", async () => {
  const { container } = render(
    <Select
      id="test"
      label="Some Label"
      options={options}
      onChange={mockChange}
      value={options[0].value}
    />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should render the options", () => {
  render(
    <Select
      id="test"
      label="Some Label"
      options={options}
      onChange={mockChange}
      value={options[0].value}
    />
  );
  const selectOptions = screen.getAllByRole("option");
  expect(selectOptions.length).toBe(options.length);
  expect(selectOptions[0]).toHaveAttribute("value", options[0].value);
  expect(selectOptions[0]).toHaveTextContent(options[0].label);
});

test("should fire a callback when changed", () => {
  const { rerender } = render(
    <Select
      id="test"
      label="Some Label"
      options={options}
      onChange={mockChange}
      value={options[0].value}
    />
  );
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: options[0].label })
  );

  expect(
    screen.getByRole<HTMLOptionElement>("option", { name: options[0].label })
      .selected
  ).toBe(true);

  expect(mockChange).toHaveBeenCalledWith(options[0].value);

  rerender(
    <Select
      id="test"
      label="Some Label"
      options={options}
      onChange={mockChange}
      value={options[1].value}
    />
  );

  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: options[1].label })
  );

  expect(
    screen.getByRole<HTMLOptionElement>("option", { name: options[1].label })
      .selected
  ).toBe(true);

  expect(mockChange).toHaveBeenCalledWith(options[1].value);
});
