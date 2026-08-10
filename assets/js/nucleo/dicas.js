/* =========================================================================
   NÚCLEO — DICAS PROGRESSIVAS
   -------------------------------------------------------------------------
   As dicas vão do mais genérico para o mais específico. A última sempre
   revela a letra inicial — é a rede de segurança do jogador.

   Cada tema ganha dicas automáticas (século, região, gênero, popularidade)
   a partir dos próprios campos, mais a dica autoral escrita na base de dados.
   Ou seja: ao cadastrar um item novo, as dicas nascem prontas.
   ========================================================================= */

(function (GG) {
  'use strict';

  function campoPorTipo(tema, tipo) {
    for (var i = 0; i < tema.campos.length; i++) {
      if (tema.campos[i].tipo === tipo) return tema.campos[i];
    }
    return null;
  }

  function contarLetras(nome) {
    return nome.replace(/[^A-Za-zÀ-ÿ0-9]/g, '').length;
  }

  /**
   * Monta a lista completa de dicas de um item, na ordem em que serão liberadas.
   * @returns {Array<{rotulo: string, texto: string}>}
   */
  GG.gerarDicas = function (tema, item) {
    var dicas = [];

    // 1 — Época (ou região, quando o tema não tem ano).
    var campoAno = campoPorTipo(tema, 'ano');
    var ano = campoAno ? item.valores[campoAno.chave] : null;
    if (typeof ano === 'number') {
      var seculo = GG.seculo(ano);
      dicas.push({
        rotulo: 'Época',
        texto: ano < 0
          ? 'Vem da Antiguidade: século ' + seculo + '.'
          : 'É algo do século ' + seculo + '.'
      });
    }

    // 2 — Origem geográfica, sem entregar o país.
    var campoPais = campoPorTipo(tema, 'pais');
    if (campoPais) {
      var pais = item.valores[campoPais.chave];
      var continente = GG.continentes[pais];
      if (continente) dicas.push({ rotulo: 'Origem', texto: 'Tem origem na ' + continente + '.' });
    } else if (item.valores.continente) {
      dicas.push({ rotulo: 'Origem', texto: 'Fica na ' + item.valores.continente + '.' });
    } else if (item.valores.regiao) {
      dicas.push({ rotulo: 'Origem', texto: 'É encontrado em: ' + item.valores.regiao + '.' });
    }

    // 3 — Classificação (gênero, área, tipo...).
    var campoLista = campoPorTipo(tema, 'lista');
    if (campoLista) {
      var valores = item.valores[campoLista.chave] || [];
      if (valores.length) {
        dicas.push({
          rotulo: campoLista.rotulo,
          texto: 'Está relacionado a: ' + valores[0] + '.'
        });
      }
    }

    // 4 — Dica autoral escrita na base de dados.
    item.dicasAutorais.forEach(function (texto) {
      dicas.push({ rotulo: 'Pista', texto: texto });
    });

    // 5 — Escala ordinal (popularidade, porte, população...).
    var campoOrdinal = campoPorTipo(tema, 'ordinal');
    if (campoOrdinal) {
      var nivel = GG.escalas[campoOrdinal.escala][item.valores[campoOrdinal.chave] - 1];
      dicas.push({
        rotulo: campoOrdinal.rotulo,
        texto: campoOrdinal.rotulo + ': ' + nivel.toLowerCase() + '.'
      });
    }

    // 6 — Reserva: temas feitos só de campos de texto (Roupas, Profissões,
    // Formas geométricas) não teriam dicas suficientes. Aqui os próprios
    // campos viram dica, do mais geral para o mais específico.
    if (dicas.length < 3) {
      tema.campos.forEach(function (campo) {
        if (dicas.length >= 3) return;
        if (campo.tipo !== 'texto' && campo.tipo !== 'numero') return;
        var valor = item.valores[campo.chave];
        if (valor == null || valor === '') return;
        dicas.push({
          rotulo: campo.rotulo,
          texto: campo.rotulo + ': ' + GG.exibirValor(campo, valor) + '.'
        });
      });
    }

    // 6 — Dica final: a letra inicial e o tamanho do nome.
    dicas.push({
      rotulo: 'Dica final',
      texto: 'Começa com a letra ' + item.nome.charAt(0).toUpperCase() +
        ' e tem ' + contarLetras(item.nome) + ' letras.'
    });

    return dicas;
  };
})(window.GG);
