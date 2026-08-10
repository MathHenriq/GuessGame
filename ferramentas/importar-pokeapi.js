/* =========================================================================
   FERRAMENTA — IMPORTAR A POKÉDEX COMPLETA DA POKÉAPI
   -------------------------------------------------------------------------
   Gera assets/js/dados/pokemon-completo.js a partir da PokéAPI (pokeapi.co),
   que é pública, gratuita e não exige chave.

       node ferramentas/importar-pokeapi.js            # 1ª geração (151)
       node ferramentas/importar-pokeapi.js 1025       # a Pokédex inteira
       node ferramentas/importar-pokeapi.js 1025 300   # a partir do nº 300

   Depois de importar, confira tudo com:
       node ferramentas/validar-base.js

   POR QUE ISSO NÃO RODA NO JOGO, E SIM AQUI
   O jogo é estático e precisa funcionar offline, na escola, sem depender de
   API nenhuma. Então a importação acontece uma vez, na sua máquina, e o
   resultado vira um arquivo .js commitado — dado congelado e previsível.

   O QUE ELE NÃO RESOLVE
   A PokéAPI não sabe quais Pokémon são famosos. Depois de importar centenas
   de nomes, vale acrescentar os favoritos da turma em
   assets/js/dados/destaques.js, senão eles nunca serão sorteados no
   Fácil nem no Médio.

   ATENÇÃO: os dados da PokéAPI derivam de propriedade intelectual da
   Nintendo/Game Freak. O uso aqui é educacional e sem fins comerciais.
   ========================================================================= */

'use strict';

var fs = require('fs');
var path = require('path');

var LIMITE = parseInt(process.argv[2], 10) || 151;
var INICIO = parseInt(process.argv[3], 10) || 1;
var SAIDA = path.join(__dirname, '..', 'assets', 'js', 'dados', 'pokemon-completo.js');
var PAUSA_MS = 120; // gentileza com a API pública

/* Traduções dos valores que viram colunas do tabuleiro. */
var TIPOS = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', grass: 'Grama', electric: 'Elétrico',
  ice: 'Gelo', fighting: 'Lutador', poison: 'Venenoso', ground: 'Terrestre',
  flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto', rock: 'Pedra', ghost: 'Fantasma',
  dragon: 'Dragão', dark: 'Sombrio', steel: 'Aço', fairy: 'Fada'
};

var CORES = {
  black: 'Preto', blue: 'Azul', brown: 'Marrom', gray: 'Cinza', green: 'Verde',
  pink: 'Rosa', purple: 'Roxo', red: 'Vermelho', white: 'Branco', yellow: 'Amarelo'
};

var GERACOES = {
  'generation-i': '1ª geração', 'generation-ii': '2ª geração', 'generation-iii': '3ª geração',
  'generation-iv': '4ª geração', 'generation-v': '5ª geração', 'generation-vi': '6ª geração',
  'generation-vii': '7ª geração', 'generation-viii': '8ª geração', 'generation-ix': '9ª geração'
};

/** Altura da PokéAPI (decímetros) para a escala de porte 1–5 do jogo. */
function porteDaAltura(decimetros) {
  if (decimetros <= 5) return 1;
  if (decimetros <= 10) return 2;
  if (decimetros <= 15) return 3;
  if (decimetros <= 25) return 4;
  return 5;
}

/** Nome em português quando a API tiver; senão, o nome em inglês capitalizado. */
function nomeEmPortugues(especie) {
  var lista = especie.names || [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].language && lista[i].language.name === 'pt-BR') return lista[i].name;
  }
  for (var j = 0; j < lista.length; j++) {
    if (lista[j].language && lista[j].language.name === 'pt') return lista[j].name;
  }
  return especie.name.charAt(0).toUpperCase() + especie.name.slice(1);
}

function buscar(url) {
  return fetch(url).then(function (resposta) {
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status + ' em ' + url);
    return resposta.json();
  });
}

