import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { Layout } from "./Layout";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

test("should render without crashing", () => {
  const history = createMemoryHistory();

  render(
    <Router navigator={history} location={"/"}>
      <Layout />
    </Router>
  );
});
