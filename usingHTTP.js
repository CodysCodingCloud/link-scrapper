import http from "http";
import https from "https";
import fs from "fs";

const urlObject = new URL(
	"https://iapps.courts.state.ny.us/webcivil/ecourtsMain"
);
const options = {
	headers: { "User-Agent": "Custom User Agent String" },
};
const protol = urlObject.protocol === "http" ? http : https;
const req = protol.request(urlObject, options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);
	let data = "";
	res.on("data", (chunk) => {
		data += chunk;
	});
	res.on("end", () => {
		// obtail all anchor tags
		const linkTagRegex = /<a.+>/gi;
		let linkList = data.match(linkTagRegex);
		// obtain href contents and convert to a useable link
		linkList = linkList.map((e) => {
			// remove quitation marks
			let splitLink = e.split(/['"]/);
			for (let i = 0; i < splitLink.length; i++) {
				// find section href that starts the link
				if (/href=/i.test(splitLink[i])) {
					let resultLink = splitLink[i + 1];
					// check type of href and use appropriate conversion
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

		// fs.writeFile(`${options.host}.html`, data, (err) => {
		// 	if (err) throw err;
		// 	console.log("File saved!");
		// });
		return linkList;
	});
});
req.on("error", (error) => {
	console.error(error);
});

req.end();
