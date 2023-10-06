const AbstractService = require("../AbstractService.js")
const userModel = require("../../models/usermodel.js")
const AppError = require("../../errors/app-error.js")

class UserService extends AbstractService {
    constructor() {
      super()
    }
    
    static async getUsers() {
      const users = await AbstractService.getDocuments(userModel)
      console.log(users)
      if(!users) throw new AppError("could not get all the users data", 400)
      
      return users
    }
  
  }
  
  module.exports = UserService