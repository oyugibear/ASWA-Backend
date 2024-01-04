const AbstractService = require("../AbstractService.js")
const reviewedModel = require("../../models/reviewedModel.js")
const syposiumModel = require("../../models/symposiummodel.js")
const AppError = require("../../errors/app-error.js")
const { uploadAttachment } = require("../../middlewares/upload.js")
// const researchmodel = require("../../models/researchmodel.js")

class ReviewedService extends AbstractService {
  constructor() {
    super()
  }

  static async createReviewed(data) {
    const review = await AbstractService.createDocument(reviewedModel, data)
    if(!review) throw new AppError("could not create the review data", 400)
    return review
  }
}
  
module.exports = ReviewedService;