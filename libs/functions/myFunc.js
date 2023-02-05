const moment = require("moment-timezone");
const axios = require("axios");
const BodyForm = require("form-data");
const fs = require("fs");
const cryptoRandomString = require("crypto-random-string");

/**
 * @example Format: Day Name Day Month Year, Local Timezone
 * ExampleOutput: `Rabu 15 Januari 2023, 18:30:15 WIB`
 */
const makeDate = () => {
  let makeDate = moment()
    .tz("Asia/Jakarta")
    .locale("id")
    .format("dddd D MMMM YYYY, H:mm:ss");
  return makeDate + " " + "WIB";
};
/**
 * @param { string } pathFile
 * @example pathFile: "./img.png" | "./img.png"
 * Output: "https://telegra.ph/12345678"
 */
const teleGraPhUploader = (pathFile = "") => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(pathFile)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(pathFile));
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve("https://telegra.ph" + data.data[0].src);
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
};
/**
 * @param { string } url
 * @param { object } options
 * @example fetchJson("urls here")
 * Output:
 * fetchJson(URL) => Axios<AxiosResponse<Data>>
 */
const fetchJson = async (url, options) => {
  try {
    options ? options : {};
    const Response = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    if (Response.data.status === 200) {
      return Response.data;
    }
  } catch (err) {
    return new Error(String(err));
  }
};

const Runtime = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
/**
 * @param { string } str
 * @param { number } maxLength
 * @example trimStr(String, 25)
 * // will return trimmed string with length only 25 words.
 */
const trimStr = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
};
/**
 * @param { object } storeQueryData
 * @example getDataStore({ dataStore: [], inputKey: string })
 * OutputExample:
 * const { key, alias, docs, created  } = documents
 * const { key, alias, imageUrl, created  } = images
 * const { key, alias, answer, created  } = openAiHistory
 */
const getDataStore = (storeQueryData) => {
  const { dataStore, inputKey } = storeQueryData;
  let targetKey = inputKey.trim();
  const value = dataStore.find((selectItem) => selectItem.key === targetKey);
  return value ? value : null;
};
/**
 * @param { object } objectItem
 * @example
 * InputExample: const { userItemStorage: [], itemToClaim: string } = objectItem
 * OutputExample: true | false
 * // if true mean claim is new then the claim is valid => do something
 * // if false mean claim is already exist then the claim is invalid => return
 */
const itemExistValidator = (objectItem) => {
  const { userItemStorage, itemToClaim } = objectItem;
  const searchValue = userItemStorage.find(
    (select) => select.value == itemToClaim
  );
  if (searchValue == null) {
    return true; // valid
  } else if (searchValue && searchValue.value == itemToClaim) {
    return false; // not valid, user already claim
  }
};
// class itemExistValidator {
//   constructor(objectItem) {
//     const { userItemStorage, itemToClaim } = objectItem;
//     this.userItemStorage = userItemStorage;
//     this.itemToClaim = itemToClaim;
//   }

//   isValid() {
//     const searchValue = this.userItemStorage.find(
//       (select) => select.value == this.itemToClaim
//     );
//     if (searchValue == null) {
//       return true; // valid
//     } else if (searchValue && searchValue.value == this.itemToClaim) {
//       return false; // not valid, user already claim
//     }
//   }
// }
/**
 *
 * @param { object } objectItem
 * @example
 * InputExample:
 * const { globalItemData: [], userInputItem: string } = objectItem
 * OutputExample:
 * const { getValue: { type, value }, state: boolean } = globaItemValidator(objectItem)
 *
 * ReturnExample:
 * { getValue: any|null, state: true|false }
 * // give the state to action based on output return
 */
const globaItemValidator = (objectItem) => {
  const { globalItemData, userInputItem } = objectItem;
  const getValue = globalItemData.find(
    (itemData) => itemData.value == userInputItem
  );
  if (!getValue || getValue == null) {
    return { getValue: null, state: false };
  } else if (getValue) {
    return { getValue, state: true };
  }
};

module.exports = {
  makeDate,
  teleGraPhUploader,
  fetchJson,
  Runtime,
  trimStr,
  getDataStore,
  itemExistValidator,
  globaItemValidator,
};
