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
      descricao: 'Só os itens mais conhecidos e bastante ajuda.',
      tentativas: 8, dicas: 4, setas: true,
      fatorTolerancia: 1.5, multiplicador: 0.8, poolReduzido: true
    },
    medio: {
      id: 'medio', rotulo: 'Médio', emoji: '🟡',
      descricao: 'Categoria inteira, com setas de apoio.',
      tentativas: 6, dicas: 3, setas: true,
      fatorTolerancia: 1, multiplicador: 1, poolReduzido: false
    },
    dificil: {
      id: 'dificil', rotulo: 'Difícil', emoji: '🔴',
      descricao: 'Itens parecidos, sem setas e com poucas dicas.',
      tentativas: 5, dicas: 2, setas: false,
      fatorTolerancia: 0.5, multiplicador: 1.35, poolReduzido: false, segredoObscuro: true
    }
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
   * Conjunto de itens que participam da partida (respostas possíveis e
   * também as opções que o jogador pode chutar).
   */
  GG.montarConjunto = function (tema, dificuldade) {
    if (!dificuldade.poolReduzido) return tema.itens.slice();

    // Temas sem campo de popularidade (países, animais, carros...) usam os
    // primeiros itens do arquivo, cadastrados do mais conhecido ao mais raro.
    if (GG.famaDoItem(tema, tema.itens[0]) === null) return tema.itens.slice(0, 12);

    var famosos = tema.itens.filter(function (item) {
      return GG.famaDoItem(tema, item) >= 4;
    });
    if (famosos.length < 8) famosos = tema.itens.slice(0, 12);
    return famosos;
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
    var conjunto = GG.montarConjunto(tema, dificuldade);

    if (config.filtro) {
      var filtrado = conjunto.filter(config.filtro);
      // Só aplica o filtro se ainda sobrar jogo suficiente.
      if (filtrado.length >= 5) conjunto = filtrado;
    }

    var segredo;
    if (config.itemId) {
      segredo = tema.itens.filter(function (i) { return i.id === config.itemId; })[0];
      if (segredo && conjunto.indexOf(segredo) === -1) conjunto = conjunto.concat([segredo]);
    }
    if (!segredo) {
      var candidatos = conjunto;
      if (dificuldade.segredoObscuro) {
        // No difícil, o sorteio evita os itens mais óbvios do tema.
        var menosObvios = conjunto.filter(function (item) {
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
      segredo: segredo,
      dicas: dicas,
      dicasMax: Math.min(config.dicasMax || dificuldade.dicas, dicas.length),
      dicasReveladas: 0,
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

  /** Libera a próxima dica, se ainda houver. */
  GG.revelarDica = function (partida) {
    if (partida.dicasReveladas >= partida.dicasMax) return null;
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
