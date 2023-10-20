const AbstractService = require("../AbstractService.js")
const syposiumModel = require("../../models/symposiummodel.js")
const AppError = require("../../errors/app-error.js")

class SympService extends AbstractService {
  constructor() {
    super()
  }

  static async createSymposium(data) {
    const symposium = await AbstractService.createDocument(syposiumModel, data)
    if(!symposium) throw new AppError("could not create the symposium data", 400)

    return symposium
  }

  static async getSymposiums() {
    const symposium = await AbstractService.getDocuments(syposiumModel)
    if(!symposium) throw new AppError("could not get all the symposium data", 400)

    return symposium
  }

  

}

module.exports = SympService