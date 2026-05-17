const rupiahDigital = "Rp 100.000";
const baseUrl = "https://zp.webinvit.id";
const categoryUrl = baseUrl + "/seller/api/v1/categories";
let nextPageUrl = baseUrl + "/seller/api/v1/products/websites?limit=12";
let allThemes = [];
let currentEvent = "all";
let currentStyle = "all";
let currentColor = "all";

const productGrid = document.getElementById("productGrid");
const themes = document.getElementById("themes");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const eventFilter = document.getElementById("eventFilter");
const styleFilter = document.getElementById("styleFilter");
const colorFilter = document.getElementById("colorFilter");
const searchTheme = document.getElementById("searchTheme");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function waLink(product, price){
  const message = `Halo ZHAFRAN, saya ingin pesan ${product}. Harga: ${price}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts(){
  if(!productGrid) return;
  productGrid.innerHTML = products.map(item => `
    <article class="product-card reveal">
      <div class="product-media">
        <span class="badge">${item.badge}</span>
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="product-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <strong>${item.price}</strong>
        <a class="btn primary full" href="${waLink(item.title, item.price)}" target="_blank">Pesan Sekarang</a>
      </div>
    </article>
  `).join("");
}

function normalizeItems(payload){
  if(Array.isArray(payload)) return payload;
  if(Array.isArray(payload.data)) return payload.data;
  if(Array.isArray(payload.products)) return payload.products;
  if(payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  return [];
}

function getNext(payload){
  return payload?.links?.next || payload?.next_page_url || payload?.data?.next_page_url || null;
}

function addUniqueOption(select, value, text){
  if(!select || !value) return;
  const exists = [...select.options].some(opt => String(opt.value).toLowerCase() === String(value).toLowerCase());
  if(!exists){
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text || value;
    select.appendChild(opt);
  }
}

async function loadCategories(){
  try{
    const res = await fetch(categoryUrl);
    const data = await res.json();
    const categories = normalizeItems(data);
    categories.forEach(cat => addUniqueOption(eventFilter, cat.id || cat.slug || cat.name, cat.name || cat.title || "Kategori"));
  }catch(error){
    console.log("Kategori tidak bisa dimuat", error);
  }
}

function themeImage(item){
  return item.thumbnail_url || item.thumbnailUrl || item.thumbnail || item.image_url || item.imageUrl || item.image || item.cover_url || item.coverUrl || item.cover || item.preview_url || item.previewUrl || item.preview || item.photo_url || item.photoUrl || item.photo || "";
}
function themeName(item){ return item.name || item.title || "Tema Undangan Digital"; }
function themeCategory(item){ return item.category?.name || item.category_name || item.event || item.type || "Tema Premium"; }
function themeCategoryId(item){ return String(item.category?.id || item.category_id || item.category?.slug || item.category?.name || themeCategory(item) || "all"); }
function themeStyle(item){ return item.style?.name || item.style_name || item.style || item.label || "Premium"; }
function themeColor(item){ return item.color?.name || item.color_name || item.color || "Elegant"; }

function hydrateThemeFilters(){
  allThemes.forEach(item => {
    addUniqueOption(eventFilter, themeCategoryId(item), themeCategory(item));
    addUniqueOption(styleFilter, themeStyle(item), themeStyle(item));
    addUniqueOption(colorFilter, themeColor(item), themeColor(item));
  });
}

function renderThemes(){
  if(!themes) return;
  const keyword = (searchTheme?.value || "").toLowerCase();
  const filtered = allThemes.filter(item => {
    const text = [themeName(item), themeCategory(item), themeStyle(item), themeColor(item)].join(" ").toLowerCase();
    const matchSearch = text.includes(keyword);
    const matchEvent = currentEvent === "all" || themeCategoryId(item) === String(currentEvent) || themeCategory(item) === String(currentEvent);
    const matchStyle = currentStyle === "all" || themeStyle(item) === String(currentStyle);
    const matchColor = currentColor === "all" || themeColor(item) === String(currentColor);
    return matchSearch && matchEvent && matchStyle && matchColor;
  });

  themes.innerHTML = filtered.map(item => `
    <article class="theme-card reveal show">
      <div class="theme-thumb">
        <img src="${themeImage(item)}" alt="${themeName(item)}" loading="lazy" onerror="this.closest('.theme-thumb').classList.add('empty')">
      </div>
      <div class="theme-body">
        <span>${themeCategory(item)}</span>
        <h3>${themeName(item)}</h3>
        <p>Style: ${themeStyle(item)} • Warna: ${themeColor(item)}</p>
        <strong>${rupiahDigital}</strong>
        <a class="btn primary full" href="${waLink('Undangan Digital - ' + themeName(item), rupiahDigital)}" target="_blank">Pesan Tema Ini</a>
      </div>
    </article>
  `).join("") || `<div class="empty-state">Tema tidak ditemukan. Coba kata kunci lain.</div>`;
}

function fallbackThemes(){
  allThemes = [
    {name:"Wedding Premium Silver", category:{name:"Wedding"}, style:"Luxury", color:"Silver"},
    {name:"Aqiqah Elegant", category:{name:"Aqiqah"}, style:"Elegant", color:"Gold"},
    {name:"Birthday Modern", category:{name:"Birthday"}, style:"Modern", color:"Blue"},
    {name:"Khitanan Exclusive", category:{name:"Khitanan"}, style:"Classic", color:"Green"},
    {name:"Engagement Luxury", category:{name:"Engagement"}, style:"Luxury", color:"Rose"},
    {name:"Syukuran Minimalis", category:{name:"Syukuran"}, style:"Minimalis", color:"White"}
  ];
  hydrateThemeFilters();
  renderThemes();
}

async function loadThemes(){
  if(!nextPageUrl){ if(loadMoreBtn) loadMoreBtn.style.display = "none"; return; }
  if(loadMoreBtn) loadMoreBtn.textContent = "Memuat Tema...";
  try{
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const items = normalizeItems(data);
    if(items.length === 0 && allThemes.length === 0) fallbackThemes();
    else{
      allThemes = [...allThemes, ...items];
      nextPageUrl = getNext(data);
      hydrateThemeFilters();
      renderThemes();
    }
  }catch(error){
    console.log("Tema API tidak bisa dimuat", error);
    if(allThemes.length === 0) fallbackThemes();
  }
  if(loadMoreBtn){
    loadMoreBtn.textContent = nextPageUrl ? "Tema Selengkapnya" : "Semua Tema Tampil";
    if(!nextPageUrl) loadMoreBtn.disabled = true;
  }
}

function revealOnScroll(){
  document.querySelectorAll('.reveal').forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 70) el.classList.add('show');
  });
}

function parallaxMove(){
  const scrolled = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = Number(el.dataset.parallax || 0.05);
    el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
  });
}

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("active"));
loadMoreBtn?.addEventListener("click", loadThemes);
eventFilter?.addEventListener("change", e => {currentEvent = e.target.value; renderThemes();});
styleFilter?.addEventListener("change", e => {currentStyle = e.target.value; renderThemes();});
colorFilter?.addEventListener("change", e => {currentColor = e.target.value; renderThemes();});
searchTheme?.addEventListener("input", renderThemes);
window.addEventListener('scroll', () => { revealOnScroll(); parallaxMove(); });

renderProducts();
loadCategories();
loadThemes();
revealOnScroll();
parallaxMove();
