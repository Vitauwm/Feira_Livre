function matchProductCategory(p, filterName) {
  if (!filterName || filterName === "Todos") return true;

  // 1. Matching direto por ID de categoria (o mais confiável e padrão)
  const target = categorias.find(
    (c) =>
      String(c.nome).toLowerCase().trim() === filterName.toLowerCase().trim(),
  );
  if (
    target &&
    String(p.categoria_id || "").trim() === String(target.id || "").trim()
  ) {
    return true;
  }

  // 2. Matching por nome direto se houver campo categoria
  if (
    p.categoria &&
    String(p.categoria).toLowerCase().trim() === filterName.toLowerCase().trim()
  ) {
    return true;
  }

  // 3. Fallback inteligente se categoria_id estiver ausente
  if (!p.categoria_id) {
    const nome = (p.nome || "").toLowerCase();
    if (filterName === "Frutas") {
      return (
        [
          "banana",
          "laranja",
          "manga",
          "morango",
          "melancia",
          "abacaxi",
          "maracujá",
          "maracuja",
          "mamão",
          "mamao",
          "maçã",
          "limão",
          "limao",
        ].some((f) => nome.includes(f)) && !nome.includes("macaxeira")
      );
    }
    if (filterName === "Vegetais") {
      return [
        "tomate",
        "cenoura",
        "abóbora",
        "abobora",
        "chuchu",
        "pepino",
      ].some((v) => nome.includes(v));
    }
    if (filterName === "Raízes") {
      return ["batata", "macaxeira", "mandioca", "inhame", "beterraba"].some(
        (r) => nome.includes(r),
      );
    }
    if (filterName === "Folhas") {
      return ["alface", "couve", "rúcula"].some((fl) => nome.includes(fl));
    }
    if (filterName === "Mel") {
      return (
        (nome.includes("mel") || nome.includes("própolis")) &&
        !nome.includes("melancia")
      );
    }
    if (filterName === "Artesanais") {
      return ["pão", "cesta", "artesanato"].some((a) => nome.includes(a));
    }
  }

  return false;
}

// Helper robusto para garantir imagens da web de alta qualidade em frutas e produtos
function getProductImage(p) {
  if (!p)
    return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80";
  if (p.imagem && p.imagem !== "url" && p.imagem.startsWith("http")) {
    return p.imagem;
  }
  const nome = (p.nome || "").toLowerCase();
  if (nome.includes("banana"))
    return "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("laranja"))
    return "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("manga"))
    return "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("morango"))
    return "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("melancia"))
    return "https://images.unsplash.com/photo-1587049352848-4a222e784d38?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("abacaxi"))
    return "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("maracujá") || nome.includes("maracuja"))
    return "https://images.unsplash.com/photo-1526318897995-17583a351be5?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("mamão") || nome.includes("mamao"))
    return "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("maçã") || nome.includes("maca"))
    return "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("limão") || nome.includes("limao"))
    return "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("tomate"))
    return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("batata roxa"))
    return "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("batata"))
    return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("macaxeira") || nome.includes("mandioca"))
    return "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("alface"))
    return "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("pão") || nome.includes("pao") || nome.includes("levain"))
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("mel") || nome.includes("própolis"))
    return "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80";
  if (nome.includes("cenoura"))
    return "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80";
  if (Number(p.categoria_id) === 2)
    return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80";
  return "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80";
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
// CLIENTE HTTP (FETCH COM SUPORTE A CORS DO GOOGLE APPS SCRIPT)
// ============================================================================

async function apiCall(action, method = "GET", data = null) {
  // Se não houver API configurada, utiliza simulação local
  if (!API_URL || API_URL.trim() === "") {
    return localMockHandler(action, method, data);
  }

  try {
    let url = `${API_URL}?action=${encodeURIComponent(action)}`;
    let options = {
      method: method,
      mode: "cors",
    };

    if (method === "GET" && data) {
      const qs = new URLSearchParams(data).toString();
      url += `&${qs}`;
    } else if (method === "POST") {
      // Importante para Google Apps Script: envio como text/plain evita bloqueio de preflight CORS
      options.headers = {
        "Content-Type": "text/plain;charset=utf-8",
      };
      options.body = JSON.stringify(data || {});
    }

    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn(
      "Erro ao conectar ao Apps Script. Alternando para modo local:",
      err,
    );
    showToast(
      "Falha na conexão com o banco na nuvem. Operando em modo offline.",
    );
    return localMockHandler(action, method, data);
  }
}

/**
 * Fallback para executar todas as operações caso a planilha ainda não esteja vinculada
 */
function localMockHandler(action, method, data) {
  if (method === "GET") {
    if (action === "produtos")
      return {
        success: true,
        data: produtos.length ? produtos : MOCK_DB.produtos,
      };
    if (action === "produtores")
      return {
        success: true,
        data: produtores.length ? produtores : MOCK_DB.produtores,
      };
    if (action === "categorias")
      return { success: true, data: MOCK_DB.categorias };

    if (action === "planoCliente") {
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.getConfig()
          : { precoMensal: 9.9, pedidoMinimoFreteGratis: 50.0 },
      };
    }
    if (action === "assinaturaCliente") {
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.verificarAssinaturaCliente()
          : { isAssinante: false, status: "gratuita" },
      };
    }
    if (action === "beneficiosCliente") {
      const sub = parseFloat(data ? data.subtotal : 0);
      return {
        success: true,
        data: window.FeiraMaisModule
          ? window.FeiraMaisModule.calcularBeneficiosCarrinho(sub)
          : {},
      };
    }
    if (action === "historicoPagamentos") {
      return { success: true, data: [] };
    }
    if (action === "validarCupom") {
      const cod = String(data ? data.codigo : "")
        .toUpperCase()
        .trim();
      const sub = parseFloat(data && data.subtotal ? data.subtotal : 0);

      if (cod === "FEIRAMAIS10") {
        const check = window.FeiraMaisModule
          ? window.FeiraMaisModule.validarCupomExclusivo(cod)
          : null;
        if (check && !check.valido) {
          return { success: false, error: check.mensagem };
        }
        return {
          success: true,
          data: {
            valido: true,
            codigo: "FEIRAMAIS10",
            tipo: "percentual",
            desconto_calculado: Number((sub * 0.1).toFixed(2)),
          },
        };
      }
      if (cod === "FEIRA10") {
        return {
          success: true,
          data: {
            valido: true,
            codigo: "FEIRA10",
            tipo: "percentual",
            desconto_calculado: Number((sub * 0.1).toFixed(2)),
          },
        };
      }
      return { success: false, error: "Cupom invalido. Tente FEIRA10." };
    }
  } else if (method === "POST") {
    if (action === "criarPedido") {
      const subtotal = cart.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0,
      );
      const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
      let freteFinal = shippingRate;
      if (window.FeiraMaisModule) {
        const b = window.FeiraMaisModule.calcularBeneficiosCarrinho(subtotal);
        freteFinal = b.freteFinal;
        if (b.descontoFrete > 0) {
          window.FeiraMaisModule.registrarEconomiaPedido(b.descontoFrete, desc);
        }
      }
      const id = "FL-" + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        data: {
          pedido_id: id,
          total: subtotal + freteFinal - desc,
          status: "recebido",
        },
      };
    }
    if (action === "adicionarProduto") {
      const id = Date.now();
      const novo = Object.assign({ id }, data);
      produtos.unshift(novo);
      return { success: true, data: novo };
    }
    if (
      action === "criarAssinaturaCliente" ||
      action === "cancelarAssinaturaCliente" ||
      action === "reativarAssinaturaCliente" ||
      action === "registrarPagamentoCliente" ||
      action === "atualizarStatusAssinaturaCliente"
    ) {
      return {
        success: true,
        message: "Operacao concluida com sucesso (Modo Demonstracao)",
        data: data,
      };
    }
  }
  return { success: true, data: {} };
}

// ============================================================================
// INICIALIZAÇÃO DO FRONTEND
// ============================================================================

document.addEventListener("DOMContentLoaded", async () => {
  loadLocalState();
  updateApiStatusIndicator();
  await carregarDadosIniciais();
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
// RENDERIZAÇÃO DE TELAS & COMPONENTES
// ============================================================================

function switchView(viewName) {
  currentView = viewName;

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-view") === viewName,
    );
  });

  document.querySelectorAll(".view-section").forEach((sec) => {
    sec.classList.remove("active");
  });

  const activeSec = document.getElementById(`view-${viewName}`);
  if (activeSec) {
    activeSec.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Garante que o catálogo e as categorias estejam atualizados
  if (viewName === "produtos" || viewName === "home") {
    renderCategorias();
    renderProdutos();
  }
  if (viewName === "produtores") {
    renderProdutores();
  }
  if (viewName === "feiramais") {
    if (
      window.FeiraMaisModule &&
      typeof window.FeiraMaisModule.init === "function"
    ) {
      window.FeiraMaisModule.init();
    }
  }
  if (viewName === "produtor-painel") {
    renderMeusProdutosCadastrados();
  }
  if (viewName === "logistica") {
    if (
      window.LogisticaModule &&
      typeof window.LogisticaModule.init === "function"
    ) {
      window.LogisticaModule.init();
    }
  }
}

function renderCategorias() {
  const container = document.getElementById("categories-container");
  const filterStrip = document.getElementById("categories-filter-strip");
  const targets = [container, filterStrip].filter(Boolean);
  if (targets.length === 0) return;

  const cats = [{ id: 0, nome: "Todos" }, ...categorias];

  const html = cats
    .map(
      (cat) => `
    <button class="cat-pill ${cat.nome === currentCategoryFilter ? "active" : ""}" onclick="filtrarPorCategoria('${cat.nome}')">
      ${cat.nome}
    </button>
  `,
    )
    .join("");

  targets.forEach((t) => (t.innerHTML = html));
}

function filtrarPorCategoria(catNome) {
  currentCategoryFilter = catNome;
  renderCategorias();
  renderProdutos();

  // Ao clicar em uma categoria específica no início, exibe a tela do catálogo com os produtos
  if (currentView === "home" && catNome !== "Todos") {
    switchView("produtos");
  }
}

function handleSearchInput(val) {
  searchKeyword = val.toLowerCase().trim();
  renderProdutos();
  renderProdutores();
}

function renderProdutos() {
  const homeGrid = document.getElementById("catalog-products-grid");
  const allGrid = document.getElementById("all-products-grid");
  const promoGrid = document.getElementById("promo-products-grid");

  const targetGrids = [homeGrid, allGrid].filter(Boolean);
  if (targetGrids.length === 0) return;

  let filtrados = produtos.filter((p) => {
    const matchCat = matchProductCategory(p, currentCategoryFilter);
    const matchSearch =
      !searchKeyword ||
      (p.nome && p.nome.toLowerCase().includes(searchKeyword)) ||
      (p.descricao && p.descricao.toLowerCase().includes(searchKeyword)) ||
      (p.produtor_nome &&
        p.produtor_nome.toLowerCase().includes(searchKeyword));
    return matchCat && matchSearch;
  });

  const html =
    filtrados.length === 0
      ? `
    <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #fff; border-radius: 4px; border: 1px dashed var(--border);">
      <h4 style="color: var(--text-main); font-size: 15px; margin-bottom: 4px;">Nenhum produto nesta categoria</h4>
      <p style="font-size: 13px; color: var(--text-muted);">Selecione outra categoria ou clique em 'Todos' para ver o catálogo completo.</p>
    </div>
  `
      : filtrados.map((p) => createProductCardHTML(p)).join("");

  targetGrids.forEach((g) => {
    g.innerHTML = html;
  });

  // Seção de Ofertas Promocionais na Home
  if (promoGrid) {
    const ofertas = produtos.filter(
      (p) => p.preco_antigo && Number(p.preco_antigo) > Number(p.preco),
    );
    promoGrid.innerHTML = ofertas.map((p) => createProductCardHTML(p)).join("");
  }
}

function createProductCardHTML(p) {
  const cartItem = cart.find((i) => String(i.id) === String(p.id));
  const qty = cartItem ? cartItem.quantidade : 0;
  const isFav = favoritos.includes(String(p.id));
  const hasPromo = p.preco_antigo && Number(p.preco_antigo) > Number(p.preco);

  return `
    <article class="product-card">
      <div class="card-img">
        <img src="${getProductImage(p)}" alt="${p.nome}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80';">
        <button class="card-fav-btn ${isFav ? "active" : ""}" onclick="event.stopPropagation(); alternarFavorito('${p.id}')" title="Salvar favorito">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="${isFav ? "#B91C1C" : "none"}" stroke="${isFav ? "#B91C1C" : "currentColor"}" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        ${p.organico ? '<span class="badge-tag badge-organic">Orgânico</span>' : ""}
        ${hasPromo ? '<span class="badge-tag badge-promo" style="top: 30px;">Oferta</span>' : ""}
        <span class="badge-distance">${p.distancia || "Sergipe"}</span>
      </div>

      <div class="card-body">
        <span class="card-cat">Categoria</span>
        <h4 class="card-title">${p.nome}</h4>
        <p class="card-producer">Produtor: <strong>${p.produtor_nome || "Agricultura Familiar"}</strong></p>
        
        <div class="card-pricing">
          <span class="price-cur">R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</span>
          <span class="price-unit">/${p.unidade || "Kg"}</span>
          ${hasPromo ? `<span class="price-old">R$ ${Number(p.preco_antigo).toFixed(2).replace(".", ",")}</span>` : ""}
        </div>
      </div>

      <div class="card-action-bar" onclick="event.stopPropagation()">
        ${
          qty === 0
            ? `
          <button class="btn-add-item" onclick="alterarQtdCarrinho('${p.id}', 1)">
            + Adicionar
          </button>
        `
            : `
          <div class="qty-pill">
            <button onclick="alterarQtdCarrinho('${p.id}', -1)" title="Diminuir">-</button>
            <span>${qty} ${p.unidade || ""}</span>
            <button onclick="alterarQtdCarrinho('${p.id}', 1)" title="Aumentar">+</button>
          </div>
        `
        }
      </div>
    </article>
  `;
}

