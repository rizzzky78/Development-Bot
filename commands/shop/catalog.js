const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["shop", "etalase", "catalog"],
  category: "Shop",
  description: "Katalog Produk",
  callback: async ({ client, msg, args, prefix }) => {
    const allProducts = await Shop.getAllProduct();
    if (allProducts.length < 1) {
      return msg.reply(
        `Belum ada produk, silahkan tambahkan produk melelui perintah ${prefix}tambahproduk`
      );
    }
    let rowsProducts = [];
    let sections = [
      {
        title: "Katalog Herbal produk".toUpperCase(),
        rows: rowsProducts,
      },
      {
        title: "Bantuan / Help".toUpperCase(),
        rows: [
          {
            title: "Butuh Bantuan?",
            rowId: prefix + "needhelp",
            description: "Ada pertanyaan?, silahkan pilih menu ini.",
          },
          {
            title: "Cara Order?",
            rowId: prefix + "howtoorder",
            description: "Bantuan cara pesan produk.",
          },
        ],
      },
    ];

    if (!args[0]) {
      let dataProducts = allProducts.map(
        (val) => ({
          title: val.data.name,
          rowId: `${prefix}getproduct ${val.id}`,
          description: `Harga Rp.${val.data.price}`,
        }),
        {}
      );
      rowsProducts.push(...dataProducts);

      return client
        .sendMessage(msg.from, {
          title: "Katalog Produk HNI HPAI",
          text: `Untuk melihat katalog silahkan ketuk tombol di bawah ini.\n\n\nEnim adipisicing mollit fugiat excepteur consectetur incididunt magna ad id pariatur occaecat in.\nDeserunt fugiat officia labore magna officia fugiat ea.`,
          footer: `© ${setting.botName}`,
          buttonText: "Buka Katalog",
          sections,
          viewOnce: true,
        })
        .catch((err) => {
          msg.reply("Terjadi Error!\n\n" + new Error(String(err)));
        });
    }
  },
};
