import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { axe } from "jest-axe";
import { createMemoryHistory } from "history";

import { Footer } from "./Footer";

test("should not have any accessibility violations", async () => {
  const history = createMemoryHistory();

  const { container } = render(
    <Router navigator={history} location={"/"}>
      <Footer />
    </Router>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should navigate to home when user clicks the logo link", () => {
  const history = createMemoryHistory();

  render(
    <Router navigator={history} location={"/some-url"}>
      <Footer />
    </Router>
  );

  const logo = screen.getByTestId("home-link");
  fireEvent.click(logo);
  expect(history.location.pathname).toBe("/");
});
