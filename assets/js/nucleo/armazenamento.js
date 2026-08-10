/* =========================================================================
   NÚCLEO — ARMAZENAMENTO LOCAL
   -------------------------------------------------------------------------
   Perfil, pontuação acumulada, sequência de vitórias e ranking da turma.
   Tudo fica no localStorage do navegador — nenhum dado sai da máquina.

   Quando o jogo virar plataforma online, basta trocar `ler` e `gravar`
   por chamadas à API: o resto do código não muda.
   ========================================================================= */

(function (GG) {
  'use strict';

  var CHAVE = 'guessgame.perfil.v1';
  var memoria = null; // usado se o navegador bloquear o localStorage

  var PADRAO = {
    nome: '',
    pontos: 0,
    partidas: 0,
    vitorias: 0,
    sequencia: 0,
    melhorSequencia: 0,
    ranking: [],   // [{ nome, pontos, tema, dificuldade, data }]
    historico: []  // últimas partidas
  };

  function ler() {
    if (memoria) return memoria;
    try {
      var bruto = window.localStorage.getItem(CHAVE);
      memoria = bruto ? JSON.parse(bruto) : JSON.parse(JSON.stringify(PADRAO));
    } catch (e) {
      memoria = JSON.parse(JSON.stringify(PADRAO));
    }
    // Garante que perfis antigos ganhem campos novos sem quebrar.
    Object.keys(PADRAO).forEach(function (chave) {
      if (memoria[chave] === undefined) memoria[chave] = PADRAO[chave];
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

    definirNome: function (nome) {
      var perfil = ler();
      perfil.nome = String(nome || '').trim().slice(0, 24);
      gravar(perfil);
      return perfil;
    },

    /** Fecha uma partida: soma pontos, atualiza sequência e ranking. */
    registrarPartida: function (partida, pontuacao) {
      var perfil = ler();
      var venceu = partida.estado === 'vitoria';

      perfil.partidas++;
      perfil.pontos += pontuacao.total;
      if (venceu) {
        perfil.vitorias++;
        perfil.sequencia++;
        perfil.melhorSequencia = Math.max(perfil.melhorSequencia, perfil.sequencia);
      } else {
        perfil.sequencia = 0;
      }

      var registro = {
        nome: perfil.nome || 'Jogador',
        pontos: pontuacao.total,
        tema: partida.tema.nome,
        emoji: partida.tema.emoji,
        dificuldade: partida.dificuldade.rotulo,
        segredo: partida.segredo.nome,
        venceu: venceu,
        tentativas: partida.tentativas.length,
        dicas: partida.dicasReveladas,
        segundos: GG.segundosDecorridos(partida),
        data: new Date().toISOString()
      };

      perfil.historico.unshift(registro);
      perfil.historico = perfil.historico.slice(0, 30);

      perfil.ranking.push(registro);
      perfil.ranking.sort(function (a, b) { return b.pontos - a.pontos; });
      perfil.ranking = perfil.ranking.slice(0, 20);

      gravar(perfil);
      return perfil;
    },

    limpar: function () {
      memoria = JSON.parse(JSON.stringify(PADRAO));
      try { window.localStorage.removeItem(CHAVE); } catch (e) { /* ignorado */ }
      return memoria;
    }
  };
})(window.GG);
