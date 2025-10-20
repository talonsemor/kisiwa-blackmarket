/* -------- script.js (clean final version) -------- */

/* Demo products */
const PRODUCTS = [
  { id: 1, title: "Afrigas 13kg", category: "Kitchen", price: 2800, rating: 4.2,
    image: "images/Afrigas 13kg.jpg", desc: "Empty gas cylinder in good condition and good for commercial use." },
  { id: 2, title: "Gas Cylinder", category: "Household", price: 1500, rating: 4.4,
    image: "images/gas.jpg", desc: "Empty gas cylinder in good condition." },
  { id: 3, title: "Iconix Woofer", category: "Accessories", price: 2500, rating: 4.0,
    image: "images/Iconix Woofer.jpg", desc: "Digital sound system with maximum volume in good condition." },
  { id: 4, title: "Kenpoly Chair", category: "Household", price: 300, rating: 4.2,
    image: "images/Kenpoly Chair.jpg", desc: "Kenpoly always strong plastic chair." },
  { id: 5, title: "Kitchen Table", category: "Furniture", price: 700, rating: 4.6,
    image: "images/Kitchen Table.jpg", desc: "Good for multitask and also learning." },
  { id: 6, title: "One Seater Sofa", category: "Furniture", price: 4500, rating: 4.7,
    image: "images/One Seater Sofa.jpg", desc: "Be your own boss and enjoy the comfort of your home." },
  { id: 7, title: "Study Table", category: "Furniture", price: 800, rating: 4.1,
    image: "images/Study Table.jpg", desc: "Your studies are made easier with space to store files." },
  { id: 8, title: "TCL smart 32inch", category: "Accessories", price: 8000, rating: 4.6,
    image: "images/TCL smart 32inch.jpg", desc: "One month used, good as new." },
  { id: 9, title: "Toshiba disk drive", category: "Computers", price: 3300, rating: 4.0,
    image: "images/Toshiba disk drive.jpg", desc: "1TB and 500GB both in good health, Windows 11 installed." },
];

/* Helpers */
const $ = id => document.getElementById(id);
const formatKSh = n => `KSh${n.toFixed(2)}`;
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => (
  { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]
));

/* Cart storage helpers */
function loadCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }

/* Cart elements */
const cartDrawer = $('cartDrawer');
const closeCartBtn = $('closeCart');
const clearCartBtn = $('clearCart');
const cartBtn = $('cartBtn');
const cartOverlay = $('cartOverlay');

