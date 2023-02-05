const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["savetext", "savedocs", "simpantext"],
  category: "general",
  description: "Cek Penyimpanan Kamu.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, isBan, limit } = userData;
      if (isBan === "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        if (!args[0] || !args.includes("|")) {
          return msg.reply(
            "Format salah!\ncontoh: !simpantext Nama/Judul text Kamu |Text yang mau kamu simpan disini...\n\nPanjang judul text 3-4 kata."
          );
        } else if (args[0] && args[1]) {
          let arg = args.join(" ");
          let formInput = {
            nameDocs: arg.split("|")[0],
            documents: arg.split("|")[1],
          };
          await Atlas.insertDocuments(userID, formInput)
            .then(async (res) => {
              console.log(res.callback);
              let texts =
                `*Upload Dokumen Berhasil!*\n\n` +
                `ID Dokumen: ${res ? res.formDocument.key.split('getdocs') : "Error!"}\n` +
                `Nama Dokumen:\n${res ? res.formDocument.alias : "Error!"}\n\n` +
                `Dibuat:\n${res ? res.formDocument.created : "Error!"}\n\n\n` +
                `_Ketuk tombol dibawah untuk membuka penyimpanan Kamu._`;
              return client.sendMessage(msg.from, {
                text: texts,
                footer: `© ${setting.botName}`,
                title: `${setting.botName}`,
                templateButtons: [
                  {
                    index: 1,
                    quickReplyButton: {
                      displayText: "My Store",
                      id: prefix + "mystore",
                    },
                  },
                ],
                viewOnce: true,
                mentions: [msg.sender],
              });
            })
            .then(async () => {
              const setLimit = limit - 1;
              let monit = await Atlas.changeLimit(userID, setLimit);
              console.log(monit);
            });
        }
      }
    }
  },
};
