// Express Router & MVC

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const BlogRoutes = require("./routes/blogRoutes-v2");

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
// app.use(BlogRoutes);

// 1.1. Use BlogRoutes as middleware
app.use("/blogs", BlogRoutes); // 1.2. Add /blogs prefix to all routes in BlogRoutes

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
