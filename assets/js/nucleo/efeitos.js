/* =========================================================================
   NÚCLEO — EFEITOS (som e confete)
   -------------------------------------------------------------------------
   Sem arquivos externos: os sons são sintetizados na hora com a Web Audio API
   e o confete é desenhado em um canvas. Assim o projeto continua sendo uma
   pasta que roda em qualquer lugar, inclusive offline.
   ========================================================================= */

(function (GG) {
  'use strict';

  /* ------------------------------------------------------------------ SOM */
  var contexto = null;
  var ligado = true;

  function garantirContexto() {
    if (!contexto) {
      var Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return null;
      contexto = new Audio();
    }
    if (contexto.state === 'suspended') contexto.resume();
    return contexto;
  }

  function nota(frequencia, inicio, duracao, volume, forma) {
    var ctx = garantirContexto();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var ganho = ctx.createGain();
    osc.type = forma || 'triangle';
    osc.frequency.setValueAtTime(frequencia, ctx.currentTime + inicio);
    ganho.gain.setValueAtTime(0.0001, ctx.currentTime + inicio);
    ganho.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + inicio + 0.01);
    ganho.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + inicio + duracao);
    osc.connect(ganho).connect(ctx.destination);
    osc.start(ctx.currentTime + inicio);
    osc.stop(ctx.currentTime + inicio + duracao + 0.02);
  }

  GG.som = {
    ligado: function () { return ligado; },
    alternar: function () { ligado = !ligado; return ligado; },

    clique: function () { if (ligado) nota(420, 0, 0.06, 0.05, 'square'); },
    revelar: function (indice) { if (ligado) nota(320 + indice * 60, 0, 0.09, 0.05); },
    erro: function () { if (ligado) { nota(180, 0, 0.14, 0.06, 'sawtooth'); } },
    dica: function () { if (ligado) { nota(660, 0, 0.08, 0.05); nota(880, 0.08, 0.12, 0.04); } },
    vitoria: function () {
      if (!ligado) return;
      [523, 659, 784, 1047].forEach(function (f, i) { nota(f, i * 0.09, 0.22, 0.06); });
    },
    derrota: function () {
      if (!ligado) return;
      [392, 349, 294].forEach(function (f, i) { nota(f, i * 0.14, 0.3, 0.05, 'sine'); });
    }
  };

  /* --------------------------------------------------------------- CONFETE */
  var CORES = ['#d8ff4e', '#3ddc84', '#ffc93c', '#ff5c3d', '#ffffff'];

  /** Chuva de confete de canto a canto, com duração curta. */
  GG.confete = function (canvas) {
    if (!canvas || !canvas.getContext) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = canvas.getContext('2d');
    var largura = canvas.width = canvas.offsetWidth;
    var altura = canvas.height = canvas.offsetHeight;

    var pecas = [];
    for (var i = 0; i < 120; i++) {
      pecas.push({
        x: Math.random() * largura,
        y: -20 - Math.random() * altura,
        l: 6 + Math.random() * 8,
        a: 3 + Math.random() * 5,
        vy: 2 + Math.random() * 4,
        vx: -1.5 + Math.random() * 3,
        giro: Math.random() * Math.PI,
        vGiro: -0.15 + Math.random() * 0.3,
        cor: CORES[Math.floor(Math.random() * CORES.length)]
      });
    }

    var quadros = 0;
    canvas.classList.add('ativo');

    function desenhar() {
      ctx.clearRect(0, 0, largura, altura);
      pecas.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.giro += p.vGiro;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.giro);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.l / 2, -p.a / 2, p.l, p.a);
        ctx.restore();
      });
      quadros++;
      if (quadros < 190) {
        window.requestAnimationFrame(desenhar);
      } else {
        ctx.clearRect(0, 0, largura, altura);
        canvas.classList.remove('ativo');
      }
    }
    window.requestAnimationFrame(desenhar);
  };
})(window.GG);
