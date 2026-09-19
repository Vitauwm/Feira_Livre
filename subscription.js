
/**
 * ============================================================================
 * FEIRA LIVRE+ — MÓDULO DE ASSINATURA EXCLUSIVA PARA CLIENTES / CONSUMIDORES
 * Gestão do plano Feira Livre+, cálculo de frete grátis, cupons e economia
 * ============================================================================
 */
window.FeiraMaisModule = (function () {

  // 1. CONFIGURAÇÃO GERAL DO FEIRA LIVRE+ (Preço e limites configuráveis)
  const CONFIG = {
    planoId: "feiramais",
    nome: "Feira Livre+",
    subtitulo: "Mais vantagens para comprar de produtores locais.",
    precoMensal: 9.90, // Configurável no sistema
    precoFormatado: "R$ 9,90",
    ciclo: "mensal",
    pedidoMinimoFreteGratis: 50.00, // Frete grátis em pedidos >= R$ 50,00
    fretePadrao: 8.00,
    cupomExclusivo: "FEIRAMAIS10",
    descontoCupomPercentual: 0.10
  };

  // 2. ESTADO DA ASSINATURA DO CLIENTE ATUAL (Persistido no localStorage)
  function carregarAssinaturaLocal() {
    try {
      const salvo = localStorage.getItem("FEIRALIVRE_CLIENTE_ASSINATURA");
      if (salvo) return JSON.parse(salvo);
    } catch(e) {}
    
    // Estado inicial de demonstração (plano gratuito padrão)
    return {
      idAssinatura: "SUB-CLI-FREE-1",
      clienteId: 1,
      plano: "gratuito",
      valor: 0.00,
      status: "gratuita", // gratuita, ativa, pendente, cancelada, vencida, suspensa
      dataInicio: "-",
      dataProximaCobranca: "-",
      dataCancelamento: "",
      gateway: "gratuito",
      gatewaySubscriptionId: "",
      metodo: "Gratuito"
    };
  }

  function salvarAssinaturaLocal(sub) {
    try {
      localStorage.setItem("FEIRALIVRE_CLIENTE_ASSINATURA", JSON.stringify(sub));
    } catch(e) {}
  }

  let clienteAssinatura = carregarAssinaturaLocal();

  // Histórico de mensalidades pagas pelo cliente
  let historicoPagamentos = [
    {
      idPagamento: "PAG-CLI-8901",
      idAssinatura: "SUB-CLI-9901",
      clienteId: 1,
      valor: 9.90,
      data: "2026-09-19",
      status: "aprovado",
      metodo: "Cartao de Credito"
    }
  ];

  // Registro de economia
  let economiaRegistro = {
    fretesGratisUsados: 3,
    descontoFreteTotal: 24.00,
    descontoCuponsTotal: 63.50,
    economiaTotal: 87.50,
    mensalidadesPagas: 9.90
  };

  /**
   * Inicialização do módulo
   */
  async function init() {
    atualizarPrecoExibicao();
    renderizarPainelCliente();
    renderizarEconomia();
    renderizarHistoricoPagamentos();
    atualizarBotaoHeaderStatus();
  }

  function atualizarPrecoExibicao() {
    const elPrice = document.getElementById("fl-price-display");
    if (elPrice) {
      elPrice.textContent = CONFIG.precoMensal.toFixed(2).replace('.', ',');
    }
  }

  /**
   * Verifica se o cliente possui plano Feira Livre+ ativo ou em cancelamento vigente
   */
  function isClienteAssinante() {
    const st = String(clienteAssinatura.status || "gratuita").toLowerCase();
    return st === "ativa" || st === "cancelada";
  }

  /**
   * Consulta pública de status e regras para o restante da aplicação
   */
  function verificarAssinaturaCliente() {
    return {
      isAssinante: isClienteAssinante(),
      status: clienteAssinatura.status,
      plano: clienteAssinatura.plano,
      valor: clienteAssinatura.valor,
      dataProximaCobranca: clienteAssinatura.dataProximaCobranca,
      regraFreteGratis: CONFIG.pedidoMinimoFreteGratis
    };
  }

  /**
   * Cálculo dos benefícios aplicáveis ao carrinho de compras
   */
  function calcularBeneficiosCarrinho(subtotal) {
    const isAssinante = isClienteAssinante();
    const valSubtotal = parseFloat(subtotal || 0);
    const freteNormal = CONFIG.fretePadrao;

    if (isAssinante && valSubtotal >= CONFIG.pedidoMinimoFreteGratis) {
      return {
        freteFinal: 0.00,
        descontoFrete: freteNormal,
        elegivelFreteGratis: true,
        mensagem: "Frete gratis com Feira Livre+ aplicado!"
      };
    }

    const faltaParaFrete = isAssinante ? Math.max(0, CONFIG.pedidoMinimoFreteGratis - valSubtotal) : 0;

    return {
      freteFinal: freteNormal,
      descontoFrete: 0.00,
      elegivelFreteGratis: false,
      faltaParaFrete: faltaParaFrete,
      mensagem: isAssinante 
        ? `Adicione mais R$ ${faltaParaFrete.toFixed(2).replace('.', ',')} para ganhar Frete Gratis com Feira Livre+` 
        : "Economize no frete assinando o Feira Livre+ por R$ 9,90/mes"
    };
  }

  /**
   * Validação de cupom exclusivo para assinantes
   */
  function validarCupomExclusivo(codigo) {
    const cod = String(codigo || "").trim().toUpperCase();
    if (cod === CONFIG.cupomExclusivo) {
      if (!isClienteAssinante()) {
        return {
          valido: false,
          mensagem: "O cupom FEIRAMAIS10 e exclusivo para assinantes Feira Livre+. Assine por R$ 9,90/mes para liberar este desconto!"
        };
      }
      return {
        valido: true,
        percentual: CONFIG.descontoCupomPercentual,
        mensagem: "Cupom Feira Livre+ de 10% OFF aplicado com sucesso!"
      };
    }
    return null; // Não é cupom exclusivo do clube
  }

  /**
   * Atualização da interface da seção Minha Assinatura
   */
  function renderizarPainelCliente() {
    const isAssinante = isClienteAssinante();
    const st = clienteAssinatura.status || "gratuita";

    const elTitle = document.getElementById("cli-sub-title");
    const elBadge = document.getElementById("cli-sub-status-badge");
    const elPlanoNome = document.getElementById("cli-sub-plano-nome");
    const elValor = document.getElementById("cli-sub-valor");
    const elProx = document.getElementById("cli-sub-proxima-data");
    const elInicio = document.getElementById("cli-sub-inicio-data");
    const elAlert = document.getElementById("cli-sub-alert");

    const btnAssinar = document.getElementById("btn-cli-assinar-toggle");
    const btnCancelar = document.getElementById("btn-cli-cancelar-sub");
    const btnReativar = document.getElementById("btn-cli-reativar-sub");
    const btnCtaHero = document.getElementById("btn-cta-feiramais");

    if (elTitle) elTitle.textContent = isAssinante ? "Minha Assinatura Feira Livre+" : "Minha Assinatura (Cliente)";
    if (elPlanoNome) elPlanoNome.textContent = isAssinante ? "Feira Livre+" : "Plano Gratuito";
    if (elValor) elValor.textContent = isAssinante ? `${CONFIG.precoFormatado} /mes` : "R$ 0,00 /mes";
    if (elProx) elProx.textContent = clienteAssinatura.dataProximaCobranca || "-";
    if (elInicio) elInicio.textContent = formatarDataBR(clienteAssinatura.dataInicio);

    if (elBadge) {
      elBadge.className = `sub-badge ${st}`;
      const rotulos = {
        ativa: "Ativa",
        gratuita: "Gratuita",
        cancelada: "Cancelada",
        suspensa: "Suspensa",
        vencida: "Vencida"
      };
      elBadge.textContent = rotulos[st] || st.toUpperCase();
    }

    if (elAlert) {
      if (st === "cancelada") {
        elAlert.style.display = "block";
        elAlert.textContent = `Sua assinatura foi cancelada. Os beneficios continuam ativos ate ${clienteAssinatura.dataProximaCobranca}.`;
      } else {
        elAlert.style.display = "none";
      }
    }

    if (btnAssinar) {
      btnAssinar.style.display = isAssinante ? "none" : "inline-block";
      btnAssinar.textContent = "Assinar Feira Livre+";
    }
    if (btnCancelar) {
      btnCancelar.style.display = (st === "ativa") ? "inline-block" : "none";
    }
    if (btnReativar) {
      btnReativar.style.display = (st === "cancelada" || st === "suspensa") ? "inline-block" : "none";
    }
    if (btnCtaHero) {
      btnCtaHero.textContent = isAssinante ? "Assinatura Ja Ativa" : "Assinar Feira Livre+";
      btnCtaHero.disabled = isAssinante;
      btnCtaHero.style.opacity = isAssinante ? "0.75" : "1";
    }

    const tagGratuito = document.getElementById("tag-plano-gratuito-ativo");
    if (tagGratuito) {
      tagGratuito.textContent = isAssinante ? "Plano Basico" : "Seu Plano Atual";
    }
  }

  /**
   * Renderiza os dados do painel de economia do cliente
   */
  function renderizarEconomia() {
    const ecoMes = document.getElementById("eco-mes-val");
    const ecoTotal = document.getElementById("eco-total-val");
    const ecoCusto = document.getElementById("eco-custo-val");
    const ecoLiq = document.getElementById("eco-liquida-val");

    if (ecoMes) ecoMes.textContent = `R$ ${economiaRegistro.descontoFreteTotal.toFixed(2).replace('.', ',')}`;
    if (ecoTotal) ecoTotal.textContent = `R$ ${economiaRegistro.economiaTotal.toFixed(2).replace('.', ',')}`;
    if (ecoCusto) ecoCusto.textContent = `R$ ${CONFIG.precoMensal.toFixed(2).replace('.', ',')}`;
    
    const liquido = Math.max(0, economiaRegistro.economiaTotal - CONFIG.precoMensal);
    if (ecoLiq) ecoLiq.textContent = `R$ ${liquido.toFixed(2).replace('.', ',')}`;
  }

  /**
   * Renderiza a tabela de pagamentos de mensalidade do cliente
   */
  function renderizarHistoricoPagamentos() {
    const tbody = document.getElementById("client-sub-invoices-tbody");
    if (!tbody) return;

    if (!isClienteAssinante() && historicoPagamentos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; color:var(--text-muted); padding:16px;">
            Nenhuma mensalidade registrada. Assine o Feira Livre+ para comecar a economizar!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = historicoPagamentos.map(p => `
      <tr>
        <td style="font-family:monospace; font-weight:600;">${p.idPagamento}</td>
        <td>${formatarDataBR(p.data)}</td>
        <td style="font-weight:700; color:var(--primary);">R$ ${parseFloat(p.valor).toFixed(2).replace('.', ',')}</td>
        <td>${p.metodo}</td>
        <td><span class="sub-badge ativa">Pago</span></td>
      </tr>
    `).join('');
  }

  /**
   * Atualiza o botão de status no topo da página
   */
  function atualizarBotaoHeaderStatus() {
    const btn = document.getElementById("btn-client-clube-status");
    if (!btn) return;

    if (isClienteAssinante()) {
      btn.className = "btn-sub-client-badge active-plus";
      btn.textContent = "Feira Livre+ Ativo";
    } else {
      btn.className = "btn-sub-client-badge";
      btn.textContent = "Feira Livre+";
    }
  }

  /**
   * Fluxo de Checkout de Assinatura do Cliente
   */
  function iniciarCheckout() {
    const modal = document.getElementById("modal-checkout-feiramais");
    if (!modal) return;

    const elData = document.getElementById("chk-cli-proxima-data");
    const prox = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (elData) elData.textContent = formatarDataBR(prox.toISOString().split('T')[0]);

    modal.style.display = "flex";
  }

  function fecharCheckout() {
    const modal = document.getElementById("modal-checkout-feiramais");
    if (modal) modal.style.display = "none";
  }

  /**
   * Confirmação da assinatura do cliente (Simulação em Modo Demonstração)
   */
  async function confirmarAssinatura() {
    const btn = document.getElementById("btn-cli-confirmar-sub");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Ativando Feira Livre+...";
    }

    const now = new Date();
    const proxima = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const metodoSelect = document.getElementById("chk-cli-metodo");
    const metodo = metodoSelect ? metodoSelect.value : "Cartao de Credito";

    const novaAssinatura = {
      idAssinatura: "SUB-CLI-" + Date.now().toString().slice(-6),
      clienteId: 1,
      plano: "feiramais",
      valor: CONFIG.precoMensal,
      status: "ativa",
      dataInicio: now.toISOString().split('T')[0],
      dataProximaCobranca: proxima.toISOString().split('T')[0],
      dataCancelamento: "",
      gateway: "simulado_modo_demo",
      gatewaySubscriptionId: "gw_sub_" + Date.now(),
      metodo: metodo
    };

    // Chamada à API se houver backend configurado
    if (typeof apiCall === "function" && typeof API_URL !== "undefined" && API_URL && API_URL.trim() !== "") {
      try {
        await apiCall("criarAssinaturaCliente", "POST", novaAssinatura);
      } catch(e) {
        console.warn("Assinatura cliente: backend offline, ativado no modo demonstracao local.");
      }
    }

    clienteAssinatura = novaAssinatura;
    salvarAssinaturaLocal(clienteAssinatura);

    // Adiciona fatura ao histórico
    historicoPagamentos.unshift({
      idPagamento: "PAG-CLI-" + Date.now().toString().slice(-4),
      idAssinatura: novaAssinatura.idAssinatura,
      clienteId: 1,
      valor: CONFIG.precoMensal,
      data: now.toISOString().split('T')[0],
      status: "aprovado",
      metodo: metodo
    });

    fecharCheckout();
    renderizarPainelCliente();
    renderizarEconomia();
    renderizarHistoricoPagamentos();
    atualizarBotaoHeaderStatus();

    // Atualiza o carrinho se estiver aberto
    if (typeof renderCartDrawer === "function") {
      renderCartDrawer();
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = "Confirmar assinatura";
    }

    if (typeof showToast === "function") {
      showToast("Feira Livre+ ativado com sucesso!");
    }
  }

  /**
   * Modal de Cancelamento
   */
  function abrirModalCancelar() {
    const modal = document.getElementById("modal-cancelar-feiramais");
    const elPeriodo = document.getElementById("cancel-cli-periodo");
    if (elPeriodo) {
      elPeriodo.textContent = clienteAssinatura.dataProximaCobranca || "fim do periodo pago";
    }
    if (modal) modal.style.display = "flex";
  }

  function fecharCancelar() {
    const modal = document.getElementById("modal-cancelar-feiramais");
    if (modal) modal.style.display = "none";
  }

  async function confirmarCancelamento() {
    clienteAssinatura.status = "cancelada";
    clienteAssinatura.dataCancelamento = new Date().toISOString().split('T')[0];
    salvarAssinaturaLocal(clienteAssinatura);

    if (typeof apiCall === "function" && typeof API_URL !== "undefined" && API_URL && API_URL.trim() !== "") {
      try {
        await apiCall("cancelarAssinaturaCliente", "POST", { idAssinatura: clienteAssinatura.idAssinatura, clienteId: 1 });
      } catch(e) {}
    }

    fecharCancelar();
    renderizarPainelCliente();
    atualizarBotaoHeaderStatus();

    if (typeof showToast === "function") {
      showToast("Sua assinatura foi cancelada. Os beneficios continuam ativos ate o final do periodo ja pago.");
    }
  }

  /**
   * Reativação da assinatura
   */
  async function reativarAssinatura() {
    clienteAssinatura.status = "ativa";
    clienteAssinatura.dataCancelamento = "";
    const proxima = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    clienteAssinatura.dataProximaCobranca = proxima.toISOString().split('T')[0];
    salvarAssinaturaLocal(clienteAssinatura);

    if (typeof apiCall === "function" && typeof API_URL !== "undefined" && API_URL && API_URL.trim() !== "") {
      try {
        await apiCall("reativarAssinaturaCliente", "POST", { idAssinatura: clienteAssinatura.idAssinatura, clienteId: 1 });
      } catch(e) {}
    }

    renderizarPainelCliente();
    atualizarBotaoHeaderStatus();

    if (typeof showToast === "function") {
      showToast("Assinatura Feira Livre+ reativada com sucesso.");
    }
  }

  /**
   * Registra economia adicional quando um pedido com frete grátis ou cupom é finalizado
   */
  function registrarEconomiaPedido(descontoFrete, descontoCupom) {
    if (descontoFrete > 0) {
      economiaRegistro.fretesGratisUsados += 1;
      economiaRegistro.descontoFreteTotal += descontoFrete;
      economiaRegistro.economiaTotal += descontoFrete;
    }
    if (descontoCupom > 0) {
      economiaRegistro.descontoCuponsTotal += descontoCupom;
      economiaRegistro.economiaTotal += descontoCupom;
    }
    renderizarEconomia();
  }

  function formatarDataBR(dataStr) {
    if (!dataStr || dataStr === "-") return "-";
    const p = String(dataStr).split('-');
    if (p.length === 3) return `${p[2]}/${p[1]}/${p[0]}`;
    return dataStr;
  }

  // API Pública do Módulo
  return {
    init,
    isClienteAssinante,
    verificarAssinaturaCliente,
    calcularBeneficiosCarrinho,
    validarCupomExclusivo,
    iniciarCheckout,
    fecharCheckout,
    confirmarAssinatura,
    abrirModalCancelar,
    fecharCancelar,
    confirmarCancelamento,
    reativarAssinatura,
    registrarEconomiaPedido,
    getConfig: () => CONFIG
  };

})();