function esperar(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

/** Converte um par (pokemon, species) na tupla usada pelo tema 'pokemon'. */
function montarTupla(pokemon, especie) {
  var tipos = pokemon.types
    .sort(function (a, b) { return a.slot - b.slot; })
    .map(function (t) { return TIPOS[t.type.name] || t.type.name; });

  return [
    nomeEmPortugues(especie),
    tipos,
    GERACOES[especie.generation.name] || especie.generation.name,
    CORES[especie.color.name] || especie.color.name,
    especie.is_legendary || especie.is_mythical ? 'Sim' : 'Não',
    porteDaAltura(pokemon.height)
  ];
}

function comoTexto(valor) {
  if (Array.isArray(valor)) return '[' + valor.map(comoTexto).join(', ') + ']';
  if (typeof valor === 'string') return "'" + valor.replace(/'/g, "\\'") + "'";
  return String(valor);
}

function escrever(tuplas) {
  var linhas = tuplas.map(function (t) { return '    [' + t.map(comoTexto).join(', ') + ']'; });
  var conteudo = '/* =========================================================================\n' +
    '   POKÉDEX IMPORTADA DA POKÉAPI — ARQUIVO GERADO, NÃO EDITE À MÃO\n' +
    '   -------------------------------------------------------------------------\n' +
    '   Gerado por ferramentas/importar-pokeapi.js em ' + new Date().toISOString().slice(0, 10) + '.\n' +
    '   ' + tuplas.length + ' Pokémon. Para atualizar, rode a ferramenta de novo.\n' +
    '   Colunas: [ nome, tipos[], geração, cor, lendário, porte ]\n' +
    '   ========================================================================= */\n\n' +
    '(function (GG) {\n' +
    "  'use strict';\n\n" +
    "  GG.adicionarItens('pokemon', [\n" +
    linhas.join(',\n') + '\n' +
    '  ]);\n' +
    '})(window.GG);\n';

  fs.writeFileSync(SAIDA, conteudo, 'utf8');
}

async function importar() {
  if (typeof fetch !== 'function') {
    console.error('Este script precisa de Node.js 18 ou superior (fetch nativo).');
    process.exit(1);
  }

  console.log('Importando Pokémon ' + INICIO + ' a ' + LIMITE + ' da PokéAPI...');
  var tuplas = [];
  var falhas = [];

  for (var numero = INICIO; numero <= LIMITE; numero++) {
    try {
      var pokemon = await buscar('https://pokeapi.co/api/v2/pokemon/' + numero);
      var especie = await buscar('https://pokeapi.co/api/v2/pokemon-species/' + numero);
      tuplas.push(montarTupla(pokemon, especie));
      if (numero % 25 === 0) console.log('  ' + numero + '/' + LIMITE + '...');
      await esperar(PAUSA_MS);
    } catch (erro) {
      falhas.push(numero + ' (' + erro.message + ')');
    }
  }

  escrever(tuplas);
  console.log('\n✔ ' + tuplas.length + ' Pokémon gravados em ' + path.relative(process.cwd(), SAIDA));
  if (falhas.length) console.log('✖ Falharam: ' + falhas.join(', '));

  console.log('\nFalta fazer:');
  console.log('  1. incluir o arquivo no index.html, ANTES de destaques.js;');
  console.log('  2. remover expansao-pokemon.js e os Pokémon de especificos-games.js,');
  console.log('     senão haverá nomes repetidos (o validador acusa);');
  console.log('  3. rodar node ferramentas/validar-base.js;');
  console.log('  4. acrescentar os favoritos da turma em assets/js/dados/destaques.js.');
}

// Exportado para teste; executa só quando chamado direto pela linha de comando.
module.exports = { montarTupla: montarTupla, porteDaAltura: porteDaAltura, nomeEmPortugues: nomeEmPortugues };
if (require.main === module) importar();
