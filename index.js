const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const userRoutes = require('./routes/userRoutes'); // Import routes
const fs = require("fs");
const https = require("https");

const app = express(); // Make API

const key = fs.readFileSync("./ssl/privkey.pem", "utf-8");
const cert = fs.readFileSync("./ssl/fullchain.pem", "utf-8");

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

//set static assets to public directory
app.use(express.static('public'));

app.use('/user', userRoutes); // If access localhost:3000, it will be go to userRoutes
// app.use('/peliharaan', peliharaanRoutes);

// Server running on port 3000
app.listen(3000, () => {
  console.log('User running on port 3000!');
})

https.createServer({ key: key, cert: cert }, app).listen(3002); // Define app
