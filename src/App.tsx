import { ExternalLink, Moon, Search, SlidersHorizontal, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  filterItems,
  formatPrice,
  getStats,
  getReferenceLabel,
  isInstalmentEligible,
  sortItems,
  type SortMode,
} from "./catalog";
import { categories, items } from "./items";
import { resolveInitialTheme, type Theme } from "./theme";

const saleNotes = [
  "Most items include a link to the original store listing for reference. Additional photos are available upon request.",
  "For items over $500, we’re happy to offer instalment plans over a period of up to 8 months. Please note that buyers will need to arrange their own delivery if required.",
  "Items are offered on a first-come, first-served basis. 😊 If you’re interested in purchasing, kindly send us a private message as soon as possible. Thank you so much!",
];

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return resolveInitialTheme(window.localStorage.getItem("theme"));
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("original");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const visibleItems = useMemo(() => {
    return sortItems(filterItems(items, query, activeCategory), sortMode);
  }, [activeCategory, query, sortMode]);

  const stats = useMemo(() => getStats(items), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="page-shell">
      <header className="hero">
        <nav className="topbar" aria-label="Page actions">
          <a className="brand" href="#catalog" aria-label="Skip to catalog">
            Moving Out Sale
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy" aria-labelledby="page-title">
            <p className="eyebrow">Household items available now</p>
            <h1 id="page-title">Moving Out Sale</h1>
            <div className="intro-copy">
              {saleNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
            <p className="message-note">Interested? Please send us a private message as soon as possible.</p>
          </section>

          <aside className="summary-panel" aria-label="Sale summary">
            <div>
              <span className="summary-value">{stats.itemCount}</span>
              <span className="summary-label">items listed</span>
            </div>
            <div>
              <span className="summary-value">{stats.categoryCount}</span>
              <span className="summary-label">home areas</span>
            </div>
            <div>
              <span className="summary-value">{stats.instalmentCount}</span>
              <span className="summary-label">instalment eligible</span>
            </div>
          </aside>
        </div>
      </header>

      <main id="catalog" className="catalog" aria-label="Sale catalog">
        <section className="toolbar" aria-label="Catalog filters">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search items</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search items, categories, details..."
              type="search"
            />
          </label>

          <label className="sort-field">
            <SlidersHorizontal size={18} aria-hidden="true" />
            <span className="sr-only">Sort items</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="original">Spreadsheet order</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </section>

        <section className="category-strip" aria-label="Categories">
          <button
            className={activeCategory === "all" ? "chip active" : "chip"}
            type="button"
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "chip active" : "chip"}
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <div className="result-count" aria-live="polite">
          Showing {visibleItems.length} of {items.length} items
        </div>

        {visibleItems.length > 0 ? (
          <section className="item-grid">
            {visibleItems.map((item) => (
              <article className="item-card" key={item.id}>
                <div className="card-topline">
                  <span className="category-label">{item.category}</span>
                  <div className="card-badges">
                    {item.sold ? <span className="sold-badge">Sold</span> : null}
                    {isInstalmentEligible(item.price) ? (
                      <span className="instalment-badge">Up to 8 months</span>
                    ) : null}
                  </div>
                </div>
                <h2>{item.name}</h2>
                {item.description ? <p className="description">{item.description}</p> : null}
                <div className="card-footer">
                  <strong className="price">{formatPrice(item.price)}</strong>
                  {item.referenceUrl ? (
                    <a className="reference-link" href={item.referenceUrl} target="_blank" rel="noreferrer">
                      {getReferenceLabel(item.referenceUrl)}
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="reference-muted">Photos on request</span>
                  )}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-state" aria-live="polite">
            <h2>No matching items</h2>
            <p>Try a broader search or choose a different category.</p>
          </section>
        )}
      </main>
    </div>
  );
}
