// 2. Make code cleaner and neater by moving handlers from routes to controllers
// 3. Move index.ejs, create.ejs and details.ejs from views folder to views/blogs folder

const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blog_index);
router.post("/", blogController.blog_create_post);
router.get("/create", blogController.blog_create_get);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

module.exports = router;
