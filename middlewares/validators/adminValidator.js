const { param, check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const { User, Klinik } = require('../../models') // Import user model
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
    addKlinik: [
        upload.single("image"),
        check('nama', 'Nama must be between 3-50').isLength({ min: 3, max: 50 }),
        check('lokasi', 'Lokasi must be betwen 3-255').isLength({ min: 3, max: 255 }),
        check('tentang', 'Tentang must be between 3-255').isLength({ min: 3, max:255 }),
        check('fasilitas', 'fasilitas must be between 3-255').isLength({ min: 3, max:255 }),
        
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
    updateKlinik: [
        upload.single("image"),
        check("klinikId", "Klinik Id Not Found").exists(),
        check("nama", "nama must be string and lengt must be between 3-255").custom(value => {
            if (value === undefined)
              return true;
            else if (value.length <= 3 || value.length > 50) {
              return false;
            }
            return true;
        }),
        check("lokasi", "lokasi must be string and lengt must be between 3-255").custom(value => {
            if (value === undefined)
              return true;
            else if (value.length <= 3 || value.length > 255) {
              return false;
            }
            return true;
          }),
        check("tentang", "tentang must be string and lengt must be between 3-255").custom(value => {
            if (value === undefined)
              return true;
            else if (value.length <= 3 || value.length > 255) {
              return false;
            }
            return true;
          }),
        check("fasilitas", "fasilitas must be string and lengt must be between 3-255").custom(value => {
            if (value === undefined)
              return true;
            else if (value.length <= 3 || value.length > 255) {
              return false;
            }
            return true;
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
    deleteKlinik: [
        check("klinikId", "Klinik Id Not Found").exists(),
    
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
    addAdminToKlinik: [
        check("klinikId", "Klinik Id Not Found").exists().custom(value => {
            return Klinik.findAll({
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
        check("adminId", "Klinik Id Not Found").exists().custom(value => {
            return User.findAll({
                where: {
                  id: value
                },
              }).then(userLogin => {
                if (userLogin.length === 0) {
                    return false;
                };
                if (userLogin[0].dataValues.role !== "klinik") {
                    return false;
                }
                return true;
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
    // acceptAppointment: [
    //     check('appointmentId', 'Klinik Not Exist').exists().isNumeric(),
    //     (req, res, next) => {
    //         const errors = validationResult(req); // Collect errors from check function
    //         // If errors is not null, it will be return errors response
    //         if (!errors.isEmpty()) {
    //             return res.status(422).json({
    //                 errors: errors.mapped(),
    //                 success: false,
    //                 code: 422,
    //             });
    //         }
    //         // If no errors, it will go to next step
    //         next();
    //     }
    // ],

    // getAllAppointment: [
    //     // check('klinikId', 'Klinik Not Exist').exists().isNumeric(),
    //     // check('dokterId', 'Dokter Not Exist').exists().isNumeric(),
    //     // check('peliharaanId', 'Peliharaan Not Exist').exists(),
    //     (req, res, next) => {
    //         const errors = validationResult(req); // Collect errors from check function
    //         // If errors is not null, it will be return errors response
    //         if (!errors.isEmpty()) {
    //             return res.status(422).json({
    //                 errors: errors.mapped(),
    //                 success: false,
    //                 code: 422,
    //             });
    //         }
    //         // If no errors, it will go to next step
    //         next();
    //     }
    // ],

    // updateAppointment: [
    //     check('klinikId', 'Klinik Not Exist').exists().isNumeric(),
    //     check('dokterId', 'Dokter Not Exist').exists().isNumeric(),
    //     check('peliharaanId', 'Peliharaan Not Exist').exists(),
    //     (req, res, next) => {
    //         const errors = validationResult(req); // Collect errors from check function
    //         // If errors is not null, it will be return errors response
    //         if (!errors.isEmpty()) {
    //             return res.status(422).json({
    //                 errors: errors.mapped(),
    //                 success: false,
    //                 code: 422,
    //             });
    //         }
    //         // If no errors, it will go to next step
    //         next();
    //     }
    // ],

};


