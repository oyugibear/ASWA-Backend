const express = require('express');
const AuthController = require("../controllers/auth/index.js")

const router = express.Router()


router.post('/auth/register', AuthController.signup)
router.post('/auth/login', AuthController.login)


module.exports = router;