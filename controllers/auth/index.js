const AbstractController = require("../AbstractController.js")
const User = require("../../models/usermodel.js")
const AuthService = require("../../services/Auth/index.js")
// const { nanoid } = require("nanoid")
// const bcrypt = require("bcrypt")

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

}


module.exports = AuthController