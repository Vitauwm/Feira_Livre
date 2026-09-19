
function matchProductCategory(p, filterName) {
  if (!filterName || filterName === 'Todos') return true;

  // 1. Matching direto por ID de categoria (o mais confiável e padrão)
  const target = categorias.find(c => String(c.nome).toLowerCase().trim() === filterName.toLowerCase().trim());
  if (target && String(p.categoria_id || '').trim() === String(target.id || '').trim()) {
    return true;
  }

  // 2. Matching por nome direto se houver campo categoria
  if (p.categoria && String(p.categoria).toLowerCase().trim() === filterName.toLowerCase().trim()) {
    return true;
  }

  // 3. Fallback inteligente se categoria_id estiver ausente
  if (!p.categoria_id) {
    const nome = (p.nome || '').toLowerCase();
    if (filterName === 'Frutas') {
      return ['banana', 'laranja', 'manga', 'morango', 'melancia', 'abacaxi', 'maracujá', 'maracuja', 'mamão', 'mamao', 'maçã', 'limão', 'limao'].some(f => nome.includes(f)) && !nome.includes('macaxeira');
    }
    if (filterName === 'Vegetais') {
      return ['tomate', 'cenoura', 'abóbora', 'abobora', 'chuchu', 'pepino'].some(v => nome.includes(v));
    }
    if (filterName === 'Raízes') {
      return ['batata', 'macaxeira', 'mandioca', 'inhame', 'beterraba'].some(r => nome.includes(r));
    }
    if (filterName === 'Folhas') {
      return ['alface', 'couve', 'rúcula'].some(fl => nome.includes(fl));
    }
    if (filterName === 'Mel') {
      return (nome.includes('mel') || nome.includes('própolis')) && !nome.includes('melancia');
    }
    if (filterName === 'Artesanais') {
      return ['pão', 'cesta', 'artesanato'].some(a => nome.includes(a));
    }
  }

  return false;
}


// Helper robusto para garantir imagens da web de alta qualidade em frutas e produtos
function getProductImage(p) {
  if (!p) return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80';
  if (p.imagem && p.imagem !== 'url' && p.imagem.startsWith('http')) {
    return p.imagem;
  }
  const nome = (p.nome || '').toLowerCase();
  if (nome.includes('banana')) return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('laranja')) return 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('manga')) return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('morango')) return 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('melancia')) return 'https://images.unsplash.com/photo-1587049352848-4a222e784d38?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('abacaxi')) return 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('maracujá') || nome.includes('maracuja')) return 'https://images.unsplash.com/photo-1526318897995-17583a351be5?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('mamão') || nome.includes('mamao')) return 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('maçã') || nome.includes('maca')) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('limão') || nome.includes('limao')) return 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('tomate')) return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('batata roxa')) return 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('batata')) return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('macaxeira') || nome.includes('mandioca')) return 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('alface')) return 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('pão') || nome.includes('pao') || nome.includes('levain')) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('mel') || nome.includes('própolis')) return 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80';
  if (nome.includes('cenoura')) return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80';
  if (Number(p.categoria_id) === 2) return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80';
  return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80';
}

/**
 * ============================================================================
 * FEIRA LIVRE — FRONTEND CLIENT COM INTEGRAÇÃO GOOGLE APPS SCRIPT / PLANILHAS
 * ============================================================================
 *
 * Conecta o frontend (HTML/CSS/JS) à API REST do Google Apps Script.
 * Caso a URL da API ainda não tenha sido configurada, o sistema utiliza
 * uma base de dados local transparente para permitir testes imediatos.
 */

// 1. CONFIGURAÇÃO CENTRAL DA URL DA API
// ============================================================================
// RENDERIZAÇÃO DE TELAS & COMPONENTES
// ============================================================================

function switchView(viewName) {
  currentView = viewName;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === viewName);
  });

  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSec = document.getElementById(`view-${viewName}`);
  if (activeSec) {
    activeSec.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Garante que o catálogo e as categorias estejam atualizados
  if (viewName === 'produtos' || viewName === 'home') {
    renderCategorias();
    renderProdutos();
  }
  if (viewName === 'produtores') {
    renderProdutores();
  }
  if (viewName === 'feiramais') {
    if (window.FeiraMaisModule && typeof window.FeiraMaisModule.init === 'function') {
      window.FeiraMaisModule.init();
    }
  }
  if (viewName === 'produtor-painel') {
    renderMeusProdutosCadastrados();
  }
  if (viewName === 'logistica') {
    if (window.LogisticaModule && typeof window.LogisticaModule.init === 'function') {
      window.LogisticaModule.init();
    }
  }
}

