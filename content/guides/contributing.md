+++
title = "Contributing and source architecture"
description = "Navigate the pdfmake rendering pipeline, add focused regression tests, and validate library or documentation contributions locally."
weight = 7
+++

## Source map

The library and this site have separate repositories:

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake): engine, bundles, tests and examples.
- [pdfmake/docs](https://github.com/pdfmake/docs): this versioned developer site and documentation tools.

The library's Node entry is `src/index.js`; common configuration lives in `src/base.js`. Browser integration lives in `src/browser-extensions/`. `Printer` prepares resources and creates PDFKit output. `DocPreprocessor` normalizes nodes, `DocMeasure` and `TextInlines` measure them, `LayoutBuilder` and `TableProcessor` paginate them, and `Renderer` writes PDFKit drawing instructions.

## Validate engine changes

```sh
npm ci
npm test
npm run build:examples
npm run test:package
```

`npm test` builds generated Node and browser artifacts, then runs Mocha and ESLint. Unit tests import compiled `js/`, so rebuild after editing `src/`. Do not edit `js/` or `build/` directly. The new package smoke test installs the actual tarball in a temporary consumer with production dependencies, then exercises Node output and both browser bundles. It does not replace testing in real browsers.

Preserve text, font metrics, style inheritance and pagination when optimizing. Add an edge-case regression and, when possible, a comparison with the previous behavior. Keep a performance benchmark separate from correctness gates.

## Validate documentation changes

Use Node >=24.11 and Hugo **0.168.0**. From this repository:

```sh
npm ci
npm run docs:generate
npm test
npm run build
npm run dev
```

Open the address printed by Hugo. Generation produces the website search index, Markdown exports and MCP corpus from `content/`. Tests check metadata, examples and MCP behavior. The build verifies generated internal links and fragment targets. Commit regenerated outputs alongside source edits so clients can use the corpus without installing Hugo.

## Releases

The library retains its upstream GitHub Release trigger. The proposed workflow checks tag/version agreement, builds, tests, generates examples, tests a packed consumer, then publishes that same tarball with provenance. No registry publication happens when running local tests.

The docs workflow builds and uploads a review artifact on pushes and pull requests; it does not overwrite the versioned production site. That site's existing multi-version publishing arrangement must be coordinated with maintainers before changing deployment.
