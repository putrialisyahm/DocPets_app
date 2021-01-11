const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express(); // Make API

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
