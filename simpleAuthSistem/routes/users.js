const express = require('express'),
    router = express.Router();

//GET register
router.get('/register', (req, res) => {
    res.render('register');
});


//Login route 
router.get('/login', (req, res) => {
    res.render('login');
});
module.exports = router;