import puppeteer from "puppeteer";
import save from "./saveToFile.js";
const mylink = "https://iapps.courts.state.ny.us/webcivil/ecourtsMain";

export default async function puppeteerScrapper(url) {
	// converts url into a useable format for the save function later
	if (typeof url === "string") {
		url = new URL(url);
	}

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	// Grabs HTML content
	const links = await page.evaluate(() =>
		Array.from(document.querySelectorAll("a")).map((e) => e.href)
	);
	// closes browser
	await browser.close();

	links.__proto__.save = save;
	links.__proto__.url = url;
	return links;
}
