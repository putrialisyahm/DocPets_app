

const { param, check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const { User, Klinik } = require('../../models/') // Import user model

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

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
    // Signup validator
    search: [
        check('nama', 'search terms must be at minimum length 3').custom(value => {
            if (!value) {
                return true
            }
            if (value.length > 3 && value.length < 33) {
                return true;
            }
            return false
        }),
        check('lokasi', 'search terms must be at minimum length 3').custom(value => {
            if (!value) {
                return true
            }
            if (value.length > 3 && value.length < 33) {
                return true;
            }
            return false
        }),

        // param(["searc", 'search terms must be at minimum length 3'])
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
    addDokterToKlinik: [
        check('dokterId', 'Dokter Not Exist').custom(value => {
            return User.findAll({ where: { id: value } }).then(result => {
                if (result.length !== 0) {
                    return true;
                }
                return false;
            })
        }),
        check('klinikId', 'Dokter Not Exist').custom(value => {
            return Klinik.findAll({ where: { id: value } }).then(result => {
                if (result.length !== 0) {
                    return true;
                }
                return false;
            })
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

};
