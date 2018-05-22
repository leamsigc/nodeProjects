const express = require('express'),
    router = express.Router();

//GET HOMEPAGE
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;