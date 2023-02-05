const { setting } = require("../../../config/global.config");
const {
  Shop,
  ShopTrial,
} = require("../../../libs/controllers/dataProductsHandler");
const { teleGraPhUploader } = require("../../../libs/functions/myFunc");

const fs = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["uploadmyproduk"],
  category: "shop",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  expectedArgs: "!uploadmyproduk Nama Produk # 125000 # Deskripsi produk",
  callback: async ({ client, msg, args, prefix }) => {
    const DataUser = await Shop.getDataUser(msg.senderNumber);
    if (!DataUser || DataUser == null) {
      return msg.reply(
        "Kamu belum membuat catalog!, buat katalog pertama Anda dengan cara:\n.jointrial Namamu\ncontoh: .gabungtrial Rizky"
      );
    } else if (DataUser) {
      const { numberPhone } = DataUser;
      const imgFilePath =
        (await msg.download("buffer")) ||
        (msg.quoted && (await msg.quoted.download("buffer")));

      if (!imgFilePath) {
        return msg.reply("Tidak ada gambar produk!");
      } else if (imgFilePath) {
        if (!args[0]) {
          return msg.reply(
            "Upload produk Anda dengan cara:\nKirim gambar dengan caption:\n.uploadmyproduk Nama Produk Anda # Harga Produk # Deskripsi Produk"
          );
        } else if (!args.includes("#")) {
          return msg.reply("Format salah!, gunakan # sebagai pembatas");
        } else {
          const imageString = `data:image/jpeg;base64,${imgFilePath.toString(
            "base64"
          )}`;
          const imageBuffer = Buffer.from(
            imageString.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          const pathFileName = "./store/images/stateImgTrialUser.jpg";
          fs.writeFileSync(pathFileName, imageBuffer);

          const arg = args.join(" ");
          const appendMyProduct = {
            names: arg.split("#")[0],
            prices: arg.split("#")[1],
            description: arg.split("#")[2],
            images: await teleGraPhUploader(pathFileName),
          };

          const uploadData = await ShopTrial.insertTrialProduct(
            numberPhone,
            appendMyProduct
          );
          const { callback, data } = uploadData;
          console.log(callback);
          let texts =
            `*Upload Produk Berhasil!*\n\n` +
            `*${data.data.name}*\n#${data.idProduct}\n\n` +
            `Harga: Rp.${data.data.price}\n\n` +
            `Deskripsi Produk:\n${data.data.desc}\n\n` +
            `_Produk ini diupload pada:_\n${data.data.timeStamp}_`;
          return client
            .sendMessage(msg.from, {
              caption: texts,
              footer: setting.botName,
              image: { url: data.data.image },
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Lihat Katalog Saya",
                    id: prefix + "myetalase",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            })
            .catch((err) => {
              msg.reply("Terjadi Error!\n\n" + new Error(String(err)));
            });
        }
      }
    }
  },
};
