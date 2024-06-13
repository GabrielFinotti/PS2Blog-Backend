import cron from "node-cron";
import scrapingGames from "../scraper/scrapingGames";

export const scraperGameList = cron.schedule(
  "* * 0 * * 0",
  async () => {
    try {
      console.log(`Scraping started...⚠️`.yellow.bgBlack);

      await scrapingGames();

      console.log(`Game list scraping complete ✅`.green.bgBlack);
    } catch (error) {
      console.log(`Error: ${error}`.red.bgBlack);
    }
  },
  { timezone: "America/Recife" }
);
