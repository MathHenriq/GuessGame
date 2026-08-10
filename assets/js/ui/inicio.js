/* =========================================================================
   UI — TELA INICIAL
   Grade de categorias, seletor de dificuldade e modo "Eu gosto de".
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  var ATALHOS = ['Marvel', 'Futebol', 'Anime', 'Minecraft', 'Música', 'Animais', 'História', 'Comida'];

  /* ------------------------------------------------- GRADE DE CATEGORIAS */
  function montarGrade() {
    var grade = ui.limpar(ui.$('#grade-categorias'));

    GG.temas.forEach(function (tema, indice) {
      var cartao = ui.el('button', 'cartao-categoria');
      cartao.type = 'button';
      cartao.setAttribute('aria-label', 'Jogar categoria ' + tema.nome);

      cartao.appendChild(ui.el('span', 'cartao-categoria__indice',
        (indice + 1 < 10 ? '0' : '') + (indice + 1)));
      cartao.appendChild(ui.el('span', 'cartao-categoria__emoji', tema.emoji));
      cartao.appendChild(ui.el('span', 'cartao-categoria__nome', tema.nome));
      cartao.appendChild(ui.el('span', 'cartao-categoria__meta', tema.itens.length + ' itens'));

      cartao.addEventListener('click', function () {
        GG.som.clique();
        GG.ui.iniciarJogo({
          temaId: tema.id,
          dificuldade: ui.estado.dificuldade,
          cronometro: ui.estado.cronometro
        });
      });

      grade.appendChild(cartao);
    });
  }

  /* ------------------------------------------------ SELETOR DE DIFICULDADE */
  function montarSeletorDificuldade() {
    var caixa = ui.limpar(ui.$('#seletor-dificuldade'));

    ['facil', 'medio', 'dificil'].forEach(function (id) {
      var dificuldade = GG.dificuldades[id];
      var botao = ui.el('button', null, dificuldade.emoji + ' ' + dificuldade.rotulo);
      botao.type = 'button';
      botao.title = dificuldade.descricao;
      botao.setAttribute('aria-pressed', String(ui.estado.dificuldade === id));

      botao.addEventListener('click', function () {
        ui.estado.dificuldade = id;
        GG.som.clique();
        montarSeletorDificuldade();
        ui.aviso('Dificuldade: ' + dificuldade.rotulo + ' — ' + dificuldade.descricao);
      });

      caixa.appendChild(botao);
    });
  }

  /* ------------------------------------------------------- EU GOSTO DE… */
  function montarAtalhos() {
    var caixa = ui.limpar(ui.$('#atalhos-curtida'));
    ATALHOS.forEach(function (termo) {
      var chip = ui.el('button', 'chip', termo);
      chip.type = 'button';
      chip.addEventListener('click', function () {
        ui.$('#entrada-curtida').value = termo;
        responderCurtida(termo);
      });
      caixa.appendChild(chip);
    });
  }

  function responderCurtida(texto) {
    var lista = ui.limpar(ui.$('#lista-sugestoes'));
    var termo = String(texto || '').trim();

    if (termo.length < 2) {
      lista.hidden = true;
      ui.aviso('Escreva pelo menos duas letras.');
      return;
    }

    var resposta = GG.sugerir(termo);
    GG.som.dica();

    var cabecalho = ui.el('p', 'sobretitulo', resposta.encontrouAlgo
      ? 'Desafios para quem gosta de ' + termo
      : 'Não achamos "' + termo + '" na base — experimente estas categorias');
    cabecalho.style.marginBottom = '0';
    lista.appendChild(cabecalho);

    resposta.sugestoes.forEach(function (sugestao) {
      var botao = ui.el('button', 'sugestao');
      botao.type = 'button';

      botao.appendChild(ui.el('span', 'sugestao__emoji', sugestao.tema.emoji));

      var texto2 = ui.el('span', 'sugestao__texto');
      texto2.appendChild(ui.el('span', 'sugestao__titulo', sugestao.titulo));
      texto2.appendChild(ui.el('span', 'sugestao__motivo', sugestao.motivo));
      botao.appendChild(texto2);

      botao.appendChild(ui.el('span', 'sugestao__seta', '→'));

      botao.addEventListener('click', function () {
        GG.som.clique();
        GG.ui.iniciarJogo({
          temaId: sugestao.temaId,
          dificuldade: ui.estado.dificuldade,
          cronometro: ui.estado.cronometro,
          filtro: sugestao.filtro,
          rotuloFiltro: sugestao.termo ? 'Eu gosto de ' + sugestao.termo : ''
        });
      });

      lista.appendChild(botao);
    });

    lista.hidden = false;
  }

  /* ------------------------------------------------------------ NÚMEROS */
  function atualizarContadores() {
    ui.$('#contador-categorias').textContent = GG.temas.length;
    ui.$('#contador-itens').textContent = GG.totalDeItens();
    ui.atualizarPlacarTopo();
  }

  /* Cronômetro opcional: vale bônus de pontos e serve para rodadas cronometradas. */
  function ligarCronometro() {
    var botao = ui.$('#btn-cronometro');
    botao.addEventListener('click', function () {
      ui.estado.cronometro = !ui.estado.cronometro;
      botao.setAttribute('aria-pressed', String(ui.estado.cronometro));
      GG.som.clique();
      ui.aviso(ui.estado.cronometro
        ? 'Cronômetro ligado — quem acerta rápido ganha até 20 pontos extras.'
        : 'Cronômetro desligado.');
    });
  }

  ui.iniciarTelaInicial = function () {
    montarGrade();
    ligarCronometro();
    montarSeletorDificuldade();
    montarAtalhos();
    atualizarContadores();

    ui.$('#form-curtida').addEventListener('submit', function (evento) {
      evento.preventDefault();
      responderCurtida(ui.$('#entrada-curtida').value);
    });
  };

  ui.atualizarInicio = atualizarContadores;
})(window.GG);
