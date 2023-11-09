const AbstractController = require("../AbstractController.js")
const User = require("../../models/usermodel.js")
const AuthService = require("../../services/Auth/index.js")
const { nanoid } = require("nanoid")
const bcrypt = require("bcryptjs")
const {sendWelcomeEmail} = require("../../utils/sendMail.js")
const AppError = require("../../errors/app-error.js")
const usermodel = require("../../models/usermodel.js")

class AuthController extends AbstractController {
    constructor() {
      super()
    }

    static async signup(req, res) {
      const { email, password } = req.body;
      try {
        const existingUser = await usermodel.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        let user = await AuthService.signup(req.body)
    
        user.password = undefined
        if (user){
          sendWelcomeEmail(user.email)
          console.log("SIGN UP SUCCESS")
        }
        AbstractController.successReponse(res, user, 201, "Signup success")
      } catch (error) {
          console.log(error)
          throw new AppError("Please provide valid details", 400)
      }
    }

    static async login(req, res) {
        try {
            let response = await AuthService.login(req.body)
            response.user.password = undefined
        
            AbstractController.successReponse(res, response, 200, "Login success")
        } catch (error) {
            console.log(error)
            throw new AppError("Please provide valid email address or password", 400)
        }
    }

    static async forgotPassword(req, res) {
      try {
        const email = req.body.email    
        const shortCode = nanoid(6).toUpperCase()
        const user = await User.findOneAndUpdate(
          { email: email },
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