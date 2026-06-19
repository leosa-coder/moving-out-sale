# Moving Out Sale Design

## Goal

Build a clean, modern, responsive single-page catalog for a household moving-out sale, ready to deploy as a static site on Render from the GitHub repository.

## Content

The page title is `Moving Out Sale`. The hero copy uses the provided sale description, including notes about original store links, additional photos on request, instalment plans for items over `$500`, buyer-arranged delivery, first-come-first-served availability, and private-message purchasing.

Catalog content comes from `/Users/leosapenus/Projects/MovingOutSale/Moving out sale.xlsx`. Rows with an item name and no price are treated as category headings. Rows with prices are treated as sale items. Embedded URLs in the description become reference links.

## User Experience

The page opens directly to the sale catalog, not a marketing landing page. The first viewport contains the title, intro copy, sale summary stats, and controls. Users can search by item/category/description, filter by category, and sort by price or original spreadsheet order.

Each item is shown as a compact card with category, item name, description, price, and a reference link when a source URL exists. Items priced over `$500` show an instalment-plan badge. The purchase call-to-action is plain instruction text: `Interested? Please send us a private message as soon as possible.`

## Visual Direction

Use a restrained catalog style with strong readability in both light and dark modes. The palette uses neutral surfaces, high-contrast text, a green accent for prices/availability, and subtle borders instead of heavy decoration. Cards use modest radius, stable dimensions, clear spacing, and no nested card structures.

Dark/light mode is controlled by a visible toggle and persisted in browser storage as a device-local preference.

## Architecture

Use a Vite + React static site. Spreadsheet data is exported into a checked-in TypeScript data module during development so the deployed site has no runtime spreadsheet dependency. The catalog logic is split into small pure helpers for extracting links, formatting prices, category grouping, filtering, and sorting.

## Testing

Use Vitest for pure catalog behavior. Tests cover URL extraction, category normalization from spreadsheet-style rows, instalment eligibility, search/category filtering, and price sorting. Run the production build before completion.

## Deployment

Render should deploy the repository as a Static Site with:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

