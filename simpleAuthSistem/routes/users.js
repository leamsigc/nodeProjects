const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    localStrategy = require('passport').Strategy;

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
    console.log(userData);
    console.log(errors);

    if (errors) {
        res.render('register', {
            errors: errors
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
            req.flash('success_msg', 'You are register and can now login');
        });
        res.redirect('/users/login');
    }

});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}), (req, res) => {
    res.redirect('/');
});
module.exports = router;