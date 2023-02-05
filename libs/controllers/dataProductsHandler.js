const { atlasConnect } = require("./atlasConnect");
const { ATLAS } = require("../../config/global.config");
const { makeDate, teleGraPhUploader } = require("../functions/myFunc");

const cryptoRandomString = require("crypto-random-string");

const serveDatabase = atlasConnect.db(ATLAS.DATABASE);
const serveCollection = serveDatabase.collection(ATLAS.COLLECTION.PRODUCTS);
const serveUser = serveDatabase.collection(ATLAS.COLLECTION.USERSHOP);

/**
 * @param { string } id
 * @param { string } alias
 */
const makeUser = async (userNumber, alias) => {
  const data = {
    id: cryptoRandomString(5).toUpperCase(),
    numberPhone: userNumber,
    userName: alias,
    statusRole: "buyer",
    registered: makeDate(),
    dataTrial: {
      product: [
        {
          idProduct: cryptoRandomString(6).toUpperCase(),
          data: {
            name: "Produk Pertama",
            price: "99K",
            image: "",
            desc: "Ini deskripsi dari produk pertama.",
            timeStamp: makeDate(),
          },
        },
      ],
    },
  };
  const callback = await serveUser.insertOne(data);
  return callback ? { callback, data } : null;
};
/**
 * @param { string } serialID
 * @param { string } setRole
 * @example Role: "buyer" | "admin" | "owner"
 * // by default it set to: "buyer"
 */
const changeRole = async (serialID, setRole) => {
  const data = {
    id: serialID,
    statusRole: setRole,
  };
  const callback = await serveUser.findOneAndUpdate(
    { id: serialID },
    { $set: { statusRole: setRole } }
  );
  return callback ? { callback, data } : null;
};
/**
 * @param { string } id
 */
const getDataUser = async (userNumber) => {
  const callback = await serveUser.findOne({ numberPhone: userNumber });
  return callback ? callback : null;
};

const insertTrialProduct = async (idUser, objectProduct) => {
  const { names, prices, images, description } = objectProduct;
  const data = {
    idProduct: cryptoRandomString(6).toUpperCase(),
    data: {
      name: names,
      price: prices,
      image: images,
      desc: description,
      timeStamp: makeDate(),
    },
  };
  const callback = await serveUser.findOneAndUpdate(
    { numberPhone: idUser },
    { $push: { "dataTrial.product": data } }
  );
  return callback ? { callback, data } : null;
};

const getAllUserTrialProduct = async (idUser) => {
  return await serveUser.findOne({ numberPhone: idUser });
};
const getUserTrialProductByID = (inputQuery) => {
  const { dataProduct, inputID } = inputQuery;
  let targetID = inputID.trim();
  const item = dataProduct.find(
    (selectItem) => selectItem.idProduct === targetID
  );
  return item ? item : null;
};

const makeKeys = async (typeKey = "") => {
  let getTypeKey = typeKey || "produk no";
  let getLengthDataProducts = (await getAllProduct()).length || 0;
  let sumProduct = getLengthDataProducts + 1;
  return getTypeKey + " " + "00" + sumProduct;
};

/**
 * @param { TypeKey<string> } typeKey extends of Numbering Products
 * @param { object } queryInsert
 */
const appendProduct = async (typeKey, queryInsert) => {
  const { nameProducts, prices, categorys, imagePath, description } =
    queryInsert;
  let productForm = {
    id: cryptoRandomString(5).toUpperCase(),
    key: await makeKeys(typeKey),
    data: {
      name: nameProducts,
      price: prices,
      category: categorys,
      image: imagePath,
      desc: description,
      timeStamp: makeDate(),
    },
  };
  const insertCallback = await serveCollection.insertOne(productForm);
  return insertCallback ? { insertCallback, productForm } : null;
};

/**
 * @param { Product<ID> } idProduct
 * @param { objectQuery } queryChanges
 */
const editProduct = async (idProduct, queryChanges) => {
  const { nameProducs, prices, categorys, imagePath, description } =
    queryChanges;
  let productFormChanged = {
    data: {
      name: nameProducs,
      price: prices,
      category: categorys,
      image: await teleGraPhUploader(imagePath),
      desc: description,
      timeStamp: makeDate(),
    },
  }; //
  const changesCallback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: productFormChanged }
  );
  return changesCallback ? { changesCallback, productFormChanged } : null;
};

/**
 * @param { string } idProduct
 * @param { string } setName
 * @returns ```ts
 * new Promise = {
 * callback: ModifyResult<Document>
 * value: modifierSetter
 * }
 * ```
 */
const _name = async (idProduct, setName) => {
  const value = {
    id: idProduct,
    value: setName,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: { "data.name": setName } }
  );
  return callback ? { callback, value } : null;
};
/**
 * @param { Product<ID> } idProduct
 * @param { number } setPrice
 */
const _price = async (idProduct, setPrice) => {
  const value = {
    id: idProduct,
    value: setPrice,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: { "data.price": setPrice } }
  );
  return callback ? { callback, value } : null;
};
/**
 * @param { Product<ID> } idProduct
 * @param { string } setCategory
 */
const _category = async (idProduct, setCategory) => {
  const value = {
    id: idProduct,
    value: setCategory,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: { "data.category": setCategory } }
  );
  return callback ? { callback, value } : null;
};
/**
 * @param { Product<ID> } idProduct
 * @param { urls } setImage
 */
const _image = async (idProduct, setImage) => {
  const value = {
    id: idProduct,
    value: setImage,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: { "data.image": setImage } }
  );
  return callback ? { callback, value } : null;
};
/**
 * @param { Product<ID> } idProduct
 * @param { string } setDescription
 */
const _description = async (idProduct, setDescription) => {
  const value = {
    id: idProduct,
    value: setDescription,
  };
  const callback = await serveCollection.findOneAndUpdate(
    { id: idProduct },
    { $set: { "data.name": setDescription } }
  );
  return callback ? { callback, value } : null;
};

const getAllProduct = async () => {
  return (await serveCollection.find().toArray()) || null;
};
/**
 * @param { Product<ID> } queryID
 * @returns
 */
const getProductByID = async (queryID) => {
  const Res = await serveCollection.findOne({ id: queryID });
  const Result = {
    id: Res.id,
    name: Res.data.name,
    price: Res.data.price,
    category: Res.data.category,
    image: Res.data.image,
    desc: Res.data.desc,
    timeStamp: Res.data.timeStamp,
  };
  return Result || null;
};
const getProductByKey = async (queryKey = "") => {
  let dataProduct = await getAllProduct();
  let filteredProduct = dataProduct.find(
    (selectedProduct) => selectedProduct.id === queryKey
  );
  return filteredProduct || null;
};

const Shop = {
  makeUser,
  changeRole,
  getDataUser,
  appendProduct,
  editProduct,
  getAllProduct,
  getProductByID,
  getProductByKey,
  edit: {
    _name,
    _price,
    _category,
    _image,
    _description,
  },
};

const ShopTrial = {
  getAllUserTrialProduct,
  getUserTrialProductByID,
  insertTrialProduct,
};

module.exports = { Shop, ShopTrial };
