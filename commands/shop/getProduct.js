const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getproduct"],
  category: "Shop",
  description: "Ambil data produk",
  waitMessage: 'Mohon tunggu sebentar\nSedang mengambil data produk...',
  callback: async ({ client, msg, args, prefix }) => {
    if (!args[0]) return msg.reply("Kode produk tidak dimasukan!");
    const items = await Shop.getProductByID(args[0]);
    if (!items) return msg.reply("Produk tidak ditemukan!");

    const { id, name, price, category, image, desc, timeStamp } = items;
    let texts =
      `\n*${name}*\n#${id}\n\n` +
      `Harga: Rp.${price}\n` +
      `Kategori: ${category}\n\n` +
      `Deskripsi Produk:\n\n${desc}\n\n\n` +
      `_Produk ini dibuat/diupdate pada:_\n_${timeStamp}_\n`;
    return client
      .sendMessage(msg.from, {
        caption: texts,
        footer: `© ${setting.botName}`,
        image: { url: image },
        templateButtons: [
          {
            index: 1,
            quickReplyButton: {
              displayText: "Hubungi Penjual",
              id: prefix + "owner",
            },
          },
          {
            index: 2,
            quickReplyButton: {
              displayText: "Buka Katalog",
              id: prefix + "catalog",
            },
          },
        ],
        viewOnce: true,
        mentions: [msg.sender],
      })
      .catch((err) => {
        msg.reply("Terjadi Error!\n\n" + new Error(String(err)));
      });
  },
};
