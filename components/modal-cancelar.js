
(function() {
    const html = `<div class="modal-overlay" id="modal-cancelar-feiramais" style="display: none">
  <div class="modal-card">
    <div class="modal-header">
      <h3>Cancelar Feira Livre+</h3>
      <button class="modal-close-btn" onclick="FeiraMaisModule.fecharCancelar()">&times;</button>
    </div>
    <div class="modal-body">
      <p style="font-size: 14px; color: var(--text-main); font-weight: 600; margin-bottom: 12px;">
        Tem certeza que deseja cancelar sua assinatura?
      </p>
      <div class="sub-alert-box info">
        A assinatura continuara ativa ate o final do periodo ja pago (<span id="cancel-cli-periodo">19/10/2026</span>).
      </div>
      <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0 0 16px;">
        Apos essa data, seus pedidos voltarao a ter taxa normal de entrega e os cupons exclusivos serao desativados. Voce pode reativar a qualquer momento!
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-sub-action" onclick="FeiraMaisModule.fecharCancelar()">Manter Assinatura</button>
      <button type="button" class="btn-sub-action danger" onclick="FeiraMaisModule.confirmarCancelamento()">Confirmar Cancelamento</button>
    </div>
  </div>
</div>
`;
    const placeholder = document.getElementById('modal-cancelar-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
