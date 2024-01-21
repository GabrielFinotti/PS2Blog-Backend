import * as cron from "node-cron";
import { main } from "../scraper/scraper";

cron.schedule('0 0 * * 0', () => {
    main()
})
