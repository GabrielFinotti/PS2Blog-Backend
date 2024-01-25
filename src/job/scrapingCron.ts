import cron from "node-cron";
import { main } from "./scraper";

export const scrapingCron = cron.schedule("0 0 * * 0", () => {
  main();
});
