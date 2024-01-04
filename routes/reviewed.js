const express = require('express');
const ReviewedController = require("../controllers/reviewed/index.js")

const router = express.Router()


router.post('/review/add', ReviewedController.createReview) 


module.exports = router;