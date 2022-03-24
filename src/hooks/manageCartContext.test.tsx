import { render, screen } from "@testing-library/react";

import { useFBGetCart } from "../firebase";
import {
  MOCK_CART_EMPTY,
  MOCK_CART_MULTI_PRODUCTS,
  MOCK_CART_SINGLE_PRODUCT,
  MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT,
} from "../mocks";
import { CartTotalProvider, useCartTotalContext } from "./manageCartContext";

const mockUserId = "user-1234";
const mockUseFBGetCart = useFBGetCart as jest.Mock;

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

jest.mock("../firebase", () => ({
  ...jest.requireActual("../firebase"),
  useAuthContext: () => ({ userId: mockUserId }),
  useFBGetCart: jest.fn().mockResolvedValue({}),
}));

const MockComponent = () => {
  const { cartTotal } = useCartTotalContext();
  return <h1 data-testid="content">{cartTotal}</h1>;
};

describe("when the cart is undefined", () => {
  beforeEach(() => {
    mockUseFBGetCart.mockReturnValue({ data: undefined });
  });

  test("should update the cartTotal", async () => {
    render(
      <CartTotalProvider>
        <MockComponent />
      </CartTotalProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent("0");
  });
});

describe("when the cart is empty", () => {
  beforeEach(() => {
    mockUseFBGetCart.mockReturnValue({ data: MOCK_CART_EMPTY });
  });

  test("should update the cartTotal", async () => {
    render(
      <CartTotalProvider>
        <MockComponent />
      </CartTotalProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent("0");
  });
});

describe("when the cart has a single count of a given product", () => {
  beforeEach(() => {
    mockUseFBGetCart.mockReturnValue({ data: MOCK_CART_SINGLE_PRODUCT });
  });

  test("should update the cartTotal", async () => {
    render(
      <CartTotalProvider>
        <MockComponent />
      </CartTotalProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent("1");
  });
});

describe("when the cart has multiple counts of a given product", () => {
  beforeEach(() => {
    mockUseFBGetCart.mockReturnValue({
      data: MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT,
    });
  });

  test("should update the cartTotal", async () => {
    render(
      <CartTotalProvider>
        <MockComponent />
      </CartTotalProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent("4");
  });
});

describe("when the cart has multiple products", () => {
  beforeEach(() => {
    mockUseFBGetCart.mockReturnValue({
      data: MOCK_CART_MULTI_PRODUCTS,
    });
  });

  test("should update the cartTotal", async () => {
    render(
      <CartTotalProvider>
        <MockComponent />
      </CartTotalProvider>
    );
    expect(await screen.findByTestId("content")).toHaveTextContent("2");
  });
});
