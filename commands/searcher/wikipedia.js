/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "wikipedia",
  description: "Mencari tahu sesuatu via wikipedia",
  waitMessage: true,
  minArgs: 1,
  expectedArgs: "<query>",
  example: "{prefix}{command} soto betawi",
  callback: async ({ msg, args, fullArgs }) => {
    return msg.reply("coming soon!");
  },
};
