+++
sourceDigest = "f1491a6775394bd4e30fc8da29d4972607400a030e766c3e7acd329137b35166"
title = "Resumen de la API"
description = "Consulta los métodos de configuración, las opciones de renderizado y los métodos de salida de las API de Node.js y navegador de pdfmake 0.3."
weight = 2
+++

## Configurar una vez y renderizar muchas veces

Ambos puntos de entrada exponen un singleton. Configura las fuentes, las políticas y las distribuciones al iniciar la aplicación. No sustituyas la configuración compartida mientras se renderizan solicitudes simultáneas.

| Método | Entorno | Comportamiento |
| --- | --- | --- |
| `addFonts(fonts)` | Ambos | Combina familias de fuentes; una familia proporcionada sustituye la asignación anterior |
| `setFonts(fonts)` | Ambos | Sustituye todo el mapa de fuentes |
| `clearFonts()` | Ambos | Borra las fuentes registradas |
| `addTableLayouts(layouts)` | Ambos | Combina funciones de distribución con nombre |
| `setTableLayouts(layouts)` | Ambos | Sustituye las distribuciones con nombre |
| `clearTableLayouts()` | Ambos | Borra las distribuciones personalizadas |
| `setProgressCallback(callback)` | Ambos | Recibe el progreso del renderizado; no es un perfilador de maquetación por página |
| `setUrlAccessPolicy(callback)` | Ambos, desde 0.3.6 | Permite URL de recursos solo si el callback devuelve `true` de forma síncrona |
| `setLocalAccessPolicy(callback)` | Node, desde 0.3.8 | Permite recursos locales solo si el callback devuelve `true` de forma síncrona |
| `addVirtualFileSystem(vfs)` | Navegador | Añade datos Base64 de fuentes y recursos al sistema de archivos virtual |
| `addFontContainer(container)` | Navegador | Registra un contenedor de fuentes empaquetado |

## Renderizar

`createPdf(docDefinition, options?)` acepta objetos y devuelve un contenedor de salida. Usa los [campos del documento](/docs/0.3/es/document-definition-object/) en el primer argumento y las [opciones de renderizado](/docs/0.3/es/options/) en el segundo.

| Salida | Node | Navegador |
| --- | --- | --- |
| `getBuffer()`, `getBase64()`, `getDataUrl()`, `getStream()` | Sí | Sí |
| `write(filename)` | Sí | No |
| `download(filename?)`, `open(window?)`, `print(window?)`, `getBlob()` | No | Sí |

Todos los métodos de salida devuelven Promises. Gestiona siempre los rechazos. El contenedor que devuelve `createPdf` no es una Promise. Consulta [métodos de Node](/docs/0.3/es/getting-started/server-side/methods/) y [métodos del navegador](/docs/0.3/es/getting-started/client-side/methods/) para conocer los detalles del ciclo de vida.
