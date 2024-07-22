import cron from "node-cron";
import scrapingGames from "../scraper/scrapingGames";

export const scraperGameList = cron.schedule(
  "* * 0 * * 0",
  async () => {
    try {
      await scrapingGames();
    } catch (error) {
      console.log(`Error: ${error}`.red.bgBlack);
    }
  },
  { timezone: "America/Recife" }
);
