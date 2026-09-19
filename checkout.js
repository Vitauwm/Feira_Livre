// ============================================================================
// CHECKOUT & CRIAÇÃO DE PEDIDO NO GOOGLE SHEETS
// ============================================================================

function irParaCheckout() {
  if (cart.length === 0) {
    showToast('Adicione produtos antes de ir para o checkout!');
    return;
  }
  closeCartDrawer();
  switchView('checkout');

  // Preenche valores na tela de checkout
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  const total = Math.max(0, subtotal + shippingRate - desc);

  document.getElementById('chk-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-shipping').textContent = `R$ ${shippingRate.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-discount').textContent = `- R$ ${desc.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

async function consultarCepViaCep(cepValor) {
  const cep = String(cepValor).replace(/\D/g, '');
  if (cep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      document.getElementById('chk-rua').value = data.logradouro || '';
      document.getElementById('chk-bairro').value = data.bairro || '';
      document.getElementById('chk-cidade').value = data.localidade || 'Aracaju';
      document.getElementById('chk-estado').value = data.uf || 'SE';

      deliveryAddress = `${data.logradouro || ''}, ${data.bairro || ''} - ${data.localidade}/${data.uf}`;
      document.getElementById('header-delivery-loc').textContent = `${data.localidade || 'Aracaju'} - ${data.uf || 'SE'}`;
      showToast(`Endereço preenchido via API: ${data.localidade}/${data.uf}`);
    }
  } catch (e) {
    console.log('Falha ViaCEP:', e);
  }
}

async function submeterPedido(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast('O carrinho está vazio!');
    return;
  }

  const nome = document.getElementById('chk-nome').value.trim();
  const rua = document.getElementById('chk-rua').value.trim();
  const cidade = document.getElementById('chk-cidade').value.trim();
  const pagamento = document.getElementById('chk-pagamento').value;

  if (!nome || !rua || !cidade) {
    showToast('Por favor, preencha os campos obrigatórios de entrega.');
    return;
  }

  showToast('Enviando pedido para a planilha do Google...');

  const pedidoPayload = {
    usuario_id: currentUser ? currentUser.id : 1,
    endereco: `${rua}, ${document.getElementById('chk-numero').value || 'S/N'} - ${document.getElementById('chk-bairro').value}`,
    cidade: cidade,
    estado: document.getElementById('chk-estado').value || 'SE',
    entrega: shippingRate,
    cupom: appliedCouponData ? appliedCouponData.codigo : '',
    pagamento: pagamento,
    itens: cart.map(i => ({
      produto_id: i.id,
      quantidade: i.quantidade
    }))
  };

  const res = await apiCall('criarPedido', 'POST', pedidoPayload);

  if (res.success && res.data) {
    const orderId = res.data.pedido_id;
    currentTrackingOrder = {
      id: orderId,
      status: 'recebido',
      total: res.data.total
    };

    // Limpa carrinho e estado
    cart = [];
    appliedCouponData = null;
    saveLocalState();
    updateCartUI();

    showToast(`Pedido ${orderId} registrado com sucesso no Google Sheets!`);
    configurarTelaRastreamento(orderId);
    switchView('rastreamento');
  } else {
    showToast(res.error || 'Erro ao processar o pedido no servidor');
  }
}

// ============================================================================
// RASTREAMENTO DO PEDIDO
// ============================================================================

function configurarTelaRastreamento(orderId) {
  document.getElementById('track-order-number').textContent = `Pedido #${orderId}`;
  atualizarTimeline(1);
}

function atualizarTimeline(estagio) {
  const steps = [
    { num: 1, key: 'recebido', label: 'Pedido Confirmado', desc: 'O pedido foi registrado no sistema e enviado aos agricultores cooperados.' },
    { num: 2, key: 'preparacao', label: 'Em Separação', desc: 'Os agricultores estão colhendo e embalando os alimentos frescos.' },
    { num: 3, key: 'caminho', label: 'Em Trânsito', desc: 'Veículo em rota de distribuição para o endereço informado.' },
    { num: 4, key: 'entregue', label: 'Entregue', desc: 'Pedido entregue com sucesso no destino.' }
  ];

  for (let i = 1; i <= 4; i++) {
    const sEl = document.getElementById(`track-s-${i}`);
    const bEl = document.getElementById(`track-b-${i}`);
    if (sEl) {
      sEl.classList.toggle('active', i === estagio);
      sEl.classList.toggle('completed', i < estagio);
    }
    if (bEl) {
      bEl.classList.toggle('completed', i < estagio);
    }
  }

  const step = steps[estagio - 1] || steps[0];
  const titleEl = document.getElementById('track-status-title');
  const descEl = document.getElementById('track-status-desc');
  if (titleEl) titleEl.textContent = step.label;
  if (descEl) descEl.textContent = step.desc;
}

async function simularAvancoStatus() {
  if (!currentTrackingOrder) return;

  const statusSeq = ['recebido', 'preparacao', 'caminho', 'entregue'];
  const curIdx = statusSeq.indexOf(currentTrackingOrder.status);
  const nextStatus = statusSeq[(curIdx + 1) % statusSeq.length];

  currentTrackingOrder.status = nextStatus;
  const stageNum = statusSeq.indexOf(nextStatus) + 1;
  atualizarTimeline(stageNum);

  // Notifica o backend da atualização de status
  await apiCall('atualizarStatusPedido', 'POST', {
    id: currentTrackingOrder.id,
    status: nextStatus
  });

  showToast(`Status atualizado para: ${nextStatus.toUpperCase()} no Google Sheets`);
}

