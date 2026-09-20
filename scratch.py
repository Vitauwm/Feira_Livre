# -*- coding: utf-8 -*-
import re

with open('cart.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_func = '''function updateCartCalculations() {
  const subtotal = cart.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  let desconto = appliedCouponData ? appliedCouponData.desconto_calculado : 0;
  let currentShipping = shippingRate;

  let economiaProdutos = 0;
  cart.forEach(item => {
    const prod = produtos.find(p => String(p.id) === String(item.id));
    if (prod && prod.preco_antigo && Number(prod.preco_antigo) > Number(prod.preco)) {
      economiaProdutos += (Number(prod.preco_antigo) - Number(prod.preco)) * item.quantidade;
    }
  });
  
  let economiaFrete = 0;
  const isAssinante = typeof verificarAssinaturaCliente === 'function' ? verificarAssinaturaCliente().isAssinante : false;
  if (isAssinante && subtotal >= 50) {
    economiaFrete = shippingRate;
    currentShipping = 0;
  }

  const totalEconomia = desconto + economiaProdutos + economiaFrete;
  const total = Math.max(0, subtotal + currentShipping - desconto);

  document.getElementById('cart-subtotal-val').textContent = R$ ;
  
  if (economiaFrete > 0) {
    document.getElementById('cart-shipping-val').innerHTML = <span style="text-decoration:line-through; color:var(--text-light); margin-right:6px;">R$ </span> <strong style="color:var(--primary);">Grátis</strong>;
  } else {
    document.getElementById('cart-shipping-val').textContent = R$ ;
  }

  const descLine = document.getElementById('cart-discount-line');
  if (desconto > 0) {
    descLine.style.display = 'flex';
    document.getElementById('cart-discount-val').textContent = - R$ ;
  } else {
    descLine.style.display = 'none';
  }

  document.getElementById('cart-total-val').textContent = R$ ;

  let economyBanner = document.getElementById('cart-economy-banner-wrap');
  if (!economyBanner) {
    economyBanner = document.createElement('div');
    economyBanner.id = 'cart-economy-banner-wrap';
    const footer = document.getElementById('cart-drawer-footer');
    if (footer) {
      footer.insertBefore(economyBanner, footer.firstChild);
    }
  }

  if (totalEconomia > 0) {
    economyBanner.innerHTML = <div class="cart-economy-banner">✨ Você economizou R$  neste pedido!</div>;
  } else {
    economyBanner.innerHTML = '';
  }
}
'''

content = re.sub(r'function updateCartCalculations\(\) \{.*?(?=function aplicarCupom)', lambda m: new_func + '\n', content, flags=re.DOTALL)

with open('cart.js', 'w', encoding='utf-8') as f:
    f.write(content)
