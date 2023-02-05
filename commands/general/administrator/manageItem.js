const { Atlas } = require("../../../libs/controllers/dataUserHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["item"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    if (!args[0]) {
      let txts =
        `Hints Arguments:\n` +
        `~ list //to show list of all item data <with ID>\n` +
        `~ edit [target ID] [type/name] [value data/item]\n` +
        `~ add [type/name] [data/item code] [item/limit claim: number]\n\n` +
        `Example:\n` +
        `.item edit 12DK5 Name_Type Redeem_Code_To_Revoke\n` +
        `.item add Name_to_Add New_Redeem_Code 50\n`;
      return msg.reply(txts);
    } else if (args[0] === "list") {
      const allItem = await Atlas.getGlobalItem();
      let txt = `*All Item Claim & Data Value*\n\n`;
      let capt = `${allItem
        .map(
          (val) =>
            `Type: ${val.id}\nType: ${val.type}\nValue: ${val.value}\nItem: ${val.item}\nDate: ${val.date}\n`
        )
        .join("\n")}`;
      txt += capt;
      txt += "\n\nHints:\n";
      txt += ".item list to show list item\n";
      txt += ".item edit to edit item in list item\n";
      txt += ".item edit [target ID] [value type/name] [value data/item]";
      return msg.reply(txt);
    } else if (args[0] === "edit") {
      await Atlas.setGlobalItemSetter({
        targetID: args[1],
        valueType: args[2],
        valueData: args[3],
      })
        .then(async (res) => {
          console.log(res);
          return msg.reply(
            `Item Berhasil Diubah!\n\n${JSON.stringify(res, null, 2)}`
          );
        })
        .catch((err) => {
          console.error(err);
          msg.reply(new Error(String(err)));
        });
    } else if (args[0] === "add") {
      await Atlas.globalItemSetter({
        globalType: args[1].trim(),
        globalValue: args[2].trim(),
        item: args[3].trim(),
      }).then(async (res) => {
        console.log(res);
        return msg.reply(JSON.stringify(res, null, 2));
      });
    }
  },
};
