+++
sourceDigest = "6736e08d8db59cae0ce17becb97f86de18201817a5135ee1385a2a15cc1608f5"
title = "Cifrado y permisos de acceso"
description = "Configura contraseñas PDF, versiones de cifrado y permisos del documento; son conceptos distintos de las políticas de acceso a recursos."
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

Los documentos PDF se pueden cifrar para exigir una contraseña al abrirlos y/o para establecer qué pueden hacer los usuarios con el archivo.

Para activar el cifrado, asigna una contraseña de usuario (un valor de tipo string) a `userPassword`. El archivo PDF se cifra cuando se proporciona una contraseña de usuario, y se pedirá a los usuarios que la introduzcan para descifrarlo al abrirlo.

Para establecer permisos de acceso al archivo, debes proporcionar una contraseña de propietario en `ownerPassword` (un valor de tipo string) y un objeto `permissions` con los permisos. De forma predeterminada, todas las operaciones están prohibidas. Debes permitir explícitamente las operaciones que correspondan.

El objeto `permissions` admite estas opciones:

- `printing`: indica si se permite imprimir. Especifica `"lowResolution"` para permitir una impresión de calidad reducida, o `"highResolution"` para permitir una impresión de alta resolución.
- `modifying`: indica si se permite modificar el archivo. Especifica `true` para permitir modificar el contenido del documento.
- `copying`: indica si se permite copiar texto o gráficos. Especifica `true` para permitir la copia.
- `annotating`: indica si se permiten las anotaciones y el relleno de formularios. Especifica `true` para permitir ambas operaciones.
- `fillingForms`: indica si se permite rellenar y firmar formularios. Especifica `true` para permitir completar campos y firmar.
- `contentAccessibility`: indica si se permite copiar texto para la accesibilidad. Especifica `true` para permitir esa copia.
- `documentAssembly`: indica si se permite ensamblar el documento. Especifica `true` para permitirlo.

Puedes especificar una contraseña de usuario, una de propietario o ambas. El comportamiento depende de las contraseñas que proporciones:

- Si solo se proporciona una contraseña de usuario, quienes la tengan podrán descifrar el archivo y acceder al documento sin restricciones.
- Si solo se proporciona una contraseña de propietario, los usuarios podrán descifrar y abrir el documento sin introducir una contraseña, pero su acceso se limitará a las operaciones permitidas explícitamente. Quienes tengan la contraseña de propietario tendrán acceso completo al documento.
- Si se proporcionan ambas contraseñas, quienes tengan la contraseña de usuario podrán descifrar el archivo, pero solo tendrán el acceso limitado establecido por los permisos. Quienes tengan la contraseña de propietario tendrán acceso completo.

Ten en cuenta que el propio archivo PDF no puede hacer cumplir los permisos. Una vez descifrado, las aplicaciones de visualización de PDF tienen acceso completo al contenido del archivo; corresponde a esas aplicaciones respetar la configuración de permisos.

Para elegir el método de cifrado, especifica la versión PDF mediante `version`. Se utiliza el mejor método de cifrado disponible para esa versión.

{{% alert theme="warning" %}}La versión PDF solo se usa para el método de cifrado; todos los demás elementos del PDF usan la versión 1.3.{{% /alert %}}

Versiones disponibles:

- `1.3`: PDF 1.3 (predeterminada), se usa RC4 de 40 bits
- `1.4`: PDF 1.4, se usa RC4 de 128 bits
- `1.5`: PDF 1.5, se usa RC4 de 128 bits
- `1.6`: PDF 1.6, se usa AES de 128 bits
- `1.7`: PDF 1.7, se usa AES de 128 bits
- `1.7ext3`: PDF 1.7 ExtensionLevel 3, se usa AES de 256 bits

Con la versión PDF 1.7 ExtensionLevel 3, la contraseña se trunca a 127 bytes de su representación UTF-8. En versiones anteriores, se trunca a 32 bytes y solo se permiten caracteres Latin-1.
