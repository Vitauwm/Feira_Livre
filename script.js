
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
// Substitua pela URL da sua implantação do Google Apps Script:
const DEFAULT_API_URL = 'https://script.google.com/macros/s/AKfycbxd_5-ddOU0wR8X_7V9XnicwYup8o8tme85g2mDSlxKNc4c-gcWkv3CWv4IiLdz8xVN/exec';
let API_URL = localStorage.getItem('FEIRA_LIVRE_API_URL') || DEFAULT_API_URL;

// 2. BASE DE DADOS MOCK (FALLBACK QUANDO A API NÃO ESTIVER CONFIGURADA)
const MOCK_DB = {
  categorias: [
    { id: 1, nome: 'Vegetais', ativo: true },
    { id: 2, nome: 'Frutas', ativo: true },
    { id: 3, nome: 'Raízes', ativo: true },
    { id: 4, nome: 'Folhas', ativo: true },
    { id: 5, nome: 'Grãos', ativo: true },
    { id: 6, nome: 'Laticínios', ativo: true },
    { id: 7, nome: 'Ovos', ativo: true },
    { id: 8, nome: 'Mel', ativo: true },
    { id: 9, nome: 'Artesanais', ativo: true }
  ],
  produtores: [
    {
      id: 1,
      nome: 'Fazenda Boa Vista',
      cidade: 'São Cristóvão',
      estado: 'SE',
      endereco: 'Povoado Colônia Miranda, 15',
      descricao: 'Produção familiar de hortaliças, raízes e frutas agroecológicas sem agrotóxicos.',
      certificacoes: 'Produto Artesanal, Orgânico Certificado',
      praticas: 'Agricultura Familiar, Manejo Sustentável, Zero Desperdício',
      avatarBg: '#E8F5E9',
      initials: 'FBV'
    },
    {
      id: 2,
      nome: 'Ateliê Fibra Criativa',
      cidade: 'Aracaju',
      estado: 'SE',
      endereco: 'Praça do Artesão, 7, Atalaia',
      descricao: 'Cestarias ecológicas e biojoias com reaproveitamento de fibras naturais de bananeira.',
      certificacoes: 'Produto Artesanal',
      praticas: 'Reaproveitamento de Materiais, Comunidade Local, Economia Circular',
      avatarBg: '#F4F9F4',
      initials: 'AFC'
    },
    {
      id: 3,
      nome: 'Apiário Doce Mel',
      cidade: 'Estância',
      estado: 'SE',
      endereco: 'Rodovia SE-100, Sítio Florescer',
      descricao: 'Preservação de abelhas nativas sem ferrão e produção de mel silvestre cru e medicinal.',
      certificacoes: 'Orgânico Certificado, Manejo Agroflorestal',
      praticas: 'Preservação de Polinizadores, Agrofloresta, Ingredientes Locais',
      avatarBg: '#FFF9E6',
      initials: 'ADM'
    },
    {
      id: 4,
      nome: 'Sítio Verde Vivo',
      cidade: 'Itaporanga d\'Ajuda',
      estado: 'SE',
      endereco: 'Estrada do Brejo, Km 4',
      descricao: 'Hortaliças frescas, adubação verde e compostagem há mais de 15 anos com agricultura regenerativa.',
      certificacoes: 'Orgânico Certificado',
      praticas: 'Ingredientes Locais, Compostagem Orgânica, Zero Desperdício',
      avatarBg: '#E8F5E9',
      initials: 'SVV'
    },
    {
      id: 5,
      nome: 'Sabores da Roça',
      cidade: 'São Cristóvão',
      estado: 'SE',
      endereco: 'Fazenda Boa Vista, 15',
      descricao: 'Pães rústicos de fermentação natural (levain) e quitutes feitos com raízes da agricultura familiar.',
      certificacoes: 'Produto Artesanal',
      praticas: 'Produção Familiar, Ingredientes Locais, Comércio Justo',
      avatarBg: '#F4F9F4',
      initials: 'SDR'
    }
  ],
        produtos: [
    {
      id: 1,
      nome: 'Batata',
      descricao: 'Batata fresca da colheita local, macia e saborosa.',
      categoria_id: 3,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 5.50,
      preco_antigo: 6.50,
      unidade: 'Kg',
      estoque: 50,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      nome: 'Tomate Cereja',
      descricao: 'Tomate cereja doce e suculento colhido no pé.',
      categoria_id: 1,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 8.00,
      preco_antigo: 10.00,
      unidade: 'Bandeja',
      estoque: 30,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      nome: 'Alface Crespa',
      descricao: 'Alface fresca e crocante, colhida no início da manhã.',
      categoria_id: 4,
      produtor_id: 4,
      produtor_nome: 'Sítio Verde Vivo',
      preco: 2.50,
      preco_antigo: 3.50,
      unidade: 'Unid',
      estoque: 40,
      organico: true,
      distancia: 'Itaporanga • 6 km',
      imagem: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      nome: 'Mel Silvestre',
      descricao: 'Mel puro de floradas silvestres do interior sergipano.',
      categoria_id: 8,
      produtor_id: 3,
      produtor_nome: 'Apiário Doce Mel',
      preco: 25.00,
      preco_antigo: 30.00,
      unidade: 'Frasco 500g',
      estoque: 15,
      organico: true,
      distancia: 'Estância • 24 km',
      imagem: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 8,
      nome: 'Banana da Prata',
      descricao: 'Banana da prata madura no cacho, doce e fresquinha.',
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 6.50,
      preco_antigo: 7.90,
      unidade: 'Kg',
      estoque: 45,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 9,
      nome: 'Laranja Pêra',
      descricao: 'Laranja pera doce com bastante suco, direto de Boquim.',
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 5.00,
      preco_antigo: 6.50,
      unidade: 'Kg',
      estoque: 60,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 10,
      nome: 'Manga Palmer',
      descricao: 'Manga doce, carnuda e sem fiapos.',
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 7.50,
      preco_antigo: 9.00,
      unidade: 'Kg',
      estoque: 35,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 11,
      nome: 'Morango',
      descricao: 'Morangos frescos e doces colhidos no ponto.',
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: 'Sítio Verde Vivo',
      preco: 12.00,
      preco_antigo: 15.00,
      unidade: 'Caixa',
      estoque: 25,
      organico: true,
      distancia: 'Itaporanga • 6 km',
      imagem: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 13,
      nome: 'Abacaxi Pérola',
      descricao: 'Abacaxi doce e aromático de baixa acidez.',
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: 'Sítio Verde Vivo',
      preco: 6.00,
      preco_antigo: 7.50,
      unidade: 'Unid',
      estoque: 30,
      organico: true,
      distancia: 'Itaporanga • 6 km',
      imagem: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 15,
      nome: 'Mamão Formosa',
      descricao: 'Mamão doce e macio para o dia a dia.',
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: 'Sítio Verde Vivo',
      preco: 5.50,
      preco_antigo: 7.00,
      unidade: 'Kg',
      estoque: 30,
      organico: true,
      distancia: 'Itaporanga • 6 km',
      imagem: 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 16,
      nome: 'Maçã Gala',
      descricao: 'Maçã gala vermelha, crocante e doce.',
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 8.50,
      preco_antigo: 10.50,
      unidade: 'Kg',
      estoque: 40,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 17,
      nome: 'Limão Taiti',
      descricao: 'Limão verde suculento com bastante caldo.',
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: 'Fazenda Boa Vista',
      preco: 4.00,
      preco_antigo: 5.00,
      unidade: 'Kg',
      estoque: 50,
      organico: true,
      distancia: 'São Cristóvão • 5 km',
      imagem: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop&q=80'
    }
  ]
};

