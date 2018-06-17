const Comments = require('../models/comments'),
    Camp = require('../models/campgrounds');

let middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
            if (foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect('back');
            }

        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comments.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        req.redirect('/login');
    }

};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('danger','Please login Fist');
    res.redirect('/login');
}
module.exports = middlewareObj;