window.verificarAssinaturaCliente = function() {
  if (window.FeiraMaisModule && typeof window.FeiraMaisModule.verificarAssinaturaCliente === 'function') {
    return window.FeiraMaisModule.verificarAssinaturaCliente();
  }
  return { isAssinante: false, status: 'gratuita' };
};



function renderMeusProdutosCadastrados() {
  const tbody = document.getElementById("producer-products-tbody");
  if (!tbody) return;

  const sel = document.getElementById("sel-active-producer");
  const pid = sel ? parseInt(sel.value, 10) : 1;

  const prods = (typeof produtos !== "undefined" ? produtos : []).filter(p => p.produtor_id === pid);

  if (prods.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; color:var(--text-muted); padding:20px;">
          Nenhum alimento cadastrado por este produtor ate o momento.
        </td>
      </tr>
    `;
    return;
  }

  const catMap = { 1: "Vegetais", 2: "Frutas", 3: "Raizes", 4: "Folhas", 5: "Graos", 6: "Laticinios", 7: "Ovos", 8: "Mel", 9: "Artesanais" };

  tbody.innerHTML = prods.map(p => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td>${catMap[p.categoria_id] || 'Geral'}</td>
      <td>R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')} / ${p.unidade}</td>
      <td>${p.estoque} un</td>
      <td>${p.organico ? '<span style="color:#15803D; font-weight:600;">Organico</span>' : 'Convencional'}</td>
      <td><span class="sub-badge ativa">Ativo</span></td>
    </tr>
  `).join('');
}

function selecionarProdutorPainel(id) {
  renderMeusProdutosCadastrados();
  const nomes = {
    1: "Fazenda Boa Vista",
    2: "Atelie Fibra Criativa",
    3: "Apiario Doce Mel",
    4: "Sitio Verde Vivo",
    5: "Sabores da Roca"
  };
  if (typeof showToast === "function") {
    showToast(`Painel do produtor: ${nomes[id] || 'Produtor ' + id}`);
  }
}
