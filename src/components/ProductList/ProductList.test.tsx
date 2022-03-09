import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { MOCK_PRODUCT } from "../../mocks";
import { ProductList } from "./ProductList";

const mockAddToCart = jest.fn();

test("should not have any accessibility violations", async () => {
  const { container } = render(
    <ProductList products={[MOCK_PRODUCT]} addToCart={mockAddToCart} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should call onClick callback when button clicked", async () => {
  render(<ProductList products={[MOCK_PRODUCT]} addToCart={mockAddToCart} />);
  const button = screen.getByTestId("card-btn");
  fireEvent.click(button);
  expect(mockAddToCart).toHaveBeenCalledWith([MOCK_PRODUCT][0].id);
});
