# Tu primer PDF

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/learn/first-pdf/

## 1. Comprender los dos ingredientes

pdfmake necesita un **motor con fuentes** y una **definición del documento**. La definición es un objeto JavaScript que describe lo que se va a imprimir. No es HTML y no dibuja nada hasta que se pasa a `createPdf` y se solicita una salida.

Para el primer intento, usa el ejemplo del navegador que aparece abajo. Ya tiene configurados el motor y la fuente Roboto. Después, usa la configuración del entorno de ejecución del paso 3.

## 2. Ver una definición completa

El resultado que aparece abajo se genera exactamente con este código. Las tres entradas de `content` se convierten en tres bloques verticales. El texto se ajusta automáticamente; los márgenes y los tamaños de fuente se miden en puntos PDF (72 puntos = 1 pulgada).



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/es/playground/?example=welcome)



Cambia el encabezado o el tamaño de fuente en el entorno de pruebas. Con **Live preview** activada, el PDF nuevo aparece después de dejar de escribir. Puedes deshacer cambios, guardar documentos con nombre en el navegador o exportar un archivo JavaScript.

## 3. Configurar tu propia aplicación

Elige **una** configuración. No combines la entrada de Node con métodos de salida exclusivos del navegador.

| Entorno | Configuración | Por qué importan las fuentes |
| --- | --- | --- |
| API de Node.js | [Inicio rápido completo con Node](/docs/0.3/es/getting-started/server-side/) | Registra archivos de fuentes reales o una familia estándar antes del renderizado |
| Aplicación de navegador | [Inicio rápido completo en el navegador](/docs/0.3/es/getting-started/client-side/) | Carga `pdfmake.min.js` y luego un VFS de fuentes, o regístralo en el empaquetador |

El ejemplo usa `Roboto`, la fuente predeterminada del navegador. Si lo usas con la configuración de Helvetica estándar de la guía de Node, añade `defaultStyle: { font: 'Helvetica' }` a la definición o registra los archivos Roboto. El texto Unicode también necesita una fuente que cubra los caracteres usados; una cadena válida no aporta los glifos que falten.

## 4. Solicitar una salida y gestionar errores

En una aplicación de navegador configurada:

**JavaScript**

```js
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

Aquí `dd` es la definición anterior y `#status` es un elemento de la aplicación. En Node.js, usa en su lugar `await pdfmake.createPdf(dd).write('first-document.pdf')`. `createPdf` devuelve un contenedor de salida; el método de salida devuelve la Promise que hay que esperar. Si no usas `await` ni `.catch(...)`, es posible que el error de generación nunca llegue a la interfaz.

## 5. Añadir un concepto a la vez

Conserva el primer documento funcional. A continuación, añade [estilos con nombre](/docs/0.3/es/document-definition-object/styling/) y después [tablas](/docs/0.3/es/document-definition-object/tables/) cuando necesites filas. Usa el [modelo de documento](/docs/0.3/es/learn/document-model/) para elegir el tipo de nodo. Si algo falla, [clasifica el error](/docs/0.3/es/guides/errors/) antes de cambiar de golpe las fuentes, la distribución y los recursos.
