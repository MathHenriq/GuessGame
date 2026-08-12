/* =========================================================================
   UI — APELIDO, RANKING E PERFIL
   -------------------------------------------------------------------------
   O placar é por jogador, e o jogador é identificado pelo apelido pedido ao
   entrar. Sem cadastro nem senha: em sala isso só atrapalharia, e nenhum
   dado pessoal é coletado — o apelido nem sai do aparelho.

   São dois placares, porque a turma cobra os dois: o geral (soma de tudo) e
   o da categoria (quem manda em Pokémon, quem manda em Animais).
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  /* ------------------------------------------------------------- APELIDO */

  /** Atalhos para quem já jogou aqui: evita digitar de novo no revezamento. */
  function montarConhecidos() {
    var caixa = ui.limpar(ui.$('#apelido-conhecidos'));
    var jogadores = GG.perfil.listarJogadores().slice(0, 8);

    if (!jogadores.length) {
      caixa.hidden = true;
      return;
    }

    caixa.appendChild(ui.el('span', 'apelido__conhecidos-rotulo', 'Já jogaram aqui:'));
    jogadores.forEach(function (jogador) {
      var chip = ui.el('button', 'chip', jogador.nome + ' · ' + jogador.pontos + ' pts');
      chip.type = 'button';
      chip.addEventListener('click', function () {
        ui.$('#entrada-apelido').value = jogador.nome;
        ui.$('#form-apelido').requestSubmit
          ? ui.$('#form-apelido').requestSubmit()
          : confirmarApelido();
      });
      caixa.appendChild(chip);
    });
    caixa.hidden = false;
  }

  ui.pedirApelido = function () {
    var cortina = ui.$('#cortina-apelido');
    var campo = ui.$('#entrada-apelido');

    campo.value = GG.perfil.obter().nome || '';
    montarConhecidos();
    cortina.hidden = false;

    // O foco espera o desenho da cortina, senão o teclado do celular não abre.
    window.setTimeout(function () { campo.focus(); campo.select(); }, 60);
  };

  function confirmarApelido() {
    var nome = ui.$('#entrada-apelido').value.trim();
    if (nome.length < 2) {
      GG.som.erro();
      return ui.aviso('Escreva um apelido com pelo menos duas letras.');
    }

    GG.perfil.definirNome(nome);
    ui.$('#cortina-apelido').hidden = true;
    GG.som.clique();
    ui.atualizarPlacarTopo();
    ui.atualizarRanking();
    ui.aviso('Boa partida, ' + nome + '! Os pontos vão para o seu nome.');
  }

  /* ---------------------------------------------------------- CLASSIFICAÇÃO */

  function montarResumo() {
    var ficha = GG.perfil.atual();
    var caixa = ui.limpar(ui.$('#resumo-perfil'));
    var aproveitamento = ficha.partidas
      ? Math.round((ficha.vitorias / ficha.partidas) * 100) : 0;

    [
      { valor: ficha.pontos, rotulo: 'pontos' },
      { valor: ficha.partidas, rotulo: 'partidas' },
      { valor: aproveitamento + '%', rotulo: 'aproveitamento' },
      { valor: ficha.melhorSequencia, rotulo: 'melhor sequência' }
    ].forEach(function (dado) {
      var bloco = ui.el('div', 'numero');
      bloco.appendChild(ui.el('strong', null, String(dado.valor)));
      bloco.appendChild(ui.el('span', null, dado.rotulo));
      caixa.appendChild(bloco);
    });
  }

  function montarPodio() {
    var caixa = ui.limpar(ui.$('#podio'));
    var melhores = GG.perfil.listarJogadores().slice(0, 3);

    if (!melhores.length) {
      var vazio = ui.el('p', 'vazio',
        'Ninguém jogou ainda. A primeira partida já inaugura o pódio.');
      vazio.style.gridColumn = '1 / -1';
      caixa.appendChild(vazio);
      return;
    }

    // Ordem visual: 2º, 1º, 3º — como em um pódio de verdade.
    [1, 0, 2].forEach(function (indice) {
      var jogador = melhores[indice];
      if (!jogador) return;

      var lugar = ui.el('div', 'podio__lugar podio__lugar--' + (indice + 1));
      lugar.appendChild(ui.el('span', 'podio__posicao',
        ['🥇 1º lugar', '🥈 2º lugar', '🥉 3º lugar'][indice]));
      lugar.appendChild(ui.el('span', 'podio__nome', jogador.nome));
      lugar.appendChild(ui.el('span', 'podio__pontos', String(jogador.pontos)));
      lugar.appendChild(ui.el('span', 'podio__detalhe',
        jogador.vitorias + ' de ' + jogador.partidas +
        (jogador.partidas === 1 ? ' partida' : ' partidas')));
      caixa.appendChild(lugar);
    });
  }

  /**
   * Uma tabela de classificação.
   * @param linhas [{ nome, pontos, partidas, vitorias }]
   */
  function montarTabela(elemento, linhas, vazio) {
    var caixa = ui.limpar(elemento);

    if (!linhas.length) {
      caixa.appendChild(ui.el('p', 'vazio', vazio));
      return;
    }

    var atual = GG.normalizar(GG.perfil.obter().nome);

    var cabecalho = ui.el('div', 'tabela-placar__linha tabela-placar__linha--titulo');
    ['#', 'Jogador', 'Partidas', 'Pontos'].forEach(function (texto) {
      cabecalho.appendChild(ui.el('span', null, texto));
    });
    caixa.appendChild(cabecalho);

    linhas.forEach(function (linha, indice) {
      var eu = GG.normalizar(linha.nome) === atual;
      var no = ui.el('div', 'tabela-placar__linha' + (eu ? ' tabela-placar__linha--eu' : ''));
      no.appendChild(ui.el('span', 'tabela-placar__posicao', String(indice + 1)));
      no.appendChild(ui.el('span', 'tabela-placar__nome', linha.nome));
      no.appendChild(ui.el('span', 'tabela-placar__partidas',
        linha.vitorias + '/' + linha.partidas));
      no.appendChild(ui.el('span', 'tabela-placar__pontos', String(linha.pontos)));
      caixa.appendChild(no);
    });
  }

  function montarPlacarGeral() {
    montarTabela(ui.$('#placar-geral'), GG.perfil.listarJogadores(),
      'A classificação aparece assim que a primeira partida terminar.');
  }

  function montarSeletorDeTema() {
    var seletor = ui.$('#seletor-placar-tema');
    var escolhido = seletor.value;
    var jogados = GG.perfil.temasComPartidas();

    ui.limpar(seletor);

    if (!jogados.length) {
      seletor.appendChild(ui.el('option', null, 'Nenhuma categoria jogada ainda'));
      seletor.disabled = true;
      return null;
    }

    seletor.disabled = false;
    jogados.forEach(function (tema) {
      var opcao = ui.el('option', null, tema.emoji + '  ' + tema.nome +
        ' (' + tema.partidas + (tema.partidas === 1 ? ' partida' : ' partidas') + ')');
      opcao.value = tema.temaId;
      seletor.appendChild(opcao);
    });

    // Mantém a categoria escolhida ao redesenhar; senão, a mais jogada.
    var existe = jogados.some(function (t) { return t.temaId === escolhido; });
    seletor.value = existe ? escolhido : jogados[0].temaId;
    return seletor.value;
  }

  function montarPlacarDoTema() {
    var temaId = montarSeletorDeTema();
    montarTabela(ui.$('#placar-tema'), temaId ? GG.perfil.rankingDoTema(temaId) : [],
      'Jogue uma partida para abrir a classificação desta categoria.');
  }

  function montarHistorico() {
    var caixa = ui.limpar(ui.$('#historico'));
    var historico = GG.perfil.obter().historico;

    if (!historico.length) {
      caixa.appendChild(ui.el('p', 'vazio', 'O histórico das últimas partidas aparece aqui.'));
      return;
    }

    historico.forEach(function (registro) {
      var linha = ui.el('div', 'historico__linha');

      linha.appendChild(ui.el('span',
        'historico__resultado historico__resultado--' + (registro.venceu ? 'vitoria' : 'derrota'),
        registro.venceu ? '✔ acertou' : '✖ errou'));

      linha.appendChild(ui.el('span', null,
        registro.nome + ' · ' + registro.segredo + ' — ' + registro.tema));

      linha.appendChild(ui.el('span', 'historico__meta',
        registro.tentativas + ' tent · ' + registro.dicas + ' dicas · ' + ui.formatarData(registro.data)));

      linha.appendChild(ui.el('span', 'historico__pontos', '+' + registro.pontos));
      caixa.appendChild(linha);
    });
  }

  ui.atualizarRanking = function () {
    montarResumo();
    montarPodio();
    montarPlacarGeral();
    montarPlacarDoTema();
    montarHistorico();

    var campoNome = ui.$('#entrada-nome');
    if (document.activeElement !== campoNome) campoNome.value = GG.perfil.obter().nome;
  };

  ui.iniciarTelaRanking = function () {
    ui.$('#form-apelido').addEventListener('submit', function (evento) {
      evento.preventDefault();
      confirmarApelido();
    });

    ui.$('#btn-trocar-jogador').addEventListener('click', function () {
      GG.som.clique();
      ui.pedirApelido();
    });

    ui.$('#entrada-nome').addEventListener('change', function () {
      GG.perfil.definirNome(this.value);
      ui.atualizarPlacarTopo();
      ui.atualizarRanking();
      ui.aviso('Jogador da vez: ' + (this.value || 'ninguém') + '.');
    });

    ui.$('#seletor-placar-tema').addEventListener('change', montarPlacarDoTema);

    ui.$('#btn-limpar-ranking').addEventListener('click', function () {
      if (!window.confirm('Isso apaga os pontos de TODOS os jogadores deste navegador. Continuar?')) return;
      GG.perfil.limpar();
      ui.atualizarRanking();
      ui.atualizarPlacarTopo();
      ui.aviso('Placar zerado.');
    });

    ui.atualizarRanking();
  };
})(window.GG);
