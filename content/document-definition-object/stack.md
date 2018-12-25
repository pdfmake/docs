+++
title = "Stack of paragraphs"
description = ""
weight = 28
alwaysopen = true
+++


You could have figured out by now (from the examples), that if you set the ```content``` key to an array, the  document becomes a stack of paragraphs.

You'll quite often reuse this structure in a nested element, like in the following example:
```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
```

The problem with an array is that you cannot add styling properties to it (to change fontSize for example).

The good news is - array is just a shortcut in pdfMake for { stack: [] }, so if you want to restyle the whole stack, you can do it using the expanded definition:
```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
```