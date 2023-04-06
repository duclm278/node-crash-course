// MongoDB

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
app.use(morgan("dev"));

// Mongoose & Mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New blog",
    snippet: "About my new blog",
    body: "More about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("642e470002f0efe359315da4")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

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

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
