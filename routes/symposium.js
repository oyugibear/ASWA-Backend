const express = require('express');
const SympController = require("../controllers/symp/index.js")

const router = express.Router()

router.post('/symp/add', SympController.createSymposium) 
router.get('/symps', SympController.getSymposiums) 
router.get('/symp/:id', SympController.getOneSymposium)
router.put('/symp/review/:id', SympController.reviewOneSymposium)
router.get('/sympdownload', SympController.downloadData);

module.exports = router;