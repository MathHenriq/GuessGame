/* =========================================================================
   NÚCLEO — MODO "EU GOSTO DE"
   -------------------------------------------------------------------------
   O aluno digita algo que gosta ("Marvel", "futebol", "Harry Potter") e o
   sistema procura essa palavra em TODA a base — nomes, gêneros, criadores,
   países e curiosidades — para sugerir categorias e desafios sob medida.

   Duas fontes de sugestão:
   1. Busca automática: funciona para qualquer palavra, sem cadastro prévio.
   2. Léxico curado: apelidos e temas populares ganham pacotes com nome bonito.
   ========================================================================= */

(function (GG) {
  'use strict';

  /* Pacotes escritos à mão para os assuntos mais pedidos em sala.
     Para criar um novo: acrescente um objeto com `termos` e `pacotes`. */
  var LEXICO = [
    {
      termos: ['marvel', 'vingadores', 'homem de ferro', 'homem aranha', 'thanos', 'hulk'],
      pacotes: [
        { temaId: 'marvel', rotulo: 'Universo Marvel completo', termo: '' },
        { temaId: 'personagens', rotulo: 'Heróis e vilões dos quadrinhos', termo: 'quadrinhos' },
        { temaId: 'filmes', rotulo: 'Filmes de super-herói', termo: 'super-herói' },
        { temaId: 'atores', rotulo: 'Elenco dos blockbusters', termo: '' }
      ]
    },
    {
      termos: ['harry potter', 'hogwarts', 'bruxo', 'magia'],
      pacotes: [
        { temaId: 'harrypotter', rotulo: 'Mundo bruxo de Hogwarts', termo: '' },
        { temaId: 'livros', rotulo: 'Livros de fantasia', termo: 'fantasia' },
        { temaId: 'filmes', rotulo: 'Filmes de fantasia', termo: 'fantasia' },
        { temaId: 'personagens', rotulo: 'Personagens de livros', termo: 'livro' }
      ]
    },
    {
      termos: ['futebol', 'bola', 'copa', 'flamengo', 'corinthians', 'gol', 'brasileirao', 'time'],
      pacotes: [
        { temaId: 'brasileirao', rotulo: 'Clubes do futebol brasileiro', termo: '' },
        { temaId: 'jogadores', rotulo: 'Craques do futebol', termo: '' },
        { temaId: 'esportes', rotulo: 'Esportes coletivos', termo: 'coletivo' },
        { temaId: 'paises', rotulo: 'Países que amam futebol', termo: '' }
      ]
    },
    {
      termos: ['anime', 'mangá', 'manga', 'otaku', 'naruto', 'one piece', 'dragon ball', 'goku'],
      pacotes: [
        { temaId: 'naruto', rotulo: 'Ninjas de Naruto', termo: '' },
        { temaId: 'onepiece', rotulo: 'Piratas de One Piece', termo: '' },
        { temaId: 'dragonball', rotulo: 'Guerreiros de Dragon Ball', termo: '' },
        { temaId: 'animes', rotulo: 'Animes clássicos e atuais', termo: '' },
        { temaId: 'personagens', rotulo: 'Personagens de anime', termo: 'anime' },
        { temaId: 'paises', rotulo: 'Ásia no mapa', termo: '' }
      ]
    },
    {
      termos: ['kpop', 'k-pop', 'bts', 'música', 'musica', 'show', 'cantora', 'cantor'],
      pacotes: [
        { temaId: 'musicos', rotulo: 'Ídolos da música', termo: '' },
        { temaId: 'paises', rotulo: 'De onde vem cada ritmo', termo: '' }
      ]
    },
    {
      termos: ['games', 'game', 'videogame', 'jogar', 'minecraft', 'fortnite', 'free fire',
        'roblox', 'lol', 'league of legends', 'pokemon', 'pokémon'],
      pacotes: [
        { temaId: 'lol', rotulo: 'Campeões do League of Legends', termo: '' },
        { temaId: 'pokemon', rotulo: 'Pokémon de todas as gerações', termo: '' },
        { temaId: 'minecraft', rotulo: 'Blocos, mobs e itens do Minecraft', termo: '' },
        { temaId: 'jogos', rotulo: 'Games de todas as épocas', termo: '' },
        { temaId: 'personagens', rotulo: 'Personagens de videogame', termo: 'jogo' },
        { temaId: 'empresas', rotulo: 'Empresas por trás dos jogos', termo: '' }
      ]
    },
    {
      termos: ['animal', 'animais', 'bicho', 'natureza', 'cachorro', 'gato'],
      pacotes: [
        { temaId: 'animais', rotulo: 'Bichos do mundo todo', termo: '' },
        { temaId: 'lugares', rotulo: 'Maravilhas naturais', termo: 'natural' }
      ]
    },
    {
      termos: ['comida', 'comer', 'cozinha', 'lanche', 'doce', 'pizza'],
      pacotes: [
        { temaId: 'comidas', rotulo: 'Cardápio internacional', termo: '' },
        { temaId: 'paises', rotulo: 'De qual país é esse prato?', termo: '' }
      ]
    },
    {
      termos: ['história', 'historia', 'guerra', 'brasil colônia', 'império'],
      pacotes: [
        { temaId: 'historicos', rotulo: 'Personalidades históricas', termo: '' },
        { temaId: 'lugares', rotulo: 'Lugares históricos', termo: 'histórico' },
        { temaId: 'livros', rotulo: 'Clássicos da literatura', termo: '' }
      ]
    },
    {
      termos: ['ciência', 'ciencia', 'espaço', 'espaco', 'química', 'fisica', 'física', 'tecnologia'],
      pacotes: [
        { temaId: 'cientistas', rotulo: 'Mentes que mudaram o mundo', termo: '' },
        { temaId: 'empresas', rotulo: 'Gigantes da tecnologia', termo: 'tecnologia' }
      ]
    },
    {
      termos: ['arte', 'desenhar', 'pintura', 'grafite'],
      pacotes: [
        { temaId: 'artistas', rotulo: 'Artistas e movimentos', termo: '' },
        { temaId: 'lugares', rotulo: 'Museus e monumentos', termo: 'monumento' }
      ]
    },
    {
      termos: ['carro', 'carros', 'velocidade', 'corrida', 'fórmula 1', 'formula 1'],
      pacotes: [
        { temaId: 'carros', rotulo: 'Carros de rua e de pista', termo: '' },
        { temaId: 'esportes', rotulo: 'Esportes a motor', termo: '' }
      ]
    },
    {
      termos: ['série', 'serie', 'netflix', 'streaming', 'tv'],
      pacotes: [
        { temaId: 'series', rotulo: 'Séries para maratonar', termo: '' },
        { temaId: 'atores', rotulo: 'Quem está na tela', termo: '' }
      ]
    }
  ];

  function termosDaBusca(texto) {
    var limpo = GG.normalizar(texto)
      .replace(/^eu gosto de /, '')
      .replace(/^gosto de /, '');
    var completo = limpo.trim();
    var partes = completo.split(' ').filter(function (p) { return p.length >= 3; });
    // A expressão inteira tem prioridade sobre as palavras soltas.
    return completo.length >= 3 ? [completo].concat(partes) : partes;
  }

  function criarFiltro(termo) {
    if (!termo) return null;
    var alvo = GG.normalizar(termo);
    return function (item) {
      return item.chaves.some(function (chave) { return chave.indexOf(alvo) !== -1; });
    };
  }

  function contarNoTema(tema, termos) {
    var vistos = {};
    var total = 0;
    tema.itens.forEach(function (item) {
      var bate = termos.some(function (termo) {
        return item.chaves.some(function (chave) { return chave.indexOf(termo) !== -1; });
      });
      if (bate && !vistos[item.id]) { vistos[item.id] = true; total++; }
    });
    return total;
  }

  /**
   * Gera sugestões de desafio a partir do que o aluno digitou.
   * @returns {{termo: string, sugestoes: Array, encontrouAlgo: boolean}}
   */
  GG.sugerir = function (texto) {
    var termos = termosDaBusca(texto);
    var sugestoes = [];
    var jaAdicionados = {};

    function adicionar(sugestao) {
      var chave = sugestao.temaId + '|' + (sugestao.termo || '');
      if (jaAdicionados[chave]) return;
      jaAdicionados[chave] = true;
      sugestoes.push(sugestao);
    }

    // 1. Léxico curado.
    LEXICO.forEach(function (entrada) {
      var combina = entrada.termos.some(function (t) {
        var alvo = GG.normalizar(t);
        return termos.some(function (termo) {
          return termo.indexOf(alvo) !== -1 || alvo.indexOf(termo) !== -1;
        });
      });
      if (!combina) return;
      entrada.pacotes.forEach(function (pacote) {
        var tema = GG.indiceTemas[pacote.temaId];
        if (!tema) return;
        adicionar({
          temaId: tema.id,
          tema: tema,
          titulo: pacote.rotulo,
          motivo: 'Combina com o que você curte',
          termo: pacote.termo || '',
          filtro: criarFiltro(pacote.termo),
          curado: true
        });
      });
    });

    // 2. Busca automática na base inteira.
    var achados = GG.temas.map(function (tema) {
      return { tema: tema, total: contarNoTema(tema, termos) };
    }).filter(function (r) { return r.total > 0; })
      .sort(function (a, b) { return b.total - a.total; });

    achados.slice(0, 4).forEach(function (achado) {
      var usarFiltro = achado.total >= 5;
      adicionar({
        temaId: achado.tema.id,
        tema: achado.tema,
        titulo: usarFiltro
          ? achado.tema.nome + ' ligados a "' + texto.trim() + '"'
          : 'Desafio de ' + achado.tema.nome,
        motivo: achado.total + (achado.total === 1 ? ' item combina' : ' itens combinam') + ' com sua busca',
        termo: usarFiltro ? texto : '',
        filtro: usarFiltro ? criarFiltro(texto) : null
      });
    });

    var encontrouAlgo = sugestoes.length > 0;

    // 3. Nada encontrado? Sugere categorias variadas para não deixar o aluno parado.
    if (!encontrouAlgo) {
      GG.embaralhar(GG.temas).slice(0, 3).forEach(function (tema) {
        adicionar({
          temaId: tema.id,
          tema: tema,
          titulo: 'Que tal ' + tema.nome + '?',
          motivo: 'Ainda não temos esse assunto na base — experimente esta categoria',
          termo: '',
          filtro: null
        });
      });
    }

    return { termo: texto.trim(), sugestoes: sugestoes.slice(0, 6), encontrouAlgo: encontrouAlgo };
  };
})(window.GG);
