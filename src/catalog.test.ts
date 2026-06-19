import { describe, expect, it } from "vitest";
import {
  extractUrls,
  filterItems,
  formatPrice,
  getReferenceLabel,
  getNumericPrice,
  getStats,
  isInstalmentEligible,
  normalizeRows,
  sortItems,
  type RawRow,
  type SaleItem,
} from "./catalog";
import { resolveInitialTheme } from "./theme";

describe("catalog helpers", () => {
  it("defaults first-time visitors to dark mode", () => {
    expect(resolveInitialTheme(null)).toBe("dark");
    expect(resolveInitialTheme(undefined)).toBe("dark");
    expect(resolveInitialTheme("light")).toBe("light");
    expect(resolveInitialTheme("dark")).toBe("dark");
  });

  it("extracts URLs from free-form description text", () => {
    const urls = extractUrls(
      "Reference https://example.com/item?sku=123 and backup http://store.test/path.",
    );

    expect(urls).toEqual(["https://example.com/item?sku=123", "http://store.test/path"]);
  });

  it("normalizes spreadsheet rows into categorized sale items", () => {
    const rows: RawRow[] = [
      { Items: "Living Room", Description: null, "Selling for": null },
      {
        Items: "Samsung TV",
        Description: "8K TV\nhttps://example.com/tv",
        "Selling for": 4500,
      },
      { Items: "Laundry", Description: null, "Selling for": null },
      { Items: "Washing machine", Description: "Haier", "Selling for": "$200-250" },
    ];

    const items = normalizeRows(rows);

    expect(items).toEqual([
      {
        id: "samsung-tv-1",
        name: "Samsung TV",
        category: "Living Room",
        description: "8K TV",
        price: 4500,
        originalIndex: 1,
        referenceUrl: "https://example.com/tv",
      },
      {
        id: "washing-machine-3",
        name: "Washing machine",
        category: "Laundry",
        description: "Haier",
        price: "$200-250",
        originalIndex: 3,
      },
    ]);
  });

  it("formats numeric and range prices for display", () => {
    expect(formatPrice(4500)).toBe("$4,500");
    expect(formatPrice("$200-250")).toBe("$200-250");
  });

  it("creates descriptive reference link labels from store URLs", () => {
    expect(
      getReferenceLabel(
        "https://www.harveynorman.com.au/samsung-85-inch-qn800d-neo-qled-8k-mini-led-smart-ai-tv.html",
      ),
    ).toBe("View Harvey Norman listing");
    expect(getReferenceLabel("https://purewatersystems.com.au/products/ro-5u")).toBe(
      "View Pure Water Systems listing",
    );
    expect(getReferenceLabel("not a url")).toBe("View original listing");
  });

  it("detects numeric price and instalment eligibility", () => {
    expect(getNumericPrice(700)).toBe(700);
    expect(getNumericPrice("$200-250")).toBe(200);
    expect(isInstalmentEligible(500)).toBe(false);
    expect(isInstalmentEligible(700)).toBe(true);
    expect(isInstalmentEligible("$200-250")).toBe(false);
  });

  it("filters items by search query and category", () => {
    const items = sampleItems();

    expect(filterItems(items, "desk", "all").map((item) => item.name)).toEqual([
      "Standing desk",
    ]);
    expect(filterItems(items, "ausclimate", "Others").map((item) => item.name)).toEqual([
      "Dehumidifier",
    ]);
  });

  it("sorts by original order and numeric price", () => {
    const items = sampleItems();

    expect(sortItems(items, "original").map((item) => item.name)).toEqual([
      "Standing desk",
      "Dehumidifier",
      "Samsung TV",
    ]);
    expect(sortItems(items, "price-asc").map((item) => item.name)).toEqual([
      "Dehumidifier",
      "Standing desk",
      "Samsung TV",
    ]);
    expect(sortItems(items, "price-desc").map((item) => item.name)).toEqual([
      "Samsung TV",
      "Standing desk",
      "Dehumidifier",
    ]);
  });

  it("summarizes catalog stats", () => {
    expect(getStats(sampleItems())).toEqual({
      itemCount: 3,
      categoryCount: 3,
      instalmentCount: 2,
    });
  });
});

function sampleItems(): SaleItem[] {
  return [
    {
      id: "standing-desk-1",
      name: "Standing desk",
      category: "Study",
      description: "Desky hardwood standing desk",
      price: 1000,
      originalIndex: 1,
    },
    {
      id: "dehumidifier-2",
      name: "Dehumidifier",
      category: "Others",
      description: "Ausclimate",
      price: 60,
      originalIndex: 2,
    },
    {
      id: "samsung-tv-3",
      name: "Samsung TV",
      category: "Living Room",
      description: "8K Mini-LED",
      price: 4500,
      originalIndex: 3,
    },
  ];
}
