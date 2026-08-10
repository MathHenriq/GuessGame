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
  'assets/js/dados/objetos.js'
].forEach(function (arquivo) {
  vm.runInContext(fs.readFileSync(path.join(raiz, arquivo), 'utf8'), contexto, { filename: arquivo });
});

var GG = contexto.GG;
var problemas = [];

function anotar(tema, item, mensagem) {
  problemas.push(tema.id + ' → ' + item.nome + ': ' + mensagem);
}

console.log('Temas: ' + GG.temas.length + '  |  Itens: ' + GG.totalDeItens() + '\n');

GG.temas.forEach(function (tema) {
  console.log('  ' + tema.emoji + ' ' + tema.nome.padEnd(26) +
    String(tema.itens.length).padStart(3) + ' itens · ' + tema.campos.length + ' campos');

  tema.itens.forEach(function (item) {
    tema.campos.forEach(function (campo) {
      var valor = item.valores[campo.chave];

      if (valor === undefined) return anotar(tema, item, 'campo "' + campo.chave + '" ausente');

      if (campo.tipo === 'ordinal' && !(valor >= 1 && valor <= 5)) {
        anotar(tema, item, campo.chave + ' deve ser de 1 a 5 (veio "' + valor + '")');
      }
      if (campo.tipo === 'ano' && valor !== null && typeof valor !== 'number') {
        anotar(tema, item, campo.chave + ' deve ser número (veio "' + valor + '")');
      }
      if (campo.tipo === 'lista' && !Array.isArray(valor)) {
        anotar(tema, item, campo.chave + ' deve ser uma lista (veio "' + valor + '")');
      }
      if (campo.tipo === 'pais' && !GG.continentes[valor]) {
        anotar(tema, item, 'país "' + valor + '" não está em GG.continentes');
      }
    });

    if (!item.curiosidades) anotar(tema, item, 'sem curiosidade');
    if (!item.dicasAutorais.length) anotar(tema, item, 'sem dica');
    if (GG.gerarDicas(tema, item).length < 4) anotar(tema, item, 'gerou menos de 4 dicas');
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
if (problemas.length) {
  console.log('✖ ' + problemas.length + ' problema(s) encontrado(s):');
  problemas.forEach(function (p) { console.log('   · ' + p); });
  process.exit(1);
}
console.log('✔ Base validada, tudo certo.');
