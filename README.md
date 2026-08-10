# 🎯 Guess Game

Jogo educativo de dedução para a sala de aula, no estilo LoLdle/Wordle, com **50 categorias e 4.178 itens**
— 37 categorias abrangentes (Elementos químicos, Corpo humano, Profissões, Objetos do dia a dia, Animais…)
e 13 universos temáticos (League of Legends, Pokémon, Naruto, Marvel, Disney, Star Wars…).
O aluno escolhe uma categoria, tenta adivinhar o item secreto e recebe um tabuleiro de peças coloridas
comparando as características de cada palpite: 🟩 correto, 🟨 parcialmente correto, 🟥 errado.
Ao acertar, o jogo mostra uma foto do item.

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

Um tema pode ser **abrangente** (`grupo: 'geral'`, o padrão) ou um **universo temático**
(`grupo: 'universo'`), que aparece na faixa "Entre em um universo" da tela inicial.


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

### A ilustração do cartão

Cada categoria tem um desenho próprio na tela inicial, no lugar do emoji. Os desenhos são
vetores guardados dentro do próprio `index.html`, logo depois de `<body>`, num bloco
`<svg id="artes-categorias">` — ficam ali (e não em arquivos separados) para o jogo continuar
funcionando ao abrir o `index.html` com dois cliques, sem servidor e sem internet.

Para ilustrar uma categoria nova:

1. no `index.html`, copie um `<symbol>` parecido e troque o `id` para `arte-SEUID`, usando o
   mesmo `id` do tema. Desenhe dentro da área `0 0 64 64` e use `fill="currentColor"`: a cor
   vem de fora, então o desenho combina sozinho com o tema claro e o escuro;
2. em `assets/js/ui/ilustracoes.js`, escolha a cor da categoria na tabela `ui.coresDeTema`.

Se faltar o desenho ou a cor, o cartão volta a mostrar o emoji do tema — nada quebra, e a
categoria continua jogável enquanto o desenho não existe.

### Tipos de campo disponíveis

| tipo | 🟩 verde | 🟨 amarelo | Observações |
|---|---|---|---|
| `ano` | mesmo ano | dentro da `tolerancia` | mostra seta ↑ / ↓ indicando se o valor secreto é maior ou menor |
| `ordinal` | mesmo nível | um nível de diferença | valor de 1 a 5; use `escala`: `popularidade`, `porte`, `populacao` ou `preco` |
| `pais` | mesmo país | mesmo continente | o país precisa existir no mapa `GG.continentes` (em `nucleo/base.js`) |
| `lista` | conjunto idêntico | ao menos um item em comum | valor é um array, ex.: `['Ação', 'Aventura']` |
| `texto` | texto igual | alguma palavra em comum | usado para estúdio, autoria, posição, sabor... |
| `numero` | mesmo número | dentro da `tolerancia` | igual ao `ano`, para grandezas que não são data (número atômico, lados de um polígono) |

---

## 3. Como adicionar novos itens

Os arquivos `assets/js/dados/expansao-*.js` existem justamente para isso: eles chamam
`GG.adicionarItens('temaId', [ ... ])` e acrescentam itens a um tema já registrado, sem repetir a
declaração dos campos. Você pode editar um deles ou criar o seu (lembrando de incluir o `<script>`
no `index.html`).

**Copie a última linha da lista, troque os valores e salve.** A ordem das colunas é sempre:

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
* **Curiosidade e dica são opcionais** — pode terminar a linha na popularidade. Sem curiosidade, o
  jogo mostra o resumo da Wikipédia ao revelar a resposta; sem dica autoral, ficam as automáticas.
  Quando escrever uma dica, não cite o nome do item.

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

### Ritmo
As peças viram uma de cada vez, da esquerda para a direita, e o formulário fica travado enquanto isso
acontece. É proposital: o aluno lê o resultado antes de poder chutar de novo, em vez de metralhar
palpites. Depois da última peça há uma pausa antes do resultado, e o próprio resultado aparece em
etapas — foto, resposta, curiosidade, pontos. Para mexer nesse ritmo, altere as três constantes no
topo de `assets/js/ui/jogo.js`:

```js
var ATRASO_ENTRE_PECAS = 300;   // intervalo entre uma peça e a próxima
var DURACAO_DA_PECA = 620;      // duração da virada (igual à do CSS)
var PAUSA_ANTES_DO_FIM = 1100;  // respiro entre a última peça e o resultado
```

