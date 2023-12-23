const express = require('express');
const UserController = require("../controllers/user/index.js")

const router = express.Router()

router.get('/users', UserController.getUsers)
router.get('/userdownload', UserController.downloadData);
router.get('/reviewerdownload', UserController.downloadReviewerData);

module.exports = router;