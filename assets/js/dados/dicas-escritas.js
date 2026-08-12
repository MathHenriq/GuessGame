/* =========================================================================
   DICAS ESCRITAS À MÃO
   -------------------------------------------------------------------------
   Estas são as dicas que falam DO ITEM, e não do funil de eliminação: a
   frase que um professor diria em voz alta para a turma pensar. São elas que
   aparecem em primeiro lugar quando existem, na frente de qualquer dica
   automática.

   COMO ACRESCENTAR
       GG.adicionarDicas('temaId', {
         'Nome exato do item': 'A dica, sem citar o nome.'
       });

   Três regras ao escrever:
     1. nunca cite o nome do item (nem parte dele);
     2. descreva o que ele FAZ, de onde vem ou por que é conhecido — algo que
        não esteja em nenhuma coluna do tabuleiro;
     3. uma frase curta, que caiba no cartão e a turma leia de longe.

   Item que ainda não tem dica aqui não fica sem nada: o jogo monta sozinho
   o "retrato falado" a partir das colunas. Esta lista é o degrau a mais.
   ========================================================================= */

(function (GG) {
  'use strict';

  GG.adicionarDicas('lol', {
    'Yasuo': 'Espadachim errante que ergue uma parede de vento e foi acusado de um crime que não cometeu.',
    'Ahri': 'Raposa de nove caudas que rouba a essência de quem encanta.',
    'Lux': 'Nobre que esconde da própria família o poder de dobrar a luz.',
    'Jinx': 'Criminosa caótica de Zaun, com metralhadora, foguete e nenhum plano.',
    'Teemo': 'Pequeno explorador que planta cogumelos venenosos pelo mapa.',
    'Garen': 'Soldado de armadura pesada que gira a espada como um pião.',
    'Darius': 'Comandante de machado gigante que executa quem está quase morto.',
    'Zed': 'Mestre das sombras que criou clones e traiu o próprio mentor.',
    'Lee Sin': 'Monge cego que luta a golpes de chute e enxerga pelo som.',
    'Master Yi': 'Último discípulo de uma escola de espadas que ataca em velocidade cega.',
    'Ashe': 'Arqueira de gelo que lidera um povo do norte e enxerga longe no mapa.',
    'Thresh': 'Carcereiro que prende almas numa lanterna e puxa inimigos com corrente.'
  });

  GG.adicionarDicas('pokemon', {
    'Pikachu': 'Guarda eletricidade nas bochechas e virou o mascote da franquia.',
    'Charizard': 'Forma final do inicial de fogo, ganhou asas e cospe chamas.',
    'Bulbasaur': 'Inicial que carrega uma semente nas costas desde que nasce.',
    'Charmander': 'Se a chama da ponta do rabo apagar, ele morre.',
    'Squirtle': 'Inicial de água que se esconde dentro do próprio casco.',
    'Eevee': 'Famoso por poder evoluir para muitas formas diferentes.',
    'Mewtwo': 'Foi criado em laboratório a partir do DNA de outro Pokémon.',
    'Mew': 'Diz a lenda que dele descendem todos os outros.',
    'Gengar': 'Sombra sorridente que se esconde atrás de você e rouba o calor.',
    'Snorlax': 'Dorme atravessado no caminho e só acorda para comer.',
    'Jigglypuff': 'Canta uma canção que faz todo mundo dormir — e depois rabisca a cara de quem dormiu.',
    'Meowth': 'O da dupla vilã fala língua de gente e tem uma moeda na testa.'
  });

  GG.adicionarDicas('minecraft', {
    'Creeper': 'Chega em silêncio por trás, chia e explode levando sua construção junto.',
    'Diamante': 'Aparece bem no fundo da caverna e vira a melhor picareta do jogo.',
    'Enderman': 'Alto, preto, teleporta — e fica furioso se você olhar nos olhos dele.',
    'Zumbi': 'Aparece à noite, queima no sol e bate na porta para entrar.',
    'Esqueleto': 'Atira flechas de longe e também pega fogo quando amanhece.',
    'Terra': 'O primeiro bloco que todo mundo quebra, na mão mesmo.',
    'Grama': 'Bloco verde por cima e marrom por baixo, onde os animais aparecem.',
    'Pedra': 'O que mais existe embaixo do chão; vira o material das primeiras ferramentas.',
    'Ferro': 'Minério cinza que precisa ir ao forno antes de virar barra.',
    'Ouro': 'Bonito, brilhante e ruim de ferramenta: quebra rápido demais.',
    'Obsidiana': 'Nasce quando água encontra lava e leva uma eternidade para quebrar.',
    'Bedrock': 'O bloco do fundo do mundo, que nenhuma picareta quebra.'
  });

  GG.adicionarDicas('naruto', {
    'Naruto Uzumaki': 'Órfão que carrega uma raposa selada por dentro e quer ser o líder da vila.',
    'Sasuke Uchiha': 'Sobrevivente de um clã exterminado pelo próprio irmão, foge da vila atrás de vingança.',
    'Sakura Haruno': 'A terceira do time, virou médica-ninja de força descomunal.',
    'Kakashi Hatake': 'Professor de máscara que lê livrinho no meio da missão e copia o jutsu dos outros.',
    'Itachi Uchiha': 'Matou o próprio clã numa noite — e só depois se soube o motivo.',
    'Gaara': 'Controla areia, dormia com medo do que tinha dentro de si e virou líder do deserto.',
    'Rock Lee': 'Não usa técnicas de energia: treina taijutsu até cair, com pesos nas pernas.',
    'Hinata Hyuga': 'Herdeira tímida de um clã de olhos que enxergam através das coisas.',
    'Shikamaru Nara': 'Preguiçoso genial que manipula sombras e joga xadrez com as batalhas.',
    'Jiraiya': 'Eremita dos sapos, escritor de livros picantes e mestre do protagonista.',
    'Orochimaru': 'Obcecado por imortalidade, troca de corpo e tem cara de cobra.',
    'Madara Uchiha': 'Fundador lendário que voltou dos mortos para refazer o mundo à sua maneira.'
  });

  GG.adicionarDicas('onepiece', {
    'Monkey D. Luffy': 'Comeu a fruta da borracha e usa um chapéu de palha emprestado.',
    'Roronoa Zoro': 'Luta com três espadas, uma delas na boca, e se perde em linha reta.',
    'Nami': 'Navegadora ladra que desenha mapas e prevê o tempo.',
    'Sanji': 'Cozinheiro que só luta com as pernas para não estragar as mãos.',
    'Tony Tony Chopper': 'Rena médica que virou gente depois de comer uma fruta.',
    'Nico Robin': 'Arqueóloga caçada desde criança por saber ler pedras antigas.',
    'Portgas D. Ace': 'Irmão de juramento do protagonista, virou fogo e morreu protegendo-o.',
    'Shanks': 'Ruivo de um braço só que deixou o chapéu com o menino.',
    'Barba Branca': 'O homem mais forte do mundo, capitão que tratava a tripulação como filhos.',
    'Trafalgar Law': 'Cirurgião que corta e troca as coisas de lugar dentro de uma sala.',
    'Dracule Mihawk': 'O maior espadachim do mundo, com uma lâmina do tamanho dele.',
    'Rei Gold Roger': 'Foi executado em praça pública e começou a era dos piratas com uma frase.'
  });

  GG.adicionarDicas('dragonball', {
    'Goku': 'Achado ainda bebê no mato por um velho, tem rabo de macaco e come demais.',
    'Vegeta': 'Príncipe orgulhoso do seu povo, virou rival eterno do protagonista.',
    'Gohan': 'Filho estudioso do protagonista, mais forte que o pai quando fica com raiva.',
    'Piccolo': 'De vilão virou professor do menino; é verde e tem antenas.',
    'Krilin': 'Baixinho careca sem nariz, o humano mais forte do grupo.',
    'Freeza': 'Tirano do espaço que destruiu o planeta natal dos saiyajins.',
    'Cell': 'Feito em laboratório com células de vários guerreiros, absorve androides.',
    'Majin Boo': 'Rosa, infantil e faminto — transforma gente em doce.',
    'Trunks': 'Veio do futuro de espada na mão para avisar de uma tragédia.',
    'Bulma': 'Inventora que construiu o radar das esferas e nunca luta.',
    'Mestre Kame': 'Velho de óculos escuros e casco de tartaruga que ensinou o golpe da onda.',
    'Beerus': 'Deus felino da destruição que dorme por décadas e adora comida.'
  });

  GG.adicionarDicas('harrypotter', {
    'Harry Potter': 'Ficou órfão bebê e carrega uma cicatriz em forma de raio na testa.',
    'Hermione Granger': 'Nascida trouxa, sabe todos os feitiços de cor e vive na biblioteca.',
    'Rony Weasley': 'O caçula ruivo de uma família enorme, melhor amigo do protagonista.',
    'Lorde Voldemort': 'Dividiu a alma em pedaços para não morrer e perdeu o nariz no caminho.',
    'Alvo Dumbledore': 'Diretor de barba branca comprida que gosta de balas de limão.',
    'Severo Snape': 'Professor de poções, frio com os alunos, amava a mãe do protagonista.',
    'Draco Malfoy': 'Loiro rico e arrogante que implica com o trio desde o primeiro trem.',
    'Rúbeo Hagrid': 'Gigante de coração mole, guarda-caça e criador de bichos perigosos.',
    'Sirius Black': 'Padrinho do protagonista, fugiu da prisão dos bruxos e vira um cão preto.',
    'Bellatrix Lestrange': 'Bruxa de cabelo revolto, a mais fiel e mais cruel serva do vilão.',
    'Dobby': 'Criatura de orelhas grandes que ganhou liberdade com uma meia.',
    'Luna Lovegood': 'Menina sonhadora que acredita em criaturas que ninguém mais enxerga.'
  });

  GG.adicionarDicas('marvel', {
    'Homem-Aranha': 'Adolescente picado por um aracnídeo radioativo, aprendeu que poder vem com responsabilidade.',
    'Homem de Ferro': 'Bilionário que construiu a primeira armadura numa caverna, com sucata.',
    'Capitão América': 'Soldado franzino virou super-humano num experimento e ficou congelado décadas.',
    'Thor': 'Príncipe de outro reino, controla trovões e só ergue o martelo quem for digno.',
    'Hulk': 'Cientista que vira um gigante verde quando perde a paciência.',
    'Viúva Negra': 'Espiã russa treinada desde criança, sem nenhum superpoder.',
    'Pantera Negra': 'Rei de um país africano escondido, rico em um metal que absorve impacto.',
    'Doutor Estranho': 'Cirurgião arrogante que perdeu as mãos e foi estudar magia no Nepal.',
    'Deadpool': 'Mercenário desfigurado que se cura de tudo e conversa com o público.',
    'Wolverine': 'Garras que saem das mãos, esqueleto de metal e memória apagada.',
    'Thanos': 'Quer equilibrar o universo eliminando metade dele, com uma manopla de joias.',
    'Loki': 'Irmão adotivo do deus do trovão, mestre de ilusões e traições.'
  });

  GG.adicionarDicas('dc', {
    'Batman': 'Viu os pais serem mortos num beco e não tem nenhum superpoder — só dinheiro e disciplina.',
    'Superman': 'Último filho de um planeta destruído, criado por fazendeiros e fraco contra uma pedra verde.',
    'Mulher-Maravilha': 'Vem de uma ilha só de guerreiras e usa um laço que obriga a dizer a verdade.',
    'Coringa': 'Sorriso permanente, cabelo verde e nenhuma origem confirmada.',
    'Arlequina': 'Era psiquiatra do vilão e virou a parceira dele, de marreta na mão.',
    'Flash': 'Atingido por um raio no laboratório, corre mais rápido que o tempo.',
    'Mulher-Gato': 'Ladra de joias que vive na corda bamba entre herói e vilã.',
    'Lex Luthor': 'Empresário careca e genial, obcecado por derrubar o herói de capa vermelha.',
    'Aquaman': 'Fala com animais marinhos e é rei de um reino submerso.',
    'Lanterna Verde': 'Um anel materializa o que ele imaginar — se a força de vontade bastar.',
    'Robin': 'O ajudante adolescente do herói morcego.',
    'Pinguim': 'Baixinho de cartola e guarda-chuva que manda no crime da cidade.'
  });

  GG.adicionarDicas('starwars', {
    'Darth Vader': 'Respiração pesada, armadura preta e uma revelação de parentesco no meio da luta.',
    'Luke Skywalker': 'Cresceu num planeta deserto sonhando em ser piloto e destruiu a estação de combate.',
    'Yoda': 'Pequeno, verde, velho de novecentos anos e fala com a frase ao contrário.',
    'Leia Organa': 'Princesa e líder da rebelião, escondeu plantas roubadas dentro de um andróide.',
    'Han Solo': 'Contrabandista debochado, dono da nave mais rápida da galáxia.',
    'Chewbacca': 'Peludo enorme que só rosna e é copiloto do contrabandista.',
    'Obi-Wan Kenobi': 'Mestre que treinou o pai e depois o filho, e virou eremita no deserto.',
    'R2-D2': 'Andróide baixinho em forma de latão, só apita e conserta a nave por fora.',
    'C-3PO': 'Andróide dourado, protocolar, medroso e fluente em milhões de idiomas.',
    'Anakin Skywalker': 'Menino escravo e piloto prodígio que virou o maior vilão da saga.',
    'Imperador Palpatine': 'Político que manipulou os dois lados da guerra para virar imperador.',
    'Darth Maul': 'Rosto tatuado de vermelho e preto, chifres e sabre de duas pontas.'
  });

  GG.adicionarDicas('senhordosaneis', {
    'Frodo Bolseiro': 'Recebeu do tio a tarefa de destruir um anel numa montanha de fogo.',
    'Gandalf': 'Mago de chapéu pontudo e cajado que volta mais poderoso depois de cair.',
    'Aragorn': 'Andarilho do norte que era o herdeiro do trono e escondia isso.',
    'Legolas': 'Elfo arqueiro que nunca erra e desce escada de escudo.',
    'Gimli': 'Anão barbudo de machado que conta quantos inimigos derrubou.',
    'Gollum': 'Criatura magra que fala sozinha e chama o anel de "meu precioso".',
    'Sauron': 'O senhor escuro que virou um olho em chamas no alto de uma torre.',
    'Samwise Gamgi': 'Jardineiro fiel que carrega o amigo montanha acima no fim.',
    'Bilbo Bolseiro': 'Achou o anel numa caverna e escreveu o livro da própria aventura.',
    'Saruman': 'Mago branco que trocou de lado e derrubou uma floresta inteira.',
    'Galadriel': 'Senhora élfica de uma floresta dourada, dona de um espelho que mostra o futuro.',
    'Smaug': 'Dragão que dorme sobre a montanha de ouro que roubou dos anões.'
  });

  GG.adicionarDicas('disney', {
    'Mickey Mouse': 'O rato de calção vermelho e luvas brancas que virou o símbolo do estúdio.',
    'Pato Donald': 'Marinheiro de temperamento explosivo e voz difícil de entender.',
    'Pateta': 'Cão desengonçado de chapéu amassado, pai do Max.',
    'Minnie Mouse': 'Laço na cabeça e namorada do mascote do estúdio.',
    'Simba': 'Filhote que fugiu culpado pela morte do pai e voltou para retomar o trono.',
    'Elsa': 'Irmã mais velha que congela tudo que toca e se isola num castelo de gelo.',
    'Anna': 'Irmã caçula destemida que atravessa a montanha atrás da irmã.',
    'Olaf': 'Boneco de neve que sonha com o verão e perde o nariz de cenoura.',
    'Stitch': 'Experimento alienígena azul que cai no Havaí e vira família.',
    'Woody': 'Boneco caubói de corda nas costas, líder dos brinquedos do quarto.',
    'Buzz Lightyear': 'Boneco espacial que demorou a aceitar que era um brinquedo.',
    'Nemo': 'Peixinho de nadadeira menor levado por um mergulhador para um aquário.'
  });

  GG.adicionarDicas('brasileirao', {
    'Flamengo': 'Rubro-negro carioca da maior torcida do país, do Maracanã.',
    'Corinthians': 'Time do povo paulistano, fundado por operários no Bom Retiro.',
    'São Paulo': 'Tricolor paulista com três títulos mundiais e um estádio no Morumbi.',
    'Palmeiras': 'Verde paulistano fundado por imigrantes italianos, dono de vários brasileiros.',
    'Grêmio': 'Tricolor gaúcho da Arena, rival do colorado na dupla da capital.',
    'Internacional': 'Colorado gaúcho do Beira-Rio, campeão da Libertadores em 2006.',
    'Cruzeiro': 'Celeste mineiro do Mineirão, fundado por italianos como Palestra Itália.',
    'Atlético Mineiro': 'Alvinegro mineiro do Galo, rival do celeste na capital.',
    'Santos': 'Alvinegro da Vila Belmiro, onde o Rei do futebol jogou a vida toda.',
    'Vasco da Gama': 'Cruz-maltino carioca que foi o primeiro grande a escalar negros e pobres.',
    'Botafogo': 'Estrela solitária carioca, do Nilton Santos.',
    'Fluminense': 'Tricolor carioca das Laranjeiras, o mais antigo dos grandes do Rio.'
  });

  GG.adicionarDicas('elementos', {
    'Oxigênio': 'Sem ele não há respiração nem fogo; é um quinto do ar que você puxa agora.',
    'Hidrogênio': 'O mais leve e o mais abundante do universo; alimenta as estrelas.',
    'Carbono': 'A base de toda a vida — e também do grafite e do diamante.',
    'Nitrogênio': 'Quase quatro quintos do ar, e mesmo assim quase não reage.',
    'Ferro': 'Faz o sangue ser vermelho e o núcleo do planeta ser magnético.',
    'Ouro': 'Não enferruja nunca; por isso virou moeda e joia em toda civilização.',
    'Prata': 'O melhor condutor de eletricidade que existe, e escurece com o tempo.',
    'Cobre': 'Avermelhado, mora dentro de praticamente todo fio elétrico da sua casa.',
    'Alumínio': 'Leve, prateado e reciclável — a lata da bebida é feita dele.',
    'Cálcio': 'O que endurece ossos e dentes, e também a casca do ovo.',
    'Sódio': 'Explode em contato com água, mas na mesa vira sal de cozinha.',
    'Potássio': 'A banana é famosa por ele; regula os batimentos do coração.'
  });

  GG.adicionarDicas('corpo', {
    'Coração': 'Bate cerca de cem mil vezes por dia sem pedir licença.',
    'Cérebro': 'Consome um quinto de toda a energia do corpo e não sente dor.',
    'Pulmão': 'São dois, e o esquerdo é menor para caber o vizinho que bate.',
    'Estômago': 'Produz um ácido tão forte que dissolveria metal.',
    'Fígado': 'O único órgão grande capaz de se regenerar sozinho.',
    'Rim': 'São dois filtros que limpam todo o sangue várias vezes por dia.',
    'Pele': 'O maior órgão do corpo, e ele se renova inteiro em cerca de um mês.',
    'Olho': 'Recebe a imagem de cabeça para baixo; quem desvira é o cérebro.',
    'Ouvido': 'Além de escutar, é ele que segura o seu equilíbrio.',
    'Nariz': 'Aquece e filtra o ar, e responde por quase todo o sabor da comida.',
    'Língua': 'Músculo que mistura, empurra e ainda distingue o doce do amargo.',
    'Dente': 'Coberto pelo material mais duro que o corpo humano produz.'
  });

  GG.adicionarDicas('astros', {
    'Sol': 'Uma estrela comum vista de perto; a luz dele leva oito minutos para chegar.',
    'Terra': 'O único lugar conhecido com água líquida na superfície e vida.',
    'Lua': 'Sempre mostra a mesma face, e é quem puxa as marés.',
    'Marte': 'Vermelho por causa da ferrugem no solo, tem o maior vulcão conhecido.',
    'Júpiter': 'O maior de todos, com uma tempestade que dura séculos.',
    'Saturno': 'Famoso pelos anéis de gelo e pedra, e é tão leve que boiaria.',
    'Vênus': 'O mais quente, coberto por nuvens de ácido, e gira ao contrário.',
    'Mercúrio': 'O menor e o mais próximo da estrela; o ano dele dura 88 dias.',
    'Urano': 'Gira deitado, como uma bola rolando na órbita.',
    'Netuno': 'O mais distante, azul, com os ventos mais violentos conhecidos.',
    'Plutão': 'Perdeu o posto de planeta em 2006 e virou planeta-anão.',
    'Via Láctea': 'A espiral de bilhões de estrelas onde tudo isso mora.'
  });

  GG.adicionarDicas('dinossauros', {
    'Tiranossauro Rex': 'Mordida mais forte já registrada em terra, e bracinhos ridiculamente curtos.',
    'Velociraptor': 'Do tamanho de um peru, com penas e uma garra em foice em cada pé.',
    'Tricerátops': 'Três chifres na cara e um colar ósseo enorme atrás da cabeça.',
    'Estegossauro': 'Placas nas costas e quatro espinhos na ponta do rabo.',
    'Braquiossauro': 'Pescoço de girafa levado ao extremo: as patas da frente eram mais altas.',
    'Espinossauro': 'Tinha uma vela nas costas e caçava peixe dentro d’água.',
    'Pterodáctilo': 'Não era dinossauro: era o réptil que voava com asa de membrana.',
    'Diplodoco': 'Pescoço e rabo compridíssimos, o rabo estalava como chicote.',
    'Anquilossauro': 'Blindado como um tanque, com uma clava óssea na ponta do rabo.',
    'Alossauro': 'O grande predador do Jurássico, antes do primo mais famoso aparecer.',
    'Mamute-lanoso': 'Peludo, com presas curvas, viveu a era do gelo e não os dinossauros.',
    'Tigre-dente-de-sabre': 'Caninos gigantes para fora da boca; também é da era do gelo.'
  });

  GG.adicionarDicas('plantas', {
    'Rosa': 'Perfumada, cheia de espinhos, e cada cor virou um recado diferente.',
    'Girassol': 'Quando jovem, a flor acompanha o sol de leste a oeste ao longo do dia.',
    'Orquídea': 'Cresce agarrada em árvore sem ser parasita, e tem milhares de espécies.',
    'Cacto': 'Trocou as folhas por espinhos para não perder água.',
    'Samambaia': 'Não dá flor nem semente: se espalha por esporos, e é anterior aos dinossauros.',
    'Bambu': 'É uma grama gigante, e algumas espécies crescem quase um metro por dia.',
    'Eucalipto': 'Cresce rápido, dá papel e óleo, e bebe muita água do solo.',
    'Coqueiro': 'O fruto boia e atravessa o mar até brotar em outra praia.',
    'Mangueira': 'Copa larguíssima que dá sombra em praça, e fruta amarela no verão.',
    'Bananeira': 'Não é árvore: é uma erva gigante, e morre depois de dar cacho uma vez.',
    'Ipê-amarelo': 'Fica sem nenhuma folha e explode em flor amarela antes da chuva.',
    'Pau-brasil': 'Deu nome ao país; da madeira se tirava tinta vermelha.'
  });

  GG.adicionarDicas('geometria', {
    'Triângulo': 'A soma dos ângulos internos dá sempre 180 graus.',
    'Quadrado': 'Quatro lados iguais e quatro ângulos retos: o mais regular dos quadriláteros.',
    'Retângulo': 'Quatro ângulos retos, mas os lados vêm em dois tamanhos.',
    'Losango': 'Quatro lados iguais sem ângulo reto; as diagonais se cruzam em cruz.',
    'Trapézio': 'Só um par de lados paralelos — é a forma da saia de escola.',
    'Paralelogramo': 'Lados opostos paralelos e iguais, mas entortado.',
    'Pentágono': 'Cinco lados; virou nome do prédio militar mais famoso do mundo.',
    'Hexágono': 'Seis lados, a forma que as abelhas escolheram por gastar menos cera.',
    'Círculo': 'Todos os pontos ficam à mesma distância do centro.',
    'Cubo': 'Seis faces quadradas iguais: o dado comum tem essa forma.',
    'Esfera': 'Não tem face, nem aresta, nem vértice — e rola para qualquer lado.',
    'Pirâmide': 'Base poligonal e todas as faces laterais se encontrando num ponto só.'
  });

  GG.adicionarDicas('estados', {
    'São Paulo': 'Concentra a maior população e a maior economia do país.',
    'Rio de Janeiro': 'Foi capital do país por quase dois séculos.',
    'Minas Gerais': 'Faz divisa com mais estados que qualquer outro, e não tem praia.',
    'Bahia': 'Onde os portugueses desembarcaram, e o maior litoral do país.',
    'Paraná': 'Divide com o vizinho uma das maiores quedas d’água do mundo.',
    'Amazonas': 'O maior de todos em área, com capital que fica no meio da floresta.',
    'Pernambuco': 'Terra do frevo e do maracatu, com um arquipélago famoso no mar.',
    'Ceará': 'Dunas, jangadas e o humor que exporta comediante para o país inteiro.',
    'Rio Grande do Sul': 'O mais ao sul, de chimarrão e fronteira com dois países.',
    'Santa Catarina': 'Praia no litoral e frio de serra com neve no inverno.',
    'Goiás': 'Cerrado, sertanejo e a capital do país encravada dentro dele.',
    'Pará': 'Onde o maior rio do mundo encontra o mar; terra do açaí e do carimbó.'
  });

  GG.adicionarDicas('linguas', {
    'Português': 'Nasceu num cantinho da Europa e hoje tem mais falantes fora dela.',
    'Inglês': 'Virou a língua franca dos negócios, da aviação e da internet.',
    'Espanhol': 'A língua com mais países como idioma oficial nas Américas.',
    'Francês': 'Foi a língua da diplomacia antes do inglês; tem acento agudo, grave e circunflexo.',
    'Italiano': 'A língua da ópera e das indicações musicais nas partituras.',
    'Alemão': 'Junta palavras para formar outras enormes, e tem três gêneros.',
    'Japonês': 'Usa três sistemas de escrita ao mesmo tempo.',
    'Mandarim': 'A língua com mais falantes nativos do planeta, e é tonal.',
    'Coreano': 'O alfabeto foi inventado de propósito, por um rei, no século XV.',
    'Russo': 'Escrita cirílica, herdada de dois monges que criaram o alfabeto.',
    'Árabe': 'Escreve-se da direita para a esquerda, e as letras mudam de forma na palavra.',
    'Hindi': 'Escrita com uma linha contínua ligando o topo das letras.'
  });

  GG.adicionarDicas('objetos', {
    'Cadeira': 'Quatro pernas, um assento e um encosto — o resto é decoração.',
    'Mesa': 'Um tampo sobre pernas; a família se reúne em volta dele.',
    'Cama': 'Você passa cerca de um terço da vida inteira em cima dele.',
    'Sofá': 'Estofado da sala onde a família assiste televisão.',
    'Geladeira': 'Tira calor de dentro e joga atrás: por isso esquenta por trás.',
    'Fogão': 'Bocas, chama azul e um forno embaixo.',
    'Televisão': 'Entrou na sala no século XX e mudou o lugar dos móveis.',
    'Celular': 'Virou câmera, mapa, carteira e despertador ao mesmo tempo.',
    'Computador': 'Tem teclado, tela e um cérebro de silício que só entende zero e um.',
    'Panela': 'Vai ao fogo com cabo para você não se queimar.',
    'Prato': 'Raso ou fundo, é onde a comida chega à mesa.',
    'Copo': 'Cilindro aberto em cima; de vidro, faz barulho quando encosta em outro.'
  });

  GG.adicionarDicas('transporte', {
    'Carro': 'Quatro rodas, motor na frente e a invenção que redesenhou as cidades.',
    'Bicicleta': 'Duas rodas movidas pela sua própria perna, com corrente e pedal.',
    'Ônibus': 'Leva dezenas de pessoas por vez e para em pontos marcados.',
    'Avião': 'A asa gera sustentação porque o ar passa mais rápido por cima.',
    'Moto': 'Duas rodas com motor; ágil no trânsito e sem carroceria para proteger.',
    'Trem': 'Anda sobre trilhos de aço e puxa vagões enfileirados.',
    'Metrô': 'Trem urbano que corre embaixo da cidade, sem cruzar com o trânsito.',
    'Caminhão': 'Carrega a carga que abastece o mercado onde você compra.',
    'Helicóptero': 'Sobe na vertical e consegue ficar parado no ar.',
    'Barco a motor': 'Casco pequeno com hélice atrás, para rio, lago ou costa.',
    'Skate': 'Uma tábua sobre quatro rodinhas, empurrada com o pé.',
    'Patinete': 'Tábua com guidão; o elétrico tomou conta das calçadas.'
  });

  GG.adicionarDicas('invencoes', {
    'Roda': 'Antes dela, tudo pesado era arrastado.',
    'Lâmpada elétrica': 'Empurrou a noite para longe e mudou o horário de trabalho do mundo.',
    'Telefone': 'A primeira vez que uma voz atravessou distância por um fio.',
    'Avião': 'Dois irmãos e um brasileiro disputam até hoje quem fez o primeiro.',
    'Automóvel': 'Começou parecendo uma carruagem sem cavalo.',
    'Internet': 'Nasceu como rede militar e universitária para sobreviver a um ataque.',
    'Celular': 'A primeira ligação foi feita na rua, com um aparelho do tamanho de um tijolo.',
    'Computador eletrônico': 'O primeiro ocupava uma sala inteira e pesava toneladas.',
    'Televisão': 'Levou imagem em movimento para dentro de casa.',
    'Rádio': 'Antes dela, notícia só chegava impressa ou de boca em boca.',
    'Imprensa': 'Os tipos móveis fizeram o livro deixar de ser artigo de luxo.',
    'Papel': 'Inventado na China com fibra vegetal, substituiu o pergaminho de couro.'
  });

  GG.adicionarDicas('mitologia', {
    'Zeus': 'Rei do Olimpo, atira raios e trai a esposa a cada história.',
    'Poseidon': 'Tridente na mão, manda no mar e provoca terremotos.',
    'Hades': 'Ficou com o reino dos mortos no sorteio entre os três irmãos.',
    'Atena': 'Nasceu já adulta da cabeça do pai; é a deusa da estratégia e da coruja.',
    'Afrodite': 'Surgiu da espuma do mar e provocou uma guerra por causa de um pomo.',
    'Medusa': 'Cabelos de serpente; quem olhava nos olhos dela virava pedra.',
    'Minotauro': 'Metade homem, metade touro, preso num labirinto em Creta.',
    'Héracles': 'Cumpriu doze trabalhos impossíveis para pagar por uma tragédia.',
    'Sereia': 'Canto que atraía marinheiros para as pedras.',
    'Fênix': 'Queima até virar cinza e renasce dela.',
    'Unicórnio': 'Cavalo branco com um chifre em espiral na testa.',
    'Thor': 'Martelo, trovão e um pai caolho no panteão do norte.'
  });

  GG.adicionarDicas('obras', {
    'Mona Lisa': 'Um sorriso discreto atrás de vidro à prova de bala, no museu mais visitado do mundo.',
    'A Noite Estrelada': 'O céu em espirais, pintado da janela de um sanatório.',
    'O Grito': 'Uma figura de mãos no rosto sobre uma ponte e um céu alaranjado.',
    'A Última Ceia': 'Mural num refeitório de convento, com treze pessoas de um lado só da mesa.',
    'A Criação de Adão': 'Dois dedos que quase se tocam, pintados num teto de capela.',
    'Davi': 'Mármore de mais de cinco metros de um jovem antes do combate.',
    'O Pensador': 'Bronze de um homem nu, curvado, com o queixo apoiado na mão.',
    'Guernica': 'Preto e branco, denuncia o bombardeio de uma cidade espanhola.',
    'A Persistência da Memória': 'Relógios derretidos escorrendo numa paisagem deserta.',
    'Os Girassóis': 'Uma série de telas amarelas com flores num vaso simples.',
    'Abaporu': 'Um pé enorme, cabeça pequena e um cacto — deu origem ao movimento antropofágico.',
    'Vênus de Milo': 'Estátua grega de mármore que chegou até nós sem os braços.'
  });

  GG.adicionarDicas('fenomenos', {
    'Terremoto': 'A energia acumulada entre duas placas escapa de uma vez.',
    'Vulcão': 'Abertura por onde o material derretido lá de baixo chega à superfície.',
    'Tsunami': 'Onda gigante causada por um tremor no fundo do mar, não pelo vento.',
    'Furacão': 'Gira em torno de um olho calmo e só nasce sobre água morna.',
    'Tornado': 'Funil que desce da nuvem e destrói uma faixa estreita no chão.',
    'Enchente': 'Quando a chuva chega mais rápido do que o solo e o rio conseguem levar.',
    'Seca': 'A ausência prolongada do que normalmente cai do céu.',
    'Granizo': 'Gelo que sobe e desce dentro da nuvem até ficar pesado demais.',
    'Raio': 'Descarga elétrica entre a nuvem e o chão, mais quente que a superfície do Sol.',
    'Trovão': 'O som do ar que estourou de repente; chega depois porque é mais lento.',
    'Arco-íris': 'A luz branca se separa em cores ao atravessar gotas de água.',
    'Aurora boreal': 'Partículas do Sol batem no campo magnético e acendem o céu polar.'
  });
})(window.GG);
