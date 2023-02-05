const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { message, apikeys } = require("../../config/global.config");
const { fetchJson } = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["jooxplay", "joox"],
  category: "downloader",
  description: "Mencari dan mendownload musik dari web joox",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args, fullArgs }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData || userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, isBan, limit } = userData;
      if (isBan == "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        await fetchJson(
          `https://api.lolhuman.xyz/api/jooxplay?apikey=${apikeys.lolhuman}&query=${fullArgs}`
        )
          .then(async (res) => {
            const data = res.result;
            let text =
              `*JooxPlay*\n\n` +
              `Penyanyi: ${data.info.singer}\n` +
              `Judul Lagu: ${data.info.song}\n` +
              `Durasi: : ${data.info.duration}\n` +
              `Album: ${data.info.album}\n` +
              `Date: ${data.info.date}\n\n\n` +
              `*Lirik:*` +
              `${data.lirik}`;

            await msg.replyImage({ url: data.image }, text);
            await msg.replyAudio({ url: data.audio[0].link }).then(async () => {
              const setLimit = limit - 1;
              await Atlas.changeLimit(userID, setLimit);
              await Atlas.updateUsage(userID, "jooxplay");
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
