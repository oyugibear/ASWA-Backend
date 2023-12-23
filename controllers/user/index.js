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

    static async downloadData(req, res) {
        try {
          const data = await UserService.getUsers();
          
          if (!data || data.length === 0) {
            res.status(404).send('No User data found.');
            return;
          }
      
          // Prepare CSV content
          let csvContent = 'Date Creater,Name,email,organization,department,city,country,role\n';
      
          data.forEach(symp => {
            const {
                createdAt,
                name,
                email,
            //   function,
                organization,
                department,
                city,
                country,
                role,
            } = symp;
      
            const row = `"${createdAt}","${name}","${email}","${organization}","${department}","${country}","${city}","${role}"\n`;
            csvContent += row;
          });
      
          // Set headers for CSV download
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename=user_data.csv');
      
          // Stream the CSV content to the response
          res.status(200);
          res.write(csvContent, 'utf-8');
          res.end();
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    }
    static async downloadReviewerData(req, res) {
        try {
          const data = await UserService.getUsers();
          
          const filteredData = data.filter((user) => user.role === "Reviewer")
          if (!filteredData || filteredData.length === 0) {
            res.status(404).send('No Reviewer data found.');
            return;
          }
      
          // Prepare CSV content
          let csvContent = 'Date Creater,Name,email,organization,department,city,country,role\n';
      
          filteredData.forEach(user => {
            const {
                createdAt,
                name,
                email,
            //   function,
                organization,
                department,
                city,
                country,
                role,
            } = user;
      
            const row = `"${createdAt}","${name}","${email}","${organization}","${department}","${country}","${city}","${role}"\n`;
            csvContent += row;
          });
      
          // Set headers for CSV download
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename=reviewer_data.csv');
      
          // Stream the CSV content to the response
          res.status(200);
          res.write(csvContent, 'utf-8');
          res.end();
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    }
}


module.exports = UserController