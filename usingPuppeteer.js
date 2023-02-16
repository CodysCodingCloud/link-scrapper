import puppeteer from "puppeteer";
import fs from "fs";

// const link = new URL("https://iapps.courts.state.ny.us/webcivil/ecourtsMain");
// console.log(link);

const save = function () {
	console.log("hi");
	const links = this.links;
	const url = this.url;
	if (!fs.existsSync("scrappedContent")) {
		fs.mkdirSync("scrappedContent");
	}
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

const mylink = "https://iapps.courts.state.ny.us/webcivil/ecourtsMain";
async function scrapper(url) {
	url = new URL(url);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	// Grabs HTML content
	const links = await page.evaluate(() =>
		Array.from(document.querySelectorAll("a")).map((e) => e.href)
	);
	// saves to file
	await browser.close();
	console.log("closed");

	return {
		links,
		save,
		url,
	};
}
const chip = await scrapper(mylink);
chip.save();
console.log(chip);

// class myClass {
// 	async p1(arg) {
// 		// Do some asynchronous work here
// 		this.result1 = arg;
// 		return this;
// 	}
// 	async p2() {
// 		// Do some additional asynchronous work here, using result1 if needed
// 		console.log("hi");
// 		return this;
// 	}
// }
// let cop = new myClass();
// let po = await cop.p1("app");

// console.log(await po.p2());
