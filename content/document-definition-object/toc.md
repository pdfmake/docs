+++
title = "Table of contents"
description = ""
weight = 292
alwaysopen = true
+++


```js
var docDefinition = {
  content: [
    {
      toc: {
        // id: 'mainToc'  // optional
        title: {text: 'INDEX', style: 'header'}
      }
    },
    {
      text: 'This is a header',
      style: 'header',
      tocItem: true, // or tocItem: 'mainToc' if is used id in toc
      // or tocItem: ['mainToc', 'subToc'] for multiple tocs
    }
  ]
}
```