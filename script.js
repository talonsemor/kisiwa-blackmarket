/* =========================================================
   E-COMMERCE SCRIPT.JS — UNIVERSAL CART + TOAST + FILTERS
   ========================================================= */

/* -------- Demo Products -------- */
const PRODUCTS = [
  { id: 1, title: "3D stickers", category: "Phones", price: 80, rating: 4.2, image: "images/3D stickers.jpg", desc: "Your phone appearance matters.welcomme to 3D designs at cheap price " },
  { id: 2, title: "119BT", category: "Speakers", price: 900, rating: 4.2, image: "images/119BT.jpg", desc: "Entertainment at your own comfort using both AC & DC" },
  { id: 3, title: "BoomBest LN-1008BT", category: "Speakers", price: 700, rating: 4.0, image: "images/BoomBest LN-1008BT.jpg", desc: "Fashion appearance design with high quality driver unit" },
  { id: 4, title: "BoomBest sound system", category: "Speakers", price: 1300, rating: 4.4, image: "images/BoomBest sound system.jpg", desc: "High bass with balanced power battery for backup" },
  { id: 5, title: "BoomBest speaker 2.0", category: "Speakers", price: 1500, rating: 4.8, image: "images/BoomBest speaker  2.0.jpg", desc: "Large battery for long power storage plus perfect bass" },
  { id: 6, title: "BoomBest speaker BT", category: "Speakers", price: 1900, rating: 4.9, image: "images/BoomBest speaker BT.jpg", desc: "Top sound speaker with powerful battery and multiple speakers thus large sound" },
  { id: 7, title: "BoomBest wireless", category: "Speakers", price: 1500, rating: 4.6, image: "images/BoomBest wireless.jpg", desc: "Good battery,large wireless radius plus large sounds good for trips" },
  { id: 8, title: "Rhema's Cakes", category: "Cakes", price: 800, rating: 4.8, image: "images/Rhema's Cake.jpg", desc: "Freshly baked.Affordable.Made with love.We offer Cream cakes,Wedding & Occasion cakes plus Add-Ons.Price depends.Welcome All"},
  { id: 9, title: "CASTON speaker", category: "Speakers", price: 700, rating: 4.3, image: "images/CASTON speaker.jpg", desc: "Widely trusted because of flexibility ang good sound" },
  { id: 10, title: "D-HORSE Mobile", category: "Phones", price: 1000, rating: 4.6, image: "images/D-HORSE Mobile.jpg", desc: "communication made easy and blexible by D-HORSE phones.New and affordable" },
  { id: 11, title: "designer phone cover", category: "Phones", price: 150, rating: 4.0, image: "images/designer phone cover.jpg", desc: "Your phone appearance matters.we offer solid designer phone covers" },
  { id: 12, title: "epe FP-228", category: "Speakers", price: 1000, rating: 4.4, image: "images/epe FP-228.jpg", desc: "Large battery for long power storage plus perfect bass" },
  { id: 13, title: "Gas burner", category: "Kitchen", price: 200, rating: 3.8, image: "images/Gas burner.jpg", desc: "Brand new good quality gas burner" },
  { id: 14, title: "H@F speaker", category: "Entertainment", price: 650, rating: 4.2, image: "images/HF speaker.jpg", desc: "Flexible size good for indoor and outdoor use" },
  { id: 15, title: "H@F wireless f128", category: "Entertainment", price: 1100, rating: 4.4, image: "images/HF wireless f128.jpg", desc: "DurableWidely trusted because of flexibility ang good sound," },
  { id: 16, title: "Gas Cylinder", category: "Household", price: 1500, rating: 4.2, image: "images/gas.jpg", desc: "Empty gas cylinder in good condition." },
  { id: 17, title: "hp flashdrive 32GB", category: "Accessories", price: 500, rating: 4.6, image: "images/hp flashdrive 32GB.jpg", desc: "Full loaded hp flash scanned no virus" },
  { id: 18, title: "LP speaker 2.0", category: "Speakers", price: 800, rating: 4.6, image: "images/LP speaker 2.0.jpg", desc: "Flexible size good for indoor and outdoor use" },
  { id: 19, title: "LP wireless", category: "Speakers", price: 750, rating: 4.4, image: "images/LP wireless.jpg", desc: "Flexible size good for indoor and outdoor use" },
  { id: 20, title: "Mahel extension", category: "Accessories", price: 250, rating: 4.2, image: "images/Mahel extension.jpg", desc: "Trusted,compound for use with more than 6 electrical items" },
  { id: 21, title: "Maxbest wireless speaker", category: "Speakers", price: 1200, rating: 4.4, image: "images/Maxbest wireless speaker.jpg", desc: "Good battery,large wireless radius plus large sounds good for trips" },
  { id: 22, title: "Normal data cable", category: "Charger", price: 150, rating: 4.0, image: "images/Normal data cable.jpg", desc: "Both normal & type c data transfer cable plus charger available" },
  { id: 23, title: "Padlock", category: "Household", price: 150, rating: 3.8, image: "images/Padlock.jpg", desc: "Security padlocks available" },
  { id: 24, title: "SAMSUNG HEADSET", category: "Entertainment", price: 150, rating: 4.8, image: "images/SAMSUNG HEADSET.jpg", desc: "Enjoy your privacy either media or calls using samsung headset" },
  { id: 25, title: "wireless H@F speaker", category: "Speakers", price: 1200, rating: 4.4, image: "images/wireless HF speaker.jpg", desc: "Large battery for long power storage plus perfect bass" },
  { id: 26, title: "Iconix Woofer", category: "Accessories", price: 2500, rating: 4.0, image: "images/Iconix Woofer.jpg", desc: "Digital sound system with maximum volume in good condition." },
  { id: 27, title: "Kenpoly Chair", category: "Household", price: 300, rating: 4.2, image: "images/Kenpoly Chair.jpg", desc: "Kenpoly always strong plastic chair." },
  { id: 28, title: "Kitchen Table", category: "Furniture", price: 700, rating: 4.6, image: "images/Kitchen Table.jpg", desc: "Good for multitask and also learning." },
  { id: 29, title: "Gas Cylinder", category: "Household", price: 1500, rating: 4.4, image: "images/gas.jpg", desc: "Empty gas cylinder in good condition." },
  { id: 30, title: "Study Table", category: "Furniture", price: 800, rating: 4.1, image: "images/Study Table.jpg", desc: "Your studies are made easier with space to store files." },
];

