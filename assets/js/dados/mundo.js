/* =========================================================================
   BASE DE DADOS — MUNDO
   Temas: Países, Lugares, Animais, Comidas, Esportes
   ========================================================================= */

(function (GG) {
  'use strict';

  GG.continentes['Jordânia'] = 'Ásia';
  GG.continentes['Nepal'] = 'Ásia';
  GG.continentes['Bélgica'] = 'Europa';

  /* --------------------------------------------------------------- PAÍSES */
  GG.registrarTema({
    id: 'paises',
    contexto: 'país',
    nome: 'Países',
    emoji: '🌎',
    resumo: 'Geografia, idiomas e moedas dos cinco continentes.',
    campos: [
      { chave: 'continente', rotulo: 'Continente', tipo: 'texto' },
      { chave: 'area', rotulo: 'Faixa de área', tipo: 'ordinal', escala: 'porte' },
      { chave: 'idioma', rotulo: 'Idioma oficial', tipo: 'texto' },
      { chave: 'populacao', rotulo: 'População', tipo: 'ordinal', escala: 'populacao' },
      { chave: 'hemisferio', rotulo: 'Hemisfério', tipo: 'texto' }
    ],
    itens: [
      ['Brasil', 'América do Sul', 5, 'Português', 5, 'Norte e Sul', 'É o único país das Américas cuja língua oficial é o português.', 'Faz fronteira com quase todos os vizinhos do seu continente.'],
      ['Argentina', 'América do Sul', 5, 'Espanhol', 3, 'Sul', 'Abriga a montanha mais alta fora da Ásia, o Aconcágua.', 'Seu prato mais famoso envolve carne na brasa.'],
      ['Peru', 'América do Sul', 4, 'Espanhol', 3, 'Sul', 'Foi o centro do Império Inca.', 'Guarda uma cidade de pedra no alto dos Andes.'],
      ['Chile', 'América do Sul', 4, 'Espanhol', 2, 'Sul', 'Tem mais de 4 mil quilômetros de comprimento e menos de 200 de largura em média.', 'É um país longo e estreito, espremido entre a cordilheira e o mar.'],
      ['Colômbia', 'América do Sul', 4, 'Espanhol', 3, 'Norte e Sul', 'É o segundo país mais biodiverso do planeta.', 'Um dos maiores produtores de café do mundo.'],
      ['Estados Unidos', 'América do Norte', 5, 'Inglês', 5, 'Norte', 'Não possui idioma oficial definido em lei federal.', 'É formado por cinquenta estados, dois deles separados do restante.'],
      ['México', 'América do Norte', 5, 'Espanhol', 4, 'Norte', 'É o país com mais falantes de espanhol do mundo.', 'Berço das civilizações asteca e maia.'],
      ['Canadá', 'América do Norte', 5, 'Inglês', 3, 'Norte', 'Tem mais lagos do que todos os outros países somados.', 'Sua bandeira traz uma folha vermelha.'],
      ['Cuba', 'América do Norte', 2, 'Espanhol', 2, 'Norte', 'É a maior ilha do Caribe.', 'Ilha caribenha famosa por charutos e carros antigos.'],
      ['Portugal', 'Europa', 2, 'Português', 2, 'Norte', 'Tem as fronteiras terrestres mais antigas da Europa, definidas em 1297.', 'É o país europeu mais a oeste do continente.'],
      ['Espanha', 'Europa', 3, 'Espanhol', 3, 'Norte', 'Recebe mais turistas por ano do que sua própria população, várias vezes.', 'Divide uma península com outro país europeu.'],
      ['França', 'Europa', 3, 'Francês', 4, 'Norte', 'É o país mais visitado do mundo.', 'Uma torre de ferro é seu cartão-postal.'],
      ['Itália', 'Europa', 3, 'Italiano', 3, 'Norte', 'Tem dois países independentes inteiramente dentro do seu território.', 'Seu mapa tem formato de bota.'],
      ['Alemanha', 'Europa', 3, 'Alemão', 4, 'Norte', 'Sua capital ficou dividida por um muro entre 1961 e 1989.', 'É a maior economia da Europa.'],
      ['Reino Unido', 'Europa', 3, 'Inglês', 4, 'Norte', 'É formado por quatro nações: Inglaterra, Escócia, País de Gales e Irlanda do Norte.', 'Seu sistema de governo mantém uma monarquia constitucional.'],
      ['Rússia', 'Europa', 5, 'Russo', 4, 'Norte', 'Se estende por onze fusos horários.', 'É o maior país do mundo em território.'],
      ['Japão', 'Ásia', 3, 'Japonês', 4, 'Norte', 'É formado por mais de 14 mil ilhas.', 'É chamado de Terra do Sol Nascente.'],
      ['China', 'Ásia', 5, 'Mandarim', 5, 'Norte', 'Apesar do tamanho, adota um único fuso horário oficial.', 'Tem uma muralha visível em imagens de satélite.'],
      ['Índia', 'Ásia', 5, 'Híndi', 5, 'Norte', 'Possui 22 idiomas com status oficial.', 'Ultrapassou a China como país mais populoso do mundo.'],
      ['Coreia do Sul', 'Ásia', 2, 'Coreano', 3, 'Norte', 'Seu alfabeto foi inventado propositalmente no século XV para ser fácil de aprender.', 'Exporta música pop e dramas para o mundo inteiro.'],
      ['Austrália', 'Oceania', 5, 'Inglês', 3, 'Sul', 'É ao mesmo tempo um país, um continente e uma ilha.', 'Abriga cangurus e a maior barreira de corais do planeta.'],
      ['Egito', 'África', 4, 'Árabe', 4, 'Norte', 'Quase toda a população vive às margens de um único rio.', 'Guarda pirâmides construídas há mais de 4 mil anos.'],
      ['Nigéria', 'África', 4, 'Inglês', 5, 'Norte', 'É o país mais populoso da África e tem mais de 500 idiomas falados.', 'Sua indústria de cinema é apelidada de Nollywood.'],
      ['África do Sul', 'África', 4, 'Inglês', 4, 'Sul', 'Possui doze idiomas oficiais e três capitais diferentes.', 'Sediou a primeira Copa do Mundo realizada no continente africano.']
    ]
  });

  /* -------------------------------------------------------------- LUGARES */
  GG.registrarTema({
    id: 'lugares',
    contexto: 'ponto turístico',
    nome: 'Lugares',
    emoji: '🗺️',
    resumo: 'Monumentos, ruínas e maravilhas naturais para viajar sem sair da sala.',
    campos: [
      { chave: 'origem', rotulo: 'País', tipo: 'pais' },
      { chave: 'continente', rotulo: 'Continente', tipo: 'texto' },
      { chave: 'tipo', rotulo: 'Tipo', tipo: 'lista' },
      { chave: 'ano', rotulo: 'Ano de construção', tipo: 'ano', tolerancia: 200 },
      { chave: 'popularidade', rotulo: 'Fama', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Cristo Redentor', 'Brasil', 'América do Sul', ['Monumento', 'Religioso'], 1931, 5, 'Foi eleito uma das sete novas maravilhas do mundo em 2007.', 'Fica no alto de um morro, de braços abertos.'],
      ['Torre Eiffel', 'França', 'Europa', ['Monumento'], 1889, 5, 'Era para ser temporária e seria demolida após vinte anos.', 'Foi construída para uma exposição universal.'],
      ['Muralha da China', 'China', 'Ásia', ['Monumento', 'Histórico'], -220, 5, 'Não é uma só muralha, mas várias construídas em épocas diferentes.', 'Serve de barreira defensiva por milhares de quilômetros.'],
      ['Machu Picchu', 'Peru', 'América do Sul', ['Ruína', 'Histórico'], 1450, 5, 'Ficou desconhecida do mundo até 1911.', 'Cidade de pedra construída no alto dos Andes.'],
      ['Coliseu', 'Itália', 'Europa', ['Monumento', 'Histórico'], 80, 5, 'Comportava cerca de 50 mil espectadores.', 'Arena onde aconteciam lutas de gladiadores.'],
      ['Pirâmides de Gizé', 'Egito', 'África', ['Monumento', 'Histórico'], -2560, 5, 'É a única das sete maravilhas do mundo antigo que ainda existe.', 'Foram túmulos de faraós.'],
      ['Taj Mahal', 'Índia', 'Ásia', ['Monumento', 'Religioso'], 1653, 5, 'Foi construído por um imperador em homenagem à esposa falecida.', 'Mausoléu branco com uma grande cúpula central.'],
      ['Chichén Itzá', 'México', 'América do Norte', ['Ruína', 'Histórico'], 600, 4, 'Nos equinócios, a sombra da escadaria desenha uma serpente.', 'Pirâmide construída pelo povo maia.'],
      ['Petra', 'Jordânia', 'Ásia', ['Ruína', 'Histórico'], -312, 4, 'Foi esculpida diretamente nas paredes de rocha rosada.', 'Cidade escavada em um desfiladeiro no deserto.'],
      ['Estátua da Liberdade', 'Estados Unidos', 'América do Norte', ['Monumento'], 1886, 5, 'Foi um presente da França e chegou desmontada em 214 caixotes.', 'Segura uma tocha e fica em uma ilha.'],
      ['Big Ben', 'Reino Unido', 'Europa', ['Monumento'], 1859, 5, 'O nome se refere ao sino, não à torre.', 'Relógio ao lado do parlamento britânico.'],
      ['Sagrada Família', 'Espanha', 'Europa', ['Monumento', 'Religioso'], 1882, 4, 'Está em obras há mais de 140 anos.', 'Basílica projetada por Antoni Gaudí em Barcelona.'],
      ['Torre de Pisa', 'Itália', 'Europa', ['Monumento'], 1372, 4, 'Começou a inclinar durante a própria construção, por causa do solo mole.', 'Ficou famosa justamente por estar torta.'],
      ['Stonehenge', 'Reino Unido', 'Europa', ['Ruína', 'Histórico'], -2500, 4, 'Ninguém sabe ao certo como as pedras foram transportadas.', 'Círculo de pedras gigantes em um campo aberto.'],
      ['Ópera de Sydney', 'Austrália', 'Oceania', ['Monumento'], 1973, 4, 'Seu telhado é formado por mais de um milhão de azulejos.', 'Seu formato lembra velas de barco ou conchas.'],
      ['Museu do Louvre', 'França', 'Europa', ['Monumento'], 1793, 5, 'Era um palácio real antes de virar museu.', 'Sua entrada é uma pirâmide de vidro.'],
      ['Cataratas do Iguaçu', 'Brasil', 'América do Sul', ['Natural'], null, 5, 'São quase 300 quedas dágua divididas entre dois países.', 'Ficam na fronteira entre Brasil e Argentina.'],
      ['Floresta Amazônica', 'Brasil', 'América do Sul', ['Natural'], null, 5, 'Abriga cerca de 10% de todas as espécies conhecidas do planeta.', 'É a maior floresta tropical do mundo.'],
      ['Fernando de Noronha', 'Brasil', 'América do Sul', ['Natural'], null, 4, 'O número de turistas na ilha é limitado por lei para proteger o ambiente.', 'Arquipélago brasileiro com um morro em forma de dedo.'],
      ['Lençóis Maranhenses', 'Brasil', 'América do Sul', ['Natural'], null, 4, 'As lagoas surgem entre as dunas apenas em parte do ano.', 'Deserto de dunas brancas com lagoas de água doce.'],
      ['Monte Everest', 'Nepal', 'Ásia', ['Natural'], null, 5, 'Cresce alguns milímetros por ano por causa do movimento das placas tectônicas.', 'É o ponto mais alto do planeta.'],
      ['Grand Canyon', 'Estados Unidos', 'América do Norte', ['Natural'], null, 5, 'Foi esculpido ao longo de milhões de anos pelo rio Colorado.', 'Cânion gigantesco em camadas avermelhadas.']
    ]
  });

  /* -------------------------------------------------------------- ANIMAIS */
  GG.registrarTema({
    id: 'animais',
    contexto: 'animal',
    nome: 'Animais',
    emoji: '🐾',
    resumo: 'Da savana ao fundo do mar: classes, habitats e dietas.',
    campos: [
      { chave: 'classe', rotulo: 'Classe', tipo: 'texto' },
      { chave: 'tipo', rotulo: 'Habitat', tipo: 'lista' },
      { chave: 'dieta', rotulo: 'Dieta', tipo: 'texto' },
      { chave: 'regiao', rotulo: 'Região', tipo: 'texto' },
      { chave: 'porte', rotulo: 'Porte', tipo: 'ordinal', escala: 'porte' }
    ],
    itens: [
      ['Leão', 'Mamífero', ['Savana'], 'Carnívoro', 'África', 4, 'Quem caça na maior parte do tempo são as fêmeas do grupo.', 'Vive em bandos chamados alcateias na savana.'],
      ['Tigre', 'Mamífero', ['Floresta'], 'Carnívoro', 'Ásia', 4, 'Cada indivíduo tem um padrão de listras único, como uma impressão digital.', 'É o maior felino do mundo.'],
      ['Elefante-africano', 'Mamífero', ['Savana'], 'Herbívoro', 'África', 5, 'Se comunica por sons graves que outros elefantes escutam a quilômetros de distância.', 'É o maior animal terrestre.'],
      ['Girafa', 'Mamífero', ['Savana'], 'Herbívoro', 'África', 5, 'Tem o mesmo número de vértebras no pescoço que um ser humano: sete.', 'É o animal mais alto do mundo.'],
      ['Baleia-azul', 'Mamífero', ['Oceano'], 'Carnívoro', 'Oceanos', 5, 'Seu coração pode pesar quase 200 quilos.', 'É o maior animal que já existiu no planeta.'],
      ['Golfinho', 'Mamífero', ['Oceano'], 'Carnívoro', 'Oceanos', 3, 'Dorme com metade do cérebro por vez, para continuar respirando.', 'Usa som para enxergar debaixo dágua.'],
      ['Tubarão-branco', 'Peixe', ['Oceano'], 'Carnívoro', 'Oceanos', 4, 'Troca de dentes a vida inteira, perdendo milhares deles.', 'Seu esqueleto é feito de cartilagem, não de osso.'],
      ['Polvo', 'Molusco', ['Oceano'], 'Carnívoro', 'Oceanos', 2, 'Tem três corações e sangue azul.', 'Muda de cor e textura para se camuflar.'],
      ['Tartaruga-marinha', 'Réptil', ['Oceano'], 'Onívoro', 'Oceanos', 3, 'Volta para desovar na mesma praia onde nasceu.', 'Vive no mar, mas põe ovos na areia.'],
      ['Pinguim-imperador', 'Ave', ['Gelo'], 'Carnívoro', 'Antártida', 3, 'Os machos chocam o ovo sobre os pés durante o inverno mais rigoroso do planeta.', 'É uma ave que nada muito bem e não voa.'],
      ['Urso-polar', 'Mamífero', ['Gelo'], 'Carnívoro', 'Ártico', 5, 'Sua pele é preta e os pelos são ocos e transparentes.', 'Caça focas sobre o gelo do extremo norte.'],
      ['Panda-gigante', 'Mamífero', ['Floresta'], 'Herbívoro', 'Ásia', 4, 'Passa até 14 horas por dia comendo bambu.', 'É preto e branco e virou símbolo da preservação.'],
      ['Canguru', 'Mamífero', ['Savana'], 'Herbívoro', 'Oceania', 3, 'Não consegue andar para trás.', 'Carrega o filhote em uma bolsa na barriga.'],
      ['Coala', 'Mamífero', ['Floresta'], 'Herbívoro', 'Oceania', 2, 'Dorme cerca de vinte horas por dia.', 'Só come folhas de eucalipto.'],
      ['Onça-pintada', 'Mamífero', ['Floresta'], 'Carnívoro', 'América do Sul', 4, 'Tem a mordida mais forte entre os grandes felinos.', 'É o maior felino das Américas.'],
      ['Arara-azul', 'Ave', ['Floresta'], 'Herbívoro', 'América do Sul', 2, 'Forma casais que permanecem juntos por toda a vida.', 'Ave azul enorme ameaçada de extinção no Pantanal.'],
      ['Tucano', 'Ave', ['Floresta'], 'Onívoro', 'América do Sul', 2, 'O bico enorme é oco e ajuda a controlar a temperatura do corpo.', 'Seu bico colorido é maior que a cabeça.'],
      ['Preguiça', 'Mamífero', ['Floresta'], 'Herbívoro', 'América do Sul', 2, 'Desce da árvore para fazer as necessidades apenas uma vez por semana.', 'Vive pendurada de cabeça para baixo.'],
      ['Capivara', 'Mamífero', ['Rio'], 'Herbívoro', 'América do Sul', 3, 'É o maior roedor do mundo.', 'Vive perto da água e é famosa por ser calma com outros animais.'],
      ['Jacaré-do-pantanal', 'Réptil', ['Rio'], 'Carnívoro', 'América do Sul', 4, 'Engole pedras para ajudar na digestão.', 'Réptil de mandíbula poderosa que vive em rios brasileiros.'],
      ['Sucuri', 'Réptil', ['Rio', 'Floresta'], 'Carnívoro', 'América do Sul', 4, 'Mata por constrição: aperta a presa até ela parar de respirar.', 'É uma das maiores serpentes do mundo.'],
      ['Lobo-guará', 'Mamífero', ['Cerrado'], 'Onívoro', 'América do Sul', 3, 'Come muita fruta, principalmente a lobeira.', 'Tem pernas muito longas e pelagem avermelhada.'],
      ['Camaleão', 'Réptil', ['Floresta'], 'Carnívoro', 'África', 1, 'Muda de cor mais para se comunicar do que para se esconder.', 'Move os dois olhos de forma independente.'],
      ['Abelha', 'Inseto', ['Diversos'], 'Herbívoro', 'Todos os continentes', 1, 'Dança para indicar às companheiras onde estão as flores.', 'Sua polinização é essencial para a agricultura.'],
      ['Morcego', 'Mamífero', ['Caverna'], 'Onívoro', 'Todos os continentes', 1, 'É o único mamífero capaz de voar de verdade.', 'Se orienta no escuro pelo eco dos próprios sons.']
    ]
  });

  /* -------------------------------------------------------------- COMIDAS */
  GG.registrarTema({
    id: 'comidas',
    contexto: 'culinária',
    nome: 'Comidas',
    emoji: '🍔',
    resumo: 'Pratos típicos, lanches e sobremesas do mundo todo.',
    campos: [
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'continente', rotulo: 'Continente', tipo: 'texto' },
      { chave: 'refeicao', rotulo: 'Tipo', tipo: 'texto' },
      { chave: 'ingrediente', rotulo: 'Ingrediente principal', tipo: 'texto' },
      { chave: 'sabor', rotulo: 'Sabor', tipo: 'texto' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Pizza', 'Itália', 'Europa', 'Prato principal', 'Massa', 'Salgado', 5, 'A versão margherita foi criada com as cores da bandeira italiana.', 'Nasceu em Nápoles e é servida em fatias.'],
      ['Lasanha', 'Itália', 'Europa', 'Prato principal', 'Massa', 'Salgado', 5, 'É um dos pratos de massa mais antigos que se tem registro.', 'É montada em camadas alternadas.'],
      ['Macarrão à bolonhesa', 'Itália', 'Europa', 'Prato principal', 'Massa', 'Salgado', 5, 'Na cidade que dá nome ao molho, ele é servido com outro tipo de massa.', 'Massa com molho de tomate e carne moída.'],
      ['Sorvete', 'Itália', 'Europa', 'Sobremesa', 'Leite', 'Doce', 5, 'Versões congeladas de frutas já eram consumidas na China antiga.', 'É servido em bola, casquinha ou palito.'],
      ['Sushi', 'Japão', 'Ásia', 'Prato principal', 'Arroz', 'Salgado', 5, 'Surgiu como uma técnica de conservar peixe no arroz fermentado.', 'Combina arroz temperado com peixe cru.'],
      ['Ramen', 'Japão', 'Ásia', 'Prato principal', 'Massa', 'Salgado', 4, 'Existem museus inteiros dedicados a ele no Japão.', 'É uma sopa servida com macarrão e caldo bem temperado.'],
      ['Yakisoba', 'Japão', 'Ásia', 'Prato principal', 'Massa', 'Salgado', 4, 'Apesar do nome, o macarrão usado não é feito de trigo-sarraceno.', 'Macarrão frito com legumes e carne.'],
      ['Kimchi', 'Coreia do Sul', 'Ásia', 'Acompanhamento', 'Legume', 'Picante', 4, 'É tradicionalmente fermentado em potes enterrados no chão.', 'Acompanhamento fermentado e apimentado servido em quase toda refeição coreana.'],
      ['Curry', 'Índia', 'Ásia', 'Prato principal', 'Especiarias', 'Picante', 4, 'Não é um prato só: o nome cobre centenas de receitas diferentes.', 'Prato de molho encorpado cheio de especiarias.'],
      ['Hambúrguer', 'Estados Unidos', 'América do Norte', 'Lanche', 'Carne', 'Salgado', 5, 'O nome vem da cidade alemã de Hamburgo.', 'Carne moída entre duas metades de pão.'],
      ['Hot dog', 'Estados Unidos', 'América do Norte', 'Lanche', 'Carne', 'Salgado', 5, 'Ganhou esse apelido por causa do formato alongado da salsicha.', 'Salsicha dentro de um pão comprido.'],
      ['Tacos', 'México', 'América do Norte', 'Prato principal', 'Milho', 'Picante', 5, 'A tortilha dobrada já era usada por povos indígenas antes da colonização.', 'Tortilha dobrada recheada com carne e molhos.'],
      ['Guacamole', 'México', 'América do Norte', 'Acompanhamento', 'Abacate', 'Salgado', 4, 'A receita original é asteca e leva basicamente abacate amassado e sal.', 'Pasta verde servida com tortilhas.'],
      ['Paella', 'Espanha', 'Europa', 'Prato principal', 'Arroz', 'Salgado', 4, 'Leva o nome da frigideira larga em que é preparada.', 'Arroz amarelado cozido com frutos do mar.'],
      ['Churros', 'Espanha', 'Europa', 'Sobremesa', 'Massa', 'Doce', 4, 'No Brasil ganhou recheio de doce de leite, algo raro na Espanha.', 'Massa frita com açúcar e canela.'],
      ['Feijoada', 'Brasil', 'América do Sul', 'Prato principal', 'Feijão', 'Salgado', 4, 'Costuma ser servida com couve, laranja e farofa.', 'Leva feijão preto e várias carnes.'],
      ['Brigadeiro', 'Brasil', 'América do Sul', 'Sobremesa', 'Chocolate', 'Doce', 4, 'Recebeu esse nome por causa da campanha de um candidato à presidência nos anos 1940.', 'Doce enrolado à mão e coberto de granulado.'],
      ['Pão de queijo', 'Brasil', 'América do Sul', 'Lanche', 'Queijo', 'Salgado', 4, 'É feito com polvilho, o que o torna naturalmente sem glúten.', 'Bolinha assada típica de Minas Gerais.'],
      ['Coxinha', 'Brasil', 'América do Sul', 'Lanche', 'Frango', 'Salgado', 4, 'O formato imita a coxa da ave que dá recheio ao salgado.', 'Salgado frito com massa de batata.'],
      ['Açaí', 'Brasil', 'América do Sul', 'Sobremesa', 'Fruta', 'Doce', 4, 'No Norte do Brasil é servido salgado, acompanhando peixe e farinha.', 'Polpa roxa batida e servida gelada.'],
      ['Tapioca', 'Brasil', 'América do Sul', 'Lanche', 'Mandioca', 'Salgado', 3, 'A goma vem da mandioca e o preparo é herança indígena.', 'Massa branca feita na frigideira, sem óleo.'],
      ['Cuscuz', 'Brasil', 'América do Sul', 'Lanche', 'Milho', 'Salgado', 3, 'Existe uma versão africana feita de trigo, bem diferente da brasileira.', 'Cozido no vapor e típico do café da manhã nordestino.'],
      ['Waffle', 'Bélgica', 'Europa', 'Sobremesa', 'Massa', 'Doce', 4, 'A versão mais famosa leva o nome da cidade de Bruxelas.', 'Massa assada com formato quadriculado.'],
      ['Kebab', 'Turquia', 'Ásia', 'Lanche', 'Carne', 'Salgado', 4, 'A carne gira em um espeto vertical durante horas.', 'Sanduíche de carne fatiada muito popular na Europa.'],
      ['Croissant', 'França', 'Europa', 'Lanche', 'Massa', 'Salgado', 4, 'Sua massa folhada pode levar mais de 24 horas para ficar pronta.', 'Pãozinho amanteigado em formato de meia-lua.']
    ]
  });

  /* ------------------------------------------------------------- ESPORTES */
  GG.registrarTema({
    id: 'esportes',
    contexto: 'esporte',
    nome: 'Esportes',
    emoji: '🏀',
    resumo: 'Modalidades olímpicas, radicais e tradicionais.',
    campos: [
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'continente', rotulo: 'Continente', tipo: 'texto' },
      { chave: 'formato', rotulo: 'Formato', tipo: 'texto' },
      { chave: 'olimpico', rotulo: 'Olímpico', tipo: 'texto' },
      { chave: 'ano', rotulo: 'Ano das primeiras regras', tipo: 'ano', tolerancia: 25 },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Futebol', 'Reino Unido', 'Europa', 'Coletivo', 'Sim', 1863, 5, 'As regras modernas foram escritas em um pub de Londres.', 'É o esporte mais praticado do planeta.'],
      ['Basquete', 'Estados Unidos', 'América do Norte', 'Coletivo', 'Sim', 1891, 5, 'Foi inventado com cestos de pêssego pregados na parede de um ginásio.', 'A cesta fica a 3,05 metros do chão.'],
      ['Vôlei', 'Estados Unidos', 'América do Norte', 'Coletivo', 'Sim', 1895, 5, 'Foi criado como alternativa menos violenta ao basquete.', 'Cada equipe pode dar no máximo três toques na bola.'],
      ['Vôlei de praia', 'Estados Unidos', 'América do Norte', 'Coletivo', 'Sim', 1920, 4, 'Virou olímpico apenas em 1996, em Atlanta.', 'Disputado na areia, com duas pessoas de cada lado.'],
      ['Tênis', 'Reino Unido', 'Europa', 'Individual', 'Sim', 1874, 5, 'A contagem de pontos usa 15, 30 e 40, provavelmente por causa de um relógio antigo.', 'Wimbledon é seu torneio mais tradicional.'],
      ['Natação', 'Reino Unido', 'Europa', 'Individual', 'Sim', 1837, 4, 'O nado borboleta só foi reconhecido como estilo próprio em 1952.', 'Tem quatro estilos oficiais em competição.'],
      ['Judô', 'Japão', 'Ásia', 'Individual', 'Sim', 1882, 4, 'Seu nome significa caminho suave.', 'Usa faixas coloridas para indicar graduação.'],
      ['Karatê', 'Japão', 'Ásia', 'Individual', 'Sim', 1922, 4, 'Nasceu na ilha de Okinawa antes de se espalhar pelo Japão.', 'Golpes de mão aberta e chutes, com quimono branco.'],
      ['Jiu-jítsu brasileiro', 'Brasil', 'América do Sul', 'Individual', 'Não', 1925, 4, 'Foi adaptado por uma família brasileira a partir do jiu-jítsu japonês.', 'Ficou famoso por levar a luta para o chão.'],
      ['Capoeira', 'Brasil', 'América do Sul', 'Individual', 'Não', 1800, 4, 'Foi proibida por lei no Brasil até 1940.', 'Mistura luta, dança e música em uma roda.'],
      ['Skate', 'Estados Unidos', 'América do Norte', 'Individual', 'Sim', 1950, 4, 'Foi criado por surfistas que queriam treinar em dias sem ondas.', 'Estreou nas Olimpíadas em Tóquio.'],
      ['Surfe', 'Estados Unidos', 'América do Norte', 'Individual', 'Sim', 1900, 4, 'Já era praticado por povos polinésios séculos antes de virar esporte.', 'Praticado em pé sobre uma prancha no mar.'],
      ['Rugby', 'Reino Unido', 'Europa', 'Coletivo', 'Sim', 1845, 4, 'A bola oval nasceu porque as primeiras bolas eram feitas de bexiga de porco.', 'O passe só pode ser feito para trás.'],
      ['Críquete', 'Reino Unido', 'Europa', 'Coletivo', 'Não', 1744, 4, 'É o segundo esporte com mais fãs no mundo, principalmente na Ásia.', 'Uma partida tradicional pode durar cinco dias.'],
      ['Beisebol', 'Estados Unidos', 'América do Norte', 'Coletivo', 'Sim', 1845, 4, 'É o esporte mais popular do Japão fora das artes marciais.', 'Rebatedor, arremessador e quatro bases.'],
      ['Handebol', 'Alemanha', 'Europa', 'Coletivo', 'Sim', 1917, 4, 'Já foi disputado ao ar livre com onze jogadores de cada lado.', 'Parecido com o futebol, mas jogado com as mãos.'],
      ['Futsal', 'Uruguai', 'América do Sul', 'Coletivo', 'Não', 1930, 4, 'Nasceu em quadras de associações cristãs de moços na América do Sul.', 'Futebol de quadra com cinco jogadores por equipe.'],
      ['Boxe', 'Grécia', 'Europa', 'Individual', 'Sim', -688, 4, 'Já fazia parte dos Jogos Olímpicos da Grécia Antiga.', 'Disputado em um ringue quadrado, com luvas.'],
      ['Maratona', 'Grécia', 'Europa', 'Individual', 'Sim', 1896, 4, 'A distância de 42,195 km foi fixada por causa do trajeto usado em Londres, em 1908.', 'Sua origem é a lenda de um mensageiro grego.'],
      ['Ginástica artística', 'Alemanha', 'Europa', 'Individual', 'Sim', 1811, 4, 'A nota máxima 10 deixou de existir nas competições em 2006.', 'Tem provas de solo, trave e barras.'],
      ['Xadrez', 'Índia', 'Ásia', 'Individual', 'Não', 600, 4, 'Existem mais partidas possíveis do que átomos no universo observável.', 'Cada jogador começa com dezesseis peças.'],
      ['Ciclismo', 'França', 'Europa', 'Individual', 'Sim', 1868, 4, 'Sua competição mais famosa dura três semanas e percorre a França.', 'Disputado sobre duas rodas.'],
      ['Fórmula 1', 'Reino Unido', 'Europa', 'Individual', 'Não', 1950, 5, 'Uma troca de quatro pneus leva menos de três segundos.', 'Carros de corrida com asas e pneus descobertos.']
    ]
  });
})(window.GG);
