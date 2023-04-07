// Get, Post & Delete Requests

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Create Express app
const app = express();

// Connect to MongoDB & Listen for requests
const dbURI =
  "mongodb+srv://ninja:ninja@nodetuts.ycf9lbb.mongodb.net/tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => console.log("Connected to DB"))
  .then((result) => app.listen(3000)) // Listen for requests only after connecting to DB
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware & Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // 1.1. Parse urlencoded data to req.body object
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // Descending: -1
    .then((result) => {
      // Pass data to view
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 1. POST requests
app.post("/blogs", (req, res) => {
  // 1.1. Return `undefined` if urlencoded() is not used
  // console.log(req.body);

  // 1.2. Create new blog
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

// NB! Place blogs/create GET route ABOVE /blogs/:id GET route in code.
// Otherwise Express will fire /blogs/:id handler for requests to /blogs/create.
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New blog" });
});

// 2.1 Route parameters
// app.get("/blogs/:name", (req, res) => {
//   const name = req.params.name;
//   console.log(name);
// }

// 2.2. Route parameters
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// NB! Place blogs/create GET route ABOVE /blogs/:id GET route in code.
// Otherwise Express will fire /blogs/:id handler for requests to /blogs/create.
// app.get("/blogs/create", (req, res) => {
//   res.render("create", { title: "New blog" });
// });

// 3. DELETE requests
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  // FE uses fetch() to send DELETE request so BE needs to send JSON response
  // back to redirect to /blogs. Cannot use res.redirect() here. FE will handle
  // redirect.
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
