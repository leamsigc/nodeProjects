const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

let Camp = mongoose.model('Campground', CampgroundSchema);

module.exports = Camp;