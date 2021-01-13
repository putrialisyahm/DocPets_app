const { User, Peliharaan, Klinik, Memiliki } = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const Sequelize = require('sequelize');

const { sendError, sendResponse } = require("./errorHandler");
const memiliki = require('../models/memiliki');
// UsersController class declaration
class KlinikController {

    async search(req, res, next) {
        // get the req.user from passport authentication
        try {
            const Op = Sequelize.Op
            let query = [];
            if (req.body.nama) {
                query.push({ nama: { [Op.like]: "%" + req.body.nama + "%" } })
            }
            if (req.body.lokasi) {
                query.push({ lokasi: req.body.lokasi })
            }
            const result = await Klinik.findAll({ where: { [Op.and]: query }, });
            sendResponse("Search success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }

    }

    async addDokterToKlinik(user, req, res, next) {
        // get the req.user from passport authentication
        try {
            const result = await Memiliki.create(
                {
                    dokterId: req.body.dokterId,
                    klinikId: req.body.klinikId,
                }
            )
            // success to create token
            sendResponse("Adding Dokter to Klinik success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }

    }

    // If user pass the signup or login authorization, it will go to this function to create and get token


}

module.exports = new KlinikController; // Export UserController
