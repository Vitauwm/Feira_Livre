
(function() {
    const html = `<!-- VIEW 5: RASTREAMENTO -->
      <section id="view-rastreamento" class="view-section">
        <div class="tracking-box">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <h3
                id="track-order-number"
                style="
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text-main);
                "
              >
                Pedido #FL-000101
              </h3>
              <p
                style="
                  font-size: 12px;
                  color: var(--text-muted);
                  margin-top: 2px;
                "
              >
                Histórico de expedição e transporte
              </p>
            </div>
            <button class="btn-nav-action" onclick="simularAvancoStatus()">
              Avançar Etapa (Demonstração)
            </button>
          </div>

          <!-- Linha do Tempo -->
          <div class="timeline-row">
            <div class="t-step active" id="track-s-1">
              <div class="t-circle">1</div>
              <span style="font-size: 11px; font-weight: 600">Recebido</span>
            </div>
            <div class="t-bar" id="track-b-1"></div>
            <div class="t-step" id="track-s-2">
              <div class="t-circle">2</div>
              <span style="font-size: 11px; font-weight: 600"
                >Em Separação</span
              >
            </div>
            <div class="t-bar" id="track-b-2"></div>
            <div class="t-step" id="track-s-3">
              <div class="t-circle">3</div>
              <span style="font-size: 11px; font-weight: 600">Em Trânsito</span>
            </div>
            <div class="t-bar" id="track-b-3"></div>
            <div class="t-step" id="track-s-4">
              <div class="t-circle">4</div>
              <span style="font-size: 11px; font-weight: 600">Entregue</span>
            </div>
          </div>

          <div
            style="
              background-color: var(--primary-light);
              padding: 14px 16px;
              border-radius: var(--radius-md);
              border: 1px solid #c8e6c9;
            "
          >
            <h4
              id="track-status-title"
              style="
                color: var(--primary-dark);
                font-size: 14px;
                font-weight: 700;
              "
            >
              Pedido Recebido
            </h4>
            <p
              id="track-status-desc"
              style="
                font-size: 13px;
                color: var(--text-muted);
                margin-top: 4px;
                line-height: 1.4;
              "
            >
              O pedido foi registrado no sistema e os agricultores já receberam
              a lista para colheita dos itens.
            </p>
          </div>
        </div>
      </section>`;
    const placeholder = document.getElementById('rastreamento-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