/* ---------- Main Page logic ---------- */
if ($('productsGrid')) {
  const PAGE_SIZE = 8;
  let currentPage = 1, filtered = PRODUCTS.slice();

  const categoryFilter = $('categoryFilter');
  const ratingFilter = $('ratingFilter');
  const sortSelect = $('sortSelect');
  const minPriceEl = $('minPrice');
  const maxPriceEl = $('maxPrice');
  const searchInput = $('searchInput');
  const productsGrid = $('productsGrid');
  const resultsInfo = $('resultsInfo');
  const pagination = $('pagination');

  // Populate category dropdown
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    categoryFilter.appendChild(opt);
  });

  // Render products
  function render(){
    productsGrid.innerHTML = '';
    const start = (currentPage - 1) * PAGE_SIZE;
    const items = filtered.slice(start, start + PAGE_SIZE);
    resultsInfo.textContent = `Showing ${start + 1}-${Math.min(start + items.length, filtered.length)} of ${filtered.length}`;
    const tmpl = $('productCardTemplate').content;
    if (!items.length) {
      productsGrid.innerHTML = '<p class="muted">No products found.</p>';
      pagination.innerHTML = '';
      return;
    }
    items.forEach(p => {
      const node = tmpl.cloneNode(true);
      node.querySelector('.product-img').src = p.image;
      node.querySelector('.product-title').textContent = p.title;
      node.querySelector('.price').textContent = formatKSh(p.price);
      node.querySelector('.rating').textContent = p.rating + '★';
      node.querySelector('.product-desc').textContent = p.desc;
      node.querySelector('.addCart').dataset.id = p.id;
      node.querySelector('.viewBtn').addEventListener('click', () => alert(`${p.title}\n\n${p.desc}`));
      productsGrid.appendChild(node);
    });
    renderPages();
  }

  function renderPages(){
    pagination.innerHTML = '';
    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    for (let i = 1; i <= pages; i++) {
      const b = document.createElement('button');
      b.textContent = i;
      b.className = 'btn small';
      if (i === currentPage) b.disabled = true;
      b.onclick = () => { currentPage = i; render(); };
      pagination.appendChild(b);
    }
  }

  // Filters
  function applyFilters(){
    const q = searchInput.value.trim().toLowerCase();
    const cat = categoryFilter.value;
    const min = +minPriceEl.value || 0;
    const max = +maxPriceEl.value || Infinity;
    const rat = +ratingFilter.value || 0;
    const sort = sortSelect.value;

    filtered = PRODUCTS.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (p.price < min || p.price > max) return false;
      if (p.rating < rat) return false;
      if (q && !(p.title.toLowerCase() + p.desc.toLowerCase() + p.category.toLowerCase()).includes(q)) return false;
      return true;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

    currentPage = 1; render();
  }

  $('applyFilters').onclick = applyFilters;
  $('resetFilters').onclick = () => {
    categoryFilter.value = 'all';
    ratingFilter.value = '0';
    minPriceEl.value = '';
    maxPriceEl.value = '';
    searchInput.value = '';
    filtered = PRODUCTS.slice();
    render();
  };
  searchInput.oninput = () => applyFilters();
  $('clearSearchBtn').onclick = () => { searchInput.value = ''; applyFilters(); };

  // Cart handling
  const cartItems = $('cartItems');
  const cartTotal = $('cartTotal');
  const cartCount = $('cartCount');

  function updateCartUI(){
    const cart = loadCart();
    if (cartCount) cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
    if (!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    if (!cart.length) { cartItems.innerHTML = '<p class="muted">Empty cart.</p>'; }
    else cart.forEach(i => {
      total += i.price * i.qty;
      const d = document.createElement('div');
      d.className = 'cart-item';
      d.innerHTML = `
        <img src="${i.image}">
        <div style="flex:1">
          <strong>${escapeHtml(i.title)}</strong>
          <div class="muted">${formatKSh(i.price)} × ${i.qty}</div>
        </div>`;
      cartItems.appendChild(d);
    });
    if (cartTotal) cartTotal.textContent = formatKSh(total);
  }

  function addToCart(id){
    const p = PRODUCTS.find(x => x.id == id);
    if (!p) return;
    const cart = loadCart();
    const f = cart.find(c => c.id == id);
    f ? f.qty++ : cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 });
    saveCart(cart);
  }

  productsGrid.onclick = e => {
    if (e.target.matches('.addCart')) addToCart(e.target.dataset.id);
  };

  updateCartUI();
  render();

  // Dark mode toggle
  const darkBtn = $('darkToggle');
  if (darkBtn) {
    if (localStorage.dark === '1') document.body.classList.add('dark');
    darkBtn.onclick = () => {
      document.body.classList.toggle('dark');
      localStorage.dark = document.body.classList.contains('dark') ? '1' : '0';
    };
  }

  // Auth
  const auth = $('authBtn');
  if (auth) {
    const u = localStorage.currentUser;
    auth.textContent = u ? 'Logout' : 'Login';
    auth.onclick = e => {
      if (u) { e.preventDefault(); localStorage.removeItem('currentUser'); location.reload(); }
    };
  }
}

/* ---------- Cart overlay logic (global) ---------- */
function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('active');
  cartDrawer.hidden = false;
  cartOverlay.hidden = false;
  updateCartUI();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('active');
  setTimeout(() => {
    cartDrawer.hidden = true;
    cartOverlay.hidden = true;
  }, 350);
}

cartBtn.onclick = openCart;
closeCartBtn.onclick = closeCart;
cartOverlay.onclick = closeCart;

clearCartBtn.onclick = () => {
  localStorage.removeItem('cart');
  updateCartUI();
};

// Ensure cart count visible
updateCartUI();
