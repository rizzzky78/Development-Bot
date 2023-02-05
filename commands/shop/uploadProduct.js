const { setting } = require("../../config/global.config");
const { Shop } = require("../../libs/controllers/dataProductsHandler");
const { teleGraPhUploader } = require("../../libs/functions/myFunc");

const fs = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["upload", "uploadproduk"],
  category: "shop",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  expectedArgs:
    "!uploadproduk Nama Produk #125000 #Nama Kategori Produk #Deskripsi produk",
  callback: async ({ client, msg, args, prefix }) => {
    const imgFilePath =
      (await msg.download("buffer")) ||
      (msg.quoted && (await msg.quoted.download("buffer")));

    if (!imgFilePath) {
      return msg.reply("Tidak ada gambar produk!");
    } else if (imgFilePath) {
      if (!args[0]) {
        return client.sendMessage(msg.from, {
          text: "Format Salah!\nMasukan perintah dengan gambar produk dan caption berupa parameter perintah\nKetuk tombol dibawah untuk melihat cara penggunaan.",
          footer: setting.botName,
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Cara Penggunaan",
                id: prefix + "upload howtoupload",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        });
      } else if (args[0]) {
        let imageString = `data:image/jpeg;base64,${imgFilePath.toString(
          "base64"
        )}`;
        const imageBuffer = Buffer.from(
          imageString.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const pathFileName = "./store/images/stateImgUpload.jpg";
        fs.writeFileSync(pathFileName, imageBuffer);

        let arg = args.join(" ");
        if (!args && !args.includes("#")) {
          return msg.reply(
            "Format salah!\ncontoh: !uploadproduk Magafit#55000#Herbal#Ini adalah produk herbal blablabla..."
          );
        }

        let appendForm = {
          nameProducts: arg.split("#")[0],
          prices: arg.split("#")[1],
          categorys: arg.split("#")[2],
          description: arg.split("#")[3],
          imagePath: await teleGraPhUploader(pathFileName),
        };

        const result = await Shop.appendProduct("produk-ke", appendForm);
        if (result == null) {
          return msg.reply("Terjadi Error :(");
        }
        const { insertCallback, productForm } = result;
        console.log(insertCallback, productForm);

        return await client
          .sendMessage(msg.from, {
            caption: `*UPLOAD SUKSES!*\n\n\nData Produk\n*${productForm.data.name}*\n#\t${productForm.id}\n\nHarga:\tRp.${productForm.data.price}\nKategori:\t${productForm.data.category}\nDeskripsi:\n\n${productForm.data.desc}\n\nDiupload pada:\n${productForm.data.timeStamp}`,
            footer: setting.botName,
            title: productForm.data.name,
            image: { url: productForm.data.image },
            templateButtons: [
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Lihat Katalog",
                  id: prefix + "catalog",
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
  },
};
