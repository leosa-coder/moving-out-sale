# Moving Out Sale

A clean, responsive static catalog for selling household items during a move.

## Local development

```bash
npm install
npm run generate:items
npm run dev
```

The item catalog is generated from:

```text
/Users/leosapenus/Projects/MovingOutSale/Moving out sale.xlsx
```

## Checks

```bash
npm test -- --run
npm run build
```

## Render deployment

Create a Render **Static Site** from this GitHub repository.

- Root directory: leave blank
- Build command: `npm install && npm run build`
- Publish directory: `dist`

The generated `src/items.ts` file is committed, so Render does not need access to the local spreadsheet.

This repo also includes `render.yaml` with the same static-site settings.
