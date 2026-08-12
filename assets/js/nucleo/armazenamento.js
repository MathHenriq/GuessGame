/* =========================================================================
   NÚCLEO — ARMAZENAMENTO LOCAL
   -------------------------------------------------------------------------
   Jogadores, pontuação acumulada, sequência de vitórias e ranking da turma.
   Tudo fica no localStorage do navegador — nenhum dado sai da máquina.

   COMO O RANKING FUNCIONA:
   o placar é POR JOGADOR, identificado pelo apelido digitado ao entrar.
   Vários alunos podem revezar no mesmo computador: cada apelido acumula os
   próprios pontos, e a troca de apelido é só trocar de fila no placar.
   De cada jogador guardamos o total geral e o total por categoria, o que
   permite os dois rankings que a turma pede: o geral e o da categoria.

   Não há login nem senha de propósito: em sala isso só atrapalharia, e
   nenhum dado pessoal é coletado.

   Quando o jogo virar plataforma online, basta trocar `ler` e `gravar`
   por chamadas à API: o resto do código não muda.
   ========================================================================= */

(function (GG) {
  'use strict';

  var CHAVE = 'guessgame.perfil.v2';
  var CHAVE_ANTIGA = 'guessgame.perfil.v1';
  var memoria = null; // usado se o navegador bloquear o localStorage

  var PADRAO = {
    nome: '',
    jogadores: {}, // apelido -> { nome, pontos, partidas, vitorias, melhorSequencia, porTema: {} }
    historico: []  // últimas partidas de todo mundo neste aparelho
  };

  function copiaLimpa() {
    return JSON.parse(JSON.stringify(PADRAO));
  }

  /** Ficha de um jogador, criada na hora se ainda não existir. */
  function fichaDe(perfil, nome) {
    var chave = GG.normalizar(nome);
    if (!chave) return null;

    if (!perfil.jogadores[chave]) {
      perfil.jogadores[chave] = {
        nome: nome,
        pontos: 0,
        partidas: 0,
        vitorias: 0,
        sequencia: 0,
        melhorSequencia: 0,
        porTema: {} // temaId -> { nome, emoji, pontos, partidas, vitorias }
      };
    }
    // O apelido guarda a grafia mais recente ("ana" e "Ana" são o mesmo aluno).
    perfil.jogadores[chave].nome = nome;
    return perfil.jogadores[chave];
  }

  /** Converte o formato antigo (um perfil só) no formato por jogador. */
  function migrar(antigo) {
    var perfil = copiaLimpa();
    if (!antigo) return perfil;

    perfil.nome = antigo.nome || '';
    perfil.historico = Array.isArray(antigo.historico) ? antigo.historico : [];

    if (antigo.nome && antigo.pontos) {
      var ficha = fichaDe(perfil, antigo.nome);
      if (ficha) {
        ficha.pontos = antigo.pontos || 0;
        ficha.partidas = antigo.partidas || 0;
        ficha.vitorias = antigo.vitorias || 0;
        ficha.melhorSequencia = antigo.melhorSequencia || 0;
      }
    }
    return perfil;
  }

  function ler() {
    if (memoria) return memoria;

    try {
      var bruto = window.localStorage.getItem(CHAVE);
      if (bruto) {
        memoria = JSON.parse(bruto);
      } else {
        var anterior = window.localStorage.getItem(CHAVE_ANTIGA);
        memoria = migrar(anterior ? JSON.parse(anterior) : null);
      }
    } catch (e) {
      memoria = copiaLimpa();
    }

    // Garante que perfis antigos ganhem campos novos sem quebrar.
    Object.keys(PADRAO).forEach(function (chave) {
      if (memoria[chave] === undefined) memoria[chave] = copiaLimpa()[chave];
    });
    return memoria;
  }

  function gravar(perfil) {
    memoria = perfil;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(perfil));
    } catch (e) {
      // Modo anônimo ou armazenamento cheio: o jogo continua, só não persiste.
    }
  }

  GG.perfil = {
    obter: ler,

    /** Ficha do jogador da vez — a que recebe os pontos das partidas. */
    atual: function () {
      var perfil = ler();
      return fichaDe(perfil, perfil.nome) || {
        nome: '', pontos: 0, partidas: 0, vitorias: 0,
        sequencia: 0, melhorSequencia: 0, porTema: {}
      };
    },

    temNome: function () {
      return !!GG.normalizar(ler().nome);
    },

    definirNome: function (nome) {
      var perfil = ler();
      perfil.nome = String(nome || '').trim().slice(0, 24);
      if (perfil.nome) fichaDe(perfil, perfil.nome);
      gravar(perfil);
      return perfil;
    },

    /** Todo mundo que já jogou neste aparelho, do maior placar para o menor. */
    listarJogadores: function () {
      var perfil = ler();
      return Object.keys(perfil.jogadores)
        .map(function (chave) { return perfil.jogadores[chave]; })
        .sort(function (a, b) { return b.pontos - a.pontos; });
    },

    /** Placar de uma categoria: só quem já jogou nela. */
    rankingDoTema: function (temaId) {
      return GG.perfil.listarJogadores()
        .filter(function (jogador) { return jogador.porTema[temaId]; })
        .map(function (jogador) {
          var dados = jogador.porTema[temaId];
          return {
            nome: jogador.nome,
            pontos: dados.pontos,
            partidas: dados.partidas,
            vitorias: dados.vitorias
          };
        })
        .sort(function (a, b) { return b.pontos - a.pontos; });
    },

    /** Categorias em que alguém já jogou, da mais disputada para a menos. */
    temasComPartidas: function () {
      var soma = {};
      GG.perfil.listarJogadores().forEach(function (jogador) {
        Object.keys(jogador.porTema).forEach(function (temaId) {
          var dados = jogador.porTema[temaId];
          if (!soma[temaId]) {
            soma[temaId] = { temaId: temaId, nome: dados.nome, emoji: dados.emoji, partidas: 0 };
          }
          soma[temaId].partidas += dados.partidas;
        });
      });
      return Object.keys(soma).map(function (id) { return soma[id]; })
        .sort(function (a, b) { return b.partidas - a.partidas; });
    },

    /** Fecha uma partida: soma pontos no jogador da vez e na categoria. */
    registrarPartida: function (partida, pontuacao) {
      var perfil = ler();
      var venceu = partida.estado === 'vitoria';
      var ficha = fichaDe(perfil, perfil.nome);

      if (ficha) {
        ficha.partidas++;
        ficha.pontos += pontuacao.total;
        if (venceu) {
          ficha.vitorias++;
          ficha.sequencia++;
          ficha.melhorSequencia = Math.max(ficha.melhorSequencia, ficha.sequencia);
        } else {
          ficha.sequencia = 0;
        }

        var porTema = ficha.porTema[partida.tema.id];
        if (!porTema) {
          porTema = ficha.porTema[partida.tema.id] = {
            nome: partida.tema.nome, emoji: partida.tema.emoji,
            pontos: 0, partidas: 0, vitorias: 0
          };
        }
        porTema.nome = partida.tema.nome;
        porTema.emoji = partida.tema.emoji;
        porTema.pontos += pontuacao.total;
        porTema.partidas++;
        if (venceu) porTema.vitorias++;
      }

      perfil.historico.unshift({
        nome: perfil.nome || 'Jogador',
        pontos: pontuacao.total,
        temaId: partida.tema.id,
        tema: partida.tema.nome,
        emoji: partida.tema.emoji,
        dificuldade: partida.dificuldade.rotulo,
        segredo: partida.segredo.nome,
        venceu: venceu,
        tentativas: partida.tentativas.length,
        dicas: partida.dicasReveladas,
        segundos: GG.segundosDecorridos(partida),
        data: new Date().toISOString()
      });
      perfil.historico = perfil.historico.slice(0, 40);

      gravar(perfil);
      return perfil;
    },

    limpar: function () {
      var nome = ler().nome;
      memoria = copiaLimpa();
      memoria.nome = nome; // zerar o placar não desloga quem está jogando
      if (nome) fichaDe(memoria, nome);
      try {
        window.localStorage.removeItem(CHAVE);
        window.localStorage.removeItem(CHAVE_ANTIGA);
      } catch (e) { /* ignorado */ }
      gravar(memoria);
      return memoria;
    }
  };
})(window.GG);
