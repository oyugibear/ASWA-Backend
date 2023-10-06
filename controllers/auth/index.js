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
        let user = await AuthService.signup(req.body)
    
        user.password = undefined
        AbstractController.successReponse(res, user, 201, "Signup success")
    }

    static async login(req, res) {
        let response = await AuthService.login(req.body)
        response.user.password = undefined
    
        AbstractController.successReponse(res, response, 200, "Login success")
    }

}


module.exports = AuthController