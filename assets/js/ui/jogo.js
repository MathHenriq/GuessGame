/* =========================================================================
   UI — TELA DE JOGO
   Tabuleiro de peças, autocompletar, dicas conquistadas, cronômetro e a
   revelação do item secreto.

   RITMO: a revelação é intencionalmente lenta. Cada peça vira depois da
   anterior e o jogo trava os botões enquanto isso acontece — o aluno lê o
   resultado antes de poder chutar de novo. Sem enxurrada de acertos.
   ========================================================================= */

(function (GG) {
  'use strict';

  var ui = GG.ui;

  /* Tempos da revelação, em milissegundos. Mexa aqui para acelerar ou
     desacelerar o jogo inteiro. */
  var ATRASO_ENTRE_PECAS = 300;   // intervalo entre uma peça e a próxima
  var DURACAO_DA_PECA = 620;      // duração da virada (igual à do CSS)
  var PAUSA_ANTES_DO_FIM = 1100;  // respiro entre a última peça e o resultado

  var cronometro = null;
  var indiceDestacado = -1;
  var opcoesVisiveis = [];
  var revelando = false;
  var temporizadores = [];

  function agendar(funcao, atraso) {
    temporizadores.push(window.setTimeout(funcao, atraso));
  }

  function cancelarAgendamentos() {
    temporizadores.forEach(window.clearTimeout);
    temporizadores = [];
  }

  /* ------------------------------------------------------------- INÍCIO */
  ui.iniciarJogo = function (config) {
    pararCronometro();
    cancelarAgendamentos();
    revelando = false;

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
    montarCabecalhoTabuleiro(partida);
    ui.limpar(ui.$('#tabuleiro-linhas'));
    ui.$('#tabela-vazia').hidden = false;

    var entrada = ui.$('#entrada-palpite');
    entrada.value = '';
    entrada.disabled = false;
    fecharAutocompletar();
    desenharDicas();
    atualizarMedidores();

    ui.mostrarTela('jogo');
    agendar(function () { entrada.focus(); }, 260);

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
      partida.conjunto.length + ' palpites possíveis'));
    if (partida.totalSorteio < partida.conjunto.length) {
      caixa.appendChild(ui.el('span', 'chip',
        'resposta entre os ' + partida.totalSorteio + ' mais conhecidos'));
    }

    if (config.rotuloFiltro) caixa.appendChild(ui.el('span', 'chip', config.rotuloFiltro));
    if (config.codigo) caixa.appendChild(ui.el('span', 'chip chip--alerta', 'Desafio do professor'));
  }

  /* ---------------------------------------------------------- TABULEIRO */
  function montarCabecalhoTabuleiro(partida) {
    var colunas = partida.tema.campos.length + 1;
    ui.$('#tabuleiro').style.setProperty('--colunas', colunas);

    var cabecalho = ui.limpar(ui.$('#tabuleiro-cabecalho'));
    cabecalho.appendChild(ui.el('div', 'tabuleiro__rotulo', 'Palpite'));
    partida.tema.campos.forEach(function (campo) {
      cabecalho.appendChild(ui.el('div', 'tabuleiro__rotulo', campo.rotulo));
    });
  }

  function montarPeca(celula, indice) {
    var peca = ui.el('div', 'peca peca--' + celula.estado);
    peca.style.animationDelay = (indice * ATRASO_ENTRE_PECAS) + 'ms';

    if (celula.seta) peca.appendChild(ui.el('span', 'peca__seta', celula.seta));
    peca.appendChild(ui.el('span', null, celula.texto));
    if (celula.detalhe && celula.estado === 'quase') {
      peca.appendChild(ui.el('span', 'peca__detalhe', celula.detalhe));
    }
    return peca;
  }

  function montarLinha(avaliacao) {
    var partida = ui.estado.partida;
    var linha = ui.el('div', 'linha-palpite' + (avaliacao.acertou ? ' linha-palpite--acerto' : ''));

    var pecaNome = ui.el('div', 'peca peca--nome');
    pecaNome.style.animationDelay = '0ms';
    pecaNome.appendChild(ui.el('span', 'peca__ordem', '#' + partida.tentativas.length));
    pecaNome.appendChild(ui.el('span', null, avaliacao.item.nome));
    linha.appendChild(pecaNome);

    avaliacao.celulas.forEach(function (celula, indice) {
      linha.appendChild(montarPeca(celula, indice + 1));
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

    ui.$('#medidor-tempo').hidden = !partida.cronometro;
    atualizarBotaoDica();
  }

  /* --------------------------------------------------------------- DICAS
     A dica é conquistada, não clicada: só destrava a cada N palpites. */
  function atualizarBotaoDica() {
    var partida = ui.estado.partida;
    var botao = ui.$('#btn-dica');
    var contagem = ui.$('#contagem-dicas');

    contagem.textContent = partida.dicasReveladas + '/' + partida.dicasMax;

    if (partida.dicasReveladas >= partida.dicasMax) {
      botao.disabled = true;
      botao.firstChild.nodeValue = partida.dicasMax === 0 ? 'Sem dicas neste desafio ' : 'Dicas esgotadas ';
      return;
    }

    var faltam = GG.palpitesParaProximaDica(partida);
    if (faltam > 0 || revelando || partida.estado !== 'jogando') {
      botao.disabled = true;
      botao.firstChild.nodeValue = faltam > 0
        ? 'Dica em ' + faltam + (faltam === 1 ? ' palpite ' : ' palpites ')
        : 'Pedir dica ';
    } else {
      botao.disabled = false;
      botao.firstChild.nodeValue = 'Pedir dica ';
    }
  }

  /** Lista de dicas: as reveladas com texto, a próxima mostrando o que falta. */
  function desenharDicas() {
    var partida = ui.estado.partida;
    var painel = ui.limpar(ui.$('#painel-dicas'));

    partida.dicas.slice(0, partida.dicasReveladas).forEach(function (dica, indice) {
      var cartao = ui.el('div', 'dica');
      cartao.appendChild(ui.el('span', 'dica__rotulo', 'Dica ' + (indice + 1)));
      cartao.appendChild(ui.el('span', 'dica__texto', dica.texto));
      painel.appendChild(cartao);
    });

    var faltam = GG.palpitesParaProximaDica(partida);
    if (partida.dicasReveladas < partida.dicasMax && faltam > 0 && partida.estado === 'jogando') {
      var bloqueada = ui.el('div', 'dica dica--bloqueada');
      bloqueada.appendChild(ui.el('span', 'dica__rotulo', '🔒 Dica ' + (partida.dicasReveladas + 1)));
      bloqueada.appendChild(ui.el('span', 'dica__texto',
        'Destrava depois de mais ' + faltam + (faltam === 1 ? ' palpite' : ' palpites') +
        '. Antes disso, tente eliminar possibilidades sozinho.'));
      painel.appendChild(bloqueada);
    }

    painel.hidden = !painel.firstChild;
  }

  function pedirDica() {
    var partida = ui.estado.partida;
    if (revelando) return;

    if (!GG.podePedirDica(partida)) {
      var faltam = GG.palpitesParaProximaDica(partida);
      GG.som.erro();
      return ui.aviso(faltam > 0
        ? 'Ainda não. Faltam ' + faltam + (faltam === 1 ? ' palpite' : ' palpites') + ' para destravar esta dica.'
        : 'Todas as dicas já foram usadas.');
    }

    GG.revelarDica(partida);
    GG.som.dica();
    desenharDicas();
    atualizarMedidores();
    ui.aviso('Dica revelada: −15 pontos');
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
    var campo = ui.estado.partida.tema.campos[0];
    return GG.exibirValor(campo, item.valores[campo.chave]);
  }

  function abrirAutocompletar(texto) {
    var partida = ui.estado.partida;
    if (!partida || partida.estado !== 'jogando' || revelando) return;

    var alvo = GG.normalizar(texto);
    // Nada de lista antes de digitar: a sugestão só aparece a partir da 1ª letra.
    if (!alvo.length) return fecharAutocompletar();

    var candidatos = GG.itensDisponiveis(partida).filter(function (item) {
      return item.busca.indexOf(alvo) !== -1;
    });
    // Quem começa com o texto digitado aparece primeiro.
    candidatos.sort(function (a, b) {
      return (a.busca.indexOf(alvo) - b.busca.indexOf(alvo)) || a.nome.localeCompare(b.nome, 'pt-BR');
    });

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
  function travarEntrada(travado) {
    revelando = travado;
    ui.$('#form-palpite').classList.toggle('palpite--revelando', travado);
    ui.$$('#form-palpite button').forEach(function (botao) { botao.disabled = travado; });
    ui.$('#entrada-palpite').setAttribute('aria-busy', String(travado));
    if (!travado) atualizarBotaoDica();
  }

  function enviarPalpite(item) {
    var partida = ui.estado.partida;
    if (!partida || partida.estado !== 'jogando' || revelando) return;

    var avaliacao = GG.registrarPalpite(partida, item);
    if (!avaliacao) return;

    ui.$('#tabela-vazia').hidden = true;
    var linhas = ui.$('#tabuleiro-linhas');
    linhas.insertBefore(montarLinha(avaliacao), linhas.firstChild);

    var entrada = ui.$('#entrada-palpite');
    entrada.value = '';
    fecharAutocompletar();
    travarEntrada(true);

    // Cada peça vira com o seu som, uma depois da outra.
    var totalPecas = partida.tema.campos.length;
    for (var i = 0; i < totalPecas; i++) {
      (function (indice) {
        agendar(function () { GG.som.revelar(indice); }, (indice + 1) * ATRASO_ENTRE_PECAS);
      })(i);
    }

    var fimDaVirada = totalPecas * ATRASO_ENTRE_PECAS + DURACAO_DA_PECA;

    agendar(function () {
      atualizarMedidores();
      desenharDicas();

      if (partida.estado === 'jogando') {
        travarEntrada(false);
        entrada.focus();
        return;
      }
      // Um respiro antes de mostrar o resultado: a vitória precisa assentar.
      agendar(encerrarPartida, PAUSA_ANTES_DO_FIM);
    }, fimDaVirada);
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

  /* ----------------------------------------------------------- RESULTADO */
  function mostrarFoto(partida) {
    var figura = ui.$('#resultado-foto');
    var imagem = ui.$('#foto-imagem');
    var credito = ui.$('#foto-credito');
    var espaco = ui.$('#foto-espaco');

    imagem.hidden = true;
    imagem.removeAttribute('src');
    credito.textContent = '';
    espaco.textContent = partida.tema.emoji;
    figura.classList.add('foto--carregando');

    ui.$('#btn-google').href = GG.linkGoogleImagens(partida.tema, partida.segredo);

    GG.buscarImagem(partida.tema, partida.segredo, function (resultado) {
      // A partida pode ter mudado enquanto a busca acontecia.
      if (ui.estado.partida !== partida) return;
      figura.classList.remove('foto--carregando');
      if (!resultado) return;

      if (resultado.imagem) {
        imagem.onload = function () { imagem.hidden = false; };
        imagem.onerror = function () { imagem.hidden = true; };
        imagem.alt = 'Imagem de ' + partida.segredo.nome;
        imagem.src = resultado.imagem;
        credito.textContent = 'Wikipédia';
      }

      // Sem curiosidade cadastrada, o resumo da Wikipédia entra no lugar.
      var curiosidade = ui.$('#resultado-curiosidade');
      if (!partida.segredo.curiosidades && resultado.resumo) {
        curiosidade.textContent = resultado.resumo;
        curiosidade.hidden = false;
      }
    });
  }

  function encerrarPartida() {
    var partida = ui.estado.partida;
    pararCronometro();
    travarEntrada(false);

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
    mostrarFoto(partida);

    if (venceu) {
      GG.som.vitoria();
      // O confete entra junto com o placar, não junto com a última peça.
      agendar(function () { GG.confete(ui.$('#confete')); }, 700);
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
      if (revelando) return;
      if (indiceDestacado >= 0 && opcoesVisiveis[indiceDestacado]) {
        enviarPalpite(opcoesVisiveis[indiceDestacado]);
      } else {
        tentarPalpitePorTexto(entrada.value);
      }
    });

    entrada.addEventListener('input', function () { abrirAutocompletar(entrada.value); });
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
