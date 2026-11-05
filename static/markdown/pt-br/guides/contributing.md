# Contribuição e arquitetura do código-fonte

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/guides/contributing/

## Mapa do código-fonte

A biblioteca e este site têm repositórios separados:

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake): motor, bundles, testes e exemplos.
- [pdfmake/docs](https://github.com/pdfmake/docs): este site de desenvolvimento versionado e as ferramentas de documentação.

A entrada Node da biblioteca é `src/index.js`; a configuração comum fica em `src/base.js`. A integração com o navegador fica em `src/browser-extensions/`. `Printer` prepara os recursos e cria a saída do PDFKit. `DocPreprocessor` normaliza os nós, `DocMeasure` e `TextInlines` os medem, `LayoutBuilder` e `TableProcessor` os distribuem pelas páginas, e `Renderer` grava as instruções de desenho do PDFKit.

## Valide mudanças no motor

```sh
npm ci
npm test
npm run build:examples
npm run test:package
```

`npm test` compila artefatos gerados para Node e navegador e, em seguida, executa Mocha e ESLint. Os testes unitários importam o conteúdo compilado em `js/`; recompile depois de editar `src/`. O novo teste de integridade do pacote instala o tarball real em um consumidor temporário com dependências de produção e exercita a saída do Node e os dois bundles de navegador. Ele não substitui testes em navegadores reais.

Ao otimizar, preserve texto, métricas de fontes, herança de estilos e paginação. Acrescente uma regressão de caso extremo e, quando possível, uma comparação com o comportamento anterior. Mantenha benchmarks de desempenho separados dos critérios de correção.

## Valide mudanças na documentação

Use Node >=24.11 e Hugo **0.168.0**. Neste repositório, execute:

```sh
npm ci
npm run docs:generate
npm test
npm run build
npm run dev
```

Abra o endereço exibido pelo Hugo. A geração produz o índice de busca do site, as exportações Markdown e o corpus MCP a partir de `content/`. Os testes verificam metadados, exemplos e o comportamento do MCP. O build verifica links internos gerados e destinos de fragmentos. Faça commit dos resultados regenerados junto com as edições-fonte para que os clientes possam usar o corpus sem instalar Hugo.

## Releases

A biblioteca mantém o gatilho de GitHub Release upstream. O workflow proposto verifica se tag e versão correspondem, compila, testa, gera exemplos, testa um consumidor do pacote e publica o mesmo tarball com proveniência. Executar testes localmente não publica nada no registro.

O workflow da documentação compila e envia um artefato para revisão em pushes e pull requests; ele não sobrescreve o site de produção versionado. A organização de publicação multiversão existente para esse site deve ser coordenada com os mantenedores antes de alterar o deployment.
