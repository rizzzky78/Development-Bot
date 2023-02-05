const { atlasConnect } = require("./atlasConnect");
const {
  ATLAS,
  defaultLimit,
  initialStoreInput,
} = require("../../config/global.config");
const { makeDate } = require("../functions/myFunc");

const cryptoRandomString = require("crypto-random-string");

const serveDatabase = atlasConnect.db(ATLAS.DATABASE);
const serveCollection = serveDatabase.collection(ATLAS.COLLECTION.USER);
const serveStatistics = serveDatabase.collection(ATLAS.COLLECTION.STATS);
const serveItem = serveDatabase.collection(ATLAS.COLLECTION.ITEM);

const keyMaker = cryptoRandomString(5).toUpperCase();

const getPrevUserLength = async () => {
  let totalUser = (await getAllUser()).length;
  let addUserLength = totalUser + 1;
  return addUserLength;
};
/**
 * @param { object } dataUser
 * @example const { userNumber, userNames, avatars, ages, hobbys } = dataUser
 */
const makeNewUser = async (dataUser) => {
  const { userNumber, userNames, avatars, ages, hobbys } = dataUser;
  let userDataForm = {
    userNo: await getPrevUserLength(),
    userID: userNumber.trim(),
    userName: userNames,
    avatar: avatars,
    age: ages,
    hobby: hobbys,
    limit: defaultLimit,
    isBan: "false",
    serial: cryptoRandomString(7).toUpperCase(),
    registeredOn: makeDate(),
    userStore: initialStoreInput,
  };
  const callback = serveCollection.insertOne(userDataForm);
  return (await callback) ? { callback, userDataForm } : null;
};
/**
 * @param { string } changeObj
 * @example
 * // InputExample:
 * paramsUserID: userID<string>
 * setAvatar: url<string>
 * const { paramsUserID, setAvatar } = changeObj;
 *
 */
const changeAvatar = async (changeObj) => {
  const { paramsUserID, setAvatar } = changeObj;
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $set: { avatar: setAvatar } }
  );
  return callback ? { callback, setAvatar } : null;
};
/**
 * @param { string } paramsUserID
 * @param { number } changeLimit
 * @example changeLimit("62812345678", 50)
 * // will changes limit to 50 for ID: 62812345678
 */
const changeLimit = async (paramsUserID, changeLimit) => {
  let changes = {
    userTarget: paramsUserID,
    limitSetTo: changeLimit,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $set: { limit: changeLimit } }
  );
  return callback ? { callback, changes } : null;
};
/**
 * @param { string } paramsUserID
 * @param { string } setBan
 * @example setBanned("62812345678", "true")
 * acceptedValue: "false" | "true"
 */
const setBanned = async (paramsUserID, setBan) => {
  let setBanned = {
    userTarget: paramsUserID,
    bannedSetTo: setBan,
  };
  const callback = serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $set: { isBan: setBan } }
  );
  return (await callback) ? { callback, setBanned } : null;
};
/**
 * @param { string } paramsUserID
 * @example
 * OutputExample:
 * const { userNo, userID, userName, age, hobby, limit, isBan, serial, registeredOn, userStore } = Data
 * // get Docs by filtering "paramsUserID"
 * const {
 *    itemData: [{type, value, date}],
 *    usage: [{usage, date}],
 *    (openAi, images, documents):
 *       => [{key, alias, answer, created}]
 * } = userStore
 * // a destructured value from userStore
 */
const getUserData = async (paramsUserID) => {
  const Data = await serveCollection.findOne({ userID: paramsUserID });
  return Data ? Data : null;
};

/**
 * @returns ***A value from Collection as an Array***
 */
const getAllUser = async () => {
  return (await serveCollection.find().toArray()) || null;
};
/**
 * @param { string } paramsUserID
 * @param { string } typeCmd
 * @example typeCmd: "sticker" | "fbdl" |  "igdl" | "other..."
 */
