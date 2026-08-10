/* =========================================================================
   NÚCLEO — PONTUAÇÃO
   -------------------------------------------------------------------------
   Fórmula:
       pontos = (BASE − tentativas extras × 12 − dicas × 15 + bônus de tempo)
                × multiplicador da dificuldade

   Exemplos (dificuldade média):
       acertou de primeira, sem dicas ............ 100 pontos
       acertou na 4ª tentativa, sem dicas ........  64 pontos
       acertou de primeira usando 3 dicas ........  55 pontos
   Errar não zera o placar: quem chega perto leva pontos de consolação.
   ========================================================================= */

(function (GG) {
  'use strict';

  var BASE = 100;
  var CUSTO_TENTATIVA = 12;
  var CUSTO_DICA = 15;
  var MINIMO_VITORIA = 10;

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

    if (!p.venceu) {
      // Consolação: até 20 pontos proporcionais ao quanto o jogador chegou perto.
      var proporcao = p.totalCampos ? (p.camposCertos || 0) / p.totalCampos : 0;
      return {
        total: Math.round(20 * proporcao * dificuldade.multiplicador),
        detalhes: [{ rotulo: 'Chegou perto', valor: Math.round(proporcao * 100) + '% dos campos' }]
      };
    }

    var extras = Math.max(0, (p.tentativasUsadas || 1) - 1);
    var descontoTentativas = extras * CUSTO_TENTATIVA;
    var descontoDicas = (p.dicasUsadas || 0) * CUSTO_DICA;

    // Bônus de tempo só existe com o cronômetro ligado: até 20 pontos.
    var bonusTempo = 0;
    if (p.cronometro && p.segundos != null) {
      bonusTempo = Math.max(0, Math.round(20 - p.segundos / 15));
    }

    var bruto = BASE - descontoTentativas - descontoDicas + bonusTempo;
    var total = Math.max(MINIMO_VITORIA, Math.round(bruto * dificuldade.multiplicador));

    var detalhes = [
      { rotulo: 'Base', valor: '+' + BASE },
      { rotulo: 'Tentativas (' + (p.tentativasUsadas || 1) + ')', valor: descontoTentativas ? '−' + descontoTentativas : '0' },
      { rotulo: 'Dicas (' + (p.dicasUsadas || 0) + ')', valor: descontoDicas ? '−' + descontoDicas : '0' }
    ];
    if (p.cronometro) detalhes.push({ rotulo: 'Bônus de tempo', valor: '+' + bonusTempo });
    detalhes.push({ rotulo: 'Dificuldade ' + dificuldade.rotulo, valor: '×' + dificuldade.multiplicador });

    return { total: total, detalhes: detalhes };
  };
})(window.GG);
