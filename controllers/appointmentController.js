const {
    User,
    Peliharaan,
    Klinik,
    Memiliki,
    Appointment,
    Periksa,
} = require('../models') // Import user model
const passport = require('passport'); // Import passport
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const Sequelize = require('sequelize');
const mail = require('./nodeMailer.js');

const {
    sendError,
    sendResponse
} = require("./errorHandler");
const appointmentValidator = require('../middlewares/validators/appointmentValidator');
// UsersController class declaration
class AppointmentController {

    async addAppointment(user, req, res, next) {
        try {
            const result = await Appointment.create({
                id: req.body.id,
                userId: user[0].dataValues.id,
                klinikId: req.body.klinikId,
                dokterId: req.body.dokterId,
                waktu: req.body.date,
            })

            const peliharaanPeriksa = req.body.peliharaanId.split(",");
            for (let i = 0; i < peliharaanPeriksa.length; i++) {
                const createPeriksa = await Periksa.create({
                    appointmentId: result.dataValues.id,
                    peliharaanId: peliharaanPeriksa[i]
                })
            }

            const content = {
                Username: user[0].dataValues.id,
                Klinik: req.body.klinikId,
            }
            // mail.sendEmail();

            sendResponse("Add Appointment success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }
    }

    async acceptAppointment(user, req, res, next) {
        try {
            const Op = Sequelize.Op
            console.log(req.body.diterima)
            const acceptAppointment = await Appointment.update(
                { diterima: req.body.diterima }, {
                where: {
                    [Op.and]: [{
                        dokterId: user[0].dataValues.id
                    }, {
                        id: req.body.appointmentId
                    }]
                },
            })

            // If success, it will return user's Profile
            sendResponse("Success accepting Appointment", 200, acceptAppointment, res);
        } catch (error) {
            // If error, it will return the message of error
            const message = {
                message: "Something went wrong when accessing user's profile",
                error: error.message
            }
            sendError(message, 501, next)

        }
    }

    async getAllAppointmentForDokter(user, req, res, next) {
        try {
            const result = await Appointment.findAll({
                where: {
                    dokterId: user[0].dataValues.id
                },
                include: [{
                    model: Periksa,
                    attributes: ['id', 'appointmentId', 'peliharaanId'],
                    as: "periksa",
                    include: [{
                        model: Peliharaan,
                        attributes: ['id', 'nama', 'gender', 'jenis'],
                    }]
                }]
            })


            sendResponse("get Appointment success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }
    }

    // Get All data from appointment
    async getAllAppointment(user, req, res, next) {
        try {

            const result = await Appointment.findAll({
                where: {
                    userId: user[0].dataValues.id
                },
                include: [{
                    model: Periksa,
                    attributes: ['id', 'appointmentId', 'peliharaanId'],
                    as: "periksa",
                    include: [{
                        model: Peliharaan,
                        attributes: ['id', 'nama', 'gender', 'jenis'],
                    }]
                }]
            })


            sendResponse("get Appointment success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }

    }

    async updateAppointment(user, req, res, next) {
        try {
            const result = await Appointment.update({
                id: req.body.id,
                userId: user[0].dataValues.id,
                klinikId: req.body.klinikId,
                dokterId: req.body.dokterId,
                waktu: req.body.waktu,

            })
            
            sendResponse("Update Appointment success!", 200, result, res);
        } catch (error) {
            const message = {
                message: "Something went wrong when signing in user",
                error: error.message
            }
            sendError(message, 501, next)
        }
    }
}

module.exports = new AppointmentController; // Export AppointmentController