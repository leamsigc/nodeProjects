const express = require('express'),
    router = express.Router();

//home page 
router.get('/' ,(req,res) => {
    res.render('campgrounds/index');
});