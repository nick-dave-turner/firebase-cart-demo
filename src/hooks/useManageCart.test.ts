import { renderHook } from "@testing-library/react-hooks";

import { useFBGetCart } from "../firebase";
import {
  MOCK_CART_EMPTY,
  MOCK_CART_MULTI_PRODUCTS,
  MOCK_CART_SINGLE_PRODUCT,
  MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT,
} from "../mocks";
import { useManageCart } from "./useManageCart";

const mockUserId = "user-1234";
const productId = "product-1234";
const anotherProductId = "another-product-1234";
const mockMutate = jest.fn();
const mockRefetch = jest.fn();
const mockUseFBGetCart = useFBGetCart as jest.Mock;

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

jest.mock("../firebase", () => ({
  ...jest.requireActual("../firebase"),
  useAuthContext: () => ({ userId: mockUserId }),
  useFBGetCart: jest.fn().mockResolvedValue({}),
  useFBUpdateCart: () => ({ mutate: mockMutate }),
}));

describe("when calling addToCart", () => {
  describe("when the cart is empty", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_EMPTY,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.addToCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_EMPTY[0],
        products: [{ count: 1, id: productId }],
      });
    });
  });

  describe("when the cart contains a single item and we add another unrelated item", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_SINGLE_PRODUCT,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.addToCart(anotherProductId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_SINGLE_PRODUCT[0],
        products: [
          ...MOCK_CART_SINGLE_PRODUCT[0].products,
          { count: 1, id: anotherProductId },
        ],
      });
    });
  });

  describe("when the cart contains multiple items of the same type and we add another item", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.addToCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0],
        products: [
          { ...MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0].products[0], count: 4 },
          MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0].products[1],
        ],
      });
    });
  });
});

describe("when calling removeFromCart", () => {
  describe("when the cart is empty", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_EMPTY,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.removeFromCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_EMPTY[0],
        products: [],
      });
    });
  });

  describe("when the cart contains a single item and we remove that item", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_SINGLE_PRODUCT,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.removeFromCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_SINGLE_PRODUCT[0],
        products: [],
      });
    });
  });

  describe("when the cart contains multiple unrelated items and we remove one item", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_MULTI_PRODUCTS,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.removeFromCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_MULTI_PRODUCTS[0],
        products: [MOCK_CART_MULTI_PRODUCTS[0].products[1]],
      });
    });
  });

  describe("when the cart contains multiple related items and we remove one item", () => {
    beforeEach(() => {
      mockUseFBGetCart.mockReturnValue({
        data: MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT,
        refetch: mockRefetch,
      });
    });

    it("should update cart", () => {
      const { result } = renderHook(() => useManageCart());
      result.current.removeFromCart(productId);

      expect(mockMutate).toHaveBeenCalledWith({
        ...MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0],
        products: [
          { ...MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0].products[0], count: 2 },
          MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT[0].products[1],
        ],
      });
    });
  });
});
