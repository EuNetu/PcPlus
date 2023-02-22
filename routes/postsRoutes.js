const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.get("/dashboard", PostController.showDashboard);
router.get("/", PostController.showPosts);

module.exports = router;
