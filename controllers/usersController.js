const { user } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// UsersController class declaration
class UsersController {

  async signup(newUser, req, res, next) {
    // get the req.user from passport authentication
    try {
      const body = {
        _id: newUser[0].dataValues.id,
      };

      // create jwt token from body variable
      const token = jwt.sign(
        {
          newUser: body,
        },
        "secret_password"
      );
      const userInfo = {
        email: newUser[0].dataValues.email,
        foto: "/img/" + newUser[0].dataValues.foto,
        nama: newUser[0].dataValues.nama,
        role: newUser[0].dataValues.role,

      }
      // success to create token
      res.status(200).json({
        user: userInfo,
        message: "Signup success!",
        token: token,
      });

    } catch (error) {
      const message = {
        message: "Something went wrong when signing in user",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }

  // If user pass the signup or login authorization, it will go to this function to create and get token
  async login(user, req, res, next) {
    try {
      // Create a varible that will be saved in token
      const body = {
        _id: user[0].dataValues.id,
      };

      // Create a token for the user
      const token = jwt.sign({
        user: body
      }, 'secret_password');

      const userInfo = {
        email: user[0].dataValues.email,
        foto: "/img/" + user[0].dataValues.foto,
        nama: user[0].dataValues.nama,
        role: newUser[0].dataValues.role,
      }
      // If success, it will return the message and the token
      return res.status(200).json({
        message: 'Login success!',
        token: token
      });
    } catch (e) {
      // If error, it will return the message of error
      const message = {
        message: "Something went wrong when login in user",
        error: error.message
      }
      sendError(message, 501, next)

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

  async updateProfile(token, req, res, next) {
		try {
      
      let data = {
          nama: req.body.nama,
          gender: req.body.gender,
          telepon: req.body.telepon
      }

      Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
      const updateProfile = await user.findOneAndUpdate(
          { id: req.params.id },
          data

      )
      if (updateProfile)
          sendResponse("Profile Updated Succesfully", 200, res);
      else
          sendError("failed to update profile", 500, next);
  } catch (error) {
      sendError(error.message, 500, next)
  }
	}
}
  

module.exports = new UsersController; // Export UserController
