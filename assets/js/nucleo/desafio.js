/* =========================================================================
   NÚCLEO — DESAFIOS COMPARTILHÁVEIS
   -------------------------------------------------------------------------
   O modo professor gera um código curto que carrega toda a configuração do
   desafio (tema, dificuldade, tentativas, dicas, cronômetro e até o item
   secreto escolhido a dedo).

   O código vai embutido no endereço da página (#d=...), então basta mandar o
   link no grupo da turma: todo mundo joga exatamente o mesmo desafio.
   ========================================================================= */

(function (GG) {
  'use strict';

  // Chaves curtas para o código não ficar gigante.
  var MAPA = { temaId: 't', dificuldade: 'd', tentativas: 'n', dicasMax: 'h', cronometro: 'c', itemId: 'i', titulo: 'g' };

  function paraSeguro(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function deSeguro(codigo) {
    var texto = codigo.replace(/-/g, '+').replace(/_/g, '/');
    while (texto.length % 4) texto += '=';
    return texto;
  }

  GG.codificarDesafio = function (config) {
    var compacto = {};
    Object.keys(MAPA).forEach(function (chave) {
      if (config[chave] !== undefined && config[chave] !== null && config[chave] !== '') {
        compacto[MAPA[chave]] = config[chave];
      }
    });
    var json = JSON.stringify(compacto);
    return paraSeguro(window.btoa(unescape(encodeURIComponent(json))));
  };

  GG.decodificarDesafio = function (codigo) {
    try {
      var json = decodeURIComponent(escape(window.atob(deSeguro(String(codigo).trim()))));
      var compacto = JSON.parse(json);
      var config = {};
      Object.keys(MAPA).forEach(function (chave) {
        if (compacto[MAPA[chave]] !== undefined) config[chave] = compacto[MAPA[chave]];
      });
      return GG.indiceTemas[config.temaId] ? config : null;
    } catch (e) {
      return null;
    }
  };

  GG.linkDoDesafio = function (codigo) {
    var base = window.location.href.split('#')[0];
    return base + '#d=' + codigo;
  };

  /** Lê um desafio do endereço atual, se houver. */
  GG.desafioDaURL = function () {
    var hash = window.location.hash || '';
    var casou = hash.match(/[#&]d=([^&]+)/);
    return casou ? GG.decodificarDesafio(casou[1]) : null;
  };
})(window.GG);
