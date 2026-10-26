+++
title = "Supported Node.js versions"
description = "Check the package engine requirement and continuous-integration runtime matrix for pdfmake 0.3."
weight = 11
+++

## Engine requirement

The 0.3.13 package declares **Node.js >=20** in `package.json`. The proposed CI matrix covers Node.js 20, 22 and 24 on Linux, Windows and macOS. Compatibility coverage is separate from upstream Node.js security support.

Use a Node.js release that is still maintained for production. Consult the [official Node.js release schedule](https://github.com/nodejs/Release#release-schedule) before choosing a runtime. Test your own fonts, resources and document workload on the exact version you deploy.
