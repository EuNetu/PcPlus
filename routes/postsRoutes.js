const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

const checkAuth = require("../helpers/auth").checkAuth

router.get("/add", checkAuth, PostController.createPost);
router.post("/add", checkAuth, PostController.createPostSave);
router.get("/dashboard", checkAuth, PostController.showDashboard);
router.post("/remove", checkAuth, PostController.removePost);
router.get("/", PostController.showPosts);

module.exports = router;
