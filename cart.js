// ============================================================================
// CARRINHO & REGRAS DE CHECKOUT
// ============================================================================

function toggleCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.toggle("open");
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("open");
}

function alterarQtdCarrinho(prodId, delta) {
  const prod = produtos.find((p) => String(p.id) === String(prodId));
  if (!prod) return;

  const itemIdx = cart.findIndex((i) => String(i.id) === String(prodId));

  if (itemIdx > -1) {
    cart[itemIdx].quantidade += delta;
    if (cart[itemIdx].quantidade <= 0) {
      cart.splice(itemIdx, 1);
    }
  } else if (delta > 0) {
    cart.push({
      id: prod.id,
      nome: prod.nome,
      preco: Number(prod.preco),
      unidade: prod.unidade,
      imagem: prod.imagem,
      produtor_id: prod.produtor_id,
      quantidade: delta,
    });
  }

  saveLocalState();
  updateCartUI();
  renderProdutos();
  renderCartDrawer();
}

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.quantidade, 0);
  const badge = document.getElementById("header-cart-count");
  if (badge) badge.textContent = count;
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: #666;">
        <span style="font-size: 40px; display: block; margin-bottom: 8px;"></span>
        <h4>Seu carrinho está vazio</h4>
        <p style="font-size: 13px;">Adicione produtos frescos dos agricultores locais!</p>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  body.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-row">
      <img src="${getProductImage(item)}" alt="${item.nome}" onerror="this.onerror=null; this.src=\'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80\';">
      <div class="cart-row-info">
        <h5>${item.nome}</h5>
        <span>R$ ${item.preco.toFixed(2).replace(".", ",")} / ${item.unidade}</span>
        <div class="cart-row-price">Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</div>
      </div>
      <div class="qty-pill" style="padding: 2px;">
        <button onclick="alterarQtdCarrinho('${item.id}', -1)">-</button>
        <span style="width: 24px; text-align: center;">${item.quantidade}</span>
        <button onclick="alterarQtdCarrinho('${item.id}', 1)">+</button>
      </div>
    </div>
  `,
    )
    .join("");

  updateCartCalculations();
}

function updateCartCalculations() {
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  let desconto = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  let currentShipping = shippingRate;

  let economiaProdutos = 0;
  cart.forEach((item) => {
    const prod = produtos.find((p) => String(p.id) === String(item.id));
    if (
      prod &&
      prod.preco_antigo &&
      Number(prod.preco_antigo) > Number(prod.preco)
    ) {
      economiaProdutos +=
        (Number(prod.preco_antigo) - Number(prod.preco)) * item.quantidade;
    }
  });

  let economiaFrete = 0;
  const isAssinante =
    typeof verificarAssinaturaCliente === "function"
      ? verificarAssinaturaCliente().isAssinante
      : false;
  if (isAssinante && subtotal >= 50) {
    economiaFrete = shippingRate;
    currentShipping = 0;
  }

  const totalEconomia = desconto + economiaProdutos + economiaFrete;
  const total = Math.max(0, subtotal + currentShipping - desconto);

  document.getElementById("cart-subtotal-val").textContent =
    `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
  if (economiaFrete > 0) {
    document.getElementById("cart-shipping-val").innerHTML =
      `<span style="text-decoration:line-through; color:var(--text-light); margin-right:6px;">R$ ${shippingRate.toFixed(2).replace(".", ",")}</span> <strong style="color:var(--primary);">Grátis</strong>`;
  } else {
    document.getElementById("cart-shipping-val").textContent =
      `R$ ${currentShipping.toFixed(2).replace(".", ",")}`;
  }

  const descLine = document.getElementById("cart-discount-line");
  if (desconto > 0) {
    descLine.style.display = "flex";
    document.getElementById("cart-discount-val").textContent =
      `- R$ ${desconto.toFixed(2).replace(".", ",")}`;
  } else {
    descLine.style.display = "none";
  }

  document.getElementById("cart-total-val").textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;

  let economyBanner = document.getElementById("cart-economy-banner-wrap");
  if (!economyBanner) {
    economyBanner = document.createElement("div");
    economyBanner.id = "cart-economy-banner-wrap";
    const footer = document.getElementById("cart-drawer-footer");
    if (footer) {
      footer.insertBefore(economyBanner, footer.firstChild);
    }
  }

  if (totalEconomia > 0) {
    economyBanner.innerHTML = `<div class="cart-economy-banner">✨ Você economizou R$ ${totalEconomia.toFixed(2).replace(".", ",")} neste pedido!</div>`;
  } else {
    economyBanner.innerHTML = "";
  }
}

async function aplicarCupom() {
  const input = document.getElementById("coupon-input");
  if (!input || !input.value.trim()) return;

  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const res = await apiCall("validarCupom", "GET", {
    codigo: input.value.trim(),
    subtotal: subtotal,
  });

  if (res.success && res.data && res.data.valido) {
    appliedCouponData = res.data;
    showToast(`Cupom ${res.data.codigo} aplicado com sucesso!`);
    updateCartCalculations();
  } else {
    appliedCouponData = null;
    showToast(res.error || "Cupom inválido ou expirado");
    updateCartCalculations();
  }
}
