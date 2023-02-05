const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { setting } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["set"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    if (msg.senderNumber !== setting.ownerNumber) {
      return msg.reply("Kamu bukan Owner Bot ngab!");
    } else if (msg.senderNumber == setting.ownerNumber) {
      if (!args[0]) {
        return msg.reply(
          "Hints:\n.set limit <USER NUMBER> <LIMIT TO CHANGE>\n.set ban <USER NUMBER> <SET BAN?: true/false>"
        );
      } else if (args[0] === "limit") {
        await Atlas.changeLimit(
          args[1].toString().trim(),
          parseInt(args[2].trim())
        ).then(async (res) => {
          console.log(res);
          const txt = `*Set Limit Sukses!*\n\n${JSON.stringify(
            res.changes,
            null,
            2
          )}`;
          return msg.reply(txt);
        });
      } else if (args[0] === "ban") {
        await Atlas.setBanned(args[1].toString().trim(), args[2].trim()).then(
          async (res) => {
            console.log(res);
            const txts = `*Set Banned Sukses!*\n\n${JSON.stringify(
              res.setBanned,
              null,
              2
            )}`;
            return msg.reply(txts);
          }
        );
      }
    }
  },
};
