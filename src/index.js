"use strict";

const dedent = require("dedent");
const _ = require("lodash");
const moment = require("moment");

const Transantiago = require("./api/Transantiago");
const GoogleMaps = require("./api/GoogleMaps");
const BIP = require("./api/BIP");
const createBot = require("./bot");
const createSessionManager = require("./manager");
const configuration = require("./configuration");
const createLogger = require("./logger");
const info = require("../package.json");

const config = configuration();

const logger = createLogger(config);
const manager = createSessionManager(config);
const transantiago = new Transantiago();
const googleMaps = new GoogleMaps(config.get("GOOGLE:MAPS:KEY"));
const bip = new BIP();

// eslint-disable-next-line no-unused-vars
const bot = createBot({
  manager,
  config,
  transantiago,
  googleMaps,
  bip,
  logger,
  info,
});

// eslint-disable-next-line no-console
console.log(dedent`
  Bot Started with:
  - NODE_ENV: ${config.get("NODE_ENV")}
  - URL: ${config.get("URL")}
  - PORT: ${config.get("PORT")}
  - TOKEN: ${_.fill([...config.get("TELEGRAM:TOKEN")], "*", 0, -5).join("")}
  - SESSION: ${config.get("SESSION")}
  - STARTED: ${moment().format()}
`);
