const AbstractController = require("../AbstractController.js")
const Research = require("../../models/researchmodel.js")
const ResearchService = require("../../services/Research/index.js")
const researchmodel = require("../../models/researchmodel.js")
const papaparse = require('papaparse');

class ResearchController extends AbstractController {
    constructor() {
      super()
    }

    static async createResearch(req, res) {
      let researchData = req.body
      const research = await ResearchService.createResearch(researchData)

      console.log(research)
      if (research) {
        AbstractController.successReponse(res, research, 200, "research added")
      }
      return research
    }

    static async getAllResearch(req, res) {
      const researchs = await ResearchService.getResearchs();
  
      if (researchs) {
        AbstractController.successReponse(res, researchs, 200, "all research found")
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

    static async reviewOneResearch(req, res) {
      const id = req.params.id
      const data = req.body
  
      // console.log(data)
      const research = await researchmodel.findByIdAndUpdate(id, data, { new: true })
  
      console.log("",research)
      if (!research) throw new AppError("could not approve the research", 400)
      res.status(200).send(research)
    }

    static async downloadData(req, res) {
      try {
        const researchs = await ResearchService.getResearchs();
        
        if (!researchs || researchs.length === 0) {
          res.status(404).send('No research data found.');
          return;
        }
    
        // Prepare CSV content
        let csvContent = 'Reference,Title,Category,Type of Presentation,Authors,Introduction,Methods,Results,Discussion,Keywords,Attendance Certificate,Summary\n';
    
        researchs.forEach(research => {
          const {
            reference,
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
            summary
          } = research;
    
          const row = `"${reference}","${title}","${category}","${type_of_presentation}","${authors}","${introduction}","${methods}","${results}","${discussion}","${keywords}","${attendance_certificate}","${summary}"\n`;
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