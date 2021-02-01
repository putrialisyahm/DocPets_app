const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const passport = require('passport'); // Import passport

const localStrategy = require('passport-local').Strategy; // Import localStrategy from passport
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {
  User,
  Memiliki,
  Klinik,
  Appointment
} = require('../../models'); // Import user model
const bcrypt = require('bcrypt'); // Import bcrypt
const JWTstrategy = require('passport-jwt').Strategy; // Import JWTstrategy from passport
const ExtractJWT = require('passport-jwt').ExtractJwt; // Import ExtractJWT from passport
const Sequelize = require('sequelize');
const {
  profile
} = require('console');

// It will be used for signup and create the user
passport.use(
  'signup',
  new localStrategy({
    usernameField: 'email', // It will get from req.body.email
    passwordField: 'password', // It will get from req.body.password
    passReqToCallback: true,
  },
    async (req, email, password, done) => {
      try {
        // Create new user with email, password and role
        let createdUser = await User.create({
          nama: req.body.nama,
          email: email,
          password: password,
          telepon: req.body.telepon,
          role: req.body.role.toLowerCase().trim(),
          gender: req.body.gender.toLowerCase().trim(),
        });

        // Find new user that have been created in advance
        let newUser = await User.findAll({
          where: {
            id: createdUser.id
          },
          attributes: ['id', 'nama', 'email', 'foto', 'role', "gender"]
        });
        // If success, it will return newUser variable that can be used in the next step
        return done(null, newUser, {
          message: 'Signup success!'
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: e.message + " User can't be created!"
        });
      }
    },
  )
);

// passport.use(
//   'google',
//   new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let userLogin = await user.findOne({
//           where: {
//           email: profile.emails[0].value
//           }
//         })

//         if (!userLogin) {
//           userLogin = await.user.create({
//             email: profile.emails[0].value,
//             passsword: "this is password for google!"
//           });
//         }
//       return done(null, userLogin);
//     } catch (e) {
//       return done(null, false);
//     }
//   }
//   ));


// It will be used for login
passport.use(
  'login',
  new localStrategy({
    usernameField: 'email', // It will get from req.body.email
    passwordField: 'password' // It will get from req.body.password
  },
    async (email, password, done) => {
      try {
        // Find the user that have been inputed on req.body.email
        const userLogin = await User.findAll({
          where: {
            email: email,
          }
        });
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        // If user is found, it will validate the password among the user's input and database
        const validate = await bcrypt.compare(password, userLogin[0].dataValues.password);

        // If password wrong, it will make Unauthorized and make a message
        if (!validate) {
          return done(null, false, {
            message: 'Wrong password!'
          })
        };

        // If success, it will be find this user and only get id & email
        const userLoginVisible = await User.findAll({
          where: {
            email: email
          },
          attributes: ['id', 'nama', 'email', 'foto', "role"]
        });

        // If success, it will return userLoginVisible variable that can be used in the next step
        return done(null, userLoginVisible, {
          message: 'Login success!'
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Can't login! " + e.message,

        })
      }
    }
  )
);

passport.use(
  'checkLogin',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // It will extract token from req.header('Authorization')
  },
    async (token, done) => {
      try {
        // Find the user depends on token that have been extracted

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });
        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
);


passport.use(
  'checkDokter',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // It will extract token from req.header('Authorization')
  },
    async (token, done) => {
      try {
        // Find the user depends on token that have been extracted

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });
        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        if (userLogin[0].dataValues.role !== "dokter") {
          return done(null, false, {
            message: "You're  not a Dokter!"
          })
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
);

passport.use(
  'checkUser',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // It will extract token from req.header('Authorization')
  },
    async (token, done) => {
      try {
        // Find the user depends on token that have been extracted

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });
        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        if (userLogin[0].dataValues.role !== "user") {
          return done(null, false, {
            message: "You're  not a User!"
          })
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
);


