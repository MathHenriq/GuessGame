# 🎯 Guess Game

Jogo educativo de dedução para a sala de aula, no estilo Wordle/LoLdle, com **19 categorias e 420 itens**.
O aluno escolhe uma categoria, tenta adivinhar o item secreto e recebe uma tabela colorida comparando
as características de cada palpite: 🟩 correto, 🟨 parcialmente correto, 🟥 errado.

Trabalha raciocínio lógico, levantamento de hipóteses, eliminação de possibilidades, pensamento
computacional e argumentação.

**HTML, CSS e JavaScript puros. Sem instalação, sem build, sem dependências, funciona offline.**

---

## 1. Como executar

### Jeito mais simples (o que você vai usar em sala)
1. Baixe a pasta do projeto.
2. Dê dois cliques em **`index.html`**.

Só isso. O jogo abre no navegador e funciona inteiro — inclusive sem internet, porque até as fontes
estão dentro do projeto (`assets/fontes/`).

> O projeto usa scripts clássicos, e não módulos ES, justamente para poder ser aberto direto do disco.
> Se um dia migrar para `import/export`, será obrigatório usar um servidor local.

### Servindo por um servidor local (opcional)
Útil se quiser acessar de outros aparelhos da mesma rede, como os celulares da turma:

```bash
cd GuessGame
python3 -m http.server 8000
# depois acesse http://SEU-IP:8000 no celular
```

### Publicando na internet (opcional)
Como é um site estático, funciona direto no **GitHub Pages**, Netlify ou Vercel:
em *Settings → Pages*, aponte para a branch e a pasta raiz. Nada mais é necessário.

### Requisitos
Qualquer navegador atual (Chrome, Edge, Firefox, Safari), no computador, tablet ou celular.

---

## 2. Como adicionar novos temas (categorias)

Cada tema é um objeto passado para `GG.registrarTema(...)` dentro de um arquivo em
`assets/js/dados/`. Um tema declara **quais características entram na tabela de comparação** e a
lista de itens.

```js
GG.registrarTema({
  id: 'instrumentos',                 // identificador único, sem espaços
  nome: 'Instrumentos musicais',      // aparece na interface
  emoji: '🎸',
  resumo: 'Cordas, sopro e percussão de todo o mundo.',

  campos: [                           // as colunas da tabela de palpites
    { chave: 'ano',   rotulo: 'Ano de invenção', tipo: 'ano', tolerancia: 50 },
    { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
    { chave: 'tipo',   rotulo: 'Família',        tipo: 'lista' },
    { chave: 'material', rotulo: 'Material',     tipo: 'texto' },
    { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
  ],

  itens: [
    // [ nome, ...um valor por campo, na mesma ordem..., curiosidade, dica ]
    ['Violão', 1850, 'Espanha', ['Cordas'], 'Madeira', 5, 'A forma atual foi definida por Antonio de Torres.', 'Seis cordas e caixa de madeira.']
  ]
});
```

Por fim, inclua o arquivo no `index.html`, junto dos outros de dados:

```html
<script src="assets/js/dados/instrumentos.js"></script>
```

Pronto: o tema aparece sozinho na tela inicial, no modo professor e nas sugestões do "Eu gosto de".
Nada mais precisa ser alterado.

### Tipos de campo disponíveis

| tipo | 🟩 verde | 🟨 amarelo | Observações |
|---|---|---|---|
| `ano` | mesmo ano | dentro da `tolerancia` | mostra seta ↑ / ↓ indicando se o valor secreto é maior ou menor |
| `ordinal` | mesmo nível | um nível de diferença | valor de 1 a 5; use `escala`: `popularidade`, `porte`, `populacao` ou `preco` |
| `pais` | mesmo país | mesmo continente | o país precisa existir no mapa `GG.continentes` (em `nucleo/base.js`) |
| `lista` | conjunto idêntico | ao menos um item em comum | valor é um array, ex.: `['Ação', 'Aventura']` |
| `texto` | texto igual | alguma palavra em comum | usado para estúdio, autoria, posição, sabor... |

---

## 3. Como adicionar novos itens

Abra o arquivo do tema em `assets/js/dados/`, **copie a última linha da lista `itens`, troque os
valores e salve**. A ordem das colunas é sempre:

