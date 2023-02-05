const { apikeys, message } = require("../../../config/global.config");
const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { fetchJson } = require("../../../libs/functions/myFunc");
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["nekopoi"],
  category: "NSFW MENU",
  description: "Tampilkan detail dan link download HAnime / JAV",
  waitMessage: "Mohon tunggu sebentar...",
  minArgs: 1,
  example:
    "{prefix}{command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/",
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
          `https://api.lolhuman.xyz/api/nekopoi?apikey=${apikeys.lolhuman}&url=${fullArgs}`
        )
          .then(async (res) => {
            const data = res.result;
            const genres = data.genre;
            let text = `Judul:\n${data.title}\n\n`;
            for (let genre of genres) {
              text += `- ${genre}\n`;
            }
            text += `Durasi: ${data.duration}\n`;
            text += `Studio: ${data.producers}\n`;
            text += `Sinopsis:\n${data.sinopsis}\n\n`;
            text += `Link Download:\n\n`;
            text += `720p\n`;
            text += `- ${data.link["720p"].Dood}\n`;
            text += `- ${data.link["720p"].GoogleDrive1}\n`;
            text += `- ${data.link["720p"].GoogleDrive2}\n`;
            text += `- ${data.link["720p"].Userscloud}\n`;
            text += `- ${data.link["720p"].ZippyShare}\n`;
            text += `- ${data.link["720p"].GoFile}\n`;
            text += `- ${data.link["720p"].DropApk}\n\n`;
            text += `480p\n`;
            text += `- ${data.link["480p"].Dood}\n`;
            text += `- ${data.link["480p"].GoogleDrive1}\n`;
            text += `- ${data.link["480p"].GoogleDrive2}\n`;
            text += `- ${data.link["480p"].Userscloud}\n`;
            text += `- ${data.link["480p"].ZippyShare}\n`;
            text += `- ${data.link["480p"].GoFile}\n`;
            text += `- ${data.link["480p"].DropApk}\n\n`;

            return msg
              .replyImage({ url: data.thumbnail }, text)
              .then(async () => {
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
