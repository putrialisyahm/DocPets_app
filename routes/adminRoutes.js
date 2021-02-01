const express = require('express'); // Import express
const passport = require('passport'); // Import passport

const router = express.Router(); // Make router
const auth = require('../middlewares/auth'); // Import auth
const adminController = require('../controllers/adminController'); // Import UsersController
const adminValidator = require('../middlewares/validators/adminValidator'); // Import usersValidator

// if user go to localhost:3000/signup

// router.post("/addKlinik", adminValidator.addKlinik, adminController.addKlinik);
// router.get("/getAlladmin", adminController.getAlladmin);
// router.get("/getadminById/:id", adminValidator.getadminById, adminController.getadminById);
// router.get("/getAllDokterInadmin/:id", adminValidator.getadminById, adminController.getAllDokterInadmin);

router.post("/addKlinik/", [adminValidator.addKlinik, function (req, res, next) {
    passport.authenticate(
        "checkAdmin",
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

            adminController.addKlinik(user, req, res, next);
        }
    )(req, res, next);
},
]);

router.delete("/deleteKlinik/", [adminValidator.deleteKlinik, function (req, res, next) {
    passport.authenticate(
        "checkAdmin",
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

            adminController.deleteKlinik(user, req, res, next);
        }
    )(req, res, next);
},
]);

router.put("/updateKlinik/", [adminValidator.updateKlinik, function (req, res, next) {
    passport.authenticate(
        "checkAdmin",
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

            adminController.updateKlinik(user, req, res, next);
        }
    )(req, res, next);
},
]);

router.post("/changeKlinikPhoto/", [adminValidator.changeKlinikPhoto, function (req, res, next) {
    passport.authenticate(
        "checkAdmin",
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

            adminController.changeKlinikPhoto(user, req, res, next);
        }
    )(req, res, next);
},
]);


router.put("/addAdminToKlinik/", [adminValidator.addAdminToKlinik, function (req, res, next) {
    passport.authenticate(
        "checkAdmin",
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

            adminController.addAdminToKlinik(user, req, res, next);
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
