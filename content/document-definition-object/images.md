+++
title = "Images"
description = ""
weight = 29
alwaysopen = true
+++


This is simple. Just use the ```{ image: '...' }``` node type.

JPEG and PNG formats are supported.

{{% alert theme="warning" %}}The image node expects a valid image value. If the value is invalid or empty, an error is thrown.{{% /alert %}}

```js
var docDefinition = {
  content: [
    {
      // you'll most often use dataURI images on the browser side
      // if no width/height/fit is provided, the original size will be used
      image: 'data:image/jpeg;base64,...encodedContent...'
    },
    {
      // if you specify width, image will scale proportionally
      image: 'data:image/jpeg;base64,...encodedContent...',
      width: 150
    },
    {
      // if you specify both width and height - image will be stretched
      image: 'data:image/jpeg;base64,...encodedContent...',
      width: 150,
      height: 150
    },
    {
      // you can also fit the image inside a rectangle
      image: 'data:image/jpeg;base64,...encodedContent...',
      fit: [100, 100]
    },
    {
      // if you reuse the same image in multiple nodes,
      // you should put it to to images dictionary and reference it by name
      image: 'mySuperImage'
    },
    {
      // under NodeJS (or in case you use virtual file system provided by pdfmake)
      // you can also pass file names here
      image: 'myImageDictionary/image1.jpg'
    },
    {
      // is supported loading images via url from reference by name in images
      image: 'snow'
    },
    {
      image: 'strawberries'
    },
  ],

  images: {
    mySuperImage: 'data:image/jpeg;base64,...content...',

    // is supported loading images via url (https or http protocol)
    snow: 'https://picsum.photos/seed/picsum/200/300',

    // is supported loading images via url with custom headers
    strawberries: {
      url: 'https://picsum.photos/id/1080/367/267',
      headers: {
        myheader: '123',
        myotherheader: 'abc',
      }
    }
  }
};
```
