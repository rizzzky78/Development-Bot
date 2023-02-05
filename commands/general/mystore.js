const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");
const { trimStr } = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["mystore"],
  category: "general",
  description: "Cek Penyimpanan Kamu.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userName, isBan, limit, userStore, registeredOn } = userData;
      const { openAi, documents, images } = userStore;

      if (isBan === "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        if (!args[0]) {
          let sections = [
            { title: "My History OpenAi", rows: [] },
            { title: "My Documents", rows: [] },
            { title: "My Image", rows: [] },
          ];

          let Store = {
            openai: openAi,
            docs: documents,
            imgs: images,
          };

          Object.keys(Store).forEach((key, index) => {
            let mappedStore = Store[key].map((val) => ({
              title: trimStr(val.alias, 45),
              rowId: prefix + val.cmd,
              description: "Dibuat: " + val.created,
            }));
            sections[index].rows.push(...mappedStore);
          });

          let textStore =
            `Hi ${msg.pushName}!\n\n` +
            `Berikut adalah statistik penyimpanan Kamu:\n` +
            `OpenAi: ${openAi.length}\n` +
            `Dokumen: ${documents.length}\n` +
            `Gambar: ${images.length}\n\n` +
            `Terdaftar Pada: ${registeredOn}\n\n` +
            `_ketuk tombol dibawah untuk melihat list data Kamu._`;

          let helpArr = [
            {
              title: "Bantuan / Help",
              rows: [
                {
                  title: "Bantuan Cara Pakai Store Cloud",
                  rowId: prefix + "mystore help",
                  description: "Bingung? Kamu bisa cek cara pakainya disini.",
                },
              ],
            },
          ];
          sections.push(...helpArr);

          return client.sendMessage(msg.from, {
            title: `${userName}'s Store`,
            text: textStore,
            footer: setting.footers,
            buttonText: "Buka Store",
            sections,
            viewOnce: true,
            mentions: [msg.sender],
          });
        } else if (args[0] === "help") {
          return client.sendMessage(msg.from, {
            text: "Yahalo!",
            footer: setting.footers,
            templateButtons: [
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Cara Upload Text",
                  id: prefix + "mystore textupload",
                },
              },
              {
                index: 2,
                quickReplyButton: {
                  displayText: "Cara Upload Gambar",
                  id: prefix + "mystore imgupload",
                },
              },
            ],
            viewOnce: true,
            mentions: [msg.sender],
          });
        }
      }
    }
  },
};