function renderCategorias() {
  const container = document.getElementById('categories-container');
  const filterStrip = document.getElementById('categories-filter-strip');
  const targets = [container, filterStrip].filter(Boolean);
  if (targets.length === 0) return;

  const cats = [{ id: 0, nome: 'Todos' }, ...categorias];

  const html = cats.map(cat => `
    <button class="cat-pill ${cat.nome === currentCategoryFilter ? 'active' : ''}" onclick="filtrarPorCategoria('${cat.nome}')">
      ${cat.nome}
    </button>
  `).join('');

  targets.forEach(t => t.innerHTML = html);
}

function filtrarPorCategoria(catNome) {
  currentCategoryFilter = catNome;
  renderCategorias();
  renderProdutos();

  // Ao clicar em uma categoria específica no início, exibe a tela do catálogo com os produtos
  if (currentView === 'home' && catNome !== 'Todos') {
    switchView('produtos');
  }
}

function handleSearchInput(val) {
  searchKeyword = val.toLowerCase().trim();
  renderProdutos();
  renderProdutores();
}

function renderProdutos() {
  const homeGrid = document.getElementById('catalog-products-grid');
  const allGrid = document.getElementById('all-products-grid');
  const promoGrid = document.getElementById('promo-products-grid');
  
  const targetGrids = [homeGrid, allGrid].filter(Boolean);
  if (targetGrids.length === 0) return;

  let filtrados = produtos.filter(p => {
    const matchCat = matchProductCategory(p, currentCategoryFilter);
    const matchSearch = !searchKeyword ||
      (p.nome && p.nome.toLowerCase().includes(searchKeyword)) ||
      (p.descricao && p.descricao.toLowerCase().includes(searchKeyword)) ||
      (p.produtor_nome && p.produtor_nome.toLowerCase().includes(searchKeyword));
    return matchCat && matchSearch;
  });

  const html = filtrados.length === 0 ? `
    <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #fff; border-radius: 4px; border: 1px dashed var(--border);">
      <h4 style="color: var(--text-main); font-size: 15px; margin-bottom: 4px;">Nenhum produto nesta categoria</h4>
      <p style="font-size: 13px; color: var(--text-muted);">Selecione outra categoria ou clique em 'Todos' para ver o catálogo completo.</p>
    </div>
  ` : filtrados.map(p => createProductCardHTML(p)).join('');

  targetGrids.forEach(g => {
    g.innerHTML = html;
  });

  // Seção de Ofertas Promocionais na Home
  if (promoGrid) {
    const ofertas = produtos.filter(p => p.preco_antigo && Number(p.preco_antigo) > Number(p.preco));
    promoGrid.innerHTML = ofertas.map(p => createProductCardHTML(p)).join('');
  }
}

function createProductCardHTML(p) {
  const cartItem = cart.find(i => String(i.id) === String(p.id));
  const qty = cartItem ? cartItem.quantidade : 0;
  const isFav = favoritos.includes(String(p.id));
  const hasPromo = p.preco_antigo && Number(p.preco_antigo) > Number(p.preco);

  return `
    <article class="product-card">
      <div class="card-img">
        <img src="${getProductImage(p)}" alt="${p.nome}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80';">
        <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); alternarFavorito('${p.id}')" title="Salvar favorito">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="${isFav ? '#B91C1C' : 'none'}" stroke="${isFav ? '#B91C1C' : 'currentColor'}" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        ${p.organico ? '<span class="badge-tag badge-organic">Orgânico</span>' : ''}
        ${hasPromo ? '<span class="badge-tag badge-promo" style="top: 30px;">Oferta</span>' : ''}
        <span class="badge-distance">${p.distancia || 'Sergipe'}</span>
      </div>

      <div class="card-body">
        <span class="card-cat">Categoria</span>
        <h4 class="card-title">${p.nome}</h4>
        <p class="card-producer">Produtor: <strong>${p.produtor_nome || 'Agricultura Familiar'}</strong></p>
        
        <div class="card-pricing">
          <span class="price-cur">R$ ${Number(p.preco).toFixed(2).replace('.', ',')}</span>
          <span class="price-unit">/${p.unidade || 'Kg'}</span>
          ${hasPromo ? `<span class="price-old">R$ ${Number(p.preco_antigo).toFixed(2).replace('.', ',')}</span>` : ''}
        </div>
      </div>

      <div class="card-action-bar" onclick="event.stopPropagation()">
        ${qty === 0 ? `
          <button class="btn-add-item" onclick="alterarQtdCarrinho('${p.id}', 1)">
            + Adicionar
          </button>
        ` : `
          <div class="qty-pill">
            <button onclick="alterarQtdCarrinho('${p.id}', -1)" title="Diminuir">-</button>
            <span>${qty} ${p.unidade || ''}</span>
            <button onclick="alterarQtdCarrinho('${p.id}', 1)" title="Aumentar">+</button>
          </div>
        `}
      </div>
    </article>
  `;
}

