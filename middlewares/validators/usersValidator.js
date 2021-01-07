const { check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const { User } = require('../../models/') // Import user model
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

    check('role', "role must be user, admin").custom(value => {
      let lowercase = value.toLowerCase();
      if (lowercase === "user" || lowercase === "admin") {
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
          errors: errors.mapped()
        });
      }

      // If no errors, it will go to next step
      next();
    }
  ],
  login: [
    check('email', 'email field must be email address').normalizeEmail().isEmail(), // validator for email field
    check('password', 'password field must have 8 to 32 characters').isString().isLength({ min: 8, max:32 }), // validator for password field
    (req, res, next) => {
      const errors = validationResult(req); // Collect errors from check function
      // If errors is not null, it will be return errors response
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      // If no errors, it will go to next step
      next();
    }
  ]
};
