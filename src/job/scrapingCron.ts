import cron from "node-cron";
import { main } from "./scraper";

const scrapingCron = cron.schedule("0 0 * * 0", () => {
  main();
});

export default scrapingCron;
