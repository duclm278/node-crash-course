// Wrap Up
// 1. New trash icon
// 2. Redirect to 404 page for blog details of non-existing id instead of hanging

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const BlogRoutes = require("./routes/blogRoutes");

// Create Express app
const app = express();

// Connect to MongoDB & Listen for requests
const dbURI =
  "mongodb+srv://ninja:ninja@nodetuts.ycf9lbb.mongodb.net/tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) // Listen for requests only after connecting to DB
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware & Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Parse urlencoded data to req.body object
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/blogs", BlogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
