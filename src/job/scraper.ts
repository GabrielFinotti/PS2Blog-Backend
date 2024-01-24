import { GameList } from "../interfaces/gameList";
import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";

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
                const columns = [...row.cells];
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
        writeErrorToLog(err);
        continue;
      }
    }

    setData(allData);
    console.log("Scraping efetuado com sucesso!");
  } catch (err) {
    console.log(`Erro geral: ${err}`);
    writeErrorToLog(err);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function editLinkData(value: GameList[], url: string) {
  const data = value.map((gameList) => {
    if (gameList.href !== null && gameList.href !== undefined) {
      gameList.href = url + gameList.href;
    }
    return gameList;
  });

  return data;
}

function writeErrorToLog(error: unknown) {
  const logFolder = path.resolve(__dirname, "./logs");

  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }

  const logFilePath = path.join(logFolder, "error-log.txt");
  const currentDate = new Date().toLocaleString();
  const errorLog = `\n[${currentDate}] - Erro: ${error}\n`;

  fs.appendFileSync(logFilePath, errorLog);
}

function setData(data: GameList[]) {
  const cacheFolder = path.resolve(__dirname, "../../cache");

  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
  }

  const outputFilePath = path.join(cacheFolder, "game-list.json");

  fs.writeJsonSync(outputFilePath, data, { spaces: 2 });
}