### Dicas conquistadas
Dica não é botão de emergência. Cada uma só destrava depois de um número de palpites
(2 por padrão): a primeira no 2º palpite, a segunda no 4º, e assim por diante. Enquanto está
travada, o jogo mostra um cartão cinza dizendo quantos palpites faltam. O professor pode mudar essa
exigência no campo **Palpites necessários por dica**.

### Dificuldades
**O jogador sempre pode chutar qualquer item da categoria** — como no LoLdle, onde todo campeão é um
palpite válido. A dificuldade muda apenas de onde sai a RESPOSTA:

| Nível | A resposta sai de | Tentativas | Dicas | Setas | Multiplicador |
|---|---|---|---|---|---|
| 🟢 Fácil | 25 itens mais conhecidos | 8 | 4 | sim | ×0,8 |
| 🟡 Médio | 60 itens mais conhecidos | 7 | 3 | sim | ×1 |
| 🔴 Difícil | qualquer item da categoria | 6 | 2 | não | ×1,5 |

O ranking de "mais conhecidos" usa o campo de popularidade quando ele existe. Onde não existe
(animais, países, carros, lugares…), vale a ordem de cadastro — e `assets/js/dados/destaques.js`
promove na mão os itens que qualquer turma cita primeiro (cachorro, arroz, Flamengo, Pikachu…).
Se algum óbvio nunca cair como resposta, é lá que se acrescenta o nome.

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

### Foto do item secreto
Ao revelar a resposta, o jogo busca automaticamente uma imagem e um resumo na **Wikipédia**
(API pública, com CORS liberado, sem chave, imagens de licença livre) e mostra um botão
**Ver no Google Imagens** para quem quiser ver mais.

Não é a API do Google Imagens porque ela não existe de forma pública e gratuita: a Custom Search
exige chave, cadastro de faturamento e tem cota diária baixa — e uma chave dessas não pode ficar
dentro de um site estático, já que qualquer aluno leria o código-fonte. Raspar a página de resultados
do Google também é bloqueado por CORS no navegador.

Sem internet nada quebra: aparece o desenho da categoria no lugar da foto. As imagens já buscadas
ficam em cache no navegador. Toda essa lógica está em `assets/js/nucleo/imagens.js`.

### Modo professor
Escolha categoria, dificuldade, número de tentativas, quantidade de dicas, palpites necessários por
dica, cronômetro e até o item secreto a dedo. O botão **Gerar desafio** cria um código (e um link) que carrega toda a configuração:
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
      partida.js               Estado da partida, dificuldades e regra das dicas
      armazenamento.js         Perfil, histórico e ranking (localStorage)
      sugestoes.js             Modo "Eu gosto de"
      desafio.js               Codifica/decodifica desafios do professor
      efeitos.js               Sons sintetizados e confete em canvas
      imagens.js               Foto e resumo do item secreto (Wikipédia)
    dados/                     BASE DE DADOS — é aqui que você expande o jogo
      entretenimento.js        Jogos, Filmes, Séries, Animes, Livros, Personagens
      pessoas.js               Músicos, Jogadores, Cientistas, Históricos, Artistas, Atores
      mundo.js                 Países, Lugares, Animais, Comidas, Esportes
      objetos.js               Carros, Empresas
      expansao-telas.js        +Jogos, +Filmes, +Séries
      expansao-ficcao.js       +Animes, +Livros, +Personagens
      expansao-pessoas.js      +Músicos, +Jogadores, +Cientistas, +Históricos, +Artistas, +Atores
      expansao-mundo.js        +Países, +Lugares, +Animais, +Comidas, +Esportes, +Carros, +Empresas
      expansao-basicos.js      O óbvio do dia a dia: arroz, feijão, cachorro, gato, pão…
      especificos-games.js     League of Legends, Pokémon, Minecraft
      especificos-animes.js    Naruto, One Piece, Dragon Ball
      especificos-cultura.js   Harry Potter, Marvel, Futebol brasileiro
      expansao-pokemon.js      Completa a 1ª geração e os pedidos das demais
      tema-ciencias.js         Elementos químicos, Corpo humano, Espaço, Dinossauros
      tema-natureza.js         Plantas, Fenômenos naturais, Biomas, Formas geométricas
      tema-sociedade.js        Estados do Brasil, Bandeiras, Línguas, Profissões
      tema-cotidiano.js        Objetos, Meios de transporte, Roupas, Invenções
      tema-cultura.js          Mitologia, Obras de arte
      especificos-universos.js DC Comics, Star Wars, Senhor dos Anéis, Disney
      destaques.js             Quem entra nos sorteios de fácil e médio (carregar por último)
    ui/                        Interface, uma tela por arquivo
      comum.js, inicio.js, jogo.js, professor.js, ranking.js
      ilustracoes.js           Desenho e cor de cada categoria
    app.js                     Ponto de entrada
