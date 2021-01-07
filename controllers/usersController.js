const { user } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// UsersController class declaration
class UsersController {

  // If user pass the signup or login authorization, it will go to this function to create and get token
  async login(user, req, res) {
    try {
      // Create a varible that will be saved in token
      const body = {
        id: user.id,
        email: user.email
      };

      // Create a token for the user
      const token = jwt.sign({
        user: body
      }, 'secret_password');

      // If success, it will return the message and the token
      return res.status(200).json({
        message: 'Login success!',
        token: token
      });
    } catch (e) {
      // If error, it will return the message of error
      return res.status(401).json({
        status: "Error!",
        message: e
      })
    }
  }

  // This function is to check, Is the user has Authorized or Unauthorized
  async authorization(user, req, res) {
    try {
      // If success, it will be return the user information (id, email, and role)
      return res.status(200).json({
        status: "Success!",
        message: "Authorized!",
        user: user
      })
    } catch (e) {
      // If error, it will return the message of error
      return res.status(401).json({
        status: "Error!",
        message: "Unauthorized!",
      })
    }
  }

}

module.exports = new UsersController; // Export UserController
