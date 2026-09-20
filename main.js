// Substitua pela URL da sua implantação do Google Apps Script:
const DEFAULT_API_URL =
  "https://script.google.com/macros/s/AKfycbxd_5-ddOU0wR8X_7V9XnicwYup8o8tme85g2mDSlxKNc4c-gcWkv3CWv4IiLdz8xVN/exec";
let API_URL = DEFAULT_API_URL;
try {
  localStorage.setItem("FEIRA_LIVRE_API_URL", DEFAULT_API_URL);
} catch (e) {}

// 2. BASE DE DADOS MOCK (FALLBACK QUANDO A API NÃO ESTIVER CONFIGURADA)
const MOCK_DB = {
  categorias: [
    { id: 1, nome: "Vegetais", ativo: true },
    { id: 2, nome: "Frutas", ativo: true },
    { id: 3, nome: "Raízes", ativo: true },
    { id: 4, nome: "Folhas", ativo: true },
    { id: 5, nome: "Grãos", ativo: true },
    { id: 6, nome: "Laticínios", ativo: true },
    { id: 7, nome: "Ovos", ativo: true },
    { id: 8, nome: "Mel", ativo: true },
    { id: 9, nome: "Artesanais", ativo: true },
  ],
  produtores: [
    {
      id: 1,
      nome: "Fazenda Boa Vista",
      cidade: "São Cristóvão",
      estado: "SE",
      endereco: "Povoado Colônia Miranda, 15",
      descricao:
        "Produção familiar de hortaliças, raízes e frutas agroecológicas sem agrotóxicos.",
      certificacoes: "Produto Artesanal, Orgânico Certificado",
      praticas: "Agricultura Familiar, Manejo Sustentável, Zero Desperdício",
      avatarBg: "#E8F5E9",
      initials: "FBV",
    },
    {
      id: 2,
      nome: "Ateliê Fibra Criativa",
      cidade: "Aracaju",
      estado: "SE",
      endereco: "Praça do Artesão, 7, Atalaia",
      descricao:
        "Cestarias ecológicas e biojoias com reaproveitamento de fibras naturais de bananeira.",
      certificacoes: "Produto Artesanal",
      praticas:
        "Reaproveitamento de Materiais, Comunidade Local, Economia Circular",
      avatarBg: "#F4F9F4",
      initials: "AFC",
    },
    {
      id: 3,
      nome: "Apiário Doce Mel",
      cidade: "Estância",
      estado: "SE",
      endereco: "Rodovia SE-100, Sítio Florescer",
      descricao:
        "Preservação de abelhas nativas sem ferrão e produção de mel silvestre cru e medicinal.",
      certificacoes: "Orgânico Certificado, Manejo Agroflorestal",
      praticas:
        "Preservação de Polinizadores, Agrofloresta, Ingredientes Locais",
      avatarBg: "#FFF9E6",
      initials: "ADM",
    },
    {
      id: 4,
      nome: "Sítio Verde Vivo",
      cidade: "Itaporanga d'Ajuda",
      estado: "SE",
      endereco: "Estrada do Brejo, Km 4",
      descricao:
        "Hortaliças frescas, adubação verde e compostagem há mais de 15 anos com agricultura regenerativa.",
      certificacoes: "Orgânico Certificado",
      praticas: "Ingredientes Locais, Compostagem Orgânica, Zero Desperdício",
      avatarBg: "#E8F5E9",
      initials: "SVV",
    },
    {
      id: 5,
      nome: "Sabores da Roça",
      cidade: "São Cristóvão",
      estado: "SE",
      endereco: "Fazenda Boa Vista, 15",
      descricao:
        "Pães rústicos de fermentação natural (levain) e quitutes feitos com raízes da agricultura familiar.",
      certificacoes: "Produto Artesanal",
      praticas: "Produção Familiar, Ingredientes Locais, Comércio Justo",
      avatarBg: "#F4F9F4",
      initials: "SDR",
    },
  ],
  produtos: [
    {
      id: 1,
      nome: "Batata",
      descricao: "Batata fresca da colheita local, macia e saborosa.",
      categoria_id: 3,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 5.5,
      preco_antigo: 6.5,
      unidade: "Kg",
      estoque: 50,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      nome: "Tomate Cereja",
      descricao: "Tomate cereja doce e suculento colhido no pé.",
      categoria_id: 1,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 8.0,
      preco_antigo: 10.0,
      unidade: "Bandeja",
      estoque: 30,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      nome: "Alface Crespa",
      descricao: "Alface fresca e crocante, colhida no início da manhã.",
      categoria_id: 4,
      produtor_id: 4,
      produtor_nome: "Sítio Verde Vivo",
      preco: 2.5,
      preco_antigo: 3.5,
      unidade: "Unid",
      estoque: 40,
      organico: true,
      distancia: "Itaporanga • 6 km",
      imagem:
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      nome: "Mel Silvestre",
      descricao: "Mel puro de floradas silvestres do interior sergipano.",
      categoria_id: 8,
      produtor_id: 3,
      produtor_nome: "Apiário Doce Mel",
      preco: 25.0,
      preco_antigo: 30.0,
      unidade: "Frasco 500g",
      estoque: 15,
      organico: true,
      distancia: "Estância • 24 km",
      imagem:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      nome: "Banana da Prata",
      descricao: "Banana da prata madura no cacho, doce e fresquinha.",
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 6.5,
      preco_antigo: 7.9,
      unidade: "Kg",
      estoque: 45,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 9,
      nome: "Laranja Pêra",
      descricao: "Laranja pera doce com bastante suco, direto de Boquim.",
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 5.0,
      preco_antigo: 6.5,
      unidade: "Kg",
      estoque: 60,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 10,
      nome: "Manga Palmer",
      descricao: "Manga doce, carnuda e sem fiapos.",
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 7.5,
      preco_antigo: 9.0,
      unidade: "Kg",
      estoque: 35,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 11,
      nome: "Morango",
      descricao: "Morangos frescos e doces colhidos no ponto.",
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: "Sítio Verde Vivo",
      preco: 12.0,
      preco_antigo: 15.0,
      unidade: "Caixa",
      estoque: 25,
      organico: true,
      distancia: "Itaporanga • 6 km",
      imagem:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 13,
      nome: "Abacaxi Pérola",
      descricao: "Abacaxi doce e aromático de baixa acidez.",
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: "Sítio Verde Vivo",
      preco: 6.0,
      preco_antigo: 7.5,
      unidade: "Unid",
      estoque: 30,
      organico: true,
      distancia: "Itaporanga • 6 km",
      imagem:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 15,
      nome: "Mamão Formosa",
      descricao: "Mamão doce e macio para o dia a dia.",
      categoria_id: 2,
      produtor_id: 4,
      produtor_nome: "Sítio Verde Vivo",
      preco: 5.5,
      preco_antigo: 7.0,
      unidade: "Kg",
      estoque: 30,
      organico: true,
      distancia: "Itaporanga • 6 km",
      imagem:
        "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 16,
      nome: "Maçã Gala",
      descricao: "Maçã gala vermelha, crocante e doce.",
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 8.5,
      preco_antigo: 10.5,
      unidade: "Kg",
      estoque: 40,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 17,
      nome: "Limão Taiti",
      descricao: "Limão verde suculento com bastante caldo.",
      categoria_id: 2,
      produtor_id: 1,
      produtor_nome: "Fazenda Boa Vista",
      preco: 4.0,
      preco_antigo: 5.0,
      unidade: "Kg",
      estoque: 50,
      organico: true,
      distancia: "São Cristóvão • 5 km",
      imagem:
        "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop&q=80",
    },
  ],
};

