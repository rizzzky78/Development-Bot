const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { OpenAi } = require("../../../libs/controllers/openAi");
const { setting } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["codex"],
  category: "OpenAi",
  description: "Most powerful models",
  waitMessage: "Mohon tunggu sebentar..., ini mungkin akan sedikit lama...",
  cooldown: 10 * 1000,
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
        if (!args[0]) {
          return client.sendMessage(msg.from, {
            text: "\nTidak ada Query!\n",
            footer: setting.footers,
            templateButtons: [
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Deskripsi",
                  id: prefix + "openai description",
                },
              },
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Panduan",
                  id: prefix + "openai guide",
                },
              },
            ],
            viewOnce: true,
            mentions: [msg.sender],
          });
        } else if (args[0]) {
          let arguments = args.join(" ");
          await OpenAi.Codex(arguments)
            .then(async (response) => {
              if (response.status !== 200) {
                return msg.reply("Error!");
              } else if (response.status == 200) {
                const answer = response.data.choices[0].text;
                msg.reply(answer).then(async () => {
                  const getLimit = limit - 1;
                  await Atlas.changeLimit(userID, getLimit).then(
                    async (data) => {
                      console.log(response.data.usage, data.changes);
                      msg.reply("_limit digunakan -3_");
                    }
                  );
                  await Atlas.makeOpenAiHistory(userID, {
                    userPrompt: arguments,
                    answerPrompt: answer,
                  });
                  await Atlas.updateUsage(userID, "OpenAi");
                });
              }
            })
            .catch((err) => {
              console.error(err)
              return msg.reply(new String(err));
            });
        }
      }
    }
  },
};
