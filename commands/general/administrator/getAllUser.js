const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { setting } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["user", "users"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    if (msg.senderNumber !== setting.ownerNumber) {
      return msg.reply("Kamu bukan Owner Bot ngab!");
    } else if (msg.senderNumber == setting.ownerNumber) {
      const globalUserData = await Atlas.getAllUser();
      if (!args[0]) {
        let texts = `*List of All User*\n\n`;
        texts += `Total: ${globalUserData.length}\n`;
        texts += `Hints: .users detail //to show detail per user\n\n`;
        texts += globalUserData
          .map(
            (val) =>
              `No. ${val.userNo}\n` +
              `User Name: ${val.userName}\n` +
              `Number: ${val.userID}\n` +
              `Status Ban: ${val.isBan}\n\n`
          )
          .join("\n");
        return msg.reply(texts);
      } else if (args[0] === "detail") {
        let text = `*List of All User*\n\n`;
        text += `Total: ${globalUserData.length}\n\n`;
        text += globalUserData
          .map(
            (val) =>
              `No. ${val.userNo}\n` +
              `User Name: ${val.userName}\n` +
              `Number: ${val.userID}\n` +
              `Age: ${val.age}\n` +
              `Hobby: ${val.hobby}\n` +
              `Status Ban: ${val.isBan}\n` +
              `Limit: ${val.limit}\n` +
              `Serial: ${val.serial}\n` +
              `Registered:\n${val.registeredOn}\n\n`
          )
          .join("\n");
        return msg.reply(text);
      }
    }
  },
};
