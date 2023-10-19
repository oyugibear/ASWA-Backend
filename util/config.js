const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  }
  
  const s3Config = {
    bucket: "aswb-attachments-submissions",
    acl: "public-read",
  }
  
  module.exports = {
    awsConfig,
    s3Config,
  }
  