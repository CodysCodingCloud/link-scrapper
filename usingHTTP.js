import http from "http";
import https from "https";
import fs from "fs";

const options = new URL(
	"https://iapps.courts.state.ny.us/webcivil/ecourtsMain"
);
options.headers = {
	"User-Agent": "Custom User Agent String",
};

console.log(options);

const req = https.request(options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);
	// console.log(res);
	let data = "";
	res.on("data", (chunk) => {
		data += chunk;
	});
	res.on("end", () => {
		console.log(typeof data);
		console.log(data.length);
		const linkRagRegex = /<a.+>/gi;
		console.log("regex", linkRagRegex);
		let linkList = data.match(linkRagRegex);
		console.log("control");
		linkList = linkList.map((e) => {
			let splitLink = e.split(/['"]/);
			// console.log(splitLink);
			for (let i = 0; i < splitLink.length; i++) {
				if (/href=/i.test(splitLink[i])) {
					let resultLink = splitLink[i + 1];
					// console.log(resultLink);
					if (/^\w+[:]/i.test(resultLink)) return resultLink;
					if (resultLink[0] === "/") {
						resultLink = options.protocol + "//" + options.host + resultLink;
					} else if (resultLink[0] === "#") {
						resultLink = options.href + resultLink;
					} else {
						let removeSlug = options.href.match(/.+[/]/);
						resultLink = removeSlug + "/" + resultLink;
					}
					return resultLink;
				}
			}
		});
		console.log("linkList", linkList);
		// fs.writeFile(`${options.host}.html`, data, (err) => {
		// 	if (err) throw err;
		// 	console.log("File saved!");
		// });
	});
});
req.on("error", (error) => {
	console.error(error);
});

req.end();
