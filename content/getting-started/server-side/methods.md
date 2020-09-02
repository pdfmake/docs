+++
title = "Methods"
description = ""
weight = 12
alwaysopen = true
+++

#### Write
```js
pdfMake.createPdf(docDefinition).write(filename).then(() => {
	// finished
}, err => {
	console.error(err);
});
```
Parameters:

* `filename` - PDF document file name
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.2/options/)