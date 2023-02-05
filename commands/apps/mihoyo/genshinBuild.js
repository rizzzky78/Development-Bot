const { miHoYo } = require("../../../config/mihoyo");
const { setting } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["genshinbuild", "sheet2"],
  category: "Guides",
  description: "Get ER guides",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: 5 * 1000,
  callback: async ({ client, msg, args }) => {
    if (!args[0]) {
      return client.sendMessage(msg.from, {
        title: "Genshin Impact Guides\nCharacter Build",
        text: "\nGatau ini masih meta apa kgk, gw males updatenya :)\n",
        footer: setting.footers,
        buttonText: "BUILD",
        sections: miHoYo.genshinCharacterBuild,
        viewOnce: true,
      });
    } else if (args[0]) {
      const getUrl = miHoYo.GenshinBuild(args[0]);
      return await msg.replyImage(
        { url: getUrl },
        `Sumber dari: HoyoLab\nCredit: ${miHoYo.CreditsCaptions}`
      );
    }
  },
};
