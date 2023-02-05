const { setting, openAiHelper } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["openai"],
  category: "OpenAi",
  description: "OpenAI Help",
  callback: async ({ client, msg, args, prefix }) => {
    if (!args[0]) {
      return client.sendMessage(msg.from, {
        text: "\nSilahkan Pilih tomboh dibawah\nDeskripsi - untuk melihat deskripsi fitur\nPanduan - untuk melihat panduan penggunaan fitur\n",
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
    }

    if (args[0] === "description") {
      let desc =
        `*List Model & Deskripsi Model*\n` +
        `*Davinci - perintah: .davinci*\n` +
        `${openAiHelper.models.davinci}\n\n` +
        `*Curie - perintah: .curie*\n` +
        `${openAiHelper.models.curie}\n\n` +
        `*Codex - perintah: .codex*\n` +
        `${openAiHelper.models.codex}\n\n` +
        `*Dall-E - perintah: .dalle*\n` +
        `${openAiHelper.models.dall_e}\n\n\n` +
        `\n` +
        `Powered By: ${setting.aliasBot}`;

      return msg.reply(desc);
    } else if (args[0] === "guide") {
      let guide =
        `*Guide / Panduan Penggunaan OpenAi*\n\n` +
        `*Contoh Penggunaan:*\n\n` +
        `*Davinci*\n` +
        `${openAiHelper.requestModelExample.davinci
          .map((item) => item)
          .join("\n\n")}\n\n` +
        `*Curie*\n` +
        `${openAiHelper.requestModelExample.curie
          .map((item) => item)
          .join("\n\n")}\n\n` +
        `*Codex*\n` +
        `${openAiHelper.requestModelExample.codex
          .map((item) => item)
          .join("\n\n")}\n\n` +
        `*Dall-E*\n` +
        `${openAiHelper.requestModelExample.dalle
          .map((item) => item)
          .join("\n\n")}\n\n` +
        `\n` +
        `Powered By: ${setting.aliasBot}`;

      return msg.reply(guide);
    }
  },
};
