const AbstractController = require("../AbstractController.js")
const Research = require("../../models/researchmodel.js")
const ResearchService = require("../../services/Research/index.js")
const researchmodel = require("../../models/researchmodel.js")

class ResearchController extends AbstractController {
    constructor() {
      super()
    }

    static async createResearch(req, res) {
      let researchData = req.body
      const research = await ResearchService.createResearch(researchData)

      console.log(research)
      if (research) {
        AbstractController.successReponse(res, research, 200, "research added")
      }
      return research
    }

    static async getAllResearch(req, res) {
      const researchs = await ResearchService.getResearchs();
  
      if (researchs) {
        AbstractController.successReponse(res, researchs, 200, "all research found")
      }
      
    }

    static async getOneResearch(req, res) {
        const id = req.params.id
        try {
          const research = await researchmodel.findById(id)
          if (research) {
            res.status(200).send(research)
          }
        } catch (error) {
          res.status(500).send(error)
        }
      
    }

    static async reviewOneResearch(req, res) {
      const id = req.params.id
      const data = req.body
  
      // console.log(data)
      const research = await researchmodel.findByIdAndUpdate(id, data, { new: true })
  
      console.log("",research)
      if (!research) throw new AppError("could not approve the research", 400)
      res.status(200).send(research)
    }
    
}

module.exports = ResearchController