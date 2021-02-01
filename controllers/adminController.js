const { User, Peliharaan, Appointment, Klinik } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { sendError, sendResponse } = require("./errorHandler");
const Sequelize = require('sequelize');

// UsersController class declaration
class AdminController {


  async updateKlinik(token, req, res, next) {
    try {

      //clean data fasilitas
      let arrFasil;
      if (req.body.fasilitas !== undefined) {
        arrFasil = req.body.fasilitas.trim().split(",");
        arrFasil = arrFasil.map(datum => {
          return datum.trim();
        })
        arrFasil = arrFasil.join();
      }


      let data = {
        nama: req.body.nama,
        tentang: req.body.tentang,
        lokasi: req.body.lokasi,
        fasilitas: arrFasil,

      }

      Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
      // console.log(token[0].dataValues.id);
      const updateKlinik = await Klinik.update(
        data,
        {
          where: { id: req.body.klinikId },
        })
      sendResponse("klinik Updated Succesfully", 200, updateKlinik, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when Updating Klinik",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }


  async addKlinik(token, req, res, next) {
    try {

      //clean data fasilitas
      let arrFasil = req.body.fasilitas.trim().split(",");
      arrFasil = arrFasil.map(datum => {
        return datum.trim();
      })
      arrFasil = arrFasil.join();
      const data = {
        nama: req.body.nama,
        tentang: req.body.tentang,
        lokasi: req.body.lokasi,
        fasilitas: arrFasil,
        foto: ("/img/defaultKlinik.jpeg")
      }

      const result = await Klinik.create(data)
      console.log(result);
      sendResponse("klinik Added Succesfully", 200, {}, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when Adding Klinik",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }

  async deleteKlinik(token, req, res, next) {
    try {

      //clean data fasilitas

      const result = await Klinik.destroy({
        where: { id: req.body.klinikId },
      })

      sendResponse("Deleting Klinik Success", 200, {}, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when deleteing Klinik",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }
  async changeKlinikPhoto(token, req, res, next) {
    try {
      const foto = req.file === undefined ? (token[0].dataValues.foto) : (req.file.filename);

      const updateProfile = await Klinik.update(
        { foto: foto },
        {
          where: { id: req.body.klinikId },
        })
      sendResponse("Klinik Photo Updated Succesfully", 200, updateProfile, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when Accessing Klinik Photo",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }
  async addAdminToKlinik(token, req, res, next) {
    try {
      const admin = req.body.adminId

      const updateProfile = await Klinik.update(
        { adminId: admin },
        {
          where: { id: req.body.klinikId },
        })
      sendResponse("Admin klnik Updated Succesfully", 200, updateProfile, res);
    } catch (error) {
      const message = {
        message: "Something went wrong when Adding Admiin to Klnik",
        error: error.message
      }
      sendError(message, 501, next)
    }
  }
}

module.exports = new AdminController; // Export UserController
