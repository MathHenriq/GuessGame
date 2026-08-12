/* =========================================================================
   NÚCLEO — PARTIDA
   -------------------------------------------------------------------------
   Estado de um desafio: qual é o item secreto, quais itens podem ser
   chutados, quantas tentativas restam, quais dicas já saíram.

   Nada de interface aqui dentro: essa camada só cuida das regras.
   ========================================================================= */

(function (GG) {
  'use strict';

  /* Configuração das três dificuldades. */
  GG.dificuldades = {
    facil: {
      id: 'facil', rotulo: 'Fácil', emoji: '🟢',
      descricao: 'A resposta é um dos 25 itens mais conhecidos.',
      tentativas: 8, dicas: 4, setas: true, palpitesPorDica: 2,
      fatorTolerancia: 1.5, bonus: 0, limiteSorteio: 25
    },
    medio: {
      id: 'medio', rotulo: 'Médio', emoji: '🟡',
      descricao: 'A resposta sai dos 60 itens mais conhecidos.',
      tentativas: 7, dicas: 3, setas: true, palpitesPorDica: 2,
      fatorTolerancia: 1, bonus: 15, limiteSorteio: 60
    },
    dificil: {
      id: 'dificil', rotulo: 'Difícil', emoji: '🔴',
      descricao: 'A resposta pode ser qualquer item, sem setas e com poucas dicas.',
      tentativas: 6, dicas: 2, setas: false, palpitesPorDica: 2,
      fatorTolerancia: 0.5, bonus: 35, limiteSorteio: 0, segredoObscuro: true
    }
  };

  /**
   * Move itens para o começo da lista do tema.
   * Serve para garantir que os óbvios (cachorro, arroz, Brasil...) entrem nos
   * sorteios do fácil e do médio mesmo em temas sem campo de popularidade,
   * onde a "fama" é simplesmente a ordem de cadastro.
   */
  GG.destacarItens = function (temaId, nomes) {
    var tema = GG.indiceTemas[temaId];
    if (!tema) throw new Error('Tema desconhecido ao destacar: ' + temaId);

    var procurados = {};
    nomes.forEach(function (nome, posicao) { procurados[GG.normalizar(nome)] = posicao; });

    var destacados = [];
    var restantes = [];
    tema.itens.forEach(function (item) {
      if (procurados[item.busca] !== undefined) destacados.push(item);
      else restantes.push(item);
    });

    destacados.sort(function (a, b) { return procurados[a.busca] - procurados[b.busca]; });
    tema.itens = destacados.concat(restantes);
    return tema;
  };

  // "Fama" de um item: usada para montar o conjunto do modo fácil.
  GG.famaDoItem = function (tema, item) {
    for (var i = 0; i < tema.campos.length; i++) {
      var campo = tema.campos[i];
      if (campo.tipo === 'ordinal' && campo.escala === 'popularidade') {
        return item.valores[campo.chave];
      }
    }
    return null;
  };

  /**
   * Itens ordenados do mais conhecido para o menos conhecido.
   * Onde existe campo de popularidade, ele manda. Onde não existe (países,
   * animais, carros...), vale a ordem do arquivo — que é cadastrada do mais
   * famoso para o mais raro.
   */
  GG.itensPorFama = function (tema) {
    return tema.itens.map(function (item, indice) {
      return { item: item, indice: indice, fama: GG.famaDoItem(tema, item) };
    }).sort(function (a, b) {
      if (a.fama !== b.fama && a.fama !== null && b.fama !== null) return b.fama - a.fama;
      return a.indice - b.indice;
    }).map(function (registro) { return registro.item; });
  };

  /**
   * De onde SAI a resposta secreta.
   * A dificuldade mexe só aqui: no fácil o item secreto vem dos mais
   * conhecidos, no difícil pode ser qualquer um da categoria.
   *
   * O que o jogador pode CHUTAR é sempre a categoria inteira — como no LoLdle,
   * onde qualquer campeão é um palpite válido. Foi o que corrigiu o problema de
   * itens que existiam na base mas nunca apareciam para ninguém.
   */
  GG.montarSorteio = function (tema, dificuldade) {
    if (!dificuldade.limiteSorteio) return tema.itens.slice();
    if (tema.itens.length <= dificuldade.limiteSorteio) return tema.itens.slice();
    return GG.itensPorFama(tema).slice(0, dificuldade.limiteSorteio);
  };

  /**
   * Cria uma partida.
   * @param {Object} config
   *   temaId        id do tema
   *   dificuldade   'facil' | 'medio' | 'dificil'
   *   tentativas    (opcional) sobrescreve o padrão da dificuldade
   *   dicasMax      (opcional) sobrescreve o padrão da dificuldade
   *   cronometro    liga o cronômetro
   *   itemId        (opcional) força um item secreto — usado pelo modo professor
   *   filtro        (opcional) função que restringe os itens (modo "Eu gosto de")
   */
  GG.criarPartida = function (config) {
    var tema = GG.indiceTemas[config.temaId];
    if (!tema) throw new Error('Tema desconhecido: ' + config.temaId);

    var dificuldade = GG.dificuldades[config.dificuldade] || GG.dificuldades.medio;

    // Chutar: sempre a categoria inteira. Sortear: depende da dificuldade.
    var conjunto = tema.itens.slice();
    var sorteio = GG.montarSorteio(tema, dificuldade);

    if (config.filtro) {
      // O modo "Eu gosto de" restringe os dois conjuntos, mas só se sobrar jogo.
      var filtrado = conjunto.filter(config.filtro);
      if (filtrado.length >= 5) {
        conjunto = filtrado;
        var sorteioFiltrado = sorteio.filter(config.filtro);
        sorteio = sorteioFiltrado.length >= 5 ? sorteioFiltrado : filtrado;
      }
    }

    var segredo;
    if (config.itemId) {
      segredo = tema.itens.filter(function (i) { return i.id === config.itemId; })[0];
      if (segredo && conjunto.indexOf(segredo) === -1) conjunto = conjunto.concat([segredo]);
    }
    if (!segredo) {
      var candidatos = sorteio;
      if (dificuldade.segredoObscuro) {
        // No difícil, o sorteio evita os itens mais óbvios do tema.
        var menosObvios = sorteio.filter(function (item) {
          var fama = GG.famaDoItem(tema, item);
          return fama === null || fama <= 4;
        });
        if (menosObvios.length >= 5) candidatos = menosObvios;
      }
      segredo = GG.sortear(candidatos);
    }

    var dicas = GG.gerarDicas(tema, segredo);

    return {
      tema: tema,
      dificuldade: dificuldade,
      conjunto: conjunto.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); }),
      totalSorteio: sorteio.length,
      segredo: segredo,
      dicas: dicas,
      dicasMax: Math.min(config.dicasMax || dificuldade.dicas, dicas.length),
      dicasReveladas: 0,
      // Pré-requisito: cada dica só destrava depois de N palpites dados.
      // A ideia é que o aluno pense antes de pedir ajuda.
      palpitesPorDica: config.palpitesPorDica || dificuldade.palpitesPorDica,
      tentativasMax: config.tentativas || dificuldade.tentativas,
      tentativas: [],
      cronometro: !!config.cronometro,
      inicio: Date.now(),
      fim: null,
      estado: 'jogando', // 'jogando' | 'vitoria' | 'derrota'
      config: config
    };
  };

  /** Registra um palpite e atualiza o estado da partida. */
  GG.registrarPalpite = function (partida, item) {
    if (partida.estado !== 'jogando') return null;

    var opcoes = {
      setas: partida.dificuldade.setas,
      fatorTolerancia: partida.dificuldade.fatorTolerancia
    };
    var avaliacao = GG.avaliarPalpite(partida.tema, item, partida.segredo, opcoes);
    partida.tentativas.push(avaliacao);

    if (avaliacao.acertou) {
      partida.estado = 'vitoria';
      partida.fim = Date.now();
    } else if (partida.tentativas.length >= partida.tentativasMax) {
      partida.estado = 'derrota';
      partida.fim = Date.now();
    }
    return avaliacao;
  };

  /**
   * Quantas dicas o jogador CONQUISTOU até agora.
   * Dica não é botão de emergência: cada uma custa palpites pensados.
   */
  GG.dicasConquistadas = function (partida) {
    var porPalpites = Math.floor(partida.tentativas.length / partida.palpitesPorDica);
    return Math.min(partida.dicasMax, porPalpites);
  };

  /** Quantos palpites ainda faltam para destravar a próxima dica. */
  GG.palpitesParaProximaDica = function (partida) {
    if (partida.dicasReveladas >= partida.dicasMax) return 0;
    var necessarios = (partida.dicasReveladas + 1) * partida.palpitesPorDica;
    return Math.max(0, necessarios - partida.tentativas.length);
  };

  GG.podePedirDica = function (partida) {
    return partida.estado === 'jogando' &&
      partida.dicasReveladas < partida.dicasMax &&
      partida.dicasReveladas < GG.dicasConquistadas(partida);
  };

  /** Libera a próxima dica, se ela já tiver sido conquistada. */
  GG.revelarDica = function (partida) {
    if (!GG.podePedirDica(partida)) return null;
    var dica = partida.dicas[partida.dicasReveladas];
    partida.dicasReveladas++;
    return dica;
  };

  /** Itens ainda não chutados — alimenta o autocompletar. */
  GG.itensDisponiveis = function (partida) {
    var usados = partida.tentativas.map(function (t) { return t.item.id; });
    return partida.conjunto.filter(function (item) { return usados.indexOf(item.id) === -1; });
  };

  GG.segundosDecorridos = function (partida) {
    return Math.floor(((partida.fim || Date.now()) - partida.inicio) / 1000);
  };

  /** Pontuação final da partida. */
  GG.pontuacaoDaPartida = function (partida) {
    var melhor = 0;
    partida.tentativas.forEach(function (t) {
      if (t.acertosDeCampo > melhor) melhor = t.acertosDeCampo;
    });
    return GG.calcularPontuacao({
      dificuldade: partida.dificuldade.id,
      tentativasUsadas: partida.tentativas.length,
      dicasUsadas: partida.dicasReveladas,
      segundos: GG.segundosDecorridos(partida),
      cronometro: partida.cronometro,
      venceu: partida.estado === 'vitoria',
      camposCertos: melhor,
      totalCampos: partida.tema.campos.length
    });
  };
})(window.GG);
