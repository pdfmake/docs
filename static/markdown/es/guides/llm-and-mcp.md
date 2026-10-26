# Integración con LLM y MCP

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/llm-and-mcp/

## Usar la documentación sin MCP

Cada página está disponible como Markdown generado. Las mismas fuentes producen:

- [llms.txt](/docs/0.3/es/llms.txt): índice de páginas con descripciones y enlaces Markdown.
- [llms-full.txt](/docs/0.3/es/llms-full.txt): corpus completo de Markdown versionado.
- [docs-index.json](/docs/0.3/es/docs-index.json): identificadores de páginas, títulos, descripciones, URL de origen y Markdown completo.

Son ayudas para descubrir contenido, no una garantía de indexación en motores de búsqueda o modelos. Incluye en tu prompt la versión de la biblioteca instalada. Pide al modelo que cite la página y use los métodos de salida basados en Promise. El archivo `AGENTS.md` de la biblioteca explica a los agentes de programación la canalización de origen y los comandos de prueba.

## Ejecutar el servidor MCP local

Clona el repositorio de documentación, instala sus dependencias, genera el corpus e inicia el servidor:

```sh
git clone https://github.com/pdfmake/docs.git
cd docs
npm ci
npm run docs:generate
node mcp/server.mjs
```

Este servidor forma parte de la rama local de mejoras hasta que se acepte upstream. Inícialo mediante la configuración stdio de tu cliente MCP, con rutas absolutas:

```json
{
  "mcpServers": {
    "pdfmake-docs": {
      "command": "node",
      "args": ["/absolute/path/to/docs/mcp/server.mjs"]
    }
  }
}
```

Sustituye la ruta de ejemplo por la ruta de tu clon. En JSON de Windows, las rutas deben usar `/` o `\\` escapadas. Las ubicaciones de configuración varían según el cliente. El servidor escribe los mensajes del protocolo en stdout y los errores en stderr. No requiere una clave API, una cuenta de modelo ni una conexión de red después de instalar las dependencias.

## Herramientas y recursos

| Funcionalidad | Entrada | Resultado |
| --- | --- | --- |
| `search_docs` | `query`, `limit` opcional (1–10), `language` opcional | Páginas ordenadas por relevancia con sus identificadores exactos, idioma, versión, URL de origen y extractos |
| `get_doc` | `id` exacto obtenido en la búsqueda | Página Markdown completa |
| Recursos MCP | `pdfmake://docs/0.3/<id>` | La misma página Markdown versionada |

El servidor solo puede leer su corpus de documentación incluido. No puede renderizar PDF, evaluar código, leer rutas del sistema de archivos seleccionadas por quien llama ni consultar URL remotas. Vuelve a generar el corpus y a iniciar el servidor después de editar documentación.

`language` acepta `en` (predeterminado), `de`, `fr`, `es` y `pt-br`. Cada idioma admitido contiene el mismo conjunto completo de páginas de documentación. La búsqueda nunca mezcla idiomas en silencio. Se puede leer un identificador traducido como `de/learn/first-pdf` con `get_doc` o mediante el recurso `pdfmake://docs/0.3/de/learn/first-pdf`. Cada idioma también tiene sus propios archivos de descubrimiento; por ejemplo, `/docs/0.3/de/llms.txt` y `/docs/0.3/de/llms-full.txt`.

## Prompt sugerido

> Uso pdfmake 0.3.x en Node.js. Busca la documentación correspondiente antes de generar código. Usa la API singleton de Node, registra las fuentes, configura políticas de recursos síncronas, espera la salida e indica los identificadores de las páginas usadas. Crea una definición de documento nueva en cada solicitud.
