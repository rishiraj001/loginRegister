const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy ({
        usernameField: 'email'
    },
    async function(email, password, done) {
        await User.findOne({email: email}, async function(err, user) {
            if(!user) {
                console.log('Invalid Credentials..');
                return done(null, false);
            }
            if(err) {
                console.log('err while finding user ---> passport');
                return done(err);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!user ||  !isMatch) {
                console.log('Invalid Credentials..');
                return done(null, false);
            }

            return done(null, user);
        })
    }
))

//searlize
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//desearlize
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if(err) {
            console.log('err while finding user ---> passport');
            return done(err);
        }

        return done(null, user);
    })
})

passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    return res.redirect('/api/signIn');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()) res.locals.user = req.user;
    next();
}

module.exports = passport;