const nomorWA = "6283153215528";
let keranjang = [];

function cariProduk() {
    var kataKunci = document.getElementById("searchInput").value.toLowerCase();
    var semuaProduk = document.getElementsByClassName("product-card");

    for (var i = 0; i < semuaProduk.length; i++) {
        var judulProduk = semuaProduk[i].getElementsByClassName("product-title")[0];
        if (judulProduk) {
            var teksJudul = judulProduk.innerText.toLowerCase();
            if (teksJudul.includes(kataKunci)) {
                semuaProduk[i].style.display = "flex"; 
            } else {
                semuaProduk[i].style.display = "none"; 
            }
        }
    }
}

function tambahKeKeranjang(namaProduk) {
    keranjang.push(namaProduk);
    updateNotifikasiKeranjang();
    
    // Tampilkan notifikasi pop-up kecil di layar
    var notif = document.createElement("div");
    notif.innerText = "+1 " + namaProduk;
    notif.style.position = "fixed";
    notif.style.top = "20px";
    notif.style.left = "50%";
    notif.style.transform = "translateX(-50%)";
    notif.style.backgroundColor = "#333";
    notif.style.color = "white";
    notif.style.padding = "10px 20px";
    notif.style.borderRadius = "20px";
    notif.style.zIndex = "9999";
    document.body.appendChild(notif);
    
    setTimeout(function() {
        notif.remove();
    }, 1500);
}

function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    updateNotifikasiKeranjang();
    tampilkanIsiKeranjang(); 
}

function updateNotifikasiKeranjang() {
    var floatCart = document.getElementById("floatingCart");
    var badge = document.getElementById("floatingBadge");
    
    if (keranjang.length > 0) {
        floatCart.style.display = "flex";
        badge.innerText = keranjang.length;
    } else {
        floatCart.style.display = "none";
        // Tutup modal jika kosong
        tutupKeranjang();
    }
}

function bukaKeranjang() {
    if (keranjang.length === 0) return;
    document.getElementById("cartModal").style.display = "block";
    tampilkanIsiKeranjang();
}

function tutupKeranjang() {
    document.getElementById("cartModal").style.display = "none";
}

function tampilkanIsiKeranjang() {
    var cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; 
    
    keranjang.forEach(function(item, index) {
        var li = document.createElement("li");
        li.innerHTML = item + ' <button class="remove-btn" onclick="hapusDariKeranjang(' + index + ')">Hapus</button>';
        cartList.appendChild(li);
    });
}

function checkoutWhatsApp() {
    var daftarPesanan = keranjang.map(function(item, index) {
        return (index + 1) + ". " + item;
    }).join("\n");
    
    var pesan = "Halo AYDEN STORE, saya ingin memesan:\n\n" + daftarPesanan + "\n\nMohon informasi total harga dan ketersediaan. Terima kasih.";
    var pesanFormatURL = encodeURIComponent(pesan);
    window.open("https://wa.me/" + nomorWA + "?text=" + pesanFormatURL, "_blank");
}

function bukaWhatsApp() {
    var nama = document.getElementById("namaPengirim").value;
    if (nama.trim() === "") {
        alert("Silakan isi nama Anda.");
        return;
    }
    var jenis = document.getElementById("jenisPesan").value;
    var pesan = jenis === "tanya" ? 
        "Halo AYDEN STORE, saya " + nama + ", ingin bertanya mengenai layanan toko." : 
        "Halo AYDEN STORE, saya " + nama + ". Berikut lampiran dokumen/foto (Tunggu sebentar...).";
    
    window.open("https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan), "_blank");
}
