const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    Camp = require('../models/campgrounds'),
    Comments = require('../models/comments'),
    middleware = require('../middleware');


router.get('/new', middleware.isLoggedIn, (req, res) => {
    let id = req.params.id;
    res.render('comments/new', {
        id: id
    });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    let id = req.params.id;
    Comments.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('/campground' + req.params.id);
        }
        // console.log(foundComment);
        res.render('comments/edit', {
            comment: foundComment,
            id: id
        });
    });
});


router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    // res.send('welcome to the update route');
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('/campground');
            console.log(err);
        }
        res.redirect('/campground/' + req.params.id);
    });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comments.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect('back');
        }
        res.redirect('/campground/' + req.params.id);
    });
});


module.exports = router;