function renderProdutores() {
  const grid = document.getElementById("producers-grid");
  const allGrid = document.getElementById("all-producers-view-grid");
  const targets = [grid, allGrid].filter(Boolean);
  if (targets.length === 0) return;

  const filtrados = produtores.filter((pr) => {
    return (
      !searchKeyword ||
      pr.nome.toLowerCase().includes(searchKeyword) ||
      pr.cidade.toLowerCase().includes(searchKeyword) ||
      (pr.descricao && pr.descricao.toLowerCase().includes(searchKeyword))
    );
  });

  const html = filtrados
    .map((pr) => {
      const praticas = pr.praticas ? pr.praticas.split(",") : [];
      const certs = pr.certificacoes ? pr.certificacoes.split(",") : [];

      return `
      <div class="producer-card">
        <div>
          <div class="producer-head">
            <div class="producer-avatar" style="background-color: ${pr.avatarBg || "#EDF4EE"}">
              ${pr.initials || pr.nome.substring(0, 2).toUpperCase()}
            </div>
            <div class="producer-meta">
              <h4>${pr.nome}</h4>
              <span>${pr.cidade} - ${pr.estado || "SE"}</span>
            </div>
          </div>

          <p class="producer-bio">${pr.descricao || "Propriedade familiar dedicada ao cultivo agroecológico e manejo regenerativo do solo."}</p>

          <div class="tag-list">
            ${praticas.map((p) => `<span class="tag-eco">${p.trim()}</span>`).join("")}
            ${certs.map((c) => `<span class="tag-yellow">${c.trim()}</span>`).join("")}
          </div>
        </div>

        <button class="btn-producer-view" onclick="verProdutosProdutor('${pr.id}')">
          Ver Catálogo do Produtor
        </button>
      </div>
    `;
    })
    .join("");

  targets.forEach((t) => (t.innerHTML = html));
}

function verProdutosProdutor(produtorId) {
  const pList = produtos.filter(
    (p) => String(p.produtor_id) === String(produtorId),
  );
  currentCategoryFilter = "Todos";
  switchView("produtos");
  const grid = document.getElementById("catalog-products-grid");
  if (grid) {
    grid.innerHTML = pList.map((p) => createProductCardHTML(p)).join("");
  }
}

// ============================================================================
// CARRINHO & REGRAS DE CHECKOUT
// ============================================================================

function toggleCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.toggle("active");
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("active");
}

function alterarQtdCarrinho(prodId, delta) {
  const prod = produtos.find((p) => String(p.id) === String(prodId));
  if (!prod) return;

  const itemIdx = cart.findIndex((i) => String(i.id) === String(prodId));

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
      quantidade: delta,
    });
  }

  saveLocalState();
  updateCartUI();
  renderProdutos();
  renderCartDrawer();
}

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.quantidade, 0);
  const badge = document.getElementById("header-cart-count");
  if (badge) badge.textContent = count;
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: #666;">
        <span style="font-size: 40px; display: block; margin-bottom: 8px;"></span>
        <h4>Seu carrinho está vazio</h4>
        <p style="font-size: 13px;">Adicione produtos frescos dos agricultores locais!</p>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  body.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-row">
      <img src="${getProductImage(item)}" alt="${item.nome}" onerror="this.onerror=null; this.src=\'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80\';">
      <div class="cart-row-info">
        <h5>${item.nome}</h5>
        <span>R$ ${item.preco.toFixed(2).replace(".", ",")} / ${item.unidade}</span>
        <div class="cart-row-price">Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</div>
      </div>
      <div class="qty-pill" style="padding: 2px;">
        <button onclick="alterarQtdCarrinho('${item.id}', -1)">-</button>
        <span style="width: 24px; text-align: center;">${item.quantidade}</span>
        <button onclick="alterarQtdCarrinho('${item.id}', 1)">+</button>
      </div>
    </div>
  `,
    )
    .join("");

  updateCartCalculations();
}

function updateCartCalculations() {
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  let desconto = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  let freteFinal = shippingRate;
  let descontoFrete = 0;
  let isAssinante = false;

  if (window.FeiraMaisModule) {
    const ben = window.FeiraMaisModule.calcularBeneficiosCarrinho(subtotal);
    freteFinal = ben.freteFinal;
    descontoFrete = ben.descontoFrete;
    isAssinante = ben.elegivelFreteGratis;
  }

  const total = Math.max(0, subtotal + freteFinal - desconto);

  document.getElementById("cart-subtotal-val").textContent =
    `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

  const elShipping = document.getElementById("cart-shipping-val");
  if (elShipping) {
    if (descontoFrete > 0) {
      elShipping.innerHTML = `<span style="text-decoration:line-through; color:var(--text-muted); font-size:12px; margin-right:4px;">R$ 8,00</span> <strong style="color:var(--primary);">R$ 0,00 (Feira Livre+)</strong>`;
    } else {
      elShipping.textContent = `R$ ${freteFinal.toFixed(2).replace(".", ",")}`;
    }
  }

  const descLine = document.getElementById("cart-discount-line");
  if (desconto > 0) {
    descLine.style.display = "flex";
    document.getElementById("cart-discount-val").textContent =
      `- R$ ${desconto.toFixed(2).replace(".", ",")}`;
  } else {
    descLine.style.display = "none";
  }

  document.getElementById("cart-total-val").textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;
}

async function aplicarCupom() {
  const input = document.getElementById("coupon-input");
  if (!input || !input.value.trim()) return;

  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const res = await apiCall("validarCupom", "GET", {
    codigo: input.value.trim(),
    subtotal: subtotal,
  });

  if (res.success && res.data && res.data.valido) {
    appliedCouponData = res.data;
    showToast(`Cupom ${res.data.codigo} aplicado com sucesso!`);
    updateCartCalculations();
  } else {
    appliedCouponData = null;
    showToast(res.error || "Cupom inválido ou expirado");
    updateCartCalculations();
  }
}

// ============================================================================
// CHECKOUT & CRIAÇÃO DE PEDIDO NO GOOGLE SHEETS
// ============================================================================

function irParaCheckout() {
  if (cart.length === 0) {
    showToast("Adicione produtos antes de ir para o checkout!");
    return;
  }
  closeCartDrawer();
  switchView("checkout");

  // Preenche valores na tela de checkout
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const desc = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  const total = Math.max(0, subtotal + shippingRate - desc);

  document.getElementById("chk-subtotal").textContent =
    `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
  document.getElementById("chk-shipping").textContent =
    `R$ ${shippingRate.toFixed(2).replace(".", ",")}`;
  document.getElementById("chk-discount").textContent =
    `- R$ ${desc.toFixed(2).replace(".", ",")}`;
  document.getElementById("chk-total").textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;
}

async function consultarCepViaCep(cepValor) {
  const cep = String(cepValor).replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      document.getElementById("chk-rua").value = data.logradouro || "";
      document.getElementById("chk-bairro").value = data.bairro || "";
      document.getElementById("chk-cidade").value =
        data.localidade || "Aracaju";
      document.getElementById("chk-estado").value = data.uf || "SE";

      deliveryAddress = `${data.logradouro || ""}, ${data.bairro || ""} - ${data.localidade}/${data.uf}`;
      document.getElementById("header-delivery-loc").textContent =
        `${data.localidade || "Aracaju"} - ${data.uf || "SE"}`;
      showToast(`Endereço preenchido via API: ${data.localidade}/${data.uf}`);
    }
  } catch (e) {
    console.log("Falha ViaCEP:", e);
  }
}

async function submeterPedido(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("O carrinho está vazio!");
    return;
  }

  const nome = document.getElementById("chk-nome").value.trim();
  const rua = document.getElementById("chk-rua").value.trim();
  const cidade = document.getElementById("chk-cidade").value.trim();
  const pagamento = document.getElementById("chk-pagamento").value;

  if (!nome || !rua || !cidade) {
    showToast("Por favor, preencha os campos obrigatórios de entrega.");
    return;
  }

  showToast("Enviando pedido para a planilha do Google...");

  const pedidoPayload = {
    usuario_id: currentUser ? currentUser.id : 1,
    endereco: `${rua}, ${document.getElementById("chk-numero").value || "S/N"} - ${document.getElementById("chk-bairro").value}`,
    cidade: cidade,
    estado: document.getElementById("chk-estado").value || "SE",
    entrega: shippingRate,
    cupom: appliedCouponData ? appliedCouponData.codigo : "",
    pagamento: pagamento,
    itens: cart.map((i) => ({
      produto_id: i.id,
      quantidade: i.quantidade,
    })),
  };

  const res = await apiCall("criarPedido", "POST", pedidoPayload);

  if (res.success && res.data) {
    const orderId = res.data.pedido_id;
    currentTrackingOrder = {
      id: orderId,
      status: "recebido",
      total: res.data.total,
    };

    // Limpa carrinho e estado
    cart = [];
    appliedCouponData = null;
    saveLocalState();
    updateCartUI();

    showToast(`Pedido ${orderId} registrado com sucesso no Google Sheets!`);
    configurarTelaRastreamento(orderId);
    switchView("rastreamento");
  } else {
    showToast(res.error || "Erro ao processar o pedido no servidor");
  }
}

// ============================================================================
// RASTREAMENTO DO PEDIDO
// ============================================================================

function configurarTelaRastreamento(orderId) {
  document.getElementById("track-order-number").textContent =
    `Pedido #${orderId}`;
  atualizarTimeline(1);
}

function atualizarTimeline(estagio) {
  const steps = [
    {
      num: 1,
      key: "recebido",
      label: "Pedido Confirmado",
      desc: "O pedido foi registrado no sistema e enviado aos agricultores cooperados.",
    },
    {
      num: 2,
      key: "preparacao",
      label: "Em Separação",
      desc: "Os agricultores estão colhendo e embalando os alimentos frescos.",
    },
    {
      num: 3,
      key: "caminho",
      label: "Em Trânsito",
      desc: "Veículo em rota de distribuição para o endereço informado.",
    },
    {
      num: 4,
      key: "entregue",
      label: "Entregue",
      desc: "Pedido entregue com sucesso no destino.",
    },
  ];

  for (let i = 1; i <= 4; i++) {
    const sEl = document.getElementById(`track-s-${i}`);
    const bEl = document.getElementById(`track-b-${i}`);
    if (sEl) {
      sEl.classList.toggle("active", i === estagio);
      sEl.classList.toggle("completed", i < estagio);
    }
    if (bEl) {
      bEl.classList.toggle("completed", i < estagio);
    }
  }

  const step = steps[estagio - 1] || steps[0];
  const titleEl = document.getElementById("track-status-title");
  const descEl = document.getElementById("track-status-desc");
  if (titleEl) titleEl.textContent = step.label;
  if (descEl) descEl.textContent = step.desc;
}

async function simularAvancoStatus() {
  if (!currentTrackingOrder) return;

  const statusSeq = ["recebido", "preparacao", "caminho", "entregue"];
  const curIdx = statusSeq.indexOf(currentTrackingOrder.status);
  const nextStatus = statusSeq[(curIdx + 1) % statusSeq.length];

  currentTrackingOrder.status = nextStatus;
  const stageNum = statusSeq.indexOf(nextStatus) + 1;
  atualizarTimeline(stageNum);

  // Notifica o backend da atualização de status
  await apiCall("atualizarStatusPedido", "POST", {
    id: currentTrackingOrder.id,
    status: nextStatus,
  });

  showToast(
    `Status atualizado para: ${nextStatus.toUpperCase()} no Google Sheets`,
  );
}

// ============================================================================
// PAINEL DO PRODUTOR (CADASTRAR PRODUTO DIRETO NA PLANILHA)
// ============================================================================

