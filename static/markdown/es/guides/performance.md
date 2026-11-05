# Rendimiento y memoria

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/performance/

## Medir tu carga de trabajo

Evalúa documentos representativos con la misma versión de Node, las mismas fuentes y los mismos datos de entrada. Registra la latencia mediana y de cola, la memoria máxima, el número de páginas y el tamaño de salida. Separa el inicio en frío y la carga de fuentes de los renderizados repetidos. Compara por separado documentos con muchas tablas, texto extenso e imágenes.

**JavaScript**

```js
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

**TypeScript**

```ts
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

`makeFreshDefinition()` es una función de fábrica propia. No reutilices una definición que ya haya sido modificada por la maquetación. Comprueba el texto, el número de páginas y algunas páginas representativas renderizadas, además de la velocidad.

## Reducir trabajo evitable

- Coloca las imágenes repetidas en el diccionario `images` y haz referencia a ellas por su clave. Reduce el tamaño de las imágenes de origen grandes antes de incrustarlas; las dimensiones de visualización no reducen el tamaño de los datos originales.
- Siempre que la distribución lo permita, prefiere los anchos fijos. Los anchos `auto` determinados por el contenido requieren medir el texto; mide el rendimiento antes de rediseñar las tablas.
- Registra las fuentes una vez. En aplicaciones de navegador, incluye solo las familias y variantes necesarias.
- Mantén activado `fontLayoutCache` salvo que un problema de compatibilidad medido requiera desactivarlo. Consulta las [opciones de renderizado](/docs/0.3/es/options/).
- Evita Base64 cuando tu API pueda devolver bytes PDF binarios. Base64 representa cada tres bytes con cuatro caracteres y también reserva una cadena.
- Usa `write()` o consume el flujo directamente para evitar el Buffer concatenado adicional que produce `getBuffer()` cuando solo necesitas un archivo o un flujo. La maquetación sigue ocurriendo antes de consumir la salida.

## Controlar la concurrencia

Más trabajos PDF simultáneos pueden aumentar el uso de memoria y la latencia del bucle de eventos. Limita el número de renderizados simultáneos y prueba el rendimiento con carga, en vez de medir una sola solicitud. Usa hilos de trabajo o procesos independientes si el trabajo bloqueante afecta la capacidad de respuesta de la API. Mantén fuera del código por solicitud la configuración singleton mutable.

## Benchmark de desarrollo de la biblioteca

La rama de mejoras de la biblioteca incluye `npm run benchmark:text` después de `npm run build:node`. Compara el aplanamiento de matrices de texto con el algoritmo anterior mediante una entrada mixta determinista y comprueba que los resultados sean equivalentes. El bucle optimizado evita copiar repetidamente los prefijos. Su aceleración mide solo esa función; no afirma que mejore en la misma proporción la generación completa de PDF.

Los umbrales de tiempo están excluidos deliberadamente de CI porque los ejecutores compartidos producen mediciones ruidosas. Usa las pruebas de corrección como condición de aceptación y conserva los resultados del benchmark junto con los detalles del entorno para revisarlos.