// 3. ESTADO DA APLICAÇÃO
let produtos = [];
let produtores = [];
let categorias = [];
let cart = [];
let favoritos = [];
let currentUser = null;
let currentView = 'home';
let currentCategoryFilter = 'Todos';
let searchKeyword = '';
let appliedCouponData = null;
let deliveryAddress = 'Centro, Aracaju - SE';
let shippingRate = 8.50;
let currentTrackingOrder = null;

// ============================================================================
// CLIENTE HTTP (FETCH COM SUPORTE A CORS DO GOOGLE APPS SCRIPT)
// ============================================================================

async function apiCall(action, method = 'GET', data = null) {
  // Se não houver API configurada, utiliza simulação local
  if (!API_URL || API_URL.trim() === '') {
    return localMockHandler(action, method, data);
  }

  try {
    let url = `${API_URL}?action=${encodeURIComponent(action)}`;
    let options = {
      method: method,
      mode: 'cors'
    };

    if (method === 'GET' && data) {
      const qs = new URLSearchParams(data).toString();
      url += `&${qs}`;
    } else if (method === 'POST') {
      // Importante para Google Apps Script: envio como text/plain evita bloqueio de preflight CORS
      options.headers = {
        'Content-Type': 'text/plain;charset=utf-8'
      };
      options.body = JSON.stringify(data || {});
    }

    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('Erro ao conectar ao Apps Script. Alternando para modo local:', err);
    showToast('Falha na conexão com o banco na nuvem. Operando em modo offline.');
    return localMockHandler(action, method, data);
  }
}

