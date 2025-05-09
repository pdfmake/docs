+++
title = "Encryption and access privileges"
description = ""
weight = 2290
alwaysopen = true
+++

```js
var docDefinition = {
  userPassword: '123',
  ownerPassword: '123456',
  permissions: {
    printing: 'highResolution', //'lowResolution'
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  content: [
    '...'
  ]
};
```

PDF document allow you to encrypt the PDF file and require a password when opening the file,
and/or set permissions of what users can do with the PDF file.

To enable encryption set user password in `userPassword` (string value). The PDF file will
be encrypted when a user password is provided, and users will be prompted to enter the password
to decrypt the file when opening it.

To set access privileges for the PDF file, you need to provide an owner password in `ownerPassword` (string value)
and object `permissions` with permissions. By default, all operations are disallowed.
You need to explicitly allow certain operations.

Following settings are allowed in `permissions` object:

- `printing` - whether printing is allowed. Specify `"lowResolution"` to allow degraded printing, or `"highResolution"` to allow printing with high resolution
- `modifying` - whether modifying the file is allowed. Specify `true` to allow modifying document content
- `copying` - whether copying text or graphics is allowed. Specify `true` to allow copying
- `annotating` - whether annotating, form filling is allowed. Specify `true` to allow annotating and form filling
- `fillingForms` - whether form filling and signing is allowed. Specify `true` to allow filling in form fields and signing
- `contentAccessibility` - whether copying text for accessibility is allowed. Specify `true` to allow copying for accessibility
- `documentAssembly` - whether assembling document is allowed. Specify `true` to allow document assembly

You can specify either user password, owner password or both passwords.
Behavior differs according to passwords you provides:

- When only user password is provided,
  users with user password are able to decrypt the file and have full access to the document.
- When only owner password is provided,
  users are able to decrypt and open the document without providing any password,
  but the access is limited to those operations explicitly permitted.
  Users with owner password have full access to the document.
- When both passwords are provided,
  users with user password are able to decrypt the file
  but only have limited access to the file according to permission settings.
  Users with owner password have full access to the document.

Note that PDF file itself cannot enforce access privileges.
When file is decrypted, PDF viewer applications have full access to the file content,
and it is up to viewer applications to respect permission settings.

To choose encryption method, you need to specify PDF version by `version`.
The best possible encryption method for PDF version is used.

{{% alert theme="warning" %}}PDF version is used only for encryption method, all other PDF elements are in version 1.3.{{% /alert %}}

Available versions:

- `1.3` - PDF version 1.3 (default), 40-bit RC4 is used
- `1.4` - PDF version 1.4, 128-bit RC4 is used
- `1.5` - PDF version 1.5, 128-bit RC4 is used
- `1.6` - PDF version 1.6, 128-bit AES is used
- `1.7` - PDF version 1.7, 128-bit AES is used
- `1.7ext3` - PDF version 1.7 ExtensionLevel 3, 256-bit AES is used

When using PDF version 1.7 ExtensionLevel 3, password is truncated to 127 bytes of its UTF-8 representation.
In older versions, password is truncated to 32 bytes, and only Latin-1 characters are allowed.