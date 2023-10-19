const AbstractService = require("../AbstractService.js")
const researchModel = require("../../models/researchmodel.js")
const syposiumModel = require("../../models/symposiummodel.js")
const AppError = require("../../errors/app-error.js")
const { uploadAttachment } = require("../../middlewares/upload.js")
// const multer = require("multer")
// const multerS3 = require("multer-s3")
// const AWS = require("aws-sdk")
// const { s3Config } = require("../../util/config.js")
// const researchmodel = require("../../models/researchmodel.js")

class ResearchService extends AbstractService {
  constructor() {
    super()
  }

  static async createResearch(data) {
    
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: process.env.AWS_REGION,
    // });

    // const upload = multer({
    //   storage: multerS3({
    //     s3: s3,
    //     bucket: s3Config.bucket,
    //     acl: s3Config.acl,
    //     key: function (req, file, cb) {
    //       cb(null, Date.now().toString() + '-' + file.originalname);
    //     }
    //   })
    // }).single('file');

    // let fileUrl = null;

    // // Handle file upload
    // await new Promise((resolve, reject) => {
    //   upload(req, res, function (err) {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       // File uploaded successfully, get the file URL
    //       fileUrl = req.file.location;
    //       data.documentUrl = fileUrl;
    //       resolve();
    //     }
    //   });
    // });
    
    const research = await AbstractService.createDocument(researchModel, data)
    if(!research) throw new AppError("could not create the research data", 400)

    return research
  }
  
  static async getResearchs() {
    const research = await AbstractService.getDocuments(researchModel)
    // console.log(research)
    // if(!research) throw new AppError("could not get all the research data", 400)

    return research
  }

}

module.exports = ResearchService