/* -------- Helpers -------- */
const $ = id => document.getElementById(id);
const formatKSh = n => `KSh${n.toFixed(2)}`;
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const loadCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const saveCart = c => (localStorage.setItem('cart', JSON.stringify(c)), updateCartUI());

/* -------- Cart Elements -------- */
const cartDrawer = $('cartDrawer');
const cartOverlay = $('cartOverlay');
const cartBtn = $('cartBtn');
const closeCartBtn = $('closeCart');
const clearCartBtn = $('clearCart');

/* -------- Universal Cart Toggle -------- */
function openCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.removeAttribute("hidden");
  cartOverlay.removeAttribute("hidden");

  requestAnimationFrame(() => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("visible");
  });

  document.body.classList.add("no-scroll");
  updateCartUI();
}

function closeCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("visible");

  setTimeout(() => {
    cartDrawer.setAttribute("hidden", "");
    cartOverlay.setAttribute("hidden", "");
    document.body.classList.remove("no-scroll");
  }, 300);
}

/* -------- Safe Event Binding -------- */
if (cartBtn) cartBtn.addEventListener('click', e => { e.preventDefault(); setTimeout(openCart, 10); });
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
if (clearCartBtn) clearCartBtn.addEventListener('click', () => { localStorage.removeItem('cart'); updateCartUI(); });

