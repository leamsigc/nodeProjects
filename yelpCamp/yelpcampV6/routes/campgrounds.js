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

 router.post('/', isLoggedIn, (req, res) => {
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
         //add author tho the campground
         newCampground.author.username = req.user.username;
         newCampground.author.id = req.user._id;
         newCampground.save();
         res.redirect('/campground');
     });
 });

 router.get('/new', isLoggedIn, (req, res) => {
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

 //EDIT CAMPGROUND ROUTE 
 router.get('/:id/edit',checkCampgroundOwnership, (req, res) => {
     //check if login 
         Camp.findById(req.params.id, (err, foundCampground) => {
                res.render('campgrounds/edit', {
                    foundCampground: foundCampground
                });
        });
 });
 //UPDATE CAMPGROUND ROUTE
 router.put('/:id',checkCampgroundOwnership, (req, res) => {
    //  console.log(req.body.camp);
     Camp.findByIdAndUpdate(req.params.id, req.body.camp, (err, updatedCamp) => {
         if (err) {
             res.redirect('/campground');
             return console.log(err);
         }
         res.redirect('/campground/' + req.params.id);
     });
 });


 //REMOVE CAMPGROUND
 router.delete('/:id',checkCampgroundOwnership, (req,res) => {
     Camp.findByIdAndRemove(req.params.id,(err) => {
         if (err) {
             res.redirect('/campground/'+req.params.id);
         }
         res.redirect('/campground');
     });
 });

function isLoggedIn(req, res, next) {
     if (req.isAuthenticated()) {
         return next();
     }
     res.redirect('/login');
 }

function checkCampgroundOwnership(req,res,next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
             if(foundCampground.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect('back');
            }

        });
    }else{
        res.redirect('back');
    }
}
 module.exports = router;