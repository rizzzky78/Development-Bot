const { setting } = require("../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["everyone"],
  category: "group",
  description: "Tag/Ping all members in group.",
  cooldown: 60 * 1000,
  // adminOnly: true,
  groupOnly: true,
  callback: async ({ client, msg, args, message }) => {
    if (msg.senderNumber !== setting.ownerNumber) {
      return msg.reply("Lu bukan administrator!");
    } else if (msg.senderNumber == setting.ownerNumber) {
      const { from, quoted } = msg;
      const meta = await client.groupMetadata(from);
      const groupMem = meta.participants;

      let mems_id = new Array();
      let text = args.join(" ") + "\n";
      for (let i of groupMem) {
        text += `@${i.id.split("@")[0]}\n`;
        mems_id.push(i.id);
      }

      if (quoted) {
        await client.sendMessage(
          msg.from,
          { text, mentions: mems_id },
          { quoted }
        );
      } else {
        await client.sendMessage(
          msg.from,
          { text, mentions: mems_id },
          { quoted: message }
        );
      }
    }
  },
};
