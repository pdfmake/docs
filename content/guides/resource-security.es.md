+++
sourceDigest = "6c29d58fcc33de62c3b85279453f4530abfd1801030ad057800f73e261b61a26"
title = "Seguridad de recursos"
description = "Controla las URL externas, los archivos locales y las entradas de documentos que no sean de confianza al usar pdfmake en aplicaciones de servidor."
weight = 3
+++

## Trata las definiciones como código de la aplicación

Una definición puede contener funciones callback para encabezados, pies de página, distribuciones de tablas y saltos de página. Nunca ejecutes JavaScript enviado por un usuario que no sea de confianza. Acepta datos de aplicación validados y construye las definiciones tú mismo. Limita el tamaño de la entrada, el anidamiento, las dimensiones de las tablas y el tamaño de las imágenes antes del renderizado.

## Deniega los recursos que no necesites

Si se proporcionan todos los recursos como datos en memoria, deniega las rutas de recursos basadas en cadenas:

```js
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

La implementación actual también comprueba los identificadores de fuentes estándar (por ejemplo, `Helvetica-Bold`) mediante la política local. Si usas fuentes estándar, permite los identificadores registrados exactos; el [inicio rápido de Node](/docs/0.3/es/getting-started/server-side/) muestra esta configuración.

Las políticas de URL requieren la versión **0.3.6 o posterior** y las políticas locales, la **0.3.8 o posterior**. Configúralas antes de aceptar trabajos. Una política no configurada permite cargar recursos; no equivale a denegar todo.

## Usa políticas síncronas

La implementación comprueba si `callback(value) === true`. No uses funciones callback `async`, búsquedas DNS ni Promises en estas políticas. Si la validación requiere trabajo asíncrono, descarga antes los recursos aprobados en la aplicación y luego proporciona los datos incrustados o un archivo propiedad de la aplicación.

```js
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

Este ejemplo de nombre de host no protege por completo contra SSRF. También importan los cambios de DNS, las redirecciones, los rangos de direcciones internos y los permisos de red del despliegue. Aplica controles al tráfico de salida. En Node.js, el resolutor comprueba manualmente los saltos de redirección. Los navegadores pueden seguir redirecciones antes de comprobar la política de la URL final; las políticas del navegador no pueden controlar todos los saltos de red.

## Archivos locales

Permite rutas resueltas exactas que pertenezcan a la aplicación. Consulta [configuración de fuentes](/docs/0.3/es/fonts/) para ver una lista de permitidos funcional. Evita `startsWith('fonts/')`, que no resuelve rutas de recorrido ni alias del sistema de archivos. Protege los archivos aprobados contra sustituciones y ten en cuenta los enlaces simbólicos. No permitas que quien llama elija rutas arbitrarias del servidor.

## Limitar el trabajo

La maquetación y el trabajo con fuentes pueden consumir CPU y memoria antes de que haya un flujo de salida disponible. Usa colas con límites y trabajadores aislados al servir documentos grandes o no confiables. Un tiempo límite de Promise por sí solo no interrumpe una maquetación síncrona. Si necesitas una cancelación estricta, añade límites a nivel de proceso.

## El cifrado PDF es un tema aparte

Las [contraseñas y permisos del PDF](/docs/0.3/es/document-definition-object/security/) afectan al documento generado. No protegen la red, el sistema de archivos ni la ejecución de callbacks del servidor.
