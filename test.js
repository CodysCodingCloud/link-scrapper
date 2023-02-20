import { puppeteerScrapper, linkScrapperHTTPS } from "./index.js";

const testLink = "https://iapps.courts.state.ny.us/webcivil/ecourtsMain";

const scrappedLinksPuppeteer = await puppeteerScrapper(testLink);
console.log("Links scrapped with Puppeteer");
console.log(scrappedLinksPuppeteer);
// scrappedLinksPuppeteer.save();

const scrappedLinksRequest = await linkScrapperHTTPS(testLink);
console.log("Links scrapped using a HTTP or HTTPS request");
console.log(scrappedLinksRequest);
