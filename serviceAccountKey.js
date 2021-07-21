const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const serviceAccountKey = {
  type: "service_account",
  project_id: "sliminem-music",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: "firebase-adminsdk-5qqp8@sliminem-music.iam.gserviceaccount.com",
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5qqp8%40sliminem-music.iam.gserviceaccount.com"
}

module.exports = serviceAccountKey;