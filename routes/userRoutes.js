const express = require('express'); // Import express
const passport = require('passport'); // Import passport

const router = express.Router(); // Make router
const auth = require('../middlewares/auth'); // Import auth
const usersController = require('../controllers/usersController'); // Import UsersController
const usersValidator = require('../middlewares/validators/usersValidator'); // Import usersValidator

// if user go to localhost:3000/signup
router.post('/signup', [usersValidator.signup, function (req, res, next) {
  passport.authenticate(
    "signup",
    {
      session: false,
    },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json({
          status: "Error",
          message: info.message,
        });
        return;
      }

      usersController.signup(user, req, res, next);
    }
  )(req, res, next);
},
]);

// if user go to localhost:3000/login
router.post('/login', [usersValidator.login, function(req, res, next) {
  // will be go to login in auth
  passport.authenticate('login', {
    session: false
  }, function(err, user, info) {
    // If error not null
    if (err) {
      return next(err);
    }

    // If user is not exist
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message + " " + info.error,
      });
      return;
    }

    // If not error, it will go to login function in UsersController
    usersController.login(user, req, res, next);
  })(req, res, next);
}]);

// Request authorization
router.get('/authorization', function(req, res, next) {
  // will be go to login in auth
  passport.authenticate('jwt', {
    session: false
  }, async function(err, user, info) {
    // If error not null
    if (err) {
      return next(err);
    }

    // If user is not exist
    if (!user) {
      res.status(401).json({
        status: 'Error!',
        message: info.message
      });
      return;
    }

    // If not error, it will go to login function in UsersController
    usersController.authorization(user, req, res);
  })(req, res, next);
})

router.put("/updateProfile/", [usersValidator.updateProfile,
	function (req, res, next) {
		passport.authenticate(
			"checkLogin",
			{
				session: false,
			},
			function (err, user, info) {
				if (err) {
					return next(err);
				}
				if (!user) {
					res.status(401).json({
						status: "404",
						message: info.message,
					});
					return;
				}

				usersController.updateProfile(user, req, res, next);
			}
		)(req, res, next);
	},
]);




module.exports = router; // Export router
