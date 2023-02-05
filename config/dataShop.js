const shopMenu = {
  category: ["Katalog", "Admin", "Payment", "Bantuan"],
  catalog: [
    {
      title: "Trial Shop",
      cmd: "catalog",
      desc: "Ini deskripsi katalog...",
    },
    {
      title: "Katalog B",
      cmd: "panelshop maincatalogue",
      desc: "Ini deskripsi katalog...",
    },
    {
      title: "Katalog C",
      cmd: "panelshop maincatalogue",
      desc: "Ini deskripsi katalog...",
    },
  ],
  admin: [
    {
      title: "Menambahkan Produk",
      cmd: "panelshop add",
      desc: "Cara menambahkan produk ke katalog",
    },
    {
      title: "Mengedit Produk",
      cmd: "panelshop add",
      desc: "Cara mengedit produk di katalog",
    },
    {
      title: "Menghapus Produk",
      cmd: "panelshop add",
      desc: "Cara menghapus produk di katalog",
    },
  ],
  payment: [
    {
      title: "Pembayaran",
      cmd: "panelshop pay",
      desc: "Metode pembayaran",
    },
  ],
  help: [
    {
      title: "Cara Order / Pesan",
      cmd: "panelshop order",
      desc: "Bantuan cara order produk.",
    },
    {
      title: "Menambahkan / Edit Produk di Katalog",
      cmd: "panelshop howtouse",
      desc: "Bantuan cara menambahkan/mengedit produk pada katalog..",
    },
    {
      title: "Info Marketplace / Penjual",
      cmd: "panelshop seller",
      desc: "Informasi terkait Marketplace",
    },
    {
      title: "Info Pengembang Bot ini",
      cmd: "panelshop dev",
      desc: "Ingin punya Bot asisten seperti ini?",
    },
  ],
};

module.exports = { shopMenu };
