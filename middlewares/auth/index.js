const passport = require('passport'); // Import passport
const localStrategy = require('passport-local').Strategy; // Import localStrategy from passport
const { user } = require('../../models'); // Import user model
const bcrypt = require('bcrypt'); // Import bcrypt
const JWTstrategy = require('passport-jwt').Strategy; // Import JWTstrategy from passport
const ExtractJWT = require('passport-jwt').ExtractJwt; // Import ExtractJWT from passport

// It will be used for signup and create the user
passport.use(
  'signup',
  new localStrategy({
      usernameField: 'email', // It will get from req.body.email
      passwordField: 'password' // It will get from req.body.password
    },
    async (email, password, done) => {
      try {
        // Create new user with email, password and role
        let createdUser = await user.create({
          email: email,
          password: password,
          role: 'user'
        });

        // Find new user that have been created in advance
        let newUser = await user.findOne({
          where: {
            id: createdUser.id
          },
          attributes: ['id', 'email']
        });

        // If success, it will return newUser variable that can be used in the next step
        return done(null, newUser, {
          message: 'Signup success!'
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "User can't be created!"
        });
      }
    },
  )
);

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
        const userLogin = await user.findOne({
          where: {
            email: email
          }
        });

        // If user is not found, it will make Unauthorized and make a message
        if (!userLogin) {
          return done(null, false, {
            message: 'User not found!'
          })
        };

        // If user is found, it will validate the password among the user's input and database
        const validate = await bcrypt.compare(password, userLogin.password);

        // If password wrong, it will make Unauthorized and make a message
        if (!validate) {
          return done(null, false, {
            message: 'Wrong password!'
          })
        };

        // If success, it will be find this user and only get id & email
        let userLoginVisible = await user.findOne({
          where: {
            email: email
          },
          attributes: ['id', 'email']
        });

        // If success, it will return userLoginVisible variable that can be used in the next step
        return done(null, userLoginVisible, {
          message: 'Login success!'
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Can't login!"
        })
      }
    }
  )
);

passport.use(
  'jwt',
  new JWTstrategy({
      secretOrKey: 'secret_password', // It must be same with secret key when created token
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // It will extract token from req.header('Authorization')
    },
    async (token, done) => {
      try {
        // Find the user depends on token that have been extracted
        const userLogin = await user.findOne({
          where: {
            email: token.user.email
          },
          attributes: ['id', 'email', 'role']
        });

        // If user is not found, it will make Unauthorized and make a message
        if (!userLogin) {
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
          message: "Unauthorized!"
        });
      }
    }
  )
);
