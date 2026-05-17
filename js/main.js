
const productGrid = document.getElementById("productGrid");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function waLink(product, price){
  const message = `Halo ZHAFRAN, saya ingin pesan ${product}. Harga: ${price}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts(){
  productGrid.innerHTML = products.map(item => `
    <article class="card reveal">
      <img class="product-logo" src="assets/logo.jpg" alt="Logo ZHAFRAN">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <div class="price">${item.price}</div>
      <a class="btn primary full" href="${waLink(item.title,item.price)}" target="_blank">Pesan Sekarang</a>
    </article>
  `).join("");
}

function revealOnScroll(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.classList.add("show");
    }
  });
}

function parallax(){
  const y = window.scrollY;
  document.querySelectorAll("[data-parallax]").forEach(el=>{
    const speed = Number(el.dataset.parallax || .06);
    el.style.transform = `translateY(${y * speed}px)`;
  });
}

menuBtn?.addEventListener("click",()=>navLinks.classList.toggle("active"));
window.addEventListener("scroll",()=>{revealOnScroll();parallax();});
renderProducts();
revealOnScroll();
