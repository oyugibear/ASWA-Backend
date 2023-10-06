const AbstractService = require("../AbstractService.js")
const researchModel = require("../../models/researchmodel.js")
const AppError = require("../../errors/app-error.js")

class ResearchService extends AbstractService {
  constructor() {
    super()
  }

  static async createResearch(data) {
    const research = await AbstractService.createDocument(researchModel, data)
    // console.log(research)
    if(!research) throw new AppError("could not create the research data", 400)

    return research
  }
  
  static async getResearchs() {
    const research = await AbstractService.getDocuments(researchModel)
    // console.log(research)
    // if(!research) throw new AppError("could not get all the research data", 400)

    return research
  }

}

module.exports = ResearchService