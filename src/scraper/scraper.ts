import { GameList } from "./../interfaces/game-list";
import puppeteer from "puppeteer";
import * as fs from "fs-extra";
import * as path from "path";

const urls: Array<string> = [
  "https://archive.org/download/PS2CollectionPart1ByGhostware/",
  "https://archive.org/download/PS2CollectionPart2ByGhostware/",
  "https://archive.org/download/TextsPS2CollectionPart3ByGhostware/",
  "https://archive.org/download/rr-sony-playstation-2-u1/usa/iso/",
  "https://archive.org/download/rr-sony-playstation-2-u2/usa/iso/",
  "https://archive.org/download/rr-sony-playstation-2-u3/usa/iso/",
];
let allData: GameList[] = [];

export async function main() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let url of urls) {
      try {
        await page.goto(url);
        await page.waitForSelector(".directory-listing-table");

        const tableData: GameList[] = await page.$$eval(
          ".directory-listing-table tbody tr",
          (rows) =>
            rows
              .map((row) => {
                const columns = Array.from(row.cells);
                return {
                  name: columns[0].querySelector("a")?.innerText,
                  href: columns[0].querySelector("a")?.getAttribute("href"),
                  size: columns[2].innerText,
                };
              })
              .slice(1)
        );
        allData = [...allData, ...editLinkData(tableData, url)];
      } catch (err) {
        console.error(`Erro ao processar Url ${url}. Error: ${err}`);
        continue;
      }
    }
    setData(allData);
  } catch (err) {
    console.log(`Erro geral: ${err}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

function editLinkData(value: GameList[], url: string) {
  const data = value.map((gameList) => {
    if (gameList.href !== null || undefined)
      gameList.href = url + gameList.href;
    return gameList;
  });
  return data;
}

function setData(data: GameList[]) {
  const cacheFolder = path.resolve(__dirname, "../../cache");
  if (!fs.existsSync(cacheFolder)) fs.mkdir(cacheFolder);
  const outputFilePath = path.join(cacheFolder, "game-list.json");

  let existingData: GameList[] | any = [];
  if (fs.existsSync(outputFilePath)) existingData = fs.readJson(outputFilePath);
  existingData = [...existingData, ...data];

  fs.writeJson(outputFilePath, existingData, { spaces: 2 });
}

