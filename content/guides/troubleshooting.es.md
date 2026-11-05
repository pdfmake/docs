+++
sourceDigest = "5159bc06095c71b8ab0b613c4df51b538e163232b5543aa4bb809f90b91021bb"
title = "Solución de problemas"
description = "Diagnostica errores frecuentes de pdfmake 0.3 relacionados con importaciones, fuentes, tablas, Promises, ventanas del navegador y acceso a recursos."
weight = 5
+++

## Empieza por la versión y el entorno de ejecución

Ejecuta `npm ls pdfmake` y compara la importación con la guía de inicio rápido correspondiente. Un paquete para navegador y la entrada de Node exponen métodos de salida distintos. Los ejemplos de las versiones 0.1/0.2 que usan `new PdfPrinter(...)` o callbacks no describen la API 0.3.

| Síntoma | Qué comprobar | Solución |
| --- | --- | --- |
| La familia o variante de fuente no está definida | Nombre de familia, asignación de negrita/cursiva y fuente predeterminada | Registra todas las variantes usadas y selecciona la familia en `defaultStyle` |
| Archivo no encontrado o acceso denegado | Ruta resuelta real de la fuente/imagen y política | Usa rutas existentes propiedad de la aplicación y una política síncrona correspondiente |
| Glifos ausentes o incorrectos | Cobertura de glifos de la fuente seleccionada | Incrusta una fuente que cubra el idioma; prueba también negrita y cursiva |
| Tabla vacía o malformada | `body`, longitudes de filas y celdas combinadas | Proporciona filas no vacías y coherentes, y marcadores de posición para las celdas combinadas |
| `download` no es una función en Node | Entorno de ejecución importado | Usa `write` o `getBuffer` desde la entrada de Node |
| El navegador no abre una ventana | Gesto del usuario y bloqueador de ventanas emergentes | Abre la ventana directamente al hacer clic, antes de cargar datos de forma asíncrona |
| Se deniega una URL pese al callback de permiso | Tipo de valor devuelto por el callback | Devuelve el valor booleano literal `true` de forma síncrona y quita `async` |
| Falla la solicitud HTTP de una imagen | URL, política, CORS, estado y redirecciones | Comprueba el acceso en el entorno de ejecución de destino; los navegadores aplican CORS |
| Archivo incompleto o ausente | Promise rechazada y errores de escritura | Espera a `write()` y gestiona su rechazo antes de informar que se completó |
| La salida cambia tras una actualización | Versión, fuentes, entradas y valores predeterminados | Reproduce el problema con una versión fijada y compara el texto extraído, el número de páginas y las páginas renderizadas |

## Reducir la definición

Empieza con un párrafo sencillo y fuentes que sepas que funcionan. Añade los estilos, las filas de tabla y los recursos de uno en uno. Construye una definición nueva en cada intento. Mantén separados los errores de solicitudes y recursos de los errores de maquetación.

## Informar de un error útil

Incluye las versiones exactas de pdfmake y Node/navegador, el sistema operativo, una definición mínima que se pueda ejecutar, la configuración de fuentes, el comportamiento esperado y el real, y el seguimiento de pila relevante completo. Elimina el contenido privado y los secretos. Para errores de paginación, incluye la entrada más pequeña que todavía reproduce el salto de página.
