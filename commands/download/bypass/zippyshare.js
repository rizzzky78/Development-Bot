const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { message, apikeys } = require("../../../config/global.config");
const { fetchJson } = require("../../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["zippyshare"],
  category: "downloader",
  minArgs: 1,
  description: "Bypass and get alternative link download",
  waitMessage: "Mohon tunggu sebentar...",
  example: '{prefix}{command} https://www90.zippyshare.com/v/hvaR97k3/file.html',
  callback: async ({ msg, args }) => {
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
        const query = args.join(" ");
        await fetchJson(
          `https://api.lolhuman.xyz/api/zippyshare?apikey=${apikeys.lolhuman}&url=${query}`
        )
          .then(async (res) => {
            const data = res.result;
            let text =
              `*ZippyShare Bypasser*\n``Link Origin:\n${query}\n\n\n` +
              `Link Bypassed:\n${data.download_url}\n\n` +
              `Name File: ${data.name_file}\n` +
              `Size: ${data.size}\n` +
              `Date Upload: ${data.date_upload}`;
            return msg.reply(text).then(async () => {
              const setLimit = limit - 1;
              await Atlas.changeLimit(userID, setLimit);
              await Atlas.updateUsage(userID, "zippyshare");
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
