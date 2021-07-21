const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './../config.env' })
const user = process.env.USER;
const pass = process.env.USER_PASSWORD;

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
})

const sendEmail = (name, email, phoneNo, message) => {
  transport.sendMail({
    from: user,
    to: user,
    subject: "Sliminem Music Contact",
    html: `<h4>Name : ${name}.</h4>
           <h4>Emai Id: ${email}.</h4>
           <h4>Phone No: ${phoneNo}.</h4>
           <h4>Message: ${message}.</h4>`,
  }).catch(err => console.log(err));
};

module.exports = sendEmail;