passport.use(
  'checkAuthToAddDokter',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // It will extract token from req.header('Authorization')
    passReqToCallback: true,
  },
    async (req, token, done) => {
      try {
        // Find the user depends on token that have been extracted
        const Op = Sequelize.Op

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });

        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };
        //check user role if have klinik
        if ((userLogin[0].dataValues.role !== "klinik")) {
          return done(null, false, {
            message: 'Unauthorized'
          })
        };
        ///check if admin id === with user id
        const adminId = await Klinik.findAll({
          where: {
            id: req.body.klinikId
          },
        });

        //check if klinik exist
        if (adminId.length === 0) {
          return done(null, false, {
            message: 'Klinik not found!'
          })
        };

        if ((userLogin[0].dataValues.id !== adminId[0].dataValues.adminId)) {
          return done(null, false, {
            message: "Unauthorized, You're not this Klinik's admin"
          })
        }

        //check if Dokter id have the role dokter
        const dokterRole = await User.findAll({
          where: {
            id: req.body.dokterId
          },
        });

        if (dokterRole.length === 0) {
          return done(null, false, {
            message: 'Dokter not found!'
          })
        };

        if (dokterRole[0].dataValues.role !== "dokter") {
          return done(null, false, {
            message: 'Unauthorized'
          })
        };
        //check num kliniks dokter have registered
        const numKliniks = await Memiliki.findAll({
          where: {
            dokterId: req.body.dokterId
          },
        });
        if (numKliniks.length === 2) {
          return done(null, false, {
            message: 'Dokter have been registered on 2 kliniks'
          })
        };


        const isdDokterBeenAdded = await Memiliki.findAll({
          where: {
            [Op.and]: [{
              dokterId: req.body.dokterId
            },
            {
              klinikId: req.body.klinikId
            }
            ]
          },
        });
        if (isdDokterBeenAdded.length !== 0) {
          return done(null, false, {
            message: 'Dokter have been registered to this klinik'
          })
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
);

passport.use(
  'addAppointment',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // It will extract token from req.header('Authorization')
    passReqToCallback: true,
  },
    async (req, token, done) => {
      try {
        // Find the user depends on token that have been extracted
        const peliharaan = req.body.peliharaanId.trim().split(",");

        const Op = Sequelize.Op

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });

        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        const isDokterInKlinik = await Klinik.findAll({

          include: [{
            model: Memiliki,
            as: "memiliki",
            attributes: ["dokterId"],
            where: {
              [Op.and]: [{
                dokterId: req.body.dokterId
              },
              {
                klinikId: req.body.klinikId
              }
              ]
            },
          }],

        })
        //todo: check peliharaan beneran ada apa tidak,s
        if (isDokterInKlinik.length === 0) {
          return done(null, false, {
            message: 'Dokter is not registered to this klinik'
          })
        }

        for (let i = 0; i < peliharaan.length; i++) {
          const result = await User.findAll({
            where: {
              id: peliharaan[i],
            },
          });
          if (result.length === 0) {
            return done(null, false, {
              message: 'Pet is not registered'
            })
          }
        }

        //check date is not in the past
        const appointmentDate = new Date(req.body.date);
        console.log(appointmentDate.getHours())

        if ((appointmentDate.getHours() !== 10 && appointmentDate.getHours() !== 12 && appointmentDate.getHours() !== 14) || appointmentDate.getMinutes() !== 0) {
          return done(null, false, {
            message: 'Invalid Date, date must be 10, 12, or 14'
          })
        }
        if (appointmentDate < Date.now()) {
          return done(null, false, {
            message: 'Invalid Date'
          })
        }


        //check if date is occupied with the dokter
        const dokterAppointment = await Appointment.findAll({
          where: {
            [Op.and]: [{
              dokterId: req.body.dokterId
            },
            {
              klinikId: req.body.klinikId
            }
            ]
          },
        })

        let occupiedDate;
        for (let i = 0; i < dokterAppointment.length; i++) {
          // console.log(dokterAppointment[i].dataValues.waktu);
          occupiedDate = new Date(dokterAppointment[i].dataValues.waktu)

          if (appointmentDate.getFullYear() === occupiedDate.getFullYear() &&
            appointmentDate.getMonth() === occupiedDate.getMonth() &&
            appointmentDate.getDate() === occupiedDate.getDate() &&
            appointmentDate.getHours() === occupiedDate.getHours()
          ) {

            return done(null, false, {
              message: 'Date has been occupied by another patient'
            })
          }
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
);

passport.use(
  'checkAdmin',
  new JWTstrategy({
    secretOrKey: 'secret_password', // It must be same with secret key when created token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // It will extract token from req.header('Authorization')
  },
    async (token, done) => {
      try {
        // Find the user depends on token that have been extracted

        const userLogin = await User.findAll({
          where: {
            id: token.user._id
          },
        });
        // console.log(userLogin);
        // If user is not found, it will make Unauthorized and make a message
        if (userLogin.length === 0) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        if (userLogin[0].dataValues.role !== "admin") {
          return done(null, false, {
            message: "You're  not an Admin!"
          })
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, userLogin, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized! " + e.message,
        });
      }
    }
  )
); 2