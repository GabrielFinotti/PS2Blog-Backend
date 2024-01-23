import cron from "node-cron";
import { main } from "./scraper";

console.log("Ativado");
const scrapingCron = cron.schedule("0 0 * * 0", () => {
  main();
});

export default scrapingCron;
