let deferredPrompt;

// Cria o banner do PWA que será inserido na tela
function criarBannerPWA() {
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = `
    display: none;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--surface);
    color: var(--text-main);
    padding: 12px 16px;
    border-radius: var(--radius-md);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    align-items: center;
    gap: 12px;
    border: 1px solid var(--border-light);
    width: 90%;
    max-width: 400px;
  `;

  banner.innerHTML = `
    <img src="images/logo.png" alt="Icon" style="width: 32px; height: 32px; border-radius: 4px;">
    <div style="flex: 1;">
      <h4 style="margin: 0; font-size: 14px; color: var(--primary-dark);">Instalar App</h4>
      <p style="margin: 2px 0 0; font-size: 12px; color: var(--text-muted);">Acesse a Feira Livre mais rápido!</p>
    </div>
    <button id="pwa-install-btn" style="
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
    ">Instalar</button>
    <button id="pwa-close-btn" style="
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 18px;
      cursor: pointer;
      padding: 0 4px;
    ">&times;</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      banner.style.display = 'none';
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    }
  });

  document.getElementById('pwa-close-btn').addEventListener('click', () => {
    banner.style.display = 'none';
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Impede o prompt padrão
  e.preventDefault();
  // Guarda o evento para disparar depois
  deferredPrompt = e;
  
  // Exibe o nosso banner personalizado se ele existir, senão cria e exibe
  let banner = document.getElementById('pwa-install-banner');
  if (!banner) {
    criarBannerPWA();
    banner = document.getElementById('pwa-install-banner');
  }
  banner.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  // Limpa o prompt e esconde o banner
  deferredPrompt = null;
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.style.display = 'none';
  }
  console.log('PWA foi instalado com sucesso');
});
