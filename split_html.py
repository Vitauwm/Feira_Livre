import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Helper to extract and replace
def extract_section(regex_pattern, filename, dir_name="components"):
    global content
    os.makedirs(dir_name, exist_ok=True)
    
    match = re.search(regex_pattern, content, re.DOTALL)
    if match:
        extracted = match.group(0)
        with open(f'{dir_name}/{filename}', 'w', encoding='utf-8') as f:
            f.write(extracted)
        # Replace the extracted part with an empty div for the loader
        container_id = filename.replace('.html', '-container')
        # We need a special ID for views vs components, let's just use the filename
        content = content.replace(extracted, f'<div id="{filename.split(".")[0]}-placeholder"></div>')
        print(f"Extracted {filename}")
    else:
        print(f"Could not find pattern for {filename}")

# Components
extract_section(r'<!-- Cabeçalho Principal -->\s*<header class="header-main">.*?</header>', 'header.html')
extract_section(r'<!-- Subnav de Seções Principais -->\s*<nav class="subnav-bar">.*?</nav>', 'subnav.html')
extract_section(r'<!-- Barra Superior de Status Operacional -->\s*<div class="api-status-bar">.*?</div>', 'api-status.html')
extract_section(r'<!-- DRAWER LATERAL DO CARRINHO -->\s*<div class="drawer-backdrop" id="cart-drawer".*?</div>\s*</div>', 'cart-drawer.html')
extract_section(r'<!-- Rodapé Institucional -->\s*<footer class="footer-main">.*?</footer>', 'footer.html')
extract_section(r'<!-- MODAL: CHECKOUT FEIRA LIVRE\+ \(CLIENTE\) -->\s*<div class="modal-overlay" id="modal-checkout-feiramais".*?</div>\s*</div>', 'modal-checkout.html')
extract_section(r'<!-- MODAL: CANCELAR ASSINATURA FEIRA LIVRE\+ -->\s*<div class="modal-overlay" id="modal-cancelar-feiramais".*?</div>\s*</div>', 'modal-cancelar.html')

# Views
extract_section(r'<!-- VIEW 1: HOME -->\s*<section id="view-home" class="view-section active">.*?</section>', 'home.html', 'views')
extract_section(r'<!-- VIEW 2: PRODUTOS \(CATÁLOGO GERAL\) -->\s*<section id="view-produtos" class="view-section">.*?</section>', 'produtos.html', 'views')
extract_section(r'<!-- VIEW 3: PRODUTORES -->\s*<section id="view-produtores" class="view-section">.*?</section>', 'produtores.html', 'views')
extract_section(r'<!-- VIEW 4: CHECKOUT -->\s*<section id="view-checkout" class="view-section">.*?</section>', 'checkout.html', 'views')
extract_section(r'<!-- VIEW 5: RASTREAMENTO -->\s*<section id="view-rastreamento" class="view-section">.*?</section>', 'rastreamento.html', 'views')
extract_section(r'<!-- VIEW: FEIRA LIVRE\+ \(ASSINATURA EXCLUSIVA PARA CLIENTES\) -->\s*<section id="view-feiramais" class="view-section">.*?</section>', 'feiramais.html', 'views')
extract_section(r'<!-- VIEW 6: ÁREA DO PRODUTOR \(100% LIVRE E GRATUITA\) -->\s*<section id="view-produtor-painel" class="view-section">.*?</section>', 'produtor-painel.html', 'views')
extract_section(r'<!-- VIEW 8: LOGÍSTICA & ROTEIRIZAÇÃO INTELIGENTE -->\s*<section id="view-logistica" class="view-section">.*?</section>', 'logistica.html', 'views')
extract_section(r'<!-- VIEW 7: SOBRE -->\s*<section id="view-sobre" class="view-section">.*?</section>', 'sobre.html', 'views')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Split completed.")
