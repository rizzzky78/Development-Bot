const { Atlas } = require("../../libs/controllers/dataUserHandler");
const { setting } = require("../../config/global.config");
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["daftar", "register"],
  category: "general",
  waitMessage: 'Mohon tunggu sebentar...',
  description: "Daftar agar bisa menggunakan Bot",
  example: '{prefix}{command} Budi|cowo|18|Ngegame\n\nPilihan Gender: cowo/cewe',
  callback: async ({ client, msg, args, prefix }) => {
    try {
      const userData = await Atlas.getUserData(msg.senderNumber);
      if (userData || userData.userID == msg.senderNumber) {
        return msg.reply(
          "Kamu sudah terdaftar sebelumnya, silahkan cek profil kamu melalui !myprofile"
        );
      }
    } catch {
      if (!args[0]) return msg.reply("Contoh: !daftar Bowo|cowo|17|Turu");

      let id = msg.senderNumber;
      let arg = args.join(" ");
      let usernames = arg.split("|")[0];
      let genders = arg.split("|")[1];
      let agess = arg.split("|")[2];
      let hobbyss = arg.split("|")[3];

      if (!args.includes("|"))
        return msg.reply("Format salah!\ncontoh: daftar Budi|cowo|25|turu");
      if (usernames.length > 20)
        return msg.reply('Nama gausah panjang", pendek aja');
      if (hobbyss.length > 20)
        return msg.reply("Hobi kamu kebanyakan, cukup 1 aja");
      if (isNaN(agess)) return msg.reply("Umur harus berupa angka");
      if (parseInt(agess) > 60)
        return msg.reply("Umur lo terlalu tua buat pakai Bot ini!");
      if (parseInt(agess) < 12)
        return msg.reply(
          "Yang bener aja, bocil gausah maenan bot... nyusu aja sana"
        );
      if (!["cewe", "cowo"].includes(genders))
        return msg.reply(
          "Gender hanya bisa: *cewe* atau *cowo*\ncontoh: daftar Finda Bersari|cewe|17|nyanyi"
        );

      let senderProfilePicture;
      try {
        senderProfilePicture = await client.profilePictureUrl(
          msg.from,
          "image",
          2000
        );
      } catch {
        senderProfilePicture = setting.imageBot;
      }

      let formData = {
        userNumber: id,
        userNames: usernames,
        ages: parseInt(agess),
        hobbys: hobbyss,
        avatars: senderProfilePicture,
      };
      const { callback, userDataForm } = await Atlas.makeNewUser(formData);
      const {
        userNo,
        userID,
        userName,
        age,
        hobby,
        limit,
        serial,
        registeredOn,
      } = userDataForm;
      let texts =
        `*Registrasi Berhasil!*\n\n` +
        `No. Pendaftaran: ${userNo}\n` +
        `Nomor: ${userID}\n` +
        `Nama: ${userName}\n` +
        `Umur: ${age}\n` +
        `Hobby: ${hobby}\n` +
        `Limit: ${limit}\n` +
        `Serial ID: ${serial}\n` +
        `Terdaftar Pada:\n${registeredOn}\n\n\n`+
        `Kamu bisa mengganti avatar profile kamu kapan saja!\n` +
        `Hints perintah:\nUpload foto/gambar dengan caption .gantiavatar\n\n` +
        `Setelah Kamu mendaftar kamu sekarang bisa mennggunakan fitur Cloud Store\nPowered By: Bot\n` +
        `_Regards.._`

      console.log(callback, userDataForm);

      return client
        .sendMessage(msg.from, {
          caption: texts,
          footer: `© ${setting.footers}`,
          image: { url: senderProfilePicture },
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "My Profile",
                id: prefix + "myprofile",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "My Store",
                id: prefix + "mystore",
              },
            },
            {
              index: 3,
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
