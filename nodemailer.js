// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport(transporter {
//     service: "hotmail",
//     auth: {
//         user: "node1232021@outlook.com",
//         password: "nodemailer123"
//     }
// });

// const option = {
//     from: "node1232021@outlook.com",
//     to: "putrialisyahm@gmail.com",
//     subject: "sending email with node.js",
//     text: "wow! That's simple!!"
// };

// transporter.sendMail(options, callback
//     function (err, info) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log("Sent: " + info.response);
//     })

    // transporter.sendMail(options, callback function (err, info)) {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log("Sent: " + info.response);
    // })
  
    // let transport = nodemailer.createTransport({
    //     host: 'smtp.mailtrap.io',
    //     port: 2525,
    //     auth: {
    //        user: 'node1232021@outlook.com',
    //        pass: 'nodemailer123'
    //     }
    // });
    // const message = {
    //     from: 'node1232021@outlook.com', // Sender address
    //     to: 'putrialisyahm@gmail.com',         // List of recipients
    //     subject: 'sending email with node.js', // Subject line
    //     text: 'Wowwww!' // Plain text body
    // };
    // transport.sendMail(message, function(err, info) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log(info);
    //     }
    // });