const WA_NUMBER = '6285343556117';
function waLink(product, price){
  const text = `Halo ZHAFRAN, saya mau pesan ${product}. Harga: ${price}. Mohon info selanjutnya.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
function productSvg(title, sub){
  return `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#4a4a4a"/><stop offset=".55" stop-color="#111"/><stop offset="1" stop-color="#dadada"/></linearGradient></defs>
    <rect width="600" height="420" rx="34" fill="#0b0b0b"/><circle cx="500" cy="70" r="140" fill="url(#g)" opacity=".28"/><circle cx="90" cy="350" r="130" fill="#ffffff" opacity=".06"/>
    <rect x="65" y="70" width="470" height="280" rx="26" fill="#151515" stroke="#ffffff" stroke-opacity=".18"/>
    <text x="300" y="190" text-anchor="middle" fill="#f2f2f2" font-family="Poppins,Arial" font-size="34" font-weight="800">${title}</text>
    <text x="300" y="235" text-anchor="middle" fill="#bdbdbd" font-family="Poppins,Arial" font-size="19" font-weight="600">${sub}</text>
  </svg>`;
}
const products = [
  {category:'Coming Soon', name:'Website / Landing Page', price:'Coming Soon', desc:'Website modern untuk profil usaha, katalog produk, promosi, dan halaman penjualan yang terlihat profesional.', features:['Tampilan premium responsif','Cocok untuk brand dan UMKM','Siap dikembangkan sesuai kebutuhan'], img:productSvg('Website','Coming Soon')},
  {category:'Coming Soon', name:'Aplikasi', price:'Coming Soon', desc:'Pengembangan aplikasi untuk kebutuhan bisnis digital, pemesanan, katalog, atau sistem sederhana.', features:['Konsep sesuai kebutuhan bisnis','Desain interface rapi','Pengembangan bertahap'], img:productSvg('Aplikasi','Coming Soon')},
  {category:'Undangan Fisik', name:'Undangan Cetak Premium', price:'Start Rp 3.000 - 12.000', desc:'Undangan cetak all event dengan desain elegan, rapi, dan cocok untuk acara pernikahan, aqiqah, syukuran, serta event keluarga.', features:['Bisa custom desain','Cocok untuk semua acara','Finishing rapi dan profesional'], img:productSvg('Undangan Fisik','Rp 3.000 - 12.000')},
  {category:'Undangan Fisik', name:'Undangan Soft Elegant', price:'Start Rp 3.000 - 12.000', desc:'Pilihan undangan bernuansa lembut dan elegan untuk acara yang ingin terlihat simple namun tetap berkelas.', features:['Nuansa soft premium','Bisa menyesuaikan warna tema','Format siap cetak'], img:productSvg('Soft Elegant','All Event')},
  {category:'Undangan Fisik', name:'Undangan Luxury Dark', price:'Start Rp 3.000 - 12.000', desc:'Desain undangan dengan karakter eksklusif, cocok untuk konsep modern, glamor, dan acara formal.', features:['Tampilan luxury','Detail desain tegas','Cocok untuk acara premium'], img:productSvg('Luxury Dark','Premium Print')},
  {category:'Undangan Fisik', name:'Undangan Minimalis', price:'Start Rp 3.000 - 12.000', desc:'Undangan clean dan minimalis untuk acara yang mengutamakan tampilan sederhana, jelas, dan tetap menarik.', features:['Desain bersih','Mudah dibaca','Cocok untuk berbagai tema'], img:productSvg('Minimalis','Clean Design')},
  {category:'Undangan Fisik', name:'Undangan Custom All Event', price:'Start Rp 3.000 - 12.000', desc:'Undangan cetak yang dapat disesuaikan dengan konsep acara, warna, teks, dan kebutuhan pelanggan.', features:['Custom nama dan detail acara','Bisa request konsep','Harga menyesuaikan bahan'], img:productSvg('Custom Event','Request Design')},
  {category:'Desain Grafis', name:'Desain Grafis Profesional', price:'Start Rp 10.000 - 50.000', desc:'Jasa desain untuk kebutuhan promosi, postingan media sosial, flyer, banner digital, dan materi branding usaha.', features:['Desain rapi dan menarik','Cocok untuk promosi bisnis','File siap pakai'], img:productSvg('Desain Grafis','Rp 10.000 - 50.000')},
  {category:'X Banner', name:'X Banner Pakai Stand', price:'Rp 150.000', desc:'X Banner lengkap dengan stand, cocok untuk promosi toko, event, seminar, pameran, dan kebutuhan branding offline.', features:['Sudah termasuk stand','Ukuran promosi ideal','Siap dipasang'], img:productSvg('X Banner','Pakai Stand')},
  {category:'X Banner', name:'X Banner Tanpa Stand', price:'Rp 100.000', desc:'Cetak X Banner tanpa stand untuk Anda yang sudah memiliki rangka sendiri atau hanya membutuhkan media cetaknya.', features:['Hemat dan praktis','Kualitas cetak jelas','Cocok untuk ganti desain'], img:productSvg('X Banner','Tanpa Stand')},
  {category:'Banner', name:'Banner Outdoor / Indoor', price:'Rp 45.000 / meter', desc:'Banner promosi dengan hasil cetak tajam untuk kebutuhan spanduk toko, acara, campaign, dan informasi usaha.', features:['Harga per meter','Cocok indoor dan outdoor','Desain bisa dibantu'], img:productSvg('Banner','Rp 45.000 / meter')},
  {category:'Digital', name:'Undangan Digital All Event', price:'Rp 100.000', desc:'Undangan digital modern dengan tema all event, mudah dibagikan, praktis, dan terlihat profesional.', features:['Bisa untuk wedding, aqiqah, ulang tahun','Link undangan siap dibagikan','Tema dipisahkan per kategori'], img:productSvg('Undangan Digital','Rp 100.000'), page:'pages/undangan-digital.html'},
  {category:'Reseller', name:'Reseller Undangan Digital', price:'Rp 100.000', desc:'Paket reseller untuk Anda yang ingin jualan undangan digital tanpa ribet. Cukup kirim data client, semua proses kami bantu sampai beres.', features:['Free katalog brand sendiri','Harga all undangan Rp 50.000','Cukup kirim data client','Terima beres'], img:productSvg('Reseller','Rp 100.000'), page:'pages/reseller.html'}
];
const themes = [
  {cat:'Wedding',name:'Wedding Premium Silver',desc:'Tema elegan untuk acara pernikahan modern.',price:'Rp 100.000'},
  {cat:'Wedding',name:'Wedding Black Luxury',desc:'Tema mewah dengan nuansa gelap eksklusif.',price:'Rp 100.000'},
  {cat:'Wedding',name:'Wedding Soft Gold',desc:'Tema lembut bernuansa gold premium.',price:'Rp 100.000'},
  {cat:'Wedding',name:'Wedding Floral Minimalis',desc:'Tema bunga simple dan romantis.',price:'Rp 100.000'},
  {cat:'Aqiqah',name:'Aqiqah Baby Blue',desc:'Tema aqiqah anak laki-laki yang ceria.',price:'Rp 100.000'},
  {cat:'Aqiqah',name:'Aqiqah Soft Pink',desc:'Tema aqiqah anak perempuan yang lembut.',price:'Rp 100.000'},
  {cat:'Ulang Tahun',name:'Birthday Fun Color',desc:'Tema ulang tahun penuh warna dan ceria.',price:'Rp 100.000'},
  {cat:'Ulang Tahun',name:'Birthday Elegant',desc:'Tema ulang tahun dewasa yang rapi dan modern.',price:'Rp 100.000'},
  {cat:'Khitanan',name:'Khitanan Modern',desc:'Tema khitanan simple, bersih, dan formal.',price:'Rp 100.000'},
  {cat:'Tunangan',name:'Engagement Romantic',desc:'Tema tunangan elegan dan romantis.',price:'Rp 100.000'},
  {cat:'Event',name:'Grand Opening',desc:'Tema undangan digital untuk pembukaan usaha.',price:'Rp 100.000'},
  {cat:'Event',name:'Syukuran Premium',desc:'Tema syukuran keluarga dan acara formal.',price:'Rp 100.000'}
];
