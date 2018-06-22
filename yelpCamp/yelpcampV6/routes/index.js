const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//use routes 
router.get('/', (req, res) => {
    res.render('campgrounds/index');
});
// AUTH ROUTES
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err, createdUser) => {
        if (err) {
            console.log(err);
            req.flash('danger',err.message);
            res.redirect('back');
        }

        //console.log(createdUser);
        passport.authenticate('local')(req, res, () => {
            req.flash('success','Welcome to YelpCamp');
            res.redirect('/campground');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campground',
    failureRedirect: '/login'
}), (req, res) => {});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success','Logged you out!');
    res.redirect('/');
});

module.exports = router;