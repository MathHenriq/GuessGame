/* =========================================================================
   UI — ILUSTRAÇÕES DAS CATEGORIAS
   -------------------------------------------------------------------------
   Cada categoria tem um desenho vetorial próprio, definido como <symbol>
   dentro do index.html, e uma cor.

   POR QUE DESENHO E NÃO FOTO:
   o jogo precisa abrir com dois cliques e funcionar sem internet na escola.
   Fotos externas quebrariam isso (e trariam questão de licença); fotos
   baixadas pesariam alguns megabytes. Os desenhos somam poucos kilobytes,
   ficam nítidos em qualquer tela, funcionam offline e acompanham o tema
   claro e escuro, porque são pintados com a cor da categoria.

   PARA UMA CATEGORIA NOVA:
   1. crie um <symbol id="arte-SEUID"> no index.html (copie um existente);
   2. escolha a cor aqui embaixo.
   Se faltar qualquer um dos dois, o cartão cai no emoji do tema — nada quebra.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  /* Cores das categorias. Tons escolhidos para vizinhos nunca se repetirem
     na grade e para todos terem contraste suficiente nos dois temas. */
  ui.coresDeTema = {
    jogos: '#7c6cff', filmes: '#ff6b6b', series: '#4dc9f0', animes: '#ff8ac4',
    livros: '#f2a65a', personagens: '#5ad1a5', musicos: '#c084fc', jogadores: '#3ddc84',
    cientistas: '#4dd0e1', historicos: '#d4a373', artistas: '#ff9f68', atores: '#f472b6',
    paises: '#38bdf8', lugares: '#34d399', animais: '#a3e635', comidas: '#fbbf24',
    esportes: '#fb923c', carros: '#60a5fa', empresas: '#94a3b8',

    elementos: '#22d3ee', corpo: '#f87171', astros: '#818cf8', dinossauros: '#84cc16',
    plantas: '#4ade80', fenomenos: '#38bdf8', biomas: '#2dd4bf', geometria: '#e879f9',
    estados: '#facc15', bandeiras: '#fb7185', linguas: '#a78bfa', profissoes: '#fbbf24',
    objetos: '#5b9df9', transporte: '#f59e0b', roupas: '#ec4899', invencoes: '#eab308',
    mitologia: '#a855f7', obras: '#f26d6d',

    lol: '#c8aa6e', pokemon: '#ffcb05', minecraft: '#7cb342', naruto: '#ff8c42',
    onepiece: '#ef4444', dragonball: '#ff9800', harrypotter: '#9575cd', marvel: '#e23636',
    dc: '#3b82f6', starwars: '#facc15', senhordosaneis: '#d4af37', disney: '#60a5fa',
    brasileirao: '#22c55e'
  };

  /* Símbolos declarados no index.html, preenchidos na primeira consulta. */
  var disponiveis = null;

  /**
   * '#7c6cff' → '124, 108, 255'.
   * O CSS usa isso para tingir o fundo da faixa com transparência
   * (rgba) sem precisar de color-mix, que falta em navegador antigo.
   */
  function comoRgb(hex) {
    var limpo = String(hex).replace('#', '');
    if (limpo.length !== 6) return '';
    return parseInt(limpo.slice(0, 2), 16) + ', ' +
           parseInt(limpo.slice(2, 4), 16) + ', ' +
           parseInt(limpo.slice(4, 6), 16);
  }

  function temArte(temaId) {
    if (disponiveis === null) {
      disponiveis = {};
      ui.$$('#artes-categorias symbol').forEach(function (simbolo) {
        disponiveis[simbolo.id.replace('arte-', '')] = true;
      });
    }
    return !!disponiveis[temaId];
  }

  /**
   * Devolve a arte da categoria pronta para entrar na tela.
   * `variacao` vira a classe .arte--VARIACAO ('miniatura', 'moldura'…),
   * usada só para mudar o tamanho no CSS.
   * Sem desenho cadastrado, devolve o emoji — assim uma categoria nova
   * continua aparecendo enquanto a ilustração não existe.
   */
  ui.arteDoTema = function (tema, variacao) {
    var caixa = ui.el('span', variacao ? 'arte arte--' + variacao : 'arte');
    var cor = ui.coresDeTema[tema.id];
    var rgb = cor ? comoRgb(cor) : '';

    caixa.style.setProperty('--cor-tema', cor || 'var(--acento)');
    if (rgb) caixa.style.setProperty('--cor-tema-rgb', rgb);

    if (!temArte(tema.id)) {
      caixa.classList.add('arte--emoji');
      caixa.textContent = tema.emoji;
      return caixa;
    }

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    var uso = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    // href moderno + xlink para navegadores antigos de laboratório de escola.
    uso.setAttribute('href', '#arte-' + tema.id);
    uso.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#arte-' + tema.id);

    svg.appendChild(uso);
    caixa.appendChild(svg);
    return caixa;
  };
})(window.GG);
