
(function() {
    const html = `<div class="modal-overlay" id="modal-checkout-feiramais" style="display: none">
  <div class="modal-card">
    <div class="modal-header">
      <h3>Assinatura Feira Livre+</h3>
      <button class="modal-close-btn" onclick="FeiraMaisModule.fecharCheckout()">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Banner Modo Demonstração -->
      <div class="demo-mode-notice">
        <strong>Modo Demonstracao Ativo</strong>
        <p>Nenhuma cobranca real sera realizada. Esta simulacao demonstra os beneficios de frete gratis e cupons exclusivos do Feira Livre+.</p>
      </div>

      <!-- Resumo da Assinatura -->
      <div class="checkout-plan-summary">
        <div class="checkout-summary-row">
          <span>Plano Selecionado:</span>
          <strong>Feira Livre+</strong>
        </div>
        <div class="checkout-summary-row">
          <span>Ciclo:</span>
          <span>Mensal recorrente</span>
        </div>
        <div class="checkout-summary-row">
          <span>Proxima Cobranca:</span>
          <span id="chk-cli-proxima-data">19/10/2026</span>
        </div>
        <div class="checkout-summary-row">
          <span>Beneficio Principal:</span>
          <span style="color: var(--primary); font-weight: 600">Frete gratis a partir de R$ 50,00</span>
        </div>
        <div class="checkout-summary-row total">
          <span>Valor Mensal:</span>
          <span style="color: var(--primary)">R$ 9,90 /mes</span>
        </div>
      </div>

      <div class="checkout-field">
        <label>Forma de Pagamento Recorrente:</label>
        <select id="chk-cli-metodo">
          <option value="Cartao de Credito">Cartao de Credito (Cobranca mensal automatica)</option>
          <option value="Pix Recorrente">Pix Recorrente (Notificacao com chave a cada 30 dias)</option>
        </select>
        <small style="display: block; color: var(--text-muted); margin-top: 4px; font-size: 11.5px;">
          Seguranca: Seus dados bancarios sao processados com criptografia diretamente pelo gateway.
        </small>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-sub-action" onclick="FeiraMaisModule.fecharCheckout()">Voltar</button>
      <button type="button" class="btn-sub-action primary" id="btn-cli-confirmar-sub" onclick="FeiraMaisModule.confirmarAssinatura()">
        Confirmar Assinatura
      </button>
    </div>
  </div>
</div>
`;
    const placeholder = document.getElementById('modal-checkout-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
