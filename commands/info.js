const {
  setting,
  message,
  indexMenu,
  myButtons,
} = require("../config/global.config");
const { Runtime, makeDate } = require("../libs/functions/myFunc");
const { Atlas } = require("../libs/controllers/dataUserHandler");

const os = require("os");
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["info", "wibu"],
  category: "Help",
  description: "Bantuan / FAQ",
  callback: async ({ client, msg, args, prefix }) => {
    let textMenu = `
  
┏━❐  *_Bot Info_* 
┃ ⌬ Creator :  @Rizu
┃ ⌬ Prefix :   ${prefix} / Multi Prefix
┃ ⌬ Hostname : ${os.hostname()}
┃ ⌬ Platform : ${os.platform()}
┗━❐ 

┏━❐  *_Bot Statistics_* 
┃ ⏣ Memory Used : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    )}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB
┃ ⎋ Runtime : ${Runtime(process.uptime())}
┃ ⊙ Total Hit : -
┃ ⊚ Total Registered : ${(await Atlas.getAllUser()).length} User
┗━❐

┏━❐  *_Date_*
┃ ${makeDate()}
┗━❐
`;

    if (!args[0]) {
      let sections = [
        { title: indexMenu.category[0], rows: [] },
        { title: indexMenu.category[1], rows: [] },
        { title: indexMenu.category[2], rows: [] },
        { title: indexMenu.category[3], rows: [] },
        { title: indexMenu.category[4], rows: [] },
        { title: indexMenu.category[5], rows: [] },
        { title: indexMenu.category[6], rows: [] },
        { title: indexMenu.category[7], rows: [] },
        { title: indexMenu.category[8], rows: [] },
      ];

      let featureMapping = {
        owner: indexMenu.features.owner,
        general: indexMenu.features.general,
        openAi: indexMenu.features.openAi,
        downloader: indexMenu.features.downloader,
        searcherAndEdu: indexMenu.features.searcherAndEdu,
        islami: indexMenu.features.islami,
        gamesAndQuiz: indexMenu.features.gamesAndQuiz,
        nsfw: indexMenu.features.nsfw,
        misc: indexMenu.features.misc,
      };

      Object.keys(featureMapping).forEach((key, index) => {
        let mappedFeatures = featureMapping[key].map((val) => ({
          title: val.title,
          rowId: prefix + val.cmd,
          description: val.desc,
        }));
        sections[index].rows.push(...mappedFeatures);
      });

      return client.sendMessage(msg.from, {
        title: `Hi ${msg.pushName}!\n`,
        text: textMenu,
        footer: setting.footers,
        buttonText: "Buka Menu",
        sections,
        viewOnce: true,
      });
    } else if (args[0] === "error") {
      return msg.reply("Yo ndak tau tanyanya kok tanya saya :)");
    } else if (args[0] === "coy") {
      return msg.reply("Yo ndak tau tanyanya kok tanya saya :)");
    } else if (args[0] === "nyoba") {
      return client.sendMessage(msg.from, myButtons.test);
    }
  },
};
