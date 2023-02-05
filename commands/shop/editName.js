const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");
const { teleGraPhUploader } = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["editnama"],
  category: "Shop",
  description: "Edit nama produk",
  waitMessage: "Mohon tunggu sebentar, sedang diproses...",
  callback: async ({ client, msg, args, prefix }) => {
    // const userData = await Shop.getDataUser(msg.senderNumber);
    // if (userData == null || userData.statusRole === "buyer") {
    //   return msg.reply("Anda tidak terdaftar sebagai Admin!");
    // }

    if (!args[0] || !args[1].includes("#")) {
      return client.sendMessage(msg.from, {
        text: "\n\nFormat yang dimasukan salah!\n\n",
        footer: setting.botName,
        templateButtons: [
          {
            index: 1,
            quickReplyButton: {
              displayText: "Lihat Cara Penggunaan",
              id: prefix + "shop readme",
            },
          },
        ],
        viewOnce: true,
        mentions: [msg.sender],
      });
    }

    if (args[0] && args[1]) {
      let arg = args.join(" ");
      let appendChange = {
        id: arg.split("#")[0].trim(),
        set: arg.split("#")[1].trim(),
      };

      const Data = await Shop.edit._name(appendChange.id, appendChange.set);
      const { callback, value } = Data;
      console.log(callback, value);
      if (callback.value == null) {
        return msg.reply("Error!, Masukan ID atau perintah tidak valid!");
      }

      return client.sendMessage(msg.from, {
        text: `*Edit Sukses!*\n\n\nID Produk: ${value.id}\nSet Nama Produk ke:\n${value.value}\n`,
        footer: setting.botName,
        templateButtons: [
          {
            index: 1,
            quickReplyButton: {
              displayText: "Cek Perubahan",
              id: prefix + `getproduct ${value.id}`,
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
      });
    }
  },
};
