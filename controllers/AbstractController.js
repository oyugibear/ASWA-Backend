const CustomError = require("../errors/custom-error")
class AbstractController {
  /**
   * Function for sending a success response
   * @param {{}} res Response object
   * @param {{}} data Response data
   * @param {number} code Success code
   * @param {string} error Success Message
   */
  static successReponse(res, data, code = 200, message = "Success") {
    res.status(code).send({
      data,
      message,
      status: "ok",
    })
  }

  /**
   * Function for sending a failure response
   * @param {{}} res Response object
   * @param {number} code Error code
   * @param {{}} error Error object
   */
  static errorReponse(res, code = 500, error) {
    console.log("***ERROR***", error.message, JSON.stringify(error))
    
    res.status(code).json({
      status: "failed",
      errors: [{message: error.message}]
    })
  }
}

module.exports = AbstractController
