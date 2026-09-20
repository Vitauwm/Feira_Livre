
(function() {
    const html = `<!-- Barra Superior de Status Operacional -->
    <div class="api-status-bar">
      <div class="api-badge" id="api-status-badge">
        <span class="api-dot" id="api-status-dot"></span>
        <span id="api-status-text">Conectando ao banco de dados...</span>
      </div>
    </div>`;
    const placeholder = document.getElementById('api-status-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
