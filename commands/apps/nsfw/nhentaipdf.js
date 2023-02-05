const { fetchJson } = require("../../../libs/functions/myFunc");
const { setting, apikeys, message } = require("../../../config/global.config");
const { Atlas } = require("../../../libs/controllers/dataUserHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["nhentaipdf"],
  category: "NSFW MENU",
  description: "Download PDF dari kode nuklir",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: 15 * 1000,
  callback: async ({ client, msg, args, prefix }) => {
    let userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData) return msg.reply(message.notReg);
    let { userID, limit } = userData;

    if (!args[0]) return msg.reply(`Contoh ${prefix}nhentaipdf 12345`);

    await fetchJson(
      `https://api.lolhuman.xyz/api/nhentaipdf/${args[0]}?apikey=${apikeys.lolhuman}`
    ).then(async (data) => {
      if (data.status === 400 || 500) {
        return client.sendMessage(msg.from, {
          text: message.error,
          footer: setting.botName,
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Mengapa Error?",
                id: prefix + "info error",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        });
      }

      if (data.status === 200) {
        return await msg
          .replyDocument(
            { url: data.result },
            "application/pdf",
            `${args[0]}.pdf`
          )
          .then(async () => {
            let getPrevLimit = limit - 1;
            let monit = await Atlas.changeLimit(userID, getPrevLimit).then(
              () => {
                msg.reply("_Limit digunakan -1_");
                console.log(monit);
              }
            );
          });
      }
    });
  },
};
