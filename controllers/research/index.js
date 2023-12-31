const AbstractController = require("../AbstractController.js")
const Research = require("../../models/researchmodel.js")
const ResearchService = require("../../services/Research/index.js")
const researchmodel = require("../../models/researchmodel.js")
const papaparse = require('papaparse');
const AppError = require("../../errors/app-error.js");
const { sendSubmissionRecievedEmail } = require("../../utils/sendMail.js");
const usermodel = require("../../models/usermodel.js");

class ResearchController extends AbstractController {
    constructor() {
      super()
    }

    static async createResearch(req, res) {
      try {
        let researchData = req.body;
        let user = req.body.postedBy;
    
        const research = await ResearchService.createResearch(researchData);
        console.log(research);
    
        // Assuming you're using Mongoose, adjust this query based on your database model
        const existingUser = await usermodel.findOne({ _id: user });
        console.log("Email: ", existingUser?.email);
    
        if (research) {
          sendSubmissionRecievedEmail(existingUser?.email);
          AbstractController.successReponse(res, research, 200, "research added");
        }
        return research;
      } catch (error) {
        console.log(error);
      }
    }
    
    


    static async getAllResearch(req, res) {
      try {
        const researchs = await ResearchService.getResearchs();
    
        if (researchs) {
          AbstractController.successReponse(res, researchs, 200, "all research found")
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }

    static async getOneResearch(req, res) {
      const id = req.params.id
      try {
        const research = await researchmodel.findById(id)
        if (research) {
          res.status(200).send(research)
        }
      } catch (error) {
        res.status(500).send(error)
      }
      
    }

    static async getReviewersResearchs(req, res) {
      const id = req.params.id;
      try {
        const researchs = await ResearchService.getResearchs();
        const user = await usermodel.findById(id);
        const specialization = user?.specialization;

        // Get the number of users that match the specialization
        const matchingUsersCount = await usermodel.countDocuments({ specialization });

        // Calculate the number of researches per reviewer
        const researchesPerReviewer = Math.floor(researchs.length / matchingUsersCount);

        // Filter researches based on category and reviewed status
        const filteredResearchs = researchs.filter(
          (research) => research.reviewed === false && research.category === specialization
        );

        // Assign researches to reviewers
        const reviewers = [];
        let startIndex = 0;
        for (let i = 0; i < matchingUsersCount; i++) {
          const endIndex = startIndex + researchesPerReviewer;
          const reviewerResearchs = filteredResearchs.slice(startIndex, endIndex);
          const reviewer = {
            id: i + 1, // Assign a unique ID to each reviewer
            researchs: reviewerResearchs.map((research) => research._id), // Save the IDs of the assigned researches
          };

          console.log("reviewerResearchs: ", reviewerResearchs);
          // Save the assigned researches to the reviewer's data
          // await usermodel.findByIdAndUpdate(user._id, { $push: { assignedResearchs: reviewerResearchs } });

          reviewers.push(reviewer);
          startIndex = endIndex;
        }

        if (reviewers.length > 0) {
          res.status(200).send(reviewers);
        } else {
          res.status(404).send('No research data found for reviewers.');
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }

    static async reviewOneResearch(req, res) {

      try {
        const id = req.params.id
        const data = req.body
    
        // console.log(data)
        const research = await researchmodel.findByIdAndUpdate(id, data, { new: true })
    
        console.log("",research)
        if (!research) throw new AppError("could not approve the research", 400)
        res.status(200).send(research)
        
      } catch (error) {
        console.log(error)
      }
    }

    static async downloadreviewedsubsData(req, res) {
      try {
        const researchs = await ResearchService.getResearchs();

        const fitered = researchs.filter(research => research.reviewed === true)

        if (!fitered || fitered.length === 0) {
          res.status(404).send('No research data found.');
          return;
        }
    
        // Prepare CSV content
        let csvContent = 'Date Added,Reviewed Date,Reference,Title,Category,Type of Presentation,Authors,Introduction,Methods,Results,Discussion,Keywords,Attendance Certificate,Summary,Reviewed,Grade,Comments\n';
    
        fitered.forEach(research => {
          const {
            createdAt,
            updatedAt,
            refenence,
            title,
            category,
            type_of_presentation,
            authors,
            introduction,
            methods,
            results,
            discussion,
            keywords,
            attendance_certificate,
            summary,
            reviewed,
            score,
            comments,
          } = research;
    
          const row = `"${createdAt}","${updatedAt}","${refenence}","${title}","${category}","${type_of_presentation}","${authors}","${introduction}","${methods}","${results}","${discussion}","${keywords}","${attendance_certificate}","${summary}","${reviewed}","${score}","${comments}"\n`;
          csvContent += row;
        });
    
        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=reviewedResearch_data.csv');
    
        // Stream the CSV content to the response
        res.status(200);
        res.write(csvContent, 'utf-8');
        res.end();
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
    static async downloadData(req, res) {
      try {
        const researchs = await ResearchService.getResearchs();
        
        if (!researchs || researchs.length === 0) {
          res.status(404).send('No research data found.');
          return;
        }
    
        // Prepare CSV content
        let csvContent = 'Date Added,Reviewed Date,Reference,Title,Category,Type of Presentation,Authors,Introduction,Methods,Results,Discussion,Keywords,Attendance Certificate,Summary,Reviewed,Grade,Comments\n';
    
        researchs.forEach(research => {
          const {
            createdAt,
            updatedAt,
            refenence,
            title,
            category,
            type_of_presentation,
            authors,
            introduction,
            methods,
            results,
            discussion,
            keywords,
            attendance_certificate,
            summary,
            reviewed,
            score,
            comments,
          } = research;
    
          const row = `"${createdAt}","${updatedAt}","${refenence}","${title}","${category}","${type_of_presentation}","${authors}","${introduction}","${methods}","${results}","${discussion}","${keywords}","${attendance_certificate}","${summary}","${reviewed}","${score}","${comments}"\n`;
          csvContent += row;
        });
    
        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=research_data.csv');
    
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

module.exports = ResearchController