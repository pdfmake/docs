+++
title = "Table of contents"
description = ""
weight = 2230
alwaysopen = true
+++

The simplest example of a table of contents:
```js
var docDefinition = {
  content: [
    {
      toc: {
        title: {text: 'INDEX', style: 'header'}
      }
    },
    {
      text: 'This is a header',
      style: 'header',
      tocItem: true
    }
  ]
}
```

If `id` is used in toc, the tocItem can target that id:
```js
var docDefinition = {
  content: [
    {
      toc: {
        id: 'mainToc',
        title: {text: 'INDEX', style: 'header'}
      }
    },
    {
      text: 'This is a header',
      style: 'header',
      tocItem: 'mainToc'
    }
  ]
}
```

If multiple Table of Contents are used, tocItem can be used to place the text in the correct toc:
```js
var docDefinition = {
  content: [
    {
      toc: {
        id: 'mainToc',
        title: {text: 'INDEX', style: 'header'}
      },
      toc: {
        id: 'subToc',
        title: {text: 'SUB INDEX', style: 'header'}
      }
    },
    {
      text: 'This is a header',
      style: 'header',
      tocItem: ['mainToc', 'subToc']
    }
  ]
}
```