```
[ nome, ...valores dos campos declarados..., curiosidade, dica ]
```

Exemplo, acrescentando um jogo em `assets/js/dados/entretenimento.js`:

```js
['Rocket League', 2015, 'Psyonix', 'Estados Unidos', ['Esporte', 'Ação'], 4,
 'Nasceu de um jogo anterior com nome enorme e vendas fracas.',
 'É futebol jogado com carros.']
```

Regras práticas:

* **Ano** é número (`2015`), não texto. Use negativo para a.C. (`-220`) e `null` quando não existir
  (caso de acidentes geográficos em *Lugares*).
* **Popularidade e outras escalas** vão de 1 a 5 — o texto ("Muito alta") é gerado automaticamente.
* **Países** precisam estar em `GG.continentes` (`assets/js/nucleo/base.js`). Se for um país novo,
  acrescente uma linha lá: `'Peru': 'América do Sul'`.
* **Curiosidade** aparece no fim da partida; **dica** entra na sequência de dicas progressivas.
  Escreva a dica sem citar o nome do item.

As dicas de século, região, gênero e popularidade são geradas sozinhas a partir dos campos, assim
como a dica final ("Começa com a letra P e tem 9 letras"). Ou seja: cadastrar um item já entrega
o conjunto completo de dicas.

Depois de mexer na base, vale rodar a validação (opcional, requer Node.js):

```bash
node ferramentas/validar-base.js
```

Ela confere campos faltando, escalas fora do intervalo, países sem continente e simula partidas em
todas as dificuldades.

---

## 4. Como transformar em plataforma com ranking

Hoje o placar é local: fica no `localStorage` do navegador, por aparelho. A arquitetura já foi
desenhada para a virada, e **todo o acesso a dados está isolado em um único arquivo**:
`assets/js/nucleo/armazenamento.js`, que expõe `GG.perfil.obter()`, `definirNome()`,
`registrarPartida()` e `limpar()`.

Caminho sugerido, do mais simples ao mais completo:

**Etapa 1 — ranking da turma sem backend.**
Use um serviço de banco pronto (Supabase ou Firebase). Troque o corpo de `registrarPartida` por uma
chamada `fetch` que envia `{ nome, pontos, tema, dificuldade, tentativas, dicas, segundos }` e faça
`ui.atualizarRanking()` ler a lista do servidor. O restante do jogo não muda uma linha.

**Etapa 2 — identidade e turmas.**
Acrescente um campo `turma` ao lado do nome (a tela de ranking já tem o formulário de identidade) e
filtre o ranking por turma. O código do desafio gerado no modo professor já identifica cada rodada —
guarde-o junto do resultado para comparar alunos que jogaram exatamente o mesmo item secreto.

**Etapa 3 — desafio do dia.**
Sorteie um item por dia a partir de uma semente fixa (por exemplo, a data) para que todos os alunos
do país joguem o mesmo desafio, no estilo Wordle. Basta trocar `GG.sortear` por um sorteio
determinístico em `criarPartida`.

**Etapa 4 — painel do professor.**
Com as partidas no servidor, monte relatórios por turma: média de tentativas, dicas mais pedidas,
categorias com mais erro. São os dados que já viajam em `registrarPartida`.

**Etapa 5 — contas e antifraude.**
Só nesse ponto compensa autenticação e validação da pontuação no servidor (recalcular os pontos a
partir das tentativas enviadas, em vez de confiar no total).

---

## Como o jogo funciona

### Comparação
Cada palpite vira uma linha da tabela. Todos os campos do tema são comparados de uma vez, com as
regras da tabela de tipos acima. As setas ↑ ↓ aparecem em campos numéricos e ordinais nos níveis
Fácil e Médio.

### Dificuldades
| Nível | Conjunto de itens | Tentativas | Dicas | Setas | Multiplicador |
|---|---|---|---|---|---|
| 🟢 Fácil | só os mais conhecidos | 8 | 4 | sim | ×0,8 |
| 🟡 Médio | categoria inteira | 6 | 3 | sim | ×1 |
| 🔴 Difícil | categoria inteira, com sorteio evitando os óbvios e tolerância menor | 5 | 2 | não | ×1,35 |

