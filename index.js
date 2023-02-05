require("module-alias/register");
require("@libs/constants/prototype");
require("@database/index");

const { setting } = require("./config/global.config");

const logger = require("@libs/utils/logger");
const chalk = require("chalk");
const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en", "id"],
  defaultLocale: "id",
  autoReload: true,
  directory: path.join(__dirname, "config", "locales"),
  objectNotation: true,
});

console.log(chalk.bold(`${setting.botName} Starting...`));
console.log(
  chalk.whiteBright("╭─── [ ") + chalk.yellow("LOG") + chalk.whiteBright(" ]")
);
const { connect } = require("./libs/connect.lib");

process.on("uncaughtException", (err) => {
  logger.error(err.message);
});

connect();
