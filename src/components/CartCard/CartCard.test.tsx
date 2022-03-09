import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { MOCK_PRODUCT } from "../../mocks";
import { CartCard } from "./CartCard";

const mockRemoveFromCart = jest.fn();
const mockCount = 1;

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

test("should not have any accessibility violations", async () => {
  const { container } = render(
    <CartCard
      count={mockCount}
      data={MOCK_PRODUCT}
      removeFromCart={mockRemoveFromCart}
    />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should call onClick callback when button clicked", async () => {
  render(
    <CartCard
      count={mockCount}
      data={MOCK_PRODUCT}
      removeFromCart={mockRemoveFromCart}
    />
  );
  const button = screen.getByTestId("card-btn");
  fireEvent.click(button);
  expect(mockRemoveFromCart).toHaveBeenCalledWith(
    MOCK_PRODUCT.id,
    MOCK_PRODUCT.price
  );
});
