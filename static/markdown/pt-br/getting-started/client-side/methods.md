# Métodos de saída no navegador

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/getting-started/client-side/methods/

## Crie um documento

Depois de [carregar o mecanismo e as fontes](/docs/0.3/pt-br/getting-started/client-side/):

**JavaScript**

```js
const output = pdfMake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
const output = pdfMake.createPdf(docDefinition, options);
```

O segundo argumento, opcional, contém as [opções de renderização](/docs/0.3/pt-br/options/). `createPdf` retorna imediatamente um wrapper de saída. Os métodos de saída retornam Promises; trate as rejeições.

## Escolha um formato de saída

| Método | Valor resolvido | Comportamento |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Inicia um download; o nome padrão é `file.pdf` |
| `open(window?)` | `undefined` | Navega uma janela nova ou fornecida até o PDF gerado |
| `print(window?)` | `undefined` | Abre um PDF com uma ação de impressão; o comportamento varia conforme o visualizador |
| `getBlob()` | `Blob` | Dados binários com tipo MIME `application/pdf` |
| `getBuffer()` | Bytes compatíveis com Buffer | Bytes brutos do PDF |
| `getBase64()` | `string` | PDF codificado em base64 |
| `getDataUrl()` | `string` | URL de dados em base64 |
| `getStream()` | Stream do PDFKit | Saída de baixo nível; em geral, prefira Blob ou bytes |

**JavaScript**

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

O sucesso da Promise de download não confirma que o usuário salvou o arquivo. A impressão depende do navegador e do visualizador de PDF; não conte com impressão silenciosa.

## Abra após trabalho assíncrono

Abra a janela diretamente dentro do manipulador de clique do usuário, antes de aguardar os dados. Caso contrário, os bloqueadores de pop-ups podem rejeitá-la.

**JavaScript**

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

**TypeScript**

```ts
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Chame `openReport` no manipulador de clique da aplicação e trate a Promise rejeitada. Para imprimir, substitua `.open(win)` por `.print(win)`. Passar `window` navega a aba atual. Defina o [título nos metadados](/docs/0.3/pt-br/document-definition-object/document-medatadata/) do documento para identificá-lo; os nomes de arquivo e títulos exibidos dependem do navegador.

## Gerencie URLs de Blob

**JavaScript**

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

**TypeScript**

```ts
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Mantenha a URL ativa enquanto o visualizador a estiver usando. Chame `URL.revokeObjectURL(url)` durante a limpeza. Use um novo wrapper de saída para cada renderização. Evite misturar o consumo manual de streams com os métodos de buffer ou Blob na mesma saída.

## Política de acesso a URLs

Desde a versão **0.3.6**, `setUrlAccessPolicy(callback)` aceita uma função síncrona que retorna um booleano. Ela não é um sandbox de rede completo, e redirecionamentos no navegador podem ocorrer antes da verificação da URL final. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/).
