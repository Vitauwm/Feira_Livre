
(function() {
    const html = `<!-- VIEW 6: ÁREA DO PRODUTOR (100% LIVRE E GRATUITA) -->
      <section id="view-produtor-painel" class="view-section">
        <div class="producer-panel-wrap">
          <!-- Cabeçalho do Produtor -->
          <div class="producer-header-selector">
            <div class="producer-header-info">
              <h2>Area do Produtor &mdash; Agricultura Familiar</h2>
              <p>
                Cadastre seus alimentos agroecologicos, gerencie estoque e
                prepare pedidos para entrega direta aos consumidores de Sergipe.
              </p>
            </div>
            <div class="producer-selector-control">
              <label for="sel-active-producer">Produtor:</label>
              <select
                id="sel-active-producer"
                onchange="selecionarProdutorPainel(this.value)"
              >
                <option value="1">Fazenda Boa Vista (Sao Cristovao)</option>
                <option value="2">Atelie Fibra Criativa (Aracaju)</option>
                <option value="3">Apiario Doce Mel (Estancia)</option>
                <option value="4">Sitio Verde Vivo (Itaporanga)</option>
                <option value="5">Sabores da Roca (Sao Cristovao)</option>
              </select>
            </div>
          </div>

          <!-- Formulário de Cadastro de Alimento (Sem limite de cota) -->
          <div class="form-box" style="margin-bottom: 24px">
            <h3>Cadastrar Alimento no Catalogo</h3>
            <p
              style="
                font-size: 13px;
                color: var(--text-muted);
                margin-bottom: 16px;
                line-height: 1.5;
              "
            >
              Inclusao imediata de colheitas e produtos no catalogo da
              cooperativa. Acesso livre para todos os agricultores parceiros.
            </p>
            <form onsubmit="salvarNovoProduto(event)" id="form-novo-produto">
              <div class="form-grid">
                <div class="form-group full">
                  <label>Nome do Alimento</label>
                  <input
                    type="text"
                    id="adm-prod-name"
                    required
                    placeholder="Ex: Manga Palmer Agroecologica"
                  />
                </div>
                <div class="form-group">
                  <label>Preco Unitario (R$)</label>
                  <input
                    type="number"
                    step="0.10"
                    id="adm-prod-price"
                    required
                    placeholder="7.50"
                  />
                </div>
                <div class="form-group">
                  <label>Unidade de Medida</label>
                  <select id="adm-prod-unit">
                    <option value="Kg">Kg</option>
                    <option value="Unid">Unidade</option>
                    <option value="Bandeja">Bandeja</option>
                    <option value="Pote 500g">Pote 500g</option>
                    <option value="Maco">Maco</option>
                    <option value="Duzia">Duzia</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Categoria</label>
                  <select id="adm-prod-cat">
                    <option value="1">Vegetais</option>
                    <option value="2">Frutas</option>
                    <option value="3">Raizes</option>
                    <option value="4">Folhas</option>
                    <option value="5">Graos</option>
                    <option value="6">Laticinios</option>
                    <option value="7">Ovos</option>
                    <option value="8">Mel</option>
                    <option value="9">Artesanais</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Produtor Responsavel</label>
                  <select id="adm-prod-farmer">
                    <option value="1">Fazenda Boa Vista (Sao Cristovao)</option>
                    <option value="2">Atelie Fibra Criativa (Aracaju)</option>
                    <option value="3">Apiario Doce Mel (Estancia)</option>
                    <option value="4">Sitio Verde Vivo (Itaporanga)</option>
                    <option value="5">Sabores da Roca (Sao Cristovao)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Estoque Inicial</label>
                  <input type="number" id="adm-prod-stock" value="40" />
                </div>
                <div class="form-group form-group-checkbox">
                  <label class="checkbox-label" for="adm-prod-organic">
                    <input type="checkbox" id="adm-prod-organic" checked />
                    <span>Cultivo Organico / Agroecologico</span>
                  </label>
                </div>
                <div class="form-group full">
                  <label>Descricao do Cultivo</label>
                  <textarea
                    id="adm-prod-desc"
                    rows="2"
                    placeholder="Descreva os cuidados na colheita e caracteristicas do produto..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                class="btn-submit-form"
                id="btn-submit-produto"
              >
                Salvar Alimento no Catalogo
              </button>
            </form>
          </div>

          <!-- Tabela de Alimentos Cadastrados do Produtor -->
          <div class="sub-invoices-card">
            <h4>Meus Alimentos no Catalogo</h4>
            <div class="invoices-table-wrap">
              <table class="invoices-table">
                <thead>
                  <tr>
                    <th>Alimento</th>
                    <th>Categoria</th>
                    <th>Preco</th>
                    <th>Estoque</th>
                    <th>Cultivo</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="producer-products-tbody">
                  <!-- Preenchido dinamicamente via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>`;
    const placeholder = document.getElementById('produtor-painel-placeholder');
    if (placeholder) {
        placeholder.outerHTML = html;
    }
})();
