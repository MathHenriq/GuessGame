/* =========================================================================
   NÚCLEO — PONTUAÇÃO
   -------------------------------------------------------------------------
   Fórmula, toda em soma e subtração de pontos inteiros:

       100  de base
     − 12   por tentativa além da primeira
     − 15   por dica revelada
     + bônus da dificuldade (0 no Fácil, 15 no Médio, 35 no Difícil)
     + bônus de tempo (até 20, só com o cronômetro ligado)

   POR QUE NÃO TEM MULTIPLICADOR:
   antes a dificuldade multiplicava o resultado, e isso confundia — acertar
   de primeira no Fácil dava 80 pontos, e o aluno via "Base +100" com 80 no
   placar. Agora cada linha do extrato é um número que entra na soma, e a
   conta fecha à vista: acertar de primeira, sem dica, vale 100 pontos
   exatos em qualquer dificuldade, e o desafio maior aparece como bônus.

   Exemplos:
       acertou de primeira, sem dicas, no Médio .... 115
       acertou na 4ª tentativa, sem dicas, no Médio .. 79
       acertou de primeira usando 3 dicas, no Médio .. 70
   Errar não zera o placar: quem chega perto leva pontos de consolação.
   ========================================================================= */

(function (GG) {
  'use strict';

  var BASE = 100;
  var CUSTO_TENTATIVA = 12;
  var CUSTO_DICA = 15;
  var MINIMO_VITORIA = 10;
  var CONSOLACAO_MAXIMA = 20;

  /**
   * @param {Object} p
   *   dificuldade      'facil' | 'medio' | 'dificil'
   *   tentativasUsadas número de palpites dados
   *   dicasUsadas      número de dicas reveladas
   *   segundos         tempo decorrido (0 quando o cronômetro está desligado)
   *   cronometro       se o cronômetro estava ligado (habilita o bônus de tempo)
   *   venceu           true se descobriu o item secreto
   *   camposCertos     campos acertados no melhor palpite (consolação)
   *   totalCampos      total de campos do tema
   */
  GG.calcularPontuacao = function (p) {
    var dificuldade = GG.dificuldades[p.dificuldade] || GG.dificuldades.medio;
    var bonusDificuldade = dificuldade.bonus || 0;

    if (!p.venceu) {
      // Consolação: proporcional ao quanto o jogador chegou perto de fechar.
      var proporcao = p.totalCampos ? (p.camposCertos || 0) / p.totalCampos : 0;
      var consolacao = Math.round(CONSOLACAO_MAXIMA * proporcao);
      return {
        total: consolacao,
        venceu: false,
        detalhes: [
          { rotulo: 'Melhor palpite', valor: (p.camposCertos || 0) + ' de ' + (p.totalCampos || 0) + ' campos' },
          { rotulo: 'Consolação', valor: '+' + consolacao }
        ]
      };
    }

    var extras = Math.max(0, (p.tentativasUsadas || 1) - 1);
    var descontoTentativas = extras * CUSTO_TENTATIVA;
    var descontoDicas = (p.dicasUsadas || 0) * CUSTO_DICA;

    // Bônus de tempo só existe com o cronômetro ligado: até 20 pontos.
    var bonusTempo = 0;
    if (p.cronometro && p.segundos != null) {
      bonusTempo = Math.max(0, Math.round(CONSOLACAO_MAXIMA - p.segundos / 15));
    }

    var total = Math.max(MINIMO_VITORIA,
      BASE - descontoTentativas - descontoDicas + bonusDificuldade + bonusTempo);

    var detalhes = [
      { rotulo: 'Base', valor: '+' + BASE },
      {
        rotulo: 'Tentativas (' + (p.tentativasUsadas || 1) + ')',
        valor: descontoTentativas ? '−' + descontoTentativas : '0'
      },
      {
        rotulo: 'Dicas (' + (p.dicasUsadas || 0) + ')',
        valor: descontoDicas ? '−' + descontoDicas : '0'
      },
      { rotulo: 'Dificuldade ' + dificuldade.rotulo, valor: '+' + bonusDificuldade }
    ];
    if (p.cronometro) detalhes.push({ rotulo: 'Bônus de tempo', valor: '+' + bonusTempo });
    detalhes.push({ rotulo: 'Total', valor: String(total), destaque: true });

    return { total: total, venceu: true, detalhes: detalhes };
  };
})(window.GG);