/**
 * Fallback para executar todas as operações caso a planilha ainda não esteja vinculada
 */
function localMockHandler(action, method, data) {
  if (method === 'GET') {
    if (action === 'produtos') return { success: true, data: produtos.length ? produtos : MOCK_DB.produtos };
    if (action === 'produtores') return { success: true, data: produtores.length ? produtores : MOCK_DB.produtores };
    if (action === 'categorias') return { success: true, data: MOCK_DB.categorias };
    if (action === 'validarCupom') {
      if (data && String(data.codigo).toUpperCase() === 'FEIRA10') {
        const sub = parseFloat(data.subtotal || 0);
        return { success: true, data: { valido: true, codigo: 'FEIRA10', tipo: 'percentual', desconto_calculado: Number((sub * 0.10).toFixed(2)) } };
      }
      return { success: false, error: 'Cupom inválido. Tente FEIRA10.' };
    }
  } else if (method === 'POST') {
    if (action === 'criarPedido') {
      const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
      const id = 'FL-' + Math.floor(100000 + Math.random() * 900000);
      return { success: true, data: { pedido_id: id, total: subtotal + shippingRate - desc, status: 'recebido' } };
    }
    if (action === 'adicionarProduto') {
      const id = Date.now();
      const novo = Object.assign({ id }, data);
      produtos.unshift(novo);
      return { success: true, data: novo };
    }
  }
  return { success: true, data: {} };
}

// ============================================================================
// INICIALIZAÇÃO DO FRONTEND
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  loadLocalState();
  updateApiStatusIndicator();
  await carregarDadosIniciais();
  renderCategorias();
  renderProdutos();
  renderProdutores();
  updateCartUI();
});

function updateApiStatusIndicator() {
  const badge = document.getElementById('api-status-badge');
  const dot = document.getElementById('api-status-dot');
  const text = document.getElementById('api-status-text');

  if (API_URL && API_URL.trim() !== '') {
    dot.className = 'api-dot connected';
    text.innerHTML = `Banco Conectado: <strong>Google Planilhas</strong>`;
  } else {
    dot.className = 'api-dot mock';
    text.innerHTML = `Modo Local (Offline)`;
  }
}

async function carregarDadosIniciais() {
  try {
    const resProd = await apiCall('produtos', 'GET');
    if (resProd.success && resProd.data) {
      produtos = resProd.data;
    } else {
      produtos = MOCK_DB.produtos;
    }

    const resProdutores = await apiCall('produtores', 'GET');
    if (resProdutores.success && resProdutores.data) {
      produtores = resProdutores.data;
    } else {
      produtores = MOCK_DB.produtores;
    }

    const resCat = await apiCall('categorias', 'GET');
    if (resCat.success && resCat.data) {
      categorias = resCat.data;
    } else {
      categorias = MOCK_DB.categorias;
    }
  } catch (e) {
    produtos = MOCK_DB.produtos;
    produtores = MOCK_DB.produtores;
    categorias = MOCK_DB.categorias;
  }
}

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
// CARRINHO & REGRAS DE CHECKOUT
// ============================================================================

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.toggle('active');
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('active');
}

function alterarQtdCarrinho(prodId, delta) {
  const prod = produtos.find(p => String(p.id) === String(prodId));
  if (!prod) return;

  const itemIdx = cart.findIndex(i => String(i.id) === String(prodId));

  if (itemIdx > -1) {
    cart[itemIdx].quantidade += delta;
    if (cart[itemIdx].quantidade <= 0) {
      cart.splice(itemIdx, 1);
    }
  } else if (delta > 0) {
    cart.push({
      id: prod.id,
      nome: prod.nome,
      preco: Number(prod.preco),
      unidade: prod.unidade,
      imagem: prod.imagem,
      produtor_id: prod.produtor_id,
      quantidade: delta
    });
  }

  saveLocalState();
  updateCartUI();
  renderProdutos();
  renderCartDrawer();
}

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.quantidade, 0);
  const badge = document.getElementById('header-cart-count');
  if (badge) badge.textContent = count;
}

