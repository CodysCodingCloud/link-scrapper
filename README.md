# Link Scrapper

Included in this nodejs module is, a web scraper that can scrape a website's links and return them in an Array. There are two options on how this module would scrape the links. One option uses the Puppeteer package to scrape the links. The other option uses a http/https request to scrape the website, and regex to parse the respone to obtain the links.

## Usage

### Puppeteer version

The puppeteer version requires more overrhead because it uses a headless browser to complete its work. If you are using this on WSL, chromium needs to be installed for it to work propery. please refer to .

To scrape links using puppeteer:
`import { puppeteerScrapper } from "link-scrapper"`
`const results = puppeteerScrapper(myUrl)`

To save the results you can run:
`results.save()`
The content will be saved to `scrappedContent/${url.host}.js`

### Request version

Nothing needs to be installed using the request version. I decided to make this version of the link scrapping program because I wanted a better understanding of HTTP/S requests.

To scrape links using puppeteer;
`import { linkScrapperHTTPS } from "link-scrapper"`
`const results = linkScrapperHTTPS(myUrl)`
The function will return an array with the scrapped links.

### Limitations of Request

The request version of the link scrapping tool is limited in that it only scrapes the links from the initial response from the url used. This means that if the initial response is encrypted, or has links that are only populated in subsequent requests and javascript, it will fail to obtain all of the links. Puppeteer however can get around this because it uses chromium as a headless browser to make its requests and parse the responses received from the initial url.

TLDR: use the puppeteer version for websites with dynamic content, and use the request version for static websites.

### Testing

included in this package is a testing file that would log log the results of both versions of the link scrapping program. You can edit the test link and try them out to see the different results that can be obtained.
You can run the file using:
`npm run test`
