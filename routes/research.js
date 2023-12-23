const express = require('express');
const ResearchController = require("../controllers/research/index.js")

const router = express.Router()


router.post('/research/add/', ResearchController.createResearch) 
router.get('/researchs', ResearchController.getAllResearch)
router.get('/research/:id', ResearchController.getOneResearch)
router.put('/research/review/:id', ResearchController.reviewOneResearch)
router.get('/download', ResearchController.downloadData);
router.get('/reviewdsubsdownload', ResearchController.downloadreviewedsubsData);


module.exports = router;