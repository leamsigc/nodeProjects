const express = require('express'),
    router = express.Router();

//GET HOMEPAGE
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'you are not logged in');
        res.redirect('/users/login')
    }

}
module.exports = router;