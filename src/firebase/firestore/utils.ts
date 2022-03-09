export type SortOrder = "price-asc" | "price-desc" | "title";

export type SortOrderObj = {
  value: "price" | "title";
  direction: "desc" | "asc";
};

export const getSortOrder = (sortOrder: SortOrder): SortOrderObj => {
  switch (sortOrder) {
    case "price-asc":
      return { value: "price", direction: "asc" };

    case "price-desc":
      return { value: "price", direction: "desc" };

    case "title":
      return { value: "title", direction: "asc" };

    default:
      return { value: "title", direction: "asc" };
  }
};
