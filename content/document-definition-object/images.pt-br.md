+++
title = "Imagens"
description = "Incorpore imagens PNG e JPEG usando URLs de dados, recursos nomeados, arquivos ou URLs externas aprovadas."
weight = 2100
alwaysopen = true
sourceDigest = "e0419b93231e1257dc4fafa17f5b9f74c214b95807240b77511d32bfe7c0da6d"
+++

## Reutilize dados PNG ou JPEG incorporados

Um nó de imagem é `{ image: 'key' }`, em que a chave é resolvida pelo dicionário `images` do documento. Reutilize uma chave quando a mesma imagem aparecer mais de uma vez. Há suporte a PNG e JPEG; use um [nó SVG](/docs/0.3/pt-br/document-definition-object/svgs/) para conteúdo SVG.

{{< example id="images" >}}

## Escolha o comportamento de dimensionamento

| Campos no nó de imagem | Resultado |
| --- | --- |
| Sem `width`, `height` ou `fit` | Usa as dimensões naturais da imagem |
| `width: 150` | Redimensiona proporcionalmente para essa largura |
| `height: 100` | Redimensiona proporcionalmente para essa altura; disponível desde 0.3.2 |
| `width: 150, height: 100` | Força essas dimensões, o que pode esticar a imagem |
| `fit: [150, 100]` | Ajusta dentro de um retângulo preservando a proporção |
| `cover: { width: 150, height: 100, align: 'right', valign: 'bottom' }` | Preenche um retângulo com recorte e alinhamento |

As dimensões de exibição não reduzem os dados da imagem original. Redimensione imagens de origem grandes antes de incorporá-las quando o tamanho da saída e o uso de memória forem importantes.

## Selecione uma origem para seu runtime

| Origem | Configuração |
| --- | --- |
| URL de dados | Coloque uma URL de dados completa em base64 PNG/JPEG em `images` ou diretamente em um nó |
| Arquivo local | Somente Node.js, ou arquivo já presente em um VFS do navegador |
| URL HTTP(S) | Use uma entrada nomeada `images` e permita-a pela política de recursos |
| URL com cabeçalhos | Use `{ url, headers }` na entrada nomeada `images` |

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

Este trecho descreve formatos de origem e não é um exemplo de download executável e autossuficiente. Forneça um arquivo existente pertencente à aplicação e uma URL real aprovada. No navegador, o nome do arquivo local precisa existir no VFS; URLs do navegador também precisam de suporte a CORS. Não coloque credenciais privadas em definições do lado do cliente. O exemplo incorporado acima é autossuficiente e não precisa de recursos de rede.

## Diagnostique imagens ausentes

Um valor de imagem vazio ou inválido causa um erro. Verifique a chave do dicionário, o prefixo completo e os bytes da URL de dados, a existência do arquivo, a resposta da URL e a política de acesso. Configurar `setUrlAccessPolicy` não ignora o CORS. Uma política de arquivo local precisa permitir o caminho real resolvido. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/) e [solução de problemas](/docs/0.3/pt-br/guides/troubleshooting/).
