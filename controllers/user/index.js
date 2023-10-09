const AbstractController = require("../AbstractController.js")
const User = require("../../models/usermodel.js")
const UserService = require("../../services/User/index.js")

class UserController extends AbstractController {
    constructor() {
      super()
    }

    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
      
            if (users) {
                AbstractController.successReponse(res, users, 200, "all users found")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = UserController