window.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

/* -------- Update Cart UI -------- */
function updateCartUI() {
  const cartItems = $('cartItems');
  const cartTotal = $('cartTotal');
  const cartCount = $('cartCount');
  const cart = loadCart();

  if (cartCount) cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="muted">Empty cart.</p>';
  } else {
    cart.forEach(i => {
      total += i.price * i.qty;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${i.image}">
        <div style="flex:1">
          <strong>${escapeHtml(i.title)}</strong>
          <div class="muted">${formatKSh(i.price)} × ${i.qty}</div>
        </div>`;
      cartItems.appendChild(div);
    });
  }
  if (cartTotal) cartTotal.textContent = formatKSh(total);
}

/* -------- Toast -------- */
function showItemAddedMessage() {
  let msg = document.getElementById('itemAddedMsg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'itemAddedMsg';
    msg.className = 'toast-msg';
    msg.textContent = 'Item added to cart ✅';
    document.body.appendChild(msg);
  }
  msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), 2000);
}

/* -------- Add to Cart -------- */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id == id);
  if (!p) return;
  const cart = loadCart();
  const f = cart.find(c => c.id == id);
  f ? f.qty++ : cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 });
  saveCart(cart);
  showItemAddedMessage();
}

/* -------- Product Grid -------- */
if ($('productsGrid')) {
  const PAGE_SIZE = 8;
  let currentPage = 1, filtered = PRODUCTS.slice();
  const grid = $('productsGrid'), pagination = $('pagination'),
        category = $('categoryFilter'), rating = $('ratingFilter'),
        sort = $('sortSelect'), min = $('minPrice'), max = $('maxPrice'),
        search = $('searchInput'), resultsInfo = $('resultsInfo');

  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    category.appendChild(opt);
  });

  function render() {
    grid.innerHTML = '';
    const start = (currentPage - 1) * PAGE_SIZE;
    const items = filtered.slice(start, start + PAGE_SIZE);
    resultsInfo.textContent = `Showing ${start + 1}-${Math.min(start + items.length, filtered.length)} of ${filtered.length}`;

    if (!items.length) {
      grid.innerHTML = '<p class="muted">No products found.</p>';
      pagination.innerHTML = '';
      return;
    }

    const tmpl = $('productCardTemplate').content;
    items.forEach(p => {
      const node = tmpl.cloneNode(true);
      node.querySelector('.product-img').src = p.image;
      node.querySelector('.product-title').textContent = p.title;
      node.querySelector('.price').textContent = formatKSh(p.price);
      node.querySelector('.rating').textContent = p.rating + '★';
      node.querySelector('.product-desc').textContent = p.desc;
      node.querySelector('.addCart').dataset.id = p.id;
      node.querySelector('.viewBtn').addEventListener('click', () => alert(`${p.title}\n\n${p.desc}`));
      grid.appendChild(node);
    });
    renderPages();
  }

  function renderPages() {
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

  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    const cat = category.value;
    const minVal = +min.value || 0;
    const maxVal = +max.value || Infinity;
    const rat = +rating.value || 0;
    const sortVal = sort.value;

    filtered = PRODUCTS.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (p.price < minVal || p.price > maxVal) return false;
      if (p.rating < rat) return false;
      if (q && !(p.title + p.desc + p.category).toLowerCase().includes(q)) return false;
      return true;
    });

    if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortVal === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

    currentPage = 1;
    render();
  }

  $('applyFilters').onclick = applyFilters;
  $('resetFilters').onclick = () => { category.value = 'all'; rating.value = '0'; min.value = ''; max.value = ''; search.value = ''; filtered = PRODUCTS.slice(); render(); };
  search.oninput = applyFilters;
  $('clearSearchBtn').onclick = () => { search.value = ''; applyFilters(); };

  grid.onclick = e => { if (e.target.matches('.addCart')) addToCart(e.target.dataset.id); };

  updateCartUI();
  render();
}




