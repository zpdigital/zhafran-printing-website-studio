const baseUrl = "https://zp.webinvit.id";

let nextPageUrl =
baseUrl + "/seller/api/v1/products/websites?limit=12";

const themeContainer =
document.getElementById("themes");

async function loadThemes(){

try{

const response =
await fetch(nextPageUrl);

const data =
await response.json();

data.data.forEach(item=>{

const card = `
<div class="theme-card">

<img src="${item.thumbnail}" alt="${item.name}">

<h3>${item.name}</h3>

<p>${item.category?.name || "Tema Premium"}</p>

<div class="price">
Rp100.000
</div>

<a href="https://wa.me/6285343556117?text=Halo%20ZHAFRAN,%20Saya%20ingin%20pesan%20tema%20${encodeURIComponent(item.name)}"
class="btn-order"
target="_blank">

Pesan Sekarang

</a>

</div>
`;

themeContainer.innerHTML += card;

});

}catch(err){

console.log(err);

}

}

loadThemes();
