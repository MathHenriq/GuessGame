/* =========================================================================
   UI — RANKING E PERFIL
   Placar local da turma: pódio, histórico e estatísticas.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  function montarResumo(perfil) {
    var caixa = ui.limpar(ui.$('#resumo-perfil'));
    var aproveitamento = perfil.partidas
      ? Math.round((perfil.vitorias / perfil.partidas) * 100) : 0;

    [
      { valor: perfil.pontos, rotulo: 'pontos totais' },
      { valor: perfil.partidas, rotulo: 'partidas' },
      { valor: aproveitamento + '%', rotulo: 'aproveitamento' },
      { valor: perfil.melhorSequencia, rotulo: 'melhor sequência' }
    ].forEach(function (dado) {
      var bloco = ui.el('div', 'numero');
      bloco.appendChild(ui.el('strong', null, String(dado.valor)));
      bloco.appendChild(ui.el('span', null, dado.rotulo));
      caixa.appendChild(bloco);
    });
  }

  function montarPodio(perfil) {
    var caixa = ui.limpar(ui.$('#podio'));
    var melhores = perfil.ranking.slice(0, 3);

    if (!melhores.length) {
      var vazio = ui.el('p', 'vazio', 'Nenhuma partida registrada ainda. Jogue uma rodada para inaugurar o pódio.');
      vazio.style.gridColumn = '1 / -1';
      caixa.appendChild(vazio);
      return;
    }

    // Ordem visual: 2º, 1º, 3º — como em um pódio de verdade.
    var ordem = [1, 0, 2];
    ordem.forEach(function (indice) {
      var registro = melhores[indice];
      if (!registro) return;

      var lugar = ui.el('div', 'podio__lugar podio__lugar--' + (indice + 1));
      lugar.appendChild(ui.el('span', 'podio__posicao',
        ['🥇 1º lugar', '🥈 2º lugar', '🥉 3º lugar'][indice]));
      lugar.appendChild(ui.el('span', 'podio__nome', registro.nome));
      lugar.appendChild(ui.el('span', 'podio__pontos', String(registro.pontos)));
      lugar.appendChild(ui.el('span', 'podio__detalhe',
        registro.emoji + ' ' + registro.tema + ' · ' + registro.dificuldade));
      caixa.appendChild(lugar);
    });
  }

  function montarHistorico(perfil) {
    var caixa = ui.limpar(ui.$('#historico'));

    if (!perfil.historico.length) {
      caixa.appendChild(ui.el('p', 'vazio', 'O histórico das últimas partidas aparece aqui.'));
      return;
    }

    perfil.historico.forEach(function (registro) {
      var linha = ui.el('div', 'historico__linha');

      linha.appendChild(ui.el('span',
        'historico__resultado historico__resultado--' + (registro.venceu ? 'vitoria' : 'derrota'),
        registro.venceu ? '✔ acertou' : '✖ errou'));

      linha.appendChild(ui.el('span', null,
        registro.emoji + ' ' + registro.segredo + ' — ' + registro.tema));

      linha.appendChild(ui.el('span', 'historico__meta',
        registro.tentativas + ' tent · ' + registro.dicas + ' dicas · ' + ui.formatarData(registro.data)));

      linha.appendChild(ui.el('span', 'historico__pontos', '+' + registro.pontos));
      caixa.appendChild(linha);
    });
  }

  ui.atualizarRanking = function () {
    var perfil = GG.perfil.obter();
    montarResumo(perfil);
    montarPodio(perfil);
    montarHistorico(perfil);
    var campoNome = ui.$('#entrada-nome');
    if (document.activeElement !== campoNome) campoNome.value = perfil.nome;
  };

  ui.iniciarTelaRanking = function () {
    ui.$('#entrada-nome').addEventListener('change', function () {
      GG.perfil.definirNome(this.value);
      ui.aviso('Nome salvo neste dispositivo.');
      ui.atualizarRanking();
    });

    ui.$('#btn-limpar-ranking').addEventListener('click', function () {
      if (!window.confirm('Isso apaga pontos, histórico e ranking deste navegador. Continuar?')) return;
      GG.perfil.limpar();
      ui.atualizarRanking();
      ui.atualizarPlacarTopo();
      ui.aviso('Placar zerado.');
    });

    ui.atualizarRanking();
  };
})(window.GG);
