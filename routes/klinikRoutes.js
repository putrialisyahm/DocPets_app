const express = require('express'); // Import express
const passport = require('passport'); // Import passport

const router = express.Router(); // Make router
const auth = require('../middlewares/auth'); // Import auth
const klinikController = require('../controllers/klinikController'); // Import UsersController
const klinikValidator = require('../middlewares/validators/klinikValidator'); // Import usersValidator

// if user go to localhost:3000/signup

router.post("/search", klinikValidator.search, klinikController.search);
router.get("/getAllKlinik", klinikController.getAllKlinik);
router.get("/getKlinikById/:id", klinikValidator.getKlinikById, klinikController.getKlinikById);
router.get("/getAllDokterInKlinik/:id", klinikValidator.getKlinikById, klinikController.getAllDokterInKlinik);

router.post("/addDokterToKlinik/", [klinikValidator.addDokterToKlinik, function (req, res, next) {
    passport.authenticate(
        "checkAuthToAddDokter",
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

            klinikController.addDokterToKlinik(user, req, res, next);
        }
    )(req, res, next);
},
]);
router.use((req, res, next) => {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});


router.get("/hello", function (req, res) {
    res.send("slkajdfskld");
})

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
