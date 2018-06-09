 const express = require('express'),
     router = express.Router(),
     Camp = require('../models/campgrounds');

 router.get('/', (req, res) => {
     console.log(req.use);
     //get all campgrounds from db 
     Camp.find({}, (err, allCampgrounds) => {
         if (err) {
             throw err;
         }

         res.render('campgrounds/campgrounds', {
             campGroundArr: allCampgrounds
         });
     });
 });

 router.post('/', (req, res) => {
     let formData = {
         name: req.body.name,
         img: req.body.url,
         desc: req.body.desc
     };

     //create new campground
     Camp.create(formData, (err, newCampground) => {
         if (err) {
             throw err;
         }
         res.redirect('/campground');
     });
 });

 router.get('/new', (req, res) => {
     res.render('campgrounds/form');
 });

 //show the details for each campground
 router.get('/:id', (req, res) => {
     let id = req.params.id;
     //find the campground 
     Camp.findById(id)
         .populate('comments')
         .exec((err, foundCampground) => {
             if (err) {
                 console.log(err);
             }
             res.render('campgrounds/show', {
                 camp: foundCampground
             });
         });
 });

 module.exports = router;