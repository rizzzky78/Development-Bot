const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["mystats"],
  category: "general",
  waitMessage: "Mohon tunggu sebentar...",
  description: "Daftar agar bisa menggunakan Bot",
  example:
    "{prefix}{command} Budi|cowo|18|Ngegame\n\nPilihan Gender: cowo/cewe",
  callback: async ({ client, msg, args, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData || userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      return msg.reply("Coming soon!");
    }
  },
};
