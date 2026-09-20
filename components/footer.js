
(function() {
    const html = `<!-- Rodapé Institucional -->
    <footer class="footer-main">
      <div class="footer-inner">
        <div>
          <div
            style="
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
            "
          >
            <img
              src="images/logo.png"
              alt="Feira Livre Logo"
              style="
                width: 28px;
                height: 28px;
                object-fit: contain;
                border-radius: 3px;
              "
            />
            <h3
              style="
                margin: 0;
                font-size: 14px;
                font-weight: 700;
                color: var(--text-main);
              "
            >
              Feira Livre
            </h3>
          </div>
          <p>
            Comércio direto e justo da agricultura familiar de Sergipe. Gestão
            em tempo real integrada à planilha da cooperativa.
          </p>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>
            <li>
              <a onclick="switchView('home')" style="cursor: pointer">Início</a>
            </li>
            <li>
              <a onclick="switchView('produtos')" style="cursor: pointer"
                >Catálogo de Alimentos</a
              >
            </li>
            <li>
              <a onclick="switchView('produtores')" style="cursor: pointer"
                >Produtores Cooperados</a
              >
            </li>
            <li>
              <a onclick="switchView('rastreamento')" style="cursor: pointer"
                >Acompanhar Pedido</a
              >
            </li>
            <li>
              <a onclick="switchView('feiramais')" style="cursor: pointer"
                >Feira Livre+</a
              >
            </li>
            <li>
              <a onclick="switchView('logistica')" style="cursor: pointer"
                >Logística e Rotas</a
              >
            </li>
            <li>
              <a onclick="switchView('sobre')" style="cursor: pointer"
                >Sobre o Projeto</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4>Atendimento</h4>
          <p>
            São Cristóvão e Aracaju — SE<br />
            Horário de Entregas: Terças e Sextas-feiras<br />
            Contato: atendimento@feiralivre.org.br
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Feira Livre Sergipe — Todos os direitos reservados.</span>
        <span>Agricultura Familiar e Agroecologia</span>
      </div>
    </footer>`;
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
