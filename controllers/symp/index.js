const AbstractController = require("../AbstractController.js")
const Symp = require("../../models/symposiummodel.js")
const SympService = require("../../services/Symp/index.js")
const syposiummodel = require("../../models/symposiummodel.js")
const usermodel = require("../../models/usermodel.js")
const { sendSubmissionRecievedEmail } = require("../../utils/sendMail.js")

class SympController extends AbstractController {
    constructor() {
      super()
    }
    static async createSymposium(req, res) {
      try {
        let researchData = req.body
        let user = req.body.postedBy;
        const research = await SympService.createSymposium(researchData)
        console.log(research)

        const existingUser = await usermodel.findOne({ _id: user });
        console.log("Email: ", existingUser?.email);

        if (research) {
          sendSubmissionRecievedEmail(existingUser?.email);
          AbstractController.successReponse(res, research, 200, "Symp added")
        }
        return research
        
      } catch (error) {
        console.log(error)
      }
    }

    static async getSymposiums(req, res) {
      try {
        const symps = await SympService.getSymposiums();
    
        if (symps) {
          AbstractController.successReponse(res, symps, 200, "all symposiums upload found")
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }
    static async getOneSymposium(req, res) {
      const id = req.params.id
      try {
        const symposium = await syposiummodel.findById(id)
        if (symposium) {
          res.status(200).send(symposium)
          console.log("Symposium Retrived ID: ", symposium)
        }
      } catch (error) {
        res.status(500).send(error)
        console.log(error)
      }
      
    }

    static async reviewOneSymposium(req, res) {
      try {
        const id = req.params.id
        const data = req.body
    
        // console.log(data)
        const symposium = await syposiummodel.findByIdAndUpdate(id, data, { new: true })
    
        console.log("",symposium)
        if (!symposium) throw new AppError("could not approve the symposium", 400)
        res.status(200).send(symposium)
        
      } catch (error) {
        console.log(error)
      }
    }

    static async downloadData(req, res) {
      try {
        const symps = await SympService.getSymposiums();
        
        if (!symps || symps.length === 0) {
          res.status(404).send('No Symposium data found.');
          return;
        }
    
        // Prepare CSV content
        let csvContent = 'Date Added,Reviewed Date,Title,Organisers,Purpose_and_objectives,description,rationale_for_topic,categories,chair_and_coChairs,coordinator,format,speakers,number_of_attendees,remarks_or_requests,postedBy,Reviewed,Grade,Comments\n';
    
        symps.forEach(symp => {
          const {
            createdAt,
            updatedAt,
            title,
            organisers,
            purpose_and_objectives,
            description,
            rationale_for_topic,
            categories,
            chair_and_coChairs,
            coordinator,
            format,
            speakers,
            number_of_attendees,
            remarks_or_requests,
            postedBy,
            reviewed,
            score,
            comments,
          } = symp;
    
          const row = `"${createdAt}","${updatedAt}","${title}","${organisers}","${purpose_and_objectives}","${description}","${categories}","${rationale_for_topic}","${chair_and_coChairs}","${coordinator}","${format}","${speakers}","${number_of_attendees}","${remarks_or_requests}","${postedBy}","${reviewed}","${score}","${comments}"\n`;
          csvContent += row;
        });
    
        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=symp_data.csv');
    
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

module.exports = SympController