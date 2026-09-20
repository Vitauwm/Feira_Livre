
(function() {
    const html = `<!-- VIEW 4: CHECKOUT -->
      <section id="view-checkout" class="view-section">
        <div class="form-box">
          <h3>Finalizar Pedido e Dados de Entrega</h3>
          <form onsubmit="submeterPedido(event)">
            <div class="form-grid">
              <div class="form-group full">
                <label>Nome Completo</label>
                <input
                  type="text"
                  id="chk-nome"
                  required
                  placeholder="Nome e sobrenome"
                />
              </div>
              <div class="form-group">
                <label>Telefone para Contato</label>
                <input type="tel" id="chk-tel" placeholder="(79) 99999-9999" />
              </div>
              <div class="form-group">
                <label>CEP de Entrega</label>
                <input
                  type="text"
                  id="chk-cep"
                  placeholder="49000-000"
                  maxlength="9"
                  onblur="consultarCepViaCep(this.value)"
                />
              </div>
              <div class="form-group full">
                <label>Logradouro (Rua, Avenida ou Povoado)</label>
                <input
                  type="text"
                  id="chk-rua"
                  required
                  placeholder="Endereço de entrega"
                />
              </div>
              <div class="form-group">
                <label>Número</label>
                <input
                  type="text"
                  id="chk-numero"
                  placeholder="Ex: 120 ou S/N"
                />
              </div>
              <div class="form-group">
                <label>Bairro</label>
                <input type="text" id="chk-bairro" placeholder="Bairro" />
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input type="text" id="chk-cidade" required value="Aracaju" />
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input type="text" id="chk-estado" required value="SE" />
              </div>
              <div class="form-group full">
                <label>Forma de Pagamento</label>
                <select id="chk-pagamento">
                  <option value="Pix">
                    Pix (Chave exibida após confirmação)
                  </option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Dinheiro">Dinheiro na Entrega</option>
                </select>
              </div>
            </div>

            <!-- Resumo de Valores -->
            <div class="summary-rows">
              <div class="sum-line">
                <span>Subtotal dos Produtos:</span
                ><strong id="chk-subtotal">R$ 0,00</strong>
              </div>
              <div class="sum-line">
                <span>Taxa de Entrega Local:</span
                ><strong id="chk-shipping">R$ 8,50</strong>
              </div>
              <div class="sum-line" style="color: var(--primary)">
                <span>Desconto:</span
                ><strong id="chk-discount">- R$ 0,00</strong>
              </div>
              <div class="sum-line total">
                <span>Total do Pedido:</span
                ><strong id="chk-total">R$ 0,00</strong>
              </div>
            </div>

            <button type="submit" class="btn-submit-form">
              Confirmar Pedido
            </button>
          </form>
        </div>
      </section>`;
    const placeholder = document.getElementById('checkout-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
