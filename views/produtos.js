
(function() {
    const html = `<!-- VIEW 2: PRODUTOS (CATÁLOGO GERAL) -->
      <section id="view-produtos" class="view-section">
        <div class="section-head">
          <div>
            <h2>Catálogo de Produtos da Feira</h2>
            <p>
              Alimentos agroecológicos e itens artesanais com garantia de
              procedência local
            </p>
          </div>
        </div>
        <div class="categories-strip" id="categories-filter-strip">
          <!-- Mesmas categorias compartilhadas -->
        </div>
        <div class="products-grid" id="all-products-grid">
          <!-- Renderizado via JS -->
        </div>
      </section>`;
    const placeholder = document.getElementById('produtos-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
