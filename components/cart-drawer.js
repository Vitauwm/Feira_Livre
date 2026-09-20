
(function() {
    const html = `<!-- DRAWER LATERAL DO CARRINHO -->
    <div class="drawer-backdrop" id="cart-drawer" onclick="closeCartDrawer()">
      <div class="drawer-panel" onclick="event.stopPropagation()">
        <div class="drawer-top">
          <h3>Carrinho de Compras</h3>
          <button class="btn-close" onclick="closeCartDrawer()" title="Fechar">
            &times;
          </button>
        </div>

        <div class="drawer-body" id="cart-drawer-body">
          <!-- Renderizado via JS -->
        </div>

        <div class="drawer-bottom" id="cart-drawer-footer">
          <!-- Cupom de Desconto -->
          <div class="coupon-group">
            <input
              type="text"
              id="coupon-input"
              placeholder="Código de desconto (ex: FEIRA10)"
            />
            <button class="btn-apply" onclick="aplicarCupom()">Aplicar</button>
          </div>

          <div class="summary-rows">
            <div class="sum-line">
              <span>Subtotal:</span
              ><strong id="cart-subtotal-val">R$ 0,00</strong>
            </div>
            <div class="sum-line">
              <span>Taxa de Entrega:</span
              ><strong id="cart-shipping-val">R$ 8,50</strong>
            </div>
            <div
              class="sum-line"
              id="cart-discount-line"
              style="display: none; color: var(--primary)"
            >
              <span>Desconto:</span
              ><strong id="cart-discount-val">- R$ 0,00</strong>
            </div>
            <div class="sum-line total">
              <span>Total:</span><strong id="cart-total-val">R$ 0,00</strong>
            </div>
          </div>`;
    const placeholder = document.getElementById('cart-drawer-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
