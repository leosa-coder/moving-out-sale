# Moving Out Sale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Vite/React moving-out sale catalog from the provided spreadsheet, with search, category filters, price sorting, and dark/light mode.

**Architecture:** The site is a static React app. Spreadsheet rows are normalized into a TypeScript data module, while UI behavior uses pure helpers that are unit tested with Vitest. Render serves the compiled `dist` folder as a static site.

**Tech Stack:** Vite, React, TypeScript, Vitest, CSS custom properties, generated TypeScript data from Excel.

---

## File Structure

- `package.json`: scripts and dependencies for Vite, React, TypeScript, and Vitest.
- `index.html`: static document shell.
- `src/main.tsx`: React app entry.
- `src/App.tsx`: page composition and client-side control state.
- `src/items.ts`: generated catalog data from the spreadsheet.
- `src/catalog.ts`: pure helpers for link extraction, price handling, filtering, sorting, and stats.
- `src/catalog.test.ts`: Vitest coverage for catalog helpers.
- `src/styles.css`: responsive layout, light/dark theme tokens, controls, and cards.
- `scripts/generate-items.mjs`: spreadsheet-to-TypeScript data generator.
- `README.md`: local development and Render deployment instructions.

### Task 1: Scaffold Static React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create minimal Vite scripts and dependencies**

Add `package.json` with `dev`, `build`, `preview`, and `test` scripts. Include React, Vite, TypeScript, Vitest, and `xlsx` for the generation script.

- [ ] **Step 2: Create the app shell**

Add `index.html`, `src/main.tsx`, a placeholder `src/App.tsx`, and base CSS.

- [ ] **Step 3: Run install**

Run: `npm install`
Expected: dependencies install and `package-lock.json` is created.

### Task 2: Add Catalog Tests First

**Files:**
- Create: `src/catalog.test.ts`
- Create: `src/catalog.ts`

- [ ] **Step 1: Write failing tests**

Add tests for URL extraction, category normalization, instalment eligibility, filtering, and sorting.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test -- --run`
Expected: FAIL because `src/catalog.ts` exports do not exist or return incorrect behavior.

- [ ] **Step 3: Implement helpers**

Create typed helpers in `src/catalog.ts`: `extractUrls`, `formatPrice`, `getNumericPrice`, `isInstalmentEligible`, `normalizeRows`, `filterItems`, `sortItems`, and `getStats`.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test -- --run`
Expected: PASS.

### Task 3: Generate Item Data

**Files:**
- Create: `scripts/generate-items.mjs`
- Create: `src/items.ts`

- [ ] **Step 1: Write generator**

Read `/Users/leosapenus/Projects/MovingOutSale/Moving out sale.xlsx` with `xlsx`, convert rows into item records, preserve categories, and extract first URL into `referenceUrl`.

- [ ] **Step 2: Run generator**

Run: `npm run generate:items`
Expected: `src/items.ts` contains sale items and categories from the workbook.

- [ ] **Step 3: Run tests**

Run: `npm test -- --run`
Expected: PASS.

### Task 4: Build Catalog UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Compose the page**

Render hero copy, sale stats, controls, category chips, item grid, cards, reference links, instalment badges, and plain instruction CTA.

- [ ] **Step 2: Implement theme preference**

Persist `light` or `dark` in `localStorage`, defaulting to system preference when unset.

- [ ] **Step 3: Style responsive layouts**

Use CSS tokens for light/dark themes, responsive grids, accessible focus states, and stable controls down to 375px width.

### Task 5: Document Render Deployment

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add local commands**

Document `npm install`, `npm run generate:items`, `npm run dev`, `npm test -- --run`, and `npm run build`.

- [ ] **Step 2: Add Render static-site settings**

Document build command `npm install && npm run build` and publish directory `dist`.

### Task 6: Verify

**Files:**
- No source changes expected unless verification finds issues.

- [ ] **Step 1: Run unit tests**

Run: `npm test -- --run`
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS and `dist` is generated.

- [ ] **Step 3: Run local preview and inspect**

Run: `npm run dev -- --host 127.0.0.1`
Expected: site loads in browser, controls work, light/dark modes render, and mobile width has no horizontal overflow.

