// Express Apps
const express = require("express");

// Create Express app
const app = express();

// Listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  // 1. Same as vanilla node
  // req.write("hello, world")
  // req.end()

  // 2. Automatically set Content-Length header and status code
  // res.send("<h1>Home</h1>");

  // 3. Send HTML file
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("<h1>About</h1>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// 4. Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 5. 404's (Middleware): Fire every time request is made if code reaches this point
app.use((req, res) => {
  // `res.status(404)` returns a response object
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// 6. Cannot not be reached due to 404 middleware
app.get("/test", (req, res) => {
  res.send("hello, test");
});