async function salvarNovoProduto(e) {
  e.preventDefault();

  const nome = document.getElementById("adm-prod-name").value.trim();
  const preco = parseFloat(document.getElementById("adm-prod-price").value);
  const unidade = document.getElementById("adm-prod-unit").value;
  const categoriaId = document.getElementById("adm-prod-cat").value;
  const produtorId = document.getElementById("adm-prod-farmer").value;

  const organico = document.getElementById("adm-prod-organic").checked;
  const estoque = parseInt(document.getElementById("adm-prod-stock").value, 10);
  const desc = document.getElementById("adm-prod-desc").value.trim();

  if (!nome || isNaN(preco)) {
    showToast("Preencha os campos obrigatórios!");
    return;
  }

  showToast("Gravando produto na aba Produtos da planilha...");

  const payload = {
    nome: nome,
    descricao: desc,
    categoria_id: categoriaId,
    produtor_id: produtorId,
    preco: preco,
    unidade: unidade,
    estoque: estoque,
    organico: organico,
    imagem: `https://dummyimage.com/600x400/4CAF50/FFFFFF&text=${encodeURIComponent(nome)}`,
  };

  const res = await apiCall("adicionarProduto", "POST", payload);

  if (res.success) {
    showToast(`Produto "${nome}" gravado na planilha com sucesso!`);
    await carregarDadosIniciais();
    renderProdutos();
    switchView("produtos");
  } else {
    showToast(res.error || "Erro ao cadastrar produto");
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
    showToast("Item removido dos favoritos");
    apiCall("removerFavorito", "POST", {
      usuario_id: currentUser ? currentUser.id : 1,
      produto_id: idStr,
    });
  } else {
    favoritos.push(idStr);
    showToast("Item adicionado aos favoritos");
    apiCall("favorito", "POST", {
      usuario_id: currentUser ? currentUser.id : 1,
      produto_id: idStr,
    });
  }

  saveLocalState();
  renderProdutos();
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

/**
 * ============================================================================
 * FEIRA LIVRE — MÓDULO DE LOGÍSTICA & ROTEIRIZAÇÃO INTELIGENTE
 * Sistema de distribuição sustentável e agrupamento geográfico de entregas
 * ============================================================================
 *
 *  CONFIGURAÇÃO DA CHAVE DO GOOGLE MAPS API:
 * Insira sua chave de API abaixo para habilitar o Google Maps dinâmico ao vivo:
 * const GOOGLE_MAPS_API_KEY = "AIzaSyCSQTc-GrgO28IWUVKuli-p8lsmuwEB7LE";
 */
const GOOGLE_MAPS_API_KEY = "AIzaSyCSQTc-GrgO28IWUVKuli-p8lsmuwEB7LE";

// Objeto global do módulo de logística para garantir encapsulamento e manutenção
window.LogisticaModule = (function () {
  // 1. DADOS DE DEMONSTRAÇÃO — PEDIDOS EM ARACAJU E GRANDE ARACAJU (SERGIPE)
  const PEDIDOS_DEMO = [
    // --- ZONA SUL ---
    {
      id: "PED-101",
      cliente: "Maria Oliveira",
      telefone: "(79) 99876-1001",
      endereco: "Av. Santos Dumont, 1420",
      bairro: "Atalaia",
      cidade: "Aracaju",
      latitude: -10.988,
      longitude: -37.049,
      produtos: [
        "Banana da Prata (2kg)",
        "Alface Crespa (1 un)",
        "Tomate Cereja (1 band)",
      ],
      quantidade: 4,
      peso: 4.2,
      valor: 48.9,
      horarioInicio: "08:30",
      horarioFim: "10:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Sul",
    },
    {
      id: "PED-102",
      cliente: "Carlos Eduardo Santos",
      telefone: "(79) 99876-1002",
      endereco: "Rua Urbano Neto, 305",
      bairro: "Coroa do Meio",
      cidade: "Aracaju",
      latitude: -10.975,
      longitude: -37.045,
      produtos: ["Laranja Pêra (3kg)", "Mamão Formosa (1kg)"],
      quantidade: 4,
      peso: 4.0,
      valor: 35.5,
      horarioInicio: "09:00",
      horarioFim: "11:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Sul",
    },
    {
      id: "PED-103",
      cliente: "Juliana Santos Melo",
      telefone: "(79) 99876-1003",
      endereco: "Rua Muribeca, 88",
      bairro: "Farolândia",
      cidade: "Aracaju",
      latitude: -10.966,
      longitude: -37.059,
      produtos: [
        "Batata (2kg)",
        "Tomate Cereja (2 band)",
        "Mel Silvestre (1 frasco)",
      ],
      quantidade: 5,
      peso: 5.8,
      valor: 67.0,
      horarioInicio: "09:30",
      horarioFim: "11:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Sul",
    },
    {
      id: "PED-104",
      cliente: "Roberto Silva Sobral",
      telefone: "(79) 99876-1004",
      endereco: "Rodovia José Sarney, Cond. Veraneio",
      bairro: "Aruana",
      cidade: "Aracaju",
      latitude: -11.025,
      longitude: -37.072,
      produtos: [
        "Abacaxi Pérola (2 un)",
        "Manga Palmer (2kg)",
        "Limão Taiti (1kg)",
      ],
      quantidade: 5,
      peso: 6.4,
      valor: 58.5,
      horarioInicio: "10:00",
      horarioFim: "12:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Sul",
    },
    {
      id: "PED-105",
      cliente: "Patrícia Lima Dantas",
      telefone: "(79) 99876-1005",
      endereco: "Rua Dr. Celso Oliva, 210",
      bairro: "Região Central (Jardins)",
      cidade: "Aracaju",
      latitude: -10.949,
      longitude: -37.062,
      produtos: ["Morango (2 caixas)", "Maçã Gala (1kg)"],
      quantidade: 3,
      peso: 2.9,
      valor: 42.5,
      horarioInicio: "10:30",
      horarioFim: "12:30",
      status: "Pendente",
      produtorResponsavel: "Sítio Verde Vivo",
      regiao: "Centro",
    },
    {
      id: "PED-106",
      cliente: "Fernando Alves Chagas",
      telefone: "(79) 99876-1006",
      endereco: "Av. Min. Geraldo Barreto Sobral, 1100",
      bairro: "Garcia",
      cidade: "Aracaju",
      latitude: -10.943,
      longitude: -37.058,
      produtos: [
        "Banana da Prata (1kg)",
        "Laranja Pêra (2kg)",
        "Alface Crespa (2 un)",
      ],
      quantidade: 5,
      peso: 4.0,
      valor: 41.5,
      horarioInicio: "11:00",
      horarioFim: "13:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Centro",
    },

    // --- CENTRO & LESTE ---
    {
      id: "PED-201",
      cliente: "Ana Paula Costa",
      telefone: "(79) 99876-2001",
      endereco: "Rua Laranjeiras, 450",
      bairro: "Centro",
      cidade: "Aracaju",
      latitude: -10.912,
      longitude: -37.051,
      produtos: [
        "Batata (2kg)",
        "Alface Crespa (2 un)",
        "Banana da Prata (1kg)",
      ],
      quantidade: 5,
      peso: 3.5,
      valor: 38.0,
      horarioInicio: "08:30",
      horarioFim: "10:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Centro",
    },
    {
      id: "PED-202",
      cliente: "Marcos Vinícius Barreto",
      telefone: "(79) 99876-2002",
      endereco: "Av. Ivo do Prado, 612",
      bairro: "São José",
      cidade: "Aracaju",
      latitude: -10.925,
      longitude: -37.05,
      produtos: ["Mel Silvestre (2 frascos)", "Manga Palmer (2kg)"],
      quantidade: 4,
      peso: 5.0,
      valor: 75.0,
      horarioInicio: "09:00",
      horarioFim: "11:00",
      status: "Pendente",
      produtorResponsavel: "Apiário Doce Mel",
      regiao: "Centro",
    },
    {
      id: "PED-203",
      cliente: "Beatriz Mendonça Faro",
      telefone: "(79) 99876-2003",
      endereco: "Rua Estância, 780",
      bairro: "Suíssa",
      cidade: "Aracaju",
      latitude: -10.928,
      longitude: -37.062,
      produtos: ["Tomate Cereja (1 band)", "Morango (1 caixa)"],
      quantidade: 2,
      peso: 2.2,
      valor: 28.0,
      horarioInicio: "09:30",
      horarioFim: "11:30",
      status: "Pendente",
      produtorResponsavel: "Sítio Verde Vivo",
      regiao: "Centro",
    },
    {
      id: "PED-204",
      cliente: "Daniel Rocha Guimarães",
      telefone: "(79) 99876-2004",
      endereco: "Av. Beira Mar, 1850",
      bairro: "13 de Julho",
      cidade: "Aracaju",
      latitude: -10.938,
      longitude: -37.052,
      produtos: [
        "Laranja Pêra (3kg)",
        "Abacaxi Pérola (1 un)",
        "Maçã Gala (1kg)",
      ],
      quantidade: 5,
      peso: 4.7,
      valor: 43.5,
      horarioInicio: "10:00",
      horarioFim: "12:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Centro",
    },
    {
      id: "PED-205",
      cliente: "Camila Pereira Teles",
      telefone: "(79) 99876-2005",
      endereco: "Rua Cedro, 340",
      bairro: "Salgado Filho",
      cidade: "Aracaju",
      latitude: -10.933,
      longitude: -37.065,
      produtos: ["Batata (2kg)", "Banana da Prata (2kg)"],
      quantidade: 4,
      peso: 3.8,
      valor: 34.0,
      horarioInicio: "10:30",
      horarioFim: "12:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Centro",
    },

    // --- ZONA NORTE & OESTE ---
    {
      id: "PED-301",
      cliente: "José Almeida Ramos",
      telefone: "(79) 99876-3001",
      endereco: "Rua Sergipe, 1205",
      bairro: "Siqueira Campos",
      cidade: "Aracaju",
      latitude: -10.92,
      longitude: -37.078,
      produtos: [
        "Mamão Formosa (2kg)",
        "Banana da Prata (2kg)",
        "Limão Taiti (1kg)",
      ],
      quantidade: 5,
      peso: 4.8,
      valor: 42.0,
      horarioInicio: "08:30",
      horarioFim: "10:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Norte",
    },
    {
      id: "PED-302",
      cliente: "Letícia Ferreira Viana",
      telefone: "(79) 99876-3002",
      endereco: "Av. Maranhão, 890",
      bairro: "Santos Dumont",
      cidade: "Aracaju",
      latitude: -10.896,
      longitude: -37.07,
      produtos: ["Mel Silvestre (1 frasco)", "Tomate Cereja (1 band)"],
      quantidade: 2,
      peso: 3.6,
      valor: 43.0,
      horarioInicio: "09:00",
      horarioFim: "11:00",
      status: "Pendente",
      produtorResponsavel: "Apiário Doce Mel",
      regiao: "Zona Norte",
    },
    {
      id: "PED-303",
      cliente: "Rafael Gomes Pimentel",
      telefone: "(79) 99876-3003",
      endereco: "Rua São João, 412",
      bairro: "Bairro Industrial",
      cidade: "Aracaju",
      latitude: -10.899,
      longitude: -37.055,
      produtos: ["Morango (1 caixa)", "Laranja Pêra (2kg)"],
      quantidade: 3,
      peso: 2.7,
      valor: 32.0,
      horarioInicio: "09:30",
      horarioFim: "11:30",
      status: "Pendente",
      produtorResponsavel: "Sítio Verde Vivo",
      regiao: "Zona Norte",
    },
    {
      id: "PED-304",
      cliente: "Vanessa Carvalho Prado",
      telefone: "(79) 99876-3004",
      endereco: "Av. Poço do Mero, 140",
      bairro: "Bugio",
      cidade: "Aracaju",
      latitude: -10.908,
      longitude: -37.092,
      produtos: ["Manga Palmer (3kg)", "Banana da Prata (2kg)"],
      quantidade: 5,
      peso: 5.3,
      valor: 46.5,
      horarioInicio: "10:00",
      horarioFim: "12:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Norte",
    },
    {
      id: "PED-305",
      cliente: "Lucas Martins Barreto",
      telefone: "(79) 99876-3005",
      endereco: "Rua das Camélias, 80",
      bairro: "Jabotiana",
      cidade: "Aracaju",
      latitude: -10.945,
      longitude: -37.098,
      produtos: [
        "Batata (3kg)",
        "Abacaxi Pérola (2 un)",
        "Alface Crespa (2 un)",
      ],
      quantidade: 7,
      peso: 6.0,
      valor: 54.0,
      horarioInicio: "10:30",
      horarioFim: "12:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Norte",
    },
    {
      id: "PED-306",
      cliente: "Mariana Ribeiro Cunha",
      telefone: "(79) 99876-3006",
      endereco: "Rua Santa Luzia, 410",
      bairro: "Ponto Novo",
      cidade: "Aracaju",
      latitude: -10.94,
      longitude: -37.075,
      produtos: ["Tomate Cereja (2 band)", "Maçã Gala (1kg)"],
      quantidade: 3,
      peso: 3.2,
      valor: 34.5,
      horarioInicio: "11:00",
      horarioFim: "13:00",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Norte",
    },
    {
      id: "PED-307",
      cliente: "Cláudio Vieira Lima",
      telefone: "(79) 99876-3007",
      endereco: "Av. Pref. Marcelo Déda, 550",
      bairro: "Eduardo Gomes",
      cidade: "São Cristóvão",
      latitude: -10.965,
      longitude: -37.125,
      produtos: [
        "Mel Silvestre (1 frasco)",
        "Banana da Prata (2kg)",
        "Laranja Pêra (2kg)",
      ],
      quantidade: 5,
      peso: 4.5,
      valor: 51.0,
      horarioInicio: "11:30",
      horarioFim: "13:30",
      status: "Pendente",
      produtorResponsavel: "Fazenda Boa Vista",
      regiao: "Zona Norte",
    },
  ];

  // 2. LOCAIS DE ORIGEM DOS PRODUTORES EM SERGIPE
  const ORIGENS_PRODUTORES = {
    1: {
      id: "1",
      nome: "Fazenda Boa Vista",
      local: "São Cristóvão - SE",
      endereco: "Rodovia João Bebe Água, Km 4",
      latitude: -10.985,
      longitude: -37.17,
    },
    4: {
      id: "4",
      nome: "Sítio Verde Vivo",
      local: "Itaporanga d'Ajuda - SE",
      endereco: "Povoado Sapé, Estrada Rural",
      latitude: -11.005,
      longitude: -37.28,
    },
    5: {
      id: "5",
      nome: "Sabores da Roça",
      local: "São Cristóvão - SE",
      endereco: "Centro Histórico",
      latitude: -11.012,
      longitude: -37.205,
    },
    ceasa: {
      id: "ceasa",
      nome: "Ponto de Coleta Central (Ceasa)",
      local: "Aracaju - SE",
      endereco: "Av. Tancredo Neves",
      latitude: -10.932,
      longitude: -37.075,
    },
  };

  // Cores institucionais sóbrias por rota
  const CORES_ROTAS = {
    "Zona Sul": {
      cor: "#2563EB",
      bg: "#EFF6FF",
      border: "#93C5FD",
      label: "Rota 1 — Zona Sul",
    },
    Centro: {
      cor: "#16A34A",
      bg: "#F0FDF4",
      border: "#86EFAC",
      label: "Rota 2 — Centro & Leste",
    },
    "Zona Norte": {
      cor: "#D97706",
      bg: "#FFFBEB",
      border: "#FCD34D",
      label: "Rota 3 — Zona Norte & Oeste",
    },
  };

  // 3. ESTADO INTERNO DO MÓDULO
  let pedidosCarregados = [];
  let rotasCalculadas = [];
  let rotaSelecionadaIndex = 0;
  let origemAtualId = "1";
  let capacidadeVeiculoKg = 120;
  let statusFiltroAtual = "todos";
  let modoDemonstracaoAtivo = true;
  let paradaSelecionadaId = null;

  // Estado do Google Maps e Roteirização Real
  let gMapInstance = null;
  let gMarkers = [];
  let gPolylines = [];
  let gDirectionsService = null;
  let gDirectionsRenderer = null;
  let gInfoWindow = null;
  let gMapsLoaded = false;

  // ==========================================================================
  // 4. UTILITÁRIOS MATEMÁTICOS E GEODÉSICOS
  // ==========================================================================

  /**
   * Cálculo de distância geodésica pela Fórmula de Haversine
   */
  function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371.0; // Raio médio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Estimativa de tempo com velocidade urbana (28 km/h) e 7 minutos por parada
   */
  function calcularTempoEstimado(distanciaKm, qtdParadas) {
    const velocidadeMediaKmH = 28.0;
    const tempoViagemMin = (distanciaKm / velocidadeMediaKmH) * 60;
    const tempoAtendimentoMin = qtdParadas * 7.0; // 7 min por cliente
    const totalMinutos = Math.round(tempoViagemMin + tempoAtendimentoMin);

    const horas = Math.floor(totalMinutos / 60);
    const mins = totalMinutos % 60;
    const formatado =
      horas > 0
        ? `${horas}h ${mins.toString().padStart(2, "0")}min`
        : `${mins} min`;

    return { totalMinutos, formatado };
  }

  // ==========================================================================
  // 5. ALGORITMO DE AGRUPAMENTO INTELIGENTE (CLUSTERING GEOGRÁFICO)
  // ==========================================================================

  /**
   * Agrupa pedidos por proximidade geográfica e respeita o limite de carga do veículo
   */
  function agruparPedidosPorRegiao(pedidos, capacidadeMaximaKg = 120) {
    const grupos = {};

    // 1. Agrupamento inicial por bacia geográfica / região de Sergipe
    pedidos.forEach((p) => {
      let reg = p.regiao || "Zona Sul";
      if (!grupos[reg]) {
        grupos[reg] = {
          regiao: reg,
          pedidos: [],
          pesoTotal: 0,
          valorTotal: 0,
        };
      }
      grupos[reg].pedidos.push(p);
      grupos[reg].pesoTotal += Number(p.peso || 0);
      grupos[reg].valorTotal += Number(p.valor || 0);
    });

    const rotasFinais = [];
    let contadorRota = 1;

    // 2. Validação de capacidade do veículo (divide rotas caso excedam a carga máxima)
    Object.keys(grupos).forEach((reg) => {
      const g = grupos[reg];

      if (g.pesoTotal <= capacidadeMaximaKg) {
        rotasFinais.push({
          id: `ROTA-${contadorRota}`,
          numero: contadorRota++,
          nome: CORES_ROTAS[reg] ? CORES_ROTAS[reg].label : `Rota ${reg}`,
          regiao: reg,
          cor: CORES_ROTAS[reg] ? CORES_ROTAS[reg].cor : "#1E4D2B",
          bg: CORES_ROTAS[reg] ? CORES_ROTAS[reg].bg : "#F3F4F6",
          border: CORES_ROTAS[reg] ? CORES_ROTAS[reg].border : "#D1D5DB",
          pedidos: g.pedidos,
          pesoTotal: Number(g.pesoTotal.toFixed(1)),
          valorTotal: Number(g.valorTotal.toFixed(2)),
          status: g.pedidos.every((p) => p.status === "Entregue")
            ? "Concluída"
            : g.pedidos.some((p) => p.status === "Em rota")
              ? "Em rota"
              : "Pendente",
          capacidadeMaxima: capacidadeMaximaKg,
          ocupacaoVeiculo: Math.min(
            100,
            Math.round((g.pesoTotal / capacidadeMaximaKg) * 100),
          ),
        });
      } else {
        // Divide o grupo em sub-rotas para não sobrecarregar o pequeno produtor
        let subA = [];
        let subB = [];
        let pesoA = 0;
        let pesoB = 0;

        g.pedidos.forEach((p) => {
          if (
            pesoA + p.peso <= capacidadeMaximaKg &&
            subA.length <= g.pedidos.length / 2
          ) {
            subA.push(p);
            pesoA += p.peso;
          } else {
            subB.push(p);
            pesoB += p.peso;
          }
        });

        [subA, subB].forEach((subList, idx) => {
          if (subList.length > 0) {
            const pesoSub = subList.reduce((acc, p) => acc + p.peso, 0);
            const valSub = subList.reduce((acc, p) => acc + p.valor, 0);
            const letra = idx === 0 ? "A" : "B";

            rotasFinais.push({
              id: `ROTA-${contadorRota}`,
              numero: contadorRota++,
              nome: `${reg} — Divisão ${letra}`,
              regiao: reg,
              cor: CORES_ROTAS[reg] ? CORES_ROTAS[reg].cor : "#1E4D2B",
              bg: CORES_ROTAS[reg] ? CORES_ROTAS[reg].bg : "#F3F4F6",
              border: CORES_ROTAS[reg] ? CORES_ROTAS[reg].border : "#D1D5DB",
              pedidos: subList,
              pesoTotal: Number(pesoSub.toFixed(1)),
              valorTotal: Number(valSub.toFixed(2)),
              status: subList.every((p) => p.status === "Entregue")
                ? "Concluída"
                : subList.some((p) => p.status === "Em rota")
                  ? "Em rota"
                  : "Pendente",
              capacidadeMaxima: capacidadeMaximaKg,
              ocupacaoVeiculo: Math.min(
                100,
                Math.round((pesoSub / capacidadeMaximaKg) * 100),
              ),
            });
          }
        });
      }
    });

    return rotasFinais;
  }

  // ==========================================================================
  // 6. ALGORITMO DE ROTEIRIZAÇÃO & SEQUENCIAMENTO (NEAREST NEIGHBOR + 2-OPT)
  // ==========================================================================

  /**
   * Otimiza a sequência das paradas a partir da propriedade rural de origem
   */
  function otimizarSequenciaRota(origem, paradas) {
    if (!paradas || paradas.length <= 1) return paradas;

    // Passo 1: Algoritmo Guloso de Vizinho Mais Próximo (Nearest Neighbor)
    let naoVisitados = [...paradas];
    let pontoAtual = origem;
    let rotaOrdenada = [];

    while (naoVisitados.length > 0) {
      let menorDistancia = Infinity;
      let indiceMaisProximo = 0;

      for (let i = 0; i < naoVisitados.length; i++) {
        const d = calcularDistanciaHaversine(
          pontoAtual.latitude,
          pontoAtual.longitude,
          naoVisitados[i].latitude,
          naoVisitados[i].longitude,
        );
        if (d < menorDistancia) {
          menorDistancia = d;
          indiceMaisProximo = i;
        }
      }

      const proximaParada = naoVisitados.splice(indiceMaisProximo, 1)[0];
      rotaOrdenada.push(proximaParada);
      pontoAtual = proximaParada;
    }

    // Passo 2: Otimização Local 2-Opt (desata cruzamentos e encurta a rota)
    rotaOrdenada = aplicarOtimizacao2Opt(origem, rotaOrdenada);

    // Passo 3: Cálculo cumulativo de quilometragem e previsão de horário
    let distAcumulada = calcularDistanciaHaversine(
      origem.latitude,
      origem.longitude,
      rotaOrdenada[0].latitude,
      rotaOrdenada[0].longitude,
    );
    let horaMinutos = 8 * 60; // Saída da roça às 08:00

    rotaOrdenada.forEach((p, idx) => {
      p.sequencia = idx + 1;

      if (idx > 0) {
        const trecho = calcularDistanciaHaversine(
          rotaOrdenada[idx - 1].latitude,
          rotaOrdenada[idx - 1].longitude,
          p.latitude,
          p.longitude,
        );
        distAcumulada += trecho;
        horaMinutos += Math.round((trecho / 28.0) * 60) + 7; // trânsito + entrega
      } else {
        horaMinutos += Math.round((distAcumulada / 28.0) * 60);
      }

      const hH = Math.floor(horaMinutos / 60);
      const mM = horaMinutos % 60;
      p.horarioPrevisto = `${hH.toString().padStart(2, "0")}:${mM.toString().padStart(2, "0")}`;
      p.distanciaDesdeOrigemKm = Number(distAcumulada.toFixed(1));
    });

    return rotaOrdenada;
  }

  function aplicarOtimizacao2Opt(origem, rota) {
    let melhorRota = [...rota];
    let melhorou = true;
    let iteracoes = 0;

    function calcularCustoTotal(r) {
      let d = calcularDistanciaHaversine(
        origem.latitude,
        origem.longitude,
        r[0].latitude,
        r[0].longitude,
      );
      for (let i = 0; i < r.length - 1; i++) {
        d += calcularDistanciaHaversine(
          r[i].latitude,
          r[i].longitude,
          r[i + 1].latitude,
          r[i + 1].longitude,
        );
      }
      return d;
    }

    let melhorDist = calcularCustoTotal(melhorRota);

    while (melhorou && iteracoes < 40) {
      melhorou = false;
      iteracoes++;
      for (let i = 0; i < melhorRota.length - 1; i++) {
        for (let k = i + 1; k < melhorRota.length; k++) {
          const novaRota = inverterSegmento(melhorRota, i, k);
          const novaDist = calcularCustoTotal(novaRota);
          if (novaDist < melhorDist - 0.05) {
            melhorRota = novaRota;
            melhorDist = novaDist;
            melhorou = true;
            break;
          }
        }
        if (melhorou) break;
      }
    }

    return melhorRota;
  }

  function inverterSegmento(rota, i, k) {
    const inicio = rota.slice(0, i);
    const invertido = rota.slice(i, k + 1).reverse();
    const fim = rota.slice(k + 1);
    return inicio.concat(invertido).concat(fim);
  }

  // ==========================================================================
  // 7. GERAÇÃO DE LINK EXTERNO PARA O GOOGLE MAPS NATIVO
  // ==========================================================================

  function gerarLinkGoogleMaps(origem, paradas) {
    if (!paradas || paradas.length === 0) return "#";

    const origemStr = `${origem.latitude},${origem.longitude}`;
    const destinoStop = paradas[paradas.length - 1];
    const destinoStr = `${destinoStop.latitude},${destinoStop.longitude}`;

    let waypointsStr = "";
    if (paradas.length > 1) {
      const intermediarias = paradas
        .slice(0, paradas.length - 1)
        .map((p) => `${p.latitude},${p.longitude}`);
      waypointsStr = `&waypoints=${encodeURIComponent(intermediarias.join("|"))}`;
    }

    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origemStr)}&destination=${encodeURIComponent(destinoStr)}${waypointsStr}&travelmode=driving`;
  }

  // ==========================================================================
  // 8. MOTOR DE MAPA (GOOGLE MAPS API + FALLBACK INTERATIVO DE SERGIPE)
  // ==========================================================================

  /**
   * Tenta carregar a API do Google Maps com a chave configurada
   */
  function carregarGoogleMapsScript() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        gMapsLoaded = true;
        resolve(true);
        return;
      }

      // Se a chave ainda for o marcador padrão, ativa o fallback visual interativo
      if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "SUA_CHAVE_AQUI") {
        resolve(false);
        return;
      }

      const scriptId = "google-maps-api-script";
      if (document.getElementById(scriptId)) {
        resolve(true);
        return;
      }

      window.initGoogleMapsCallback = function () {
        gMapsLoaded = true;
        inicializarMapa();
        resolve(true);
      };

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=weekly&libraries=routes,geometry&callback=initGoogleMapsCallback`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        resolve(false);
      };
      document.head.appendChild(script);
    });
  }

  function inicializarMapa() {
    const container = document.getElementById("logistics-map-canvas");
    if (!container) return;

    const indDot = document.getElementById("engine-dot");
    const indText = document.getElementById("engine-text");

    if (gMapsLoaded && window.google && window.google.maps) {
      if (!gMapInstance) {
        gMapInstance = new google.maps.Map(container, {
          center: { lat: -10.9472, lng: -37.0731 },
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });
        gInfoWindow = new google.maps.InfoWindow();
      }
      if (indDot) indDot.className = "engine-dot live";
      if (indText) indText.textContent = "Google Maps API ao Vivo";
      renderizarRotaNoGoogleMaps();
    } else {
      if (indDot) indDot.className = "engine-dot demo";
      if (indText)
        indText.textContent = "Mapa Interativo de Demonstração (Sergipe)";
      renderizarMapaFallbackSVG();
    }
  }

  /**
   * Renderiza os marcadores e aciona o serviço de roteirização real do Google Maps
   */
  /**
   * Renderiza os marcadores e aciona o serviço de roteirização real do Google Maps
   */
  /**
   * Renderiza os marcadores no mapa e dispara o calculo de rota real pelas vias
   */
  function renderizarRotaNoGoogleMaps() {
    if (!gMapInstance || !rotasCalculadas[rotaSelecionadaIndex]) return;

    // Redimensiona o mapa para o tamanho do container (necessario quando a aba estava oculta)
    google.maps.event.trigger(gMapInstance, "resize");

    // 1. Limpa marcadores anteriores
    gMarkers.forEach((m) => m.setMap(null));
    gMarkers = [];

    // 2. Limpa polylines e direcoes anteriores
    gPolylines.forEach((p) => p.setMap(null));
    gPolylines = [];
    if (gDirectionsRenderer) {
      gDirectionsRenderer.setDirections({ routes: [] });
      gDirectionsRenderer.setMap(null);
      gDirectionsRenderer = null;
    }

    const rotaAtual = rotasCalculadas[rotaSelecionadaIndex];
    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
    const bounds = new google.maps.LatLngBounds();

    // 1. Ponto de Partida / Produtor (Origem)
    const origemPos = new google.maps.LatLng(
      Number(origem.latitude),
      Number(origem.longitude),
    );
    bounds.extend(origemPos);

    const farmMarker = new google.maps.Marker({
      position: origemPos,
      map: gMapInstance,
      zIndex: 110,
      title: `${origem.nome} (Ponto de Partida)`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 11,
        fillColor: "#1E4D2B",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2.5,
      },
    });
    gMarkers.push(farmMarker);

    farmMarker.addListener("click", () => {
      gInfoWindow.setContent(`
        <div style="padding:8px; font-family:sans-serif;">
          <strong style="color:#1E4D2B; font-size:14px;">${origem.nome}</strong>
          <p style="font-size:12px; color:#555; margin:4px 0 0;">Ponto de partida da rota (${origem.local})</p>
          <small style="color:#777;">Carga inicial conferida</small>
        </div>
      `);
      gInfoWindow.open(gMapInstance, farmMarker);
    });

    // 2. Marcadores das Paradas Sequenciais (1 a N)
    rotaAtual.pedidos.forEach((p) => {
      const pos = new google.maps.LatLng(
        Number(p.latitude),
        Number(p.longitude),
      );
      bounds.extend(pos);

      const corPin =
        p.status === "Entregue"
          ? "#15803D"
          : p.status === "Em rota"
            ? "#2563EB"
            : "#1A73E8";

      const marker = new google.maps.Marker({
        position: pos,
        map: gMapInstance,
        zIndex: 100,
        title: `Parada ${p.sequencia}: ${p.cliente}`,
        label: {
          text: String(p.sequencia),
          color: "#FFFFFF",
          fontSize: "11px",
          fontWeight: "bold",
        },
        icon: {
          path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 Z",
          fillColor: corPin,
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 1.5,
          scale: 1.15,
          labelOrigin: new google.maps.Point(0, -29),
        },
      });

      marker.addListener("click", () => {
        abrirInfoCardParada(p);
      });

      gMarkers.push(marker);
    });

    // 3. ROTEIRIZACAO REAL PELAS RUAS (DirectionsService)
    calcularERenderizarRotaRealGoogle(origem, rotaAtual.pedidos, bounds);
  }

  // ==========================================================================
  // ROTEIRIZACAO: CALCULO E DESENHO DE TRAJETO REAL PELAS RUAS COM GOOGLE API
  // ==========================================================================
  /**
   * Calcula e desenha o trajeto real pelas ruas utilizando a geometria da Directions API.
   * Lógica estrita:
   * 1. Definir localização do produtor como origem.
   * 2. Definir entregas como waypoints.
   * 3. Definir o último destino.
   * 4. Enviar origem, destino e waypoints para o serviço de rotas do Google.
   * 5. Receber a rota calculada.
   * 6. Utilizar a geometria/polilinha retornada pelo Google para desenhar o trajeto.
   * 7. A linha azul deve acompanhar as ruas e avenidas reais.
   * 8. Não desenhar linhas retas entre os marcadores.
   * 9. Exibir a distância real estimada da rota.
   * 10. Exibir o tempo estimado de deslocamento.
   */
  async function calcularERenderizarRotaRealGoogle(
    origem,
    paradasOrdenadas,
    bounds,
  ) {
    if (!window.google || !window.google.maps) {
      console.warn("Google Maps API nao disponivel no momento.");
      return;
    }

    // Limpa polylines anteriores
    gPolylines.forEach((p) => p.setMap(null));
    gPolylines = [];

    // Oculta banner de erro previo
    const errBanner = document.getElementById("sel-route-error-banner");
    const errTitle = document.getElementById("sel-route-error-title");
    const errMsg = document.getElementById("sel-route-error-msg");
    if (errBanner) errBanner.style.display = "none";

    if (!paradasOrdenadas || paradasOrdenadas.length === 0) {
      gMapInstance.fitBounds(bounds);
      return;
    }

    // Indicador visual de calculo em andamento
    const distEl = document.getElementById("sel-route-real-dist");
    const timeEl = document.getElementById("sel-route-real-time");
    const stopsEl = document.getElementById("sel-route-real-stops");
    if (distEl) distEl.textContent = "Calculando vias...";
    if (timeEl) timeEl.textContent = "Estimando transito...";
    if (stopsEl) stopsEl.textContent = `${paradasOrdenadas.length} paradas`;

    // 1. Definir origem, waypoints e destino
    const origLat = Number(origem.latitude);
    const origLng = Number(origem.longitude);
    const destinoStop = paradasOrdenadas[paradasOrdenadas.length - 1];
    const destLat = Number(destinoStop.latitude);
    const destLng = Number(destinoStop.longitude);

    const waypointsIntermediarios =
      paradasOrdenadas.length > 1
        ? paradasOrdenadas.slice(0, paradasOrdenadas.length - 1)
        : [];

    let rotaCalculadaComSucesso = false;
    let erroFinal = null;

    // ------------------------------------------------------------------------
    // METODO 1: Google Maps Routes Library (Route.computeRoutes via importLibrary)
    // ------------------------------------------------------------------------
    try {
      let routesLib = null;
      if (typeof google.maps.importLibrary === "function") {
        routesLib = await google.maps.importLibrary("routes");
      }

      if (
        routesLib &&
        routesLib.Route &&
        typeof routesLib.Route.computeRoutes === "function"
      ) {
        const routesRequest = {
          origin: {
            location: {
              latLng: { latitude: origLat, longitude: origLng },
            },
          },
          destination: {
            location: {
              latLng: { latitude: destLat, longitude: destLng },
            },
          },
          intermediates: waypointsIntermediarios.map((p) => ({
            location: {
              latLng: {
                latitude: Number(p.latitude),
                longitude: Number(p.longitude),
              },
            },
          })),
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
          fields: [
            "routes.polyline.encodedPolyline",
            "routes.distanceMeters",
            "routes.duration",
            "routes.legs",
          ],
        };

        const res = await routesLib.Route.computeRoutes(routesRequest);
        if (res && res.routes && res.routes.length > 0) {
          const r = res.routes[0];
          let path = [];
          if (
            r.polyline &&
            r.polyline.encodedPolyline &&
            window.google.maps.geometry &&
            window.google.maps.geometry.encoding
          ) {
            path = google.maps.geometry.encoding.decodePath(
              r.polyline.encodedPolyline,
            );
          }
          if (path.length > 0) {
            desenharPolylineViasReais(path);
            const distKm = ((r.distanceMeters || 0) / 1000).toFixed(1);
            const segundos = parseInt(r.duration || "0", 10);
            const tempoFmt = formatarSegundos(segundos);
            atualizarMetricasRotaPainel(
              distKm,
              tempoFmt,
              paradasOrdenadas.length,
            );
            gMapInstance.fitBounds(bounds);
            rotaCalculadaComSucesso = true;
            return;
          }
        }
      }
    } catch (errRoutesLib) {
      console.warn(
        "Routes Library (computeRoutes) falhou ou indisponivel:",
        errRoutesLib,
      );
      erroFinal = errRoutesLib;
    }

    // ------------------------------------------------------------------------
    // METODO 2: Google Routes API v2 via REST / fetch (captura erro original de habilitacao/cota)
    // ------------------------------------------------------------------------
    if (
      !rotaCalculadaComSucesso &&
      GOOGLE_MAPS_API_KEY &&
      GOOGLE_MAPS_API_KEY !== "SUA_CHAVE_AQUI"
    ) {
      try {
        const restUrl =
          "https://routes.googleapis.com/directions/v2:computeRoutes";
        const restBody = {
          origin: {
            location: { latLng: { latitude: origLat, longitude: origLng } },
          },
          destination: {
            location: { latLng: { latitude: destLat, longitude: destLng } },
          },
          intermediates: waypointsIntermediarios.map((p) => ({
            location: {
              latLng: {
                latitude: Number(p.latitude),
                longitude: Number(p.longitude),
              },
            },
          })),
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
        };

        const restRes = await fetch(restUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs",
          },
          body: JSON.stringify(restBody),
        });

        if (restRes.ok) {
          const data = await restRes.json();
          if (data && data.routes && data.routes.length > 0) {
            const r = data.routes[0];
            let path = [];
            if (
              r.polyline &&
              r.polyline.encodedPolyline &&
              window.google.maps.geometry &&
              window.google.maps.geometry.encoding
            ) {
              path = google.maps.geometry.encoding.decodePath(
                r.polyline.encodedPolyline,
              );
            }
            if (path.length > 0) {
              desenharPolylineViasReais(path);
              const distKm = ((r.distanceMeters || 0) / 1000).toFixed(1);
              const segundos = parseInt(r.duration || "0", 10);
              const tempoFmt = formatarSegundos(segundos);
              atualizarMetricasRotaPainel(
                distKm,
                tempoFmt,
                paradasOrdenadas.length,
              );
              gMapInstance.fitBounds(bounds);
              rotaCalculadaComSucesso = true;
              return;
            }
          }
        } else {
          const errData = await restRes.json().catch(() => null);
          const msg =
            errData && errData.error && errData.error.message
              ? `[HTTP ${restRes.status} ${errData.error.status || ""}] ${errData.error.message}`
              : `HTTP ${restRes.status} ${restRes.statusText}`;
          erroFinal = new Error(msg);
          console.warn("Routes API REST retornou erro:", msg, errData);
        }
      } catch (errRest) {
        console.warn("Routes API REST fetch falhou:", errRest);
        if (!erroFinal) erroFinal = errRest;
      }
    }

    // ------------------------------------------------------------------------
    // METODO 3: Google Maps DirectionsService (legado da Maps JS API)
    // ------------------------------------------------------------------------
    if (!rotaCalculadaComSucesso) {
      if (!gDirectionsService) {
        gDirectionsService = new google.maps.DirectionsService();
      }

      const dsRequest = {
        origin: new google.maps.LatLng(origLat, origLng),
        destination: new google.maps.LatLng(destLat, destLng),
        waypoints: waypointsIntermediarios.map((p) => ({
          location: new google.maps.LatLng(
            Number(p.latitude),
            Number(p.longitude),
          ),
          stopover: true,
        })),
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      await new Promise((resolve) => {
        gDirectionsService.route(dsRequest, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK || status === "OK") {
            let routePath = [];
            if (response.routes && response.routes[0]) {
              const route = response.routes[0];
              if (route.overview_path && route.overview_path.length > 0) {
                routePath = route.overview_path;
              } else if (
                route.overview_polyline &&
                window.google.maps.geometry &&
                window.google.maps.geometry.encoding
              ) {
                const enc =
                  typeof route.overview_polyline === "string"
                    ? route.overview_polyline
                    : route.overview_polyline.points;
                routePath = google.maps.geometry.encoding.decodePath(enc);
              }
            }

            if (routePath.length > 0) {
              desenharPolylineViasReais(routePath);
            }

            let totalMetros = 0;
            let totalSegundos = 0;
            const route = response.routes[0];
            if (route && route.legs) {
              route.legs.forEach((leg) => {
                totalMetros +=
                  leg.distance && leg.distance.value ? leg.distance.value : 0;
                totalSegundos +=
                  leg.duration && leg.duration.value ? leg.duration.value : 0;
              });
            }

            const distRealKm = (totalMetros / 1000).toFixed(1);
            const tempoDeslocamentoFormatado = formatarSegundos(totalSegundos);

            atualizarMetricasRotaPainel(
              distRealKm,
              tempoDeslocamentoFormatado,
              paradasOrdenadas.length,
            );
            gMapInstance.fitBounds(bounds);
            rotaCalculadaComSucesso = true;
          } else {
            // Se falhou em todas as tentativas, registra erro original completo
            const erroMsg = erroFinal
              ? erroFinal.message
              : `DirectionsStatus: ${status}`;
            console.error("Erro completo ao calcular rota:", erroMsg, {
              status,
              erroFinal,
            });
            exibirErroOriginalAPI(erroMsg, paradasOrdenadas.length);
            gMapInstance.fitBounds(bounds);
          }
          resolve();
        });
      });
    }
  }

  function desenharPolylineViasReais(path) {
    gPolylines.forEach((p) => p.setMap(null));
    gPolylines = [];

    const navPolyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#1A73E8", // Azul oficial Google Maps
      strokeOpacity: 0.85,
      strokeWeight: 5,
      map: gMapInstance,
      zIndex: 50,
    });
    gPolylines.push(navPolyline);
  }

  function formatarSegundos(totalSegundos) {
    const totalMin = Math.round(totalSegundos / 60);
    const horas = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    return horas > 0
      ? `${horas}h ${mins.toString().padStart(2, "0")}min`
      : `${mins} min`;
  }

  function exibirErroOriginalAPI(erroOriginal, qtdParadas) {
    const errBanner = document.getElementById("sel-route-error-banner");
    const errMsg = document.getElementById("sel-route-error-msg");
    const errTitle = document.getElementById("sel-route-error-title");

    if (errBanner) {
      if (errTitle) errTitle.textContent = "Erro da API:";
      if (errMsg) {
        errMsg.textContent = String(erroOriginal);
      } else {
        errBanner.innerHTML = `<strong>Erro da API:</strong> <div>${String(erroOriginal)}</div>`;
      }
      errBanner.style.display = "block";
    }

    const distEl = document.getElementById("sel-route-real-dist");
    const timeEl = document.getElementById("sel-route-real-time");
    const stopsEl = document.getElementById("sel-route-real-stops");
    const metaEl = document.getElementById("sel-route-meta");

    if (distEl) distEl.textContent = "Indisponivel";
    if (timeEl) timeEl.textContent = "Indisponivel";
    if (stopsEl) stopsEl.textContent = `${qtdParadas} paradas`;

    if (metaEl) {
      metaEl.innerHTML = `<span style="color:#DC2626; font-weight:600;">Roteirizacao indisponivel</span> (${String(erroOriginal).substring(0, 45)}) • ${qtdParadas} paradas mantidas`;
    }
  }

  function atualizarMetricasRotaPainel(distKm, tempoFormatado, qtdParadas) {
    const rotaAtual = rotasCalculadas[rotaSelecionadaIndex];
    const distEl = document.getElementById("sel-route-real-dist");
    const timeEl = document.getElementById("sel-route-real-time");
    const stopsEl = document.getElementById("sel-route-real-stops");
    const metaEl = document.getElementById("sel-route-meta");
    const errBanner = document.getElementById("sel-route-error-banner");

    if (errBanner) errBanner.style.display = "none";
    if (distEl) distEl.textContent = `${distKm.replace(".", ",")} km`;
    if (timeEl) timeEl.textContent = tempoFormatado;
    if (stopsEl) stopsEl.textContent = `${qtdParadas} paradas`;

    if (metaEl && rotaAtual) {
      metaEl.textContent = `${qtdParadas} entregas • ${rotaAtual.pesoTotal} kg • ${distKm.replace(".", ",")} km pelas ruas • ${tempoFormatado} de deslocamento`;
    }

    const kpiDist = document.getElementById("kpi-total-distance");
    if (kpiDist) {
      kpiDist.textContent = `${distKm.replace(".", ",")} km`;
    }
    const kpiTime = document.getElementById("kpi-total-time");
    if (kpiTime) {
      kpiTime.textContent = tempoFormatado;
    }
  }

  function renderizarMapaFallbackSVG() {
    const container = document.getElementById("logistics-map-canvas");
    if (!container || !rotasCalculadas[rotaSelecionadaIndex]) return;

    const rotaAtual = rotasCalculadas[rotaSelecionadaIndex];
    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
    const todosPontos = [origem, ...rotaAtual.pedidos];

    // Delimitação de coordenadas geográficas de Sergipe (Aracaju e arredores)
    const lats = todosPontos.map((p) => p.latitude);
    const lngs = todosPontos.map((p) => p.longitude);

    const minLat = Math.min(...lats) - 0.02;
    const maxLat = Math.max(...lats) + 0.02;
    const minLng = Math.min(...lngs) - 0.02;
    const maxLng = Math.max(...lngs) + 0.02;

    const width = 800;
    const height = 540;

    function projectX(lng) {
      return 60 + ((lng - minLng) / (maxLng - minLng)) * (width - 120);
    }
    function projectY(lat) {
      return (
        height - 60 - ((lat - minLat) / (maxLat - minLat)) * (height - 120)
      );
    }

    const ox = projectX(origem.longitude);
    const oy = projectY(origem.latitude);

    let pathD = `M ${ox} ${oy}`;
    const pontosProjetados = [{ x: ox, y: oy, data: origem, isOrigem: true }];

    rotaAtual.pedidos.forEach((p) => {
      const px = projectX(p.longitude);
      const py = projectY(p.latitude);
      pathD += ` L ${px} ${py}`;
      pontosProjetados.push({ x: px, y: py, data: p, isOrigem: false });
    });

    container.innerHTML = `
      <svg class="svg-logistics-map" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        <!-- Fundo Terrestre / Sergipe -->
        <rect width="100%" height="100%" fill="#F4F7F4" />
        
        <!-- Oceano Atlântico (Litoral Leste) -->
        <path d="M 680 0 Q 720 200 690 350 Q 660 450 710 ${height} L ${width} ${height} L ${width} 0 Z" fill="#E0F2FE" />
        <text x="720" y="40" font-size="11" fill="#0284C7" font-weight="600" opacity="0.7">Oceano Atlântico</text>

        <!-- Rio Sergipe e Rio Poxim (Traçado representativo) -->
        <path d="M 120 0 Q 350 80 520 110 Q 660 140 685 160" fill="none" stroke="#BAE6FD" stroke-width="12" stroke-linecap="round" />
        <path d="M 280 280 Q 420 250 560 210 Q 640 180 685 170" fill="none" stroke="#BAE6FD" stroke-width="7" stroke-linecap="round" />
        <text x="360" y="90" font-size="10" fill="#0369A1" font-weight="500" opacity="0.6">Rio Sergipe</text>
        <text x="380" y="270" font-size="9" fill="#0369A1" font-weight="500" opacity="0.6">Rio Poxim</text>

        <!-- Malha Viária Estruturante (Av. Beira Mar / Tancredo Neves / Hermes Fontes) -->
        <path d="M 200 350 L 520 220 L 640 160" fill="none" stroke="#E5E7EB" stroke-width="6" />
        <path d="M 450 60 L 520 220 L 580 480" fill="none" stroke="#E5E7EB" stroke-width="6" />
        <path d="M 640 160 L 630 420" fill="none" stroke="#E5E7EB" stroke-width="5" />

        <!-- Rota de Entregas (Linha tracejada e linha viva) -->
        <path d="${pathD}" fill="none" stroke="${rotaAtual.cor}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />
        <path d="${pathD}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6,6" stroke-linecap="round" />

        <!-- Marcador do Produtor (Origem) -->
        <g class="svg-map-pin" onclick="LogisticaModule.abrirInfoOrigem()" style="cursor:pointer;">
          <circle cx="${ox}" cy="${oy}" r="14" fill="#1E4D2B" stroke="#FFFFFF" stroke-width="2.5" />
          <text x="${ox}" y="${oy + 4}" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">P</text>
          <rect x="${ox - 45}" y="${oy - 28}" width="90" height="18" rx="3" fill="#1E4D2B" />
          <text x="${ox}" y="${oy - 16}" font-size="9.5" fill="#FFFFFF" font-weight="bold" text-anchor="middle">${origem.nome.substring(0, 15)}</text>
        </g>

        <!-- Marcadores das Paradas Sequenciais -->
        ${pontosProjetados
          .filter((p) => !p.isOrigem)
          .map((pt) => {
            const ped = pt.data;
            const cor =
              ped.status === "Entregue"
                ? "#15803D"
                : ped.status === "Em rota"
                  ? "#2563EB"
                  : rotaAtual.cor;

            return `
            <g class="svg-map-pin" onclick="LogisticaModule.abrirInfoCardPorId('${ped.id}')" style="cursor:pointer;">
              <!-- Círculo do Marcador com Número da Parada -->
              <circle cx="${pt.x}" cy="${pt.y}" r="13" fill="${cor}" stroke="#FFFFFF" stroke-width="2" />
              <text x="${pt.x}" y="${pt.y + 4}" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
                ${ped.status === "Entregue" ? "OK" : ped.sequencia}
              </text>
              <!-- Rótulo do Bairro -->
              <rect x="${pt.x - 30}" y="${pt.y + 16}" width="60" height="15" rx="3" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" opacity="0.95" />
              <text x="${pt.x}" y="${pt.y + 27}" font-size="9" fill="#374151" font-weight="600" text-anchor="middle">
                ${ped.bairro.substring(0, 10)}
              </text>
            </g>
          `;
          })
          .join("")}
      </svg>
    `;
  }

  // ==========================================================================
  // 9. RENDERIZAÇÃO DA INTERFACE DO PAINEL DE CONTROLE
  // ==========================================================================

  function renderizarInterface() {
    renderizarResumoGeral();
    renderizarAbasRotas();
    renderizarDetalhesRotaSelecionada();
  }

  function renderizarResumoGeral() {
    const totalEntregas = pedidosCarregados.length;
    const totalRotas = rotasCalculadas.length;
    const pesoTotal = rotasCalculadas.reduce((acc, r) => acc + r.pesoTotal, 0);
    const valorTotal = rotasCalculadas.reduce(
      (acc, r) => acc + r.valorTotal,
      0,
    );

    // Soma das distâncias e tempos de todas as rotas
    let distTotalKm = 0;
    rotasCalculadas.forEach((r) => {
      const orig = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
      const ultima = r.pedidos[r.pedidos.length - 1];
      if (ultima) {
        distTotalKm += ultima.distanciaDesdeOrigemKm || 12.0;
      }
    });

    const tempoGeral = calcularTempoEstimado(distTotalKm, totalEntregas);

    const elTotal = document.getElementById("kpi-total-orders");
    const elRotas = document.getElementById("kpi-total-routes");
    const elPeso = document.getElementById("kpi-total-weight");
    const elDist = document.getElementById("kpi-total-distance");
    const elTempo = document.getElementById("kpi-total-time");
    const elValor = document.getElementById("kpi-total-value");

    if (elTotal) elTotal.textContent = totalEntregas;
    if (elRotas) elRotas.textContent = totalRotas;
    if (elPeso)
      elPeso.textContent = `${pesoTotal.toFixed(1).replace(".", ",")} kg`;
    if (elDist)
      elDist.textContent = `${distTotalKm.toFixed(1).replace(".", ",")} km`;
    if (elTempo) elTempo.textContent = tempoGeral.formatado;
    if (elValor)
      elValor.textContent = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;

    // Atualiza barra de ocupação da rota atualmente em exibição
    const rotaAtual = rotasCalculadas[rotaSelecionadaIndex];
    if (rotaAtual) {
      const elLoadPct = document.getElementById("kpi-load-percentage");
      const elLoadBar = document.getElementById("kpi-load-bar");
      if (elLoadPct)
        elLoadPct.textContent = `${rotaAtual.ocupacaoVeiculo}% (${rotaAtual.pesoTotal}kg / ${rotaAtual.capacidadeMaxima}kg)`;
      if (elLoadBar) {
        elLoadBar.style.width = `${rotaAtual.ocupacaoVeiculo}%`;
        elLoadBar.style.backgroundColor =
          rotaAtual.ocupacaoVeiculo > 90
            ? "#DC2626"
            : rotaAtual.ocupacaoVeiculo > 75
              ? "#D97706"
              : "#16A34A";
      }
    }
  }

  function renderizarAbasRotas() {
    const container = document.getElementById("log-routes-list");
    if (!container) return;

    container.innerHTML = rotasCalculadas
      .map((r, idx) => {
        const isSel = idx === rotaSelecionadaIndex;
        return `
        <button class="route-tab-card ${isSel ? "active" : ""}" onclick="LogisticaModule.selecionarRota(${idx})" style="border-left-color: ${r.cor};">
          <div class="route-tab-top">
            <strong style="color: var(--text-main); font-size: 13px;">${r.nome}</strong>
            <span class="route-status-pill ${r.status.toLowerCase().replace(" ", "-")}">${r.status}</span>
          </div>
          <div class="route-tab-meta">
            <span>${r.pedidos.length} entregas</span>
            <span>•</span>
            <span>${r.pesoTotal} kg</span>
            <span>•</span>
            <span>${r.ocupacaoVeiculo}% do veículo</span>
          </div>
        </button>
      `;
      })
      .join("");
  }

  function renderizarDetalhesRotaSelecionada() {
    const rota = rotasCalculadas[rotaSelecionadaIndex];
    if (!rota) return;

    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
    const ultimaParada = rota.pedidos[rota.pedidos.length - 1];
    const distEstKm = ultimaParada ? ultimaParada.distanciaDesdeOrigemKm : 12.0;
    const tempoEst = calcularTempoEstimado(distEstKm, rota.pedidos.length);

    const titleEl = document.getElementById("sel-route-title");
    const metaEl = document.getElementById("sel-route-meta");
    const farmNameEl = document.getElementById("farm-origin-name");
    const stopsCountEl = document.getElementById("stops-count-text");
    const btnStart = document.getElementById("btn-start-route");

    if (titleEl) titleEl.textContent = rota.nome;
    if (metaEl)
      metaEl.textContent = `${rota.pedidos.length} entregas • ${rota.pesoTotal} kg • ${distEstKm} km est. • ${tempoEst.formatado}`;
    if (farmNameEl) farmNameEl.textContent = `${origem.nome} (${origem.local})`;
    if (stopsCountEl)
      stopsCountEl.textContent = `${rota.pedidos.length} paradas sequenciadas`;

    if (btnStart) {
      if (rota.status === "Concluída") {
        btnStart.textContent = "Rota Concluída";
        btnStart.disabled = true;
        btnStart.className = "btn-route-action completed";
      } else if (rota.status === "Em rota") {
        btnStart.textContent = "Rota em Andamento";
        btnStart.disabled = false;
        btnStart.className = "btn-route-action in-progress";
      } else {
        btnStart.textContent = "Iniciar Rota";
        btnStart.disabled = false;
        btnStart.className = "btn-route-action";
      }
    }

    // Renderiza a lista de paradas
    const stopsList = document.getElementById("log-stops-list");
    if (!stopsList) return;

    // Filtra por status se houver filtro ativo
    const pedidosFiltrados =
      statusFiltroAtual === "todos"
        ? rota.pedidos
        : rota.pedidos.filter((p) => p.status === statusFiltroAtual);

    if (pedidosFiltrados.length === 0) {
      stopsList.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:12px;">Nenhuma parada com o status selecionado.</div>`;
      return;
    }

    stopsList.innerHTML = pedidosFiltrados
      .map((p) => {
        const isEntregue = p.status === "Entregue";
        const isEmRota = p.status === "Em rota";
        const corStatus = isEntregue
          ? "status-tag-entregue"
          : isEmRota
            ? "status-tag-rota"
            : "status-tag-pendente";

        return `
        <div class="stop-card-row ${p.id === paradaSelecionadaId ? "selected" : ""}" onclick="LogisticaModule.abrirInfoCardPorId('${p.id}')">
          <div class="stop-num-col">
            <span class="stop-num-badge" style="background-color: ${isEntregue ? "#15803D" : rota.cor};">
              ${isEntregue ? "OK" : p.sequencia.toString().padStart(2, "0")}
            </span>
          </div>

          <div class="stop-main-col">
            <div class="stop-client-row">
              <strong>${p.cliente}</strong>
              <span class="status-tag ${corStatus}">${p.status}</span>
            </div>
            
            <p class="stop-addr-text">${p.endereco}, ${p.bairro} — ${p.cidade}</p>
            
            <div class="stop-items-preview">
              <span>${p.produtos.join(" • ")}</span>
            </div>

            <div class="stop-kpi-footer">
              <span>Peso: <strong>${p.peso} kg</strong></span>
              <span>•</span>
              <span>Valor: <strong>R$ ${Number(p.valor).toFixed(2).replace(".", ",")}</strong></span>
              <span>•</span>
              <span>Previsão: <strong>${p.horarioPrevisto}</strong> <small>(Janela: ${p.horarioInicio}-${p.horarioFim})</small></span>
            </div>
          </div>

          <div class="stop-actions-col" onclick="event.stopPropagation()">
            ${
              isEntregue
                ? `
              <span style="font-size:11px; color:#15803D; font-weight:600;">Entregue</span>
            `
                : `
              <button class="btn-mark-delivered" onclick="LogisticaModule.marcarComoEntregue('${p.id}')" title="Confirmar entrega realizada">
                Entregar
              </button>
            `
            }
          </div>
        </div>
      `;
      })
      .join("");
  }

  // ==========================================================================
  // 10. AÇÕES E INTERAÇÕES DO USUÁRIO
  // ==========================================================================

  function selecionarRota(idx) {
    rotaSelecionadaIndex = idx;
    paradaSelecionadaId = null;
    fecharInfoCard();
    renderizarInterface();
    inicializarMapa();
  }

  function alterarOrigem(origemId) {
    origemAtualId = origemId;
    recalcularRotas();
    renderizarInterface();
    inicializarMapa();
  }

  function alterarVeiculo(capacidadeKg) {
    capacidadeVeiculoKg = Number(capacidadeKg);
    recalcularRotas();
    renderizarInterface();
    inicializarMapa();
  }

  function filtrarPorStatus(status) {
    statusFiltroAtual = status;
    renderizarDetalhesRotaSelecionada();
  }

  function iniciarRotaAtual() {
    const rota = rotasCalculadas[rotaSelecionadaIndex];
    if (!rota) return;

    rota.status = "Em rota";
    rota.pedidos.forEach((p) => {
      if (p.status === "Pendente") p.status = "Em rota";
    });

    renderizarInterface();
    inicializarMapa();
    if (typeof showToast === "function") {
      showToast(`${rota.nome} iniciada! Paradas marcadas como Em Rota.`);
    }
  }

  function marcarComoEntregue(pedidoId) {
    const pedido = pedidosCarregados.find((p) => p.id === pedidoId);
    if (!pedido) return;

    pedido.status = "Entregue";

    // Atualiza status da rota se todas foram entregues
    const rota = rotasCalculadas[rotaSelecionadaIndex];
    if (rota && rota.pedidos.every((p) => p.status === "Entregue")) {
      rota.status = "Concluída";
    }

    renderizarInterface();
    inicializarMapa();

    if (paradaSelecionadaId === pedidoId) {
      abrirInfoCardParada(pedido);
    }

    if (typeof showToast === "function") {
      showToast(`Pedido de ${pedido.cliente} entregue com sucesso!`);
    }

    // Salva atualização na API caso esteja conectada
    if (typeof apiCall === "function") {
      apiCall("atualizarStatusEntrega", "POST", {
        id: pedido.id,
        status: "Entregue",
      });
    }
  }

  function abrirNoGoogleMaps() {
    const rota = rotasCalculadas[rotaSelecionadaIndex];
    if (!rota) return;
    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
    const link = gerarLinkGoogleMaps(origem, rota.pedidos);
    window.open(link, "_blank");
  }

  function recentralizarMapa() {
    inicializarMapa();
  }

  function toggleModoDemonstracao() {
    modoDemonstracaoAtivo = !modoDemonstracaoAtivo;
    if (typeof showToast === "function") {
      showToast(
        modoDemonstracaoAtivo
          ? "Modo Demonstração Ativo (18 pedidos em Sergipe)"
          : "Buscando dados ao vivo do Google Sheets...",
      );
    }
  }

  // ==========================================================================
  // 11. MODAL / INFOCARD FLUTUANTE DA PARADA
  // ==========================================================================

  function abrirInfoCardPorId(id) {
    const pedido = pedidosCarregados.find((p) => p.id === id);
    if (pedido) abrirInfoCardParada(pedido);
  }

  function abrirInfoCardParada(p) {
    paradaSelecionadaId = p.id;
    const card = document.getElementById("map-stop-infocard");
    if (!card) return;

    document.getElementById("info-stop-num").textContent =
      `Parada ${p.sequencia.toString().padStart(2, "0")}`;
    document.getElementById("info-client").textContent = p.cliente;
    document.getElementById("info-addr").textContent =
      `${p.endereco}, ${p.bairro} — ${p.cidade}`;
    document.getElementById("info-weight").textContent = `${p.peso} kg`;
    document.getElementById("info-value").textContent =
      `R$ ${Number(p.valor).toFixed(2).replace(".", ",")}`;
    document.getElementById("info-window").textContent =
      `Previsão: ${p.horarioPrevisto} (Janela: ${p.horarioInicio}-${p.horarioFim})`;

    const statusEl = document.getElementById("info-status");
    statusEl.textContent = p.status;
    statusEl.className = `infotag-status ${p.status.toLowerCase().replace(" ", "-")}`;

    document.getElementById("info-products").textContent =
      p.produtos.join(", ");

    const btnAction = document.getElementById("btn-info-action");
    if (btnAction) {
      if (p.status === "Entregue") {
        btnAction.textContent = "Entrega já realizada";
        btnAction.disabled = true;
        btnAction.style.opacity = "0.7";
      } else {
        btnAction.textContent = "Marcar como Entregue";
        btnAction.disabled = false;
        btnAction.style.opacity = "1";
      }
    }

    card.style.display = "block";
    renderizarDetalhesRotaSelecionada();
  }

  function fecharInfoCard() {
    paradaSelecionadaId = null;
    const card = document.getElementById("map-stop-infocard");
    if (card) card.style.display = "none";
  }

  function avancarStatusParadaSelecionada() {
    if (paradaSelecionadaId) {
      marcarComoEntregue(paradaSelecionadaId);
    }
  }

  function abrirInfoOrigem() {
    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];
    if (typeof showToast === "function") {
      showToast(
        `Ponto de Partida: ${origem.nome} (${origem.endereco}, ${origem.local})`,
      );
    }
  }

  // ==========================================================================
  // 12. SIMULAÇÃO ANIMADA DE ROTEIRIZAÇÃO INTELIGENTE
  // ==========================================================================

  async function simularRoteirizacao() {
    const feedbackBox = document.getElementById("log-sim-feedback");
    const feedbackText = document.getElementById("log-sim-text");
    const btnSim = document.getElementById("btn-run-simulation");

    if (feedbackBox) feedbackBox.style.display = "flex";
    if (btnSim) btnSim.disabled = true;

    const etapas = [
      "Analisando 18 pedidos de Sergipe e suas coordenadas...",
      "Identificando concentração geográfica em Aracaju e Grande Aracaju...",
      "Agrupando pedidos por proximidade e capacidade do veículo (120 kg)...",
      "Calculando sequência ótima de entregas (Algoritmo Nearest Neighbor + 2-Opt)...",
      "Roteirização concluída! 3 rotas organizadas com estimativa de tempo e carga.",
    ];

    for (let i = 0; i < etapas.length; i++) {
      if (feedbackText) feedbackText.textContent = etapas[i];
      await new Promise((r) => setTimeout(r, 600));
    }

    recalcularRotas();
    renderizarInterface();
    inicializarMapa();

    setTimeout(() => {
      if (feedbackBox) feedbackBox.style.display = "none";
      if (btnSim) btnSim.disabled = false;
      if (typeof showToast === "function") {
        showToast("Roteirização inteligente concluída com sucesso!");
      }
    }, 1200);
  }

  // ==========================================================================
  // 13. INICIALIZAÇÃO E RECALCULO DE DADOS
  // ==========================================================================

  function recalcularRotas() {
    const origem = ORIGENS_PRODUTORES[origemAtualId] || ORIGENS_PRODUTORES["1"];

    // 1. Agrupamento em clusters por região e capacidade
    rotasCalculadas = agruparPedidosPorRegiao(
      pedidosCarregados,
      capacidadeVeiculoKg,
    );

    // 2. Otimização de sequência com 2-Opt para cada rota individualmente
    rotasCalculadas.forEach((r) => {
      r.pedidos = otimizarSequenciaRota(origem, r.pedidos);
    });
  }

  async function init() {
    // Clona os dados demonstrativos para preservar o estado durante a sessão
    if (pedidosCarregados.length === 0) {
      pedidosCarregados = JSON.parse(JSON.stringify(PEDIDOS_DEMO));
    }

    recalcularRotas();
    renderizarInterface();

    // Tenta carregar Google Maps ou fallback
    await carregarGoogleMapsScript();
    inicializarMapa();
  }

  // API Pública do Módulo
  return {
    init,
    simularRoteirizacao,
    selecionarRota,
    alterarOrigem,
    alterarVeiculo,
    filtrarPorStatus,
    iniciarRotaAtual,
    marcarComoEntregue,
    abrirNoGoogleMaps,
    recentralizarMapa,
    toggleModoDemonstracao,
    abrirInfoCardPorId,
    fecharInfoCard,
    avancarStatusParadaSelecionada,
    abrirInfoOrigem,
  };
})();

