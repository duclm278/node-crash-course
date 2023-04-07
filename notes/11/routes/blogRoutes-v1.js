// 3. Move index.ejs, create.ejs and details.ejs from views folder to views/blogs folder

const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

// Blog routes
// Update handler from /blogs to / as prefix is used in app.js
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// NB! Place blogs/create GET route ABOVE /:id GET route in code.
// Otherwise Express will fire /:id handler for requests to /create.
router.get("/create", (req, res) => {
  res.render("blogs/create", { title: "New blog" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
