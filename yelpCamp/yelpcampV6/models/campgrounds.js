const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

let Camp = mongoose.model('Campground', CampgroundSchema);

module.exports = Camp;