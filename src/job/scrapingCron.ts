import cron from "node-cron";
import { main } from "./scraperGameList";

export const scrapingCron = cron.schedule("0 0 * * 0", () => {
  main();
});
