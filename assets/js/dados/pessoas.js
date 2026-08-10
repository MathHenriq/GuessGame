/* =========================================================================
   BASE DE DADOS — PESSOAS
   Temas: Músicos, Jogadores, Cientistas, Personalidades históricas,
          Artistas, Atores e atrizes
   ========================================================================= */

(function (GG) {
  'use strict';

  // Países que só aparecem neste arquivo entram no mapa de continentes.
  GG.continentes['Barbados'] = 'América do Norte';

  /* -------------------------------------------------------------- MÚSICOS */
  GG.registrarTema({
    id: 'musicos',
    contexto: 'música',
    nome: 'Músicos',
    emoji: '🎵',
    resumo: 'Bandas e artistas solo que mudaram a trilha sonora do mundo.',
    campos: [
      { chave: 'ano', rotulo: 'Início da carreira', tipo: 'ano', tolerancia: 10 },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Estilo musical', tipo: 'lista' },
      { chave: 'formacao', rotulo: 'Formação', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['The Beatles', 1960, 'Reino Unido', ['Rock', 'Pop'], 'Banda', 5, 'Vieram de Liverpool e mudaram para sempre a forma de gravar discos.', 'Eram quatro rapazes que atravessaram uma faixa de pedestres famosa.'],
      ['Michael Jackson', 1971, 'Estados Unidos', ['Pop', 'Soul'], 'Solo', 5, 'Thriller é o álbum mais vendido de todos os tempos.', 'Ficou conhecido por um passo de dança que parece deslizar para trás.'],
      ['Beyoncé', 2003, 'Estados Unidos', ['Pop', 'R&B'], 'Solo', 5, 'Antes da carreira solo, liderava um trio de enorme sucesso.', 'É chamada de Rainha B pelos fãs.'],
      ['Anitta', 2013, 'Brasil', ['Pop', 'Funk'], 'Solo', 5, 'Foi a primeira artista brasileira a liderar o ranking global de uma plataforma de streaming.', 'Saiu de Honório Gurgel para os palcos internacionais.'],
      ['Roberto Carlos', 1959, 'Brasil', ['MPB', 'Romântico'], 'Solo', 4, 'Tem um especial de fim de ano na TV há mais de cinquenta anos.', 'É chamado de Rei pelos fãs e canta sobre um caminhão azul.'],
      ['Legião Urbana', 1982, 'Brasil', ['Rock'], 'Banda', 4, 'Nasceu em Brasília, no meio do movimento punk da capital.', 'Suas letras são estudadas em aulas de literatura.'],
      ['BTS', 2013, 'Coreia do Sul', ['K-pop', 'Pop'], 'Grupo', 5, 'Discursaram na sede da ONU sobre juventude e saúde mental.', 'Seus fãs se chamam Army.'],
      ['Taylor Swift', 2006, 'Estados Unidos', ['Pop', 'Country'], 'Solo', 5, 'Regravou os próprios álbuns antigos para recuperar os direitos sobre eles.', 'Começou no country antes de virar fenômeno pop.'],
      ['Queen', 1970, 'Reino Unido', ['Rock'], 'Banda', 5, 'Bohemian Rhapsody quase não foi lançada por ser longa demais para o rádio.', 'Seu vocalista tinha uma extensão vocal impressionante.'],
      ['Elvis Presley', 1954, 'Estados Unidos', ['Rock', 'Country'], 'Solo', 5, 'Sua mansão é uma das casas mais visitadas dos Estados Unidos.', 'É chamado de Rei do Rock.'],
      ['Bob Marley', 1962, 'Jamaica', ['Reggae'], 'Solo', 5, 'Ajudou a levar a cultura jamaicana para o mundo inteiro.', 'É o rosto mais conhecido do reggae.'],
      ['Madonna', 1982, 'Estados Unidos', ['Pop', 'Dance'], 'Solo', 5, 'É conhecida por reinventar completamente o visual a cada disco.', 'É chamada de Rainha do Pop.'],
      ['Ludmilla', 2012, 'Brasil', ['Funk', 'Pop'], 'Solo', 4, 'Começou publicando vídeos caseiros na internet ainda adolescente.', 'Ficou conhecida como MC antes de adotar o nome de batismo.'],
      ['Caetano Veloso', 1965, 'Brasil', ['MPB', 'Tropicália'], 'Solo', 4, 'Foi exilado durante a ditadura militar por causa de sua música.', 'É um dos criadores de um movimento chamado Tropicália.'],
      ['Ivete Sangalo', 1993, 'Brasil', ['Axé', 'Pop'], 'Solo', 4, 'Lotou o Maracanã em um show histórico em 2006.', 'Comanda trios elétricos no carnaval baiano.'],
      ["Racionais MC's", 1988, 'Brasil', ['Rap', 'Hip-hop'], 'Grupo', 4, 'Um de seus álbuns entrou na lista de leitura obrigatória de vestibulares.', 'Suas letras retratam a periferia de São Paulo.'],
      ['Adele', 2008, 'Reino Unido', ['Pop', 'Soul'], 'Solo', 5, 'Costuma dar nomes de idades aos seus álbuns.', 'Ficou famosa por baladas sobre términos de relacionamento.'],
      ['Coldplay', 1996, 'Reino Unido', ['Rock', 'Pop'], 'Banda', 5, 'Distribui pulseiras luminosas para transformar a plateia em um painel de luzes.', 'Formada por estudantes que se conheceram na faculdade em Londres.'],
      ['Eminem', 1996, 'Estados Unidos', ['Rap', 'Hip-hop'], 'Solo', 5, 'É famoso por rimas extremamente rápidas e cheias de trocadilhos.', 'Sua vida virou um filme com uma música premiada com o Oscar.'],
      ['Rihanna', 2005, 'Barbados', ['Pop', 'R&B'], 'Solo', 5, 'Hoje é tão conhecida por sua marca de cosméticos quanto pela música.', 'Nasceu em uma pequena ilha do Caribe.'],
      ['Luan Santana', 2009, 'Brasil', ['Sertanejo'], 'Solo', 4, 'Ajudou a popularizar o sertanejo universitário entre os adolescentes.', 'Começou cantando em festas na região Centro-Oeste.'],
      ['Djavan', 1976, 'Brasil', ['MPB', 'Samba'], 'Solo', 4, 'Suas canções já foram gravadas por artistas internacionais de jazz.', 'Alagoano com letras cheias de metáforas.']
    ]
  });

  /* ------------------------------------------------------------ JOGADORES */
  GG.registrarTema({
    id: 'jogadores',
    contexto: 'futebol',
    nome: 'Jogadores',
    emoji: '⚽',
    resumo: 'Craques do futebol mundial, de ontem e de hoje.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de nascimento', tipo: 'ano', tolerancia: 8 },
      { chave: 'origem', rotulo: 'Nacionalidade', tipo: 'pais' },
      { chave: 'posicao', rotulo: 'Posição', tipo: 'texto' },
      { chave: 'clube', rotulo: 'Clube marcante', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Pelé', 1940, 'Brasil', 'Atacante', 'Santos', 5, 'É o único jogador a vencer três Copas do Mundo.', 'Recebeu o apelido de Rei do Futebol.'],
      ['Neymar', 1992, 'Brasil', 'Atacante', 'Santos', 5, 'Foi o jogador mais caro do mundo quando trocou de clube em 2017.', 'Saiu da Vila Belmiro para a Europa aos 21 anos.'],
      ['Lionel Messi', 1987, 'Argentina', 'Atacante', 'Barcelona', 5, 'Ganhou o prêmio de melhor do mundo mais vezes que qualquer outro jogador.', 'É canhoto e foi campeão do mundo em 2022.'],
      ['Cristiano Ronaldo', 1985, 'Portugal', 'Atacante', 'Real Madrid', 5, 'É o maior artilheiro da história das seleções nacionais.', 'Nasceu na ilha da Madeira.'],
      ['Diego Maradona', 1960, 'Argentina', 'Meia', 'Napoli', 5, 'Marcou dois gols famosíssimos na mesma partida de 1986: um com a mão e outro driblando meio time.', 'Levou um clube do sul da Itália a ser campeão nacional.'],
      ['Zico', 1953, 'Brasil', 'Meia', 'Flamengo', 4, 'É considerado o maior ídolo da história do seu clube.', 'Ficou conhecido como Galinho de Quintino.'],
      ['Romário', 1966, 'Brasil', 'Atacante', 'Vasco da Gama', 4, 'Depois de pendurar as chuteiras, virou senador.', 'Foi o craque do tetracampeonato de 1994.'],
      ['Ronaldo Fenômeno', 1976, 'Brasil', 'Atacante', 'Real Madrid', 5, 'Voltou de duas lesões gravíssimas no joelho e foi artilheiro da Copa de 2002.', 'Usou um corte de cabelo que virou moda em 2002.'],
      ['Ronaldinho Gaúcho', 1980, 'Brasil', 'Meia', 'Barcelona', 5, 'Foi aplaudido de pé pela torcida rival no estádio Santiago Bernabéu.', 'Jogava sempre sorrindo, com dribles de fantasia.'],
      ['Marta', 1986, 'Brasil', 'Atacante', 'Orlando Pride', 5, 'Foi eleita a melhor jogadora do mundo seis vezes.', 'É a maior artilheira da história das Copas do Mundo, somando homens e mulheres.'],
      ['Formiga', 1978, 'Brasil', 'Volante', 'São Paulo', 4, 'Disputou sete Olimpíadas, um recorde no futebol.', 'Jogou em alto nível dos 17 aos 43 anos.'],
      ['Cafu', 1970, 'Brasil', 'Lateral', 'Roma', 4, 'É o único jogador a disputar três finais de Copa do Mundo seguidas.', 'Levantou a taça como capitão em 2002.'],
      ['Kaká', 1982, 'Brasil', 'Meia', 'Milan', 4, 'Foi o último jogador a quebrar a hegemonia de dois craques no prêmio de melhor do mundo.', 'Comemorava os gols apontando para o céu.'],
      ['Kylian Mbappé', 1998, 'França', 'Atacante', 'Paris Saint-Germain', 5, 'Marcou três gols em uma final de Copa do Mundo e mesmo assim perdeu o título.', 'É famoso pela velocidade e foi campeão mundial aos 19 anos.'],
      ['Erling Haaland', 2000, 'Noruega', 'Atacante', 'Manchester City', 5, 'Bateu o recorde de gols em uma única temporada do campeonato inglês.', 'É altíssimo e nasceu em um país escandinavo.'],
      ['Zinedine Zidane', 1972, 'França', 'Meia', 'Real Madrid', 5, 'Terminou a carreira com uma cabeçada na final da Copa de 2006.', 'Depois de jogador, virou técnico campeão europeu três vezes seguidas.'],
      ['David Beckham', 1975, 'Reino Unido', 'Meia', 'Manchester United', 5, 'Suas cobranças de falta viraram título de filme.', 'Ficou tão famoso pelo estilo quanto pelo futebol.'],
      ['Iker Casillas', 1981, 'Espanha', 'Goleiro', 'Real Madrid', 4, 'Levantou a Copa do Mundo de 2010 como capitão.', 'Era chamado de San Iker pelas defesas milagrosas.'],
      ['Manuel Neuer', 1986, 'Alemanha', 'Goleiro', 'Bayern de Munique', 4, 'Popularizou o estilo de goleiro que joga quase como um zagueiro.', 'Foi campeão do mundo em 2014, no Maracanã.'],
      ['Taffarel', 1966, 'Brasil', 'Goleiro', 'Internacional', 4, 'Defendeu o pênalti decisivo na semifinal da Copa de 1998.', 'Hoje é treinador de goleiros da seleção brasileira.'],
      ['Vinícius Júnior', 2000, 'Brasil', 'Atacante', 'Real Madrid', 5, 'Saiu do Flamengo para a Espanha ainda adolescente.', 'Ficou conhecido pelas dança nas comemorações de gol.'],
      ['Alisson', 1992, 'Brasil', 'Goleiro', 'Liverpool', 4, 'Já marcou um gol de cabeça nos acréscimos pelo seu clube.', 'É goleiro gaúcho campeão da Liga dos Campeões.']
    ]
  });

  /* ------------------------------------------------------------ CIENTISTAS */
  GG.registrarTema({
    id: 'cientistas',
    contexto: 'cientista',
    nome: 'Cientistas',
    emoji: '🔬',
    resumo: 'Quem formulou as perguntas — e algumas respostas — sobre o mundo.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de nascimento', tipo: 'ano', tolerancia: 30 },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Área', tipo: 'lista' },
      { chave: 'premio', rotulo: 'Prêmio Nobel', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Albert Einstein', 1879, 'Alemanha', ['Física'], 'Recebeu', 5, 'Ganhou o Nobel pelo efeito fotoelétrico, e não pela relatividade.', 'Sua equação mais famosa tem apenas três letras e um número.'],
      ['Isaac Newton', 1643, 'Reino Unido', ['Física', 'Matemática'], 'Não recebeu', 5, 'Formulou as leis do movimento durante um período de isolamento por causa da peste.', 'A história da maçã caindo está ligada ao seu nome.'],
      ['Marie Curie', 1867, 'Polônia', ['Física', 'Química'], 'Recebeu', 5, 'É a única pessoa a ganhar o Nobel em duas ciências diferentes.', 'Descobriu dois elementos químicos, um deles batizado em homenagem ao seu país.'],
      ['Charles Darwin', 1809, 'Reino Unido', ['Biologia'], 'Não recebeu', 5, 'Levou mais de vinte anos para publicar sua teoria, com medo da reação da sociedade.', 'Suas observações em ilhas do Pacífico mudaram a biologia.'],
      ['Galileu Galilei', 1564, 'Itália', ['Física', 'Astronomia'], 'Não recebeu', 5, 'Foi julgado pela Inquisição por defender que a Terra gira em torno do Sol.', 'Apontou uma luneta para o céu e viu luas em outro planeta.'],
      ['Nikola Tesla', 1856, 'Sérvia', ['Engenharia', 'Física'], 'Não recebeu', 5, 'Sua disputa com Thomas Edison ficou conhecida como a guerra das correntes.', 'Defendeu a corrente alternada, usada nas tomadas até hoje.'],
      ['Santos Dumont', 1873, 'Brasil', ['Engenharia'], 'Não recebeu', 5, 'Também inventou o relógio de pulso para conseguir ver a hora enquanto voava.', 'Voou com o 14-Bis em Paris, diante de uma plateia.'],
      ['Carlos Chagas', 1878, 'Brasil', ['Medicina', 'Biologia'], 'Não recebeu', 4, 'Descreveu sozinho a doença, o parasita e o inseto transmissor — algo raríssimo na ciência.', 'A doença que descobriu leva seu nome.'],
      ['Oswaldo Cruz', 1872, 'Brasil', ['Medicina'], 'Não recebeu', 4, 'Sua campanha de vacinação provocou uma revolta popular no Rio de Janeiro em 1904.', 'Um instituto de pesquisa no Rio leva seu nome.'],
      ['César Lattes', 1924, 'Brasil', ['Física'], 'Não recebeu', 4, 'Participou da descoberta do méson pi; seu colega levou o Nobel.', 'Físico brasileiro ligado ao estudo das partículas.'],
      ['Katherine Johnson', 1918, 'Estados Unidos', ['Matemática'], 'Não recebeu', 4, 'Um astronauta só aceitou decolar depois que ela conferiu os cálculos à mão.', 'Calculou trajetórias para as missões espaciais da Nasa.'],
      ['Alan Turing', 1912, 'Reino Unido', ['Matemática', 'Computação'], 'Não recebeu', 5, 'Seu trabalho ajudou a encurtar a Segunda Guerra Mundial em vários anos.', 'Quebrou os códigos da máquina Enigma.'],
      ['Ada Lovelace', 1815, 'Reino Unido', ['Matemática', 'Computação'], 'Não recebeu', 4, 'Era filha de um poeta famoso e escreveu sobre máquinas que ainda não existiam.', 'É considerada a primeira pessoa a programar.'],
      ['Stephen Hawking', 1942, 'Reino Unido', ['Física', 'Astronomia'], 'Não recebeu', 5, 'Escreveu um best-seller sobre o tempo e o universo para o público leigo.', 'Estudou buracos negros e se comunicava por um sintetizador de voz.'],
      ['Louis Pasteur', 1822, 'França', ['Química', 'Medicina'], 'Não recebeu', 5, 'Seu nome virou um processo aplicado ao leite que você toma.', 'Provou que micro-organismos causam doenças.'],
      ['Alexander Fleming', 1881, 'Reino Unido', ['Medicina', 'Biologia'], 'Recebeu', 4, 'A descoberta aconteceu por acaso, em uma placa esquecida durante as férias.', 'Descobriu o primeiro antibiótico a partir de um fungo.'],
      ['Gregor Mendel', 1822, 'República Tcheca', ['Biologia'], 'Não recebeu', 4, 'Seu trabalho ficou esquecido por 35 anos antes de ser redescoberto.', 'Fez experimentos com ervilhas em um mosteiro.'],
      ['Rosalind Franklin', 1920, 'Reino Unido', ['Química', 'Biologia'], 'Não recebeu', 4, 'Sua fotografia número 51 foi decisiva para a descoberta da estrutura do DNA.', 'Usou raios X para fotografar moléculas.'],
      ['Jane Goodall', 1934, 'Reino Unido', ['Biologia'], 'Não recebeu', 4, 'Descobriu que chimpanzés fabricam ferramentas, algo que se acreditava exclusivo dos humanos.', 'Viveu décadas observando primatas na Tanzânia.'],
      ['Nise da Silveira', 1905, 'Brasil', ['Medicina'], 'Não recebeu', 3, 'Enfrentou os métodos violentos da psiquiatria de sua época usando arte e animais.', 'Psiquiatra alagoana que criou um museu com obras de pacientes.'],
      ['Grace Hopper', 1906, 'Estados Unidos', ['Computação', 'Matemática'], 'Não recebeu', 4, 'Popularizou o termo bug ao encontrar uma mariposa dentro de um computador.', 'Ajudou a criar as primeiras linguagens de programação legíveis por humanos.'],
      ['Albert Sabin', 1906, 'Polônia', ['Medicina'], 'Não recebeu', 3, 'Abriu mão de patentear sua vacina para que ela ficasse barata.', 'Criou a vacina em gotinhas contra a poliomielite.']
    ]
  });

  /* ------------------------------------------ PERSONALIDADES HISTÓRICAS */
  GG.registrarTema({
    id: 'historicos',
    contexto: 'história',
    nome: 'Personalidades históricas',
    emoji: '🏛️',
    resumo: 'Nomes que mudaram o rumo de países, impérios e ideias.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de nascimento', tipo: 'ano', tolerancia: 60 },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Atuação', tipo: 'lista' },
      { chave: 'epoca', rotulo: 'Época', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Cleópatra', -69, 'Egito', ['Política'], 'Antiguidade', 5, 'Falava vários idiomas e foi a última faraó do Egito.', 'Governou um reino às margens do rio Nilo.'],
      ['Júlio César', -100, 'Itália', ['Política', 'Militar'], 'Antiguidade', 5, 'Deu nome ao mês de julho.', 'Foi assassinado por senadores em Roma.'],
      ['Alexandre, o Grande', -356, 'Grécia', ['Militar', 'Política'], 'Antiguidade', 5, 'Conquistou um império gigantesco antes dos 33 anos.', 'Foi aluno do filósofo Aristóteles.'],
      ['Sócrates', -470, 'Grécia', ['Filosofia'], 'Antiguidade', 4, 'Não deixou nada escrito: tudo o que sabemos vem de seus alunos.', 'Só sei que nada sei.'],
      ['Confúcio', -551, 'China', ['Filosofia'], 'Antiguidade', 4, 'Suas ideias organizaram a educação e a política chinesas por séculos.', 'Filósofo oriental famoso por ensinamentos sobre respeito e harmonia.'],
      ["Joana d'Arc", 1412, 'França', ['Militar', 'Religião'], 'Idade Média', 4, 'Liderou um exército aos 17 anos e foi queimada na fogueira aos 19.', 'Dizia ouvir vozes divinas orientando suas batalhas.'],
      ['Leonardo da Vinci', 1452, 'Itália', ['Arte', 'Ciência'], 'Idade Moderna', 5, 'Escrevia seus cadernos de trás para frente, em escrita espelhada.', 'Pintou um quadro famoso e projetou máquinas voadoras.'],
      ['Cristóvão Colombo', 1451, 'Itália', ['Navegação'], 'Idade Moderna', 5, 'Morreu acreditando ter chegado às Índias.', 'Chegou à América em 1492 com três embarcações.'],
      ['Pedro Álvares Cabral', 1467, 'Portugal', ['Navegação'], 'Idade Moderna', 4, 'Sua frota tinha 13 embarcações e mais de mil pessoas.', 'Ligado oficialmente à chegada dos europeus ao Brasil.'],
      ['Zumbi dos Palmares', 1655, 'Brasil', ['Política', 'Militar'], 'Idade Moderna', 4, 'A data de sua morte virou o Dia da Consciência Negra.', 'Liderou o maior quilombo da história do Brasil.'],
      ['Tiradentes', 1746, 'Brasil', ['Política'], 'Idade Moderna', 4, 'Era dentista prático, daí o apelido pelo qual ficou conhecido.', 'Foi executado por participar de uma conspiração em Minas Gerais.'],
      ['Napoleão Bonaparte', 1769, 'França', ['Política', 'Militar'], 'Idade Moderna', 5, 'Terminou a vida exilado em uma ilha no meio do Atlântico.', 'Coroou a si mesmo imperador.'],
      ['Dom Pedro I', 1798, 'Portugal', ['Política'], 'Idade Moderna', 4, 'Foi imperador de um país e rei de outro.', 'Ligado ao grito às margens do Ipiranga.'],
      ['Abraham Lincoln', 1809, 'Estados Unidos', ['Política'], 'Idade Contemporânea', 4, 'Foi assassinado em um teatro, poucos dias após o fim da guerra civil.', 'Assinou a proclamação que libertou os escravizados nos Estados Unidos.'],
      ['Anita Garibaldi', 1821, 'Brasil', ['Militar'], 'Idade Moderna', 3, 'Lutou grávida em batalhas no Brasil e depois na Itália.', 'É chamada de heroína de dois mundos.'],
      ['Princesa Isabel', 1846, 'Brasil', ['Política'], 'Idade Moderna', 4, 'Assinou a lei em 1888, um ano antes da queda do império.', 'Seu nome está ligado à Lei Áurea.'],
      ['Mahatma Gandhi', 1869, 'Índia', ['Política', 'Ativismo'], 'Idade Contemporânea', 5, 'Liderou uma marcha de 380 quilômetros para produzir sal e desafiar os impostos britânicos.', 'Defendeu a independência de seu país sem usar violência.'],
      ['Getúlio Vargas', 1882, 'Brasil', ['Política'], 'Idade Contemporânea', 4, 'Governou o Brasil por quinze anos seguidos e depois voltou eleito.', 'Criou as leis trabalhistas brasileiras.'],
      ['Rosa Parks', 1913, 'Estados Unidos', ['Ativismo'], 'Idade Contemporânea', 4, 'Sua prisão gerou um boicote aos ônibus que durou mais de um ano.', 'Recusou-se a ceder o lugar em um ônibus.'],
      ['Nelson Mandela', 1918, 'África do Sul', ['Política'], 'Idade Contemporânea', 5, 'Passou 27 anos preso e ainda assim defendeu a reconciliação ao sair.', 'Combateu o apartheid e virou presidente do próprio país.'],
      ['Che Guevara', 1928, 'Argentina', ['Política', 'Militar'], 'Idade Contemporânea', 4, 'Era médico antes de virar guerrilheiro.', 'Sua foto de boina é uma das imagens mais reproduzidas do mundo.'],
      ['Martin Luther King', 1929, 'Estados Unidos', ['Política', 'Ativismo'], 'Idade Contemporânea', 5, 'Recebeu o Nobel da Paz aos 35 anos, o mais jovem até então.', 'Fez um discurso que começa dizendo que tinha um sonho.'],
      ['Chico Mendes', 1944, 'Brasil', ['Ativismo'], 'Idade Contemporânea', 4, 'Organizou os empates, protestos pacíficos contra o desmatamento.', 'Seringueiro do Acre que defendeu a floresta amazônica.']
    ]
  });

  /* ------------------------------------------------------------- ARTISTAS */
  GG.registrarTema({
    id: 'artistas',
    contexto: 'artista',
    nome: 'Artistas',
    emoji: '🎨',
    resumo: 'Pintores, escultores e grafiteiros de vários séculos.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de nascimento', tipo: 'ano', tolerancia: 30 },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Movimento', tipo: 'lista' },
      { chave: 'tecnica', rotulo: 'Técnica principal', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Leonardo da Vinci', 1452, 'Itália', ['Renascimento'], 'Pintura', 5, 'A Mona Lisa é o quadro mais visitado do mundo.', 'Também era inventor e anatomista.'],
      ['Michelangelo', 1475, 'Itália', ['Renascimento'], 'Escultura', 5, 'Pintou o teto da Capela Sistina em pé, e não deitado como diz a lenda.', 'Esculpiu o Davi em um único bloco de mármore.'],
      ['Vincent van Gogh', 1853, 'Holanda', ['Pós-impressionismo'], 'Pintura', 5, 'Vendeu pouquíssimos quadros em vida e hoje é um dos artistas mais caros do mundo.', 'Pintou uma noite estrelada em espirais.'],
      ['Claude Monet', 1840, 'França', ['Impressionismo'], 'Pintura', 4, 'Um quadro seu deu nome ao movimento inteiro.', 'Pintou dezenas de vezes as ninfeias de seu próprio jardim.'],
      ['Auguste Rodin', 1840, 'França', ['Realismo'], 'Escultura', 4, 'Sua obra mais famosa era parte de um portão que nunca foi concluído.', 'Fez uma escultura de um homem sentado, pensando.'],
      ['Gustav Klimt', 1862, 'Áustria', ['Simbolismo'], 'Pintura', 4, 'Usava folhas de ouro verdadeiro em suas telas.', 'Pintou um casal dourado se beijando.'],
      ['Pablo Picasso', 1881, 'Espanha', ['Cubismo'], 'Pintura', 5, 'Produziu mais de vinte mil obras ao longo da vida.', 'Ajudou a criar um movimento que decompõe as figuras em formas geométricas.'],
      ['Tarsila do Amaral', 1886, 'Brasil', ['Modernismo'], 'Pintura', 4, 'Um quadro seu inspirou o movimento antropofágico brasileiro.', 'Pintou o Abaporu, com um pé enorme.'],
      ['Anita Malfatti', 1889, 'Brasil', ['Modernismo'], 'Pintura', 3, 'Sua exposição de 1917 foi duramente criticada e acabou impulsionando o modernismo.', 'Participou da Semana de Arte Moderna de 1922.'],
      ['Di Cavalcanti', 1897, 'Brasil', ['Modernismo'], 'Pintura', 3, 'Foi ele quem idealizou a Semana de Arte Moderna de 1922.', 'Retratou mulatas e o cotidiano brasileiro.'],
      ['Cândido Portinari', 1903, 'Brasil', ['Modernismo'], 'Pintura', 4, 'Dois painéis seus estão na sede da ONU, em Nova York.', 'Pintou retirantes e trabalhadores com mãos e pés enormes.'],
      ['Salvador Dalí', 1904, 'Espanha', ['Surrealismo'], 'Pintura', 5, 'Seu bigode virou marca registrada quase tão famosa quanto suas telas.', 'Pintou relógios derretendo.'],
      ['Frida Kahlo', 1907, 'México', ['Surrealismo'], 'Pintura', 5, 'Começou a pintar durante a recuperação de um grave acidente de ônibus.', 'Fez dezenas de autorretratos com flores no cabelo.'],
      ['Oscar Niemeyer', 1907, 'Brasil', ['Modernismo'], 'Arquitetura', 5, 'Trabalhou até os 104 anos de idade.', 'Projetou os prédios curvos de Brasília.'],
      ['Aleijadinho', 1730, 'Brasil', ['Barroco'], 'Escultura', 4, 'Continuou esculpindo mesmo depois de perder o movimento das mãos, com ferramentas amarradas.', 'Fez os profetas de pedra-sabão em Congonhas.'],
      ['Andy Warhol', 1928, 'Estados Unidos', ['Pop art'], 'Serigrafia', 5, 'Disse que todos teriam quinze minutos de fama.', 'Transformou latas de sopa em obra de arte.'],
      ['Beatriz Milhazes', 1960, 'Brasil', ['Contemporâneo'], 'Pintura', 3, 'É uma das artistas brasileiras vivas mais valorizadas no exterior.', 'Usa cores fortes, arabescos e formas circulares.'],
      ['Romero Britto', 1963, 'Brasil', ['Pop art'], 'Pintura', 4, 'Começou pintando em jornais por não ter dinheiro para telas.', 'Usa cores berrantes e contornos pretos bem grossos.'],
      ['Banksy', 1974, 'Reino Unido', ['Arte urbana'], 'Grafite', 5, 'Ninguém sabe quem é: até o ano de nascimento é uma estimativa.', 'Uma obra sua se autodestruiu logo após ser vendida em leilão.'],
      ['Eduardo Kobra', 1975, 'Brasil', ['Arte urbana'], 'Grafite', 4, 'Pintou um dos maiores murais do mundo, no Rio de Janeiro.', 'Faz rostos gigantes com losangos coloridos.']
    ]
  });

  /* ------------------------------------------------------ ATORES E ATRIZES */
  GG.registrarTema({
    id: 'atores',
    contexto: 'ator atriz',
    nome: 'Atores e atrizes',
    emoji: '🎭',
    resumo: 'Quem dá rosto às histórias no cinema e na televisão.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de nascimento', tipo: 'ano', tolerancia: 12 },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Gêneros que costuma fazer', tipo: 'lista' },
      { chave: 'obra', rotulo: 'Obra marcante', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Leonardo DiCaprio', 1974, 'Estados Unidos', ['Drama'], 'Titanic', 5, 'Esperou mais de vinte anos entre a primeira indicação e o primeiro Oscar.', 'Ficou famoso mundialmente com um naufrágio.'],
      ['Meryl Streep', 1949, 'Estados Unidos', ['Drama'], 'O Diabo Veste Prada', 5, 'É a pessoa com mais indicações ao Oscar na história.', 'Interpretou uma editora de moda temida por todos.'],
      ['Tom Hanks', 1956, 'Estados Unidos', ['Drama', 'Comédia'], 'Forrest Gump', 5, 'Venceu o Oscar de melhor ator dois anos seguidos.', 'Correu pelos Estados Unidos inteiros em um filme de 1994.'],
      ['Morgan Freeman', 1937, 'Estados Unidos', ['Drama'], 'Um Sonho de Liberdade', 5, 'Só começou a se destacar no cinema depois dos 50 anos.', 'Sua voz é uma das mais reconhecíveis do cinema.'],
      ['Anthony Hopkins', 1937, 'Reino Unido', ['Drama', 'Suspense'], 'O Silêncio dos Inocentes', 4, 'Venceu o Oscar aparecendo menos de vinte minutos em cena.', 'Interpretou um psiquiatra canibal.'],
      ['Denzel Washington', 1954, 'Estados Unidos', ['Drama'], 'Dia de Treinamento', 4, 'Também dirige e produz seus próprios filmes.', 'Ganhou o Oscar interpretando um policial corrupto.'],
      ['Jackie Chan', 1954, 'China', ['Ação', 'Comédia'], 'Rush Hour', 5, 'Faz quase todas as próprias cenas de risco e já quebrou dezenas de ossos.', 'Mistura artes marciais com humor físico.'],
      ['Robert Downey Jr.', 1965, 'Estados Unidos', ['Ação', 'Comédia'], 'Homem de Ferro', 5, 'Improvisou várias das falas mais famosas do personagem.', 'Voltou por cima ao vestir uma armadura.'],
      ['Will Smith', 1968, 'Estados Unidos', ['Ação', 'Comédia'], 'Homens de Preto', 5, 'Começou a carreira como rapper antes de virar ator.', 'Ficou famoso como o príncipe de Bel-Air.'],
      ['Scarlett Johansson', 1984, 'Estados Unidos', ['Ação', 'Drama'], 'Vingadores', 5, 'Também é cantora e já lançou álbuns.', 'Interpretou uma espiã russa em filmes de super-heróis.'],
      ['Zendaya', 1996, 'Estados Unidos', ['Drama', 'Ação'], 'Duna', 5, 'Foi a pessoa mais jovem a vencer o Emmy de melhor atriz dramática.', 'Começou em séries da Disney antes do cinema.'],
      ['Tom Holland', 1996, 'Reino Unido', ['Ação', 'Aventura'], 'Homem-Aranha', 5, 'Era bailarino profissional antes de virar ator.', 'É o mais jovem a interpretar certo herói aracnídeo.'],
      ['Emma Watson', 1990, 'Reino Unido', ['Fantasia', 'Drama'], 'Harry Potter', 5, 'Conciliou as filmagens com a faculdade em uma universidade dos Estados Unidos.', 'Interpretou a aluna mais estudiosa de uma escola de magia.'],
      ['Daniel Radcliffe', 1989, 'Reino Unido', ['Fantasia'], 'Harry Potter', 4, 'Usou mais de 160 pares de óculos durante as filmagens da série.', 'Interpretou um bruxo com cicatriz na testa.'],
      ['Fernanda Montenegro', 1929, 'Brasil', ['Drama'], 'Central do Brasil', 5, 'Foi a primeira brasileira indicada ao Oscar de melhor atriz.', 'Interpretou uma escrevente de cartas na estação central.'],
      ['Fernanda Torres', 1965, 'Brasil', ['Drama', 'Comédia'], 'Ainda Estou Aqui', 4, 'Venceu o Globo de Ouro de melhor atriz em 2025.', 'É filha de outra atriz brasileira consagrada.'],
      ['Wagner Moura', 1976, 'Brasil', ['Drama', 'Ação'], 'Tropa de Elite', 4, 'Aprendeu espanhol do zero para interpretar um traficante colombiano em uma série.', 'Seu bordão em um filme policial virou meme nacional.'],
      ['Selton Mello', 1972, 'Brasil', ['Drama', 'Comédia'], 'O Palhaço', 4, 'Também dirige: seu filme representou o Brasil no Oscar.', 'Começou como ator mirim na televisão.'],
      ['Lázaro Ramos', 1978, 'Brasil', ['Drama'], 'Madame Satã', 4, 'Também é escritor e apresentador de TV.', 'Baiano que começou no teatro de grupo em Salvador.'],
      ['Taís Araújo', 1978, 'Brasil', ['Drama'], 'Xica da Silva', 4, 'Foi a primeira atriz negra a protagonizar uma novela na TV brasileira.', 'Estreou como protagonista aos 17 anos.'],
      ['Sônia Braga', 1950, 'Brasil', ['Drama'], 'Aquarius', 4, 'Fez carreira internacional em Hollywood nos anos 1980.', 'Protagonizou Gabriela na televisão.']
    ]
  });
})(window.GG);
