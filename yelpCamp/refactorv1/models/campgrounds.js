const mongoose = require('mongoose');

let campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

let Camp = mongoose.model('Campground', campgroundSchema);

module.exports = Camp;