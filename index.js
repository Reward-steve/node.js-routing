const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const button = fs.readFileSync(`${__dirname}/client/button.html`, "utf-8");
const categoryPage = fs.readFileSync(`${__dirname}/client/index.html`, "utf-8");
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/Server/data/data.json`, "utf-8")
);

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/")) {
    const category = req.url.split("/").pop();
    const result = data[category];
    if (result) {
      res.writeHead(200, {
        "content-type": "text/html",
      });

      const cardHtml = result
        .map((el) => {
          return replaceTemplate(categoryPage, el);
        })
        .join("");

      res.end(`<a
        href="/"
        style="
        color: white;
        text-decoration: none;
        position: absolute;
        z-index: 10;
        padding: 10px 20px;
        backdrop-filter: brightness(0.5);
      "
      >Back</a>
      ${cardHtml}`);
    } else {
      res.writeHead(404, {
        "content-type": "text/html",
      });
      res.end(button);
    }
  } else {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end("Page not found");
  }
});

const port = 3000;
server.listen(port, "127.0.0.1", () => {
  console.log(`Listening to request on ${port}`);
});
