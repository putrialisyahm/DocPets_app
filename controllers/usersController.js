const { User, Peliharaan } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { sendError, sendResponse } = require("./errorHandler");
// UsersController class declaration
class UserController {

  async signup(newUser, req, res, next) {
    // get the req.user from passport authentication
    try {
      const body = {
        _id: newUser[0].dataValues.id,
      };

      // create jwt token from body variable
      const token = jwt.sign(
        {
          user: body,
        },
        "secret_password"
      );
      const userInfo = {
        email: newUser[0].dataValues.email,
        foto: "/img/" + newUser[0].dataValues.foto,
        nama: newUser[0].dataValues.nama,
        role: newUser[0].dataValues.role,

      }

      const result = {
        user: userInfo,
        token: token,
      }
      // success to create token
      sendResponse("Signup success!", 200, result, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when signing in user",
        error: error.message
      }
      sendError(message, 501, next)
    }

  }

  // If user pass the signup or login authorization, it will go to this function to create and get token
  async login(user, req, res) {
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
        role: user[0].dataValues.role,
      }

      const result = {
        user: userInfo,
        token: token,
      }
      // success to create token
      sendResponse("Login success!", 200, result, res);


    } catch (error) {
      // If error, it will return the message of error
      const message = {
        message: "Something went wrong when login in user",
        error: error.message
      }
      sendError(message, 501, next)

    }
  }

  async getUserProfile(user, req, res, next) {
    try {

     
      const result = await Peliharaan.findAll({
        where: { userId: user[0].dataValues.id },
        attributes: ['id', 'nama', 'jenis', 'gender', "userId"]
      })

      const userInfo = {
        email: user[0].dataValues.email,
        foto: "/img/" + user[0].dataValues.foto,
        nama: user[0].dataValues.nama,
        role: user[0].dataValues.role,
        gender: user[0].dataValues.gender,
        telepon: user[0].dataValues.telepon,
        numPet: result.length,
      }
      // If success, it will return user's Profile
      sendResponse("Success Getting User Profile", 200, userInfo, res);
    } catch (error) {
      // If error, it will return the message of error
      const message = {
        message: "Something went wrong when accessing user's profile",
        error: error.message
      }
      sendError(message, 501, next)

    }
  }

  async getDokterProfile(user, req, res, next) {
    try {

      const userInfo = {
        email: user[0].dataValues.email,
        foto: "/img/" + user[0].dataValues.foto,
        nama: user[0].dataValues.nama,
        role: user[0].dataValues.role,
        gender: user[0].dataValues.gender,
        telepon: user[0].dataValues.telepon,
        status: user[0].dataValues.status,
        pengalaman: user[0].dataValues.pengalaman,
        waktuKerja: user[0].dataValues.waktuKerja,
      }
      // If success, it will return user's Profile
      sendResponse("Success Getting Doctor's Profile", 200, userInfo, res);
    } catch (error) {
      // If error, it will return the message of error
      const message = {
        message: "Something went wrong when Accessing Doctor's profile",
        error: error.message
      }
      sendError(message, 501, next)

    }
  }


  async updateUserProfile(token, req, res, next) {
    try {
      let data = {
        nama: req.body.nama,
        gender: req.body.gender,
        telepon: req.body.telepon,
        foto: "default.png"
      }

      Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
      // console.log(token[0].dataValues.id);
      const updateProfile = await User.update(
        data,
        {
          where: { id: token[0].dataValues.id },
        })
      sendResponse("Profile Updated Succesfully", 200, {}, res);
    } catch (error) {
      console.log(error);
      sendError(error.message, 500, next)
    }
  }

  async updateDokterProfile(token, req, res, next) {
    try {

      let data = {
        nama: req.body.nama,
        gender: req.body.gender,
        telepon: req.body.telepon,
        pengalaman: req.body.experience,
        status: req.body.status,
        waktuKerja: req.body.waktuKerja,
      }

      Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
      const updateProfile = await User.update(
        data,
        {
          where: { id: token[0].dataValues.id },
        })
      sendResponse("Profile Updated Succesfully", 200, {}, res);
    } catch (error) {
      sendError(error.message, 500, next)
    }
  }

  async getPet(token, req, res, next) {
    try {
      const result = await Peliharaan.findAll({
        where: { userId: token[0].dataValues.id },
        attributes: ['id', 'nama', 'jenis', 'gender', "userId"]
      })
      console.log(result);
      sendResponse("Pets Retrieved Succesfully", 200, result, res);
    } catch (error) {
      sendError(error.message, 500, next)
    }
  }

  async addPet(token, req, res, next) {
    try {

      let data = {
        nama: req.body.nama,
        gender: req.body.gender,
        jenis: req.body.jenis,
        userId: token[0].dataValues.id,
      }


      const result = await Peliharaan.create(data)
      console.log(result);
      sendResponse("Pets Added Succesfully", 200, {}, res);
    } catch (error) {
      sendError(error.message, 500, next)
    }
  }


}
module.exports = new UserController; // Export UserController
