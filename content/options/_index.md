+++
title = "Options"
description = ""
weight = 30
alwaysopen = true
+++

Advanced options for creating document used in [client-side methods](/docs/0.1/getting-started/client-side/methods/) or [server-side method](/docs/0.1/getting-started/server-side/).

Options:

{{% alert theme="warning" %}}`fontLayoutCache` - Minimal version: **0.1.55**{{% /alert %}}

- `fontLayoutCache` - option to disable font layout cache (_default_: `true` - cache enabled)
- `bufferPages` -  allows you to control when pages are flushed to the output file (see [pdfkit documentation](http://pdfkit.org/docs/getting_started.html)) (_default_: `false` - buffer disabled)
