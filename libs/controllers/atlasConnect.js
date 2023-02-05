const { MongoClient, ServerApiVersion } = require("mongodb");
const { ATLAS } = require("../../config/global.config");

const atlasConnect = new MongoClient(ATLAS.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = { atlasConnect };
