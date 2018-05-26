const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

//GET register
router.get('/register', (req, res) => {
    res.render('register');
});


//Login route 
router.get('/login', (req, res) => {
    res.render('login');
});

//POST register
router.post('/register', (req, res) => {

    //Validation 
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Name is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);


    let userData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2
    };
    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {

        User.findOne({
            username: {
                "$regex": `^${userData.username}\b`,
                "$options": "i"
            }
        }, (err, user) => {
            User.findOne({
                email: {
                    "$regex": "^" + userData.email + "\\b",
                    "$options": "i"
                }
            }, (err, mail) => {
                if (user || mail) {
                    res.render('register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    let newUser = new User({
                        name: userData.name,
                        email: userData.email,
                        username: userData.username,
                        password: userData.password
                    });

                    User.createUser(newUser, (err, userCreated) => {
                        if (err) {
                            throw err;
                        }

                        console.log(userCreated);
                    });
                    req.flash('success_msg', 'You are register and can now login');
                    res.redirect('/users/login');
                }
            });
        });
    }

});


passport.use(new localStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return done(null, false, {
                message: 'Unknown user.'
            });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}), (req, res) => {
    res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});
module.exports = router;