function renderProdutores() {
  const grid = document.getElementById('producers-grid');
  const allGrid = document.getElementById('all-producers-view-grid');
  const targets = [grid, allGrid].filter(Boolean);
  if (targets.length === 0) return;

  const filtrados = produtores.filter(pr => {
    return !searchKeyword ||
      pr.nome.toLowerCase().includes(searchKeyword) ||
      pr.cidade.toLowerCase().includes(searchKeyword) ||
      (pr.descricao && pr.descricao.toLowerCase().includes(searchKeyword));
  });

  const html = filtrados.map(pr => {
    const praticas = pr.praticas ? pr.praticas.split(',') : [];
    const certs = pr.certificacoes ? pr.certificacoes.split(',') : [];

    return `
      <div class="producer-card">
        <div>
          <div class="producer-head">
            <div class="producer-avatar" style="background-color: ${pr.avatarBg || '#EDF4EE'}">
              ${pr.initials || pr.nome.substring(0, 2).toUpperCase()}
            </div>
            <div class="producer-meta">
              <h4>${pr.nome}</h4>
              <span>${pr.cidade} - ${pr.estado || 'SE'}</span>
            </div>
          </div>

          <p class="producer-bio">${pr.descricao || 'Propriedade familiar dedicada ao cultivo agroecológico e manejo regenerativo do solo.'}</p>

          <div class="tag-list">
            ${praticas.map(p => `<span class="tag-eco">${p.trim()}</span>`).join('')}
            ${certs.map(c => `<span class="tag-yellow">${c.trim()}</span>`).join('')}
          </div>
        </div>

        <button class="btn-producer-view" onclick="verProdutosProdutor('${pr.id}')">
          Ver Catálogo do Produtor
        </button>
      </div>
    `;
  }).join('');

  targets.forEach(t => t.innerHTML = html);
}

function verProdutosProdutor(produtorId) {
  const pList = produtos.filter(p => String(p.produtor_id) === String(produtorId));
  currentCategoryFilter = 'Todos';
  switchView('produtos');
  const grid = document.getElementById('catalog-products-grid');
  if (grid) {
    grid.innerHTML = pList.map(p => createProductCardHTML(p)).join('');
  }
}

// ============================================================================
// PAINEL DO PRODUTOR (CADASTRAR PRODUTO DIRETO NA PLANILHA)
// ============================================================================

async function salvarNovoProduto(e) {
  e.preventDefault();

  const nome = document.getElementById('adm-prod-name').value.trim();
  const preco = parseFloat(document.getElementById('adm-prod-price').value);
  const unidade = document.getElementById('adm-prod-unit').value;
  const categoriaId = document.getElementById('adm-prod-cat').value;
  const produtorId = document.getElementById('adm-prod-farmer').value;


  const organico = document.getElementById('adm-prod-organic').checked;
  const estoque = parseInt(document.getElementById('adm-prod-stock').value, 10);
  const desc = document.getElementById('adm-prod-desc').value.trim();

  if (!nome || isNaN(preco)) {
    showToast('Preencha os campos obrigatórios!');
    return;
  }

  showToast('Gravando produto na aba Produtos da planilha...');

  const payload = {
    nome: nome,
    descricao: desc,
    categoria_id: categoriaId,
    produtor_id: produtorId,
    preco: preco,
    unidade: unidade,
    estoque: estoque,
    organico: organico,
    imagem: `https://dummyimage.com/600x400/4CAF50/FFFFFF&text=${encodeURIComponent(nome)}`
  };

  const res = await apiCall('adicionarProduto', 'POST', payload);

  if (res.success) {
    showToast(`Produto "${nome}" gravado na planilha com sucesso!`);
    await carregarDadosIniciais();
    renderProdutos();
    switchView('produtos');
  } else {
    showToast(res.error || 'Erro ao cadastrar produto');
  }
}

// ============================================================================
// FAVORITOS
// ============================================================================

async function alternarFavorito(prodId) {
  const idStr = String(prodId);
  const idx = favoritos.indexOf(idStr);

  if (idx > -1) {
    favoritos.splice(idx, 1);
    showToast('Item removido dos favoritos');
    apiCall('removerFavorito', 'POST', {
      usuario_id: currentUser ? currentUser.id : 1,
      produto_id: idStr
    });
  } else {
    favoritos.push(idStr);
    showToast('Item adicionado aos favoritos');
    apiCall('favorito', 'POST', {
      usuario_id: currentUser ? currentUser.id : 1,
      produto_id: idStr
    });
  }

  saveLocalState();
  renderProdutos();
}

