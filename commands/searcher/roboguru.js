/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: "roboguru",
    description: "Mencari tahu sesuatu via roboguru by: Ruangguru",
    waitMessage: true,
    minArgs: 1,
    expectedArgs: "<query>",
    example: "{prefix}{command} rumus trigonometri",
    callback: async ({ msg, args, fullArgs }) => {
      return msg.reply("coming soon!");
    },
  };
  