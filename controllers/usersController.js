const { User } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { sendError, sendResponse } = require("./errorHandler");
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

      //TODO:
      //     tambahkan jumlah peliharaan, dan banyaknya appointment selesai

      const userInfo = {
        email: user[0].dataValues.email,
        foto: "/img/" + user[0].dataValues.foto,
        nama: user[0].dataValues.nama,
        role: user[0].dataValues.role,
        gender: user[0].dataValues.gender,
        telepon: user[0].dataValues.telepon,

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


<<<<<<< HEAD
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


=======
	async insertPP(token, req, res
    ) {
  
      user.findOneAndUpdate({ _id: token._id, },
        {
          $set: { profilePic: req.file === undefined ? "" : req.file.filename, },
        }, { new: true }
      ).then((result) => {
        res.status(200).json({
          message: "Uploaded Successfuly",
          result: result.profilePic,
        });
      });
  
    }
  
    async changeName(token, req, res) {
  
      user.updateOne({ _id: token._id },
        {
          $set: { fullName: req.body.fullName },
        }
      ).then((result) => {
        sendResponse("Name Changed Successfully", 200, res);
      }).catch(err => {
        sendError(err.message, 500, next);
      });
    }
  
    async changePass(token, req, res, next) {
  
  
      // const options = { upsert: false, new: false, setDefaultsOnInsert: true };
      user.findOne({ _id: token._id }
      ).then(async (result) => {
        console.log(result);
        const validate = await bcrypt.compare(req.body.oldPassword, result.password);
        if (validate) {
  
          user.updateOne({ _id: token._id }, { password: bcrypt.hashSync(req.body.newPassword, 10) })
            .then((result) => {
              sendResponse("Password Changed Successfully", 200, res);
            }).catch(err => {
              sendError(err.message, 500, next)
            });
  
        } else {
          sendError("You've entered the wrong password", 400, next);
        }
      }).catch(err => {
        sendError(err.message, 500, next);
      })
  
    }
  
    async getPP(req, res) {
      user.findOne({ email: req.body.email }).then((result) => {
        res.status(200).json({
          message: "Uploaded Successfuly",
          result: result.profilePic,
        });
      });
    }

    
>>>>>>> e87b3a2b017660b5da5c708386ddec875b154997
}

module.exports = new UsersController; // Export UserController