// 3. ESTADO DA APLICAÇÃO
let produtos = [];
let produtores = [];
let categorias = [];
let cart = [];
let favoritos = [];
let currentUser = null;
let currentView = "home";
let currentCategoryFilter = "Todos";
let searchKeyword = "";
let appliedCouponData = null;
let deliveryAddress = "Centro, Aracaju - SE";
let shippingRate = 8.5;
let currentTrackingOrder = null;

// ============================================================================
// INICIALIZAÇÃO DO FRONTEND
// ============================================================================

document.addEventListener("DOMContentLoaded", async () => {
  loadLocalState();
  updateApiStatusIndicator();
  await carregarDadosIniciais();
  
  // Limpar e atualizar itens do carrinho com base no banco de dados mais recente
  cart = cart.filter(cartItem => {
    const p = produtos.find(p => String(p.id) === String(cartItem.id));
    if (p) {
      cartItem.nome = p.nome;
      cartItem.preco = Number(p.preco);
      cartItem.imagem = p.imagem;
      cartItem.unidade = p.unidade;
      return true;
    }
    return false;
  });
  saveLocalState();
  
  renderCategorias();
  renderProdutos();
  renderProdutores();
  updateCartUI();
  if (
    window.FeiraMaisModule &&
    typeof window.FeiraMaisModule.init === "function"
  ) {
    window.FeiraMaisModule.init();
  }
  renderMeusProdutosCadastrados();
  if (
    window.LogisticaModule &&
    typeof window.LogisticaModule.init === "function"
  ) {
    window.LogisticaModule.init();
  }
});

function updateApiStatusIndicator() {
  const badge = document.getElementById("api-status-badge");
  const dot = document.getElementById("api-status-dot");
  const text = document.getElementById("api-status-text");

  if (API_URL && API_URL.trim() !== "") {
    dot.className = "api-dot connected";
    text.innerHTML = `Banco Conectado: <strong>Google Planilhas</strong>`;
  } else {
    dot.className = "api-dot mock";
    text.innerHTML = `Modo Local (Offline)`;
  }
}

async function carregarDadosIniciais() {
  try {
    const resProd = await apiCall("produtos", "GET");
    if (resProd.success && resProd.data) {
      produtos = resProd.data;
    } else {
      produtos = MOCK_DB.produtos;
    }

    const resProdutores = await apiCall("produtores", "GET");
    if (resProdutores.success && resProdutores.data) {
      produtores = resProdutores.data;
    } else {
      produtores = MOCK_DB.produtores;
    }

    const resCat = await apiCall("categorias", "GET");
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
// CONFIGURAÇÃO DINÂMICA DA API DO APPS SCRIPT
// ============================================================================

function abrirConfigModal() {
  // Conexao direta configurada no codigo
}

function fecharConfigModal() {}
function salvarConfigApi() {}

// ============================================================================
// PERSISTÊNCIA LOCAL (LOCALSTORAGE)
// ============================================================================

function saveLocalState() {
  try {
    localStorage.setItem("FL_CART", JSON.stringify(cart));
    localStorage.setItem("FL_FAVS", JSON.stringify(favoritos));
  } catch (e) {}
}

function loadLocalState() {
  try {
    const savedCart = localStorage.getItem("FL_CART");
    if (savedCart) cart = JSON.parse(savedCart);
    const savedFavs = localStorage.getItem("FL_FAVS");
    if (savedFavs) favoritos = JSON.parse(savedFavs);
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ============================================================================
// DARK MODE
// ============================================================================
function toggleDarkMode() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("FL_DARK_MODE", isDark ? "true" : "false");
}

// Inicializa Dark Mode se estava salvo
document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("FL_DARK_MODE");
  if (savedDarkMode === "true") {
    document.body.classList.add("dark-theme");
  }
});
