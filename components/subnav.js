
(function() {
    const html = `<!-- Subnav de Seções Principais -->
    <nav class="subnav-bar">
      <div class="subnav-container">
        <ul class="nav-links">
          <li
            class="nav-item active"
            data-view="home"
            onclick="switchView('home')"
          >
            Início
          </li>
          <li
            class="nav-item"
            data-view="produtos"
            onclick="switchView('produtos')"
          >
            Catálogo de Produtos
          </li>
          <li
            class="nav-item"
            data-view="produtores"
            onclick="switchView('produtores')"
          >
            Produtores Parceiros
          </li>
          <li
            class="nav-item"
            data-view="rastreamento"
            onclick="switchView('rastreamento')"
          >
            Acompanhar Pedido
          </li>
          <li
            class="nav-item"
            data-view="produtor-painel"
            onclick="switchView('produtor-painel')"
          >
            Área do Produtor
          </li>
          <li
            class="nav-item"
            data-view="feiramais"
            onclick="switchView('feiramais')"
          >
            Feira Livre+
          </li>
          <li
            class="nav-item"
            data-view="logistica"
            onclick="switchView('logistica')"
          >
            Logística e Rotas
          </li>
          <li class="nav-item" data-view="sobre" onclick="switchView('sobre')">
            Sobre o Projeto
          </li>
        </ul>
      </div>
    </nav>`;
    const placeholder = document.getElementById('subnav-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
