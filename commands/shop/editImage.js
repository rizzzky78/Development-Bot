const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");
const { teleGraPhUploader } = require("../../libs/functions/myFunc");

const fs = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["editgambar"],
  category: "Shop",
  description: "Edit harga produk",
  waitMessage: "Mohon tunggu sebentar, sedang diproses...",
  callback: async ({ client, msg, args, prefix }) => {
    const userData = await Shop.getDataUser(msg.senderNumber);
    if (userData == null || userData.statusRole === "buyer") {
      return msg.reply("Anda tidak terdaftar sebagai Admin!");
    } else if (userData) {
      if (!args[0]) {
        return client.sendMessage(msg.from, {
          text: "\n\nFormat yang dimasukan salah!\n\n",
          footer: setting.botName,
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Lihat Cara Penggunaan",
                id: prefix + "shop readme",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        });
      } else if (args[0]) {
        const imgFilePath =
          (await msg.download("buffer")) ||
          (msg.quoted && (await msg.quoted.download("buffer")));

        if (!imgFilePath) {
          return msg.reply("Tidak ada masukan gambar!");
        } else if (imgFilePath) {
          let imageString = `data:image/jpeg;base64,${imgFilePath.toString(
            "base64"
          )}`;
          const imageBuffer = Buffer.from(
            imageString.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          let pathFileName = "./stateImgproduct.jpg";
          fs.writeFileSync(pathFileName, imageBuffer);

          let arg = args.join(" ");
          let appendChange = {
            id: arg.split("#")[0].trim(),
            set: await teleGraPhUploader("./stateImgproduct.jpg"),
          };

          const Data = await Shop.edit._image(
            appendChange.id,
            appendChange.set
          );
          const { callback, value } = Data;
          console.log(callback, value);
          if (callback.value == null && !appendChange.set) {
            return msg.reply("Error!, Masukan ID atau perintah tidak valid!");
          }

          if (callback.value && appendChange.set) {
            return client.sendMessage(msg.from, {
              text: `*Edit Sukses!*\n\n\nID Produk: ${value.id}\nSet Nama Produk ke:\n${value.value}\n`,
              footer: setting.botName,
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Cek Perubahan",
                    id: prefix + `getproduct ${value.id}`,
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Buka Katalog",
                    id: prefix + "catalog",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            });
          }
        }
      }
    }
  },
};
