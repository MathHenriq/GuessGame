/* =========================================================================
   NÚCLEO — IMAGEM DO ITEM SECRETO
   -------------------------------------------------------------------------
   Ao fim da partida o jogo mostra uma foto do item revelado.

   POR QUE NÃO É A API DO GOOGLE IMAGENS:
   o Google não tem API pública e gratuita de imagens — a Custom Search exige
   chave, cadastro de faturamento e tem cota diária baixíssima; e raspar a
   página de resultados é bloqueado por CORS no navegador (além de ferir os
   termos de uso). Uma chave dessas também não pode ficar dentro de um site
   estático: qualquer aluno abriria o código-fonte e leria a chave.

   A solução aqui faz as duas coisas:
   1. Busca automática de imagem e resumo na Wikipédia (API pública, com CORS
      liberado, sem chave, imagens de licença livre) — em português e, se não
      achar, em inglês.
   2. Um botão "Ver no Google Imagens", que abre a busca real do Google em
      outra aba, para quando o aluno quiser ver mais.

   Sem internet, nada quebra: aparece o emoji da categoria no lugar da foto.
   ========================================================================= */

(function (GG) {
  'use strict';

  var CHAVE_CACHE = 'guessgame.imagens.v1';
  var TEMPO_LIMITE = 6000;
  var cache = null;

  function lerCache() {
    if (cache) return cache;
    try {
      cache = JSON.parse(window.localStorage.getItem(CHAVE_CACHE) || '{}');
    } catch (e) {
      cache = {};
    }
    return cache;
  }

  function gravarCache(chave, valor) {
    var atual = lerCache();
    atual[chave] = valor;
    try {
      window.localStorage.setItem(CHAVE_CACHE, JSON.stringify(atual));
    } catch (e) {
      // Cache cheio: esquece o histórico e recomeça, sem atrapalhar o jogo.
      cache = {};
      try { window.localStorage.removeItem(CHAVE_CACHE); } catch (e2) { /* ignorado */ }
    }
  }

  /** Termo de busca: nome do item + contexto do tema ("Pelé futebol"). */
  GG.termoDeBusca = function (tema, item) {
    return (item.nome + ' ' + (tema.contexto || '')).trim();
  };

  GG.linkGoogleImagens = function (tema, item) {
    return 'https://www.google.com/search?tbm=isch&q=' +
      encodeURIComponent(GG.termoDeBusca(tema, item));
  };

  function buscarJSON(url, aoTerminar) {
    if (!window.fetch) return aoTerminar(null);

    var cancelador = window.AbortController ? new window.AbortController() : null;
    var relogio = window.setTimeout(function () {
      if (cancelador) cancelador.abort();
    }, TEMPO_LIMITE);

    window.fetch(url, cancelador ? { signal: cancelador.signal } : undefined)
      .then(function (resposta) { return resposta.ok ? resposta.json() : null; })
      .then(function (dados) { window.clearTimeout(relogio); aoTerminar(dados); })
      .catch(function () { window.clearTimeout(relogio); aoTerminar(null); });
  }

  function endereco(idioma, parametros) {
    return 'https://' + idioma + '.wikipedia.org/w/api.php?format=json&origin=*&' + parametros;
  }

  // Lê a página pelo título exato (seguindo redirecionamentos).
  function consultarPagina(idioma, titulo, aoTerminar) {
    buscarJSON(endereco(idioma, 'action=query&redirects=1&prop=pageimages|extracts' +
      '&piprop=thumbnail&pithumbsize=520&exintro=1&explaintext=1&exsentences=2&titles=' +
      encodeURIComponent(titulo)), function (dados) {

      var paginas = dados && dados.query && dados.query.pages;
      if (!paginas) return aoTerminar(null);

      var chave = Object.keys(paginas)[0];
      var pagina = paginas[chave];
      if (!pagina || pagina.missing !== undefined) return aoTerminar(null);

      aoTerminar({
        imagem: pagina.thumbnail ? pagina.thumbnail.source : '',
        resumo: (pagina.extract || '').trim(),
        titulo: pagina.title,
        idioma: idioma
      });
    });
  }

  // Quando o título exato não existe, procura o artigo mais provável.
  function procurarTitulo(idioma, termo, aoTerminar) {
    buscarJSON(endereco(idioma, 'action=query&list=search&srlimit=1&srsearch=' +
      encodeURIComponent(termo)), function (dados) {
      var achados = dados && dados.query && dados.query.search;
      aoTerminar(achados && achados.length ? achados[0].title : null);
    });
  }

  /**
   * Procura a imagem do item.
   * Ordem: cache → título em português → busca em português → título em inglês.
   * @param {Function} aoTerminar recebe { imagem, resumo, titulo, idioma } ou null.
   */
  GG.buscarImagem = function (tema, item, aoTerminar) {
    var guardado = lerCache()[item.id];
    if (guardado) return aoTerminar(guardado.imagem || guardado.resumo ? guardado : null);

    function concluir(resultado) {
      gravarCache(item.id, resultado || {});
      aoTerminar(resultado && (resultado.imagem || resultado.resumo) ? resultado : null);
    }

    consultarPagina('pt', item.nome, function (porTitulo) {
      if (porTitulo && porTitulo.imagem) return concluir(porTitulo);

      procurarTitulo('pt', GG.termoDeBusca(tema, item), function (titulo) {
        if (!titulo) return tentarIngles(porTitulo);

        consultarPagina('pt', titulo, function (porBusca) {
          if (porBusca && porBusca.imagem) return concluir(porBusca);
          tentarIngles(porBusca || porTitulo);
        });
      });
    });

    function tentarIngles(melhorAteAgora) {
      consultarPagina('en', item.nome, function (emIngles) {
        if (emIngles && emIngles.imagem) {
          // Mantém o resumo em português, se já tivermos um.
          if (melhorAteAgora && melhorAteAgora.resumo) emIngles.resumo = melhorAteAgora.resumo;
          return concluir(emIngles);
        }
        concluir(melhorAteAgora);
      });
    }
  };
})(window.GG);
