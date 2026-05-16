const rupiahDigital = "Rp 100.000";
const baseUrl = "https://zp.webinvit.id";
const categoryUrl = baseUrl + "/seller/api/v1/categories";
let nextPageUrl = baseUrl + "/seller/api/v1/products/websites?limit=12";
let allThemes = [];
let currentCategoryId = "all";

const productGrid = document.getElementById("productGrid");
const themes = document.getElementById("themes");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const categoryFilter = document.getElementById("categoryFilter");
const searchTheme = document.getElementById("searchTheme");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function waLink(product, price){
  const message = `Halo ZHAFRAN, saya ingin pesan ${product}. Harga: ${price}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts(){
  productGrid.innerHTML = products.map(item => `
    <article class="product-card reveal">
      <div class="badge">${item.badge}</div>
      <img src="${item.image}" alt="${item.title}" loading="lazy">
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

async function loadCategories(){
  try{
    const res = await fetch(categoryUrl);
    const data = await res.json();
    const categories = normalizeItems(data);
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat.id || cat.slug || cat.name;
      opt.textContent = cat.name || cat.title || "Kategori";
      categoryFilter.appendChild(opt);
    });
  }catch(error){
    console.log("Kategori tidak bisa dimuat", error);
  }
}

function themeImage(item){
  return item.thumbnail || item.image || item.cover || item.preview || item.photo || "assets/logo.jpg";
}

function themeName(item){
  return item.name || item.title || "Tema Undangan Digital";
}

function themeCategory(item){
  return item.category?.name || item.category_name || item.type || "Tema Premium";
}

function themeCategoryId(item){
  return String(item.category?.id || item.category_id || item.category?.slug || item.category?.name || "all");
}

function renderThemes(){
  const keyword = (searchTheme.value || "").toLowerCase();
  const filtered = allThemes.filter(item => {
    const matchSearch = themeName(item).toLowerCase().includes(keyword) || themeCategory(item).toLowerCase().includes(keyword);
    const matchCategory = currentCategoryId === "all" || themeCategoryId(item) === String(currentCategoryId) || themeCategory(item) === String(currentCategoryId);
    return matchSearch && matchCategory;
  });

  themes.innerHTML = filtered.map(item => `
    <article class="theme-card reveal">
      <img src="${themeImage(item)}" alt="${themeName(item)}" loading="lazy" onerror="this.src='assets/logo.jpg'">
      <div class="theme-body">
        <span>${themeCategory(item)}</span>
        <h3>${themeName(item)}</h3>
        <strong>${rupiahDigital}</strong>
        <a class="btn primary full" href="${waLink('Undangan Digital - ' + themeName(item), rupiahDigital)}" target="_blank">Pesan Tema Ini</a>
      </div>
    </article>
  `).join("");
}

function fallbackThemes(){
  allThemes = [
    {name:"Wedding Premium Silver", category:{name:"Wedding"}, thumbnail:"assets/logo.jpg"},
    {name:"Aqiqah Elegant", category:{name:"Aqiqah"}, thumbnail:"assets/logo.jpg"},
    {name:"Birthday Modern", category:{name:"Birthday"}, thumbnail:"assets/logo.jpg"},
    {name:"Khitanan Exclusive", category:{name:"Khitanan"}, thumbnail:"assets/logo.jpg"},
    {name:"Engagement Luxury", category:{name:"Engagement"}, thumbnail:"assets/logo.jpg"},
    {name:"Syukuran Minimalis", category:{name:"Syukuran"}, thumbnail:"assets/logo.jpg"}
  ];
  renderThemes();
}

async function loadThemes(){
  if(!nextPageUrl){
    loadMoreBtn.style.display = "none";
    return;
  }
  loadMoreBtn.textContent = "Memuat...";
  try{
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const items = normalizeItems(data);
    if(items.length === 0 && allThemes.length === 0){
      fallbackThemes();
    }else{
      allThemes = [...allThemes, ...items];
      nextPageUrl = getNext(data);
      renderThemes();
    }
  }catch(error){
    console.log("Tema API tidak bisa dimuat", error);
    if(allThemes.length === 0) fallbackThemes();
  }
  loadMoreBtn.textContent = nextPageUrl ? "Tema Selengkapnya" : "Semua Tema Tampil";
  if(!nextPageUrl) loadMoreBtn.disabled = true;
}

function revealOnScroll(){
  document.querySelectorAll('.reveal').forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.classList.add('show');
    }
  });
}

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("active"));
loadMoreBtn?.addEventListener("click", loadThemes);
categoryFilter?.addEventListener("change", e => {currentCategoryId = e.target.value; renderThemes();});
searchTheme?.addEventListener("input", renderThemes);
window.addEventListener('scroll', revealOnScroll);

renderProducts();
loadCategories();
loadThemes();
revealOnScroll();
