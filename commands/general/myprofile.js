const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "about",
  description: "Cek Profil Kamu.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (!userData || userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const {
        userNo,
        userID,
        userName,
        avatar,
        age,
        hobby,
        limit,
        isBan,
        serial,
        registeredOn,
        userStore,
      } = userData;
      const { itemData, usage, openAi, documents, images } = userStore;

      let texts =
        `*${msg.pushName}*\n*#${userName}*\n\n\n` +
        `*Data Kamu*\n` +
        `User No:\t${userNo}\n` +
        `Nomor:\twa.me/${userID}\n` +
        `Umur:\t${age}\n` +
        `Hobby:\t${hobby}\n` +
        `Limit:\t${limit}\n` +
        `Status Banned: ${isBan}\n` +
        `Serial ID: ${serial}\n\n` +
        `Terdaftar Pada:\n${registeredOn}\n\n` +
        `*Statistik Kamu & Total Data (item):*\n` +
        `Total Claim: ${itemData.length - 1}\n` +
        `Penggunaan Bot: ${usage.length - 1}\n` +
        `History OpenAi: ${openAi.length - 1}\n` +
        `Gambar: ${images.length - 1}\n` +
        `Dokumen: ${documents.length - 1}\n\n` +
        `_Kamu bisa mengganti profile avatar dengan cara:_\n` +
        `_upload foto/gambar dengan caption '.gantiavatar_`;

      return await client
        .sendMessage(msg.from, {
          caption: texts,
          footer: `© ${setting.footers}`,
          title: `${setting.botName} Help`,
          image: { url: avatar },
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "My Store",
                id: prefix + "mystore",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Buka Menu",
                id: prefix + "info",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        })
        .catch((err) => {
          return msg.reply(new Error(String(err)));
        });
    }
  },
};
