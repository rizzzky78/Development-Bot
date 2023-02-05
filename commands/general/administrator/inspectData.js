const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { setting } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["inspect"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    if (msg.senderNumber !== setting.ownerNumber) {
      return msg.reply("Kamu bukan Owner Bot ngab!");
    } else if (msg.senderNumber == setting.ownerNumber) {
      const userData = await Atlas.getUserData(args[0]);
      return msg.reply(JSON.stringify(userData, null, 2));
    }
  },
};
