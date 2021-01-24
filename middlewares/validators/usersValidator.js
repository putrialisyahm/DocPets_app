const { check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const { User } = require('../../models/') // Import user model

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
  signup: [
    check('email', 'email field must be email address').normalizeEmail().isEmail().custom(async (value) => {
      let findUser = await User.findAll({ where: { email: value } })
      if (findUser.length !== 0) {
        return true;
      }
      return false;

    }),// validator for email field

    check('password', 'password field must have 8 to 32 characters').isString().isLength({ min: 8, max: 32 }), // validator for password field
    check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').exists().custom((value, { req }) => value === req.body.password), // validator for passwordConfirmation field
    check('gender', "Gender must be between female or male").isString().custom(value => {
      const gender = value.toLowerCase().trim();
      if (gender === "male" || gender === "female") {
        return true;
      }
      return false;
    }),
    check('role', "role must be user, admin").custom(value => {
      let lowercase = value.toLowerCase().trim();
      if (lowercase === "user" || lowercase === "klinik") {
        return true;
      }
      return false;
    }),

    check("telepon", "telepon field myst be an phone number").isMobilePhone(),
    check("nama", "nama must be string and lengt must be between 3-255").isLength({ min: 3, max: 255 }),
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
  login: [
    check('email', 'email field must be email address').normalizeEmail().isEmail(), // validator for email field
    check('password', 'password field must have 8 to 32 characters').isString().isLength({ min: 8, max: 32 }), // validator for password field
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

  changePhotoProfile: [upload.single("image"),],

  addPet: [
    check("nama", "nama must be string and lengt must be between 3-255").isLength({ min: 3, max: 255 }),
    check("jenis", "Jenis must be kucing, anjing, kelinci, hamster").custom(value => {
      const jenis = "kucinganjingkelincihamster"
      if (jenis.includes(value)) {
        return true
      }
      false;
    }),
    check('gender', "Gender must be between female or male").isString().custom(value => {
      const gender = value.toLowerCase().trim();
      if (gender === "male" || gender === "female") {
        return true;
      }
      return false;
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
  updateProfile: [
    upload.single("image"),
    // check("image").custom(value => {
    //   if(value === undefined){
    //     return true;
    //   }
    //   else{
        
    //     return true;
    //   }
    // }),
    check("nama", "nama must be string and lengt must be between 3-255").custom(value => {
      if (value === undefined)
        return true;
      else if (value.length <= 3 || value.length > 255) {
        return false;
      }
      return true;
    }),
    check('gender', 'gender must be female/male').custom(value => {

      if (value === undefined)
        return true;
      value = value.trim().toLowerCase();
      if (value !== "male" && value !== "female") {
        return false;
      }
      return true;
    }),
    // check('email', 'email field must be email address').normalizeEmail().isEmail(), // validator for email field
    check("telepon", "telepon field must be an phone number").custom(value => {
      if (value === undefined)
        return true;
      else if (isNaN(value)) {
        return false;
      }
      return true;
    }),
    check("status", "Status must be active/offline").custom(value => {
      // value = value.trim().toLowerCase();
      if (value === undefined)
        return true;
      value = value.trim().toLowerCase();
      if (value !== "active" && value !== "offline") {
        return false;
      }
      return true;
    }),
    check("waktuKerja", "waktu Kerja entahlah").custom(value => {
      // value = value.trim().toLowerCase();
      if (value === undefined)
        return true;
      return true;
    }),
    check("pengalaman", "Pengalaman must be a number").custom(value => {
      // value = value.trim().toLowerCase();
      if (value === undefined)
        return true;
      value = value.trim().toLowerCase();
      if (isNaN(value)) {
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
  ]

};
