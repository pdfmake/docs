# Contribuciones y arquitectura del código fuente

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/contributing/

## Mapa del código fuente

La biblioteca y este sitio tienen repositorios independientes:

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake): motor, paquetes, pruebas y ejemplos.
- [pdfmake/docs](https://github.com/pdfmake/docs): sitio de desarrollo versionado y herramientas de documentación.

La entrada de Node de la biblioteca es `src/index.js`; la configuración común está en `src/base.js`. La integración del navegador se encuentra en `src/browser-extensions/`. `Printer` prepara recursos y crea la salida de PDFKit. `DocPreprocessor` normaliza nodos, `DocMeasure` y `TextInlines` los miden, `LayoutBuilder` y `TableProcessor` los paginan y `Renderer` escribe las instrucciones de dibujo de PDFKit.

## Validar cambios del motor

```sh
npm ci
npm test
npm run build:examples
npm run test:package
```

`npm test` genera los artefactos de Node y del navegador y luego ejecuta Mocha y ESLint. Las pruebas unitarias importan `js/` compilado, así que vuelve a compilar después de editar `src/`. No edites `js/` ni `build/` directamente. La nueva prueba de humo del paquete instala el tarball real en un consumidor temporal con dependencias de producción y luego prueba la salida de Node y ambos paquetes para navegador. No sustituye las pruebas en navegadores reales.

Al optimizar, conserva el texto, las métricas de fuentes, la herencia de estilos y la paginación. Añade una prueba de regresión para un caso límite y, cuando sea posible, compara con el comportamiento anterior. Mantén los benchmarks de rendimiento separados de las comprobaciones de corrección.

## Validar cambios de documentación

Usa Node >=24.11 y Hugo **0.168.0**. Desde este repositorio:

```sh
npm ci
npm run docs:generate
npm test
npm run build
npm run dev
```

Abre la dirección que muestra Hugo. La generación produce el índice de búsqueda del sitio, las exportaciones Markdown y el corpus MCP a partir de `content/`. Las pruebas comprueban los metadatos, los ejemplos y el comportamiento MCP. La compilación verifica los enlaces internos generados y los destinos de fragmentos. Confirma las salidas generadas junto con las modificaciones de origen para que los clientes puedan usar el corpus sin instalar Hugo.

## Publicaciones

La biblioteca conserva su activador upstream de GitHub Releases. El flujo de trabajo propuesto comprueba que coincidan la etiqueta y la versión, genera, prueba, compila los ejemplos, prueba un paquete de consumo y luego publica el mismo tarball con procedencia. Las pruebas locales no publican nada en el registro.

El flujo de trabajo de documentación genera y carga un artefacto para revisión en las inserciones y solicitudes de cambios; no sobrescribe el sitio de producción versionado. La organización existente para publicar varias versiones de ese sitio debe coordinarse con los mantenedores antes de cambiar el despliegue.
