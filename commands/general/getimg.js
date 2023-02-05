const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message, myButtons } = require("../../config/global.config");
const { getDataStore } = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getimages"],
  category: "general",
  description: "Ambil data gambar yang kamu simpan.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData || userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, isBan, limit, userStore } = userData;
      if (isBan == "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        const { images } = userStore;
        const dataIMG = getDataStore({
          dataStore: images,
          inputKey: args[0],
        });
        if (!dataIMG || dataIMG == null) {
          return msg.reply(message.storeErr);
        } else if (dataIMG) {
          const { alias, imageUrl, created } = dataIMG;
          let captionImage =
            `*Alias/Judul Gambar:*\n` +
            `${alias}\n\n` +
            `*Dibuat:*\n` +
            `${created}`;
          return client
            .sendMessage(msg.from, {
              caption: captionImage,
              footer: setting.footers,
              image: { url: imageUrl },
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "My Store",
                    id: prefix + "mystore",
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Buka Menu",
                    id: prefix + "info",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            })
            .then(async () => {
              const setLimit = limit - 1;
              const monit = await Atlas.changeLimit(userID, setLimit);
              console.log(monit);
            })
            .catch((err) => {
              console.log(new Error(String(err)));
              return msg.reply(message.error);
            });
        }
      }
    }
  },
};