ferramentas/
  validar-base.js              Validação da base de dados (Node.js, opcional)
  importar-pokeapi.js          Traz a Pokédex completa da PokéAPI (Node.js, opcional)
```

A separação é proposital: **`nucleo/` não conhece o DOM e `ui/` não conhece as regras**. Isso é o que
permite trocar o armazenamento local por uma API sem reescrever o jogo.

---

## Importar bases prontas (e por que quase nunca compensa)

`ferramentas/importar-pokeapi.js` traz a Pokédex inteira da PokéAPI e gera um arquivo `.js`
commitável:

```bash
node ferramentas/importar-pokeapi.js 1025    # a Pokédex completa
node ferramentas/validar-base.js             # confere o resultado
```

A importação acontece **na sua máquina, uma vez** — nunca durante a partida. O jogo continua
estático e offline; se dependesse de API em tempo real, uma queda do serviço viraria aula perdida.

Antes de replicar isso para outras categorias, saiba o que a importação **não** resolve:

1. **Escolher os atributos.** A PokéAPI devolve dezenas de campos por Pokémon; o jogo bom nasce de
   escolher cinco. Isso é design, não importação.
2. **Normalizar.** Altura em decímetros precisa virar porte de 1 a 5; nome em inglês precisa virar
   nome em português.
3. **Saber quem é famoso.** Nenhuma API tem campo de popularidade — e é justamente esse ranking que
   decide o que é sorteado no Fácil e no Médio. Por isso o `destaques.js` continua sendo manual.

Some-se a isso que os IDs dos itens são posicionais (`pokemon-42`) e viajam dentro do código de
desafio do professor: reimportar uma base em ordem diferente invalida links já compartilhados.
Por isso só o Pokémon tem importador — foi o caso em que a lista completa era realmente esperada
pelos alunos.

## Acessibilidade e sala de aula

* **Tema claro e escuro** — o claro foi feito pensando em projetor e sala com muita luz.
* **Som opcional**, desligável no topo, e respeito a `prefers-reduced-motion`.
* Navegação por teclado no autocompletar (setas, Enter, Esc) e foco sempre visível.
* Tabela com rolagem própria no celular: a página nunca rola para o lado.
* Nada é enviado para a internet: o placar fica no navegador do próprio aluno.

## Categorias incluídas

**Abrangentes (37)**

🍔 Comidas 175 · 🐾 Animais 169 · 🎮 Jogos 144 · 🎵 Músicos 136 · 🏢 Empresas 130 · 🎬 Filmes 123 ·
🦸 Personagens 119 · 🌎 Países 118 · ⚽ Jogadores 115 · 🗺️ Lugares 105 · 🏛️ Personalidades históricas 103 ·
🪑 Objetos do dia a dia 101 · 📚 Livros 97 · 🎭 Atores 94 · 🔬 Cientistas 92 · 📺 Séries 91 · 🏀 Esportes 90 ·
🧙 Animes 90 · 🚗 Carros 84 · 🏺 Mitologia 77 · 👷 Profissões 72 · ⚗️ Elementos químicos 70 · 🎨 Artistas 70 ·
🫀 Corpo humano 60 · 🌱 Plantas 60 · 🚩 Bandeiras 58 · 💡 Invenções 58 · 🗣️ Línguas 56 · 🖼️ Obras de arte 50 ·
👕 Roupas 48 · 🚲 Meios de transporte 48 · 🦕 Dinossauros 46 · 🪐 Espaço 45 · 🌋 Fenômenos naturais 42 ·
📐 Formas geométricas 41 · 🌳 Biomas 28 · 🏞️ Estados do Brasil 27

**Universos temáticos (13)**

⚡ Pokémon 245 · ⚔️ League of Legends 114 · ⛏️ Minecraft 91 · 🕷️ Marvel 78 · 🏰 Disney 73 ·
🪄 Harry Potter 66 · 🍥 Naruto 61 · 🦇 DC Comics 58 · 🐉 Dragon Ball 57 · 🇧🇷 Futebol brasileiro 56 ·
🌌 Star Wars 52 · 🏴‍☠️ One Piece 50 · 💍 O Senhor dos Anéis 45

**Total: 4.178 itens.**

## Licença

Código sob a licença do repositório (ver `LICENSE`).
Fontes Archivo e Archivo Black sob SIL Open Font License 1.1.
