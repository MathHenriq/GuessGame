/* =========================================================================
   FERRAMENTA — VALIDAÇÃO DA BASE DE DADOS
   -------------------------------------------------------------------------
   Confere a base sem abrir o navegador. Use depois de cadastrar itens novos:

       node ferramentas/validar-base.js

   O que ele verifica:
     · todo campo declarado no tema existe em todos os itens;
     · escalas ordinais dentro do intervalo 1–5;
     · anos numéricos, listas em array, países presentes no mapa de continentes;
     · curiosidade e dica preenchidas;
     · geração de dicas e simulação de partidas nas três dificuldades.

   É opcional: o jogo em si não precisa de Node.js para nada.
   ========================================================================= */

'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var raiz = path.join(__dirname, '..');
var contexto = { console: console };
contexto.window = contexto;
vm.createContext(contexto);

[
  'assets/js/nucleo/base.js',
  'assets/js/nucleo/comparador.js',
  'assets/js/nucleo/dicas.js',
  'assets/js/nucleo/pontuacao.js',
  'assets/js/nucleo/partida.js',
  'assets/js/dados/entretenimento.js',
  'assets/js/dados/pessoas.js',
  'assets/js/dados/mundo.js',
  'assets/js/dados/objetos.js',
  'assets/js/dados/expansao-telas.js',
  'assets/js/dados/expansao-ficcao.js',
  'assets/js/dados/expansao-pessoas.js',
  'assets/js/dados/expansao-mundo.js',
  'assets/js/dados/expansao-basicos.js',
  'assets/js/dados/especificos-games.js',
  'assets/js/dados/especificos-animes.js',
  'assets/js/dados/especificos-cultura.js',
  'assets/js/dados/tema-ciencias.js',
  'assets/js/dados/tema-natureza.js',
  'assets/js/dados/tema-sociedade.js',
  'assets/js/dados/tema-cotidiano.js',
  'assets/js/dados/tema-cultura.js',
  'assets/js/dados/especificos-universos.js',
  'assets/js/dados/expansao-pokemon.js',
  'assets/js/dados/dicas-escritas.js',
  'assets/js/dados/destaques.js'
].forEach(function (arquivo) {
  vm.runInContext(fs.readFileSync(path.join(raiz, arquivo), 'utf8'), contexto, { filename: arquivo });
});

var GG = contexto.GG;
var problemas = [];
var semCuriosidade = 0;
var semDica = 0;
var nomesPorTema = {};

function anotar(tema, item, mensagem) {
  problemas.push(tema.id + ' → ' + item.nome + ': ' + mensagem);
}

console.log('Temas: ' + GG.temas.length + '  |  Itens: ' + GG.totalDeItens() + '\n');

GG.temas.forEach(function (tema) {
  console.log('  ' + tema.emoji + ' ' + tema.nome.padEnd(26) +
    String(tema.itens.length).padStart(3) + ' itens · ' + tema.campos.length + ' campos');

  nomesPorTema[tema.id] = {};

  tema.itens.forEach(function (item) {
    var chave = item.nome.toLowerCase();
    if (nomesPorTema[tema.id][chave]) anotar(tema, item, 'nome repetido dentro do tema');
    nomesPorTema[tema.id][chave] = true;

    tema.campos.forEach(function (campo) {
      var valor = item.valores[campo.chave];

      if (valor === undefined) return anotar(tema, item, 'campo "' + campo.chave + '" ausente');

      if (campo.tipo === 'ordinal' && !(valor >= 1 && valor <= 5)) {
        anotar(tema, item, campo.chave + ' deve ser de 1 a 5 (veio "' + valor + '")');
      }
      if ((campo.tipo === 'ano' || campo.tipo === 'numero') && valor !== null && typeof valor !== 'number') {
        anotar(tema, item, campo.chave + ' deve ser número (veio "' + valor + '")');
      }
      if (campo.tipo === 'lista' && !Array.isArray(valor)) {
        anotar(tema, item, campo.chave + ' deve ser uma lista (veio "' + valor + '")');
      }
      if (campo.tipo === 'pais' && !GG.continentes[valor]) {
        anotar(tema, item, 'país "' + valor + '" não está em GG.continentes');
      }
    });

    // Curiosidade e dica autoral são opcionais (o jogo cobre a ausência com
    // dicas automáticas e com o resumo da Wikipédia), então entram como aviso.
    if (!item.curiosidades) semCuriosidade++;
    if (!item.dicasAutorais.length) semDica++;
    if (GG.gerarDicas(tema, item).length < 3) anotar(tema, item, 'gerou menos de 3 dicas');
  });

  // Simula uma partida em cada dificuldade para pegar erros de configuração.
  ['facil', 'medio', 'dificil'].forEach(function (nivel) {
    var partida = GG.criarPartida({ temaId: tema.id, dificuldade: nivel });
    if (!partida.segredo) problemas.push(tema.id + '/' + nivel + ': não sorteou item secreto');
    if (partida.conjunto.length < 5) {
      problemas.push(tema.id + '/' + nivel + ': só ' + partida.conjunto.length + ' itens jogáveis');
    }
    GG.registrarPalpite(partida, partida.segredo);
    if (partida.estado !== 'vitoria') problemas.push(tema.id + '/' + nivel + ': vitória não detectada');
  });
});

console.log('');
console.log('Sem curiosidade cadastrada: ' + semCuriosidade + '  |  sem dica autoral: ' + semDica +
  '  (opcional — o jogo cobre com dicas automáticas e com a Wikipédia)');
console.log('');
if (problemas.length) {
  console.log('✖ ' + problemas.length + ' problema(s) encontrado(s):');
  problemas.forEach(function (p) { console.log('   · ' + p); });
  process.exit(1);
}
console.log('✔ Base validada, tudo certo.');
