# Feira Livre - Agricultura Familiar de Sergipe

Este repositório contém o código frontend do aplicativo Web "Feira Livre", desenvolvido com JavaScript Vanilla, HTML5 e CSS3, sem necessidade de frameworks pesados (React, Vue, etc) para manter a performance alta em celulares simples. Funciona 100% offline via PWA.

## Estrutura de Arquivos e Componentes

### 1. Núcleo da Aplicação (Scripts Principais)
* **`main.js`**: O coração do projeto. Contém o banco de dados temporário (Mock DB), a inicialização da aplicação, as variáveis globais de estado (carrinho, produtos) e funções gerais como Dark Mode e os Toasts de notificação.
* **`api.js`**: Lida com a simulação de chamadas para o "Backend". Inicialmente preparado para conectar com uma API real (como Google Apps Script), usando a função `apiCall`.
* **`pwa.js`**: Responsável pelo controle de instalação nativa (PWA). É ele que exibe aquele banner "Instalar App" no celular do cliente.
* **`sw.js`**: O Service Worker. Ele avisa o navegador quais arquivos devem ser baixos no cache do celular para que o site continue abrindo mesmo se o usuário estiver sem internet.

### 2. Módulos Específicos (Lógica de Negócio)
* **`products.js`**: Toda a lógica de exibir os produtos na tela, filtrar por categorias, sistema de busca textual e montagem do catálogo.
* **`cart.js`**: Lógica do carrinho de compras. Controla o botão de "Adicionar" e "Remover" itens, atualiza o ícone da sacola no cabeçalho e calcula os subtotais e cupons de desconto.
* **`checkout.js`**: Lida com a finalização do pedido. Lê as informações do formulário de endereço e envia o pedido para a API.
* **`logistica.js`**: O módulo voltado para os entregadores e para a cooperativa. Exibe o painel gerencial de rotas com integração ao Google Maps (simulada) e agrupa entregas por proximidade.
* **`subscription.js`**: Cuida do Clube de Assinatura "Feira Livre+". Controla o painel do assinante, simula ativação de planos e rastreia quanto de frete grátis o cliente já economizou.

### 3. Interface Visual e Estilo
* **`style.css`**: Arquivo único com todo o visual do site (Cores, Fontes, Botões, Responsividade e o Modo Escuro).
* **`index.html`**: O esqueleto da aplicação. Ele é bem vazio e importa os scripts que desenham as partes da tela dinamicamente.

### 4. Pastas de Telas e Pedaços Visuais
Para que o código não ficasse bagunçado, dividimos o HTML em pequenas partes transformadas em scripts JS (`.js`) para contornar problemas de CORS ao abrir o arquivo via clique duplo (`file://`):
* **`components/`**: Pedaços soltos que se repetem (como o `header.js`, `footer.js` e o `cart-drawer.js`).
* **`views/`**: As telas completas do aplicativo (como `home.js`, `checkout.js`, `feiramais.js`, etc.). O site esconde e mostra essas "Views" dependendo de onde o usuário clica.

---

## Como executar o projeto?
Como a arquitetura foi desenhada para facilitar o desenvolvedor, basta **clicar duas vezes no arquivo `index.html`**. 
Nenhum servidor (`npm run start`, Live Server, Apache, PHP) é necessário para a navegação básica, todas as views são montadas na tela instantaneamente.
