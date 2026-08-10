/* =========================================================================
   BASE DE DADOS — CRIAÇÕES
   Temas: Carros, Empresas
   ========================================================================= */

(function (GG) {
  'use strict';

  /* --------------------------------------------------------------- CARROS */
  GG.registrarTema({
    id: 'carros',
    nome: 'Carros',
    emoji: '🚗',
    resumo: 'Populares, esportivos e clássicos que viraram cultura pop.',
    campos: [
      { chave: 'criador', rotulo: 'Marca', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'ano', rotulo: 'Ano de lançamento', tipo: 'ano', tolerancia: 12 },
      { chave: 'tipo', rotulo: 'Categoria', tipo: 'lista' },
      { chave: 'preco', rotulo: 'Faixa de preço', tipo: 'ordinal', escala: 'preco' }
    ],
    itens: [
      ['Fusca', 'Volkswagen', 'Alemanha', 1938, ['Popular', 'Compacto'], 1, 'Foi produzido por mais de 60 anos e passou de 21 milhões de unidades.', 'Tem o motor na traseira e formato arredondado.'],
      ['Kombi', 'Volkswagen', 'Alemanha', 1950, ['Utilitário'], 2, 'A última unidade do mundo saiu de uma fábrica brasileira, em 2013.', 'Virou símbolo de viagens, mudanças e bandas de rock.'],
      ['Volkswagen Gol', 'Volkswagen', 'Brasil', 1980, ['Popular', 'Compacto'], 1, 'Foi o carro mais vendido do Brasil por 27 anos seguidos.', 'Projetado no Brasil para substituir um clássico arredondado.'],
      ['Fiat Uno', 'Fiat', 'Itália', 1983, ['Popular', 'Compacto'], 1, 'A versão brasileira ganhou o apelido de quadrado.', 'Carro pequeno, econômico e teimoso de tão durável.'],
      ['Chevrolet Opala', 'Chevrolet', 'Brasil', 1968, ['Sedã'], 2, 'Foi o primeiro automóvel de passeio projetado e produzido pela marca no Brasil.', 'Clássico brasileiro dos anos 1970, com motor seis cilindros.'],
      ['Hyundai HB20', 'Hyundai', 'Brasil', 2012, ['Popular', 'Compacto'], 1, 'Foi desenvolvido especificamente para o mercado brasileiro.', 'As letras do nome vêm de Hyundai e Brasil.'],
      ['Toyota Corolla', 'Toyota', 'Japão', 1966, ['Sedã'], 2, 'É o carro mais vendido da história, com mais de 50 milhões de unidades.', 'Virou sinônimo de sedã confiável.'],
      ['Honda Civic', 'Honda', 'Japão', 1972, ['Sedã'], 2, 'Foi um dos primeiros carros a atender leis rígidas de poluição sem catalisador.', 'Queridinho de quem gosta de personalizar o carro.'],
      ['Nissan Skyline GT-R', 'Nissan', 'Japão', 1969, ['Esportivo'], 4, 'Ganhou o apelido de Godzilla depois de dominar as pistas australianas.', 'Ícone dos jogos de corrida e dos filmes de velocidade.'],
      ['Ford Mustang', 'Ford', 'Estados Unidos', 1964, ['Esportivo'], 3, 'Vendeu um milhão de unidades em menos de dois anos.', 'Criou a categoria conhecida como pony car.'],
      ['Chevrolet Camaro', 'Chevrolet', 'Estados Unidos', 1966, ['Esportivo'], 3, 'Virou personagem em uma franquia de filmes sobre robôs.', 'Nasceu como resposta direta a um rival famoso.'],
      ['Jeep Willys', 'Jeep', 'Estados Unidos', 1941, ['Utilitário'], 2, 'Foi projetado às pressas para a Segunda Guerra Mundial.', 'Criou a ideia de veículo com tração nas quatro rodas.'],
      ['Tesla Model S', 'Tesla', 'Estados Unidos', 2012, ['Sedã', 'Elétrico'], 4, 'Recebe atualizações de software pela internet, como um celular.', 'Provou que carro elétrico podia ser rápido e desejável.'],
      ['Ferrari F40', 'Ferrari', 'Itália', 1987, ['Esportivo'], 5, 'Foi o último modelo aprovado pessoalmente pelo fundador da marca.', 'Fabricado para comemorar os 40 anos da montadora.'],
      ['Lamborghini Aventador', 'Lamborghini', 'Itália', 2011, ['Esportivo'], 5, 'Suas portas se abrem para cima, em formato de tesoura.', 'Leva o nome de um touro de arena.'],
      ['Porsche 911', 'Porsche', 'Alemanha', 1963, ['Esportivo'], 4, 'Mantém o motor traseiro e a silhueta original há mais de sessenta anos.', 'Esportivo alemão identificado por três números.'],
      ['Mini Cooper', 'Mini', 'Reino Unido', 1959, ['Compacto'], 3, 'Foi criado por causa de uma crise do petróleo, para gastar pouco combustível.', 'Pequeno por fora, surpreendentemente espaçoso por dentro.'],
      ['Land Rover Defender', 'Land Rover', 'Reino Unido', 1948, ['Utilitário'], 4, 'Seu desenho original foi rabiscado na areia de uma praia.', 'Feito para atravessar lama, deserto e montanha.'],
      ['Rolls-Royce Phantom', 'Rolls-Royce', 'Reino Unido', 1925, ['Luxo'], 5, 'O símbolo do capô se recolhe sozinho para evitar furtos.', 'Sinônimo de carro de luxo com motorista.'],
      ['McLaren F1', 'McLaren', 'Reino Unido', 1992, ['Esportivo'], 5, 'O compartimento do motor é forrado com ouro, por ser ótimo isolante térmico.', 'Tem o volante no meio e três lugares.'],
      ['DeLorean DMC-12', 'DeLorean', 'Reino Unido', 1981, ['Esportivo'], 3, 'A empresa faliu logo depois do lançamento, mas o cinema o eternizou.', 'Virou máquina do tempo no cinema.'],
      ['Bugatti Veyron', 'Bugatti', 'França', 2005, ['Esportivo'], 5, 'Consome mais de 100 litros por hora em velocidade máxima.', 'Foi o primeiro carro de produção a passar de 400 km/h.']
    ]
  });

  /* ------------------------------------------------------------- EMPRESAS */
  GG.registrarTema({
    id: 'empresas',
    nome: 'Empresas',
    emoji: '🏢',
    resumo: 'Marcas que fazem parte do dia a dia — e como elas começaram.',
    campos: [
      { chave: 'ano', rotulo: 'Ano de fundação', tipo: 'ano', tolerancia: 15 },
      { chave: 'criador', rotulo: 'Fundação', tipo: 'texto' },
      { chave: 'origem', rotulo: 'País de origem', tipo: 'pais' },
      { chave: 'tipo', rotulo: 'Setor', tipo: 'lista' },
      { chave: 'popularidade', rotulo: 'Popularidade', tipo: 'ordinal', escala: 'popularidade' }
    ],
    itens: [
      ['Apple', 1976, 'Steve Jobs e Steve Wozniak', 'Estados Unidos', ['Tecnologia'], 5, 'Começou na garagem da casa da família de um dos fundadores.', 'Seu logotipo é uma fruta mordida.'],
      ['Microsoft', 1975, 'Bill Gates e Paul Allen', 'Estados Unidos', ['Tecnologia'], 5, 'Ganhou o mundo ao licenciar um sistema operacional para computadores pessoais.', 'Criou o sistema com janelas mais usado do mundo.'],
      ['Google', 1998, 'Larry Page e Sergey Brin', 'Estados Unidos', ['Tecnologia'], 5, 'O nome veio de um erro de digitação da palavra googol.', 'Nasceu como um projeto de doutorado sobre buscas na internet.'],
      ['Amazon', 1994, 'Jeff Bezos', 'Estados Unidos', ['Comércio', 'Tecnologia'], 5, 'Começou vendendo apenas livros pela internet.', 'Seu logotipo tem uma seta que vai do A ao Z.'],
      ['Meta', 2004, 'Mark Zuckerberg', 'Estados Unidos', ['Tecnologia', 'Redes sociais'], 5, 'Foi criada dentro de um dormitório universitário e mudou de nome em 2021.', 'É dona do Instagram e do WhatsApp.'],
      ['Netflix', 1997, 'Reed Hastings e Marc Randolph', 'Estados Unidos', ['Entretenimento', 'Tecnologia'], 5, 'Começou alugando DVDs enviados pelo correio.', 'Popularizou a maratona de episódios.'],
      ['Nintendo', 1889, 'Fusajiro Yamauchi', 'Japão', ['Jogos'], 5, 'Antes dos videogames, fabricava cartas de baralho.', 'É mais antiga que o automóvel popular.'],
      ['Sony', 1946, 'Masaru Ibuka e Akio Morita', 'Japão', ['Tecnologia', 'Entretenimento'], 5, 'Seu tocador de fitas portátil mudou a forma como o mundo ouve música.', 'É dona de um console com o nome de estação.'],
      ['Samsung', 1938, 'Lee Byung-chul', 'Coreia do Sul', ['Tecnologia'], 5, 'Começou como uma pequena empresa de comércio de alimentos secos.', 'Hoje fabrica desde chips até navios.'],
      ['Toyota', 1937, 'Kiichiro Toyoda', 'Japão', ['Automotivo'], 5, 'Seu sistema de produção é estudado em escolas de administração do mundo todo.', 'Nasceu de uma fábrica de teares.'],
      ['Coca-Cola', 1892, 'Asa Candler', 'Estados Unidos', ['Alimentos'], 5, 'A receita original foi criada por um farmacêutico em 1886.', 'Ajudou a popularizar a imagem atual do Papai Noel.'],
      ["McDonald's", 1940, 'Irmãos McDonald', 'Estados Unidos', ['Alimentos'], 5, 'O sistema de cozinha em linha de montagem foi a verdadeira invenção da marca.', 'Seu símbolo são dois arcos dourados.'],
      ['Nike', 1964, 'Phil Knight e Bill Bowerman', 'Estados Unidos', ['Vestuário'], 5, 'O logotipo foi comprado de uma estudante por 35 dólares.', 'Leva o nome da deusa grega da vitória.'],
      ['Adidas', 1949, 'Adolf Dassler', 'Alemanha', ['Vestuário'], 5, 'Nasceu de uma briga entre dois irmãos, que fundaram marcas concorrentes.', 'Sua marca registrada são três listras.'],
      ['Disney', 1923, 'Walt Disney e Roy Disney', 'Estados Unidos', ['Entretenimento'], 5, 'Seu primeiro grande sucesso foi um curta com um rato em um barco a vapor.', 'Hoje é dona da Marvel, da Pixar e de Star Wars.'],
      ['Lego', 1932, 'Ole Kirk Christiansen', 'Dinamarca', ['Brinquedos'], 5, 'O nome vem de uma expressão dinamarquesa que significa brincar bem.', 'Suas peças de 1958 ainda encaixam nas atuais.'],
      ['Ferrari', 1939, 'Enzo Ferrari', 'Itália', ['Automotivo'], 5, 'O cavalo do símbolo foi inspirado no avião de um piloto da Primeira Guerra.', 'Sua cor tradicional é o vermelho de corrida italiano.'],
      ['Spotify', 2006, 'Daniel Ek', 'Suécia', ['Tecnologia', 'Música'], 5, 'Foi criado como resposta legal à pirataria de música.', 'Toda dezembro entrega uma retrospectiva musical aos usuários.'],
      ['Ikea', 1943, 'Ingvar Kamprad', 'Suécia', ['Móveis'], 4, 'Foi fundada por um adolescente de 17 anos.', 'Vende móveis que o cliente monta em casa.'],
      ['ByteDance', 2012, 'Zhang Yiming', 'China', ['Tecnologia', 'Redes sociais'], 5, 'Seu algoritmo de recomendação é considerado o segredo do sucesso.', 'É a empresa dona do TikTok.'],
      ['Petrobras', 1953, 'Governo brasileiro', 'Brasil', ['Energia'], 4, 'Foi criada sob o lema o petróleo é nosso.', 'É referência mundial em exploração em águas profundas.'],
      ['Embraer', 1969, 'Ozires Silva', 'Brasil', ['Aeronáutica'], 4, 'Está entre as maiores fabricantes de aviões do mundo.', 'Empresa brasileira que fabrica jatos comerciais.'],
      ['Natura', 1969, 'Luiz Seabra', 'Brasil', ['Cosméticos'], 4, 'Começou com uma pequena loja em São Paulo e virou multinacional.', 'Ficou conhecida pela venda por consultoras.'],
      ['Havaianas', 1962, 'Alpargatas', 'Brasil', ['Vestuário'], 4, 'Foi inspirada em uma sandália japonesa feita de palha de arroz.', 'Sua propaganda dizia que não deformavam nem soltavam as tiras.'],
      ['Nubank', 2013, 'David Vélez', 'Brasil', ['Finanças'], 4, 'Tornou-se um dos maiores bancos digitais do mundo em número de clientes.', 'Ficou conhecido por um cartão roxo sem anuidade.']
    ]
  });
})(window.GG);
