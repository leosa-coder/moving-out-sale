export type RawRow = {
  Items?: string | null;
  Description?: string | null;
  "Selling for"?: string | number | null;
};

export type SaleItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string | number;
  originalIndex: number;
  referenceUrl?: string;
};

export type SortMode = "original" | "price-asc" | "price-desc";

const urlPattern = /https?:\/\/[^\s)]+/gi;
const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function extractUrls(text: string): string[] {
  return Array.from(text.matchAll(urlPattern), (match) => match[0].replace(/[.,;:]+$/, ""));
}

export function formatPrice(price: string | number): string {
  if (typeof price === "number") {
    return currencyFormatter.format(price);
  }

  const trimmed = price.trim();
  return trimmed.startsWith("$") ? trimmed : `$${trimmed}`;
}

export function getNumericPrice(price: string | number): number | null {
  if (typeof price === "number") {
    return price;
  }

  const match = price.match(/\d+(?:,\d{3})*(?:\.\d+)?/);
  return match ? Number(match[0].replace(/,/g, "")) : null;
}

export function isInstalmentEligible(price: string | number): boolean {
  if (typeof price !== "number") {
    return false;
  }

  return price > 500;
}

export function normalizeRows(rows: RawRow[]): SaleItem[] {
  let currentCategory = "Other";

  return rows.reduce<SaleItem[]>((items, row, index) => {
    const name = normalizeCell(row.Items);
    const description = normalizeCell(row.Description);
    const price = row["Selling for"];
    const hasPrice = price !== null && price !== undefined && normalizeCell(price) !== "";

    if (!name) {
      return items;
    }

    if (!hasPrice) {
      currentCategory = name;
      return items;
    }

    const descriptionWithoutUrls = removeUrls(description);
    const referenceUrl = extractUrls(description)[0];
    const item: SaleItem = {
      id: `${slugify(name)}-${index}`,
      name,
      category: currentCategory,
      description: descriptionWithoutUrls,
      price: typeof price === "number" ? price : normalizeCell(price),
      originalIndex: index,
    };

    if (referenceUrl) {
      item.referenceUrl = referenceUrl;
    }

    items.push(item);
    return items;
  }, []);
}

export function filterItems(items: SaleItem[], query: string, category: string): SaleItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const searchableText = `${item.name} ${item.category} ${item.description}`.toLowerCase();
    const matchesQuery = normalizedQuery === "" || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

export function sortItems(items: SaleItem[], mode: SortMode): SaleItem[] {
  const sorted = [...items];

  if (mode === "price-asc") {
    sorted.sort((a, b) => comparePrices(a, b));
  } else if (mode === "price-desc") {
    sorted.sort((a, b) => comparePrices(b, a));
  } else {
    sorted.sort((a, b) => a.originalIndex - b.originalIndex);
  }

  return sorted;
}

export function getStats(items: SaleItem[]) {
  return {
    itemCount: items.length,
    categoryCount: new Set(items.map((item) => item.category)).size,
    instalmentCount: items.filter((item) => isInstalmentEligible(item.price)).length,
  };
}

function comparePrices(a: SaleItem, b: SaleItem): number {
  const aPrice = getNumericPrice(a.price) ?? Number.POSITIVE_INFINITY;
  const bPrice = getNumericPrice(b.price) ?? Number.POSITIVE_INFINITY;

  return aPrice - bPrice || a.originalIndex - b.originalIndex;
}

function normalizeCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function removeUrls(text: string): string {
  return text
    .replace(urlPattern, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
