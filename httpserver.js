const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("request has been made to client from server");

  res.setHeader("Content-Type", "text/html");
  //   res.write("Hello from BlogIyt");
  //   res.end();

  // routing for different routes

  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      res.end(fileData);
    }
  });
});

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
