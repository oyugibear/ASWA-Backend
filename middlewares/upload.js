// const AWS = require("aws-sdk")
// const multer = require("multer")
// const multerS3 = require("multer-s3")
// const { s3Config } = require("../util/config.js")

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   })

// const uploadAttachment = (fieldName) =>
//   multer({
//     limits: { fileSize: 10000000 }, // 10 Mb
//     storage: multerS3({
//       s3,
//       bucket: s3Config.bucket, // zuri-public-prod
//       acl: s3Config.acl,
//       metadata: (reqst, file, cb) => {
//         cb(null, { fieldName })
//       },
//       key: (request, file, cb) => {
//         cb(
//           null,
//           `${fieldName}/${request.body.userid}/${Date.now()}-${
//             file.originalname
//           }`
//         )
//       },
//     }),
//   }).single(fieldName)

//   module.exports = {
//     uploadAttachment,
//   }
  