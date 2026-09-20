
(function() {
    const html = `<!-- VIEW 3: PRODUTORES -->
      <section id="view-produtores" class="view-section">
        <div class="section-head">
          <div>
            <h2>Produtores e Artesãos Parceiros</h2>
            <p>
              Conheça as famílias agricultoras de São Cristóvão, Aracaju,
              Itabaiana e Estância
            </p>
          </div>
        </div>
        <div class="producers-grid" id="all-producers-view-grid">
          <!-- Renderizado via JS -->
        </div>
      </section>`;
    const placeholder = document.getElementById('produtores-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
