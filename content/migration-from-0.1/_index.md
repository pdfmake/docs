+++
title = "Migration from 0.1"
description = ""
weight = 9
alwaysopen = true
+++

#### Unified interfaces and all methods return promise

[See Methods for client-side](/docs/0.3/getting-started/client-side/methods/).

[See Methods for server-side](/docs/0.3/getting-started/server-side/methods/).


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
