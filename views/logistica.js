
(function() {
    const html = `<!-- VIEW 8: LOGÍSTICA & ROTEIRIZAÇÃO INTELIGENTE -->
      <section id="view-logistica" class="view-section">
        <!-- Cabeçalho do Módulo de Logística -->
        <div class="logistics-header-bar">
          <div class="logistics-header-info">
            <div class="logistics-badge-demo">
              Demonstração de Logística Agroecológica
            </div>
            <h2>Roteirização Inteligente de Entregas</h2>
            <p>
              Otimização de rotas com agrupamento geográfico, cálculo de carga e
              sequência de entregas para a agricultura familiar de Sergipe.
            </p>
          </div>

          <div class="logistics-top-actions">
            <button
              class="btn-simulate-route"
              id="btn-run-simulation"
              onclick="LogisticaModule.simularRoteirizacao()"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Simular Roteirização Inteligente</span>
            </button>
          </div>
        </div>

        <!-- Barra de Configuração Operacional (Ponto de Partida e Veículo) -->
        <div class="logistics-config-bar">
          <div class="logistics-config-item">
            <label>Ponto de Partida (Produtor / Origem):</label>
            <select
              id="log-farm-origin"
              onchange="LogisticaModule.alterarOrigem(this.value)"
            >
              <option value="1">
                Fazenda Boa Vista (São Cristóvão • Rod. João Bebe Água)
              </option>
              <option value="4">
                Sítio Verde Vivo (Itaporanga d'Ajuda • Povoado Sapé)
              </option>
              <option value="5">
                Sabores da Roça (São Cristóvão • Centro Histórico)
              </option>
              <option value="ceasa">
                Ponto de Coleta Central (Ceasa • Aracaju)
              </option>
            </select>
          </div>

          <div class="logistics-config-item">
            <label>Veículo de Entrega (Capacidade Máxima):</label>
            <select
              id="log-vehicle-type"
              onchange="LogisticaModule.alterarVeiculo(this.value)"
            >
              <option value="50">
                Moto-Furgão / Baú (Capacidade máx: 50 kg)
              </option>
              <option value="120" selected>
                Carro Utilitário / Fiorino (Capacidade máx: 120 kg)
              </option>
              <option value="250">
                Picape da Cooperativa (Capacidade máx: 250 kg)
              </option>
            </select>
          </div>

          <div class="logistics-config-item">
            <label>Filtro de Visualização:</label>
            <select
              id="log-status-filter"
              onchange="LogisticaModule.filtrarPorStatus(this.value)"
            >
              <option value="todos">Todos os Status</option>
              <option value="Pendente">Apenas Pendentes</option>
              <option value="Em rota">Apenas Em Rota</option>
              <option value="Entregue">Apenas Entregues</option>
            </select>
          </div>
        </div>

        <!-- Barra de Feedback da Simulação / Processamento -->
        <div
          class="logistics-sim-feedback"
          id="log-sim-feedback"
          style="display: none"
        >
          <span class="sim-pulse-dot"></span>
          <span id="log-sim-text">Processando dados logísticos...</span>
        </div>

        <!-- Layout Principal: Painel de Controle e Mapa -->
        <div class="logistics-layout-grid">
          <!-- COLUNA ESQUERDA: PAINEL DE CONTROLE LOGÍSTICO -->
          <div class="logistics-sidebar-panel">
            <!-- Resumo Geral de Métricas (KPIs) -->
            <div class="logistics-kpi-card">
              <h4>Resumo da Operação do Dia</h4>
              <div class="kpi-grid">
                <div class="kpi-item">
                  <span class="kpi-lbl">Entregas</span>
                  <strong class="kpi-val" id="kpi-total-orders">18</strong>
                </div>
                <div class="kpi-item">
                  <span class="kpi-lbl">Rotas Ativas</span>
                  <strong class="kpi-val" id="kpi-total-routes">3</strong>
                </div>
                <div class="kpi-item">
                  <span class="kpi-lbl">Peso Total</span>
                  <strong class="kpi-val" id="kpi-total-weight">72,4 kg</strong>
                </div>
                <div class="kpi-item">
                  <span class="kpi-lbl">Distância Total</span>
                  <strong class="kpi-val" id="kpi-total-distance"
                    >41,6 km</strong
                  >
                </div>
                <div class="kpi-item">
                  <span class="kpi-lbl">Tempo Estimado</span>
                  <strong class="kpi-val" id="kpi-total-time">3h 10min</strong>
                </div>
                <div class="kpi-item">
                  <span class="kpi-lbl">Valor da Carga</span>
                  <strong class="kpi-val" id="kpi-total-value"
                    >R$ 1.120,40</strong
                  >
                </div>
              </div>

              <!-- Barra de Ocupação de Carga do Veículo -->
              <div class="vehicle-load-bar-wrap">
                <div class="load-bar-labels">
                  <span>Ocupação do Veículo (Rota Ativa)</span>
                  <strong id="kpi-load-percentage">68%</strong>
                </div>
                <div class="load-bar-track">
                  <div
                    class="load-bar-fill"
                    id="kpi-load-bar"
                    style="width: 68%"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Seletor de Rotas Agrupadas -->
            <div class="logistics-routes-selector">
              <h4>Rotas Sugeridas por Proximidade</h4>
              <div class="routes-tab-list" id="log-routes-list">
                <!-- Renderizado dinamicamente via JS -->
              </div>
            </div>

            <!-- Detalhes da Rota Selecionada & Ações -->
            <div class="selected-route-card" id="log-selected-route-card">
              <div class="selected-route-header">
                <div>
                  <h3 id="sel-route-title">Rota 1 — Zona Sul</h3>
                  <span id="sel-route-meta"
                    >6 entregas • 24,5 kg • 15,2 km estimados</span
                  >
                </div>
                <div class="selected-route-actions">
                  <button
                    class="btn-route-action"
                    id="btn-start-route"
                    onclick="LogisticaModule.iniciarRotaAtual()"
                  >
                    Iniciar Rota
                  </button>
                  <button
                    class="btn-open-gmaps"
                    id="btn-open-gmaps"
                    onclick="LogisticaModule.abrirNoGoogleMaps()"
                    title="Abrir navegação curva a curva no aplicativo do Google Maps"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                      />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Abrir no Google Maps</span>
                  </button>
                </div>
              </div>

              <!-- Painel de Metricas da Rota Real (Google Maps Directions) -->
              <div class="route-metrics-bar">
                <div class="route-metric-pill">
                  <small>Distancia Total</small>
                  <strong id="sel-route-real-dist">Calculando rota...</strong>
                </div>
                <div class="route-metric-pill">
                  <small>Tempo Estimado</small>
                  <strong id="sel-route-real-time">Calculando tempo...</strong>
                </div>
                <div class="route-metric-pill">
                  <small>Total de Paradas</small>
                  <strong id="sel-route-real-stops">5 paradas</strong>
                </div>
              </div>

              <!-- Alerta detalhado de status da API de Roteirizacao -->
              <div
                id="sel-route-error-banner"
                class="route-error-banner"
                style="display: none"
              >
                <strong id="sel-route-error-title">Erro da API:</strong>
                <div id="sel-route-error-msg">
                  Nao foi possivel calcular a rota.
                </div>
              </div>

              <!-- Lista Sequencial de Paradas da Rota Otimizada -->
              <div class="stops-sequence-container">
                <div class="stops-list-head">
                  <span>Sequência Otimizada de Entregas</span>
                  <small id="stops-count-text">6 paradas</small>
                </div>

                <!-- Ponto de Partida -->
                <div class="stop-item-farm" id="stop-farm-origin-info">
                  <div class="stop-badge-farm">Partida</div>
                  <div class="stop-info-content">
                    <strong id="farm-origin-name"
                      >Fazenda Boa Vista (São Cristóvão)</strong
                    >
                    <p>Saída programada: 08:00 • Carga conferida</p>
                  </div>
                </div>

                <!-- Lista de Paradas -->
                <div class="stops-list" id="log-stops-list">
                  <!-- Renderizado dinamicamente via JS -->
                </div>
              </div>
            </div>
          </div>

          <!-- COLUNA DIREITA: MAPA INTERATIVO & NAVEGAÇÃO -->
          <div class="logistics-map-wrapper">
            <!-- Barra de Controles Flutuantes do Mapa -->
            <div class="map-controls-overlay">
              <div class="map-mode-indicator" id="map-engine-indicator">
                <span class="engine-dot" id="engine-dot"></span>
                <span id="engine-text">Carregando Mapa...</span>
              </div>

              <div class="map-view-actions">
                <button
                  class="btn-map-control"
                  onclick="LogisticaModule.recentralizarMapa()"
                  title="Enquadrar todas as paradas da rota"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                  </svg>
                  <span>Centralizar Rota</span>
                </button>

                <button
                  class="btn-map-control"
                  onclick="LogisticaModule.toggleModoDemonstracao()"
                  title="Alternar entre Dados de Demonstração e Modo Produção"
                >
                  <span>Modo Demonstração</span>
                </button>
              </div>
            </div>

            <!-- Container do Google Maps ou Motor SVG/Canvas de Fallback -->
            <div id="logistics-map-canvas" class="logistics-map-canvas">
              <!-- Google Maps renderiza aqui ou SVG fallback -->
            </div>

            <!-- Legenda de Cores de Rota -->
            <div class="map-legend-bar">
              <div class="legend-item">
                <span
                  class="legend-color"
                  style="background-color: #2563eb"
                ></span
                ><span>Rota 1: Zona Sul</span>
              </div>
              <div class="legend-item">
                <span
                  class="legend-color"
                  style="background-color: #16a34a"
                ></span
                ><span>Rota 2: Centro</span>
              </div>
              <div class="legend-item">
                <span
                  class="legend-color"
                  style="background-color: #d97706"
                ></span
                ><span>Rota 3: Zona Norte</span>
              </div>
              <div class="legend-item">
                <span class="legend-pin-farm"></span
                ><span>Origem do Produtor</span>
              </div>
            </div>

            <!-- Card Flutuante de Detalhes da Parada (Ao clicar no marcador) -->
            <div
              class="map-stop-infocard"
              id="map-stop-infocard"
              style="display: none"
            >
              <div class="infocard-header">
                <div>
                  <span class="infocard-stop-num" id="info-stop-num"
                    >Parada 01</span
                  >
                  <strong class="infocard-client" id="info-client"
                    >Maria Oliveira</strong
                  >
                </div>
                <button
                  class="infocard-close"
                  onclick="LogisticaModule.fecharInfoCard()"
                >
                  &times;
                </button>
              </div>
              <div class="infocard-body">
                <p class="infocard-addr" id="info-addr">
                  Av. Santos Dumont, Atalaia • Aracaju
                </p>
                <div class="infocard-tags">
                  <span class="infotag" id="info-weight">4,2 kg</span>
                  <span class="infotag" id="info-value">R$ 48,90</span>
                  <span class="infotag" id="info-window"
                    >Janela: 08:30 - 10:00</span
                  >
                  <span class="infotag-status" id="info-status">Pendente</span>
                </div>
                <div class="infocard-products">
                  <span class="infocard-prod-title">Itens do Pedido:</span>
                  <p id="info-products">
                    Banana da Prata (2kg), Alface Crespa (1 un), Tomate Cereja
                    (1 band)
                  </p>
                </div>
              </div>
              <div class="infocard-actions">
                <button
                  class="btn-infocard-action"
                  id="btn-info-action"
                  onclick="LogisticaModule.avancarStatusParadaSelecionada()"
                >
                  Marcar como Entregue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>`;
    const placeholder = document.getElementById('logistica-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
