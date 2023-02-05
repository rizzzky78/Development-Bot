const { wmSticker, message } = require("../../config/global.config");
const { Atlas } = require("../../libs/controllers/dataUserHandler");

const mess = message;

const axios = require("axios").default;
const i18n = require("i18n");
const fs = require("fs");

const sticker = axios.create({
  baseURL: "https://sticker-api-tpe3wet7da-uc.a.run.app",
});

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["s", "stiker"],
  category: "sticker",
  description: "Sticker Maker / Fitur pembuat stiker",
  waitMessage: "Tunggu bentar ngab...",
  callback: async ({ msg, client, message }) => {
    const userData = await Atlas.getUserData(msg.senderNumber);
    if (userData == null) {
      return msg.reply(mess.notReg);
    } else if (userData) {
      const { userID, limit, isBan } = userData;
      if (isBan === "true") {
        return msg.reply(mess.banned);
      } else if (limit == 0) {
        return msg.reply(mess.noLimit);
      } else {
        const file =
          (await msg.download("buffer")) ||
          (msg.quoted && (await msg.quoted.download("buffer")));

        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
          const data = {
            image: `data:image/jpeg;base64,${file.toString("base64")}`,
            stickerMetadata: {
              pack: wmSticker.packname,
              author: wmSticker.author,
              keepScale: true,
              circle: false,
              removebg: false,
            },
          };

          let imageString = `data:image/jpeg;base64,${file.toString("base64")}`;
          const imageBuffer = Buffer.from(
            imageString.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          const fileName = "./commands/sticker/img.jpg"; // or image.png
          fs.writeFileSync(fileName, imageBuffer);
          console.log(`File saved: ${fileName}`);

          sticker.post("/prepareWebp", data).then((res) => {
            client
              .sendMessage(
                msg.from,
                { sticker: Buffer.from(res.data.webpBase64, "base64") },
                { quoted: message }
              )
              .then(async () => {
                const setLimit = limit - 1;
                await Atlas.updateUsage(userID, "sticker");
                const monit = await Atlas.changeLimit(userID, setLimit);
                console.log(monit);
                msg.reply("_limit digunakan -1_");
              });
          });
        } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
          const data = {
            file: `data:video/mp4;base64,${file.toString("base64")}`,
            stickerMetadata: {
              pack: wmSticker.packname,
              author: wmSticker.author,
              keepScale: true,
            },
            processOptions: {
              crop: false,
              fps: 10,
              startTime: "00:00:00.0",
              endTime: "00:00:7.0",
              loop: 0,
            },
          };
          sticker.post("/convertMp4BufferToWebpDataUrl", data).then((data) => {
            client
              .sendMessage(
                msg.from,
                {
                  sticker: Buffer.from(
                    data.data.split(";base64,")[1],
                    "base64"
                  ),
                },
                { quoted: message }
              )
              .then(async () => {
                const setLimit = limit - 1;
                await Atlas.updateUsage(userID, "sticker");
                const monit = await Atlas.changeLimit(userID, setLimit);
                console.log(monit);
                msg.reply("_limit digunakan -1_");
              });
          });
        } else {
          msg.reply(i18n.__("sticker.no_media"));
        }
      }
    }
  },
};
