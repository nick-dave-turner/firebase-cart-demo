import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { useFBGetProducts } from "../../firebase";
import { MOCK_PRODUCT } from "../../mocks";
import { Home } from "./Home";

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn().mockResolvedValue({}),
}));

const mockAddToCart = jest.fn();

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useManageCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

jest.mock("../../firebase", () => ({
  ...jest.requireActual("../../firebase"),
  useFBGetProducts: jest.fn().mockResolvedValue({}),
}));

const mockUseFBGetProducts = useFBGetProducts as jest.Mock;

describe("when rendered", () => {
  beforeEach(() => {
    mockUseFBGetProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
  });

  test("should not have any accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("when loading", () => {
  beforeEach(() => {
    mockUseFBGetProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
  });

  test("should render the loading message", () => {
    render(<Home />);
    expect(screen.getByText("Loading Products...")).toBeInTheDocument();
  });
});

describe("when in error", () => {
  beforeEach(() => {
    mockUseFBGetProducts.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
  });

  test("should render the error message", () => {
    render(<Home />);
    expect(
      screen.getByText("There was an error fetching products...")
    ).toBeInTheDocument();
  });
});

describe("when loaded", () => {
  describe("when no items present", () => {
    beforeEach(() => {
      mockUseFBGetProducts.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });
    });

    test("should render the no-data message", () => {
      render(<Home />);
      expect(
        screen.getByText("No products to available to view...")
      ).toBeInTheDocument();
    });
  });

  describe("when items present", () => {
    beforeEach(() => {
      mockUseFBGetProducts.mockReturnValue({
        data: [MOCK_PRODUCT],
        isLoading: false,
        isError: false,
      });
    });

    test("should render page", () => {
      render(<Home />);
      expect(screen.getByText("Some Category")).toBeInTheDocument();
    });

    test("should allow user to update sort order", () => {
      render(<Home />);
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "Alphabetical" })
      );
      expect(
        screen.getByRole<HTMLOptionElement>("option", {
          name: "Alphabetical",
        }).selected
      ).toBe(true);
    });

    test("should allow user to add item to cart", () => {
      render(<Home />);
      userEvent.click(screen.getByRole("button", { name: "Add to cart" }));
      expect(mockAddToCart).toHaveBeenCalledWith(MOCK_PRODUCT.id);
    });
  });
});
