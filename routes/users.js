const express = require('express');
const UserController = require("../controllers/user/index.js")

const router = express.Router()

router.get('/users', UserController.getUsers)


module.exports = router;