const express = require('express'),
    router = express.Router(),
    User = require('../models/user');

//home page 
// router.get('/', (req, res) => {
//     res.render('campgrounds/index');
// });
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
            return res.render('register');
        }

        //console.log(createdUser);
        passport.authenticate('local')(req, res, () => {
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
    res.redirect('/');
});

//login check authentication 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


module.exports = router;