// ============================================================================
// FUNÇÕES DE INTEGRAÇÃO COM A API DO GOOGLE APPS SCRIPT / GOOGLE SHEETS
// ============================================================================

async function buscarPedidos() {
  if (typeof apiCall === "function" && API_URL && API_URL.trim() !== "") {
    try {
      const res = await apiCall("pedidos", "GET");
      if (res && res.success && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn(
        "Logística: API indisponível, utilizando dados locais de demonstração.",
      );
    }
  }
  return window.LogisticaModule ? window.LogisticaModule.pedidosDemo : [];
}

async function buscarProdutores() {
  if (typeof apiCall === "function" && API_URL && API_URL.trim() !== "") {
    try {
      const res = await apiCall("produtores", "GET");
      if (res && res.success && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {}
  }
  return typeof produtores !== "undefined" ? produtores : [];
}

async function salvarRota(rota) {
  if (typeof apiCall === "function" && API_URL && API_URL.trim() !== "") {
    try {
      return await apiCall("salvarRota", "POST", { rota });
    } catch (e) {
      console.error("Erro ao salvar rota na planilha:", e);
    }
  }
  return {
    success: true,
    message: "Rota salva localmente (Modo Demonstração)",
  };
}

async function atualizarStatusEntrega(pedidoId, status) {
  if (typeof apiCall === "function" && API_URL && API_URL.trim() !== "") {
    try {
      return await apiCall("atualizarStatusEntrega", "POST", {
        id: pedidoId,
        status,
      });
    } catch (e) {
      console.error("Erro ao atualizar status na planilha:", e);
    }
  }
  return { success: true, message: "Status atualizado localmente" };
}

window.buscarPedidos = buscarPedidos;
window.buscarProdutores = buscarProdutores;
window.salvarRota = salvarRota;
window.atualizarStatusEntrega = atualizarStatusEntrega;

/**
 * ============================================================================
 * FEIRA LIVRE+ — MÓDULO DE ASSINATURA EXCLUSIVA PARA CLIENTES / CONSUMIDORES
 * Gestão do plano Feira Livre+, cálculo de frete grátis, cupons e economia
 * ============================================================================
 */
window.FeiraMaisModule = (function () {
  // 1. CONFIGURAÇÃO GERAL DO FEIRA LIVRE+ (Preço e limites configuráveis)
  const CONFIG = {
    planoId: "feiramais",
    nome: "Feira Livre+",
    subtitulo: "Mais vantagens para comprar de produtores locais.",
    precoMensal: 9.9, // Configurável no sistema
    precoFormatado: "R$ 9,90",
    ciclo: "mensal",
    pedidoMinimoFreteGratis: 50.0, // Frete grátis em pedidos >= R$ 50,00
    fretePadrao: 8.0,
    cupomExclusivo: "FEIRAMAIS10",
    descontoCupomPercentual: 0.1,
  };

  // 2. ESTADO DA ASSINATURA DO CLIENTE ATUAL (Persistido no localStorage)
  function carregarAssinaturaLocal() {
    try {
      const salvo = localStorage.getItem("FEIRALIVRE_CLIENTE_ASSINATURA");
      if (salvo) return JSON.parse(salvo);
    } catch (e) {}

    // Estado inicial de demonstração (plano gratuito padrão)
    return {
      idAssinatura: "SUB-CLI-FREE-1",
      clienteId: 1,
      plano: "gratuito",
      valor: 0.0,
      status: "gratuita", // gratuita, ativa, pendente, cancelada, vencida, suspensa
      dataInicio: "-",
      dataProximaCobranca: "-",
      dataCancelamento: "",
      gateway: "gratuito",
      gatewaySubscriptionId: "",
      metodo: "Gratuito",
    };
  }

  function salvarAssinaturaLocal(sub) {
    try {
      localStorage.setItem(
        "FEIRALIVRE_CLIENTE_ASSINATURA",
        JSON.stringify(sub),
      );
    } catch (e) {}
  }

  let clienteAssinatura = carregarAssinaturaLocal();

  // Histórico de mensalidades pagas pelo cliente
  let historicoPagamentos = [
    {
      idPagamento: "PAG-CLI-8901",
      idAssinatura: "SUB-CLI-9901",
      clienteId: 1,
      valor: 9.9,
      data: "2026-09-19",
      status: "aprovado",
      metodo: "Cartao de Credito",
    },
  ];

  // Registro de economia
  let economiaRegistro = {
    fretesGratisUsados: 3,
    descontoFreteTotal: 24.0,
    descontoCuponsTotal: 63.5,
    economiaTotal: 87.5,
    mensalidadesPagas: 9.9,
  };

  /**
   * Inicialização do módulo
   */
  async function init() {
    atualizarPrecoExibicao();
    renderizarPainelCliente();
    renderizarEconomia();
    renderizarHistoricoPagamentos();
    atualizarBotaoHeaderStatus();
  }

  function atualizarPrecoExibicao() {
    const elPrice = document.getElementById("fl-price-display");
    if (elPrice) {
      elPrice.textContent = CONFIG.precoMensal.toFixed(2).replace(".", ",");
    }
  }

  /**
   * Verifica se o cliente possui plano Feira Livre+ ativo ou em cancelamento vigente
   */
  function isClienteAssinante() {
    const st = String(clienteAssinatura.status || "gratuita").toLowerCase();
    return st === "ativa" || st === "cancelada";
  }

  /**
   * Consulta pública de status e regras para o restante da aplicação
   */
  function verificarAssinaturaCliente() {
    return {
      isAssinante: isClienteAssinante(),
      status: clienteAssinatura.status,
      plano: clienteAssinatura.plano,
      valor: clienteAssinatura.valor,
      dataProximaCobranca: clienteAssinatura.dataProximaCobranca,
      regraFreteGratis: CONFIG.pedidoMinimoFreteGratis,
    };
  }

  /**
   * Cálculo dos benefícios aplicáveis ao carrinho de compras
   */
  function calcularBeneficiosCarrinho(subtotal) {
    const isAssinante = isClienteAssinante();
    const valSubtotal = parseFloat(subtotal || 0);
    const freteNormal = CONFIG.fretePadrao;

    if (isAssinante && valSubtotal >= CONFIG.pedidoMinimoFreteGratis) {
      return {
        freteFinal: 0.0,
        descontoFrete: freteNormal,
        elegivelFreteGratis: true,
        mensagem: "Frete gratis com Feira Livre+ aplicado!",
      };
    }

    const faltaParaFrete = isAssinante
      ? Math.max(0, CONFIG.pedidoMinimoFreteGratis - valSubtotal)
      : 0;

    return {
      freteFinal: freteNormal,
      descontoFrete: 0.0,
      elegivelFreteGratis: false,
      faltaParaFrete: faltaParaFrete,
      mensagem: isAssinante
        ? `Adicione mais R$ ${faltaParaFrete.toFixed(2).replace(".", ",")} para ganhar Frete Gratis com Feira Livre+`
        : "Economize no frete assinando o Feira Livre+ por R$ 9,90/mes",
    };
  }

  /**
   * Validação de cupom exclusivo para assinantes
   */
  function validarCupomExclusivo(codigo) {
    const cod = String(codigo || "")
      .trim()
      .toUpperCase();
    if (cod === CONFIG.cupomExclusivo) {
      if (!isClienteAssinante()) {
        return {
          valido: false,
          mensagem:
            "O cupom FEIRAMAIS10 e exclusivo para assinantes Feira Livre+. Assine por R$ 9,90/mes para liberar este desconto!",
        };
      }
      return {
        valido: true,
        percentual: CONFIG.descontoCupomPercentual,
        mensagem: "Cupom Feira Livre+ de 10% OFF aplicado com sucesso!",
      };
    }
    return null; // Não é cupom exclusivo do clube
  }

  /**
   * Atualização da interface da seção Minha Assinatura
   */
  function renderizarPainelCliente() {
    const isAssinante = isClienteAssinante();
    const st = clienteAssinatura.status || "gratuita";

    const elTitle = document.getElementById("cli-sub-title");
    const elBadge = document.getElementById("cli-sub-status-badge");
    const elPlanoNome = document.getElementById("cli-sub-plano-nome");
    const elValor = document.getElementById("cli-sub-valor");
    const elProx = document.getElementById("cli-sub-proxima-data");
    const elInicio = document.getElementById("cli-sub-inicio-data");
    const elAlert = document.getElementById("cli-sub-alert");

    const btnAssinar = document.getElementById("btn-cli-assinar-toggle");
    const btnCancelar = document.getElementById("btn-cli-cancelar-sub");
    const btnReativar = document.getElementById("btn-cli-reativar-sub");
    const btnCtaHero = document.getElementById("btn-cta-feiramais");

    if (elTitle)
      elTitle.textContent = isAssinante
        ? "Minha Assinatura Feira Livre+"
        : "Minha Assinatura (Cliente)";
    if (elPlanoNome)
      elPlanoNome.textContent = isAssinante ? "Feira Livre+" : "Plano Gratuito";
    if (elValor)
      elValor.textContent = isAssinante
        ? `${CONFIG.precoFormatado} /mes`
        : "R$ 0,00 /mes";
    if (elProx)
      elProx.textContent = clienteAssinatura.dataProximaCobranca || "-";
    if (elInicio)
      elInicio.textContent = formatarDataBR(clienteAssinatura.dataInicio);

    if (elBadge) {
      elBadge.className = `sub-badge ${st}`;
      const rotulos = {
        ativa: "Ativa",
        gratuita: "Gratuita",
        cancelada: "Cancelada",
        suspensa: "Suspensa",
        vencida: "Vencida",
      };
      elBadge.textContent = rotulos[st] || st.toUpperCase();
    }

    if (elAlert) {
      if (st === "cancelada") {
        elAlert.style.display = "block";
        elAlert.textContent = `Sua assinatura foi cancelada. Os beneficios continuam ativos ate ${clienteAssinatura.dataProximaCobranca}.`;
      } else {
        elAlert.style.display = "none";
      }
    }

    if (btnAssinar) {
      btnAssinar.style.display = isAssinante ? "none" : "inline-block";
      btnAssinar.textContent = "Assinar Feira Livre+";
    }
    if (btnCancelar) {
      btnCancelar.style.display = st === "ativa" ? "inline-block" : "none";
    }
    if (btnReativar) {
      btnReativar.style.display =
        st === "cancelada" || st === "suspensa" ? "inline-block" : "none";
    }
    if (btnCtaHero) {
      btnCtaHero.textContent = isAssinante
        ? "Assinatura Ja Ativa"
        : "Assinar Feira Livre+";
      btnCtaHero.disabled = isAssinante;
      btnCtaHero.style.opacity = isAssinante ? "0.75" : "1";
    }

    const tagGratuito = document.getElementById("tag-plano-gratuito-ativo");
    if (tagGratuito) {
      tagGratuito.textContent = isAssinante
        ? "Plano Basico"
        : "Seu Plano Atual";
    }
  }

  /**
   * Renderiza os dados do painel de economia do cliente
   */
  function renderizarEconomia() {
    const ecoMes = document.getElementById("eco-mes-val");
    const ecoTotal = document.getElementById("eco-total-val");
    const ecoCusto = document.getElementById("eco-custo-val");
    const ecoLiq = document.getElementById("eco-liquida-val");

    if (ecoMes)
      ecoMes.textContent = `R$ ${economiaRegistro.descontoFreteTotal.toFixed(2).replace(".", ",")}`;
    if (ecoTotal)
      ecoTotal.textContent = `R$ ${economiaRegistro.economiaTotal.toFixed(2).replace(".", ",")}`;
    if (ecoCusto)
      ecoCusto.textContent = `R$ ${CONFIG.precoMensal.toFixed(2).replace(".", ",")}`;

    const liquido = Math.max(
      0,
      economiaRegistro.economiaTotal - CONFIG.precoMensal,
    );
    if (ecoLiq)
      ecoLiq.textContent = `R$ ${liquido.toFixed(2).replace(".", ",")}`;
  }

  /**
   * Renderiza a tabela de pagamentos de mensalidade do cliente
   */
  function renderizarHistoricoPagamentos() {
    const tbody = document.getElementById("client-sub-invoices-tbody");
    if (!tbody) return;

    if (!isClienteAssinante() && historicoPagamentos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; color:var(--text-muted); padding:16px;">
            Nenhuma mensalidade registrada. Assine o Feira Livre+ para comecar a economizar!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = historicoPagamentos
      .map(
        (p) => `
      <tr>
        <td style="font-family:monospace; font-weight:600;">${p.idPagamento}</td>
        <td>${formatarDataBR(p.data)}</td>
        <td style="font-weight:700; color:var(--primary);">R$ ${parseFloat(p.valor).toFixed(2).replace(".", ",")}</td>
        <td>${p.metodo}</td>
        <td><span class="sub-badge ativa">Pago</span></td>
      </tr>
    `,
      )
      .join("");
  }

  /**
   * Atualiza o botão de status no topo da página
   */
  function atualizarBotaoHeaderStatus() {
    const btn = document.getElementById("btn-client-clube-status");
    if (!btn) return;

    if (isClienteAssinante()) {
      btn.className = "btn-sub-client-badge active-plus";
      btn.textContent = "Feira Livre+ Ativo";
    } else {
      btn.className = "btn-sub-client-badge";
      btn.textContent = "Feira Livre+";
    }
  }

  /**
   * Fluxo de Checkout de Assinatura do Cliente
   */
  function iniciarCheckout() {
    const modal = document.getElementById("modal-checkout-feiramais");
    if (!modal) return;

    const elData = document.getElementById("chk-cli-proxima-data");
    const prox = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (elData)
      elData.textContent = formatarDataBR(prox.toISOString().split("T")[0]);

    modal.style.display = "flex";
  }

  function fecharCheckout() {
    const modal = document.getElementById("modal-checkout-feiramais");
    if (modal) modal.style.display = "none";
  }

  /**
   * Confirmação da assinatura do cliente (Simulação em Modo Demonstração)
   */
  async function confirmarAssinatura() {
    const btn = document.getElementById("btn-cli-confirmar-sub");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Ativando Feira Livre+...";
    }

    const now = new Date();
    const proxima = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const metodoSelect = document.getElementById("chk-cli-metodo");
    const metodo = metodoSelect ? metodoSelect.value : "Cartao de Credito";

    const novaAssinatura = {
      idAssinatura: "SUB-CLI-" + Date.now().toString().slice(-6),
      clienteId: 1,
      plano: "feiramais",
      valor: CONFIG.precoMensal,
      status: "ativa",
      dataInicio: now.toISOString().split("T")[0],
      dataProximaCobranca: proxima.toISOString().split("T")[0],
      dataCancelamento: "",
      gateway: "simulado_modo_demo",
      gatewaySubscriptionId: "gw_sub_" + Date.now(),
      metodo: metodo,
    };

    // Chamada à API se houver backend configurado
    if (
      typeof apiCall === "function" &&
      typeof API_URL !== "undefined" &&
      API_URL &&
      API_URL.trim() !== ""
    ) {
      try {
        await apiCall("criarAssinaturaCliente", "POST", novaAssinatura);
      } catch (e) {
        console.warn(
          "Assinatura cliente: backend offline, ativado no modo demonstracao local.",
        );
      }
    }

    clienteAssinatura = novaAssinatura;
    salvarAssinaturaLocal(clienteAssinatura);

    // Adiciona fatura ao histórico
    historicoPagamentos.unshift({
      idPagamento: "PAG-CLI-" + Date.now().toString().slice(-4),
      idAssinatura: novaAssinatura.idAssinatura,
      clienteId: 1,
      valor: CONFIG.precoMensal,
      data: now.toISOString().split("T")[0],
      status: "aprovado",
      metodo: metodo,
    });

    fecharCheckout();
    renderizarPainelCliente();
    renderizarEconomia();
    renderizarHistoricoPagamentos();
    atualizarBotaoHeaderStatus();

    // Atualiza o carrinho se estiver aberto
    if (typeof renderCartDrawer === "function") {
      renderCartDrawer();
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = "Confirmar assinatura";
    }

    if (typeof showToast === "function") {
      showToast("Feira Livre+ ativado com sucesso!");
    }
  }

  /**
   * Modal de Cancelamento
   */
  function abrirModalCancelar() {
    const modal = document.getElementById("modal-cancelar-feiramais");
    const elPeriodo = document.getElementById("cancel-cli-periodo");
    if (elPeriodo) {
      elPeriodo.textContent =
        clienteAssinatura.dataProximaCobranca || "fim do periodo pago";
    }
    if (modal) modal.style.display = "flex";
  }

  function fecharCancelar() {
    const modal = document.getElementById("modal-cancelar-feiramais");
    if (modal) modal.style.display = "none";
  }

  async function confirmarCancelamento() {
    clienteAssinatura.status = "cancelada";
    clienteAssinatura.dataCancelamento = new Date().toISOString().split("T")[0];
    salvarAssinaturaLocal(clienteAssinatura);

    if (
      typeof apiCall === "function" &&
      typeof API_URL !== "undefined" &&
      API_URL &&
      API_URL.trim() !== ""
    ) {
      try {
        await apiCall("cancelarAssinaturaCliente", "POST", {
          idAssinatura: clienteAssinatura.idAssinatura,
          clienteId: 1,
        });
      } catch (e) {}
    }

    fecharCancelar();
    renderizarPainelCliente();
    atualizarBotaoHeaderStatus();

    if (typeof showToast === "function") {
      showToast(
        "Sua assinatura foi cancelada. Os beneficios continuam ativos ate o final do periodo ja pago.",
      );
    }
  }

  /**
   * Reativação da assinatura
   */
  async function reativarAssinatura() {
    clienteAssinatura.status = "ativa";
    clienteAssinatura.dataCancelamento = "";
    const proxima = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    clienteAssinatura.dataProximaCobranca = proxima.toISOString().split("T")[0];
    salvarAssinaturaLocal(clienteAssinatura);

    if (
      typeof apiCall === "function" &&
      typeof API_URL !== "undefined" &&
      API_URL &&
      API_URL.trim() !== ""
    ) {
      try {
        await apiCall("reativarAssinaturaCliente", "POST", {
          idAssinatura: clienteAssinatura.idAssinatura,
          clienteId: 1,
        });
      } catch (e) {}
    }

    renderizarPainelCliente();
    atualizarBotaoHeaderStatus();

    if (typeof showToast === "function") {
      showToast("Assinatura Feira Livre+ reativada com sucesso.");
    }
  }

  /**
   * Registra economia adicional quando um pedido com frete grátis ou cupom é finalizado
   */
  function registrarEconomiaPedido(descontoFrete, descontoCupom) {
    if (descontoFrete > 0) {
      economiaRegistro.fretesGratisUsados += 1;
      economiaRegistro.descontoFreteTotal += descontoFrete;
      economiaRegistro.economiaTotal += descontoFrete;
    }
    if (descontoCupom > 0) {
      economiaRegistro.descontoCuponsTotal += descontoCupom;
      economiaRegistro.economiaTotal += descontoCupom;
    }
    renderizarEconomia();
  }

  function formatarDataBR(dataStr) {
    if (!dataStr || dataStr === "-") return "-";
    const p = String(dataStr).split("-");
    if (p.length === 3) return `${p[2]}/${p[1]}/${p[0]}`;
    return dataStr;
  }

  // API Pública do Módulo
  return {
    init,
    isClienteAssinante,
    verificarAssinaturaCliente,
    calcularBeneficiosCarrinho,
    validarCupomExclusivo,
    iniciarCheckout,
    fecharCheckout,
    confirmarAssinatura,
    abrirModalCancelar,
    fecharCancelar,
    confirmarCancelamento,
    reativarAssinatura,
    registrarEconomiaPedido,
    getConfig: () => CONFIG,
  };
})();

window.verificarAssinaturaCliente = function () {
  if (
    window.FeiraMaisModule &&
    typeof window.FeiraMaisModule.verificarAssinaturaCliente === "function"
  ) {
    return window.FeiraMaisModule.verificarAssinaturaCliente();
  }
  return { isAssinante: false, status: "gratuita" };
};

function renderMeusProdutosCadastrados() {
  const tbody = document.getElementById("producer-products-tbody");
  if (!tbody) return;

  const sel = document.getElementById("sel-active-producer");
  const pid = sel ? parseInt(sel.value, 10) : 1;

  const prods = (typeof produtos !== "undefined" ? produtos : []).filter(
    (p) => p.produtor_id === pid,
  );

  if (prods.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; color:var(--text-muted); padding:20px;">
          Nenhum alimento cadastrado por este produtor ate o momento.
        </td>
      </tr>
    `;
    return;
  }

  const catMap = {
    1: "Vegetais",
    2: "Frutas",
    3: "Raizes",
    4: "Folhas",
    5: "Graos",
    6: "Laticinios",
    7: "Ovos",
    8: "Mel",
    9: "Artesanais",
  };

  tbody.innerHTML = prods
    .map(
      (p) => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td>${catMap[p.categoria_id] || "Geral"}</td>
      <td>R$ ${parseFloat(p.preco).toFixed(2).replace(".", ",")} / ${p.unidade}</td>
      <td>${p.estoque} un</td>
      <td>${p.organico ? '<span style="color:#15803D; font-weight:600;">Organico</span>' : "Convencional"}</td>
      <td><span class="sub-badge ativa">Ativo</span></td>
    </tr>
  `,
    )
    .join("");
}

function selecionarProdutorPainel(id) {
  renderMeusProdutosCadastrados();
  const nomes = {
    1: "Fazenda Boa Vista",
    2: "Atelie Fibra Criativa",
    3: "Apiario Doce Mel",
    4: "Sitio Verde Vivo",
    5: "Sabores da Roca",
  };
  if (typeof showToast === "function") {
    showToast(`Painel do produtor: ${nomes[id] || "Produtor " + id}`);
  }
}
