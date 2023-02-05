const { setting, message, shopMenu } = require("../config/global.config");
const { Runtime, makeDate } = require("../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["help", "bantuan", "panelshop"],
  category: "Help",
  description: "Bantuan E-Commerce",
  callback: async ({ client, msg, args, prefix }) => {
    if (!args[0]) {
      let sections = [
        { title: shopMenu.category[0], rows: [] },
        { title: shopMenu.category[1], rows: [] },
        { title: shopMenu.category[2], rows: [] },
        { title: shopMenu.category[3], rows: [] },
      ];

      let featureMapping = {
        catalog: shopMenu.catalog,
        admin: shopMenu.admin,
        payment: shopMenu.payment,
        help: shopMenu.help,
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
        title: "Nganu",
        text: "Holla!",
        footer: setting.footers,
        buttonText: "Buka Menu",
        sections,
        viewOnce: true,
      });
    }
  },
};
