const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message, myButtons } = require("../../config/global.config");
const {
  itemExistValidator,
  globaItemValidator,
} = require("../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["claim", "redeem"],
  category: "general",
  description: "Ambil data dokumen berupa text.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData || userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, userName, isBan, limit, userStore } = userData;
      if (isBan == "true") {
        return msg.reply(message.banned);
      } else if (limit == 0) {
        return msg.reply(message.noLimit);
      } else {
        if (!args[0]) {
          return msg.reply("Tidak ada redeem code yang mau diclaim!");
        } else if (args[0]) {
          const userItemData = userStore.itemData; // []
          const globalItem = await Atlas.getGlobalItem();
          const checkUserItem = itemExistValidator({
            userItemStorage: userItemData,
            itemToClaim: args[0],
          });

          if (checkUserItem == false) {
            return msg.reply("Kamu sudah mengklaim kode ini sebelumnya!");
          } else if (checkUserItem == true) {
            const checkGlobalItem = globaItemValidator({
              globalItemData: globalItem,
              userInputItem: args[0],
            });

            if (
              checkGlobalItem.getValue == null ||
              checkGlobalItem.state == false
            ) {
              return msg.reply("Redeem code expired / sudahtidak valid!");
            } else if (checkGlobalItem.state == true) {
              const valueRedeem = checkGlobalItem.getValue.item;
              await Atlas.userItemSetter(userID, args[0]);
              await Atlas.changeLimit(userID, limit + valueRedeem).then(
                async (res) => {
                  console.log(res);
                  let txt =
                    `*Claim Sukses!*\n\n` +
                    `${userName}\n` +
                    `Kamu mendapatkan limit sebesar +${valueRedeem} dari redeem code\n_code yang sudah di claim tidak bisa di gunakan kembali oleh pengguna yang sama_\n\n` +
                    `_Regards.._`;
                  return msg.reply(txt).catch((err) => {
                    console.error(err);
                    msg.reply(new String(err));
                  });
                }
              );
            }
          }
        }
      }
    }
  },
};
