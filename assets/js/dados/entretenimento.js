/* =========================================================================
   BASE DE DADOS — ENTRETENIMENTO
   Temas: Jogos, Filmes, Séries, Animes, Livros, Personagens fictícios
   -------------------------------------------------------------------------
   COMO LER UMA LINHA:
   cada item é um array na ordem [ nome, ...campos..., curiosidade, dica ].
   A ordem dos campos é exatamente a ordem declarada em `campos`.

   COMO ADICIONAR UM ITEM: copie a última linha, troque os valores, salve.
   ========================================================================= */

(function (GG) {
  'use strict';

  /* ----------------------------------------------------------------- JOGOS */
  GG.registrarTema({
    id: 'jogos',
    nome: 'Jogos',
    emoji: '🎮',
    resumo: 'Consoles, PC e celular — dos clássicos de fliperama aos fenômenos atuais.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de lançamento', tipo: 'ano', tolerancia: 8 },
      { chave: 'criador', rotulo: 'Estúdio', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Gênero', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    // nome, ano, estúdio, país, gêneros, popularidade, curiosidade, dica
    itens: [
      ['Minecraft', 2011, 'Mojang', 'Suécia', ['Sandbox', 'Sobrevivência'], 5, 'É o jogo mais vendido da história, com mais de 300 milhões de cópias.', 'Todo o seu mundo é construído com blocos cúbicos.'],
      ['Fortnite', 2017, 'Epic Games', 'Estados Unidos', ['Battle Royale', 'Ação'], 5, 'Já recebeu shows ao vivo dentro do próprio jogo, com milhões de espectadores.', 'Cem jogadores caem de paraquedas e só um sobra no fim.'],
      ['League of Legends', 2009, 'Riot Games', 'Estados Unidos', ['MOBA', 'Estratégia'], 5, 'Seu campeonato mundial enche estádios e é transmitido para dezenas de países.', 'Cinco contra cinco, com o objetivo de derrubar a base inimiga.'],
      ['Pokémon Red e Green', 1996, 'Game Freak', 'Japão', ['RPG', 'Aventura'], 5, 'Nasceu da paixão do criador por colecionar insetos quando criança.', 'A missão é capturar criaturas e completar uma enciclopédia.'],
      ['Super Mario Bros.', 1985, 'Nintendo', 'Japão', ['Plataforma', 'Aventura'], 5, 'Ajudou a salvar a indústria dos videogames depois da crise de 1983.', 'Um encanador de bigode salva uma princesa.'],
      ['The Legend of Zelda', 1986, 'Nintendo', 'Japão', ['Aventura', 'Ação'], 5, 'Foi um dos primeiros cartuchos com bateria para salvar o progresso.', 'O herói de verde não é quem dá nome ao jogo.'],
      ['Tetris', 1984, 'Alexey Pajitnov', 'Rússia', ['Puzzle', 'Casual'], 5, 'Foi criado dentro de um centro de pesquisa soviético, sem fins comerciais.', 'Sete peças geométricas caem e você precisa completar linhas.'],
      ['Grand Theft Auto V', 2013, 'Rockstar Games', 'Estados Unidos', ['Ação', 'Mundo aberto'], 5, 'Faturou um bilhão de dólares em apenas três dias de vendas.', 'Se passa em uma cidade fictícia inspirada em Los Angeles.'],
      ['Among Us', 2018, 'InnerSloth', 'Estados Unidos', ['Dedução', 'Multijogador'], 4, 'Ficou dois anos quase esquecido antes de explodir durante a pandemia.', 'Há impostores escondidos entre os tripulantes de uma nave.'],
      ['Free Fire', 2017, 'Garena', 'Singapura', ['Battle Royale', 'Ação'], 4, 'Foi desenhado para rodar em celulares simples, o que explodiu sua popularidade no Brasil.', 'Battle royale feito para celular, com partidas curtas.'],
      ['Roblox', 2006, 'Roblox Corporation', 'Estados Unidos', ['Sandbox', 'Multijogador'], 5, 'Não é bem um jogo: é uma plataforma onde os próprios jogadores criam os jogos.', 'Aqui qualquer usuário pode publicar sua própria experiência.'],
      ['Counter-Strike', 2000, 'Valve', 'Estados Unidos', ['FPS', 'Tático'], 5, 'Começou como uma modificação feita por fãs de outro jogo.', 'Terroristas contra contraterroristas, com uma bomba no meio.'],
      ['Angry Birds', 2009, 'Rovio', 'Finlândia', ['Puzzle', 'Casual'], 4, 'Foi a tentativa de número 52 do estúdio antes de dar certo.', 'Você usa um estilingue contra porcos verdes.'],
      ['Candy Crush Saga', 2012, 'King', 'Reino Unido', ['Puzzle', 'Casual'], 4, 'Chegou a faturar mais de um milhão de dólares por dia só com vidas extras.', 'Combine três doces iguais para eliminá-los.'],
      ['Sonic the Hedgehog', 1991, 'Sega', 'Japão', ['Plataforma', 'Aventura'], 4, 'Foi criado para ser o rival direto do mascote da Nintendo.', 'O personagem principal é azul e corre muito rápido.'],
      ['Street Fighter II', 1991, 'Capcom', 'Japão', ['Luta', 'Ação'], 4, 'Popularizou os combos, descobertos por acidente pelos programadores.', 'Foi ele que transformou o fliperama em campo de batalha um contra um.'],
      ['The Sims', 2000, 'Maxis', 'Estados Unidos', ['Simulação', 'Casual'], 4, 'Os personagens falam um idioma inventado chamado simlish.', 'Você controla a vida cotidiana de pessoas virtuais.'],
      ['Valorant', 2020, 'Riot Games', 'Estados Unidos', ['FPS', 'Tático'], 4, 'Mistura tiro tático com agentes que têm poderes especiais.', 'Do mesmo estúdio de um famoso MOBA.'],
      ['Stardew Valley', 2016, 'ConcernedApe', 'Estados Unidos', ['Simulação', 'RPG'], 4, 'Foi feito quase inteiramente por uma única pessoa, ao longo de quatro anos.', 'Você herda uma fazenda e recomeça a vida no campo.'],
      ['Terraria', 2011, 'Re-Logic', 'Estados Unidos', ['Sandbox', 'Aventura'], 4, 'É frequentemente descrito como um primo bidimensional de outro jogo de blocos.', 'Explorar cavernas em duas dimensões é o coração da experiência.'],
      ['God of War', 2005, 'Santa Monica Studio', 'Estados Unidos', ['Ação', 'Aventura'], 4, 'A série trocou a mitologia grega pela nórdica em 2018.', 'O protagonista é um guerreiro de pele branca e tatuagem vermelha.'],
      ['Dark Souls', 2011, 'FromSoftware', 'Japão', ['RPG', 'Ação'], 4, 'Sua dificuldade virou adjetivo: hoje se fala em jogos souls-like.', 'Ficou famoso pela frase "você morreu".'],
      ['The Last of Us', 2013, 'Naughty Dog', 'Estados Unidos', ['Ação', 'Aventura'], 4, 'A infecção da história é inspirada em um fungo real que ataca formigas.', 'Um homem atravessa um país devastado protegendo uma adolescente.'],
      ['Clash Royale', 2016, 'Supercell', 'Finlândia', ['Estratégia', 'Multijogador'], 4, 'Mistura cartas colecionáveis com defesa de torres em tempo real.', 'Partidas de três minutos com cartas e duas torres de cada lado.']
    ]
  });

  /* ---------------------------------------------------------------- FILMES */
  GG.registrarTema({
    id: 'filmes',
    nome: 'Filmes',
    emoji: '🎬',
    resumo: 'Clássicos, animações e blockbusters que marcaram gerações.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de estreia', tipo: 'ano', tolerancia: 8 },
      { chave: 'criador', rotulo: 'Direção', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Gênero', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Titanic', 1997, 'James Cameron', 'Estados Unidos', ['Drama', 'Romance'], 5, 'O navio do filme foi construído em tamanho quase real em um tanque no México.', 'Conta uma tragédia real ocorrida em 1912.'],
      ['Vingadores: Ultimato', 2019, 'Irmãos Russo', 'Estados Unidos', ['Ação', 'Super-herói'], 5, 'Fechou uma história contada ao longo de 22 filmes anteriores.', 'Reúne quase todos os heróis de um mesmo universo de quadrinhos.'],
      ['O Rei Leão', 1994, 'Roger Allers e Rob Minkoff', 'Estados Unidos', ['Animação', 'Aventura'], 5, 'A trilha sonora foi composta por Hans Zimmer e Elton John.', 'Um filhote precisa retomar o trono do pai na savana africana.'],
      ['Harry Potter e a Pedra Filosofal', 2001, 'Chris Columbus', 'Reino Unido', ['Fantasia', 'Aventura'], 5, 'Todos os atores principais tinham que ser britânicos, por exigência da autora.', 'Um menino descobre que é bruxo aos onze anos.'],
      ['Jurassic Park', 1993, 'Steven Spielberg', 'Estados Unidos', ['Aventura', 'Ficção científica'], 5, 'O rugido do tiranossauro é uma mistura de sons de elefante, tigre e crocodilo.', 'Um parque temático com animais extintos sai do controle.'],
      ['Star Wars: Uma Nova Esperança', 1977, 'George Lucas', 'Estados Unidos', ['Ficção científica', 'Aventura'], 5, 'Quase nenhum estúdio quis produzi-lo; achavam a história confusa demais.', 'Começou uma saga espacial numa galáxia muito, muito distante.'],
      ['Toy Story', 1995, 'John Lasseter', 'Estados Unidos', ['Animação', 'Comédia'], 5, 'Foi o primeiro longa-metragem inteiramente feito em computação gráfica.', 'Os brinquedos ganham vida quando ninguém está olhando.'],
      ['Cidade de Deus', 2002, 'Fernando Meirelles', 'Brasil', ['Drama', 'Crime'], 4, 'Boa parte do elenco eram moradores de comunidades sem experiência como atores.', 'Retrata a vida em uma favela carioca ao longo de três décadas.'],
      ['Parasita', 2019, 'Bong Joon-ho', 'Coreia do Sul', ['Drama', 'Suspense'], 4, 'Foi o primeiro filme falado em outra língua a vencer o Oscar de melhor filme.', 'Uma família pobre se infiltra na casa de uma família rica.'],
      ['O Poderoso Chefão', 1972, 'Francis Ford Coppola', 'Estados Unidos', ['Drama', 'Crime'], 4, 'O gato que aparece na primeira cena era um gato de rua que entrou no estúdio.', 'Acompanha a sucessão do comando de uma família mafiosa.'],
      ['Matrix', 1999, 'Irmãs Wachowski', 'Estados Unidos', ['Ficção científica', 'Ação'], 5, 'Criou o efeito bullet time, imitado por filmes e jogos até hoje.', 'A escolha entre a pílula vermelha e a azul virou símbolo cultural.'],
      ['Frozen', 2013, 'Chris Buck e Jennifer Lee', 'Estados Unidos', ['Animação', 'Musical'], 5, 'É livremente inspirado em um conto de Hans Christian Andersen.', 'Duas irmãs, um reino congelado e uma música que grudou no mundo inteiro.'],
      ['Homem-Aranha no Aranhaverso', 2018, 'Bob Persichetti', 'Estados Unidos', ['Animação', 'Super-herói'], 4, 'Cada universo do filme tem um estilo de desenho diferente, feito de propósito.', 'Vários heróis com a mesma identidade se encontram.'],
      ['Pantera Negra', 2018, 'Ryan Coogler', 'Estados Unidos', ['Ação', 'Super-herói'], 5, 'Foi o primeiro filme de super-herói indicado ao Oscar de melhor filme.', 'Se passa em um reino africano tecnologicamente avançado.'],
      ['A Viagem de Chihiro', 2001, 'Hayao Miyazaki', 'Japão', ['Animação', 'Fantasia'], 4, 'Venceu o Oscar de melhor animação sendo totalmente desenhado à mão.', 'Uma menina trabalha em uma casa de banhos para espíritos.'],
      ['Barbie', 2023, 'Greta Gerwig', 'Estados Unidos', ['Comédia', 'Fantasia'], 5, 'A produção usou tanta tinta rosa que afetou o estoque mundial de um fornecedor.', 'Uma boneca famosa descobre o mundo real.'],
      ['Coringa', 2019, 'Todd Phillips', 'Estados Unidos', ['Drama', 'Suspense'], 4, 'O ator principal perdeu mais de 20 quilos para o papel.', 'Mostra a origem de um vilão dos quadrinhos sem nenhum super-herói em cena.'],
      ['Interestelar', 2014, 'Christopher Nolan', 'Estados Unidos', ['Ficção científica', 'Drama'], 4, 'Um físico teórico famoso ajudou a desenhar o buraco negro do filme.', 'Uma hora em um planeta equivale a sete anos na Terra.'],
      ['Divertida Mente', 2015, 'Pete Docter', 'Estados Unidos', ['Animação', 'Comédia'], 4, 'A equipe consultou psicólogos para escolher quais emoções virariam personagens.', 'As emoções de uma menina são personagens dentro da cabeça dela.'],
      ['Tropa de Elite', 2007, 'José Padilha', 'Brasil', ['Ação', 'Drama'], 4, 'Vazou em cópias piratas antes da estreia e mesmo assim lotou os cinemas.', 'Acompanha um batalhão de operações especiais no Rio de Janeiro.']
    ]
  });

  /* ---------------------------------------------------------------- SÉRIES */
  GG.registrarTema({
    id: 'series',
    nome: 'Séries',
    emoji: '📺',
    resumo: 'Da TV aberta ao streaming: histórias contadas em temporadas.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de estreia', tipo: 'ano', tolerancia: 8 },
      { chave: 'criador', rotulo: 'Criação', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Gênero', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Stranger Things', 2016, 'Irmãos Duffer', 'Estados Unidos', ['Ficção científica', 'Suspense'], 5, 'Os criadores foram recusados por mais de quinze emissoras antes do sim.', 'Um mundo paralelo assombra uma cidadinha nos anos 1980.'],
      ['Breaking Bad', 2008, 'Vince Gilligan', 'Estados Unidos', ['Drama', 'Crime'], 5, 'O protagonista foi pensado como alguém que se transforma de mocinho em vilão.', 'Um professor de química adoece e muda radicalmente de vida.'],
      ['Game of Thrones', 2011, 'David Benioff e D. B. Weiss', 'Estados Unidos', ['Fantasia', 'Drama'], 5, 'É baseada em uma série de livros que ainda não foi concluída.', 'Várias famílias disputam um trono feito de espadas.'],
      ['Friends', 1994, 'David Crane e Marta Kauffman', 'Estados Unidos', ['Comédia'], 5, 'O sofá do café tinha lugar marcado por contrato para cada personagem.', 'Seis amigos vivem em Nova York e se encontram sempre na mesma cafeteria.'],
      ['The Big Bang Theory', 2007, 'Chuck Lorre', 'Estados Unidos', ['Comédia'], 4, 'Todas as equações escritas nos quadros foram revisadas por um físico de verdade.', 'Cientistas nerds dividem apartamento com uma vizinha atriz.'],
      ['La Casa de Papel', 2017, 'Álex Pina', 'Espanha', ['Crime', 'Suspense'], 5, 'Fracassou na TV local e virou fenômeno mundial ao entrar no streaming.', 'Assaltantes de macacão vermelho usam nomes de cidades.'],
      ['Round 6', 2021, 'Hwang Dong-hyuk', 'Coreia do Sul', ['Suspense', 'Drama'], 5, 'O roteiro ficou dez anos na gaveta por ser considerado estranho demais.', 'Brincadeiras infantis viram competições mortais por dinheiro.'],
      ['Chaves', 1971, 'Roberto Bolaños', 'México', ['Comédia'], 4, 'No Brasil, é reprisada há mais de quarenta anos praticamente sem parar.', 'A maior parte da história acontece em uma única vila.'],
      ['Os Simpsons', 1989, 'Matt Groening', 'Estados Unidos', ['Animação', 'Comédia'], 5, 'É a série de animação em horário nobre mais longa da televisão.', 'Uma família amarela de cinco pessoas mora em Springfield.'],
      ['Wandinha', 2022, 'Alfred Gough e Miles Millar', 'Estados Unidos', ['Comédia', 'Fantasia'], 4, 'Uma dança da protagonista viralizou e ressuscitou uma música dos anos 1980.', 'A protagonista vem de uma família sinistra dos quadrinhos.'],
      ['Peaky Blinders', 2013, 'Steven Knight', 'Reino Unido', ['Drama', 'Crime'], 4, 'O nome vem de uma gangue real que existiu em Birmingham.', 'Gângsteres ingleses escondem lâminas na aba do boné.'],
      ['The Last of Us', 2023, 'Craig Mazin', 'Estados Unidos', ['Drama', 'Ficção científica'], 4, 'É baseada em um videogame e vários atores do jogo aparecem em outros papéis.', 'Adaptação televisiva de um jogo pós-apocalíptico.'],
      ['Doctor Who', 1963, 'Sydney Newman', 'Reino Unido', ['Ficção científica', 'Aventura'], 4, 'A troca de ator principal foi explicada dentro da própria história.', 'O protagonista viaja no tempo dentro de uma cabine telefônica azul.'],
      ['Sherlock', 2010, 'Steven Moffat', 'Reino Unido', ['Crime', 'Drama'], 4, 'Cada temporada tem apenas três episódios, quase do tamanho de filmes.', 'Traz um detetive clássico da literatura para os dias de hoje.'],
      ['Cobra Kai', 2018, 'Josh Heald', 'Estados Unidos', ['Ação', 'Comédia'], 4, 'Continua a história de um filme lançado mais de trinta anos antes.', 'Dois rivais de caratê se reencontram já adultos.'],
      ['Bob Esponja', 1999, 'Stephen Hillenburg', 'Estados Unidos', ['Animação', 'Comédia'], 5, 'O criador era biólogo marinho antes de virar animador.', 'O protagonista mora dentro de um abacaxi no fundo do mar.'],
      ['The Office', 2005, 'Greg Daniels', 'Estados Unidos', ['Comédia'], 4, 'É uma refilmagem de uma série britânica de mesmo nome.', 'Um documentário falso acompanha funcionários de uma papelaria.'],
      ['Avatar: A Lenda de Aang', 2005, 'Michael Dante DiMartino e Bryan Konietzko', 'Estados Unidos', ['Animação', 'Aventura'], 5, 'Os movimentos de luta foram baseados em estilos reais de artes marciais chinesas.', 'Quatro nações são divididas pelos elementos da natureza.'],
      ['Sintonia', 2019, 'Kondzilla', 'Brasil', ['Drama'], 3, 'Foi criada por um diretor de videoclipes de funk que cresceu na periferia paulista.', 'Música, fé e crime se cruzam na periferia de São Paulo.'],
      ['Chernobyl', 2019, 'Craig Mazin', 'Estados Unidos', ['Drama', 'História'], 4, 'Reconstruiu com fidelidade um acidente nuclear ocorrido em 1986.', 'Minissérie sobre um desastre real em uma usina soviética.']
    ]
  });

  /* ---------------------------------------------------------------- ANIMES */
  GG.registrarTema({
    id: 'animes',
    nome: 'Animes',
    emoji: '🧙',
    resumo: 'Animação japonesa: dos clássicos da TV aberta aos hits do streaming.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de estreia', tipo: 'ano', tolerancia: 6 },
      { chave: 'criador', rotulo: 'Estúdio', tipo: 'texto' },
      { chave: 'publico', rotulo: 'Público-alvo', tipo: 'texto' },
      { chave: 'tipo', rotulo: 'Gênero', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Naruto', 2002, 'Pierrot', 'Shonen', ['Ação', 'Aventura'], 5, 'A corrida com os braços para trás virou meme mundial.', 'O protagonista é um ninja órfão que sonha em liderar sua vila.'],
      ['One Piece', 1999, 'Toei Animation', 'Shonen', ['Aventura', 'Ação'], 5, 'Passou de mil episódios e continua em produção.', 'Uma tripulação de piratas procura um tesouro lendário.'],
      ['Dragon Ball Z', 1989, 'Toei Animation', 'Shonen', ['Ação', 'Artes marciais'], 5, 'Foi inspirado em uma lenda chinesa sobre um rei macaco.', 'Guerreiros de cabelo espetado ficam mais fortes gritando.'],
      ['Attack on Titan', 2013, 'Wit Studio', 'Shonen', ['Ação', 'Suspense'], 5, 'O autor desenhou o primeiro capítulo inspirado por um cliente agressivo em um cibercafé.', 'A humanidade vive cercada por muralhas gigantes.'],
      ['Demon Slayer', 2019, 'Ufotable', 'Shonen', ['Ação', 'Sobrenatural'], 5, 'Seu filme se tornou a maior bilheteria da história do Japão.', 'Um jovem espadachim quer curar a irmã transformada em demônio.'],
      ['Death Note', 2006, 'Madhouse', 'Shonen', ['Suspense', 'Sobrenatural'], 5, 'Chegou a ser proibido em escolas de alguns países por imitação.', 'Um caderno mata quem tiver o nome escrito nele.'],
      ['Pokémon', 1997, 'OLM', 'Infantil', ['Aventura', 'Fantasia'], 5, 'Um episódio de 1997 foi retirado do ar por causar convulsões em espectadores.', 'Um treinador viaja com uma criatura elétrica amarela.'],
      ['Sailor Moon', 1992, 'Toei Animation', 'Shojo', ['Fantasia', 'Ação'], 4, 'Popularizou o gênero de garotas mágicas fora do Japão.', 'Guerreiras adolescentes se transformam em nome da Lua.'],
      ['My Hero Academia', 2016, 'Bones', 'Shonen', ['Ação', 'Super-herói'], 5, 'Mistura a estética dos quadrinhos americanos com a narrativa japonesa.', 'Quase todo mundo nasce com um poder, menos o protagonista.'],
      ['Jujutsu Kaisen', 2020, 'MAPPA', 'Shonen', ['Ação', 'Sobrenatural'], 5, 'As cenas de luta são elogiadas por usarem animação quase toda desenhada à mão.', 'Feiticeiros combatem maldições nascidas de emoções negativas.'],
      ['Cavaleiros do Zodíaco', 1986, 'Toei Animation', 'Shonen', ['Ação', 'Fantasia'], 4, 'Fez tanto sucesso no Brasil que ganhou trilha sonora regravada em português.', 'Guerreiros vestem armaduras ligadas às constelações.'],
      ['Yu-Gi-Oh! Duel Monsters', 2000, 'Studio Gallop', 'Shonen', ['Aventura', 'Estratégia'], 4, 'O jogo de cartas de verdade nasceu por causa do sucesso da série.', 'Duelos são resolvidos com cartas colecionáveis.'],
      ['Fullmetal Alchemist: Brotherhood', 2009, 'Bones', 'Shonen', ['Aventura', 'Fantasia'], 4, 'É uma segunda adaptação, feita para seguir fielmente o mangá original.', 'Dois irmãos pagam caro por uma alquimia proibida.'],
      ['Chainsaw Man', 2022, 'MAPPA', 'Seinen', ['Ação', 'Sobrenatural'], 4, 'Cada episódio tem um encerramento musical diferente, com artistas distintos.', 'O protagonista se funde com um demônio motosserra.'],
      ['Spy x Family', 2022, 'Wit Studio', 'Shonen', ['Comédia', 'Ação'], 4, 'A família da história é formada por um espião, uma assassina e uma telepata.', 'Uma família falsa precisa manter as aparências.'],
      ['Neon Genesis Evangelion', 1995, 'Gainax', 'Seinen', ['Ficção científica', 'Drama'], 4, 'Seu final polêmico gerou debates que duram até hoje.', 'Adolescentes pilotam robôs gigantes contra criaturas chamadas anjos.'],
      ['Cowboy Bebop', 1998, 'Sunrise', 'Seinen', ['Ficção científica', 'Ação'], 4, 'A trilha sonora de jazz é considerada uma das melhores da animação.', 'Caçadores de recompensas viajam pelo sistema solar.'],
      ['Doraemon', 1979, 'Shin-Ei Animation', 'Infantil', ['Comédia', 'Ficção científica'], 4, 'É tão popular no Japão que virou embaixador cultural do país.', 'Um gato robô vem do futuro com bolso mágico.'],
      ['Sakura Card Captors', 1998, 'Madhouse', 'Shojo', ['Fantasia', 'Aventura'], 4, 'Cada carta mágica da história tem um design próprio, inspirado no tarô.', 'Uma menina precisa recapturar cartas mágicas que soltou sem querer.'],
      ['Hunter x Hunter', 2011, 'Madhouse', 'Shonen', ['Aventura', 'Ação'], 4, 'O mangá é famoso pelas longas pausas do autor.', 'Um garoto faz uma prova perigosa para encontrar o pai.']
    ]
  });

  /* ---------------------------------------------------------------- LIVROS */
  GG.registrarTema({
    id: 'livros',
    nome: 'Livros',
    emoji: '📚',
    resumo: 'Clássicos da literatura brasileira e mundial, além dos best-sellers juvenis.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de publicação', tipo: 'ano', tolerancia: 15 },
      { chave: 'criador', rotulo: 'Autoria', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Gênero', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Dom Casmurro', 1899, 'Machado de Assis', 'Brasil', ['Romance', 'Realismo'], 4, 'Até hoje se discute em sala de aula se a personagem Capitu traiu ou não.', 'O narrador tem olhos de ressaca em mente o livro inteiro.'],
      ['Memórias Póstumas de Brás Cubas', 1881, 'Machado de Assis', 'Brasil', ['Romance', 'Realismo'], 4, 'O narrador começa a contar a história depois de já estar morto.', 'É dedicado ao verme que roeu as carnes do defunto autor.'],
      ['O Cortiço', 1890, 'Aluísio Azevedo', 'Brasil', ['Romance', 'Naturalismo'], 3, 'A habitação coletiva do título funciona quase como um personagem vivo.', 'Retrata a vida de moradores pobres em uma vila do Rio de Janeiro.'],
      ['Iracema', 1865, 'José de Alencar', 'Brasil', ['Romance', 'Indianismo'], 3, 'O nome da protagonista é um anagrama de América.', 'Conta o encontro entre uma indígena e um colonizador português.'],
      ['Vidas Secas', 1938, 'Graciliano Ramos', 'Brasil', ['Romance', 'Regionalismo'], 3, 'A cachorra Baleia tem um dos capítulos mais comentados da literatura brasileira.', 'Uma família retirante atravessa o sertão fugindo da seca.'],
      ['Capitães da Areia', 1937, 'Jorge Amado', 'Brasil', ['Romance', 'Drama'], 3, 'O livro chegou a ser queimado em praça pública por motivos políticos.', 'Acompanha meninos de rua em Salvador.'],
      ['Harry Potter e a Pedra Filosofal', 1997, 'J. K. Rowling', 'Reino Unido', ['Fantasia', 'Aventura'], 5, 'Foi recusado por doze editoras antes de ser publicado.', 'Um menino recebe uma carta entregue por corujas.'],
      ['O Senhor dos Anéis', 1954, 'J. R. R. Tolkien', 'Reino Unido', ['Fantasia', 'Aventura'], 5, 'O autor era professor de linguística e criou idiomas completos para o livro.', 'Um anel precisa ser destruído em uma montanha de fogo.'],
      ['O Pequeno Príncipe', 1943, 'Antoine de Saint-Exupéry', 'França', ['Fábula', 'Infantil'], 5, 'É um dos livros mais traduzidos do mundo, com mais de 300 idiomas.', 'O essencial é invisível aos olhos.'],
      ['Dom Quixote', 1605, 'Miguel de Cervantes', 'Espanha', ['Romance', 'Aventura'], 4, 'É considerado por muitos o primeiro romance moderno da história.', 'O protagonista confunde moinhos de vento com gigantes.'],
      ['1984', 1949, 'George Orwell', 'Reino Unido', ['Distopia', 'Ficção científica'], 5, 'Deu ao mundo a expressão Big Brother, muito antes do programa de TV.', 'Em um regime totalitário, alguém está sempre vigiando.'],
      ['O Diário de Anne Frank', 1947, 'Anne Frank', 'Holanda', ['Biografia', 'História'], 4, 'Foi escrito por uma adolescente escondida durante a Segunda Guerra Mundial.', 'São anotações reais feitas em um esconderijo em Amsterdã.'],
      ['Cem Anos de Solidão', 1967, 'Gabriel García Márquez', 'Colômbia', ['Romance', 'Realismo mágico'], 4, 'Acompanha sete gerações de uma mesma família em uma cidade fictícia.', 'A cidade imaginária chama-se Macondo.'],
      ['Percy Jackson e o Ladrão de Raios', 2005, 'Rick Riordan', 'Estados Unidos', ['Fantasia', 'Aventura'], 4, 'Nasceu de histórias que o autor inventava para o filho, que tinha dislexia.', 'Filhos de deuses gregos estudam em um acampamento especial.'],
      ['Jogos Vorazes', 2008, 'Suzanne Collins', 'Estados Unidos', ['Distopia', 'Aventura'], 4, 'A ideia surgiu ao autor zapear entre um reality show e imagens de guerra.', 'Doze distritos enviam jovens para uma competição mortal.'],
      ['Crepúsculo', 2005, 'Stephenie Meyer', 'Estados Unidos', ['Romance', 'Fantasia'], 4, 'A autora afirma ter sonhado com a cena que deu origem ao livro.', 'Uma adolescente se apaixona por um vampiro que brilha ao sol.'],
      ['A Culpa é das Estrelas', 2012, 'John Green', 'Estados Unidos', ['Romance', 'Drama'], 4, 'O título vem de uma peça de Shakespeare.', 'Dois adolescentes se conhecem em um grupo de apoio.'],
      ['O Menino do Pijama Listrado', 2006, 'John Boyne', 'Irlanda', ['Drama', 'História'], 4, 'O autor escreveu o rascunho inteiro em dois dias e meio.', 'Uma cerca separa dois meninos durante a Segunda Guerra.'],
      ['O Alquimista', 1988, 'Paulo Coelho', 'Brasil', ['Fábula', 'Aventura'], 4, 'É o livro em português mais traduzido de todos os tempos.', 'Um pastor andaluz atravessa o deserto atrás de um tesouro.'],
      ['A Menina que Roubava Livros', 2005, 'Markus Zusak', 'Austrália', ['Drama', 'História'], 4, 'A própria Morte é quem narra a história.', 'Uma menina alemã aprende a ler durante a guerra.']
    ]
  });

  /* --------------------------------------------------- PERSONAGENS FICTÍCIOS */
  GG.registrarTema({
    id: 'personagens',
    nome: 'Personagens fictícios',
    emoji: '🦸',
    resumo: 'Heróis, vilões e mascotes que saíram de livros, telas e consoles.',
    campos: [
      { chave: 'obra', rotulo: 'Obra / franquia', tipo: 'texto' },
      { chave: 'ano', rotulo: 'Ano de criação', tipo: 'ano', tolerancia: 12 },
      { chave: 'criador', rotulo: 'Criação', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Papel e mídia', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Harry Potter', 'Harry Potter', 1997, 'J. K. Rowling', 'Reino Unido', ['Herói', 'Livro'], 5, 'A cicatriz em forma de raio é a marca mais famosa da literatura juvenil.', 'Estuda em uma escola de magia na Escócia.'],
      ['Homem-Aranha', 'Marvel', 1962, 'Stan Lee e Steve Ditko', 'Estados Unidos', ['Herói', 'Quadrinhos'], 5, 'O editor achou que ninguém gostaria de um herói baseado em aranhas.', 'Com grandes poderes vêm grandes responsabilidades.'],
      ['Batman', 'DC Comics', 1939, 'Bob Kane e Bill Finger', 'Estados Unidos', ['Herói', 'Quadrinhos'], 5, 'É um dos poucos heróis famosos sem nenhum superpoder.', 'Protege Gotham City vestido de morcego.'],
      ['Mario', 'Super Mario', 1981, 'Shigeru Miyamoto', 'Japão', ['Herói', 'Jogo'], 5, 'Ganhou bigode e boné porque os gráficos da época não permitiam detalhes finos.', 'Um encanador italiano de macacão azul.'],
      ['Pikachu', 'Pokémon', 1996, 'Game Freak', 'Japão', ['Criatura', 'Jogo'], 5, 'Virou o mascote da franquia depois de agradar mais que a escolha original.', 'Guarda eletricidade nas bochechas vermelhas.'],
      ['Darth Vader', 'Star Wars', 1977, 'George Lucas', 'Estados Unidos', ['Vilão', 'Cinema'], 5, 'Sua respiração foi criada com um regulador de mergulho.', 'Veste preto e revela um parentesco chocante.'],
      ['Coringa', 'DC Comics', 1940, 'Bill Finger, Bob Kane e Jerry Robinson', 'Estados Unidos', ['Vilão', 'Quadrinhos'], 5, 'Ia ser morto já na segunda aparição, mas o editor impediu.', 'Cabelo verde, pele branca e um sorriso permanente.'],
      ['Mickey Mouse', 'Disney', 1928, 'Walt Disney e Ub Iwerks', 'Estados Unidos', ['Herói', 'Animação'], 5, 'Estreou em um curta com som sincronizado, novidade absoluta na época.', 'Um rato de calção vermelho e luvas brancas.'],
      ['Goku', 'Dragon Ball', 1984, 'Akira Toriyama', 'Japão', ['Herói', 'Anime'], 5, 'É inspirado no rei macaco de uma lenda chinesa clássica.', 'Nasceu em outro planeta e adora treinar e comer.'],
      ['Naruto Uzumaki', 'Naruto', 1999, 'Masashi Kishimoto', 'Japão', ['Herói', 'Anime'], 5, 'Tem marcas no rosto que lembram bigodes de raposa.', 'Carrega uma criatura de nove caudas dentro de si.'],
      ['Sherlock Holmes', 'Sherlock Holmes', 1887, 'Arthur Conan Doyle', 'Reino Unido', ['Detetive', 'Livro'], 4, 'Recebia cartas de leitores que acreditavam que ele existia de verdade.', 'Mora na Baker Street e resolve casos por dedução.'],
      ['Frodo Bolseiro', 'O Senhor dos Anéis', 1954, 'J. R. R. Tolkien', 'Reino Unido', ['Herói', 'Livro'], 4, 'Pertence a um povo pequeno que anda descalço e adora comer.', 'Recebe a missão de levar um anel até um vulcão.'],
      ['Homem de Ferro', 'Marvel', 1963, 'Stan Lee e Larry Lieber', 'Estados Unidos', ['Herói', 'Quadrinhos'], 5, 'Foi criado como um teste: um herói empresário e milionário em plena Guerra Fria.', 'Sua força vem de uma armadura tecnológica.'],
      ['Mulher-Maravilha', 'DC Comics', 1941, 'William Moulton Marston', 'Estados Unidos', ['Herói', 'Quadrinhos'], 4, 'Seu criador também participou da invenção do detector de mentiras.', 'Vem de uma ilha de guerreiras e usa um laço da verdade.'],
      ['Sonic', 'Sonic the Hedgehog', 1991, 'Sega', 'Japão', ['Herói', 'Jogo'], 4, 'A cor azul foi escolhida para combinar com a logomarca da empresa.', 'Um ouriço azul que corre em looping.'],
      ['Bob Esponja', 'Bob Esponja', 1999, 'Stephen Hillenburg', 'Estados Unidos', ['Herói', 'Animação'], 5, 'Trabalha fritando hambúrgueres em um restaurante do fundo do mar.', 'Mora dentro de um abacaxi.'],
      ['Thanos', 'Marvel', 1973, 'Jim Starlin', 'Estados Unidos', ['Vilão', 'Quadrinhos'], 4, 'Foi inspirado em conceitos de mitologia sobre a morte.', 'Colecionou seis joias em uma manopla dourada.'],
      ['Mônica', 'Turma da Mônica', 1963, 'Mauricio de Sousa', 'Brasil', ['Herói', 'Quadrinhos'], 4, 'Foi baseada em uma filha real do criador.', 'Tem um coelho azul de pelúcia e muita força.'],
      ['Link', 'The Legend of Zelda', 1986, 'Shigeru Miyamoto', 'Japão', ['Herói', 'Jogo'], 4, 'É canhoto na maioria dos jogos da série.', 'Veste verde e carrega a espada mestra.'],
      ['Elsa', 'Frozen', 2013, 'Disney', 'Estados Unidos', ['Herói', 'Animação'], 4, 'Era para ser a vilã da história, mas o roteiro mudou por causa de uma música.', 'Congela tudo o que toca e cantou sobre deixar isso para lá.']
    ]
  });
})(window.GG);
