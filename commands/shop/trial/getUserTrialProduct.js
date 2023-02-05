const { setting } = require("../../../config/global.config");
const { ShopTrial } = require("../../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getmyproduct", "getusercontacts"],
  category: "Shop",
  description: "Katalog Produk",
  callback: async ({ client, msg, args, prefix }) => {
    const DataUser = await ShopTrial.getAllUserTrialProduct(msg.senderNumber);
    if (!DataUser || DataUser == null) {
      return msg.reply(
        "Kamu belum membuat catalog!, buat katalog pertama Anda dengan cara:\n.jointrial Namamu\ncontoh: .gabungtrial Rizky"
      );
    } else if (DataUser) {
      const { userName, numberPhone, dataTrial } = DataUser;
      const { product } = dataTrial;
      const selectedProduct = ShopTrial.getUserTrialProductByID({
        dataProduct: product,
        inputID: args[0],
      });

      const { idProduct, data } = selectedProduct;
      const { name, price, image, desc, timeStamp } = data;

      let texts =
        `*${name}*\n#${idProduct}\n\n` +
        `Harga: ${price}\n\n` +
        `Deskripsi:\n${desc}\n\n` +
        `_produk ini dibuat pada:_\n_${timeStamp}_\n`;

      let userContacts = [];

      const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        `FN:${userName}\n` + // full name
        `ORG:Owner Catalog;\n` + // the organization of the contact
        `TEL;type=CELL;type=VOICE;waid=${numberPhone}:+${numberPhone}\n` + // WhatsApp ID + phone number
        "END:VCARD";

      let idContacts = {
        displayName: userName,
        contacts: [{ vcard }],
      };

      userContacts.push(...idContacts);

      if (args[0] === "penjual") {
        return client.sendMessage(msg.from, {
          contacts: userContacts[0],
        });
      }

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
                id: prefix + "getusercontacts penjual",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Buka Katalog Saya",
                id: prefix + "getmyproduct",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        })
        .catch((err) => {
          msg.reply("Terjadi Error!\n\n" + new Error(String(err)));
        });
    }
  },
};