function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: #666;">
        <span style="font-size: 40px; display: block; margin-bottom: 8px;">🧺</span>
        <h4>Seu carrinho está vazio</h4>
        <p style="font-size: 13px;">Adicione produtos frescos dos agricultores locais!</p>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  body.innerHTML = cart.map(item => `
    <div class="cart-row">
      <img src="${getProductImage(item)}" alt="${item.nome}" onerror="this.onerror=null; this.src=\'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80\';">
      <div class="cart-row-info">
        <h5>${item.nome}</h5>
        <span>R$ ${item.preco.toFixed(2).replace('.', ',')} / ${item.unidade}</span>
        <div class="cart-row-price">Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="qty-pill" style="padding: 2px;">
        <button onclick="alterarQtdCarrinho('${item.id}', -1)">-</button>
        <span style="width: 24px; text-align: center;">${item.quantidade}</span>
        <button onclick="alterarQtdCarrinho('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');

  updateCartCalculations();
}

function updateCartCalculations() {
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  let desconto = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  const total = Math.max(0, subtotal + shippingRate - desconto);

  document.getElementById('cart-subtotal-val').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('cart-shipping-val').textContent = `R$ ${shippingRate.toFixed(2).replace('.', ',')}`;

  const descLine = document.getElementById('cart-discount-line');
  if (desconto > 0) {
    descLine.style.display = 'flex';
    document.getElementById('cart-discount-val').textContent = `- R$ ${desconto.toFixed(2).replace('.', ',')}`;
  } else {
    descLine.style.display = 'none';
  }

  document.getElementById('cart-total-val').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

async function aplicarCupom() {
  const input = document.getElementById('coupon-input');
  if (!input || !input.value.trim()) return;

  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const res = await apiCall('validarCupom', 'GET', {
    codigo: input.value.trim(),
    subtotal: subtotal
  });

  if (res.success && res.data && res.data.valido) {
    appliedCouponData = res.data;
    showToast(`Cupom ${res.data.codigo} aplicado com sucesso!`);
    updateCartCalculations();
  } else {
    appliedCouponData = null;
    showToast(res.error || 'Cupom inválido ou expirado');
    updateCartCalculations();
  }
}

// ============================================================================
// CHECKOUT & CRIAÇÃO DE PEDIDO NO GOOGLE SHEETS
// ============================================================================

function irParaCheckout() {
  if (cart.length === 0) {
    showToast('Adicione produtos antes de ir para o checkout!');
    return;
  }
  closeCartDrawer();
  switchView('checkout');

  // Preenche valores na tela de checkout
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  const total = Math.max(0, subtotal + shippingRate - desc);

  document.getElementById('chk-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-shipping').textContent = `R$ ${shippingRate.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-discount').textContent = `- R$ ${desc.toFixed(2).replace('.', ',')}`;
  document.getElementById('chk-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

async function consultarCepViaCep(cepValor) {
  const cep = String(cepValor).replace(/\D/g, '');
  if (cep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      document.getElementById('chk-rua').value = data.logradouro || '';
      document.getElementById('chk-bairro').value = data.bairro || '';
      document.getElementById('chk-cidade').value = data.localidade || 'Aracaju';
      document.getElementById('chk-estado').value = data.uf || 'SE';

      deliveryAddress = `${data.logradouro || ''}, ${data.bairro || ''} - ${data.localidade}/${data.uf}`;
      document.getElementById('header-delivery-loc').textContent = `${data.localidade || 'Aracaju'} - ${data.uf || 'SE'}`;
      showToast(`Endereço preenchido via API: ${data.localidade}/${data.uf}`);
    }
  } catch (e) {
    console.log('Falha ViaCEP:', e);
  }
}

async function submeterPedido(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast('O carrinho está vazio!');
    return;
  }

  const nome = document.getElementById('chk-nome').value.trim();
  const rua = document.getElementById('chk-rua').value.trim();
  const cidade = document.getElementById('chk-cidade').value.trim();
  const pagamento = document.getElementById('chk-pagamento').value;

  if (!nome || !rua || !cidade) {
    showToast('Por favor, preencha os campos obrigatórios de entrega.');
    return;
  }

  showToast('Enviando pedido para a planilha do Google...');

  const pedidoPayload = {
    usuario_id: currentUser ? currentUser.id : 1,
    endereco: `${rua}, ${document.getElementById('chk-numero').value || 'S/N'} - ${document.getElementById('chk-bairro').value}`,
    cidade: cidade,
    estado: document.getElementById('chk-estado').value || 'SE',
    entrega: shippingRate,
    cupom: appliedCouponData ? appliedCouponData.codigo : '',
    pagamento: pagamento,
    itens: cart.map(i => ({
      produto_id: i.id,
      quantidade: i.quantidade
    }))
  };

  const res = await apiCall('criarPedido', 'POST', pedidoPayload);

  if (res.success && res.data) {
    const orderId = res.data.pedido_id;
    currentTrackingOrder = {
      id: orderId,
      status: 'recebido',
      total: res.data.total
    };

    // Limpa carrinho e estado
    cart = [];
    appliedCouponData = null;
    saveLocalState();
    updateCartUI();

    showToast(`Pedido ${orderId} registrado com sucesso no Google Sheets!`);
    configurarTelaRastreamento(orderId);
    switchView('rastreamento');
  } else {
    showToast(res.error || 'Erro ao processar o pedido no servidor');
  }
}

// ============================================================================
// RASTREAMENTO DO PEDIDO
// ============================================================================

function configurarTelaRastreamento(orderId) {
  document.getElementById('track-order-number').textContent = `Pedido #${orderId}`;
  atualizarTimeline(1);
}

function atualizarTimeline(estagio) {
  const steps = [
    { num: 1, key: 'recebido', label: 'Pedido Confirmado', desc: 'O pedido foi registrado no sistema e enviado aos agricultores cooperados.' },
    { num: 2, key: 'preparacao', label: 'Em Separação', desc: 'Os agricultores estão colhendo e embalando os alimentos frescos.' },
    { num: 3, key: 'caminho', label: 'Em Trânsito', desc: 'Veículo em rota de distribuição para o endereço informado.' },
    { num: 4, key: 'entregue', label: 'Entregue', desc: 'Pedido entregue com sucesso no destino.' }
  ];

  for (let i = 1; i <= 4; i++) {
    const sEl = document.getElementById(`track-s-${i}`);
    const bEl = document.getElementById(`track-b-${i}`);
    if (sEl) {
      sEl.classList.toggle('active', i === estagio);
      sEl.classList.toggle('completed', i < estagio);
    }
    if (bEl) {
      bEl.classList.toggle('completed', i < estagio);
    }
  }

  const step = steps[estagio - 1] || steps[0];
  const titleEl = document.getElementById('track-status-title');
  const descEl = document.getElementById('track-status-desc');
  if (titleEl) titleEl.textContent = step.label;
  if (descEl) descEl.textContent = step.desc;
}

async function simularAvancoStatus() {
  if (!currentTrackingOrder) return;

  const statusSeq = ['recebido', 'preparacao', 'caminho', 'entregue'];
  const curIdx = statusSeq.indexOf(currentTrackingOrder.status);
  const nextStatus = statusSeq[(curIdx + 1) % statusSeq.length];

  currentTrackingOrder.status = nextStatus;
  const stageNum = statusSeq.indexOf(nextStatus) + 1;
  atualizarTimeline(stageNum);

  // Notifica o backend da atualização de status
  await apiCall('atualizarStatusPedido', 'POST', {
    id: currentTrackingOrder.id,
    status: nextStatus
  });

  showToast(`Status atualizado para: ${nextStatus.toUpperCase()} no Google Sheets`);
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

// ============================================================================
// CONFIGURAÇÃO DINÂMICA DA API DO APPS SCRIPT
// ============================================================================

function abrirConfigModal() {
  const modal = document.getElementById('api-config-modal');
  const input = document.getElementById('api-url-input');
  if (input) input.value = API_URL;
  if (modal) modal.classList.add('active');
}

function fecharConfigModal() {
  const modal = document.getElementById('api-config-modal');
  if (modal) modal.classList.remove('active');
}

function salvarConfigApi() {
  const input = document.getElementById('api-url-input');
  if (!input) return;
  API_URL = input.value.trim();
  localStorage.setItem('FEIRA_LIVRE_API_URL', API_URL);
  fecharConfigModal();
  updateApiStatusIndicator();
  showToast('URL da API salva com sucesso! Recarregando dados da planilha...');
  carregarDadosIniciais().then(() => {
    renderProdutos();
    renderProdutores();
  });
}

// ============================================================================
// PERSISTÊNCIA LOCAL (LOCALSTORAGE)
// ============================================================================

function saveLocalState() {
  try {
    localStorage.setItem('FL_CART', JSON.stringify(cart));
    localStorage.setItem('FL_FAVS', JSON.stringify(favoritos));
  } catch (e) {}
}

function loadLocalState() {
  try {
    const savedCart = localStorage.getItem('FL_CART');
    if (savedCart) cart = JSON.parse(savedCart);
    const savedFavs = localStorage.getItem('FL_FAVS');
    if (savedFavs) favoritos = JSON.parse(savedFavs);
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
