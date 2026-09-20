
(function() {
    const html = `<!-- VIEW 1: HOME -->
      <section id="view-home" class="view-section active">
        <!-- Comunicado Institucional da Cooperativa -->
        <div class="hero-box">
          <span class="hero-tag">Cooperativa Agroecológica de Sergipe</span>
          <h2>
            Alimentos frescos colhidos diretamente pelos produtores locais
          </h2>
          <p>
            Hortifruti, frutas de época, raízes, mel e pães artesanais
            cultivados sem agrotóxicos em São Cristóvão, Itabaiana, Boquim e
            Estância. Entregas programadas para Aracaju e região metropolitana.
          </p>
          <div class="hero-buttons">
            <button class="btn-hero" onclick="switchView('produtos')">
              Ver Catálogo da Semana
            </button>
            <button class="btn-hero-outline" onclick="switchView('produtores')">
              Conhecer as Propriedades
            </button>
          </div>
        </div>

        <!-- Atalhos de Categorias -->
        <div class="section-head">
          <h3>Categorias</h3>
          <button class="section-link" onclick="switchView('produtos')">
            Ver todos
          </button>
        </div>
        <div class="categories-strip" id="categories-container">
          <!-- Renderizado via JS -->
        </div>

        <!-- Ofertas da Semana -->
        <div class="section-head">
          <div>
            <h3>Ofertas da Colheita</h3>
            <p>Itens da época com preços especiais direto do produtor</p>
          </div>
        </div>
        <div class="products-grid" id="promo-products-grid">
          <!-- Renderizado via JS -->
        </div>

        <!-- Produtos em Destaque -->
        <div class="section-head">
          <div>
            <h3>Produtos em Destaque</h3>
            <p>
              Alimentos frescos e artesanais certificados da colheita recente
            </p>
          </div>
          <button class="section-link" onclick="switchView('produtos')">
            Ver catálogo completo
          </button>
        </div>
        <div class="products-grid" id="catalog-products-grid">
          <!-- Renderizado via JS -->
        </div>

        <!-- Produtores em Destaque -->
        <div class="section-head">
          <div>
            <h3>Produtores Cooperados</h3>
            <p>
              Propriedades familiares com práticas de manejo sustentável e
              agroflorestal
            </p>
          </div>
          <button class="section-link" onclick="switchView('produtores')">
            Ver todos os produtores
          </button>
        </div>
        <div class="producers-grid" id="producers-grid">
          <!-- Renderizado via JS -->
        </div>
      </section>`;
    const placeholder = document.getElementById('home-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
