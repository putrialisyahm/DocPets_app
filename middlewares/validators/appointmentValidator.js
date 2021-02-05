const { param, check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const { User, Klinik, Appointment } = require('../../models/') // Import user model
const moment = require('moment');
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { getMaxListeners } = require('process');

const uploadDir = "/img/";
const storage = multer.diskStorage({
    destination: "./public" + uploadDir,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            cb(null, raw.toString("hex") + path.extname(file.originalname));
        });
    },
});

const upload = multer({ storage: storage, dest: uploadDir });

module.exports = {
    addAppointment: [
        check('klinikId', 'Klinik Not Exist').exists().isNumeric(),
        check('dokterId', 'Dokter Not Exist').exists().isNumeric(),
        check('peliharaanId', 'Peliharaan Not Exist').exists(),
        check('date', "date must be a date").exists().custom(value => {
            return moment(value).isValid();
        }),
        (req, res, next) => {
            const errors = validationResult(req); // Collect errors from check function
            // If errors is not null, it will be return errors response
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped(),
                    success: false,
                    code: 422,
                });
            }
            // If no errors, it will go to next step
            next();
        }
    ],
    acceptAppointment: [
        check('appointmentId', 'Appointment Not Exist').exists().isNumeric().custom(value => {
            return Appointment.findAll({
                where: {
                    id: value
                },
            }).then(userLogin => {
                if (userLogin.length === 0) {
                    return false;
                };
                return true;
            })
        }),
        check('diterima', 'diterima must be boolean').exists().isBoolean(),
        (req, res, next) => {
            const errors = validationResult(req); // Collect errors from check function
            // If errors is not null, it will be return errors response
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped(),
                    success: false,
                    code: 422,
                });
            }
            // If no errors, it will go to next step
            next();
        }
    ],

    getAllAppointment: [
        // check('klinikId', 'Klinik Not Exist').exists().isNumeric(),
        // check('dokterId', 'Dokter Not Exist').exists().isNumeric(),
        // check('peliharaanId', 'Peliharaan Not Exist').exists(),
        (req, res, next) => {
            const errors = validationResult(req); // Collect errors from check function
            // If errors is not null, it will be return errors response
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped(),
                    success: false,
                    code: 422,
                });
            }
            // If no errors, it will go to next step
            next();
        }
    ],

    updateAppointment: [
        check('klinikId', 'Klinik Not Exist').exists().isNumeric(),
        check('dokterId', 'Dokter Not Exist').exists().isNumeric(),
        check('peliharaanId', 'Peliharaan Not Exist').exists(),
        (req, res, next) => {
            const errors = validationResult(req); // Collect errors from check function
            // If errors is not null, it will be return errors response
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped(),
                    success: false,
                    code: 422,
                });
            }
            // If no errors, it will go to next step
            next();
        }
    ],

};


