const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const urls = [
  "https://archive.org/download/PS2CollectionPart1ByGhostware/",
  "https://archive.org/download/PS2CollectionPart2ByGhostware/",
  "https://archive.org/download/TextsPS2CollectionPart3ByGhostware/",
  "https://archive.org/download/rr-sony-playstation-2-u1/usa/iso/",
  "https://archive.org/download/rr-sony-playstation-2-u2/usa/iso/",
  "https://archive.org/download/rr-sony-playstation-2-u3/usa/iso/",
];

async function main() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    let allData = [];

    for (let url of urls) {
      try {
        await page.goto(url);
        await page.waitForSelector(".directory-listing-table");

        const tableData = await page.$$eval(
          ".directory-listing-table tbody tr",
          (rows) =>
            rows
              .map((row) => {
                const cell = Array.from(row.cells);
                const linkElement = cell[0].querySelector("a");
                return {
                  name: linkElement.innerText,
                  href: linkElement.getAttribute("href")
                    ? linkElement.getAttribute("href")
                    : null,
                  lastModified: cell[1].innerText,
                  size: cell[2].innerText,
                };
              })
              .slice(1)
        );
        const updateTableData = tableData.map((gamesList) => {
          if (gamesList.href !== null) gamesList.href = url + gamesList.href;
          return gamesList;
        });
        allData = [...allData, ...updateTableData];
      } catch (error) {
        console.error(`Erro ao processar URL ${url}:`, error);
        continue;
      }
    }

    const cacheFolder = path.resolve(__dirname, "../cache");
    if (!fs.existsSync(cacheFolder)) fs.mkdir(cacheFolder);
    const outputFilePath = path.join(cacheFolder, "game-list.json");

    let existingData = [];
    if (fs.existsSync(outputFilePath)) {
      existingData = await fs.readJson(outputFilePath);
    }
    existingData = [...existingData, ...allData];

    await fs.writeJson(outputFilePath, existingData, { spaces: 2 });
  } catch (error) {
    console.error("Erro geral:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = main;
