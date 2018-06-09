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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;