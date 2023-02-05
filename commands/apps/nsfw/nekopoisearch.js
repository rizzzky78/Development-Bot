const { apikeys, message } = require("../../../config/global.config");
const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { fetchJson } = require("../../../libs/functions/myFunc");
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["nekopoicari"],
  category: "NSFW MENU",
  description: "Cari HAnime / JAV daro web kesayangan kamu",
  waitMessage: "Mohon tunggu sebentar...",
  minArgs: 1,
  example: "{prefix}{command} Isekai harem",
  cooldown: 5 * 1000,
  callback: async ({ msg, fullArgs }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, limit, isBan } = userData;
      if (isBan === "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        await fetchJson(
          `https://api.lolhuman.xyz/api/nekopoisearch?apikey=${apikeys.lolhuman}&query=${fullArgs}`
        )
          .then(async (res) => {
            const datas = res.result;
            const thumb = datas[0].thumbnail;
            let text = "*Hasil Pencarian*\n\n";
            for (let data in datas) {
              text += `Judul: ${data.title}\n`;
              text += `Link: ${data.link}\n\n`;
            }

            return msg.replyImage({ url: thumb }, text).then(async () => {
              const setLimit = limit - 1;
              await Atlas.changeLimit(userID, setLimit);
              await Atlas.updateUsage(userID, "nekopoisearch");
              return msg.reply("_limit digunakan -1_");
            });
          })
          .catch((err) => {
            return msg.reply(new Error(String(err)));
          });
      }
    }
  },
};
