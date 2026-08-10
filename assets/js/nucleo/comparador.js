/* =========================================================================
   NÚCLEO — COMPARADOR
   -------------------------------------------------------------------------
   O coração do jogo: compara o palpite com a resposta secreta, campo a campo,
   e devolve 🟩 correto, 🟨 parcialmente correto ou 🟥 errado.

   Regras por tipo de campo:
     ano      igual = 🟩 | dentro da tolerância = 🟨 | fora = 🟥  (+ seta ↑/↓)
     numero   igual ao ano, para grandezas que não são data (número atômico,
              número de lados, quantidade de falantes...)
     ordinal  igual = 🟩 | um degrau de distância = 🟨 | resto = 🟥 (+ seta)
     pais     mesmo país = 🟩 | mesmo continente = 🟨 | resto = 🟥
     lista    conjuntos iguais = 🟩 | alguma coincidência = 🟨 | nenhuma = 🟥
     texto    igual = 🟩 | palavra em comum = 🟨 | resto = 🟥
   ========================================================================= */

(function (GG) {
  'use strict';

  var CERTO = 'certo', QUASE = 'quase', ERRADO = 'errado';

  // Palavras curtas ou genéricas não valem como "coincidência parcial" em textos.
  var IRRELEVANTES = ['de', 'da', 'do', 'dos', 'das', 'e', 'a', 'o', 'os', 'as',
    'the', 'of', 'irmaos', 'irmas', 'nao', 'sim', 'recebeu'];

  function palavras(texto) {
    return GG.normalizar(texto).split(' ').filter(function (p) {
      return p.length > 2 && IRRELEVANTES.indexOf(p) === -1;
    });
  }

  function resultado(estado, seta, detalhe) {
    return { estado: estado, seta: seta || '', detalhe: detalhe || '' };
  }

  function compararAno(palpite, segredo, campo, opcoes) {
    if (palpite == null || segredo == null) {
      return resultado(palpite == null && segredo == null ? CERTO : ERRADO, '',
        palpite == null ? 'sem ano definido' : '');
    }
    var tolerancia = (campo.tolerancia || 10) * (opcoes.fatorTolerancia || 1);
    var diferenca = segredo - palpite;
    var seta = opcoes.setas && diferenca !== 0 ? (diferenca > 0 ? '↑' : '↓') : '';
    if (diferenca === 0) return resultado(CERTO);
    if (Math.abs(diferenca) <= tolerancia) return resultado(QUASE, seta, 'perto');
    return resultado(ERRADO, seta);
  }

  function compararOrdinal(palpite, segredo, campo, opcoes) {
    var diferenca = segredo - palpite;
    var seta = opcoes.setas && diferenca !== 0 ? (diferenca > 0 ? '↑' : '↓') : '';
    if (diferenca === 0) return resultado(CERTO);
    if (Math.abs(diferenca) === 1) return resultado(QUASE, seta, 'quase lá');
    return resultado(ERRADO, seta);
  }

  function compararPais(palpite, segredo) {
    if (GG.normalizar(palpite) === GG.normalizar(segredo)) return resultado(CERTO);
    var a = GG.continentes[palpite], b = GG.continentes[segredo];
    if (a && b && a === b) return resultado(QUASE, '', 'mesmo continente');
    return resultado(ERRADO);
  }

  function compararLista(palpite, segredo) {
    var listaA = (palpite || []).map(GG.normalizar);
    var listaB = (segredo || []).map(GG.normalizar);
    var comuns = listaA.filter(function (v) { return listaB.indexOf(v) !== -1; });
    if (comuns.length === listaB.length && listaA.length === listaB.length) return resultado(CERTO);
    if (comuns.length > 0) return resultado(QUASE, '', comuns.length + ' em comum');
    return resultado(ERRADO);
  }

  function compararTexto(palpite, segredo) {
    if (GG.normalizar(palpite) === GG.normalizar(segredo)) return resultado(CERTO);
    var listaA = palavras(palpite), listaB = palavras(segredo);
    var temComum = listaA.some(function (p) { return listaB.indexOf(p) !== -1; });
    return temComum ? resultado(QUASE, '', 'parte em comum') : resultado(ERRADO);
  }

  /**
   * Compara um único campo.
   * @param {Object} campo   definição do campo (chave, rotulo, tipo...)
   * @param {*} palpite      valor do item que o jogador chutou
   * @param {*} segredo      valor do item secreto
   * @param {Object} opcoes  { setas: bool, fatorTolerancia: number }
   */
  GG.compararCampo = function (campo, palpite, segredo, opcoes) {
    opcoes = opcoes || {};
    switch (campo.tipo) {
      case 'ano':
      case 'numero': return compararAno(palpite, segredo, campo, opcoes);
      case 'ordinal': return compararOrdinal(palpite, segredo, campo, opcoes);
      case 'pais': return compararPais(palpite, segredo);
      case 'lista': return compararLista(palpite, segredo);
      default: return compararTexto(palpite, segredo);
    }
  };

  /**
   * Compara o item chutado com o item secreto em todos os campos do tema.
   * Devolve as células prontas para virar uma linha da tabela.
   */
  GG.avaliarPalpite = function (tema, palpite, segredo, opcoes) {
    var acertou = palpite.id === segredo.id;
    var celulas = tema.campos.map(function (campo) {
      var bruto = palpite.valores[campo.chave];
      var comparacao = GG.compararCampo(campo, bruto, segredo.valores[campo.chave], opcoes);
      comparacao.campo = campo;
      comparacao.texto = GG.exibirValor(campo, bruto);
      return comparacao;
    });

    return {
      item: palpite,
      acertou: acertou,
      celulas: celulas,
      // Quantos campos o jogador acertou em cheio — usado na barra de progresso.
      acertosDeCampo: celulas.filter(function (c) { return c.estado === CERTO; }).length
    };
  };
})(window.GG);
