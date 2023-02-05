const { Shop } = require("../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["gabung", "jointrial"],
  category: "Shop",
  description: "Gabung agar bisa menambahkan/memgedit produk.",
  waitMessage: "Mohon tunggu sebentar, sedang diproses...",
  callback: async ({ msg, args }) => {
    const UserData = await Shop.getDataUser(msg.senderNumber);

    if (UserData == null) {
      if (!args[0]) {
        return msg.reply(
          "Format salah!, format yang valid adalah !gabung Namamu\nContoh: !gabung Rizky"
        );
      } else if (args[0]) {
        let arg = args.join(" ");
        let id = msg.senderNumber;
        let aliases = arg.split("#")[0];

        const { callback, data } = await Shop.makeUser(id, aliases);
        console.log(callback, data);
        return msg.reply(
          `*Daftar Berhasil!*\nID: ${data.id}\nNomor: ${data.numberPhone}\nNama/Alias: ${data.userName}\nRole: ${data.statusRole}\nTerfaftar Pada:\n${data.registered}\n`
        );
      }
    }
    if (UserData.userID == msg.senderNumber) {
      return msg.reply("Anda sudah terdaftar sebelumnya!");
    }
  },
};
