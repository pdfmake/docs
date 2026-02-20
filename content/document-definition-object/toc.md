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
        //textMargin: [0, 0, 0, 0],
        //textStyle: {italics: true},
        numberStyle: { bold: true },
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

#### ToC properties

* `id: string`: (optional) only usable if you use multiple ToC lists to identify
* `title: string | text node`:  (optional) title of ToC, string or text node
* `hideEmpty: boolean`: (optional) (default `false`) hide ToC if is empty _(Minimal pdfmake version: 0.3.3)_
* `textStyle`: (optional)
* `numberStyle`: (optional)
* `textMargin`: (optional)
* `sortBy: string`: (optional) `'page'` (default) or `'title'` _(Minimal pdfmake version: 0.3.3)_
* `sortLocale: string`: (optional) default browser or nodejs language is used _(Minimal pdfmake version: 0.3.3)_
* `outlines: boolean`: (optional) adds all items to outlines / bookmarks (any existing outline settings on texts are respected) see this [article](/docs/0.3/document-definition-object/outlines/) _(Minimal version: 0.3.5)_

#### Node properties 

* `tocItem: boolean | string`:
* `textStyle`: (optional)
* `numberStyle`: (optional)
* `textMargin`: (optional)