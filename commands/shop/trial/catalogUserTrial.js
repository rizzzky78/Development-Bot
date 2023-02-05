const { ShopTrial } = require("../../../libs/controllers/dataProductsHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["myetalase"],
  category: "Shop",
  description: "Katalog Produk",
  callback: async ({ client, msg, args, prefix }) => {
    const DataUser = await ShopTrial.getAllUserTrialProduct(msg.senderNumber);
    if (!DataUser || DataUser == null) {
      return msg.reply(
        "Kamu belum membuat catalog!, buat katalog pertama Anda dengan cara:\n.jointrial Namamu\ncontoh: .gabungtrial Rizky"
      );
    } else if (DataUser) {
      const { id, userName, registered, dataTrial } = DataUser;
      if (!args[0]) {
        let RowsProduct = [];
        let sections = [
          {
            title: `${userName}'s Catalog`.toUpperCase(),
            rows: RowsProduct,
          },
          {
            title: "Bantuan / Help".toUpperCase(),
            rows: [
              {
                title: "Butuh Bantuan?",
                rowId: prefix + "needhelp",
                description: "Ada pertanyaan?, silahkan pilih menu ini.",
              },
            ],
          },
        ];
        const userDataProducts = dataTrial.product.map(
          (val) => ({
            title: val.data.name,
            rowId: `${prefix}getmyproduct ${val.idProduct}`,
            description: `Dibuat : ${val.data.timeStamp}`,
          }),
          {}
        );
        RowsProduct.push(...userDataProducts);

        let texts =
          `Hi ${msg.pushName}!\nTerimakasih telah mencoba demo/trial Bot Marketplace ini\n\n` +
          `Data Anda:\n` +
          `ID: ${id}\n` +
          `Terdaftar pada:\n${registered}\n\n\n` +
          `Berikut adalah list produk Anda\n` +
          `Anda bisa menambah produk maupun menghapus produk.\n\n` +
          `_note: ini merupakan trial dan data yang disajikan merupakan data yang dimana lingkupnya hanya bisa diakses oleh Anda sendiri, berbeda lagi jika sudah ranah production_\n\n` +
          `Silahkan klik tombol dibawah untuk membuka list produk.`;

        return client
          .sendMessage(msg.from, {
            title: `*${userName}'s Catalog*`,
            text: texts,
            footer: `© ${setting.botName}`,
            buttonText: "Buka Katalog",
            sections,
            viewOnce: true,
          })
          .catch((err) => {
            msg.reply("Terjadi Error!\n\n" + new String(err));
          });
      }
    }
  },
};
