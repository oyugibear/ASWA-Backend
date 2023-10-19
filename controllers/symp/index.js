const AbstractController = require("../AbstractController.js")
const Symp = require("../../models/symposiummodel.js")
const SympService = require("../../services/Symp/index.js")
const syposiummodel = require("../../models/symposiummodel.js")

class SympController extends AbstractController {
    constructor() {
      super()
    }
    static async createSymposium(req, res) {
      try {
        let researchData = req.body
        const research = await SympService.createSymposium(researchData)
        console.log(research)
        if (research) {
          AbstractController.successReponse(res, research, 200, "research added")
        }
        return research
        
      } catch (error) {
        console.log(error)
      }
    }

    static async getSymposiums(req, res) {
      try {
        const symps = await SympService.getSymposiums();
    
        if (symps) {
          AbstractController.successReponse(res, symps, 200, "all symposiums upload found")
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }
    static async getOneSymposium(req, res) {
      const id = req.params.id
      try {
        const symposium = await syposiummodel.findById(id)
        if (symposium) {
          res.status(200).send(symposium)
          console.log("Symposium Retrived ID: ", symposium)
        }
      } catch (error) {
        res.status(500).send(error)
        console.log(error)
      }
      
    }

    static async reviewOneSymposium(req, res) {
      try {
        const id = req.params.id
        const data = req.body
    
        // console.log(data)
        const symposium = await syposiummodel.findByIdAndUpdate(id, data, { new: true })
    
        console.log("",symposium)
        if (!symposium) throw new AppError("could not approve the symposium", 400)
        res.status(200).send(symposium)
        
      } catch (error) {
        console.log(error)
      }
    }

}

module.exports = SympController