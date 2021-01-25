const nodemailer = require('nodemailer');
//step 1
let transporter = nodemailer.createTransport({
  service: "hotmail",
    auth: {
        user: "putrimariska123456789@gmail.com",
        password: "semangatbelajar2021"
    }
});
//step 2
const option = {
    from: "putrimariska123456789@gmail.com",
    to: "putrialisyahm@gmail.com",
    subject: "sending email with node.js",
    text: "wow! That's simple!!"
};
//step 3
transporter.sendMail(option, (error,info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
  });
  
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
          user: 'node1232021@outlook.com',
          pass:   'nodemailer123', 
        },
      }); 
    const message = {
        from: 'node1232021@outlook.com', // Sender address
        to: 'putrialisyahm@gmail.com',         // List of recipients
        subject: 'sending email with node.js', // Subject line
        text: 'Wowwww!' // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   host:'stmp.gmail.com',
//   port:8000,
//   secure: true,
//   auth: {
//     user: 'putrimariska123456789.com',
//     pass: 'semangatbelajar2021'
//   },
//   tls:{rejectUnauthorized: false}
// });

// var mailOptions = {
//     from: 'putrimariska123456789.com', // Sender address
//             to: 'putrialisyahmariska@gmail.com',         // List of recipients
//             subject: 'sending email with node.js', // Subject line
//             text: 'Wowwww!' // Plain text body
// };

// transporter.sendMail(mailOptions,
//      function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });