/* =========================================================================
   DESTAQUES — QUEM ENTRA NOS SORTEIOS DE FÁCIL E MÉDIO
   -------------------------------------------------------------------------
   No Fácil a resposta sai dos 25 itens mais conhecidos; no Médio, dos 60.
   Onde o tema tem campo de popularidade, esse ranking se resolve sozinho.
   Onde não tem (animais, países, carros, lugares...), a "fama" é a ordem de
   cadastro — e foi por isso que o cachorro, cadastrado lá no fim do arquivo,
   nunca era sorteado.

   Este arquivo resolve isso na mão: os nomes abaixo vão para o começo da
   lista do tema, na ordem em que aparecem aqui.

   IMPORTANTE: carregue-o DEPOIS de todos os arquivos de dados.
   Para promover um item novo, basta acrescentar o nome na lista certa.
   ========================================================================= */

(function (GG) {
  'use strict';

  GG.destacarItens('animais', [
    'Cachorro', 'Gato', 'Cavalo', 'Vaca', 'Galinha', 'Porco', 'Ovelha', 'Coelho',
    'Leão', 'Tigre', 'Elefante-africano', 'Girafa', 'Macaco-prego', 'Gorila',
    'Urso-polar', 'Panda-gigante', 'Zebra', 'Cobra coral', 'Jacaré-do-pantanal',
    'Tubarão-branco', 'Baleia-azul', 'Golfinho', 'Tartaruga-marinha', 'Pinguim-imperador',
    'Águia', 'Coruja', 'Papagaio', 'Pato', 'Peru', 'Rato', 'Sapo-cururu', 'Aranha caranguejeira',
    'Abelha', 'Formiga', 'Borboleta-monarca', 'Mosquito', 'Barata', 'Onça-pintada',
    'Capivara', 'Preguiça', 'Tucano', 'Arara-azul', 'Canguru', 'Coala', 'Camelo',
    'Lobo-cinzento', 'Raposa', 'Esquilo', 'Morcego', 'Polvo', 'Camarão', 'Peixe-palhaço',
    'Cervo', 'Hipopótamo', 'Rinoceronte', 'Guepardo', 'Lontra', 'Foca', 'Orca', 'Anta'
  ]);

  GG.destacarItens('paises', [
    'Brasil', 'Estados Unidos', 'Argentina', 'Portugal', 'Japão', 'China', 'França',
    'Itália', 'Espanha', 'Alemanha', 'Reino Unido', 'México', 'Canadá', 'Austrália',
    'Rússia', 'Índia', 'Coreia do Sul', 'Egito', 'África do Sul', 'Chile', 'Uruguai',
    'Colômbia', 'Peru', 'Paraguai', 'Bolívia', 'Venezuela', 'Cuba', 'Jamaica',
    'Holanda', 'Suíça', 'Suécia', 'Noruega', 'Grécia', 'Turquia', 'Nigéria', 'Marrocos',
    'Arábia Saudita', 'Israel', 'Tailândia', 'Indonésia', 'Nova Zelândia', 'Irlanda',
    'Bélgica', 'Áustria', 'Polônia', 'Dinamarca', 'Finlândia', 'Ucrânia', 'Vietnã', 'Filipinas'
  ]);

  GG.destacarItens('comidas', [
    'Arroz', 'Feijão', 'Arroz com feijão', 'Pão', 'Macarrão', 'Pizza', 'Hambúrguer',
    'Batata frita', 'Ovo frito', 'Leite', 'Queijo', 'Chocolate', 'Banana', 'Maçã',
    'Laranja', 'Melancia', 'Morango', 'Uva', 'Tomate', 'Carne assada', 'Frango grelhado',
    'Churrasco', 'Feijoada', 'Coxinha', 'Pão de queijo', 'Brigadeiro', 'Açaí', 'Tapioca',
    'Cuscuz', 'Salada', 'Sopa', 'Sorvete', 'Bolo de chocolate', 'Pipoca', 'Refrigerante',
    'Água', 'Suco de laranja natural', 'Café', 'Café com leite', 'Achocolatado',
    'Misto-quente', 'Hot dog', 'Lasanha', 'Sushi', 'Tacos', 'Milho', 'Batata', 'Mandioca',
    'Pudim de leite', 'Bolo de cenoura'
  ]);

  GG.destacarItens('carros', [
    'Fusca', 'Kombi', 'Volkswagen Gol', 'Fiat Uno', 'Chevrolet Onix', 'Ford Ka',
    'Volkswagen Saveiro', 'Fiat Strada', 'Hyundai HB20', 'Renault Sandero',
    'Chevrolet Corsa', 'Fiat Palio', 'Toyota Corolla', 'Honda Civic', 'Toyota Hilux',
    'Ford Mustang', 'Chevrolet Camaro', 'Ferrari F40', 'Lamborghini Aventador',
    'Porsche 911', 'Tesla Model 3', 'Jeep Willys', 'Mini Cooper', 'BMW M3',
    'Mercedes-Benz Classe A', 'Chevrolet Opala', 'Chevrolet Chevette', 'Fiat 147'
  ]);

  GG.destacarItens('lugares', [
    'Cristo Redentor', 'Torre Eiffel', 'Muralha da China', 'Estátua da Liberdade',
    'Pirâmides de Gizé', 'Coliseu', 'Machu Picchu', 'Taj Mahal', 'Big Ben',
    'Pão de Açúcar', 'Praia de Copacabana', 'Cataratas do Iguaçu', 'Floresta Amazônica',
    'Estádio Maracanã', 'Museu do Louvre', 'Times Square', 'Monte Everest',
    'Grand Canyon', 'Ópera de Sydney', 'Torre de Pisa', 'Sagrada Família', 'Stonehenge',
    'Fernando de Noronha', 'Lençóis Maranhenses', 'Avenida Paulista', 'Congresso Nacional',
    'Grande Barreira de Corais', 'Deserto do Saara', 'Monte Fuji', 'Cidade Proibida'
  ]);

  GG.destacarItens('minecraft', [
    'Creeper', 'Diamante', 'Enderman', 'Zumbi', 'Esqueleto', 'Terra', 'Grama', 'Pedra',
    'Ferro', 'Ouro', 'Obsidiana', 'Bedrock', 'TNT', 'Picareta de diamante', 'Espada de ferro',
    'Baú', 'Bancada de trabalho', 'Fornalha', 'Cama', 'Tocha', 'Aldeão', 'Vaca', 'Porco',
    'Galinha', 'Ovelha', 'Lobo', 'Ender Dragon', 'Wither', 'Netherite', 'Esmeralda'
  ]);

  GG.destacarItens('lol', [
    'Yasuo', 'Ahri', 'Lux', 'Jinx', 'Teemo', 'Garen', 'Darius', 'Zed', 'Lee Sin',
    'Master Yi', 'Ashe', 'Thresh', 'Blitzcrank', 'Ezreal', 'Caitlyn', 'Vi', 'Katarina',
    'Malphite', 'Amumu', 'Soraka', 'Jhin', 'Akali', 'Riven', 'Draven', 'Miss Fortune',
    'Nasus', 'Veigar', 'Aatrox', 'Sett', 'Yuumi'
  ]);

  GG.destacarItens('pokemon', [
    'Pikachu', 'Charizard', 'Bulbasaur', 'Charmander', 'Squirtle', 'Eevee', 'Mewtwo',
    'Mew', 'Gengar', 'Snorlax', 'Jigglypuff', 'Meowth', 'Psyduck', 'Magikarp', 'Gyarados',
    'Dragonite', 'Lucario', 'Greninja', 'Gardevoir', 'Rayquaza', 'Lugia', 'Ho-Oh',
    'Blastoise', 'Venusaur', 'Machamp', 'Onix', 'Ditto', 'Lapras', 'Umbreon', 'Sylveon'
  ]);

  GG.destacarItens('brasileirao', [
    'Flamengo', 'Corinthians', 'São Paulo', 'Palmeiras', 'Santos', 'Vasco da Gama',
    'Grêmio', 'Internacional', 'Cruzeiro', 'Atlético Mineiro', 'Botafogo', 'Fluminense',
    'Bahia', 'Sport', 'Vitória', 'Ceará', 'Fortaleza', 'Athletico Paranaense', 'Coritiba',
    'Goiás', 'Chapecoense', 'Náutico', 'Santa Cruz', 'Paysandu', 'Remo', 'Avaí',
    'Figueirense', 'América Mineiro', 'Ponte Preta', 'Guarani'
  ]);

  GG.destacarItens('naruto', [
    'Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake', 'Itachi Uchiha',
    'Gaara', 'Rock Lee', 'Hinata Hyuga', 'Shikamaru Nara', 'Jiraiya', 'Tsunade',
    'Orochimaru', 'Madara Uchiha', 'Pain', 'Obito Uchiha', 'Minato Namikaze', 'Neji Hyuga',
    'Might Guy', 'Killer Bee', 'Zabuza Momochi', 'Haku', 'Deidara', 'Sasori', 'Kisame Hoshigaki',
    'Boruto Uzumaki', 'Sarada Uchiha', 'Konohamaru', 'Ino Yamanaka', 'Choji Akimichi', 'Temari'
  ]);

  GG.destacarItens('onepiece', [
    'Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Sanji', 'Usopp', 'Tony Tony Chopper',
    'Nico Robin', 'Franky', 'Brook', 'Jinbe', 'Portgas D. Ace', 'Shanks', 'Barba Branca',
    'Trafalgar Law', 'Sabo', 'Boa Hancock', 'Dracule Mihawk', 'Crocodile',
    'Donquixote Doflamingo', 'Kaido', 'Big Mom', 'Barba Negra', 'Buggy', 'Monkey D. Garp',
    'Rei Gold Roger', 'Enel', 'Vivi', 'Yamato', 'Eustass Kid', 'Rob Lucci'
  ]);

  GG.destacarItens('dragonball', [
    'Goku', 'Vegeta', 'Gohan', 'Piccolo', 'Krilin', 'Freeza', 'Cell', 'Majin Boo',
    'Trunks', 'Goten', 'Bulma', 'Mestre Kame', 'Broly', 'Beerus', 'Whis', 'Yamcha',
    'Tenshinhan', 'Androide 18', 'Androide 17', 'Mr. Satan', 'Chi-Chi', 'Videl',
    'Gogeta', 'Vegetto', 'Gotenks', 'Jiren', 'Zamasu', 'Goku Black', 'Shenlong', 'Bardock'
  ]);

  GG.destacarItens('harrypotter', [
    'Harry Potter', 'Hermione Granger', 'Rony Weasley', 'Lorde Voldemort', 'Alvo Dumbledore',
    'Severo Snape', 'Draco Malfoy', 'Rúbeo Hagrid', 'Sirius Black', 'Bellatrix Lestrange',
    'Dobby', 'Luna Lovegood', 'Neville Longbottom', 'Gina Weasley', 'Minerva McGonagall',
    'Remo Lupin', 'Dolores Umbridge', 'Cedrico Diggory', 'Fred Weasley', 'Jorge Weasley',
    'Edwiges', 'Dementador', 'Bicuço', 'Nagini', 'Basilisco', 'Fawkes', 'Molly Weasley',
    'Lúcio Malfoy', 'Cho Chang', 'Olho-Tonto Moody'
  ]);

  GG.destacarItens('marvel', [
    'Homem-Aranha', 'Homem de Ferro', 'Capitão América', 'Thor', 'Hulk', 'Viúva Negra',
    'Pantera Negra', 'Doutor Estranho', 'Deadpool', 'Wolverine', 'Thanos', 'Loki',
    'Feiticeira Escarlate', 'Visão', 'Groot', 'Rocket Raccoon', 'Star-Lord', 'Gamora',
    'Venom', 'Duende Verde', 'Doutor Octopus', 'Magneto', 'Professor Xavier', 'Tempestade',
    'Capitã Marvel', 'Homem-Formiga', 'Demolidor', 'Justiceiro', 'Miles Morales', 'Ultron'
  ]);
})(window.GG);
