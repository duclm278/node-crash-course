// Middleware
// Code which runs (on the server) between getting a request and sending a response

// Middleware Examples
// - Logger middleware to log details of every request
// - Authentication check middleware for protected routes
// - Middleware to parse JSON data from requests
// - Return 404 pages

const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

// 1. This middleware will run for every request as it is at top and not
// specific to any route. However, browser will hang as express doesn't know how
// to move on to next middleware.
// app.use((req, res) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
// });

// 2. Use next() to move on to next middleware
// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

// 3. Static Files
app.use(express.static("public"));

// 4. 3rd-party Middleware
app.use(morgan("dev"));

// This middleware sends response to browser by render(), making code below it
// unreachable if route is matched.
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat Bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New blog" });
});

// This middleware sends response to browser by render(), making code below it
// unreachable.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
