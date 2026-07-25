// Nomor WhatsApp Admin AYDEN STORE
const nomorWA = "6282386130512";

// Array untuk menyimpan daftar belanja
let keranjang = [];

// ==========================================
// FUNGSI PENCARIAN (LIVE SEARCH)
// ==========================================
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

// ==========================================
// SISTEM KERANJANG BELANJA
// ==========================================
function tambahKeKeranjang(namaProduk) {
    keranjang.push(namaProduk);
    updateNotifikasiKeranjang();
    
    // Tampilkan notifikasi pop-up kecil di layar saat ditambah
    var notif = document.createElement("div");
    notif.innerText = "+1 " + namaProduk;
    notif.style.position = "fixed";
    notif.style.top = "80px"; /* Diturunkan sedikit agar tidak tertutup header */
    notif.style.left = "0";
    notif.style.right = "0";
    notif.style.margin = "0 auto"; /* Otomatis ke tengah */
    notif.style.width = "max-content"; /* Ukuran menyesuaikan teks */
    notif.style.maxWidth = "80%";
    notif.style.textAlign = "center";
    notif.style.backgroundColor = "#333";
    notif.style.color = "white";
    notif.style.padding = "10px 20px";
    notif.style.borderRadius = "20px";
    notif.style.zIndex = "10000";
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
    kembaliKeKeranjang(); // Pastikan saat ditutup, tampilan kembali ke daftar awal
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

// ==========================================
// ALUR CHECKOUT QRIS & WA
// ==========================================

// Fungsi mengubah isi pop-up menjadi gambar QRIS
function tampilkanLayarQRIS() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    document.getElementById("cartMainView").style.display = "none";
    document.getElementById("qrisCheckoutView").style.display = "block";
}

// Fungsi kembali ke daftar belanjaan dari layar QRIS
function kembaliKeKeranjang() {
    document.getElementById("qrisCheckoutView").style.display = "none";
    document.getElementById("cartMainView").style.display = "block";
}

// Fungsi akhir untuk loncat ke WhatsApp
function prosesKeWhatsApp(jenisPembayaran) {
    if (keranjang.length === 0) return;

    var daftarPesanan = keranjang.map(function(item, index) {
        return (index + 1) + ". " + item;
    }).join("\n");
    
    var pesan = "Halo AYDEN STORE, saya ingin memesan:\n\n" + daftarPesanan + "\n\n*Metode Pembayaran:* " + jenisPembayaran + "\n\nMohon informasi total harganya. Terima kasih.";
    var pesanFormatURL = encodeURIComponent(pesan);

    // Buka WhatsApp
    window.open("https://wa.me/" + nomorWA + "?text=" + pesanFormatURL, "_blank");
}

// ==========================================
// FORMULIR KONTAK (BAWAH)
// ==========================================
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
