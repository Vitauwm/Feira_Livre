// ============================================================================
// CLIENTE HTTP (FETCH COM SUPORTE A CORS DO GOOGLE APPS SCRIPT)
// ============================================================================

async function apiCall(action, method = "GET", data = null) {
  // Se não houver API configurada, utiliza simulação local
  if (!API_URL || API_URL.trim() === "") {
    return localMockHandler(action, method, data);
  }

  try {
    let url = `${API_URL}?action=${encodeURIComponent(action)}`;
    let options = {
      method: method,
      mode: "cors",
    };

    if (method === "GET" && data) {
      const qs = new URLSearchParams(data).toString();
      url += `&${qs}`;
    } else if (method === "POST") {
      // Importante para Google Apps Script: envio como text/plain evita bloqueio de preflight CORS
      options.headers = {
        "Content-Type": "text/plain;charset=utf-8",
      };
      options.body = JSON.stringify(data || {});
    }

    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn(
      "Erro ao conectar ao Apps Script. Alternando para modo local:",
      err,
    );
    showToast(
      "Falha na conexão com o banco na nuvem. Operando em modo offline.",
    );
    return localMockHandler(action, method, data);
  }
}

/**
 * Fallback para executar todas as operações caso a planilha ainda não esteja vinculada
 */
function localMockHandler(action, method, data) {
  if (method === "GET") {
    if (action === "produtos")
      return {
        success: true,
        data: produtos.length ? produtos : MOCK_DB.produtos,
      };
    if (action === "produtores")
      return {
        success: true,
        data: produtores.length ? produtores : MOCK_DB.produtores,
      };
    if (action === "categorias")
      return { success: true, data: MOCK_DB.categorias };

    if (action === "planoCliente") {
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.getConfig()
          : { precoMensal: 9.9, pedidoMinimoFreteGratis: 50.0 },
      };
    }
    if (action === "assinaturaCliente") {
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.verificarAssinaturaCliente()
          : { isAssinante: false, status: "gratuita" },
      };
    }
    if (action === "beneficiosCliente") {
      const sub = parseFloat(data ? data.subtotal : 0);
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.calcularBeneficiosCarrinho(sub)
          : {},
      };
    }
    if (action === "historicoPagamentos") {
      return { success: true, data: [] };
    }
    if (action === "validarCupom") {
      const cod = String(data ? data.codigo : "")
        .toUpperCase()
        .trim();
      const sub = parseFloat(data && data.subtotal ? data.subtotal : 0);

      if (cod === "FEIRAMAIS10") {
        const check = window.FeiraMaisModule
          ? window.FeiraMaisModule.validarCupomExclusivo(cod)
          : null;
        if (check && !check.valido) {
          return { success: false, error: check.mensagem };
        }
        return {
          success: true,
          data: {
            valido: true,
            codigo: "FEIRAMAIS10",
            tipo: "percentual",
            desconto_calculado: Number((sub * 0.1).toFixed(2)),
          },
        };
      }
      if (cod === "FEIRA10") {
        return {
          success: true,
          data: {
            valido: true,
            codigo: "FEIRA10",
            tipo: "percentual",
            desconto_calculado: Number((sub * 0.1).toFixed(2)),
          },
        };
      }
      return { success: false, error: "Cupom invalido. Tente FEIRA10." };
    }
  } else if (method === "POST") {
    if (action === "criarPedido") {
      const subtotal = cart.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0,
      );
      const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
      let freteFinal = shippingRate;
      if (window.FeiraMaisModule) {
        const b = window.FeiraMaisModule.calcularBeneficiosCarrinho(subtotal);
        freteFinal = b.freteFinal;
        if (b.descontoFrete > 0) {
          window.FeiraMaisModule.registrarEconomiaPedido(b.descontoFrete, desc);
        }
      }
      const id = "FL-" + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        data: {
          pedido_id: id,
          total: subtotal + freteFinal - desc,
          status: "recebido",
        },
      };
    }
    if (action === "adicionarProduto") {
      const id = Date.now();
      const novo = Object.assign({ id }, data);
      produtos.unshift(novo);
      return { success: true, data: novo };
    }
    if (
      action === "criarAssinaturaCliente" ||
      action === "cancelarAssinaturaCliente" ||
      action === "reativarAssinaturaCliente" ||
      action === "registrarPagamentoCliente" ||
      action === "atualizarStatusAssinaturaCliente"
    ) {
      return {
        success: true,
        message: "Operacao concluida com sucesso (Modo Demonstracao)",
        data: data,
      };
    }
  }
  return { success: true, data: {} };
}
