/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: "brainly",
    description: "Mencari tahu sesuatu via brainly",
    waitMessage: true,
    minArgs: 1,
    expectedArgs: "<query>",
    example: "{prefix}{command} contoh soal fisika termodinamika",
    callback: async ({ msg, args, fullArgs }) => {
      return msg.reply("coming soon!");
    },
  };
  