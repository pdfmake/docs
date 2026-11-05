+++
sourceDigest = "616036f2f41d848cce3f3a6bca2ff44eb27d9ff401cfb4071acc2ea13f9205c0"
title = "Imágenes"
description = "Incrusta imágenes PNG y JPEG desde data URLs, recursos con nombre, archivos o URL externas aprobadas."
weight = 2100
alwaysopen = true
+++

## Reutilizar datos PNG o JPEG incrustados

Un nodo de imagen es `{ image: 'key' }`, donde la clave se resuelve mediante el diccionario `images` del documento. Reutiliza una clave si la misma imagen aparece más de una vez. Se admiten PNG y JPEG; para contenido SVG, usa un [nodo SVG](/docs/0.3/es/document-definition-object/svgs/).

{{< example id="images" >}}

## Elegir el comportamiento del tamaño

| Campos del nodo de imagen | Resultado |
| --- | --- |
| Sin width, height ni fit | Usa las dimensiones naturales de la imagen |
| `width: 150` | Escala proporcionalmente a ese ancho |
| `height: 100` | Escala proporcionalmente a esa altura; desde 0.3.2 |
| `width: 150, height: 100` | Fuerza esas dimensiones y puede estirar la imagen |
| `fit: [150, 100]` | Ajusta dentro de un rectángulo y conserva la relación de aspecto |
| `cover: { width: 150, height: 100, align: 'right', valign: 'bottom' }` | Rellena un rectángulo recortando y alineando la imagen |

Las dimensiones de visualización no reducen el tamaño de los datos de la imagen original. Si importan el tamaño de salida y la memoria, cambia el tamaño de las imágenes de origen demasiado grandes antes de incrustarlas.

## Seleccionar un origen para el entorno de ejecución

| Origen | Configuración |
| --- | --- |
| Data URL | Coloca una data URL Base64 completa de PNG/JPEG en `images` o directamente en un nodo |
| Archivo local | Solo en Node.js o si el archivo ya está presente en un VFS del navegador |
| URL HTTP(S) | Usa una entrada con nombre en `images` y autorízala mediante la política de recursos |
| URL con encabezados | Usa `{ url, headers }` en la entrada con nombre de `images` |

```js
var dd = {
  images: {
    logo: '/application-owned/assets/logo.png',
    remote: {
      url: 'https://assets.example.com/photo.jpg',
      headers: { 'X-Example-Header': 'value' }
    }
  },
  content: [
    { image: 'logo', width: 120 },
    { image: 'remote', fit: [200, 150] }
  ]
};
```

Este fragmento describe formatos de origen, no una descarga ejecutable completa. Proporciona un archivo existente que sea propiedad de la aplicación y una URL real aprobada. En un navegador, el nombre del archivo local debe existir en el VFS; además, las URL del navegador requieren compatibilidad con CORS. No incluyas credenciales privadas en definiciones del lado del cliente. El ejemplo incrustado anterior es autónomo y no necesita recursos de red.

## Diagnosticar imágenes que faltan

Un valor de imagen vacío o no válido es un error. Comprueba la clave del diccionario, el prefijo y los bytes de la data URL completa, la existencia del archivo, la respuesta de la URL y la política de acceso. Configurar `setUrlAccessPolicy` no evita CORS. Una política de archivos locales debe permitir la ruta real resuelta. Consulta [seguridad de recursos](/docs/0.3/es/guides/resource-security/) y [solución de problemas](/docs/0.3/es/guides/troubleshooting/).

## Caché de recursos URL {#url-resource-caching}

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

En el diccionario `images`, define `url`, las `headers` opcionales y `cache` en el objeto del recurso para reemplazar la configuración global.

```js
var docDefinition = {
  content: [{ image: 'logo' }],
  images: {
    logo: {
      url: 'https://example.com/logo.png',
      cache: true
    }
  }
};
```

Las nuevas descargas se guardan por documento de forma predeterminada. `cache: true` guarda los nuevos datos en la caché compartida en memoria para documentos posteriores; `cache: false` sigue permitiendo leer una entrada compartida existente. Las URL de texto y los objetos sin `cache` usan la configuración global. La caché HTTP del navegador es independiente.

Consulta [Caché de recursos URL](/docs/0.3/es/getting-started/server-side/methods/#url-resource-caching) para conocer su configuración y seguridad.
