import puppeteer from "puppeteer";
import fs from "fs";

const mylink = "https://iapps.courts.state.ny.us/webcivil/ecourtsMain";

export default async function scrapper(url) {
	// converts url into a useable format for the save function later
	url = new URL(url);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	// Grabs HTML content
	const links = await page.evaluate(() =>
		Array.from(document.querySelectorAll("a")).map((e) => e.href)
	);
	// closes browser
	await browser.close();

	return {
		links,
		save,
		url,
	};
}

// this function will save contents of the links into `scrappedContent/${url.host}.js`
const save = function () {
	const links = this.links;
	const url = this.url;
	// creates folder if it does not exist
	if (!fs.existsSync("scrappedContent")) {
		fs.mkdirSync("scrappedContent");
	}
	// writes the files
	fs.writeFile(
		`scrappedContent/${url.host}.js`,
		JSON.stringify(links),
		(err) => {
			if (err) throw err;
			console.log(" link File saved!");
		}
	);
	return this.links;
};
