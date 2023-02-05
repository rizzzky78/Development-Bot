const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");
const { teleGraPhUploader } = require("../../libs/functions/myFunc");

const fs = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["gantiavatar"],
  category: "general",
  description: "Daftar agar bisa menggunakan Bot",
  callback: async ({ client, msg, prefix }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (userData == null) {
      return msg.reply(message.notReg);
    } else if (userData) {
      const { userID, isBan, limit } = userData;
      if (limit == 0) {
        return msg.reply(message.noLimit);
      } else if (isBan === "true") {
        return msg.reply(message.banned);
      } else {
        const imgFilePath = (await msg.download("buffer")) || (msg.quoted && (await msg.quoted.download("buffer")));

        if (!imgFilePath) {
          return msg.reply(
            "Tidak ada gambar yang mau di upload ngab!\ncontoh: kirim/upload gambar atau avatar dengan caption !gantiavatar"
          );
        } else if (imgFilePath) {
          let imageString = `data:image/jpeg;base64,${imgFilePath.toString("base64")}`;
          const imageBuffer = Buffer.from(
            imageString.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          let pathFileName = "./store/images/stateUserAvatar.jpg";
          fs.writeFileSync(pathFileName, imageBuffer);

          await Atlas.changeAvatar({
            paramsUserID: userID,
            setAvatar: await teleGraPhUploader(pathFileName),
          }).then(async (res) => {
            console.log(res);
            return client
              .sendMessage(msg.from, {
                text: "\n\n*Sukses!*\nAvatar Kamu telah diubah.\n\n",
                footer: `© ${setting.footers}`,
                templateButtons: [
                  {
                    index: 1,
                    quickReplyButton: {
                      displayText: "My Profile",
                      id: prefix + "myprofile",
                    },
                  },
                  {
                    index: 1,
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
                console.log(new Error(String(err)));
                return msg.reply(message.error);
              });
          });
        }
      }
    }
  },
};
