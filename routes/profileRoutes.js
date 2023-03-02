const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");

const checkAuth = require("../helpers/auth").checkAuth

router.get('/profile', checkAuth, ProfileController.showProfile)
router.post('/profile', checkAuth, ProfileController.updateProfile)

module.exports = router;
