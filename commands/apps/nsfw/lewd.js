const {
  setting,
  apikeys,
  message,
  lewdContainer,
  Lewd,
} = require("../../../config/global.config");
const { Atlas } = require("../../../libs/controllers/dataUserHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["lewd", "getlewd"],
  category: "NSFW MENU",
  description: "Get Random / Select Lewd Pictures",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: 5 * 1000,
  callback: async ({ client, msg, args, prefix }) => {
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
        let rowsLewd = [];
        let sections = [
          {
            title: "Lewd Picture".toUpperCase(),
            rows: rowsLewd,
          },
        ];

        if (!args[0]) {
          let dataLewd = lewdContainer.map(
            (val) => ({
              title: val.title[0].toUpperCase() + val.title.substring(1),
              rowId: `${prefix}getlewd ${val.cmd}`,
            }),
            {}
          );
          rowsLewd.push(...dataLewd);

          return client.sendMessage(msg.from, {
            title: "Lewd Menu Selector",
            text: "Fugiat amet nisi amet ullamco fugiat in proident officia nostrud.\n\nCulpa exercitation excepteur aliquip elit in incididunt qui duis minim non culpa labore elit nisi.\nExcepteur et ullamco laboris occaecat pariatur occaecat ullamco quis deserunt.",
            footer: setting.footers,
            buttonText: "Buka Menu",
            sections,
            viewOnce: true,
          });
        }

        if (args[0] && args[1]) {
          if (args[0] === "random/nsfw") {
            let urlsImagesA = `https://api.lolhuman.xyz/api/random/nsfw/${args[1]}?apikey=${apikeys.lolhuman}`;
            return await client
              .sendMessage(msg.from, {
                caption: `*${args[1]}*\n\nKetuk tombol di bawah untuk membuka Lewd Menu / me-request gambar lewd secara acak.`,
                footer: setting.footers,
                image: { url: urlsImagesA },
                templateButtons: [
                  {
                    index: 1,
                    quickReplyButton: {
                      displayText: "Lewd Menu",
                      id: prefix + "lewd",
                    },
                  },
                  {
                    index: 2,
                    quickReplyButton: {
                      displayText: "Random Lewd",
                      id: prefix + "lewd random1",
                    },
                  },
                ],
                viewOnce: true,
                mentions: [msg.sender],
              })
              .then(async () => {
                let getPrevLimit = limit - 1;
                await Atlas.changeLimit(userID, getPrevLimit).then((monit) => {
                  msg.reply("_Limit digunakan -1_");
                  console.log(monit);
                });
                await Atlas.updateUsage(userID, "lewd");
              })
              .catch((err) => {
                return msg.reply(new Error(String(err)));
              });
          }
          if (args[0] === "random2") {
            let urlsImagesB = `https://api.lolhuman.xyz/api/random2/${args[1]}?apikey=${apikeys.lolhuman}`;
            return await client
              .sendMessage(msg.from, {
                caption: `*${args[1]}*\n\nKetuk tombol di bawah untuk membuka Lewd Menu / me-request gambar lewd secara acak.`,
                footer: setting.footers,
                image: { url: urlsImagesB },
                templateButtons: [
                  {
                    index: 1,
                    quickReplyButton: {
                      displayText: "Lewd Menu",
                      id: prefix + "lewd",
                    },
                  },
                  {
                    index: 2,
                    quickReplyButton: {
                      displayText: "Random Lewd",
                      id: prefix + "lewd random1",
                    },
                  },
                ],
                viewOnce: true,
                mentions: [msg.sender],
              })
              .then(async () => {
                let getPrevLimit = limit - 1;
                await Atlas.changeLimit(userID, getPrevLimit).then((monit) => {
                  msg.reply("_Limit digunakan -1_");
                  console.log(monit);
                });
                await Atlas.updateUsage(userID, "lewd");
              })
              .catch((err) => {
                return msg.reply(new Error(String(err)));
              });
          }
        }

        let selectedLinks = "";
        let selects = "";

        if (args[0] === "random1") {
          selects = Lewd.typeA[Math.floor(Math.random() * Lewd.typeA.length)];
          selectedLinks = `https://api.lolhuman.xyz/api/random/nsfw/${selects}?apikey=${apikeys.lolhuman}`;
          return await client
            .sendMessage(msg.from, {
              caption: `*${selects}*\n\nKetuk tombol di bawah untuk me-request gambar lewd secara acak.`,
              footer: setting.footers,
              image: { url: selectedLinks },
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Random Lewd 1",
                    id: prefix + "lewd random1",
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Random Lewd 2",
                    id: prefix + "lewd random2",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            })
            .then(async () => {
              let getPrevLimit = limit - 1;
              await Atlas.changeLimit(userID, getPrevLimit).then((monit) => {
                msg.reply("_Limit digunakan -1_");
                console.log(monit);
              });
              await Atlas.updateUsage(userID, "lewd");
            })
            .catch((err) => {
              return msg.reply(new Error(String(err)));
            });
        }

        if (args[0] === "random2") {
          selects = Lewd.typeB[Math.floor(Math.random() * Lewd.typeB.length)];
          selectedLinks = `https://api.lolhuman.xyz/api/random2/${selects}?apikey=${apikeys.lolhuman}`;
          return await client
            .sendMessage(msg.from, {
              caption: `*${selects}*\n\nKetuk tombol di bawah untuk me-request gambar lewd secara acak.`,
              footer: setting.footers,
              image: { url: selectedLinks },
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Random Lewd 1",
                    id: prefix + "lewd random1",
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Random Lewd 2",
                    id: prefix + "lewd random2",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            })
            .then(async () => {
              let getPrevLimit = limit - 1;
              await Atlas.changeLimit(userID, getPrevLimit).then((monit) => {
                msg.reply("_Limit digunakan -1_");
                console.log(monit);
              });
              await Atlas.updateUsage(userID, "lewd");
            })
            .catch((err) => {
              return msg.reply(new Error(String(err)));
            });
        }
      }
    }
  },
};
