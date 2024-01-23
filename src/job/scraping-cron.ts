import cron from "node-cron";
import { main } from "./scraper";

cron.schedule("0 0 * * 0", () => {
  main();
});
