
(function() {
    const html = `<!-- VIEW: FEIRA LIVRE+ (ASSINATURA EXCLUSIVA PARA CLIENTES) -->
      <section id="view-feiramais" class="view-section">
        <div class="feiramais-hero">
          <span class="feiramais-pill">Clube de Beneficios para Clientes</span>
          <h2>Feira Livre+</h2>
          <p class="feiramais-subtitle">
            Mais vantagens para comprar de produtores locais.
          </p>
          <p class="feiramais-desc">
            Assine o Feira Livre+ para economizar com frete gratis, cupons
            exclusivos e apoiar diretamente a agricultura familiar de Sergipe.
          </p>
        </div>

        <!-- Comparativo Simples: Plano Gratuito vs Feira Livre+ -->
        <div class="feiramais-compare-grid">
          <!-- Plano Gratuito -->
          <div class="feiramais-card">
            <div class="feiramais-card-top">
              <h3>Gratuito</h3>
              <p>Para quem compra esporadicamente na feira.</p>
            </div>
            <div class="feiramais-price-box">
              <span class="currency">R$</span>
              <span class="amount">0</span>
              <span class="period">/mes</span>
            </div>
            <ul class="feiramais-benefits-list">
              <li>
                <span class="check-dot">P</span
                ><span>Comprar normalmente na plataforma</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Acompanhar pedidos em tempo real</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Salvar produtores favoritos</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Avaliar pedidos e produtos</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Receber ofertas gerais</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Utilizar cupons padrao</span>
              </li>
              <li class="disabled">
                <span class="check-dot">-</span
                ><span>Frete gratis em pedidos acima de R$ 50,00</span>
              </li>
              <li class="disabled">
                <span class="check-dot">-</span
                ><span>Cupom exclusivo de 10% OFF (FEIRAMAIS10)</span>
              </li>
              <li class="disabled">
                <span class="check-dot">-</span
                ><span>Ofertas e colheitas antecipadas</span>
              </li>
            </ul>
            <div class="feiramais-card-footer">
              <span class="plan-current-tag" id="tag-plano-gratuito-ativo"
                >Plano Padrao</span
              >
            </div>
          </div>

          <!-- Feira Livre+ -->
          <div class="feiramais-card featured">
            <span class="feiramais-badge-featured">Mais Vantajoso</span>
            <div class="feiramais-card-top">
              <h3>Feira Livre+</h3>
              <p>Economia garantida para quem valoriza comida de verdade.</p>
            </div>
            <div class="feiramais-price-box featured">
              <span class="currency">R$</span>
              <span class="amount" id="fl-price-display">9,90</span>
              <span class="period">/mes</span>
            </div>
            <ul class="feiramais-benefits-list">
              <li>
                <span class="check-dot">P</span
                ><span
                  ><strong
                    >Frete gratis em pedidos a partir de R$ 50,00</strong
                  ></span
                >
              </li>
              <li>
                <span class="check-dot">P</span
                ><span
                  ><strong
                    >Cupom exclusivo de 10% OFF (FEIRAMAIS10)</strong
                  ></span
                >
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Descontos especiais em alimentos sazonais</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Ofertas e colheitas antecipadas da semana</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Apoio direto aos pequenos produtores rurais</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Painel de acompanhamento da economia gerada</span>
              </li>
              <li>
                <span class="check-dot">P</span
                ><span>Sem fidelidade: cancele a qualquer momento</span>
              </li>
            </ul>
            <div class="feiramais-card-footer">
              <button
                class="btn-feiramais-cta"
                id="btn-cta-feiramais"
                onclick="FeiraMaisModule.iniciarCheckout()"
              >
                Assinar Feira Livre+
              </button>
            </div>
          </div>
        </div>

        <!-- Dashboard de Assinatura e Economia do Cliente -->
        <div class="feiramais-dashboard-area">
          <!-- Cartão de Minha Assinatura (Cliente) -->
          <div class="client-sub-box">
            <div class="client-sub-header">
              <div>
                <h3 id="cli-sub-title">Minha Assinatura</h3>
                <p id="cli-sub-subtitle">Plano atual de compras</p>
              </div>
              <div>
                <span class="sub-badge ativa" id="cli-sub-status-badge"
                  >Gratuita</span
                >
              </div>
            </div>

            <!-- Alerta de Cancelamento se houver -->
            <div
              id="cli-sub-alert"
              class="sub-alert-box warning"
              style="display: none"
            ></div>

            <div class="client-sub-grid">
              <div class="client-sub-item">
                <small>Plano Atual</small>
                <strong id="cli-sub-plano-nome">Gratuito</strong>
              </div>
              <div class="client-sub-item">
                <small>Valor Mensal</small>
                <strong id="cli-sub-valor">R$ 0,00</strong>
              </div>
              <div class="client-sub-item">
                <small>Proxima Cobranca</small>
                <strong id="cli-sub-proxima-data">-</strong>
              </div>
              <div class="client-sub-item">
                <small>Data de Inicio</small>
                <strong id="cli-sub-inicio-data">-</strong>
              </div>
            </div>

            <div class="sub-actions-bar" id="cli-sub-actions-bar">
              <button
                class="btn-sub-action primary"
                id="btn-cli-assinar-toggle"
                onclick="FeiraMaisModule.iniciarCheckout()"
              >
                Assinar Feira Livre+
              </button>
              <button
                class="btn-sub-action danger"
                id="btn-cli-cancelar-sub"
                onclick="FeiraMaisModule.abrirModalCancelar()"
                style="display: none"
              >
                Cancelar Assinatura
              </button>
              <button
                class="btn-sub-action primary"
                id="btn-cli-reativar-sub"
                onclick="FeiraMaisModule.reativarAssinatura()"
                style="display: none"
              >
                Reativar Assinatura
              </button>
            </div>
          </div>

          <!-- Painel: Economia com Feira Livre+ -->
          <div class="economy-stats-card">
            <h3>Economia com Feira Livre+</h3>
            <p>
              Valores economizados em fretes gratis e cupons exclusivos desde o
              inicio da sua assinatura.
            </p>

            <div class="economy-grid">
              <div class="economy-box">
                <small>Economia Este Mes</small>
                <strong id="eco-mes-val">R$ 24,00</strong>
              </div>
              <div class="economy-box">
                <small>Economia Acumulada</small>
                <strong id="eco-total-val">R$ 87,50</strong>
              </div>
              <div class="economy-box cost">
                <small>Valor da Assinatura</small>
                <strong id="eco-custo-val">R$ 9,90</strong>
              </div>
              <div class="economy-box net">
                <small>Economia Liquida</small>
                <strong id="eco-liquida-val">R$ 77,60</strong>
              </div>
            </div>
          </div>

          <!-- Histórico de Pagamentos de Assinatura do Cliente -->
          <div class="sub-invoices-card">
            <h4>Historico de Mensalidades Feira Livre+</h4>
            <div class="invoices-table-wrap">
              <table class="invoices-table">
                <thead>
                  <tr>
                    <th>Fatura</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Metodo</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="client-sub-invoices-tbody">
                  <!-- Preenchido via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>`;
    const placeholder = document.getElementById('feiramais-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
