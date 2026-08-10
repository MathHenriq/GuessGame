/* =========================================================================
   APP — ponto de entrada
   Liga a navegação, aplica preferências e abre desafios recebidos por link.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  function ligarNavegacao() {
    ui.$$('[data-ir]').forEach(function (botao) {
      botao.addEventListener('click', function () {
        GG.som.clique();
        ui.fecharResultado();
        ui.mostrarTela(botao.dataset.ir);
        if (botao.dataset.ir === 'ranking') ui.atualizarRanking();
        if (botao.dataset.ir === 'inicio') ui.atualizarInicio();
      });
    });

    ui.$('#btn-som').addEventListener('click', function () {
      GG.som.alternar();
      ui.atualizarBotaoSom();
      GG.som.clique();
    });

    ui.$('#btn-visual').addEventListener('click', function () {
      ui.alternarVisual();
      GG.som.clique();
    });
  }

  function abrirDesafioDaURL() {
    var config = GG.desafioDaURL();
    if (!config) return false;
    ui.aviso('Desafio recebido por link!');
    ui.iniciarJogo({
      temaId: config.temaId,
      dificuldade: config.dificuldade || 'medio',
      tentativas: config.tentativas,
      dicasMax: config.dicasMax,
      cronometro: !!config.cronometro,
      itemId: config.itemId || null,
      codigo: true
    });
    return true;
  }

  function iniciar() {
    ui.iniciarPreferencias();
    ui.atualizarBotaoSom();

    ui.iniciarTelaInicial();
    ui.iniciarTelaJogo();
    ui.iniciarTelaProfessor();
    ui.iniciarTelaRanking();

    ligarNavegacao();

    if (!abrirDesafioDaURL()) ui.mostrarTela('inicio');

    // Um desafio novo pode chegar enquanto a página já está aberta.
    window.addEventListener('hashchange', abrirDesafioDaURL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})(window.GG);
