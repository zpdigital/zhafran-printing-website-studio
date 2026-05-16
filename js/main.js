const productGrid = document.querySelector('#productGrid');
const themeGrid = document.querySelector('#themeGrid');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const year = document.querySelector('#year');
if(year) year.textContent = new Date().getFullYear();
if(navToggle){ navToggle.addEventListener('click',()=>navMenu.classList.toggle('open')); }
function renderProducts(){
  if(!productGrid) return;
  productGrid.innerHTML = products.map(p=>{
    const link = p.page || waLink(p.name,p.price);
    const target = p.page ? '' : 'target="_blank"';
    const btnText = p.page ? 'Lihat Detail & Pesan' : 'Pesan Sekarang';
    return `<article class="product-card reveal"><div class="product-img">${p.img}</div><span class="tag">${p.category}</span><h3>${p.name}</h3><div class="price">${p.price}</div><p>${p.desc}</p><div class="features">${p.features.map(f=>`<span>${f}</span>`).join('')}</div><a class="btn order-btn" href="${link}" ${target}>${btnText}</a></article>`;
  }).join('');
}
function renderThemes(filter='Semua'){
  if(!themeGrid) return;
  const list = filter==='Semua' ? themes : themes.filter(t=>t.cat===filter);
  themeGrid.innerHTML = list.map(t=>`<article class="theme-card reveal"><div class="theme-img">${t.name}</div><h3>${t.name}</h3><p>${t.cat}</p><p>${t.desc}</p><div class="price">${t.price}</div><a class="btn order-btn" href="${waLink('Undangan Digital - '+t.name,t.price)}" target="_blank">Pesan Tema Ini</a></article>`).join('');
  observeReveal();
}
function initFilters(){
  const bar = document.querySelector('#filterBar');
  if(!bar) return;
  const cats = ['Semua',...new Set(themes.map(t=>t.cat))];
  bar.innerHTML = cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('');
  bar.addEventListener('click',e=>{
    if(!e.target.matches('.filter-btn')) return;
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    renderThemes(e.target.dataset.cat);
  });
}
function observeReveal(){
  const io = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('show')})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
renderProducts();initFilters();renderThemes();observeReveal();