### Pontuação
```
pontos = (100 − tentativas extras × 12 − dicas × 15 + bônus de tempo) × multiplicador
```
* acertou de primeira, sem dicas → **100 pontos**
* acertou de primeira usando 3 dicas → **55 pontos**
* errou tudo → pontos de consolação proporcionais aos campos que já tinha acertado
* o bônus de tempo (até 20 pontos) só existe com o cronômetro ligado

### Modo "Eu gosto de"
O aluno digita algo que curte e o sistema procura o termo na base inteira — nomes, gêneros, criadores,
países e curiosidades — devolvendo categorias e desafios filtrados. Assuntos muito pedidos (Marvel,
futebol, anime, K-pop, games...) têm pacotes com nome próprio em `assets/js/nucleo/sugestoes.js`.

### Modo professor
Escolha categoria, dificuldade, número de tentativas, quantidade de dicas, cronômetro e até o item
secreto a dedo. O botão **Gerar desafio** cria um código (e um link) que carrega toda a configuração:
a turma inteira joga exatamente o mesmo item secreto. Quem recebe pode abrir o link direto ou colar o
código no campo "Recebi um código de desafio".

---

## Estrutura do projeto

```
index.html                     Estrutura das telas
assets/
  css/
    fontes.css                 @font-face das fontes locais
    base.css                   Variáveis de cor/tipografia, reset, temas claro e escuro
    layout.css                 Topo, telas, grades e responsividade
    componentes.css            Botões, cartões, tabela, modal, animações
  fontes/                      Archivo e Archivo Black (licença OFL)
  js/
    nucleo/                    Regras do jogo — nenhuma interface aqui
      base.js                  Registro de temas, escalas, continentes, utilitários
      comparador.js            Compara palpite × segredo e devolve 🟩🟨🟥
      dicas.js                 Gera as dicas progressivas
      pontuacao.js             Fórmula de pontos
      partida.js               Estado da partida e dificuldades
      armazenamento.js         Perfil, histórico e ranking (localStorage)
      sugestoes.js             Modo "Eu gosto de"
      desafio.js               Codifica/decodifica desafios do professor
      efeitos.js               Sons sintetizados e confete em canvas
    dados/                     BASE DE DADOS — é aqui que você expande o jogo
      entretenimento.js        Jogos, Filmes, Séries, Animes, Livros, Personagens
      pessoas.js               Músicos, Jogadores, Cientistas, Históricos, Artistas, Atores
      mundo.js                 Países, Lugares, Animais, Comidas, Esportes
      objetos.js               Carros, Empresas
    ui/                        Interface, uma tela por arquivo
      comum.js, inicio.js, jogo.js, professor.js, ranking.js
    app.js                     Ponto de entrada
ferramentas/
  validar-base.js              Validação da base de dados (Node.js, opcional)
```

A separação é proposital: **`nucleo/` não conhece o DOM e `ui/` não conhece as regras**. Isso é o que
permite trocar o armazenamento local por uma API sem reescrever o jogo.

---

## Acessibilidade e sala de aula

* **Tema claro e escuro** — o claro foi feito pensando em projetor e sala com muita luz.
* **Som opcional**, desligável no topo, e respeito a `prefers-reduced-motion`.
* Navegação por teclado no autocompletar (setas, Enter, Esc) e foco sempre visível.
* Tabela com rolagem própria no celular: a página nunca rola para o lado.
* Nada é enviado para a internet: o placar fica no navegador do próprio aluno.

## Categorias incluídas

🎮 Jogos · 🎬 Filmes · 📺 Séries · 🧙 Animes · 📚 Livros · 🦸 Personagens fictícios · 🎵 Músicos ·
⚽ Jogadores · 🔬 Cientistas · 🏛️ Personalidades históricas · 🎨 Artistas · 🎭 Atores e atrizes ·
🌎 Países · 🗺️ Lugares · 🐾 Animais · 🍔 Comidas · 🏀 Esportes · 🚗 Carros · 🏢 Empresas

## Licença

Código sob a licença do repositório (ver `LICENSE`).
Fontes Archivo e Archivo Black sob SIL Open Font License 1.1.
