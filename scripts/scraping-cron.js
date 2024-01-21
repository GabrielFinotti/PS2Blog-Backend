const cron = require("node-cron");
const scraper = require("../scraper/gameList/scraper");

cron.schedule("0 0 * * 0", () => scraper());
