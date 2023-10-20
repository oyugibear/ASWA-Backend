const AbstractController = require("../AbstractController.js")
const User = require("../../models/usermodel.js")
const AuthService = require("../../services/Auth/index.js")
// const { nanoid } = require("nanoid")
const bcrypt = require("bcryptjs")

class AuthController extends AbstractController {
    constructor() {
      super()
    }

    static async signup(req, res) {
        try {
            let user = await AuthService.signup(req.body)
        
            user.password = undefined
            AbstractController.successReponse(res, user, 201, "Signup success")
            console.log("SIGN UP SUCCESS")
        } catch (error) {
            console.log(error)
        }
    }

    static async login(req, res) {
        try {
            let response = await AuthService.login(req.body)
            response.user.password = undefined
        
            AbstractController.successReponse(res, response, 200, "Login success")
        } catch (error) {
            console.log(error)
        }
    }

    static async forgotPassword(req, res) {
        try {
            const email = req.body.email
        
            const shortCode = nanoid(6).toUpperCase()
            const user = await User.findOneAndUpdate(
              { email },
              { passwordResetCode: shortCode }
            )
        
            if (!user) throw new AppError("provide a valid user email address", 400)
        
            const response = await AuthService.sendForgotPasswordEmail(
              shortCode,
              email
            )
            if (response) {
              AbstractController.successReponse(
                res,
                response,
                200,
                "Short code sent to your email"
              )
            }
            
        } catch (error) {
            console.log(error)
        }

      }

    static async resetPassword(req, res) {
        try {
            const { email, confirmationCode, newPassword } = req.body
        
            const hashedPassword = await bcrypt.hash(newPassword, 8)
            const user = await User.findOneAndUpdate(
              { email, passwordResetCode: confirmationCode },
              { password: hashedPassword, passwordResetCode: "" }
            ).exec()
        
            if (!user) {
              throw new AppError("Check email/code and try again", 400)
            }
        
            res.json({ ok: true })
        } catch (error) {
            console.log(error)
        }
      }

}


module.exports = AuthController