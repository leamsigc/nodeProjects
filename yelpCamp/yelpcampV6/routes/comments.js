const express = require('express'),
    router = express.Router(),
    Camp = require('../models/campgrounds'),
    Comments = require('../models/comments');


router.get('/campground/:id/comments/new', isLoggedIn, (req, res) => {
    let id = req.params.id;
    res.render('comments/new', {
        id: id
    });
});

router.post('/campground/:id/comments', isLoggedIn, (req, res) => {
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

            foundCampground.comments.push(createdComment);
            foundCampground.save();
            res.redirect('/campground/' + id);
        });
    });
});

module.exports = router;