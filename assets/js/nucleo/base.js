/* =========================================================================
   GUESS GAME — NÚCLEO / BASE
   -------------------------------------------------------------------------
   Registro de temas, escalas ordinais, mapa de continentes e utilitários.

   Tudo vive dentro do objeto global `GG` (nada de módulos ES) para que o
   jogo funcione ao abrir o index.html direto no navegador, com dois cliques,
   sem servidor local. Isso é proposital: professor em sala não deve precisar
   instalar nada.
   ========================================================================= */

(function (global) {
  'use strict';

  var GG = (global.GG = global.GG || {});

  /* ---------------------------------------------------------------------
     ESCALAS ORDINAIS
     Campos do tipo "ordinal" guardam um número de 1 a 5 nos dados e são
     traduzidos para texto na hora de exibir. Isso permite comparar
     "maior / menor" e mostrar setas ↑ ↓.
     --------------------------------------------------------------------- */
  GG.escalas = {
    popularidade: ['Baixa', 'Média', 'Alta', 'Muito alta', 'Mundial'],
    porte: ['Muito pequeno', 'Pequeno', 'Médio', 'Grande', 'Gigante'],
    populacao: ['Muito pequena', 'Pequena', 'Média', 'Grande', 'Enorme'],
    preco: ['Popular', 'Intermediário', 'Caro', 'Luxo', 'Exótico']
  };

  /* ---------------------------------------------------------------------
     MAPA DE CONTINENTES
     Usado pelos campos do tipo "pais": mesmo país = 🟩, mesmo continente = 🟨.
     Para adicionar um país novo, basta incluir uma linha aqui.
     --------------------------------------------------------------------- */
  GG.continentes = {
    'Brasil': 'América do Sul', 'Argentina': 'América do Sul', 'Uruguai': 'América do Sul',
    'Chile': 'América do Sul', 'Colômbia': 'América do Sul', 'Peru': 'América do Sul',
    'Venezuela': 'América do Sul', 'Bolívia': 'América do Sul', 'Paraguai': 'América do Sul',
    'Equador': 'América do Sul',
    'Estados Unidos': 'América do Norte', 'Canadá': 'América do Norte', 'México': 'América do Norte',
    'Cuba': 'América do Norte', 'Jamaica': 'América do Norte', 'Guatemala': 'América do Norte',
    'Portugal': 'Europa', 'Espanha': 'Europa', 'França': 'Europa', 'Itália': 'Europa',
    'Alemanha': 'Europa', 'Reino Unido': 'Europa', 'Irlanda': 'Europa', 'Holanda': 'Europa',
    'Bélgica': 'Europa', 'Suíça': 'Europa', 'Áustria': 'Europa', 'Suécia': 'Europa',
    'Noruega': 'Europa', 'Dinamarca': 'Europa', 'Finlândia': 'Europa', 'Polônia': 'Europa',
    'Rússia': 'Europa', 'Grécia': 'Europa', 'Croácia': 'Europa', 'Sérvia': 'Europa',
    'Ucrânia': 'Europa', 'Hungria': 'Europa', 'República Tcheca': 'Europa', 'Romênia': 'Europa',
    'Japão': 'Ásia', 'China': 'Ásia', 'Coreia do Sul': 'Ásia', 'Índia': 'Ásia',
    'Tailândia': 'Ásia', 'Singapura': 'Ásia', 'Israel': 'Ásia', 'Turquia': 'Ásia',
    'Indonésia': 'Ásia', 'Vietnã': 'Ásia', 'Iraque': 'Ásia', 'Arábia Saudita': 'Ásia',
    'Egito': 'África', 'Nigéria': 'África', 'África do Sul': 'África', 'Marrocos': 'África',
    'Quênia': 'África', 'Gana': 'África', 'Etiópia': 'África', 'Senegal': 'África',
    'Camarões': 'África', 'Angola': 'África', 'Moçambique': 'África', 'Tanzânia': 'África',
    'Austrália': 'Oceania', 'Nova Zelândia': 'Oceania',
    'Antártida': 'Antártida'
  };

  /* ---------------------------------------------------------------------
     UTILITÁRIOS DE TEXTO
     --------------------------------------------------------------------- */

  // Remove acentos, pontuação e caixa — usado em buscas e comparações.
  GG.normalizar = function (texto) {
    return String(texto == null ? '' : texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // "1996" -> "século XX" | "2011" -> "século XXI"
  GG.seculo = function (ano) {
    if (typeof ano !== 'number' || !isFinite(ano)) return null;
    var n = Math.floor((Math.abs(ano) - 1) / 100) + 1;
    var romanos = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    var r = romanos[n] || String(n);
    return ano < 0 ? r + ' a.C.' : r;
  };

  GG.sortear = function (lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  };

  // Embaralhamento Fisher-Yates (usado no modo professor e nas sugestões).
  GG.embaralhar = function (lista) {
    var copia = lista.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copia[i]; copia[i] = copia[j]; copia[j] = tmp;
    }
    return copia;
  };

  /* ---------------------------------------------------------------------
     REGISTRO DE TEMAS
     -------------------------------------------------------------------
     Cada arquivo em assets/js/dados/ chama GG.registrarTema({...}).

     Os itens são escritos como TUPLAS (arrays) para caber uma por linha —
     é o que torna a base fácil de expandir. A ordem das colunas é:

        [ nome, ...valores dos campos declarados..., curiosidade, dica ]

     O registrador converte cada tupla no objeto documentado:

        {
          nome: "Minecraft",
          categoria: "Jogos",
          ano: 2011,
          criador: "Mojang",
          origem: "Suécia",
          tipo: ["Sandbox", "Sobrevivência"],
          popularidade: "Muito alta",
          curiosidades: "...",
          dicas: ["...", "...", "..."]
        }
     --------------------------------------------------------------------- */

  GG.temas = [];
  GG.indiceTemas = {};

  GG.registrarTema = function (def) {
    var campos = def.campos;

    var itens = def.itens.map(function (tupla, indice) {
      var item = {
        id: def.id + '-' + indice,
        nome: tupla[0],
        categoria: def.nome,
        temaId: def.id,
        valores: {},
        curiosidades: tupla[campos.length + 1] || '',
        dicasAutorais: []
      };

      campos.forEach(function (campo, i) {
        var valor = tupla[i + 1];
        item.valores[campo.chave] = valor;
        // Espelha os valores na raiz do item para leitura direta (item.ano, item.criador...).
        item[campo.chave] = campo.tipo === 'ordinal'
          ? GG.escalas[campo.escala][valor - 1]
          : valor;
      });

      var dicaAutoral = tupla[campos.length + 2];
      if (dicaAutoral) item.dicasAutorais.push(dicaAutoral);

      item.busca = GG.normalizar(item.nome);
      // Índice de palavras-chave: alimenta o modo "Eu gosto de".
      item.chaves = GG.chavesDoItem(item, campos);
      return item;
    });

    var tema = {
      id: def.id,
      nome: def.nome,
      emoji: def.emoji,
      resumo: def.resumo,
      campos: campos,
      itens: itens
    };

    GG.temas.push(tema);
    GG.indiceTemas[def.id] = tema;
    return tema;
  };

  // Junta nome + todos os valores textuais em uma lista de palavras-chave.
  GG.chavesDoItem = function (item, campos) {
    var chaves = [GG.normalizar(item.nome)];
    campos.forEach(function (campo) {
      var valor = item.valores[campo.chave];
      if (Array.isArray(valor)) {
        valor.forEach(function (v) { chaves.push(GG.normalizar(v)); });
      } else if (typeof valor === 'string') {
        chaves.push(GG.normalizar(valor));
      }
    });
    if (item.curiosidades) chaves.push(GG.normalizar(item.curiosidades));
    return chaves;
  };

  // Traduz um valor bruto para o texto que aparece na tabela.
  GG.exibirValor = function (campo, valor) {
    if (valor == null || valor === '') return '—';
    if (campo.tipo === 'ordinal') return GG.escalas[campo.escala][valor - 1];
    if (Array.isArray(valor)) return valor.join(' · ');
    return String(valor);
  };

  GG.totalDeItens = function () {
    return GG.temas.reduce(function (soma, tema) { return soma + tema.itens.length; }, 0);
  };
})(window);
