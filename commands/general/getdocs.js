const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message, myButtons } = require("../../config/global.config");
const { getDataStore } = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getdocs"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
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
        const { documents } = userStore;
        const dataDocs = getDataStore({
          dataStore: documents,
          inputKey: args[0],
        });
        if (!dataDocs || dataDocs == null) {
          return msg.reply(message.storeErr);
        } else if (dataDocs) {
          const { alias, docs, created } = dataDocs;
          let documentText =
            `*Alias/Judul Dokumen:*\n` +
            `${alias}\n\n` +
            `*Dokumen/Text:*\n` +
            `${docs}\n\n\n` +
            `*Dibuat:*\n` +
            `${created}`;
          return client
            .sendMessage(msg.from, {
              text: documentText,
              footer: setting.footers,
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
              return msg.reply(message.error);
            });
        }
      }
    }
  },
};
