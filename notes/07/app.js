// View Engines
const express = require("express");

const app = express();

// 1. Register view engine
app.set("view engine", "ejs");

// 2. Set custom folder for views. Default is views.
// app.set("views", "layouts");

app.listen(3000);

app.get("/", (req, res) => {
  // 3. Render view
  // res.render("index");

  // 4. Pass data to view
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
  // res.render("about");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  // res.render("create");
  res.render("create", { title: "New blog" });
});

app.use((req, res) => {
  // res.status(404).render("404");
  res.status(404).render("404", { title: "404" });
});
