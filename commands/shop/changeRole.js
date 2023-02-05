const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["setrole"],
  category: "Shop",
  description: "Edit kategori produk",
  waitMessage: "Mohon tunggu sebentar, sedang diproses...",
  callback: async ({ msg, args }) => {
    if (!args[0] && !args[1]) {
      return msg.reply(
        "Format salah!\nFormat yang benar yaitu: !setrole nomerwa/user#role\nContoh: !setrole 62812345xxx#admin\n\nJenis role yang valid:\n- buyer\n -admin\n- owner"
      );
    }
    if (args[0] && args[1]) {
      console.log(args);
      let arg = args.join(" ");
      let user = `${arg.split("#")[0].trim()}`;
      let role = `${arg.split("#")[1].trim()}`;

      const { callback, data } = await Shop.changeRole(user, role);
      console.log(callback);
      return msg.reply(
        `*Penggantian Role Berhasil!*\nUser ID: ${data.id}\nSet Role ke: ${data.statusRole}`
      );
    }
  },
};
