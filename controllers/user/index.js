const AbstractController = require("../AbstractController.js")
const User = require("../../models/usermodel.js")
const UserService = require("../../services/User/index.js")

class UserController extends AbstractController {
    constructor() {
      super()
    }

    static async getUsers(req, res) {
        const users = await UserService.getUsers();
  
        if (users) {
            AbstractController.successReponse(res, users, 200, "all users found")
        }
    }

}


module.exports = UserController