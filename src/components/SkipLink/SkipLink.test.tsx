import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { SkipLink } from "./SkipLink";

test("should render without crashing", () => {
  render(<SkipLink />);
});

test("should not have any accessibility violations", async () => {
  const { container } = render(<SkipLink />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
