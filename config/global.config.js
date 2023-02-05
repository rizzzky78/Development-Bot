const {
  indexMenu,
  shopMenu,
  initialStoreInput,
  lewdContainer,
  Lewd,
  openAiHelper,
} = require("./global.info");

const setting = {
  botName: "Dev Bot",
  footers: "Julius Pedo",
  aliasBot: "Development Bot",
  imageBot:
    "https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/img-azusa-main.jpeg",
  imageTemplate:
    "https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/img-azusa-main.jpeg",
  ownerNumber: '6281329585825'
  };

const ATLAS = {
  USER: "rizzzky",
  CREDS: "DEV",
  URI: "mongodb://rizzzky:DEV@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-01.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-02.w7oyxwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yds57g-shard-0&authSource=admin&retryWrites=true&w=majority",
  DATABASE: "MainDB-Bot",
  COLLECTION: {
    STATS: "statistics-bot",
    ITEM: 'global-item-data',
    USER: "users-wa-bot",
    USERSHOP: "user-role",
    PRODUCTS: "data-products",
  },
};

const apikeys = {
  lolhuman: "thisMyApis",
  openAi: "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",
};

const wmSticker = {
  packname: "Bowo Pedo",
  author: "Julius Pedo",
};

const prefix = ".";
const message = {
  notReg: `Kamu belum terdaftar di database Bot!\nSilahkan daftar terlebih dahulu dengan format ${prefix}daftar Nama|gender|umur|hobi\ncontoh: ${prefix}daftar Julius|cowo|18|game`,
  hasReg: `Kamu sudah terdaftar sebelumnya, Kamu bisa cek profil kamu melalui perintah _${prefix}myprofile_ atau ketuk tombol di bawah ini.`,
  banned: "\nKamu sudah terbanned!, silahkan hubungi owner untuk unban.\n",
  noLimit: "\nLimit Kamu kurang / sudah habis!\n",
  storeErr: "\n*Error!*\nPengakses Database tidak valid!\n",
  error: "\nMaaf sepertinya terjadi error :(\n",
};

const myButtons = {
  getLimit: {
    text: message.noLimit,
    footer: setting.footers,
    templateButtons: [
      {
        index: 1,
        quickReplyButton: {
          displayText: "How to Get Limit",
          id: prefix + "info getlimit",
        },
      },
      {
        index: 2,
        quickReplyButton: {
          displayText: "Buy Limit",
          id: prefix + "info buylimit",
        },
      },
    ],
  },
  banned: {
    text: message.banned,
    footer: setting.footers,
    buttons: [
      {
        buttonId: prefix + "info rules",
        buttonText: { displayText: "Rules & FAQ" },
        type: 1,
      },
      {
        buttonId: prefix + "owner",
        buttonText: { displayText: "Hubungi Owner" },
        type: 1,
      },
    ],
    headerType: 1,
  },
  error: {
    text: message.error,
    footer: setting.footers,
    buttons: [
      {
        buttonId: prefix + "info error",
        buttonText: { displayText: "Rules & FAQ" },
        type: 1,
      },
      {
        buttonId: prefix + "owner",
        buttonText: { displayText: "Hubungi Owner" },
        type: 1,
      },
    ],
    headerType: 1,
  },
  test: {
    text: '\nNyoba Doank!\n',
    footer: setting.footers,
    buttons: [
      {
        buttonId: prefix + "info coy",
        buttonText: { displayText: "Nyoba 1" },
        type: 1,
      },
      {
        buttonId: prefix + "info error",
        buttonText: { displayText: "Nyoba 2" },
        type: 1,
      },
    ],
    headerType: 1,
  },
};

const defaultLimit = 50;

module.exports = {
  ATLAS,
  wmSticker,
  defaultLimit,
  setting,
  apikeys,
  message,
  myButtons,
  indexMenu,
  shopMenu,
  initialStoreInput,
  lewdContainer,
  Lewd,
  openAiHelper,
};
