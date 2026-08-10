/* =========================================================================
   NÚCLEO — DICAS PROGRESSIVAS
   -------------------------------------------------------------------------
   PRINCÍPIO: uma dica só vale se disser algo que o tabuleiro NÃO diz.

   A tabela de palpites já mostra, coluna por coluna, se o aluno acertou ou
   chegou perto. Uma dica que repete uma coluna ("Classe: mamífero") não
   ensina nada — o aluno descobre a mesma coisa chutando. Por isso as dicas
   daqui olham para o que a tabela não alcança:

     · o tamanho dos grupos DENTRO da categoria inteira
       "esse corte tira 71 dos 169 itens" — obriga a pensar em conjuntos;
     · a posição do item entre outros itens conhecidos
       "fica entre Pac-Man e Minecraft" — obriga a estimar e comparar,
       e ainda sugere dois palpites úteis para confirmar a estimativa;
     · a raridade da característica
       "só 4 itens têm o mesmo Habitat" — transforma a busca num recorte.

   Nenhuma dica jamais nomeia o item secreto nem um valor que ele tenha de
   forma exclusiva: elas estreitam o cerco, quem fecha é o aluno.

   A ordem é do golpe mais largo para o mais específico, porque o Difícil só
   entrega duas dicas — as duas primeiras precisam ser as que mais rendem.
   A última continua sendo a letra inicial: a rede de segurança da turma.
   ========================================================================= */

