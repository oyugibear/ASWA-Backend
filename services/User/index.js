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
  
    static async updateUser(id, data) {
      const user = await AbstractService.editDocument(userModel, id, data)

      console.log(user)
      if(!user) throw new AppError("could not update the user data", 400)

      return user
    }
  
  }
  
  module.exports = UserService