import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { axe } from "jest-axe";

import { Header } from "./Header";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

test("should not have any accessibility violations", async () => {
  const history = createMemoryHistory();

  const { container } = render(
    <Router navigator={history} location={"/"}>
      <Header />
    </Router>
  );

  const results = await axe(container, {
    rules: {
      // TODO: disabling these rules until we remove the material-ui icon as it does have an alt title
      "link-name": { enabled: false },
      "svg-img-alt": { enabled: false },
    },
  });
  expect(results).toHaveNoViolations();
});

test("should navigate to home when user clicks the logo link", () => {
  const history = createMemoryHistory();

  render(
    <Router navigator={history} location={"/cart"}>
      <Header />
    </Router>
  );

  const logo = screen.getByTestId("home-link");
  fireEvent.click(logo);
  expect(history.location.pathname).toBe("/");
});

test("should navigate to cart when user clicks the cart link", () => {
  const history = createMemoryHistory();

  render(
    <Router navigator={history} location={"/"}>
      <Header />
    </Router>
  );

  const logo = screen.getByTestId("cart-link");
  fireEvent.click(logo);
  expect(history.location.pathname).toBe("/cart"); // TODO - update this when cart page is enabled
});
