# Performance and memory

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/guides/performance/

## Measure your workload

Benchmark representative documents with the same Node version, fonts and input data. Record median and tail latency, peak memory, page count and output size. Separate cold startup/font loading from repeated renders. Compare table-heavy, long-text and image-heavy documents separately.

**JavaScript**

```js
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

**TypeScript**

```ts
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

`makeFreshDefinition()` is your own factory. Do not reuse a definition already mutated by layout. Verify text, page counts and representative rendered pages as well as speed.

## Reduce avoidable work

- Put repeated images in the `images` dictionary and reference them by key. Resize large source images before embedding them; display dimensions do not reduce the original payload.
- Prefer fixed widths when your layout permits them. Content-driven `auto` widths require text measurement; benchmark before redesigning tables.
- Register fonts once. In browser applications, ship only needed font families and variants.
- Keep `fontLayoutCache` enabled unless a measured compatibility problem requires disabling it. See [render options](/docs/0.3/options/).
- Avoid base64 when your API can return binary PDF bytes. Base64 represents each three bytes with four characters and also allocates a string.
- Use `write()` or direct stream consumption to avoid the additional concatenated Buffer produced by `getBuffer()` when you only need a file or stream. Layout still occurs before output consumption.

## Control concurrency

More simultaneous PDF jobs can increase memory use and event-loop delay. Bound concurrent renders and load-test throughput rather than only measuring one request. Use worker threads or separate processes when blocking work affects API responsiveness. Keep mutable singleton configuration out of per-request code.

## Library development benchmark

The library improvement branch includes `npm run benchmark:text` after `npm run build:node`. It compares text-array flattening with the previous algorithm using deterministic mixed input and verifies equivalent results. The optimized loop avoids repeated prefix copying. Its speedup measures that helper only; it is not a claim about total PDF generation time.

Timing thresholds are deliberately excluded from CI because shared runners are noisy. Use correctness tests as gates and retain benchmark results with environment details for review.
