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


  GG.destacarItens('objetos', [
    'Cadeira', 'Mesa', 'Cama', 'Sofá', 'Geladeira', 'Fogão', 'Televisão', 'Celular',
    'Computador', 'Panela', 'Prato', 'Copo', 'Garfo', 'Faca', 'Colher', 'Caneta', 'Lápis',
    'Borracha', 'Caderno', 'Mochila', 'Livro', 'Tesoura', 'Régua', 'Vassoura', 'Espelho',
    'Toalha', 'Escova de dente', 'Chave', 'Óculos', 'Bicicleta', 'Bola', 'Martelo',
    'Lâmpada', 'Ventilador', 'Relógio de parede', 'Guarda-chuva', 'Travesseiro', 'Chinelo'
  ]);

  GG.destacarItens('profissoes', [
    'Professor', 'Médico', 'Enfermeiro', 'Dentista', 'Policial', 'Bombeiro', 'Motorista',
    'Cozinheiro', 'Padeiro', 'Pedreiro', 'Eletricista', 'Mecânico', 'Veterinário', 'Advogado',
    'Engenheiro civil', 'Arquiteto', 'Programador', 'Jornalista', 'Cabeleireiro', 'Vendedor',
    'Agricultor', 'Pescador', 'Piloto de avião', 'Astronauta', 'Ator', 'Músico', 'Youtuber',
    'Faxineiro', 'Carteiro', 'Entregador'
  ]);

  GG.destacarItens('elementos', [
    'Oxigênio', 'Hidrogênio', 'Carbono', 'Nitrogênio', 'Ferro', 'Ouro', 'Prata', 'Cobre',
    'Alumínio', 'Cálcio', 'Sódio', 'Potássio', 'Cloro', 'Enxofre', 'Hélio', 'Chumbo',
    'Mercúrio', 'Zinco', 'Magnésio', 'Silício', 'Fósforo', 'Urânio', 'Platina', 'Neônio',
    'Iodo', 'Lítio', 'Flúor', 'Estanho', 'Níquel', 'Argônio'
  ]);

  GG.destacarItens('corpo', [
    'Coração', 'Cérebro', 'Pulmão', 'Estômago', 'Fígado', 'Rim', 'Pele', 'Olho', 'Ouvido',
    'Nariz', 'Língua', 'Dente', 'Crânio', 'Coluna vertebral', 'Costela',
    'Fêmur', 'Sangue', 'Intestino delgado', 'Intestino grosso', 'Bexiga', 'Bíceps',
    'Cerebelo', 'Medula espinhal', 'Neurônio', 'Diafragma', 'Apêndice', 'Traqueia', 'Esôfago'
  ]);

  GG.destacarItens('astros', [
    'Sol', 'Terra', 'Lua', 'Marte', 'Júpiter', 'Saturno', 'Vênus', 'Mercúrio', 'Urano',
    'Netuno', 'Plutão', 'Via Láctea', 'Cometa Halley', 'Buraco negro', 'Eclipse solar',
    'Cruzeiro do Sul', 'Ursa Maior', 'Órion', 'Estrela Polar', 'Apollo 11',
    'Estação Espacial Internacional', 'Telescópio Hubble', 'Sirius', 'Anéis de Saturno'
  ]);

  GG.destacarItens('dinossauros', [
    'Tiranossauro Rex', 'Velociraptor', 'Tricerátops', 'Estegossauro', 'Braquiossauro',
    'Espinossauro', 'Pterodáctilo', 'Diplodoco', 'Anquilossauro', 'Alossauro',
    'Mamute-lanoso', 'Tigre-dente-de-sabre', 'Megalodonte', 'Mosassauro', 'Giganotossauro',
    'Parassaurolofo', 'Carnotauro', 'Iguanodonte', 'Dodô', 'Arqueopterix'
  ]);

  GG.destacarItens('plantas', [
    'Rosa', 'Girassol', 'Orquídea', 'Cacto', 'Samambaia', 'Bambu', 'Eucalipto', 'Coqueiro',
    'Mangueira', 'Bananeira', 'Ipê-amarelo', 'Pau-brasil', 'Cafeeiro', 'Cana-de-açúcar',
    'Milho (planta)', 'Arroz (planta)', 'Trigo', 'Soja', 'Tulipa', 'Margarida', 'Babosa',
    'Hortelã', 'Vitória-régia', 'Sequoia', 'Cerejeira', 'Espada-de-são-jorge'
  ]);

  GG.destacarItens('transporte', [
    'Carro', 'Bicicleta', 'Ônibus', 'Avião', 'Moto', 'Trem', 'Metrô', 'Navio de cruzeiro',
    'Caminhão', 'Helicóptero', 'Barco a motor', 'Skate', 'Patinete', 'Foguete', 'Submarino',
    'Balão de ar quente', 'Cavalo', 'Trator', 'Ambulância', 'Van', 'Canoa', 'Elevador'
  ]);

  GG.destacarItens('roupas', [
    'Camiseta', 'Calça jeans', 'Tênis', 'Chinelo', 'Meia', 'Boné', 'Vestido', 'Saia',
    'Bermuda', 'Short', 'Moletom', 'Jaqueta', 'Blusa de frio', 'Sapato social', 'Bota',
    'Óculos de sol', 'Mochila', 'Cinto', 'Luva', 'Cachecol', 'Pijama', 'Uniforme escolar',
    'Biquíni', 'Sunga', 'Chuteira', 'Relógio de pulso'
  ]);

  GG.destacarItens('invencoes', [
    'Roda', 'Lâmpada elétrica', 'Telefone', 'Avião', 'Automóvel', 'Internet', 'Celular',
    'Computador eletrônico', 'Televisão', 'Rádio', 'Imprensa', 'Papel', 'Vacina',
    'Penicilina', 'Máquina a vapor', 'Fotografia', 'Cinema', 'Raio-X', 'Bússola', 'Escrita',
    'GPS', 'Wi-Fi', 'Geladeira elétrica', 'Micro-ondas', 'Chuveiro elétrico', 'Videogame'
  ]);

  GG.destacarItens('mitologia', [
    'Zeus', 'Poseidon', 'Hades', 'Atena', 'Afrodite', 'Ares', 'Apolo', 'Medusa', 'Minotauro',
    'Héracles', 'Pégaso', 'Sereia', 'Fênix', 'Unicórnio', 'Thor', 'Odin', 'Loki', 'Anúbis',
    'Rá', 'Ísis', 'Saci-Pererê', 'Curupira', 'Iara', 'Cuca', 'Mula sem cabeça', 'Lobisomem',
    'Boitatá', 'Vampiro', 'Dragão europeu', 'Cérbero'
  ]);

  GG.destacarItens('obras', [
    'Mona Lisa', 'A Noite Estrelada', 'O Grito', 'A Última Ceia', 'A Criação de Adão',
    'Davi', 'O Pensador', 'Guernica', 'A Persistência da Memória', 'Os Girassóis',
    'Abaporu', 'Os Retirantes', 'Vênus de Milo', 'Máscara de Tutancâmon', 'O Beijo',
    'Moça com Brinco de Pérola', 'A Grande Onda de Kanagawa', 'Menina com Balão'
  ]);

  GG.destacarItens('estados', ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná']);

  GG.destacarItens('bandeiras', [
    'Bandeira do Brasil', 'Bandeira dos Estados Unidos', 'Bandeira do Japão',
    'Bandeira da Argentina', 'Bandeira de Portugal', 'Bandeira da França',
    'Bandeira da Itália', 'Bandeira da Alemanha', 'Bandeira do Reino Unido',
    'Bandeira do Canadá', 'Bandeira da China', 'Bandeira da Espanha', 'Bandeira do México'
  ]);

  GG.destacarItens('linguas', [
    'Português', 'Inglês', 'Espanhol', 'Francês', 'Italiano', 'Alemão', 'Japonês',
    'Mandarim', 'Coreano', 'Russo', 'Árabe', 'Hindi', 'Latim', 'Libras', 'Guarani', 'Grego'
  ]);

  GG.destacarItens('dc', [
    'Batman', 'Superman', 'Mulher-Maravilha', 'Coringa', 'Arlequina', 'Flash', 'Aquaman',
    'Lanterna Verde', 'Robin', 'Mulher-Gato', 'Pinguim', 'Lex Luthor', 'Espantalho', 'Bane',
    'Ciborgue', 'Supergirl', 'Charada', 'Duas-Caras', 'Hera Venenosa', 'Shazam',
    'Arqueiro Verde', 'Darkseid', 'Ravena', 'Estelar', 'Mutano', 'Nightwing'
  ]);

  GG.destacarItens('starwars', [
    'Darth Vader', 'Luke Skywalker', 'Yoda', 'Leia Organa', 'Han Solo', 'Chewbacca',
    'Obi-Wan Kenobi', 'R2-D2', 'C-3PO', 'Anakin Skywalker', 'Imperador Palpatine',
    'Darth Maul', 'Boba Fett', 'Grogu', 'Din Djarin', 'Rey', 'Kylo Ren', 'BB-8',
    'Ahsoka Tano', 'Jabba the Hutt', 'Stormtrooper', 'Padmé Amidala', 'Lando Calrissian'
  ]);

  GG.destacarItens('senhordosaneis', [
    'Frodo Bolseiro', 'Gandalf', 'Aragorn', 'Legolas', 'Gimli', 'Gollum', 'Sauron',
    'Samwise Gamgi', 'Bilbo Bolseiro', 'Saruman', 'Galadriel', 'Smaug', 'Thorin Escudo de Carvalho',
    'Arwen', 'Elrond', 'Boromir', 'Éowyn', 'Barbárvore', 'Merry Brandebuque', 'Pippin Tûk'
  ]);

  GG.destacarItens('disney', [
    'Mickey Mouse', 'Pato Donald', 'Pateta', 'Minnie Mouse', 'Simba', 'Elsa', 'Anna', 'Olaf',
    'Stitch', 'Woody', 'Buzz Lightyear', 'Nemo', 'Dory', 'Cinderela', 'Branca de Neve',
    'Ariel', 'Bela', 'Aladdin', 'Gênio', 'Mulan', 'Moana', 'Rapunzel', 'Peter Pan',
    'Sininho', 'Malévola', 'Scar', 'Mufasa', 'Pinóquio', 'Dumbo', 'Bambi', 'Tio Patinhas'
  ]);

  GG.destacarItens('marvel', [
    'Homem-Aranha', 'Homem de Ferro', 'Capitão América', 'Thor', 'Hulk', 'Viúva Negra',
    'Pantera Negra', 'Doutor Estranho', 'Deadpool', 'Wolverine', 'Thanos', 'Loki',
    'Feiticeira Escarlate', 'Visão', 'Groot', 'Rocket Raccoon', 'Star-Lord', 'Gamora',
    'Venom', 'Duende Verde', 'Doutor Octopus', 'Magneto', 'Professor Xavier', 'Tempestade',
    'Capitã Marvel', 'Homem-Formiga', 'Demolidor', 'Justiceiro', 'Miles Morales', 'Ultron'
  ]);
})(window.GG);
