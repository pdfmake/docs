+++
title = "Links"
description = ""
weight = 291
alwaysopen = true
+++


To add external or internal links, use the following syntax:
```js
{ text: 'google', link: 'http://google.com' }
{ text: 'Go to page 2', linkToPage: 2 }
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
```
Or link to local computer file:
```js
var dd = {
	content: [
		{
		    text: 'link',
		    link: 'file:///c:/testFile.txt'
		}
	]
};
```

##### Properties

- `link` (`string`) - URL to external site
- `linkToPage` (`number`) - link to page number
- `linkToDestination` (`string`) - link to document destination
