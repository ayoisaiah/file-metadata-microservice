const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    fs.readFile("views/index.html", "utf8", (err, html) => {
      if (err) throw err;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  } else if (req.url === "/fileupload") {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.end("There was an error uploading your file. Please try again");
      }

      const metadata = {
        name: files.upfile.name,
        type: files.upfile.type,
        size: files.upfile.size
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(metadata));
    });
  } else {
    fs.readFile("views/404.html", "utf8", (err, html) => {
      if (err) throw error;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  }
};

const server = http.createServer(requestHandler);

server.listen(process.env.PORT || 4100, err => {
  if (err) throw err;

  console.log(`Server is running on PORT ${server.address().port}`);
});
