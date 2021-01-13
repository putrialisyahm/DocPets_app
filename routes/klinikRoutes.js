const express = require('express'); // Import express
const passport = require('passport'); // Import passport

const router = express.Router(); // Make router
const auth = require('../middlewares/auth'); // Import auth
const klinikController = require('../controllers/klinikController'); // Import UsersController
const klinikValidator = require('../middlewares/validators/klinikValidator'); // Import usersValidator

// if user go to localhost:3000/signup

router.get("/searchByName/:query", klinikValidator.searchByName, klinikController.searchByName);

// router.use((req, res, next) => {
//     const err = new Error("Page Not Found");
//     err.status = 404;
//     next(err);
// });


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
