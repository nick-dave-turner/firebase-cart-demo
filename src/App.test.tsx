import { render, screen } from "@testing-library/react";
import { signInAnonymously } from "firebase/auth";

import { App } from "./App";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
  signInAnonymously: jest.fn().mockResolvedValue({}),
}));

const mockSignInAnonymously = signInAnonymously as jest.Mock;

beforeEach(() => {
  mockSignInAnonymously.mockResolvedValue({ user: { uid: "user-1234" } });
});

test("should render without crashing", async () => {
  render(<App />);
  expect(await screen.findByText("Skip to content")).toBeInTheDocument();
});
