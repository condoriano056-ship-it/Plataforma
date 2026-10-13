# Coordenograma de Proteção

Abra `index.html` no navegador (duplo clique). Não precisa de servidor nem de instalação.
Depois de editar qualquer arquivo, salve e aperte F5 no navegador. O projeto em andamento fica salvo no próprio navegador.

## Estrutura

| Arquivo | O que tem |
|---|---|
| `index.html` | Estrutura da página e ordem de carregamento dos scripts |
| `css/style.css` | Visual e cores (cores e fonte nas variáveis do início: fundo branco gelo, azul marinho, Arial) |
| `js/util.js` | Funções auxiliares e formatação de números |
| `js/curves.js` | **Fórmulas das curvas** e os modelos (51, 50 do cliente; relé, disjuntor, transformador, cabo, motor para a fase da concessionária) |
| `js/funcoes.js` | **Catálogo das funções** (51, 50, 51N, 50N, 51G, 67, 59, 27, 47, 59N, 81O/U, 46, 32, 27-0) e seus campos |
| `js/protecao.js` | Painel **Proteção cliente**: menu de funções e quadros de preenchimento |
| `js/state.js` | Projeto atual, exemplo, salvamento local e desfazer/refazer |
| `js/chart.js` | Gráfico log-log, zoom, arrastar, cursor |
| `js/home.js` | **Página inicial**: dados do cliente, empresa contratada, concessionária (máscaras e validação de CPF/CNPJ, e-mail e telefone) |
| `js/ui.js` | Painel lateral, botões, exportação, atalhos |
| `js/app.js` | Inicialização e navegação entre abas |

## Onde mexer para ...

- **Trocar uma fórmula de curva ou incluir uma nova curva inversa:** `CURVES` em `js/curves.js` (t = dial·(A/(M^p−1)+B)).
- **Mudar os campos das funções 50/51:** `js/protecao.js` (tela) e `ST51_OFF`/`clienteExample` em `js/state.js` (dados).
- **Mudar cores, tamanhos e layout:** `css/style.css`.

- **Incluir outra concessionária:** lista `CONCESSIONARIAS` em `js/home.js`.
- **Incluir campos no cadastro:** lista `INFO_FIELDS` em `js/home.js` e o modelo `PARTY0` em `js/state.js`.
- **Criar uma nova aba:** instruções no topo de `js/app.js`.

## Atalhos

Roda do mouse: zoom · arrastar: mover · duplo clique: restaurar eixos · Ctrl+Z / Ctrl+Y: desfazer / refazer.
