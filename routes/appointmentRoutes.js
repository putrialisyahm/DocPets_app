const express = require('express'); // Import express
const passport = require('passport'); // Import passport

const router = express.Router(); // Make router
const auth = require('../middlewares/auth'); // Import auth
const appointmentController = require('../controllers/appointmentController'); // Import UsersController
const appointmentValidator = require('../middlewares/validators/appointmentValidator'); // Import usersValidator


router.get("/getAllAppointment", [
    function (req, res, next) {
      passport.authenticate(
        "checkUser",
        {
          session: false,
        },
        function (err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            res.status(401).json({
              message: info.message,
              success: false,
              code: 401
            });
            return;
          }
  
          appointmentController.getAllAppointment(user, req, res, next);
  
        }
      )(req, res, next);
    },
  ]);

  router.get("/getAllAppointmentForDokter", [
    function (req, res, next) {
      passport.authenticate(
        "checkDokter",
        {
          session: false,
        },
        function (err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            res.status(401).json({
              message: info.message,
              success: false,
              code: 401
            });
            return;
          }
  
          appointmentController.getAllAppointmentForDokter(user, req, res, next);
  
        }
      )(req, res, next);
    },
  ]);
// router.get("/:id", appointmentController.getOne); // If accessing localhost:3000/transaksi/:id, it will call getOne function in TransaksiController class


router.post('/addAppointment', [appointmentValidator.addAppointment, function (req, res, next) {
    passport.authenticate(
      "addAppointment",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            message: info.message,
            success: false,
            code: 401
          });
          return;
        }
  
        appointmentController.addAppointment(user, req, res, next);
      }
    )(req, res, next);
  },
  ]);


  router.post('/acceptAppointment', [appointmentValidator.acceptAppointment, function (req, res, next) {
    passport.authenticate(
      "checkDokter",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            message: info.message,
            success: false,
            code: 401
          });
          return;
        }
  
        appointmentController.acceptAppointment(user, req, res, next);
      }
    )(req, res, next);
  },
  ]);

  router.get('/getAllAppointment', [appointmentValidator.getAllAppointment, function (req, res, next) {
    passport.authenticate(
      "getAllAppointment",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            message: info.message,
            success: false,
            code: 401
          });
          return;
        }
  
        appointmentController.getAllAppointment(user, req, res, next);
      }
    )(req, res, next);
  },
  ]);

  router.put('/updateAppointment', [appointmentValidator.updateAppointment, function (req, res, next) {
    passport.authenticate(
      "updateAppointment",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            message: info.message,
            success: false,
            code: 401
          });
          return;
        }
  
        appointmentController.updateAppointment(user, req, res, next);
      }
    )(req, res, next);
  },
  ]);
  
router.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});


//ketika fungsi next dipanggil pakek fungsi ini,
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
      error: {
          message: err.message,
          success: false,
          code: err.status || 500,
      },
  });
});

module.exports = router; // Export router