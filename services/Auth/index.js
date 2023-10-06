const AbstractService = require("../AbstractService")
const userModel = require("../../models/usermodel.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../../errors/app-error.js")

class AuthService extends AbstractService {
    constructor() {
      super()
    }
    static async signup(data) {
      // console.log("****", data.password)
      data.password = await bcrypt.hash(data.password, 8)
      const response = await AbstractService.createDocument(userModel, data)
      return response
    }
    static async login(data) {
      let { email, password } = data
      console.log("****", email)
        let user = await AbstractService.getSingleDocument(userModel, { email })
        if (!user) {
          throw new AppError("provide valid email address or password", 400)
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordMatch) {
          throw new AppError("provide valid email address or password", 400)
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    
        return { user, token }
    }
}

module.exports = AuthService