import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { useFBGetCart, useFBGetProduct } from "../../firebase";
import { MOCK_PRODUCT, MOCK_CART_EMPTY, MOCK_CART } from "../../mocks";
import { Cart } from "./Cart";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

const mockRemoveFromCart = jest.fn();

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useManageCart: () => ({
    removeFromCart: mockRemoveFromCart,
  }),
}));

jest.mock("../../firebase", () => ({
  ...jest.requireActual("../../firebase"),
  useFBGetCart: jest.fn().mockResolvedValue({}),
  useFBGetProduct: jest.fn().mockResolvedValue({}),
}));

const mockUseFBGetCarts = useFBGetCart as jest.Mock;
const mockUseFBGetProduct = useFBGetProduct as jest.Mock;

describe("when rendered", () => {
  beforeEach(() => {
    mockUseFBGetCarts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
  });

  test("should not have any accessibility violations", async () => {
    const { container } = render(<Cart />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("when loading", () => {
  beforeEach(() => {
    mockUseFBGetCarts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
  });

  test("should render the loading message", () => {
    render(<Cart />);
    expect(screen.getByText("Loading Cart...")).toBeInTheDocument();
  });
});

describe("when in error", () => {
  beforeEach(() => {
    mockUseFBGetCarts.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
  });

  test("should render the error message", () => {
    render(<Cart />);
    expect(
      screen.getByText("There was an error fetching the cart...")
    ).toBeInTheDocument();
  });

  describe("when loaded", () => {
    describe("when no items present", () => {
      beforeEach(() => {
        mockUseFBGetCarts.mockReturnValue({
          data: [MOCK_CART_EMPTY],
          isLoading: false,
          isError: false,
        });
      });

      test("should render the no-data message", () => {
        render(<Cart />);
        expect(
          screen.getByText("Add products to view them in your cart...")
        ).toBeInTheDocument();
      });
    });

    describe("when items present", () => {
      beforeEach(() => {
        mockUseFBGetCarts.mockReturnValue({
          data: [MOCK_CART],
          isLoading: false,
          isError: false,
        });
        mockUseFBGetProduct.mockReturnValue({
          data: MOCK_PRODUCT,
          isLoading: false,
          isError: false,
          isFetched: true,
        });
      });

      test("should render page", () => {
        render(<Cart />);
        expect(screen.getByText("Shopping Bag")).toBeInTheDocument();
        expect(screen.getByTestId("sub-total")).toHaveTextContent(
          `Sub-Total £${MOCK_PRODUCT.price}`
        );
      });

      test("should allow user to remove item to cart", () => {
        render(<Cart />);
        // sanity
        expect(screen.getByTestId("sub-total")).toHaveTextContent(
          `Sub-Total £${MOCK_PRODUCT.price}`
        );
        userEvent.click(screen.getByRole("button", { name: "Remove" }));
        expect(mockRemoveFromCart).toHaveBeenCalledWith(MOCK_PRODUCT.id);
        expect(screen.getByTestId("sub-total")).toHaveTextContent(
          "Sub-Total £0"
        );
      });
    });
  });
});
