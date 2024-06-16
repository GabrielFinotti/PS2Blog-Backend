import fs from "fs-extra";
import puppeteer from "puppeteer";
import { GameList } from "../../interfaces/gameList";
import { gameListModel } from "../../models/gameListModel";

export default async () => {
  try {
    console.log(`Scraping started...⚠️`.yellow.bgBlack);

    const urlJson: Array<{ url: string }> = JSON.parse(
      await fs.readFile("./src/public/json/urls.json", "utf-8")
    );

    const urls: string[] = [];

    urlJson.forEach((url) => {
      urls.push(url.url);
    });

    let gameList: GameList[] = [];

    const browser = await puppeteer.launch();

    for (const url of urls) {
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector(".directory-listing-table");

      gameList = [
        ...gameList,
        ...(await page.$$eval(".directory-listing-table tbody tr", (rows) =>
          rows
            .map((row) => {
              const columns = [...row.cells];

              const gameData: GameList = {
                name: columns[0].querySelector("a")?.textContent as string,
                href: columns[0].querySelector("a")?.href as string,
                size: columns[2].textContent as string,
              };

              return gameData;
            })
            .slice(1)
        )),
      ];

      await page.close();
    }

    await browser.disconnect();
    await browser.close();

    await gameListModel.deleteMany();
    await gameListModel.create(gameList);

    console.log(`Game list saved in the database 🎮!`.green);
    console.log(`Game list scraping complete ✅`.green.bgBlack);
  } catch (error) {
    console.log(
      `Error when trying to retrieve the game list, error: ${error}❗`.red
        .bgBlack
    );
  }
};
