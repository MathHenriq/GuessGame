/* =========================================================================
   UI — UTILITÁRIOS COMPARTILHADOS
   Seletores curtos, troca de telas, avisos e preferências visuais.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = (GG.ui = GG.ui || {});

  /* Estado global da interface (o estado das REGRAS fica em GG.criarPartida). */
  ui.estado = {
    dificuldade: 'medio',
    cronometro: false,
    partida: null,
    ultimaConfig: null
  };

  ui.$ = function (seletor) { return document.querySelector(seletor); };
  ui.$$ = function (seletor) { return Array.prototype.slice.call(document.querySelectorAll(seletor)); };

  /** Cria um elemento já com classe e texto — evita innerHTML espalhado pelo código. */
  ui.el = function (tag, classe, texto) {
    var no = document.createElement(tag);
    if (classe) no.className = classe;
    if (texto != null) no.textContent = texto;
    return no;
  };

  ui.limpar = function (no) {
    while (no.firstChild) no.removeChild(no.firstChild);
    return no;
  };

  /* --------------------------------------------------------------- TELAS */
  ui.mostrarTela = function (nome) {
    ui.$$('.tela').forEach(function (tela) {
      tela.classList.toggle('tela--ativa', tela.id === 'tela-' + nome);
    });
    ui.$$('.navegacao__item').forEach(function (botao) {
      botao.setAttribute('aria-current', botao.dataset.ir === nome ? 'true' : 'false');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ui.telaAtual = nome;
  };

  /* --------------------------------------------------------------- AVISO */
  var timerAviso = null;
  ui.aviso = function (texto) {
    var caixa = ui.$('#aviso');
    caixa.textContent = texto;
    caixa.hidden = false;
    window.clearTimeout(timerAviso);
    timerAviso = window.setTimeout(function () { caixa.hidden = true; }, 2600);
  };

  /* -------------------------------------------------------- PREFERÊNCIAS */
  function lerPreferencia(chave, padrao) {
    try {
      var valor = window.localStorage.getItem('guessgame.' + chave);
      return valor === null ? padrao : valor;
    } catch (e) { return padrao; }
  }

  function gravarPreferencia(chave, valor) {
    try { window.localStorage.setItem('guessgame.' + chave, valor); } catch (e) { /* ignorado */ }
  }

  ui.aplicarVisual = function (visual) {
    document.documentElement.setAttribute('data-tema-visual', visual);
    ui.$('[data-visual-icone]').textContent = visual === 'claro' ? '☀️' : '🌙';
    gravarPreferencia('visual', visual);
  };

  ui.alternarVisual = function () {
    var atual = document.documentElement.getAttribute('data-tema-visual');
    ui.aplicarVisual(atual === 'claro' ? 'escuro' : 'claro');
  };

  ui.iniciarPreferencias = function () {
    ui.aplicarVisual(lerPreferencia('visual', 'escuro'));
    if (lerPreferencia('som', 'sim') === 'nao') {
      GG.som.alternar();
      ui.atualizarBotaoSom();
    }
  };

  ui.atualizarBotaoSom = function () {
    var ligado = GG.som.ligado();
    ui.$('[data-som-ligado]').textContent = ligado ? '🔊' : '🔇';
    ui.$('#btn-som').setAttribute('aria-pressed', String(ligado));
    gravarPreferencia('som', ligado ? 'sim' : 'nao');
  };

  /* -------------------------------------------------------------- PLACAR */
  ui.atualizarPlacarTopo = function () {
    var ficha = GG.perfil.atual();
    ui.$('#placar-pontos').textContent = ficha.pontos;
    ui.$('#jogador-nome').textContent = ficha.nome || 'Jogador';
    var sequencia = ui.$('#contador-sequencia');
    if (sequencia) sequencia.textContent = ficha.sequencia;
  };

  /** Acima de 720px o layout é o de tablet/computador. */
  ui.telaLarga = function () {
    return window.matchMedia('(min-width: 721px)').matches;
  };

  /* ------------------------------------------------------------ FORMATOS */
  ui.formatarTempo = function (segundos) {
    var m = Math.floor(segundos / 60);
    var s = segundos % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  };

  ui.formatarData = function (iso) {
    var data = new Date(iso);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' +
      data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
})(window.GG);
