// ============================================
// ÉCLAT — Sonia Rossi Chocolatier
// JavaScript: Loader, Cart, Marquee, Animations
// ============================================

// ---- Loading Screen ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  fill.style.width = '100%';
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);
});

// ---- Navbar ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ---- Hamburger ----
document.getElementById('hamburger').addEventListener('click', () => {
  const nl = document.getElementById('navLinks');
  const isOpen = nl.style.display === 'flex';
  nl.style.display = isOpen ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'absolute';
  nl.style.top = '100%';
  nl.style.left = '0';
  nl.style.right = '0';
  nl.style.background = 'rgba(255,255,255,0.98)';
  nl.style.padding = '2rem 3rem';
  nl.style.gap = '1.5rem';
  nl.style.borderTop = '1px solid rgba(10,10,10,0.08)';
});

// ---- Scroll Reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Cart System ----
let cart = [];
const drawer = document.getElementById('cartDrawer');
const mask = document.getElementById('cartMask');
const cdItems = document.getElementById('cdItems');
const cdFooter = document.getElementById('cdFooter');
const cartBadge = document.getElementById('cartBadge');
const cdTotal = document.getElementById('cdTotal');

function openCart() {
  drawer.classList.add('open');
  mask.classList.add('active');
}

function closeCart() {
  drawer.classList.remove('open');
  mask.classList.remove('active');
}

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartMask').addEventListener('click', closeCart);

function renderCart() {
  cartBadge.textContent = cart.length;
  if (cart.length === 0) {
    cdItems.innerHTML = '<p class="cd-empty">Your bag is empty.</p>';
    cdFooter.style.display = 'none';
    return;
  }
  cdFooter.style.display = 'block';
  let total = 0;
  cdItems.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <div class="cd-entry">
        <span class="cd-entry-name">${item.name}</span>
        <span class="cd-entry-price">$${item.price}</span>
        <button class="cd-entry-remove" onclick="removeFromCart(${i})">✕</button>
      </div>
    `;
  }).join('');
  cdTotal.textContent = '$' + total.toLocaleString();
}

window.addToCart = function(btn) {
  const card = btn.closest('.shop-card');
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);
  cart.push({ name, price });
  renderCart();
  openCart();
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.style.background = '#2d5a3d';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
  }, 1500);
};

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  renderCart();
};

document.getElementById('cdCheckout').addEventListener('click', () => {
  const btn = document.getElementById('cdCheckout');
  btn.textContent = 'Inquiry Submitted! We\'ll contact you shortly.';
  btn.style.background = '#2d5a3d';
  cart = [];
  setTimeout(() => {
    renderCart();
    closeCart();
    btn.textContent = 'Proceed to Inquiry';
    btn.style.background = '';
  }, 3000);
});

// ---- Smooth scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Parallax on hero ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroImg = document.querySelector('.hg-main img');
  if (heroImg) heroImg.style.transform = `scale(1.08) translateY(${scrollY * 0.1}px)`;
});

// ---- Collection items hover accent ----
document.querySelectorAll('.cs-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-4px)';
    item.style.transition = 'transform 0.3s ease';
    item.style.boxShadow = '0 12px 40px rgba(10,10,10,0.12)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
    item.style.boxShadow = 'none';
  });
});
