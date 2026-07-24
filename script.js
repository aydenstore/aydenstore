// Nomor WhatsApp Admin AYDEN STORE
const nomorWA = "6282386130512";

// Array untuk menyimpan daftar belanja
let keranjang = [];

// Fungsi Fitur Pencarian (Search)
function cariProduk() {
    var kataKunci = document.getElementById("searchInput").value;
    if (kataKunci.trim() === "") {
        alert("Silakan ketik nama barang atau layanan yang ingin dicari.");
    } else {
        alert("Anda mencari: " + kataKunci + ".\n(Saat ini fitur pencarian masih dalam pengembangan)");
    }
}

// Fungsi Memasukkan Barang ke Keranjang
function tambahKeKeranjang(namaProduk) {
    keranjang.push(namaProduk);
    updateNotifikasiKeranjang();
    alert("Berhasil ditambahkan! " + namaProduk + " masuk ke keranjang.");
}

// Fungsi Menghapus Barang dari Keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    updateNotifikasiKeranjang();
    tampilkanIsiKeranjang(); // Me-refresh isi pop-up
}

// Fungsi Memunculkan Angka Notifikasi Merah
function updateNotifikasiKeranjang() {
    var badge = document.getElementById("cartBadge");
    if (badge) {
        badge.innerText = keranjang.length;
        badge.style.display = keranjang.length > 0 ? "block" : "none";
    }
}

// Fungsi Membuka Pop-up Keranjang
function bukaKeranjang() {
    document.getElementById("cartModal").style.display = "block";
    tampilkanIsiKeranjang();
}

// Fungsi Menutup Pop-up Keranjang
function tutupKeranjang() {
    document.getElementById("cartModal").style.display = "none";
}

// Fungsi Menampilkan Daftar Barang di Dalam Pop-up
function tampilkanIsiKeranjang() {
    var cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; 
    
    if (keranjang.length === 0) {
        cartList.innerHTML = "<li>Keranjang belanja Anda masih kosong.</li>";
        return;
    }

    keranjang.forEach(function(item, index) {
        var li = document.createElement("li");
        li.innerHTML = item + ' <button class="remove-btn" onclick="hapusDariKeranjang(' + index + ')">X</button>';
        cartList.appendChild(li);
    });
}

// Fungsi Checkout Seluruh Keranjang ke WhatsApp
function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong! Silakan pilih produk terlebih dahulu.");
        return;
    }

    var daftarPesanan = keranjang.map(function(item, index) {
        return (index + 1) + ". " + item;
    }).join("\n");
    
    var pesan = "Halo AYDEN STORE, saya ingin memesan:\n\n" + daftarPesanan + "\n\nMohon informasi total harga dan metode pembayarannya. Terima kasih.";
    var pesanFormatURL = encodeURIComponent(pesan);
    var linkFinal = "https://wa.me/" + nomorWA + "?text=" + pesanFormatURL;
    
    window.open(linkFinal, "_blank");
}

// Fungsi Mengirim Pesan Biasa/Bukti TF (Dari Formulir Bawah)
function bukaWhatsApp() {
    var nama = document.getElementById("namaPengirim").value;
    
    if (nama.trim() === "") {
        alert("Silakan isi nama Anda terlebih dahulu.");
        return;
    }

    var elemenJenisPesan = document.getElementById("jenisPesan");
    var jenis = elemenJenisPesan ? elemenJenisPesan.value : "tanya";
    var pesan = "";

    if (jenis === "tanya") {
        pesan = "Halo AYDEN STORE, saya " + nama + ", saya ingin bertanya mengenai layanan yang ada di toko.";
    } else if (jenis === "kirim_media") {
        pesan = "Halo AYDEN STORE, saya " + nama + ". Berikut saya lampirkan foto/dokumen yang dibutuhkan (Tunggu sebentar, saya sedang melampirkan file...).";
    }
    
    var pesanFormatURL = encodeURIComponent(pesan);
    var linkFinal = "https://wa.me/" + nomorWA + "?text=" + pesanFormatURL;
    
    window.open(linkFinal, "_blank");
}