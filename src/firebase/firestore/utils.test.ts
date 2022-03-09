import { getSortOrder, SortOrder, SortOrderObj } from "./utils";

const cases: [SortOrder, SortOrderObj][] = [
  ["price-asc", { value: "price", direction: "asc" }],
  ["price-desc", { value: "price", direction: "desc" }],
  ["title", { value: "title", direction: "asc" }],
  ["" as any, { value: "title", direction: "asc" }],
];

test.each(cases)("should return correct sort options", (i, v) => {
  expect(getSortOrder(i)).toEqual(v);
});
