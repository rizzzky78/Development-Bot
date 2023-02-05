const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting, message } = require("../../config/global.config");
const { teleGraPhUploader } = require("../../libs/functions/myFunc");

const fs = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["saveimg", "simpangambar"],
  category: "about",
  description: "Cek Penyimpanan Kamu.",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
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
        if (!args[0]) {
          return msg.reply(
            "Format salah!\ncontoh: !simpangambar Nama/Judul gambar\n\nPanjang judul gambar 3-4 kata."
          );
        } else if (args[0] && args[1]) {
          const imgFilePath =
            (await msg.download("buffer")) ||
            (msg.quoted && (await msg.quoted.download("buffer")));

          if (!imgFilePath) {
            return msg.reply("Tidak ada gambar yang mau di simpan ngab!");
          }
          if (imgFilePath) {
            let imageString = `data:image/jpeg;base64,${imgFilePath.toString(
              "base64"
            )}`;
            const imageBuffer = Buffer.from(
              imageString.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            );
            let pathFileName = "./store/images/stateStoreImg.jpg";
            fs.writeFileSync(pathFileName, imageBuffer);

            let arg = args.join(" ");
            let formInput = {
              nameImg: arg.split("|")[0],
              imgUrl: await teleGraPhUploader(pathFileName),
            };
            console.log(formInput);
            await Atlas.insertImages(userID, await formInput)
              .then(async (res) => {
                console.log(res.callback);
                let texts =
                  `*Upload Gambar Berhasil!*\n\n` +
                  `ID Gambar: ${res.formImages.key}\n` +
                  `Nama Gambar: ${res.formImages.alias}\n` +
                  `Dibuat:\n${res.formImages.created}\n\n` +
                  `Ketuk tombol dibawah untuk membuka penyimpanan Kamu.`;
                return client.sendMessage(msg.from, {
                  text: texts,
                  footer: `© ${setting.botName}`,
                  title: `${setting.botName}`,
                  templateButtons: [
                    {
                      index: 1,
                      quickReplyButton: {
                        displayText: "My Store",
                        id: prefix + "mystore",
                      },
                    },
                  ],
                  viewOnce: true,
                  mentions: [msg.sender],
                });
              })
              .then(async () => {
                const setLimit = limit - 1;
                let monit = await Atlas.changeLimit(userID, setLimit);
                console.log(monit);
              });
          }
        }
      }
    }
  },
};
