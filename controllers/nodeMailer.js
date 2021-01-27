
const nodemailer = require('nodemailer');
const fs = require('fs');
const mustache = require('mustache');
const sendEmail = async function(content) {
  const template = fs.readFileSync(__dirname+"/template.html", 'utf8');

  let transporter = nodemailer.createTransport({
    service: "hotmail",
    // host: "smtp.outlook.email",
    port: 587,
    // secure: false, 
    auth: {
          user: 'node1232021@outlook.com',
          pass: 'nodemailer123', 
        },
        tls:{
          rejectUnauthorized:false
        }
      }); 
  
  //step 2
  const option = {
      from: "node1232021@outlook.com",
      to: "ilhamrecca@gmail.com",
      subject: "Your Appointment at Doctor Pets",
      html: mustache.render(template, {...content}),
      text: "Bismillah.......wow! That's simple!!"
  };
  //step 3
  transporter.sendMail(option, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    }); 
}
module.exports = {sendEmail}; // Export UserController
