
(function() {
    const html = `<!-- Cabeçalho Principal -->
    <header class="header-main">
      <div class="header-container">
        <!-- Logotipo Feira Livre -->
        <a
          class="brand-group"
          onclick="switchView('home')"
          title="Página Inicial Feira Livre"
        >
          <img
            src="images/logo.png"
            alt="Feira Livre Logo"
            class="brand-logo-img"
            onerror="
              this.style.display = 'none';
              document.getElementById('brand-icon-fallback').style.display =
                'flex';
            "
          />
          <div
            class="brand-fallback-icon"
            id="brand-icon-fallback"
            style="display: none"
          >
            FL
          </div>
          <div class="brand-text">
            <h1>Feira Livre</h1>
            <span>Agricultura Familiar de Sergipe</span>
          </div>
        </a>

        <!-- Barra de Busca Central -->
        <div class="header-search">
          <div class="search-input-wrapper">
            <input
              type="text"
              id="global-search"
              placeholder="Buscar por alimento, categoria ou produtor..."
              oninput="handleSearchInput(this.value)"
            />
            <button class="btn-search-icon" onclick="switchView('produtos')">
              Buscar
            </button>
          </div>
        </div>

        <!-- Ações: Localização, Cadastro e Carrinho -->
        <div class="header-right">
          <button
            class="btn-nav-action"
            onclick="toggleDarkMode()"
            title="Alternar Modo Escuro"
            style="padding: 8px; min-width: 38px"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <div
            class="loc-badge"
            onclick="switchView('checkout')"
            title="Local de entrega"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <span
                style="
                  font-size: 10px;
                  color: var(--text-light);
                  display: block;
                  line-height: 1;
                "
                >Entrega em:</span
              >
              <strong id="header-delivery-loc">Aracaju - SE</strong>
            </div>
          </div>

          <button
            class="btn-nav-action"
            onclick="switchView('produtor-painel')"
          >
            Cadastrar Produto
          </button>

          <button
            class="btn-sub-client-badge"
            id="btn-client-clube-status"
            onclick="switchView('feiramais')"
          >
            Feira Livre+
          </button>

          <button class="cart-button" onclick="toggleCartDrawer()">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              />
            </svg>
            <span>Carrinho</span>
            <span class="cart-count" id="header-cart-count">0</span>
          </button>
        </div>
      </div>
    </header>`;
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
