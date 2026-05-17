
const rupiahDigital = "Rp 100.000";
const baseUrl = "https://zp.webinvit.id";
const categoryUrl = baseUrl + "/seller/api/v1/categories";
let nextPageUrl = baseUrl + "/seller/api/v1/products/websites?limit=12";
let allThemes = [];
let currentFilters = {acara:"all",style:"all",warna:"all",category:"all"};

const themes = document.getElementById("themes");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchTheme = document.getElementById("searchTheme");
const acaraFilter = document.getElementById("acaraFilter");
const styleFilter = document.getElementById("styleFilter");
const warnaFilter = document.getElementById("warnaFilter");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function waLink(product, price){
  const msg = `Halo ZHAFRAN, saya ingin pesan ${product}. Harga: ${price}`;
  return `https://wa.me/6285343556117?text=${encodeURIComponent(msg)}`;
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
function themeImage(item){
  return item.thumbnail_url || item.thumbnailUrl || item.thumbnail || item.image_url || item.imageUrl || item.image || item.cover_url || item.coverUrl || item.cover || item.preview_url || item.previewUrl || item.preview || item.photo_url || item.photoUrl || item.photo || "";
}
function themeName(item){return item.name || item.title || "Tema Undangan Digital"}
function themeCategory(item){return item.category?.name || item.category_name || item.type || "Tema Premium"}
function themeCategoryId(item){return String(item.category?.id || item.category_id || item.category?.slug || item.category?.name || "all")}
function detectText(item){return `${themeName(item)} ${themeCategory(item)} ${item.color||""} ${item.style||""} ${item.tags||""}`.toLowerCase()}

async function loadCategories(){
  try{
    const res = await fetch(categoryUrl);
    const data = await res.json();
    normalizeItems(data).forEach(cat=>{
      const opt = document.createElement("option");
      opt.value = cat.id || cat.slug || cat.name;
      opt.textContent = cat.name || cat.title || "Kategori";
      categoryFilter.appendChild(opt);
    });
  }catch(e){console.log(e)}
}

function renderThemes(){
  const keyword = (searchTheme.value || "").toLowerCase().trim();
  const filtered = allThemes.filter(item=>{
    const text = detectText(item);
    return (!keyword || text.includes(keyword)) &&
      (currentFilters.category==="all" || themeCategoryId(item)===String(currentFilters.category) || themeCategory(item)===String(currentFilters.category)) &&
      (currentFilters.acara==="all" || text.includes(currentFilters.acara)) &&
      (currentFilters.style==="all" || text.includes(currentFilters.style)) &&
      (currentFilters.warna==="all" || text.includes(currentFilters.warna));
  });
  resultCount.textContent = `${filtered.length} tema tampil`;
  themes.innerHTML = filtered.map(item=>`
    <article class="card reveal show">
      <div style="height:330px;background:#151515;border-radius:22px;overflow:hidden;margin-bottom:18px">
        <img src="${themeImage(item)}" alt="${themeName(item)}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='<div style=\'display:grid;place-items:center;height:100%;color:#aaa;text-align:center;padding:20px\'>Thumbnail mengikuti API tema</div>'">
      </div>
      <span class="kicker">${themeCategory(item)}</span>
      <h3>${themeName(item)}</h3>
      <p>Template undangan digital premium yang bisa disesuaikan dengan kebutuhan acara kamu.</p>
      <div class="price">${rupiahDigital}</div>
      <a class="btn primary full" href="${waLink('Undangan Digital - '+themeName(item), rupiahDigital)}" target="_blank">Pesan Tema Ini</a>
    </article>
  `).join("");
  if(filtered.length === 0){
    themes.innerHTML = `<div class="card" style="grid-column:1/-1;text-align:center">Tema tidak ditemukan. Coba filter lain.</div>`;
  }
}
async function loadThemes(){
  if(!nextPageUrl){loadMoreBtn.style.display="none";return}
  loadMoreBtn.textContent="Memuat Tema...";
  try{
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const items = normalizeItems(data);
    allThemes = [...allThemes, ...items];
    nextPageUrl = getNext(data);
    renderThemes();
  }catch(e){
    allThemes = [
      {name:"Wedding Premium Silver",category:{name:"Wedding"}},
      {name:"Bugis Luxury Wedding",category:{name:"Adat Bugis"}},
      {name:"Aqiqah Soft Gold",category:{name:"Aqiqah"}},
      {name:"Birthday Modern",category:{name:"Birthday"}}
    ];
    renderThemes();
  }
  loadMoreBtn.textContent = nextPageUrl ? "Tema Selengkapnya" : "Semua Tema Tampil";
}
menuBtn?.addEventListener("click",()=>navLinks.classList.toggle("active"));
loadMoreBtn?.addEventListener("click",loadThemes);
searchTheme?.addEventListener("input",renderThemes);
categoryFilter?.addEventListener("change",e=>{currentFilters.category=e.target.value;renderThemes()});
acaraFilter?.addEventListener("change",e=>{currentFilters.acara=e.target.value;renderThemes()});
styleFilter?.addEventListener("change",e=>{currentFilters.style=e.target.value;renderThemes()});
warnaFilter?.addEventListener("change",e=>{currentFilters.warna=e.target.value;renderThemes()});
loadCategories();
loadThemes();
