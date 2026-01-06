+++
title = "Migration from 0.1/0.2"
description = ""
weight = 9
alwaysopen = true
+++

#### Server-side: a different way of invoking the library

[See documentation](/docs/0.3/getting-started/server-side/).

#### Unified interfaces and all methods return promise

Client-side: replace callbacks with promises [see documentation](/docs/0.3/getting-started/client-side/methods/).

Server-side: introduce new methods as on the client [see documentation](/docs/0.3/getting-started/server-side/methods/).


#### Changed including virtual font storage in client-side

Regenerate virtual file system (VFS) is required.


#### Changed parameters of pageBreakBefore function

Version 0.1 or 0.2:
```js
  pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {

  }
```

Version 0.3:
```js
  pageBreakBefore: function(currentNode, nodeContainer) {
    // nodeContainer.getFollowingNodesOnPage();
    // nodeContainer.getNodesOnNextPage();
    // nodeContainer.getPreviousNodesOnPage();
  }
```

[See documentation](/docs/0.3/document-definition-object/page/#dynamically-control-page-breaks-for-instance-to-avoid-orphan-children).
