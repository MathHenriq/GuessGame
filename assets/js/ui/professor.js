/* =========================================================================
   UI — MODO PROFESSOR
   Monta desafios personalizados e gera um código/link para a turma inteira
   jogar exatamente o mesmo item secreto.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  function preencherTemas() {
    var seletor = ui.limpar(ui.$('#prof-tema'));
    GG.temas.forEach(function (tema) {
      var opcao = ui.el('option', null, tema.emoji + '  ' + tema.nome + ' (' + tema.itens.length + ')');
      opcao.value = tema.id;
      seletor.appendChild(opcao);
    });
  }

  function preencherItens() {
    var tema = GG.indiceTemas[ui.$('#prof-tema').value];
    var seletor = ui.limpar(ui.$('#prof-item'));

    var automatico = ui.el('option', null, 'Sortear automaticamente');
    automatico.value = '';
    seletor.appendChild(automatico);

    if (!tema) return;
    tema.itens.slice().sort(function (a, b) {
      return a.nome.localeCompare(b.nome, 'pt-BR');
    }).forEach(function (item) {
      var opcao = ui.el('option', null, item.nome);
      opcao.value = item.id;
      seletor.appendChild(opcao);
    });
  }

  function lerFormulario() {
    return {
      temaId: ui.$('#prof-tema').value,
      dificuldade: ui.$('#prof-dificuldade').value,
      tentativas: Math.max(3, Math.min(15, parseInt(ui.$('#prof-tentativas').value, 10) || 6)),
      dicasMax: Math.max(0, Math.min(6, parseInt(ui.$('#prof-dicas').value, 10) || 0)),
      cronometro: ui.$('#prof-cronometro').checked ? 1 : 0,
      itemId: ui.$('#prof-item').value || ''
    };
  }

  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(
        function () { ui.aviso('Copiado!'); },
        function () { copiarAlternativo(texto); }
      );
    } else {
      copiarAlternativo(texto);
    }
  }

  // Alternativa para quando a área de transferência moderna não está liberada
  // (acontece ao abrir o arquivo direto do disco em alguns navegadores).
  function copiarAlternativo(texto) {
    var campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    try {
      document.execCommand('copy');
      ui.aviso('Copiado!');
    } catch (e) {
      ui.aviso('Copie manualmente o texto destacado.');
    }
    document.body.removeChild(campo);
  }

  function mostrarCodigo(config) {
    var codigo = GG.codificarDesafio(config);
    var link = GG.linkDoDesafio(codigo);
    var tema = GG.indiceTemas[config.temaId];
    var dificuldade = GG.dificuldades[config.dificuldade];

    var antigo = ui.$('#professor-saida .codigo-gerado');
    if (antigo) antigo.parentNode.removeChild(antigo);

    var caixa = ui.el('div', 'codigo-gerado');
    caixa.appendChild(ui.el('p', 'sobretitulo', 'Desafio criado'));
    caixa.appendChild(ui.el('p', null,
      tema.emoji + ' ' + tema.nome + ' · ' + dificuldade.rotulo + ' · ' +
      config.tentativas + ' tentativas · ' + config.dicasMax + ' dicas' +
      (config.cronometro ? ' · cronômetro ligado' : '') +
      (config.itemId ? ' · item escolhido a dedo' : '')));

    caixa.appendChild(ui.el('div', 'codigo-gerado__valor', codigo));

    var acoes = ui.el('div', 'codigo-gerado__acoes');

    var botaoCodigo = ui.el('button', 'botao botao--contorno', 'Copiar código');
    botaoCodigo.type = 'button';
    botaoCodigo.addEventListener('click', function () { copiar(codigo); });
    acoes.appendChild(botaoCodigo);

    var botaoLink = ui.el('button', 'botao botao--contorno', 'Copiar link');
    botaoLink.type = 'button';
    botaoLink.addEventListener('click', function () { copiar(link); });
    acoes.appendChild(botaoLink);

    var botaoJogar = ui.el('button', 'botao botao--acento', 'Jogar este desafio');
    botaoJogar.type = 'button';
    botaoJogar.addEventListener('click', function () { iniciarDoProfessor(config, codigo); });
    acoes.appendChild(botaoJogar);

    caixa.appendChild(acoes);
    ui.$('#professor-saida').appendChild(caixa);
    ui.aviso('Desafio gerado — compartilhe o código ou o link.');
  }

  function iniciarDoProfessor(config, codigo) {
    GG.som.clique();
    ui.iniciarJogo({
      temaId: config.temaId,
      dificuldade: config.dificuldade,
      tentativas: config.tentativas,
      dicasMax: config.dicasMax,
      cronometro: !!config.cronometro,
      itemId: config.itemId || null,
      codigo: codigo || true
    });
  }

  ui.abrirDesafioPorCodigo = function (codigo, silencioso) {
    var config = GG.decodificarDesafio(codigo);
    if (!config) {
      if (!silencioso) ui.aviso('Código inválido. Confira se foi copiado por inteiro.');
      return false;
    }
    iniciarDoProfessor(config, codigo);
    return true;
  };

  ui.iniciarTelaProfessor = function () {
    preencherTemas();
    preencherItens();

    ui.$('#prof-tema').addEventListener('change', preencherItens);

    ui.$('#prof-dificuldade').addEventListener('change', function () {
      // Ajusta os padrões sugeridos ao trocar a dificuldade.
      var dificuldade = GG.dificuldades[this.value];
      ui.$('#prof-tentativas').value = dificuldade.tentativas;
      ui.$('#prof-dicas').value = dificuldade.dicas;
    });

    ui.$('#form-professor').addEventListener('submit', function (evento) {
      evento.preventDefault();
      mostrarCodigo(lerFormulario());
    });

    ui.$('#prof-jogar').addEventListener('click', function () {
      iniciarDoProfessor(lerFormulario());
    });

    ui.$('#form-codigo').addEventListener('submit', function (evento) {
      evento.preventDefault();
      ui.abrirDesafioPorCodigo(ui.$('#entrada-codigo').value);
    });
  };
})(window.GG);
