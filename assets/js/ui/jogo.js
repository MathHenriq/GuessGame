/* =========================================================================
   UI — TELA DE JOGO
   Autocompletar, tabela de palpites, dicas, cronômetro e tela de resultado.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;
  var cronometro = null;
  var indiceDestacado = -1;
  var opcoesVisiveis = [];

  /* ------------------------------------------------------------- INÍCIO */
  ui.iniciarJogo = function (config) {
    pararCronometro();

    var partida;
    try {
      partida = GG.criarPartida(config);
    } catch (erro) {
      ui.aviso('Não foi possível montar esse desafio.');
      return;
    }

    ui.estado.partida = partida;
    ui.estado.ultimaConfig = config;

    montarChips(config);
    montarCabecalhoTabela(partida);
    ui.limpar(ui.$('#tabela-corpo'));
    ui.$('#tabela-vazia').hidden = false;
    ui.limpar(ui.$('#painel-dicas')).hidden = true;

    var entrada = ui.$('#entrada-palpite');
    entrada.value = '';
    entrada.disabled = false;
    ui.$('#btn-dica').disabled = false;
    fecharAutocompletar();

    atualizarMedidores();
    ui.mostrarTela('jogo');
    window.setTimeout(function () { entrada.focus(); }, 220);

    if (partida.cronometro) iniciarCronometro();
  };

  /* -------------------------------------------------------------- CHIPS */
  function montarChips(config) {
    var partida = ui.estado.partida;
    var caixa = ui.limpar(ui.$('#jogo-chips'));

    caixa.appendChild(ui.el('span', 'chip chip--destaque',
      partida.tema.emoji + ' ' + partida.tema.nome));
    caixa.appendChild(ui.el('span', 'chip',
      partida.dificuldade.emoji + ' ' + partida.dificuldade.rotulo));
    caixa.appendChild(ui.el('span', 'chip',
      partida.conjunto.length + ' possibilidades'));

    if (config.rotuloFiltro) caixa.appendChild(ui.el('span', 'chip', config.rotuloFiltro));
    if (config.codigo) caixa.appendChild(ui.el('span', 'chip chip--alerta', 'Desafio do professor'));
  }

  /* ------------------------------------------------------------- TABELA */
  function montarCabecalhoTabela(partida) {
    var cabecalho = ui.limpar(ui.$('#tabela-cabecalho'));
    var linha = document.createElement('tr');
    linha.appendChild(ui.el('th', null, 'Palpite'));
    partida.tema.campos.forEach(function (campo) {
      linha.appendChild(ui.el('th', null, campo.rotulo));
    });
    cabecalho.appendChild(linha);
  }

  function montarLinhaPalpite(avaliacao) {
    var linha = document.createElement('tr');
    if (avaliacao.acertou) linha.className = 'linha-acerto';

    var celulaNome = document.createElement('td');
    var conteudoNome = ui.el('div', 'celula celula--nome', avaliacao.item.nome);
    conteudoNome.style.animationDelay = '0ms';
    celulaNome.appendChild(conteudoNome);
    linha.appendChild(celulaNome);

    avaliacao.celulas.forEach(function (celula, indice) {
      var td = document.createElement('td');
      var conteudo = ui.el('div', 'celula celula--' + celula.estado);
      conteudo.style.animationDelay = (indice + 1) * 110 + 'ms';

      var texto = ui.el('span', null, celula.texto);
      conteudo.appendChild(texto);

      if (celula.detalhe && celula.estado === 'quase') {
        conteudo.appendChild(ui.el('span', 'celula__detalhe', celula.detalhe));
      }
      if (celula.seta) {
        conteudo.appendChild(ui.el('span', 'celula__seta', celula.seta));
      }

      td.appendChild(conteudo);
      linha.appendChild(td);

      // Cada peça vira com o seu próprio som, como em um jogo de tabuleiro.
      window.setTimeout(function () { GG.som.revelar(indice); }, (indice + 1) * 110);
    });

    return linha;
  }

  /* ---------------------------------------------------------- MEDIDORES */
  function atualizarMedidores() {
    var partida = ui.estado.partida;
    var usadas = partida.tentativas.length;

    ui.$('#medidor-tentativas').textContent =
      'Tentativa ' + usadas + ' de ' + partida.tentativasMax;

    var preenchido = ui.$('#progresso-preenchido');
    var proporcao = Math.min(1, usadas / partida.tentativasMax);
    preenchido.style.width = (proporcao * 100) + '%';
    preenchido.classList.toggle('alerta', partida.tentativasMax - usadas <= 2);

    ui.$('#contagem-dicas').textContent = partida.dicasReveladas + '/' + partida.dicasMax;
    ui.$('#btn-dica').disabled = partida.dicasReveladas >= partida.dicasMax || partida.estado !== 'jogando';

    var medidorTempo = ui.$('#medidor-tempo');
    medidorTempo.hidden = !partida.cronometro;
  }

  /* --------------------------------------------------------- CRONÔMETRO */
  function iniciarCronometro() {
    pararCronometro();
    cronometro = window.setInterval(function () {
      var partida = ui.estado.partida;
      if (!partida || partida.estado !== 'jogando') return pararCronometro();
      ui.$('#medidor-tempo').textContent = ui.formatarTempo(GG.segundosDecorridos(partida));
    }, 1000);
  }

  function pararCronometro() {
    if (cronometro) { window.clearInterval(cronometro); cronometro = null; }
  }

  /* ------------------------------------------------------ AUTOCOMPLETAR */
  function fecharAutocompletar() {
    var lista = ui.$('#autocompletar');
    lista.hidden = true;
    ui.limpar(lista);
    indiceDestacado = -1;
    opcoesVisiveis = [];
  }

  function resumoDoItem(item) {
    var partida = ui.estado.partida;
    var campo = partida.tema.campos[0];
    return GG.exibirValor(campo, item.valores[campo.chave]);
  }

  function abrirAutocompletar(texto) {
    var partida = ui.estado.partida;
    if (!partida || partida.estado !== 'jogando') return;

    var alvo = GG.normalizar(texto);
    var candidatos = GG.itensDisponiveis(partida);

    if (alvo.length) {
      candidatos = candidatos.filter(function (item) { return item.busca.indexOf(alvo) !== -1; });
      // Quem começa com o texto digitado aparece primeiro.
      candidatos.sort(function (a, b) {
        return (a.busca.indexOf(alvo) - b.busca.indexOf(alvo)) || a.nome.localeCompare(b.nome, 'pt-BR');
      });
    }

    opcoesVisiveis = candidatos.slice(0, 8);
    var lista = ui.limpar(ui.$('#autocompletar'));

    if (!opcoesVisiveis.length) { lista.hidden = true; return; }

    opcoesVisiveis.forEach(function (item, indice) {
      var linha = ui.el('li', null, item.nome);
      linha.setAttribute('role', 'option');
      linha.appendChild(ui.el('span', null, resumoDoItem(item)));
      linha.addEventListener('mousedown', function (evento) {
        evento.preventDefault();
        enviarPalpite(item);
      });
      linha.addEventListener('mouseenter', function () { destacar(indice); });
      lista.appendChild(linha);
    });

    lista.hidden = false;
    indiceDestacado = -1;
  }

  function destacar(indice) {
    var itens = ui.$$('#autocompletar li');
    itens.forEach(function (no, i) { no.setAttribute('aria-selected', String(i === indice)); });
    indiceDestacado = indice;
    if (itens[indice]) itens[indice].scrollIntoView({ block: 'nearest' });
  }

  /* ------------------------------------------------------------ PALPITE */
  function enviarPalpite(item) {
    var partida = ui.estado.partida;
    if (!partida || partida.estado !== 'jogando') return;

    var avaliacao = GG.registrarPalpite(partida, item);
    if (!avaliacao) return;

    ui.$('#tabela-vazia').hidden = true;
    var corpo = ui.$('#tabela-corpo');
    corpo.insertBefore(montarLinhaPalpite(avaliacao), corpo.firstChild);

    var entrada = ui.$('#entrada-palpite');
    entrada.value = '';
    fecharAutocompletar();
    atualizarMedidores();

    // Em telas grandes, reabre a lista com o que ainda resta: ajuda o aluno a
    // ver o universo diminuindo. No celular não, porque a lista cobriria os
    // botões de chutar e pedir dica.
    if (partida.estado === 'jogando' && document.activeElement === entrada && ui.telaLarga()) {
      abrirAutocompletar('');
    }

    if (partida.estado !== 'jogando') {
      var atraso = (partida.tema.campos.length + 1) * 110 + 320;
      window.setTimeout(encerrarPartida, atraso);
    }
  }

  function tentarPalpitePorTexto(texto) {
    var partida = ui.estado.partida;
    var alvo = GG.normalizar(texto);
    if (!alvo) return ui.aviso('Digite um palpite primeiro.');

    var disponiveis = GG.itensDisponiveis(partida);
    var exato = disponiveis.filter(function (item) { return item.busca === alvo; })[0];
    if (exato) return enviarPalpite(exato);

    var parciais = disponiveis.filter(function (item) { return item.busca.indexOf(alvo) !== -1; });
    if (parciais.length === 1) return enviarPalpite(parciais[0]);
    if (parciais.length > 1) return ui.aviso('Vários itens combinam: escolha um da lista.');

    var jaUsado = partida.conjunto.filter(function (item) { return item.busca === alvo; })[0];
    GG.som.erro();
    ui.aviso(jaUsado ? 'Você já chutou esse item.' : 'Esse item não está nesta categoria.');
  }

  /* ---------------------------------------------------------------- DICA */
  function pedirDica() {
    var partida = ui.estado.partida;
    if (!partida || partida.estado !== 'jogando') return;

    var dica = GG.revelarDica(partida);
    if (!dica) return ui.aviso('Todas as dicas já foram usadas.');

    GG.som.dica();
    var painel = ui.$('#painel-dicas');
    painel.hidden = false;

    var cartao = ui.el('div', 'dica');
    cartao.appendChild(ui.el('span', 'dica__rotulo', 'Dica ' + partida.dicasReveladas));
    var texto = ui.el('span', 'dica__texto', dica.texto);
    cartao.appendChild(texto);
    painel.appendChild(cartao);

    atualizarMedidores();
    ui.aviso('Dica revelada: −15 pontos');
  }

  /* ----------------------------------------------------------- RESULTADO */
  function encerrarPartida() {
    var partida = ui.estado.partida;
    pararCronometro();

    var pontuacao = GG.pontuacaoDaPartida(partida);
    GG.perfil.registrarPartida(partida, pontuacao);
    ui.atualizarPlacarTopo();
    ui.atualizarRanking();

    var venceu = partida.estado === 'vitoria';
    ui.$('#entrada-palpite').disabled = true;
    ui.$('#btn-dica').disabled = true;

    ui.$('#resultado-selo').textContent = venceu
      ? 'Acertou em ' + partida.tentativas.length +
        (partida.tentativas.length === 1 ? ' tentativa' : ' tentativas')
      : 'As tentativas acabaram';

    ui.$('#resultado-titulo').textContent = venceu ? 'Você descobriu!' : 'Era ' + partida.segredo.nome;

    // Cartão do item secreto com todos os atributos revelados.
    var caixaItem = ui.limpar(ui.$('#resultado-item'));
    caixaItem.appendChild(ui.el('span', 'resultado__nome',
      partida.tema.emoji + ' ' + partida.segredo.nome));

    var atributos = ui.el('div', 'resultado__atributos');
    partida.tema.campos.forEach(function (campo) {
      atributos.appendChild(ui.el('span', 'chip',
        campo.rotulo + ': ' + GG.exibirValor(campo, partida.segredo.valores[campo.chave])));
    });
    caixaItem.appendChild(atributos);

    var curiosidade = ui.$('#resultado-curiosidade');
    curiosidade.textContent = partida.segredo.curiosidades || '';
    curiosidade.hidden = !partida.segredo.curiosidades;

    ui.$('#resultado-pontos').textContent = pontuacao.total;

    var detalhes = ui.limpar(ui.$('#resultado-detalhes'));
    pontuacao.detalhes.forEach(function (item) {
      var linha = document.createElement('li');
      linha.appendChild(ui.el('span', null, item.rotulo));
      linha.appendChild(ui.el('span', null, String(item.valor)));
      detalhes.appendChild(linha);
    });

    ui.$('#cortina').hidden = false;

    if (venceu) {
      GG.som.vitoria();
      GG.confete(ui.$('#confete'));
    } else {
      GG.som.derrota();
    }
  }

  ui.fecharResultado = function () {
    ui.$('#cortina').hidden = true;
  };

  /* ------------------------------------------------------------- EVENTOS */
  ui.iniciarTelaJogo = function () {
    var entrada = ui.$('#entrada-palpite');

    ui.$('#form-palpite').addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (indiceDestacado >= 0 && opcoesVisiveis[indiceDestacado]) {
        enviarPalpite(opcoesVisiveis[indiceDestacado]);
      } else {
        tentarPalpitePorTexto(entrada.value);
      }
    });

    entrada.addEventListener('input', function () { abrirAutocompletar(entrada.value); });
    entrada.addEventListener('focus', function () { abrirAutocompletar(entrada.value); });
    entrada.addEventListener('blur', function () { window.setTimeout(fecharAutocompletar, 120); });

    entrada.addEventListener('keydown', function (evento) {
      if (evento.key === 'ArrowDown') {
        evento.preventDefault();
        destacar(Math.min(indiceDestacado + 1, opcoesVisiveis.length - 1));
      } else if (evento.key === 'ArrowUp') {
        evento.preventDefault();
        destacar(Math.max(indiceDestacado - 1, 0));
      } else if (evento.key === 'Escape') {
        fecharAutocompletar();
      }
    });

    ui.$('#btn-dica').addEventListener('click', pedirDica);

    ui.$('#btn-jogar-novamente').addEventListener('click', function () {
      ui.fecharResultado();
      GG.som.clique();
      ui.iniciarJogo(ui.estado.ultimaConfig || { temaId: GG.temas[0].id, dificuldade: ui.estado.dificuldade });
    });

    ui.$('#cortina').addEventListener('click', function (evento) {
      if (evento.target === ui.$('#cortina')) ui.fecharResultado();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && !ui.$('#cortina').hidden) ui.fecharResultado();
    });
  };
})(window.GG);
