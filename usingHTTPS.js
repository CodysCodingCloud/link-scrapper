import http from "http";
import https from "https";
// import fs from "fs";
export default function linkScrapperHTTPS(urlString) {
	return new Promise((resolve, reject) => {
		const urlObject = new URL(urlString);
		const options = {
			headers: {
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,ja;q=0.6",
				Referer: urlString,
			},
		};
		// select correct protocol
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
				console.log(data);
				// // obtain href contents and convert to a useable link
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
								resultLink =
									urlObject.protocol + "//" + urlObject.host + resultLink;
							} else if (resultLink[0] === "#") {
								resultLink = urlObject.href + resultLink;
							} else {
								let removeSlug = urlObject.href.match(/.+[/]/);
								resultLink = removeSlug + "/" + resultLink;
							}
							return resultLink;
						}
					}
				});

				// console.log("chippy", linkList);
				resolve(linkList);
			});
		});

		req.on("error", (error) => {
			reject(error);
		});
		req.end();
	});
}
