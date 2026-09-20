
(function() {
    const html = `<!-- VIEW 7: SOBRE -->
      <section id="view-sobre" class="view-section">
        <div class="form-box" style="max-width: 760px">
          <h3>Sobre a Feira Livre</h3>
          <p
            style="
              font-size: 13px;
              line-height: 1.6;
              color: var(--text-muted);
              margin-bottom: 12px;
            "
          >
            O projeto Feira Livre é uma plataforma voltada à valorização da
            agricultura familiar e ao consumo consciente no estado de Sergipe.
          </p>
          <p
            style="
              font-size: 13px;
              line-height: 1.6;
              color: var(--text-muted);
              margin-bottom: 12px;
            "
          >
            Conectamos cooperativas e pequenas propriedades agrícolas de São
            Cristóvão, Itabaiana, Boquim e Estância diretamente aos moradores de
            Aracaju e região metropolitana, eliminando intermediários e
            promovendo preços justos para quem planta e para quem consome.
          </p>
          <p
            style="font-size: 13px; line-height: 1.6; color: var(--text-muted)"
          >
            A plataforma utiliza uma integração com Google Planilhas via Google
            Apps Script, viabilizando controle de estoque e pedidos sem custos
            adicionais de infraestrutura para os produtores parceiros.
          </p>
        </div>
      </section>`;
    const placeholder = document.getElementById('sobre-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
