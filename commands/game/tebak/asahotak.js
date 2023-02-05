const users = require("@database/services/users");
const i18n = require("i18n");
const api = require("@libs/utils/api");

const _collection = new Map();

const { message } = require("../../../config/global.config");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "game",
  description: "Game asah otak, jawab dan dapatkan bonus limit!.",
  callback: async ({ msg }) => {
    if (_collection.get(msg.from)) {
      return msg.reply(
        i18n.__("game.finish_last_first"),
        _collection.get(msg.from)
      );
    }

    const { data } = await api("lolhuman")
      .get("/api/tebak/asahotak")
      .catch(console.error);

    if (data.status !== 200) return msg.reply(message.error);

    console.log(
      `Asah Otak\nQ: ${data.result.pertanyaan}\nA: ${data.result.jawaban}`
    );
    let question = await msg.reply(
      "{question}\n\nTime 60 seconds!".format({
        question: data.result.pertanyaan,
      })
    );

    _collection.set(msg.from, question);

    msg
      .createMessageCollector({
        filter: data.result.jawaban.toLowerCase(),
        max: 1,
      })
      .on("collect", (msg) => {
        let xp = Math.floor(Math.random() * (999 - 1) + 1);
        users.addExp(msg, msg.senderNumber, xp);
        // msg.reply(i18n.__('game.right_answer', { xp }))
        msg.reply("Jawaban Kamu benar!");
      })

      .on("end", (res) => {
        _collection.delete(msg.from);
        if (res == "timeout") {
          msg.reply(
            i18n.__("game.timeout_answer", { answer: data.result.jawaban }),
            question
          );
        }
      });
  },
};
