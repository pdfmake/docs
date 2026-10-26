# pdfmake developer documentation

The documentation application for **pdfmake 0.3.x**: task-oriented guides,
searchable references and editable JavaScript/TypeScript examples with PDF previews.
Built with Hugo, progressively enhanced navigation and local browser assets.

[Read the documentation](https://pdfmake.github.io/docs/0.3/) · [Try the playground](https://pdfmake.github.io/docs/0.3/playground/) · [Library source](https://github.com/bpampuch/pdfmake) · [Authoring guide](AGENTS.md)

## Run locally

Prerequisites: **Node.js >=24.11** and [Hugo 0.168.0](https://github.com/gohugoio/hugo/releases/tag/v0.168.0).

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:1313/docs/0.3/>. The playground is part of the same application;
its editor, TypeScript compiler, fonts and PDF preview require no CDN or account.
The site remains readable and navigable without JavaScript. The UI respects the
system color preference and offers persistent light/dark selection.

## Repository map

| Location | Responsibility |
| --- | --- |
| `content/` | Markdown source and complete language editions |
| `data/navigation.json` | Curated chapter groups and ordering |
| `layouts/`, `static/assets/` | Server-rendered shell and navigation enhancements |
| `static/playground/`, `playground/` | Shared editor, worker and PDF preview |
| `scripts/` | Generation, validation, versioning and build tools |
| `tests/` | Corpus, imports, MCP, deployment assembly and browser regression tests |
| `mcp/` | Read-only documentation server |
| `versions.json` | Supported snapshots, source refs and runtime pins |
| `tooling/pdfmake-types/` | Attributed native declaration snapshot for unreleased library work |

## Build and verify

```sh
npm run docs:generate
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

The build writes `public/` and checks links, fragments, canonical URLs, structured
data and discovery files. Tests cover translations, JavaScript/TypeScript examples,
actual Node PDF generation, search, MCP and multi-version deployment composition.
Browser tests exercise previews, imports, downloads, errors, autosave, undo/redo,
named documents, mobile navigation, themes, history and operation without JavaScript.

For a production-style local preview, run `node scripts/serve.mjs` after building.
CI runs clean installs, dependency audits, the full build and browser tests before
uploading a review artifact. Generated vendor assets and `public/` are ignored.

## Edit documentation

Write Markdown with a TOML title, description and weight. Start with a runnable
example, explain its result, then document defaults and edge cases. Keep API names,
minimum versions, units, resource policies and failure behavior accurate.
Use the 0.3 Promise API and retain existing page URLs.

Code example pairs come from `scripts/code-examples.mjs`; do not independently
maintain JS and TS copies. Run `npm run docs:generate` after source edits and commit
the generated Markdown, search indexes and LLM exports. Executable definitions
must pass the same native TypeScript checker used by the editor.

English, German (`de`), French (`fr`), Spanish (`es`) and Brazilian Portuguese
(`pt-br`) have complete chapter sets. Translations live beside the source, for
example `tables.de.md`. After reviewing an English change, update the translation
and its `sourceDigest` (SHA-256 of the English source with LF line endings).
Tests compare page coverage, digests, headings, code, tables and internal links.
Search, portable Markdown and MCP results remain language-specific.
Playground controls and shared executable example output currently remain English.

## Review a local library change

Build the library first, then select it for documentation tests and previews:

```powershell
$env:PDFMAKE_SOURCE = 'C:\path\to\pdfmake'
node scripts/sync-native-types.mjs $env:PDFMAKE_SOURCE
npm run docs:generate
npm test
npm run build
```

The selected package version must match `versions.json`. Without the override,
PDF generation uses the pinned published runtime. **The published 0.3.13 runtime
has no bundled declarations or preflight API.** This development branch retains
an explicitly attributed, declaration-only snapshot from the improved library so
docs TypeScript examples are reproducible before its release. Native package
imports are verified against the actual tarball in the library repository.
The preflight API is used by previews when the selected runtime implements it;
there is no shim claiming an old runtime supports new functionality.

Check declaration synchronization with:

```sh
node scripts/sync-native-types.mjs /path/to/pdfmake --check
```

Once native declarations are released, update the pinned runtime and snapshot
together. PDF.js, CodeMirror and TypeScript are documentation tooling only.

The library's standalone playground mirrors these authored UI sources:

```sh
node scripts/sync-playground.mjs /path/to/pdfmake
node scripts/sync-playground.mjs /path/to/pdfmake --check
```

## Markdown and MCP

Generation produces `llms.txt`, `llms-full.txt`, individual Markdown pages and
`docs-index.json` from the same source as the website. Each snapshot and language
has its own exports. Configure an MCP client to launch:

```sh
node /absolute/path/to/docs/mcp/server.mjs
```

The stdio server exposes `search_docs`, `get_doc` and versioned Markdown resources.
It does not execute examples, render PDFs or read arbitrary caller-selected paths.
See [the integration guide](content/guides/llm-and-mcp.md).

## Versions and GitHub Pages

`versions.json` defines real supported snapshots and their library pins. The `0.1`
branch owns historical 0.1/0.2 documentation; never overwrite it with a 0.3 build.
To prepare another series, add a verified snapshot and matching runtime/source ref.
Version selectors, canonical URLs, search and exports derive from that registry.
Build isolated snapshots with `DOCS_VERSION`; compose a local collection with:

```sh
npm run build:collection -- collection 0.3=public
```

GitHub Pages remains a suitable host: this is a static, server-rendered website
with client-side enhancements. No application server or separate playground host
is required. The workflow uses GitHub's official configure/upload/deploy actions,
OIDC and a protected `github-pages` environment, with no personal deployment token secret. Only the explicit publication job has
`contents: write`, needed to archive the exact deployed site for subsequent series.

Production publication is **explicit**, from `master` in `pdfmake/docs`: dispatch
**Documentation checks and Pages** with `deploy: true`. It builds and tests first,
then deploys that exact artifact. `assemble-pages.mjs` preserves the existing
`gh-pages` root and every other registered snapshot, verifies metadata and stages
the current series under `0.3/`. GitHub serves the artifact under `/docs/`.
Deployments are serialized and do not cancel each other.

Before enabling publication, a maintainer must select **GitHub Actions** as the
Pages source, protect the `github-pages` environment (branch restriction and
required reviewer), retain the historical `gh-pages` branch as the preservation
source, and retire any competing publisher. This local review changes none of
those settings and performs no deployment.

For rollback, dispatch the last known-good source commit on the allowed branch
after reverting the offending change; the same tests and complete-site assembly
run again. The workflow commits the successfully deployed site to `gh-pages` as its preservation
archive; the root and other series retain their bytes. A normal fast-forward push
rejects concurrent modifications. Treat an archive-step failure as a failed
publication and repair/retry it before publishing another series.
`deployment.json` records the deployed source commit, series and runtime pin.

## Contribute

Follow [AGENTS.md](AGENTS.md), include a minimal example for behavior changes and
run the relevant validation commands above. Keep the site usable without JS and
retain the MIT notices for imported declarations and other third-party assets.