(function (GG) {
  'use strict';

  /* Campos que respondem "que tipo de coisa é essa" — os únicos que valem
     para contar grupos. Ano e número ficam de fora de propósito: eliminar
     um ano isolado não ajuda ninguém. Eles rendem a dica de linha do tempo. */
  function campoDeGrupo(campo) {
    return campo.tipo === 'lista' || campo.tipo === 'texto' ||
      campo.tipo === 'pais' || campo.tipo === 'ordinal';
  }

  function campoPorTipo(tema, tipo) {
    for (var i = 0; i < tema.campos.length; i++) {
      if (tema.campos[i].tipo === tipo) return tema.campos[i];
    }
    return null;
  }

  function campoNumerico(tema) {
    return campoPorTipo(tema, 'ano') || campoPorTipo(tema, 'numero');
  }

  function contarLetras(nome) {
    return nome.replace(/[^A-Za-zÀ-ÿ0-9]/g, '').length;
  }

  /* Texto de um valor bruto, respeitando escalas ordinais (3 → "Alta"). */
  function comoTexto(campo, chave) {
    return GG.exibirValor(campo, campo.tipo === 'ordinal' ? Number(chave) : chave);
  }

  /* ---------------------------------------------------------------------
     ESTATÍSTICAS DA CATEGORIA
     Quantos itens compartilham cada valor de cada campo. É daqui que saem
     as frases do tipo "isso tira 71 dos 169 itens": informação que existe
     na categoria inteira e que nenhum palpite isolado revela.

     Calculado uma vez e guardado no próprio tema. As dicas só são geradas
     durante uma partida, quando toda a base já está carregada.
     --------------------------------------------------------------------- */
  GG.estatisticasDoTema = function (tema) {
    if (tema.estatisticas) return tema.estatisticas;

    var estatisticas = { total: tema.itens.length, campos: {} };

    tema.campos.forEach(function (campo) {
      if (!campoDeGrupo(campo)) return;

      // Sem protótipo: valores como "constructor" não atrapalham a contagem.
      var contagem = Object.create(null);

      tema.itens.forEach(function (item) {
        var valor = item.valores[campo.chave];
        if (valor == null || valor === '') return;
        (Array.isArray(valor) ? valor : [valor]).forEach(function (parte) {
          var chave = String(parte);
          contagem[chave] = (contagem[chave] || 0) + 1;
        });
      });

      var dominante = null;
      Object.keys(contagem).forEach(function (chave) {
        if (!dominante || contagem[chave] > dominante.total) {
          dominante = { valor: chave, total: contagem[chave] };
        }
      });

      estatisticas.campos[campo.chave] = { contagem: contagem, dominante: dominante };
    });

    tema.estatisticas = estatisticas;
    return estatisticas;
  };

  /** Quantos itens dividem com este o valor de um campo. */
  function tamanhoDoGrupo(estatisticas, campo, valor) {
    var info = estatisticas.campos[campo.chave];
    if (!info || valor == null || valor === '') return null;

    // Em campo de lista vale o elemento mais raro: é o que mais recorta.
    if (Array.isArray(valor)) {
      var menor = null;
      valor.forEach(function (parte) {
        var quantos = info.contagem[String(parte)] || 0;
        if (quantos && (menor === null || quantos < menor)) menor = quantos;
      });
      return menor;
    }
    return info.contagem[String(valor)] || null;
  }

  /* ------------------------------------------------------------ 1. CORTES
     Os maiores grupos da categoria que o item secreto NÃO integra.
     É o que mais elimina de uma vez, e nunca entrega a resposta: cada uma
     diz o que o item não é. Saem até duas, sempre de campos diferentes,
     começando pelo corte mais largo.

     Para cada campo procuramos o maior valor que o item não tem — e não
     só o valor mais comum do campo: se ele por acaso pertencer ao grupo
     dominante, o segundo maior grupo ainda rende um corte excelente. */
  function cortesPossiveis(tema, item, estatisticas) {
    var cortes = [];

    tema.campos.forEach(function (campo) {
      var info = estatisticas.campos[campo.chave];
      if (!info) return;

      var meu = item.valores[campo.chave];
      var meus = (Array.isArray(meu) ? meu : [meu]).map(String);

      var alvo = null;
      Object.keys(info.contagem).forEach(function (chave) {
        if (meus.indexOf(chave) !== -1) return; // ele pertence a esse grupo
        if (!alvo || info.contagem[chave] > alvo.total) {
          alvo = { valor: chave, total: info.contagem[chave] };
        }
      });

      // Grupo pequeno demais não vale a dica: cortaria quase nada.
      if (!alvo || alvo.total < 4 || alvo.total < estatisticas.total * 0.1) return;

      cortes.push({ campo: campo, valor: alvo.valor, total: alvo.total });
    });

    return cortes.sort(function (a, b) { return b.total - a.total; });
  }

  function dicaDeCorte(corte, estatisticas) {
    var valor = comoTexto(corte.campo, corte.valor);
    var frase = 'Em ' + corte.campo.rotulo + ', ele não ' +
      (corte.campo.tipo === 'lista' ? 'inclui' : 'é') + ' "' + valor + '".';

    return {
      rotulo: 'Corte',
      texto: frase + ' Só isso já elimina ' + corte.total +
        ' dos ' + estatisticas.total + ' itens desta categoria.'
    };
  }

  /* ----------------------------------------------------------- 2. MARCO
     Posiciona o item entre dois itens conhecidos da mesma categoria.
     Vale por duas razões: obriga a estimar o valor dos marcos (é o que
     exercita repertório) e entrega dois palpites úteis de quebra — chutando
     os marcos, o tabuleiro mostra os números e o intervalo fica visível. */
  function dicaDeMarco(tema, item) {
    var campo = campoNumerico(tema);
    if (!campo) return null;

    var alvo = item.valores[campo.chave];
    if (typeof alvo !== 'number') return null;
    if (typeof GG.itensPorFama !== 'function') return null;

    // Só itens reconhecíveis servem de marco: um item obscuro não ancora nada.
    var quantos = Math.max(10, Math.round(tema.itens.length * 0.12));
    var conhecidos = GG.itensPorFama(tema).slice(0, quantos);

    var abaixo = null;
    var acima = null;
    conhecidos.forEach(function (outro) {
      if (outro === item) return;
      var valor = outro.valores[campo.chave];
      if (typeof valor !== 'number') return;
      if (valor < alvo && (!abaixo || valor > abaixo.valores[campo.chave])) abaixo = outro;
      if (valor > alvo && (!acima || valor < acima.valores[campo.chave])) acima = outro;
    });

    var ano = campo.tipo === 'ano';

    if (abaixo && acima) {
      return {
        rotulo: 'Marco',
        texto: ano
          ? 'Na linha do tempo, ele fica entre ' + abaixo.nome + ' e ' + acima.nome +
            '. Chute os dois: o tabuleiro mostra os anos.'
          : 'O ' + campo.rotulo + ' dele fica entre o de ' + abaixo.nome + ' e o de ' +
            acima.nome + '. Chute os dois para ver os números.'
      };
    }
    if (abaixo) {
      return {
        rotulo: 'Marco',
        texto: (ano
          ? 'É mais recente que ' + abaixo.nome
          : 'No campo ' + campo.rotulo + ', fica acima de ' + abaixo.nome) +
          ' — e de todos os itens conhecidos desta categoria.'
      };
    }
    if (acima) {
      return {
        rotulo: 'Marco',
        texto: (ano
          ? 'É mais antigo que ' + acima.nome
          : 'No campo ' + campo.rotulo + ', fica abaixo de ' + acima.nome) +
          ' — e de todos os itens conhecidos desta categoria.'
      };
    }
    return null;
  }

  /* --------------------------------------------------------- 3. VIZINHO
     O item mais parecido com o secreto dentro da categoria.
     Serve para qualquer tema, e é a dica que mais faz pensar: o aluno chuta
     o vizinho, vê quase tudo ficar verde e passa a caçar a diferença. Nunca
     entrega a resposta — entrega o ponto de partida da comparação.

     O vizinho é procurado entre os itens conhecidos: apontar um item que a
     turma nunca ouviu falar não ajudaria em nada. */
  function mesmaLista(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) === -1) return false;
    }
    return true;
  }

  function camposEmComum(tema, um, outro) {
    var iguais = 0;
    tema.campos.forEach(function (campo) {
      var a = um.valores[campo.chave];
      var b = outro.valores[campo.chave];
      if (Array.isArray(a) || Array.isArray(b)) {
        if (mesmaLista(a, b)) iguais++;
      } else if (a != null && a !== '' && a === b) {
        iguais++;
      }
    });
    return iguais;
  }

  function dicaDeVizinho(tema, item) {
    if (tema.itens.length < 10) return null;
    if (typeof GG.itensPorFama !== 'function') return null;

    var quantos = Math.max(15, Math.round(tema.itens.length * 0.4));
    var candidatos = GG.itensPorFama(tema).slice(0, quantos);

    var vizinho = null;
    var melhor = 0;
    candidatos.forEach(function (outro) {
      if (outro === item) return;
      var iguais = camposEmComum(tema, item, outro);
      if (iguais > melhor) { melhor = iguais; vizinho = outro; }
    });

    if (!vizinho || melhor < 2) return null;

    /* Empate perfeito: existe item com exatamente as mesmas características.
       Aí a tabela não separa os dois, e avisar isso é a dica mais honesta —
       e a mais interessante, porque mostra que o quadro de atributos não
       distingue tudo, e que o resto vem do repertório do aluno. */
    if (melhor === tema.campos.length) {
      var gemeos = 0;
      tema.itens.forEach(function (outro) {
        if (outro !== item && camposEmComum(tema, item, outro) === melhor) gemeos++;
      });

      return {
        rotulo: 'Sósia',
        texto: gemeos + (gemeos === 1 ? ' item desta categoria tem' : ' itens desta categoria têm') +
          ' exatamente as mesmas características que ele — ' + vizinho.nome +
          ' é um deles. A tabela não separa os dois: decida pelo que você sabe fora dela.'
      };
    }

    return {
      rotulo: 'Vizinho',
      texto: 'O item mais parecido com ele nesta categoria é ' + vizinho.nome +
        ': combinam em ' + melhor + ' das ' + tema.campos.length +
        ' características. Chute e procure onde os dois se separam.'
    };
  }

  /* ---------------------------------------------------------- 3. ÉPOCA
     O século, sempre acompanhado de quantos itens dividem esse século.
     O número é o que dá sentido à dica: "século XX, como 88 dos 123"
     avisa que ali se elimina pouco; "século XIX, só 6 itens" é um achado. */
  function dicaDeEpoca(tema, item) {
    var campo = campoPorTipo(tema, 'ano');
    if (!campo) return null;

    var ano = item.valores[campo.chave];
    if (typeof ano !== 'number') return null;

    var seculo = GG.seculo(ano);
    var iguais = 0;
    tema.itens.forEach(function (outro) {
      if (GG.seculo(outro.valores[campo.chave]) === seculo) iguais++;
    });

    return {
      rotulo: 'Época',
      texto: 'É do século ' + seculo + '. Nesta categoria, ' + iguais +
        ' dos ' + tema.itens.length + ' itens são desse século.'
    };
  }

  /* ---------------------------------------------------------- 5. ORIGEM
     A região de origem, com o tamanho do grupo. O continente não está na
     tabela (lá só aparece o país), então é informação nova de verdade —
     e continua ensinando geografia. Só vale para campos do tipo "pais":
     campos de texto como Continente ou Região já são cobertos pelos cortes. */
  function dicaDeOrigem(tema, item) {
    var campo = campoPorTipo(tema, 'pais');
    if (!campo) return null;

    var regiao = GG.continentes[item.valores[campo.chave]];
    if (!regiao) return null;

    var iguais = 0;
    tema.itens.forEach(function (outro) {
      if (GG.continentes[outro.valores[campo.chave]] === regiao) iguais++;
    });

    return {
      rotulo: 'Origem',
      texto: 'Vem da ' + regiao + ', como ' + iguais + ' dos ' + tema.itens.length +
        ' itens daqui. Quantos países dessa região você consegue listar?'
    };
  }

  /* ----------------------------------------------------- 4. GRUPO PEQUENO
     A característica mais rara do item, sem dizer qual é o valor dela.
     Vira uma tarefa: procurar, dentro da categoria, os grupos minoritários. */
  function dicaDeGrupoRaro(tema, item, estatisticas) {
    var limite = Math.max(3, Math.round(estatisticas.total * 0.15));
    var escolhido = null;

    tema.campos.forEach(function (campo) {
      if (!campoDeGrupo(campo)) return;
      var quantos = tamanhoDoGrupo(estatisticas, campo, item.valores[campo.chave]);
      // Grupo de 1 seria entregar a resposta; grupo grande não recorta nada.
      if (quantos === null || quantos < 2 || quantos > limite) return;
      if (!escolhido || quantos < escolhido.total) escolhido = { campo: campo, total: quantos };
    });

    if (!escolhido) return null;

    return {
      rotulo: 'Grupo pequeno',
      texto: 'No campo ' + escolhido.campo.rotulo + ', ele está num grupo de só ' +
        escolhido.total + ' itens (de ' + estatisticas.total +
        '). Ache esse grupo e sobra quase nada.'
    };
  }

  /* --------------------------------------------------------- 6. ALFABETO
     Antes de entregar a letra, entrega o formato do nome: metade do
     alfabeto, quantidade de letras e de palavras. Dá para eliminar muita
     coisa com isso e ainda sobra o que pensar. */
  function dicaDeAlfabeto(item) {
    var inicial = GG.normalizar(item.nome).charAt(0).toUpperCase();
    if (!/[A-Z]/.test(inicial)) return null;

    var palavras = item.nome.trim().split(/\s+/).length;
    var metade = inicial <= 'M'
      ? 'A inicial está na primeira metade do alfabeto (A–M).'
      : 'A inicial está na segunda metade do alfabeto (N–Z).';

    return {
      rotulo: 'Alfabeto',
      texto: metade + ' O nome tem ' + contarLetras(item.nome) + ' letras' +
        (palavras > 1 ? ', em ' + palavras + ' palavras.' : '.')
    };
  }

  /**
   * Monta a lista completa de dicas de um item, na ordem em que serão liberadas.
   * Da que mais elimina para a que menos elimina — no Difícil só saem duas.
   * @returns {Array<{rotulo: string, texto: string}>}
   */
  GG.gerarDicas = function (tema, item) {
    var estatisticas = GG.estatisticasDoTema(tema);
    var cortes = cortesPossiveis(tema, item, estatisticas);
    var marco = dicaDeMarco(tema, item);
    var epoca = dicaDeEpoca(tema, item);

    /* A ordem preferida, do golpe mais largo para o mais fino. O que não se
       aplica ao tema vira null e some da fila — as seguintes sobem sozinhas.
       É isso que garante duas dicas fortes logo de cara em qualquer categoria,
       inclusive nas que não têm ano nem país.

       Marco e Época dependem do mesmo campo: quando o Marco existe, o século
       vira dica tardia; quando não existe, o século assume o lugar dele. */
    var dicas = [
      cortes[0] ? dicaDeCorte(cortes[0], estatisticas) : null,
      marco || epoca,
      dicaDeVizinho(tema, item),
      dicaDeGrupoRaro(tema, item, estatisticas)
    ]
      // A dica escrita à mão na base de dados, quando existe.
      .concat(item.dicasAutorais.map(function (texto) {
        return { rotulo: 'Pista', texto: texto };
      }))
      .concat([
        dicaDeOrigem(tema, item),
        cortes[1] ? dicaDeCorte(cortes[1], estatisticas) : null,
        marco ? epoca : null
      ])
      .filter(function (dica) { return !!dica; });

    /* Rede de segurança: categoria pequena ou de campos muito parecidos pode
       não render nenhuma das dicas acima. Aí os próprios campos viram dica,
       do mais geral para o mais específico, para nunca faltar por onde começar. */
    if (dicas.length < 3) {
      tema.campos.forEach(function (campo) {
        if (dicas.length >= 3) return;
        if (campo.tipo !== 'texto' && campo.tipo !== 'numero') return;
        var valor = item.valores[campo.chave];
        if (valor == null || valor === '') return;
        dicas.push({
          rotulo: campo.rotulo,
          texto: campo.rotulo + ': ' + GG.exibirValor(campo, valor) + '.'
        });
      });
    }

    var alfabeto = dicaDeAlfabeto(item);
    if (alfabeto) dicas.push(alfabeto);

    dicas.push({
      rotulo: 'Dica final',
      texto: 'Começa com a letra ' + item.nome.charAt(0).toUpperCase() +
        ' e tem ' + contarLetras(item.nome) + ' letras.'
    });

    return dicas;
  };
})(window.GG);