const updateUsage = async (paramsUserID, typeCmd) => {
  const globalUsage = await serveStatistics.insertOne({
    user: paramsUserID,
    usage: typeCmd,
    date: makeDate(),
  });
  const userUsage = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $push: { "userStore.usage": { usage: typeCmd, date: makeDate() } } }
  );
  return { globalUsage, userUsage } || null;
};
/**
 * @param { string } paramsUserID
 * @param { string } valueItem
 * @example
 * OutputExample:
 *
 */
const userItemSetter = async (paramsUserID, valueItem) => {
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    {
      $push: {
        "userStore.itemData": {
          type: cryptoRandomString(5).toUpperCase(),
          value: valueItem,
          date: makeDate(),
        },
      },
    },
    { upsert: true }
  );
  return callback ? callback : null;
};
const globalItemSetter = async (valueData) => {
  const { globalType, globalValue, item } = valueData;
  const data = {
    id: cryptoRandomString(4).toUpperCase(),
    type: globalType,
    value: globalValue,
    item: parseInt(item),
    date: makeDate(),
  };
  const callback = await serveItem.insertOne(data);
  return callback ? { callback, data } : null;
};
const setGlobalItemSetter = async (objToChange) => {
  const { targetID, valueType, valueData } = objToChange;
  const callback = await serveItem.findOneAndUpdate(
    { id: targetID },
    { $set: { type: valueType, value: valueData } }
  );
  return callback;
};
const getGlobalItem = async () => {
  return await serveItem.find().toArray();
};
/**
 * @param { string } paramsUserID
 * @param { object } formDocs
 * @example const { nameDocs, documents } = formDocs;
 * // nameDocs as name of documents
 * // documents as the documents input type string
 */
const insertDocuments = async (paramsUserID, formDocs) => {
  let { nameDocs, documents } = formDocs;
  let formDocument = {
    key: keyMaker,
    cmd: "getdocs" + " " + keyMaker,
    alias: nameDocs.trim(),
    docs: documents.trim(),
    created: makeDate(),
  };
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $push: { "userStore.documents": formDocument } },
    { upsert: true }
  );
  return callback ? { callback, formDocument } : null;
};
/**
 * @param { string } paramsUserID
 * @param { object } formImg
 * @example const { nameImg, imgUrl } = formImg
 * // nameImg as name of images
 * // imgUrl as the url input type string
 */
const insertImages = async (paramsUserID, formImg) => {
  let { nameImg, imgUrl } = formImg;
  let formImages = {
    key: keyMaker,
    cmd: "getimages" + " " + keyMaker,
    alias: nameImg.trim(),
    imageUrl: imgUrl,
    created: makeDate(),
  };
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $push: { "userStore.images": formImages } },
    { upsert: true }
  );
  return callback ? { callback, formImages } : null;
};
/**
 * @param { string } paramsUserID
 * @param { object } queryObj
 * @example const { userPrompt, answerPrompt } = queryObj
 * // or
 * makeOpenAiHistory(userID, { userPrompt: string, answerPrompt: string })
 * // userPrompt as Question
 * // answerPrompt as Result
 */
const makeOpenAiHistory = async (paramsUserID, queryObj) => {
  const { userPrompt, answerPrompt } = queryObj;
  let formQuery = {
    key: keyMaker,
    cmd: "gethistory" + " " + keyMaker,
    alias: userPrompt.trim(),
    answer: answerPrompt.trim(),
    created: makeDate(),
  };
  const callback = await serveCollection.findOneAndUpdate(
    { userID: paramsUserID },
    { $push: { "userStore.openAi": formQuery } },
    { upsert: true }
  );
  return callback ? { callback, formQuery } : null;
};

const Atlas = {
  makeNewUser,
  changeLimit,
  changeAvatar,
  setBanned,
  getUserData,
  getAllUser,
  updateUsage,
  insertDocuments,
  insertImages,
  makeOpenAiHistory,
  getPrevUserLength,
  userItemSetter,
  globalItemSetter,
  setGlobalItemSetter,
  getGlobalItem,
};

module.exports = { Atlas };
