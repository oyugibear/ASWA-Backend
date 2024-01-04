const AbstractController = require("../AbstractController.js")
const Reviewed = require("../../models/reviewedModel.js")
const ReviewedService = require("../../services/Reviewed/index.js")
const AppError = require("../../errors/app-error.js");
const { sendSubmissionRecievedEmail } = require("../../utils/sendMail.js");
const { sendReviewRecievedEmail } = require("../../utils/sendMail.js");
const usermodel = require("../../models/usermodel.js");

class ReviewedController extends AbstractController {
    constructor() {
      super()
    }

    static async createReview(req, res) {
      try {
        let reviewData = req.body;
        let user = req.body.postedBy;
    
        const review = await ReviewedService.createReviewed(reviewData);
        console.log(review);
    
        // Assuming you're using Mongoose, adjust this query based on your database model
        const existingUser = await usermodel.findOne({ _id: user });
        console.log("Email: ", existingUser?.email);
    
        if (review) {
          sendReviewRecievedEmail(existingUser?.email);
          AbstractController.successReponse(res, review, 200, "review added");
        }
        return review;
      } catch (error) {
        console.log(error);
      }
    }
}

module.exports = ReviewedController;
    