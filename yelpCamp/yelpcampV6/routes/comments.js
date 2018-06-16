const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    Camp = require('../models/campgrounds'),
    Comments = require('../models/comments');


router.get('/new', isLoggedIn, (req, res) => {
    let id = req.params.id;
    res.render('comments/new', {
        id: id
    });
});

router.post('/', isLoggedIn, (req, res) => {
    let commentData = {
        author: req.body.author,
        text: req.body.text
    };
    let id = req.params.id;

    Camp.findById(id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect('/campground');
        }

        Comments.create(commentData, (err, createdComment) => {
            if (err) {
                console.log(err);
            }
            // add username and id
            createdComment.author.id = req.user._id;
            createdComment.author.username = req.user.username;
            // console.log(createdComment);
            createdComment.save();
            foundCampground.comments.push(createdComment);
            foundCampground.save();
            res.redirect('/campground/' + id);
        });
    });
});

router.get('/:comment_id/edit' ,(req,res) => {
    let id = req.params.id;
    Comments.findById(req.params.comment_id,(err,foundComment) => {
        if (err) {
            res.redirect('/campground'+req.params.id);
        }
        console.log(foundComment);
        res.render('comments/edit',{
            comment:foundComment,
            id:id
        });
    });
});


router.put('/:comment_id', (req,res) => {
    // res.send('welcome to the update route');
    console.log(req.params.comment_id);
    Comments.findByIdAndUpdate(req.params.comment_id,(err, updatedComment) => {
        if (err) {
            res.redirect('/campground');
            console.log(err);
        }
        res.redirect('/campground/'+req.params.id);
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;