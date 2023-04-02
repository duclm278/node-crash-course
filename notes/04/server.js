// Requests & Responses
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // 1. Request object
  // console.log(req);
  console.log(req.url, req.method);

  // 2. Response object
  // res.setHeader("Content-Type", "text/plain");
  // res.write("hello, ninjas");
  // res.end();

  // 2.1. Tags like <html>, <head>, <body> are added automatically by browser.
  // res.setHeader("Content-Type", "text/html");
  // res.write("<h1>hello, ninjas</h1>");
  // res.write("<p>hello again, ninjas</p>");
  // res.end();

  // 2.2. Replace default <head> tag added by browser
  // res.setHeader("Content-Type", "text/html");
  // res.write("<head><link rel='stylesheet' href='#'></head>");
  // res.write("<h1>hello, ninjas</h1>");
  // res.write("<p>hello again, ninjas</p>");
  // res.end();

  // 3. Return HTML pages
  // res.setHeader("Content-Type", "text/html");
  // fs.readFile("./views/index.html", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   } else {
  //     // `res.write()` can be used multiple times to write multiple chunks of data.
  //     // res.write(data);
  //     // res.end();
  //     // Optional `chunk` and `encoding` arguments allow one final additional
  //     // chunk of data to be written immediately before closing stream.
  //     res.end(data);
  //   }
  // });

  // 4. Basic routing
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      return;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.end(data);
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
