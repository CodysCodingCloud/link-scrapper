import http from "http";
import https from "https";
import fs from "fs";

const options = new URL("https://www.asurascans.com");
options.headers = {
	"User-Agent": "Custom User Agent String",
};
console.log(options);

const req = https.request(options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);
	// console.log(res);
	let data = "";
	res.on("data", (chunk) => {
		console.log(">>>>>>>>>>>>>>");
		console.log(chunk);
		data += chunk;
	});
	res.on("end", () => {
		fs.writeFile(`${options.host}.html`, data, (err) => {
			if (err) throw err;
			console.log("File saved!");
		});
	});
});
req.on("error", (error) => {
	console.error(error);
});

req.end();
