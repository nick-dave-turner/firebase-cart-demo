import { render, screen } from "@testing-library/react";
import { signInAnonymously } from "firebase/auth";

import { AuthProvider, useAuthContext } from "./context";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
  signInAnonymously: jest.fn().mockResolvedValue({}),
}));

const mockInitCart = jest.fn();
jest.mock("./firestore", () => ({
  ...jest.requireActual("./firestore"),
  useFBSetupCart: () => ({
    initCart: mockInitCart,
  }),
}));

const mockSignInAnonymously = signInAnonymously as jest.Mock;

const MockComponent = () => {
  const { userId } = useAuthContext();
  return <h1 data-testid="content">{userId}</h1>;
};

const mockUid = "abcd1234";

describe("when userId is successfully returned", () => {
  beforeEach(() => {
    mockSignInAnonymously.mockResolvedValue({ user: { uid: mockUid } });
  });

  test("should set the userId", async () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent(mockUid);
    expect(mockInitCart).toHaveBeenCalled();
  });
});

describe("when userId is unsuccessfully returned", () => {
  beforeEach(() => {
    mockSignInAnonymously.mockRejectedValue({ error: "failed" });
    // remove console.error from test given we know we return this
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("should return error", async () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );
    expect(await screen.findByTestId("content")).toBeEmptyDOMElement();
    expect(mockInitCart).not.toHaveBeenCalled();
  });
});
