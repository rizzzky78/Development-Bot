// const { setting } = require("../../config/global.config");
// const { Shop } = require("../../libs/controllers/dataProductsHandler");
// const { teleGraPhUploader } = require("../../libs/functions/myFunc");

// const fs = require("fs");

// /**
//  * @type { import('@libs/builders/command').ICommand }
//  */
// module.exports = {
//   aliases: ["editproduct"],
//   category: "Shop",
//   description: "Edit data produk",
//   waitMessage: "Mohon tunggu sebentar, sedang diproses...",
//   callback: async ({ client, msg, args, prefix }) => {
//     if (!args) {
//       return client.sendMessage(msg.from, {
//         text: "\n\nFormat yang dimasukan salah!\n\n",
//         footer: setting.botName,
//         templateButtons: [
//           {
//             index: 1,
//             quickReplyButton: {
//               displayText: "Lihat Cara Penggunaan",
//               id: prefix + "shop readme",
//             },
//           },
//         ],
//         viewOnce: true,
//         mentions: [msg.sender],
//       });
//     }
//     if (args[0] === "nama") {
//       let argName = args.join(" ");
//       if (argName[1] < 1 && argName[2].length < 1) {
//         return msg.reply("ID produk tidak valid!");
//       }
//       await Shop.edit
//         ._name(argName.split("#")[1], argName.split("#")[2])
//         .then(async (data) => {

//           return client.sendMessage(msg.from, {
//             text: `*Edit Sukses!*\n\n\nID Produk: ${data.value.id}\nSet Nama Produk ke:\n${data.value.value}\n`,
//             footer: setting.botName,
//             templateButtons: [
//               {
//                 index: 1,
//                 quickReplyButton: {
//                   displayText: "Cek Perubahan",
//                   id: prefix + `getproduct ${data.value.id}`,
//                 },
//               },
//               {
//                 index: 2,
//                 quickReplyButton: {
//                   displayText: "Buka Katalog",
//                   id: prefix + "catalog",
//                 },
//               },
//             ],
//             viewOnce: true,
//             mentions: [msg.sender],
//           });
//         });
//     }
//     if (args[0] === "harga") {
//       let argPrice = args.join(" ");
//       await Shop.edit
//         ._price(argPrice.split("#")[1], argPrice.split("#")[2])
//         .then(async (data) => {
//           if (data.callback == null) return msg.reply("ID produk tidak valid!");

//           return client.sendMessage(msg.from, {
//             text: `*Edit Sukses!*\n\n\nID Produk: ${data.value.id}\nSet Harga Produk ke:\n${data.value.value}\n`,
//             footer: setting.botName,
//             templateButtons: [
//               {
//                 index: 1,
//                 quickReplyButton: {
//                   displayText: "Cek Perubahan",
//                   id: prefix + `getproduct ${data.value.id}`,
//                 },
//               },
//               {
//                 index: 2,
//                 quickReplyButton: {
//                   displayText: "Buka Katalog",
//                   id: prefix + "catalog",
//                 },
//               },
//             ],
//             viewOnce: true,
//             mentions: [msg.sender],
//           });
//         });
//     }
//     if (args[0] === "kategori") {
//       let argCategory = args.join(" ");
//       await Shop.edit
//         ._category(argCategory.split("#")[1], argCategory.split("#")[2])
//         .then(async (data) => {
//           if (data.callback == null) return msg.reply("ID produk tidak valid!");

//           return client.sendMessage(msg.from, {
//             text: `*Edit Sukses!*\n\n\nID Produk: ${data.value.id}\nSet Kategori Produk ke:\n${data.value.value}\n`,
//             footer: setting.botName,
//             templateButtons: [
//               {
//                 index: 1,
//                 quickReplyButton: {
//                   displayText: "Cek Perubahan",
//                   id: prefix + `getproduct ${data.value.id}`,
//                 },
//               },
//               {
//                 index: 2,
//                 quickReplyButton: {
//                   displayText: "Buka Katalog",
//                   id: prefix + "catalog",
//                 },
//               },
//             ],
//             viewOnce: true,
//             mentions: [msg.sender],
//           });
//         });
//     }
//     if (args[0] === "gambar") {
//       let argImages = args.join(" ");

//       const imgFilePath =
//         (await msg.download("buffer")) ||
//         (msg.quoted && (await msg.quoted.download("buffer")));

//       if (!imgFilePath)
//         return msg.reply(
//           "Tidak ada masukan gambar!, silahkan lihat panduan penggunaan."
//         );

//       let imageString = `data:image/jpeg;base64,${imgFilePath.toString(
//         "base64"
//       )}`;
//       const imageBuffer = Buffer.from(
//         imageString.replace(/^data:image\/\w+;base64,/, ""),
//         "base64"
//       );
//       let pathFileName = "stateImgProduct.jpg";
//       fs.writeFileSync(pathFileName, imageBuffer);

//       let urlsImage = await teleGraPhUploader("stateImgProduct.jpg");

//       await Shop.edit
//         ._image(argImages.split("#")[1], urlsImage)
//         .then(async (data) => {
//           if (data.callback == null) return msg.reply("ID produk tidak valid!");

//           return client.sendMessage(msg.from, {
//             text: `*Edit Sukses!*\n\n\nID Produk: ${data.value.id}\nSet Gambar Produk ke Link:\n${data.value.value}\n`,
//             footer: setting.botName,
//             templateButtons: [
//               {
//                 index: 1,
//                 quickReplyButton: {
//                   displayText: "Cek Perubahan",
//                   id: prefix + `getproduct ${data.value.id}`,
//                 },
//               },
//               {
//                 index: 2,
//                 quickReplyButton: {
//                   displayText: "Buka Katalog",
//                   id: prefix + "catalog",
//                 },
//               },
//             ],
//             viewOnce: true,
//             mentions: [msg.sender],
//           });
//         });
//     }
//     if (args[0] === "deskripsi") {
//       let argDesc = args.join(" ");
//       await Shop.edit
//         ._description(argDesc.split("#")[1], argDesc.split("#")[2])
//         .then(async (data) => {
//           if (data.callback == null) return msg.reply("ID produk tidak valid!");

//           return client.sendMessage(msg.from, {
//             text: `*Edit Sukses!*\n\n\nID Produk: ${data.value.id}\nSet Nama Produk ke:\n${data.value.value}\n`,
//             footer: setting.botName,
//             templateButtons: [
//               {
//                 index: 1,
//                 quickReplyButton: {
//                   displayText: "Cek Perubahan",
//                   id: prefix + `getproduct ${data.value.id}`,
//                 },
//               },
//               {
//                 index: 2,
//                 quickReplyButton: {
//                   displayText: "Buka Katalog",
//                   id: prefix + "catalog",
//                 },
//               },
//             ],
//             viewOnce: true,
//             mentions: [msg.sender],
//           });
//         });
//     }
//     // gap
//   },
// };
