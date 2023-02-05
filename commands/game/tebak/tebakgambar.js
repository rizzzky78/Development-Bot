const users = require("@database/services/users");
const i18n = require("i18n");
const api = require("@libs/utils/api");

const _collection = new Map();

const { Atlas } = require("../../../libs/controllers/dataUserHandler");
const { message } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "game",
  description: "Game tebak gambar",
  callback: async ({ msg }) => {
    if (_collection.get(msg.from)) {
      return msg.reply(
        i18n.__("game.finish_last_first"),
        _collection.get(msg.from)
      );
    }

    const { data } = await api("lolhuman")
      .get("/api/tebak/gambar2")
      .catch(console.error);

    if (data.status !== 200) return msg.reply(message.error);

    console.log(`Tebak Gambar\nA: ${data.result.answer}`);

    let question = await msg.replyImage(
      { url: data.result.image },
      "Time 60 seconds!"
    );

    _collection.set(msg.from, question);

    msg
      .createMessageCollector({
        filter: data.result.answer,
        max: 1,
      })
      .on("collect", (msg) => {
        let xp = Math.floor(Math.random() * (999 - 1) + 1);
        users.addExp(msg, msg.senderNumber, xp);
        // msg.reply(i18n.__("game.right_answer", { xp }));
        msg.reply("Jawaban Kamu benar!");
      })

      .on("end", (res) => {
        _collection.delete(msg.from);
        if (res == "timeout") {
          msg.reply(
            i18n.__("game.timeout_answer", { answer: data.result.answer }),
            question
          );
        }
      });
  },
};
